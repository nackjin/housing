import React, { useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { usePosts } from '../../context/PostContext';
import { useAuth } from '../../context/AuthContext';
import { ChevronLeft, Calendar, User, Eye, Clock, Edit, Trash2, Link as LinkIcon } from 'lucide-react';

const PostDetail = () => {
    const { category, id } = useParams();
    const navigate = useNavigate();
    const { posts, deletePost } = usePosts();
    const { isAdmin } = useAuth();

    // Find the post
    // Note: id from params is a string, post.id might be a number
    const post = posts.find(p => p.id.toString() === id);

    if (!post) {
        return (
            <div className="py-20 text-center">
                <p className="text-xl text-gray-600 mb-4">게시물을 찾을 수 없습니다.</p>
                <button
                    onClick={() => navigate(`/news/${category}`)}
                    className="px-6 py-2 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
                >
                    목록으로 돌아가기
                </button>
            </div>
        );
    }

    const handleDelete = () => {
        if (window.confirm('정말로 이 게시물을 삭제하시겠습니까?')) {
            deletePost(post.id);
            alert('게시물이 삭제되었습니다.');
            navigate(`/news/${category}`);
        }
    };

    return (
        <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
            {/* Header */}
            <div className="bg-gray-50 px-8 py-6 border-b border-gray-100">
                <div className="flex items-center gap-2 text-sm text-primary font-medium mb-3">
                    <span className="uppercase">{post.category}</span>
                </div>
                <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-4 leading-tight">
                    {post.title}
                </h1>
                <div className="flex flex-wrap items-center gap-4 text-sm text-gray-500">
                    <div className="flex items-center gap-1">
                        <User size={14} />
                        <span>{post.author}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Calendar size={14} />
                        <span>{post.date}</span>
                    </div>
                    <div className="flex items-center gap-1">
                        <Eye size={14} />
                        <span>{post.views}</span>
                    </div>
                </div>
            </div>

            {/* Content Body */}
            <div className="px-8 py-8">
                {/* Media (Image/Video) */}
                {/* Image */}
                {/* Images */}
                {post.images && post.images.length > 0 ? (
                    <div className="mb-8 space-y-4">
                        {post.images.map((imgUrl, index) => (
                            <div key={index} className="rounded-lg overflow-hidden bg-gray-100 border border-gray-100">
                                <img
                                    src={imgUrl}
                                    alt={`${post.title} - ${index + 1}`}
                                    className="w-full h-auto object-contain max-h-[600px]"
                                    onError={(e) => {
                                        e.target.onerror = null;
                                        e.target.src = 'https://via.placeholder.com/800x400?text=No+Image';
                                    }}
                                />
                            </div>
                        ))}
                    </div>
                ) : post.image && (
                    <div className="mb-8 rounded-lg overflow-hidden bg-gray-100 border border-gray-100">
                        <img
                            src={post.image}
                            alt={post.title}
                            className="w-full h-auto object-contain max-h-[600px]"
                            onError={(e) => {
                                e.target.onerror = null;
                                e.target.src = 'https://via.placeholder.com/800x400?text=No+Image';
                            }}
                        />
                    </div>
                )}

                {/* Video or External Link */}
                {post.videoUrl && (
                    getYouTubeID(post.videoUrl) ? (
                        <div className="mb-8 aspect-video rounded-lg overflow-hidden bg-black">
                            <iframe
                                width="100%"
                                height="100%"
                                src={`https://www.youtube.com/embed/${getYouTubeID(post.videoUrl)}`}
                                title={post.title}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        </div>
                    ) : (
                        <div className="mb-8 p-4 bg-gray-50 border border-gray-200 rounded-lg">
                            <a
                                href={post.videoUrl.startsWith('http') ? post.videoUrl : `https://${post.videoUrl}`}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="flex items-center gap-2 text-primary hover:text-primary-dark hover:underline font-medium"
                            >
                                <LinkIcon size={18} />
                                관련 링크: {post.videoUrl}
                            </a>
                        </div>
                    )
                )}

                {/* Text Content */}
                <div className="prose max-w-none text-gray-800 whitespace-pre-line leading-relaxed min-h-[200px]">
                    {post.content}
                </div>
            </div>

            {/* Footer / Navigation */}
            <div className="bg-gray-50 px-8 py-6 border-t border-gray-100 flex justify-between items-center">
                <button
                    onClick={() => navigate(`/news/${category}`)}
                    className="flex items-center gap-2 px-4 py-2 rounded-lg text-gray-600 hover:bg-white hover:shadow-sm hover:text-primary transition-all font-medium"
                >
                    <ChevronLeft size={18} />
                    목록으로
                </button>

                {isAdmin && import.meta.env.DEV && (
                    <div className="flex gap-2">
                        <button
                            onClick={() => navigate(`/admin/write?edit=${post.id}`)}
                            className="flex items-center gap-1 px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors font-medium text-sm"
                        >
                            <Edit size={16} />
                            수정
                        </button>
                        <button
                            onClick={handleDelete}
                            className="flex items-center gap-1 px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-red-500 transition-colors font-medium text-sm"
                        >
                            <Trash2 size={16} />
                            삭제
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

// Helper to extract YouTube ID
const getYouTubeID = (url) => {
    if (!url) return '';
    const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/;
    const match = url.match(regExp);
    return (match && match[7].length === 11) ? match[7] : '';
};

export default PostDetail;
