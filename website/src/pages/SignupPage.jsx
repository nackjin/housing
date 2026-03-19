import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { User, Lock, Mail, Phone, UserCheck, MapPin, Briefcase } from 'lucide-react';

const SignupPage = () => {
    const navigate = useNavigate();
    const [formData, setFormData] = useState({
        username: '',
        password: '',
        passwordConfirm: '',
        name: '',
        email: '',
        phone: '',
        address: '',
        affiliation: ''
    });
    const [error, setError] = useState('');

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError('');

        // Basic validation
        if (formData.password !== formData.passwordConfirm) {
            setError('비밀번호가 일치하지 않습니다.');
            return;
        }

        if (formData.password.length < 4) {
            setError('비밀번호는 4자리 이상이어야 합니다.');
            return;
        }

        try {
            const response = await fetch('http://localhost:3002/api/users/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            });

            if (!response.ok) {
                const data = await response.json();
                setError(data.error || '회원가입에 실패했습니다.');
                return;
            }

            alert('회원가입이 완료되었습니다. 로그인해주세요.');
            navigate('/login');
        } catch (err) {
            console.error('Registration error:', err);
            setError('서버와 통신 중 문제가 발생했습니다.');
        }
    };

    return (
        <div className="min-h-[80vh] flex items-center justify-center bg-gray-50 py-12 px-4 sm:px-6 lg:px-8">
            <div className="max-w-md w-full space-y-8 bg-white p-10 rounded-2xl shadow-sm border border-gray-100">
                <div>
                    <h2 className="mt-2 text-center text-3xl font-extrabold text-gray-900">
                        회원가입
                    </h2>
                    <p className="mt-2 text-center text-sm text-gray-600">
                        주거복지문화운동본부의 새로운 식구가 되어주세요
                    </p>
                </div>

                <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
                    <div className="space-y-4">
                        {/* Name */}
                        <div className="relative">
                            <label htmlFor="name" className="sr-only">이름</label>
                            <UserCheck className="absolute top-3 left-3 text-gray-400" size={20} />
                            <input
                                id="name"
                                name="name"
                                type="text"
                                required
                                value={formData.name}
                                onChange={handleChange}
                                className="appearance-none relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm transition-colors"
                                placeholder="이름 (실명)"
                            />
                        </div>

                        {/* ID */}
                        <div className="relative">
                            <label htmlFor="username" className="sr-only">아이디</label>
                            <User className="absolute top-3 left-3 text-gray-400" size={20} />
                            <input
                                id="username"
                                name="username"
                                type="text"
                                required
                                value={formData.username}
                                onChange={handleChange}
                                className="appearance-none relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm transition-colors"
                                placeholder="아이디"
                            />
                        </div>

                        {/* Password */}
                        <div className="relative">
                            <label htmlFor="password" className="sr-only">비밀번호</label>
                            <Lock className="absolute top-3 left-3 text-gray-400" size={20} />
                            <input
                                id="password"
                                name="password"
                                type="password"
                                required
                                value={formData.password}
                                onChange={handleChange}
                                className="appearance-none relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm transition-colors"
                                placeholder="비밀번호"
                            />
                        </div>

                        {/* Password Confirm */}
                        <div className="relative">
                            <label htmlFor="passwordConfirm" className="sr-only">비밀번호 확인</label>
                            <Lock className="absolute top-3 left-3 text-gray-400" size={20} />
                            <input
                                id="passwordConfirm"
                                name="passwordConfirm"
                                type="password"
                                required
                                value={formData.passwordConfirm}
                                onChange={handleChange}
                                className="appearance-none relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm transition-colors"
                                placeholder="비밀번호 확인"
                            />
                        </div>

                        {/* Email */}
                        <div className="relative">
                            <label htmlFor="email" className="sr-only">이메일</label>
                            <Mail className="absolute top-3 left-3 text-gray-400" size={20} />
                            <input
                                id="email"
                                name="email"
                                type="email"
                                required
                                value={formData.email}
                                onChange={handleChange}
                                className="appearance-none relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm transition-colors"
                                placeholder="이메일 주소"
                            />
                        </div>

                        {/* Phone */}
                        <div className="relative">
                            <label htmlFor="phone" className="sr-only">연락처</label>
                            <Phone className="absolute top-3 left-3 text-gray-400" size={20} />
                            <input
                                id="phone"
                                name="phone"
                                type="tel"
                                required
                                value={formData.phone}
                                onChange={handleChange}
                                className="appearance-none relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm transition-colors"
                                placeholder="연락처 ('-' 제외)"
                            />
                        </div>
                        {/* Address */}
                        <div className="relative">
                            <label htmlFor="address" className="sr-only">주소</label>
                            <MapPin className="absolute top-3 left-3 text-gray-400" size={20} />
                            <input
                                id="address"
                                name="address"
                                type="text"
                                required
                                value={formData.address}
                                onChange={handleChange}
                                className="appearance-none relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm transition-colors"
                                placeholder="주소 (예: 서울특별시 관악구)"
                            />
                        </div>

                        {/* Affiliation */}
                        <div className="relative">
                            <label htmlFor="affiliation" className="sr-only">소속</label>
                            <Briefcase className="absolute top-3 left-3 text-gray-400" size={20} />
                            <input
                                id="affiliation"
                                name="affiliation"
                                type="text"
                                required
                                value={formData.affiliation}
                                onChange={handleChange}
                                className="appearance-none relative block w-full px-10 py-3 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-lg focus:outline-none focus:ring-primary focus:border-primary focus:z-10 sm:text-sm transition-colors"
                                placeholder="소속 (직장명, 학교명 등)"
                            />
                        </div>
                    </div>

                    {error && (
                        <div className="text-red-500 text-sm text-center font-medium bg-red-50 p-3 rounded-lg">
                            {error}
                        </div>
                    )}

                    <div>
                        <button
                            type="submit"
                            className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-bold rounded-lg text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary transition-all shadow-sm hover:shadow-md"
                        >
                            가입하기
                        </button>
                    </div>
                </form>

                <div className="mt-6 text-center text-sm text-gray-600">
                    이미 계정이 있으신가요?{' '}
                    <Link to="/login" className="font-bold text-primary hover:text-primary-dark transition-colors">
                        로그인하기
                    </Link>
                </div>
            </div>
        </div>
    );
};

export default SignupPage;
