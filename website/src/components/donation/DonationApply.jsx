import React, { useState, useEffect } from 'react';
import { Send } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const DonationApply = () => {
    const { user } = useAuth();
    const [formData, setFormData] = useState({
        type: '정기후원',
        amount: '10000',
        customAmount: '',
        name: '',
        phone: '',
        email: '',
        message: '',
        agreeToTerms: false
    });

    // Prepopulate form if user is logged in
    useEffect(() => {
        if (user) {
            setFormData(prev => ({
                ...prev,
                name: user.name || '',
                phone: user.phone || '',
                email: user.email || ''
            }));
        }
    }, [user]);

    const handleChange = (e) => {
        const { name, value, type, checked } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: type === 'checkbox' ? checked : value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!formData.agreeToTerms) {
            alert('개인정보 수집 및 이용에 동의해주세요.');
            return;
        }

        const finalAmount = formData.amount === 'custom' ? Number(formData.customAmount) : Number(formData.amount);

        if (!finalAmount || finalAmount <= 0) {
            alert('후원 금액을 올바르게 입력해주세요.');
            return;
        }

        const donationData = {
            userId: user ? user.id : null,
            name: formData.name,
            phone: formData.phone,
            email: formData.email,
            type: formData.type,
            amount: finalAmount,
            message: formData.message,
            method: '계좌이체' // Fixed for MVP based on UI
        };

        try {
            const response = await fetch('http://localhost:3001/api/donations', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(donationData)
            });

            if (response.ok) {
                alert('후원 신청이 완료되었습니다. 따뜻한 마음 감사합니다.\n입력하신 연락처로 후원 관련 안내 문자를 발송해 드리겠습니다.');

                // Reset form, keeping user info if logged in
                setFormData({
                    type: '정기후원',
                    amount: '10000',
                    customAmount: '',
                    name: user ? user.name : '',
                    phone: user ? user.phone : '',
                    email: user ? user.email : '',
                    message: '',
                    agreeToTerms: false
                });
            } else {
                alert('후원 신청 처리 중 오류가 발생했습니다. 다시 시도해 주세요.');
            }
        } catch (error) {
            console.error('Donation error:', error);
            alert('서버와 연결할 수 없습니다. 잠시 후 다시 시도해 주세요.');
        }
    };

    return (
        <div className="animate-fade-in w-full max-w-3xl mx-auto">
            <div className="bg-gray-50 border border-gray-200 rounded-xl p-8 mb-8">
                <p className="text-gray-700 text-center font-medium">
                    아래 신청서를 작성해주시면, 담당자가 확인 후 연락 및 납부 안내를 도와드립니다.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-8 bg-white">
                {/* Donation Type & Amount */}
                <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-900 border-b pb-2">후원 정보</h3>

                    <div>
                        <label className="block text-sm font-bold text-gray-700 mb-3">후원 종류 *</label>
                        <div className="flex gap-4">
                            {['정기후원', '일시후원', '물품/재능기부'].map(type => (
                                <label key={type} className={`
                                    flex-1 cursor-pointer border rounded-lg py-3 text-center transition-colors font-medium
                                    ${formData.type === type ? 'border-primary bg-primary/5 text-primary' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}
                                `}>
                                    <input
                                        type="radio"
                                        name="type"
                                        value={type}
                                        checked={formData.type === type}
                                        onChange={handleChange}
                                        className="hidden"
                                    />
                                    {type}
                                </label>
                            ))}
                        </div>
                    </div>

                    {formData.type !== '물품/재능기부' && (
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-3">후원 금액 *</label>
                            <div className="grid grid-cols-2 md:grid-cols-4 gap-3 mb-3">
                                {['10000', '30000', '50000', '100000'].map(amount => (
                                    <label key={amount} className={`
                                        cursor-pointer border rounded-lg py-2 text-center transition-colors
                                        ${formData.amount === amount ? 'border-primary bg-primary/5 text-primary font-bold' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}
                                    `}>
                                        <input
                                            type="radio"
                                            name="amount"
                                            value={amount}
                                            checked={formData.amount === amount}
                                            onChange={handleChange}
                                            className="hidden"
                                        />
                                        {Number(amount).toLocaleString()}원
                                    </label>
                                ))}
                            </div>
                            <div className="flex items-center gap-2">
                                <label className={`
                                    cursor-pointer border rounded-lg py-2 px-6 text-center transition-colors whitespace-nowrap
                                    ${formData.amount === 'custom' ? 'border-primary bg-primary/5 text-primary font-bold' : 'border-gray-200 text-gray-600 hover:bg-gray-50'}
                                `}>
                                    <input
                                        type="radio"
                                        name="amount"
                                        value="custom"
                                        checked={formData.amount === 'custom'}
                                        onChange={handleChange}
                                        className="hidden"
                                    />
                                    직접입력
                                </label>
                                <input
                                    type="number"
                                    name="customAmount"
                                    value={formData.customAmount}
                                    onChange={handleChange}
                                    disabled={formData.amount !== 'custom'}
                                    placeholder="금액을 입력해주세요"
                                    className={`w-full px-4 py-2 border rounded-lg outline-none transition-all ${formData.amount === 'custom' ? 'border-primary focus:ring-1 focus:ring-primary bg-white' : 'border-gray-200 bg-gray-50'}`}
                                />
                                <span className="text-gray-600 font-medium">원</span>
                            </div>
                        </div>
                    )}
                </div>

                {/* Personal Info */}
                <div className="space-y-6">
                    <h3 className="text-xl font-bold text-gray-900 border-b pb-2">신청자 정보</h3>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">이름 또는 단체명 *</label>
                            <input
                                type="text"
                                name="name"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="홍길동"
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                            />
                        </div>
                        <div>
                            <label className="block text-sm font-bold text-gray-700 mb-2">연락처 *</label>
                            <input
                                type="tel"
                                name="phone"
                                required
                                value={formData.phone}
                                onChange={handleChange}
                                placeholder="010-0000-0000"
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-bold text-gray-700 mb-2">이메일</label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="example@email.com"
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                            />
                        </div>
                        <div className="md:col-span-2">
                            <label className="block text-sm font-bold text-gray-700 mb-2">남기실 말씀</label>
                            <textarea
                                name="message"
                                rows="3"
                                value={formData.message}
                                onChange={handleChange}
                                placeholder="응원 메시지나 기타 문의사항을 남겨주세요."
                                className="w-full px-4 py-2.5 border border-gray-300 rounded-lg focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                            ></textarea>
                        </div>
                    </div>
                </div>

                {/* Terms and Submit */}
                <div className="space-y-6 pt-4">
                    <div className="bg-gray-50 border border-gray-200 rounded-lg p-4">
                        <label className="flex items-start gap-3 cursor-pointer">
                            <input
                                type="checkbox"
                                name="agreeToTerms"
                                checked={formData.agreeToTerms}
                                onChange={handleChange}
                                className="mt-1 w-4 h-4 text-primary bg-white border-gray-300 rounded focus:ring-primary"
                            />
                            <div className="text-sm text-gray-700">
                                <span className="font-bold text-gray-900 block mb-1">[필수] 개인정보 수집 및 이용 동의</span>
                                후원 상담 및 안내, 기부금 영수증 발급을 위해 수집된 개인정보는 동의일로부터 5년간 보관됩니다.
                            </div>
                        </label>
                    </div>

                    <div className="bg-primary/5 border border-primary/20 rounded-lg p-4 text-center">
                        <p className="text-gray-700 font-medium">
                            현재 후원금 납부는 <span className="text-primary font-bold">계좌이체(무통장입금) 및 자동이체(CMS)</span> 방식만 지원하고 있습니다. <br className="hidden sm:block" />신청 완료 후 안내 문자를 발송해 드립니다.
                        </p>
                    </div>

                    <button
                        type="submit"
                        className="w-full flex justify-center items-center gap-2 py-4 px-4 border border-transparent rounded-xl shadow-md text-lg font-bold text-white bg-primary hover:bg-primary-dark focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all hover:-translate-y-0.5"
                    >
                        <Send size={20} />
                        후원 신청하기
                    </button>
                </div>
            </form>
        </div>
    );
};

export default DonationApply;
