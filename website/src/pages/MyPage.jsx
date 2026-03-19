import React, { useState, useEffect } from 'react';
import { useAuth } from '../context/AuthContext';
import { User, Wallet, FileText, ChevronRight, Settings, Users } from 'lucide-react';
import { Navigate } from 'react-router-dom';
import AdminMembers from './AdminMembers';

const MyPage = () => {
    const { user, updateUser } = useAuth();
    const [activeTab, setActiveTab] = useState('profile');

    const [editForm, setEditForm] = useState({
        email: user?.email || '',
        phone: user?.phone || '',
        address: user?.address || '',
        affiliation: user?.affiliation || ''
    });

    const [donationHistory, setDonationHistory] = useState([]);

    useEffect(() => {
        const fetchDonations = async () => {
            try {
                const response = await fetch('http://localhost:3002/api/donations');
                if (response.ok) {
                    const allDonations = await response.json();
                    if (user && user.role === 'admin') {
                        setDonationHistory(allDonations);
                    } else if (user) {
                        setDonationHistory(allDonations.filter(d => d.userId === user.id));
                    }
                }
            } catch (error) {
                console.error('Failed to fetch donations:', error);
            }
        };

        if (user) {
            fetchDonations();
        }
    }, [user, activeTab]);

    if (!user) {
        return <Navigate to="/login" replace />;
    }

    const userInfo = {
        name: user.name,
        email: user.email,
        phone: user.phone || '-',
        address: user.address || '-',
        affiliation: user.affiliation || '-',
        joinDate: new Date(user.createdAt).toLocaleDateString(),
        type: user.role === 'admin' ? '관리자' : '일반회원'
    };

    const handleProfileUpdate = async (e) => {
        e.preventDefault();
        const success = await updateUser(user.id, editForm);
        if (success) {
            alert('정보가 성공적으로 수정되었습니다.');
            setActiveTab('donations');
        } else {
            alert('정보 수정에 실패했습니다. 다시 시도해주세요.');
        }
    };


    // Total calculated from actual history
    const totalDonation = donationHistory.reduce((acc, curr) => acc + curr.amount, 0);

    const renderContent = () => {
        switch (activeTab) {
            case 'donations':
                return (
                    <div className="animate-fade-in">
                        <div className="flex justify-between items-center mb-6">
                            <h3 className="text-xl font-bold text-gray-900 border-b-2 border-primary inline-block pb-2">
                                {user.role === 'admin' ? '전체 후원 내역' : '나의 후원 내역'}
                            </h3>
                            <button className="text-sm font-medium text-gray-500 hover:text-primary transition-colors flex items-center">
                                기부금 영수증 발급 <ChevronRight size={16} />
                            </button>
                        </div>

                        {/* Summary Widget */}
                        <div className="bg-primary/5 rounded-xl p-6 mb-8 flex flex-col md:flex-row items-center justify-between border border-primary/10">
                            <div>
                                <p className="text-gray-600 mb-1">
                                    {user.role === 'admin' ? '전체 누적 후원금액' : `지금까지 ${userInfo.name}님이 보내주신 따뜻한 마음`}
                                </p>
                                <div className="text-3xl font-bold text-primary">{totalDonation.toLocaleString()} <span className="text-lg font-medium text-gray-700">원</span></div>
                            </div>
                            <div className="mt-4 md:mt-0 text-center md:text-right">
                                <div className="inline-block bg-white px-4 py-2 rounded-lg border border-gray-200 shadow-sm">
                                    <span className="text-sm text-gray-500 mr-2">후원 횟수</span>
                                    <span className="font-bold text-gray-900">{donationHistory.length}회</span>
                                </div>
                            </div>
                        </div>

                        {/* History Table */}
                        <div className="bg-white border text-center border-gray-200 rounded-lg overflow-hidden">
                            <table className="w-full text-sm text-gray-600">
                                <thead className="bg-gray-50 border-b border-gray-200 text-gray-700">
                                    <tr>
                                        <th className="py-4 px-4 font-bold">결제일</th>
                                        <th className="py-4 px-4 font-bold">후원종류</th>
                                        <th className="py-4 px-4 font-bold">결제수단</th>
                                        <th className="py-4 px-4 font-bold">금액</th>
                                        <th className="py-4 px-4 font-bold">상태</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {donationHistory.length > 0 ? donationHistory.map((item) => (
                                        <tr key={item.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                            <td className="py-4 px-4">{item.date}</td>
                                            <td className="py-4 px-4">
                                                <span className={`px-2.5 py-1 rounded-full text-xs font-medium ${item.type === '정기후원' ? 'bg-blue-100 text-blue-700' : 'bg-green-100 text-green-700'}`}>
                                                    {item.type}
                                                </span>
                                            </td>
                                            <td className="py-4 px-4">{item.method}</td>
                                            <td className="py-4 px-4 font-bold text-gray-900">{item.amount.toLocaleString()}원</td>
                                            <td className="py-4 px-4">
                                                <span className={`${item.status === '결제완료' ? 'text-green-600' : 'text-primary'} font-medium`}>{item.status}</span>
                                            </td>
                                        </tr>
                                    )) : (
                                        <tr>
                                            <td colSpan="5" className="py-12 text-center text-gray-500">후원 내역이 없습니다.</td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                );
            case 'profile':
                return (
                    <div className="animate-fade-in">
                        <h3 className="text-xl font-bold text-gray-900 mb-6 border-b-2 border-primary inline-block pb-2">나의 정보 수정</h3>
                        <div className="bg-white border border-gray-200 rounded-xl p-8">
                            <form className="space-y-6 max-w-lg" onSubmit={handleProfileUpdate}>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">이름</label>
                                    <input type="text" disabled defaultValue={userInfo.name} className="w-full px-4 py-2 border border-gray-200 rounded-lg bg-gray-50 text-gray-500" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">이메일</label>
                                    <input type="email" value={editForm.email} onChange={(e) => setEditForm(prev => ({ ...prev, email: e.target.value }))} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none" required />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">연락처</label>
                                    <input type="tel" value={editForm.phone} onChange={(e) => setEditForm(prev => ({ ...prev, phone: e.target.value }))} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">주소</label>
                                    <input type="text" value={editForm.address} onChange={(e) => setEditForm(prev => ({ ...prev, address: e.target.value }))} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
                                </div>
                                <div>
                                    <label className="block text-sm font-medium text-gray-700 mb-2">소속</label>
                                    <input type="text" value={editForm.affiliation} onChange={(e) => setEditForm(prev => ({ ...prev, affiliation: e.target.value }))} className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none" />
                                </div>
                                <div className="pt-4 border-t border-gray-100">
                                    <button type="submit" className="px-6 py-2 bg-primary text-white rounded-lg font-medium hover:bg-primary/90 transition-colors">
                                        정보 저장하기
                                    </button>
                                </div>
                            </form>
                        </div>
                    </div>
                );
            case 'members':
                return user.role === 'admin' ? (
                    <div className="animate-fade-in">
                        <h3 className="text-xl font-bold text-gray-900 mb-6 border-b-2 border-primary inline-block pb-2">회원 관리</h3>
                        <div className="bg-white border border-gray-200 rounded-xl p-4 overflow-hidden">
                            <AdminMembers />
                        </div>
                    </div>
                ) : null;
            default:
                return null;
        }
    };

    return (
        <div className="min-h-screen bg-gray-50 py-12">
            <div className="container mx-auto px-4 max-w-6xl flex flex-col md:flex-row gap-8">

                {/* Sidebar */}
                <aside className="w-full md:w-64 flex-shrink-0">
                    {/* User Summary Card */}
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-6 mb-6 text-center">
                        <div className="w-20 h-20 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center text-gray-400">
                            <User size={36} />
                        </div>
                        <h2 className="text-xl font-bold text-gray-900 mb-1">{userInfo.name} 님</h2>
                        <p className="text-sm text-primary font-medium mb-3">{userInfo.type}</p>
                        <hr className="border-gray-100 my-4" />
                        <div className="text-xs text-gray-500">
                            가입일: {userInfo.joinDate}
                        </div>
                    </div>

                    {/* Navigation Menu */}
                    <nav className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">

                        <button
                            onClick={() => setActiveTab('profile')}
                            className={`w-full flex items-center justify-between px-6 py-4 text-sm font-medium transition-colors border-b border-gray-50 ${activeTab === 'profile' ? 'bg-primary/5 text-primary border-l-4 border-l-primary' : 'text-gray-600 hover:bg-gray-50 border-l-4 border-l-transparent'}`}
                        >
                            <span className="flex items-center gap-2"><Settings size={18} /> 나의 정보 수정</span>
                            <ChevronRight size={16} className={activeTab === 'profile' ? 'text-primary' : 'text-gray-400'} />
                        </button>
                        {user.role === 'admin' && (
                            <button
                                onClick={() => setActiveTab('members')}
                                className={`w-full flex items-center justify-between px-6 py-4 text-sm font-medium transition-colors ${activeTab === 'members' ? 'bg-primary/5 text-primary border-l-4 border-l-primary' : 'text-gray-600 hover:bg-gray-50 border-l-4 border-l-transparent'}`}
                            >
                                <span className="flex items-center gap-2"><Users size={18} /> 회원 관리</span>
                                <ChevronRight size={16} className={activeTab === 'members' ? 'text-primary' : 'text-gray-400'} />
                            </button>
                        )}
                    </nav>
                </aside>

                {/* Main Content Area */}
                <main className="flex-1 min-h-[500px]">
                    <div className="bg-white rounded-xl shadow-sm border border-gray-100 p-8">
                        {renderContent()}
                    </div>
                </main>
            </div>
        </div>
    );
};

export default MyPage;
