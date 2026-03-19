import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { ChevronLeft, Users, Mail, Phone, MapPin, Briefcase, Clock, Shield } from 'lucide-react';

const AdminMembers = () => {
    const navigate = useNavigate();
    const { isAdmin } = useAuth();
    const [members, setMembers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Double check admin status
        if (!isAdmin) {
            navigate('/login');
            return;
        }

        const fetchMembers = async () => {
            try {
                const response = await fetch('http://localhost:3002/api/users');
                if (response.ok) {
                    const data = await response.json();
                    setMembers(data);
                }
            } catch (error) {
                console.error('Failed to fetch members:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchMembers();
    }, [isAdmin, navigate]);

    if (loading) {
        return <div className="min-h-[60vh] flex items-center justify-center text-gray-500">회원 정보를 불러오는 중...</div>;
    }

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4 max-w-6xl">
                <button
                    onClick={() => navigate(-1)}
                    className="flex items-center text-gray-600 hover:text-gray-900 mb-6 transition-colors"
                >
                    <ChevronLeft size={20} />
                    <span className="ml-1">돌아가기</span>
                </button>

                <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
                    <div className="bg-primary/5 px-8 py-6 border-b border-primary/10 flex items-center justify-between">
                        <div>
                            <h1 className="text-2xl font-bold text-gray-900 flex items-center gap-2">
                                <Users size={24} className="text-primary" />
                                회원 가입 정보 관리
                            </h1>
                            <p className="text-gray-600 mt-1">총 {members.length}명의 회원이 등록되어 있습니다.</p>
                        </div>
                    </div>

                    <div className="overflow-x-auto">
                        <table className="w-full text-left border-collapse">
                            <thead>
                                <tr className="bg-gray-50 border-b border-gray-200 text-sm font-semibold text-gray-600 whitespace-nowrap">
                                    <th className="py-4 px-6">ID / 역할</th>
                                    <th className="py-4 px-6">이름</th>
                                    <th className="py-4 px-6">소속</th>
                                    <th className="py-4 px-6">연락처</th>
                                    <th className="py-4 px-6">이메일</th>
                                    <th className="py-4 px-6">주소</th>
                                    <th className="py-4 px-6">가입일</th>
                                </tr>
                            </thead>
                            <tbody className="text-sm">
                                {members.length > 0 ? (
                                    members.map((member) => (
                                        <tr key={member.id} className="border-b border-gray-100 hover:bg-gray-50/50 transition-colors">
                                            <td className="py-4 px-6">
                                                <div className="font-medium text-gray-900">{member.username}</div>
                                                {member.role === 'admin' && (
                                                    <span className="inline-flex items-center gap-1 mt-1 px-2 py-0.5 rounded text-[11px] font-bold bg-primary/10 text-primary">
                                                        <Shield size={10} /> 관리자
                                                    </span>
                                                )}
                                            </td>
                                            <td className="py-4 px-6 font-medium text-gray-800 whitespace-nowrap">
                                                {member.name}
                                            </td>
                                            <td className="py-4 px-6 text-gray-600">
                                                <div className="flex items-center gap-1.5">
                                                    <Briefcase size={14} className="text-gray-400 shrink-0" />
                                                    <span className="truncate max-w-[150px]" title={member.affiliation || '-'}>{member.affiliation || '-'}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 text-gray-600 whitespace-nowrap">
                                                <div className="flex items-center gap-1.5">
                                                    <Phone size={14} className="text-gray-400" />
                                                    {member.phone || '-'}
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 text-gray-600">
                                                <div className="flex items-center gap-1.5">
                                                    <Mail size={14} className="text-gray-400 shrink-0" />
                                                    <span className="truncate max-w-[150px]" title={member.email || '-'}>{member.email || '-'}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 text-gray-600">
                                                <div className="flex items-center gap-1.5">
                                                    <MapPin size={14} className="text-gray-400 shrink-0" />
                                                    <span className="truncate max-w-[200px]" title={member.address || '-'}>{member.address || '-'}</span>
                                                </div>
                                            </td>
                                            <td className="py-4 px-6 text-gray-500 whitespace-nowrap">
                                                <div className="flex items-center gap-1.5">
                                                    <Clock size={14} className="text-gray-400" />
                                                    {new Date(member.createdAt).toLocaleDateString()}
                                                </div>
                                            </td>
                                        </tr>
                                    ))
                                ) : (
                                    <tr>
                                        <td colSpan="7" className="py-12 text-center text-gray-500">
                                            가입한 회원이 없습니다.
                                        </td>
                                    </tr>
                                )}
                            </tbody>
                        </table>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminMembers;
