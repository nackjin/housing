import React, { useState, useEffect } from 'react';
import { useNavigate, Navigate } from 'react-router-dom';
import { ChevronLeft } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { useAwardsInfo } from '../context/AwardsContext';

const FIELDS = [
    { name: 'pageTitle', label: '페이지 제목', type: 'text' },
    { name: 'introDate', label: '공고일', type: 'text' },
    { name: 'introText', label: '모집 안내문', type: 'textarea' },
    { name: 'overviewText', label: '대회 개요', type: 'textarea' },
    { name: 'contestName', label: '대회명', type: 'text' },
    { name: 'host', label: '주최', type: 'text' },
    { name: 'sponsor', label: '후원', type: 'text' },
    { name: 'ceremonyInfo', label: '시상식', type: 'text' },
    { name: 'awardPlan', label: '시상계획', type: 'text' },
    { name: 'benefits', label: '수상혜택', type: 'text' },
    { name: 'periodStart', label: '접수 시작', type: 'text' },
    { name: 'periodEnd', label: '접수 마감', type: 'text' },
    { name: 'periodNote', label: '접수 기간 비고 (예: 마감연장)', type: 'text' },
    { name: 'announceDate', label: '발표일', type: 'text' },
    { name: 'judgingProcess', label: '심사절차', type: 'text' },
    { name: 'judgingPanel', label: '심사단', type: 'text' },
    { name: 'applyMethodText', label: '응모 방법', type: 'textarea' },
    { name: 'restrictionNote', label: '접수 제한 안내', type: 'text' },
    { name: 'fileNote', label: '파일명 안내', type: 'text' },
    { name: 'announcementFileUrl', label: '공고문 다운로드 링크', type: 'text' },
    { name: 'email', label: '접수 이메일', type: 'text' },
    { name: 'phone', label: '전화 문의', type: 'text' },
    { name: 'fax', label: '팩스 번호', type: 'text' },
];

const AdminAwards = () => {
    const navigate = useNavigate();
    const { isAdmin } = useAuth();
    const { awardsInfo, updateAwardsInfo } = useAwardsInfo();
    const [formData, setFormData] = useState(awardsInfo);

    useEffect(() => {
        setFormData(awardsInfo);
    }, [awardsInfo]);

    if (!isAdmin) {
        return <Navigate to="/login" replace />;
    }

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const success = await updateAwardsInfo(formData);
        if (success) {
            alert('공모전 정보가 수정되었습니다.');
            navigate('/projects/awards');
        } else {
            alert('저장에 실패했습니다. 다시 시도해주세요.');
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4 max-w-3xl">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
                >
                    <ChevronLeft size={20} />
                    <span className="ml-1">돌아가기</span>
                </button>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="bg-primary/5 px-8 py-6 border-b border-primary/10">
                        <h1 className="text-2xl font-bold text-gray-900">공모전 정보 수정</h1>
                        <p className="text-gray-600 mt-1">대한민국주거복지문화대상 공고 내용을 수정합니다. 코드 수정 없이 여기서 바로 반영됩니다.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 space-y-6">
                        {FIELDS.map(field => (
                            <div key={field.name}>
                                <label className="block text-sm font-medium text-gray-700 mb-2">{field.label}</label>
                                {field.type === 'textarea' ? (
                                    <textarea
                                        name={field.name}
                                        value={formData[field.name] || ''}
                                        onChange={handleChange}
                                        rows={4}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                                    />
                                ) : (
                                    <input
                                        type="text"
                                        name={field.name}
                                        value={formData[field.name] || ''}
                                        onChange={handleChange}
                                        className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                    />
                                )}
                            </div>
                        ))}

                        <div className="flex justify-end gap-3 pt-4 border-t border-gray-100">
                            <button
                                type="button"
                                onClick={() => navigate(-1)}
                                className="px-6 py-2 rounded-lg text-gray-600 hover:bg-gray-100 transition-colors font-medium"
                            >
                                취소
                            </button>
                            <button
                                type="submit"
                                className="px-8 py-2 rounded-lg bg-primary text-white hover:bg-primary/90 transition-colors font-medium shadow-sm hover:shadow-md"
                            >
                                저장하기
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminAwards;
