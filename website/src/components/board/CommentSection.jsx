import React, { useEffect, useState } from 'react';
import { collection, query, where, getDocs, addDoc, updateDoc, doc } from 'firebase/firestore';
import { pbkdf2 } from '@noble/hashes/pbkdf2';
import { sha256 } from '@noble/hashes/sha2';
import { bytesToHex } from '@noble/hashes/utils';
import { MessageSquare, Trash2 } from 'lucide-react';
import { db } from '../../firebase';
import { useAuth } from '../../context/AuthContext';

// Guest comment passwords are stored as a salted PBKDF2 hash. A pure-JS
// implementation is used on purpose: crypto.subtle only exists on HTTPS, and
// the self-hosted mirror is still served over plain HTTP.
const PBKDF2_ITERATIONS = 20000;
const hashPassword = (password, salt) =>
    bytesToHex(pbkdf2(sha256, password, salt, { c: PBKDF2_ITERATIONS, dkLen: 32 }));
const randomSalt = () => bytesToHex(crypto.getRandomValues(new Uint8Array(16)));

const MAX_LENGTH = 1000;
const COOLDOWN_MS = 20000;
const COOLDOWN_KEY = 'lastCommentAt';

const formatDate = (ts) => {
    const d = new Date(ts);
    const pad = (n) => String(n).padStart(2, '0');
    return `${d.getFullYear()}.${pad(d.getMonth() + 1)}.${pad(d.getDate())} ${pad(d.getHours())}:${pad(d.getMinutes())}`;
};

const readCooldown = () => {
    try { return parseInt(localStorage.getItem(COOLDOWN_KEY), 10) || 0; } catch { return 0; }
};
const writeCooldown = () => {
    try { localStorage.setItem(COOLDOWN_KEY, String(Date.now())); } catch { /* ignore */ }
};

const CommentSection = ({ postId }) => {
    const { user, isAdmin } = useAuth();
    const [comments, setComments] = useState([]);
    const [loading, setLoading] = useState(true);
    const [loadError, setLoadError] = useState(false);

    const [guestName, setGuestName] = useState('');
    const [guestPassword, setGuestPassword] = useState('');
    const [content, setContent] = useState('');
    const [honeypot, setHoneypot] = useState('');
    const [submitting, setSubmitting] = useState(false);

    // Guest comment awaiting password confirmation for deletion
    const [deletingId, setDeletingId] = useState(null);
    const [deletePassword, setDeletePassword] = useState('');

    useEffect(() => {
        let cancelled = false;
        const load = async () => {
            setLoading(true);
            setLoadError(false);
            try {
                // No orderBy: combining it with where() needs a composite index.
                const snap = await getDocs(query(collection(db, 'comments'), where('postId', '==', String(postId))));
                const list = snap.docs
                    .map(d => ({ id: d.id, ...d.data() }))
                    .filter(c => !c.deleted)
                    .sort((a, b) => a.createdAt - b.createdAt);
                if (!cancelled) setComments(list);
            } catch (error) {
                console.error('Error loading comments: ', error);
                if (!cancelled) setLoadError(true);
            } finally {
                if (!cancelled) setLoading(false);
            }
        };
        load();
        return () => { cancelled = true; };
    }, [postId]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        if (honeypot) return; // bot filled the hidden field

        const text = content.trim();
        if (!text) {
            alert('댓글 내용을 입력해주세요.');
            return;
        }
        if (!user) {
            if (!guestName.trim()) {
                alert('이름을 입력해주세요.');
                return;
            }
            if (guestPassword.length < 4) {
                alert('비밀번호를 4자 이상 입력해주세요. (댓글 삭제 시 필요합니다)');
                return;
            }
        }
        const waitMs = COOLDOWN_MS - (Date.now() - readCooldown());
        if (waitMs > 0) {
            alert(`댓글은 ${Math.ceil(waitMs / 1000)}초 후에 다시 작성할 수 있습니다.`);
            return;
        }

        setSubmitting(true);
        try {
            const data = {
                postId: String(postId),
                content: text.slice(0, MAX_LENGTH),
                createdAt: Date.now(),
                deleted: false,
            };
            if (user) {
                data.author = user.name || user.username;
                data.userId = String(user.id);
            } else {
                const salt = randomSalt();
                data.author = guestName.trim().slice(0, 20);
                data.userId = null;
                data.salt = salt;
                data.passwordHash = hashPassword(guestPassword, salt);
            }
            const ref = await addDoc(collection(db, 'comments'), data);
            setComments(prev => [...prev, { id: ref.id, ...data }]);
            setContent('');
            setGuestPassword('');
            writeCooldown();
        } catch (error) {
            console.error('Error adding comment: ', error);
            alert(`댓글 등록에 실패했습니다. (${error?.code || error?.message || '알 수 없는 오류'})`);
        } finally {
            setSubmitting(false);
        }
    };

    const softDelete = async (commentId) => {
        try {
            // Firestore rules block real deletes, so flag it instead.
            await updateDoc(doc(db, 'comments', commentId), { deleted: true });
            setComments(prev => prev.filter(c => c.id !== commentId));
            setDeletingId(null);
            setDeletePassword('');
        } catch (error) {
            console.error('Error deleting comment: ', error);
            alert('댓글 삭제에 실패했습니다. 잠시 후 다시 시도해주세요.');
        }
    };

    const canDeleteDirectly = (c) => isAdmin || (user && c.userId && c.userId === String(user.id));

    const handleDeleteClick = (c) => {
        if (canDeleteDirectly(c)) {
            if (window.confirm('이 댓글을 삭제하시겠습니까?')) softDelete(c.id);
        } else if (c.passwordHash) {
            setDeletingId(c.id);
            setDeletePassword('');
        }
    };

    const handleGuestDeleteConfirm = (c) => {
        if (hashPassword(deletePassword, c.salt) !== c.passwordHash) {
            alert('비밀번호가 일치하지 않습니다.');
            return;
        }
        softDelete(c.id);
    };

    const inputClass = 'px-3 py-2 rounded-lg border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all text-sm';

    return (
        <section className="text-left">
            <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900 mb-4">
                <MessageSquare size={18} />
                댓글 <span className="text-primary">{comments.length}</span>
            </h2>

            {loading ? (
                <p className="text-sm text-gray-400 py-4">댓글을 불러오는 중...</p>
            ) : loadError ? (
                <p className="text-sm text-red-500 py-4">댓글을 불러오지 못했습니다.</p>
            ) : comments.length === 0 ? (
                <p className="text-sm text-gray-400 py-4">첫 댓글을 남겨주세요.</p>
            ) : (
                <ul className="divide-y divide-gray-100 mb-6">
                    {comments.map(c => (
                        <li key={c.id} className="py-4">
                            <div className="flex items-center justify-between gap-2">
                                <div className="flex items-center gap-2 text-sm min-w-0">
                                    <span className="font-semibold text-gray-800 truncate">{c.author}</span>
                                    {!c.userId && <span className="text-xs text-gray-400 shrink-0">(비회원)</span>}
                                    <span className="text-xs text-gray-400 shrink-0">{formatDate(c.createdAt)}</span>
                                </div>
                                {(canDeleteDirectly(c) || (!c.userId && c.passwordHash)) && (
                                    <button
                                        type="button"
                                        onClick={() => handleDeleteClick(c)}
                                        className="text-gray-400 hover:text-red-500 transition-colors shrink-0"
                                        title="댓글 삭제"
                                    >
                                        <Trash2 size={14} />
                                    </button>
                                )}
                            </div>
                            <p className="mt-1 text-gray-700 text-sm whitespace-pre-line break-words">{c.content}</p>
                            {deletingId === c.id && (
                                <div className="mt-2 flex flex-wrap items-center gap-2">
                                    <input
                                        type="password"
                                        value={deletePassword}
                                        onChange={e => setDeletePassword(e.target.value)}
                                        onKeyDown={e => { if (e.key === 'Enter') { e.preventDefault(); handleGuestDeleteConfirm(c); } }}
                                        placeholder="작성 시 입력한 비밀번호"
                                        className={`${inputClass} w-48`}
                                        autoFocus
                                    />
                                    <button type="button" onClick={() => handleGuestDeleteConfirm(c)} className="px-3 py-2 rounded-lg bg-red-500 text-white text-sm hover:bg-red-600">삭제</button>
                                    <button type="button" onClick={() => setDeletingId(null)} className="px-3 py-2 rounded-lg text-gray-500 text-sm hover:bg-gray-100">취소</button>
                                </div>
                            )}
                        </li>
                    ))}
                </ul>
            )}

            <form onSubmit={handleSubmit} className="space-y-2">
                {user ? (
                    <p className="text-sm text-gray-500"><span className="font-semibold text-gray-700">{user.name || user.username}</span> 님으로 작성합니다.</p>
                ) : (
                    <div className="flex flex-wrap gap-2">
                        <input type="text" value={guestName} onChange={e => setGuestName(e.target.value)} placeholder="이름" maxLength={20} className={`${inputClass} w-32`} />
                        <input type="password" value={guestPassword} onChange={e => setGuestPassword(e.target.value)} placeholder="비밀번호 (삭제 시 필요)" className={`${inputClass} w-48`} autoComplete="new-password" />
                    </div>
                )}
                {/* Honeypot: hidden from people, filled by naive bots */}
                <input type="text" value={honeypot} onChange={e => setHoneypot(e.target.value)} tabIndex={-1} autoComplete="off" aria-hidden="true" className="hidden" name="website" />
                <textarea
                    value={content}
                    onChange={e => setContent(e.target.value)}
                    rows={3}
                    maxLength={MAX_LENGTH}
                    placeholder="댓글을 입력하세요"
                    className={`${inputClass} w-full resize-none`}
                />
                <div className="flex justify-between items-center">
                    <span className="text-xs text-gray-400">{content.length}/{MAX_LENGTH}</span>
                    <button
                        type="submit"
                        disabled={submitting}
                        className="px-5 py-2 rounded-lg bg-primary text-white text-sm font-medium hover:bg-primary/90 transition-colors disabled:opacity-60 disabled:cursor-not-allowed"
                    >
                        {submitting ? '등록 중...' : '댓글 등록'}
                    </button>
                </div>
            </form>
        </section>
    );
};

export default CommentSection;
