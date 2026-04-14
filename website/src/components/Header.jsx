import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import { Menu, X, User, Heart } from 'lucide-react';
import logo from '../assets/logo.png';

const Header = () => {
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const location = useLocation();
    const { user, isAdmin, logout } = useAuth();

    const menuItems = [
        {
            title: '운동본부',
            path: '/about',
            subItems: [
                { name: '소개', path: '/about/intro' },
                { name: '연혁', path: '/about/history' },
                { name: '인사말', path: '/about/greetings' },
                { name: '협약기관', path: '/about/partners' },
            ]
        },
        {
            title: '사회공헌 파트너',
            path: '/social-partners',
        },
        {
            title: '주거복지우수사례',
            path: '/best-practices',
        },
        {
            title: '주요사업',
            path: '/projects',
            subItems: [
                { name: '주거복지문화대상', path: '/projects/awards' },
                { name: '장애인인식개선', path: '/projects/disability-awareness' },
            ]
        },
        {
            title: '소식',
            path: '/news',
            subItems: [
                { name: '공지/뉴스', path: '/news/notice' },
                { name: '파트너 소식', path: '/news/support' },
                { name: '보도자료', path: '/news/press' },
                { name: '영상', path: '/news/video' },
                { name: '갤러리', path: '/news/gallery' },
            ]
        },

    ];

    return (
        <header className="sticky top-0 z-50 bg-white border-b border-gray-100 shadow-sm">
            {/* Top Utility Bar */}
            <div className="bg-gray-50 border-b border-gray-100 text-xs py-2">
                <div className="container mx-auto px-4 flex justify-end gap-4 text-gray-500">
                    {user ? (
                        <div className="flex items-center gap-4">
                            <span className="text-gray-700 font-medium">{user.name}님 환영합니다</span>
                            <button onClick={logout} className="hover:text-primary transition-colors font-medium">로그아웃</button>
                        </div>
                    ) : (
                        <>
                            <Link to="/login" className="hover:text-primary transition-colors">로그인</Link>
                            <Link to="/signup" className="hover:text-primary transition-colors">회원가입</Link>
                        </>
                    )}
                    {user && (
                        <Link to="/mypage" className="hover:text-primary transition-colors">마이페이지</Link>
                    )}
                    {isAdmin && import.meta.env.DEV && (
                        <Link to="/admin" className="hover:text-primary transition-colors">관리자 모드</Link>
                    )}
                </div>
            </div>

            <nav className="container mx-auto px-4 h-20 flex items-center justify-between">
                {/* Logo */}
                <Link to="/" className="text-2xl font-bold text-primary flex items-center gap-2">
                    <img src={logo} alt="주거복지문화운동본부" className="h-12 w-auto object-contain" />
                </Link>

                {/* Desktop Menu */}
                <div className="hidden lg:flex items-center gap-8 h-full">
                    {menuItems.map((item) => (
                        <div key={item.title} className="group relative h-full flex items-center">
                            <Link
                                to={item.path}
                                className={`text-[17px] font-medium transition-colors ${location.pathname.startsWith(item.path)
                                    ? 'text-primary'
                                    : 'text-gray-700 hover:text-primary'
                                    }`}
                            >
                                {item.title}
                            </Link>

                            {/* Dropdown */}
                            {item.subItems && (
                                <div className="absolute top-full left-1/2 -translate-x-1/2 w-48 bg-white shadow-lg rounded-b-lg border-t-2 border-primary opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-200 overflow-hidden">
                                    {item.subItems.map(sub => (
                                        <Link
                                            key={sub.name}
                                            to={sub.path}
                                            className="block px-4 py-3 text-sm text-gray-600 hover:bg-gray-50 hover:text-primary font-medium"
                                        >
                                            {sub.name}
                                        </Link>
                                    ))}
                                </div>
                            )}
                        </div>
                    ))}
                </div>



                {/* Mobile Menu Button */}
                <button
                    className="lg:hidden p-2 text-gray-600"
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                >
                    {isMenuOpen ? <X size={24} /> : <Menu size={24} />}
                </button>
            </nav>

            {/* Mobile Menu Overlay */}
            {isMenuOpen && (
                <div className="lg:hidden absolute top-full left-0 w-full bg-white border-b shadow-xl max-h-[80vh] overflow-y-auto">
                    <div className="py-4">
                        {menuItems.map((item) => (
                            <div key={item.title} className="border-b border-gray-50 last:border-0">
                                <div className="px-6 py-3 font-bold text-gray-800 bg-gray-50">{item.title}</div>
                                {item.subItems ? (
                                    <div className="bg-white">
                                        {item.subItems.map(sub => (
                                            <Link
                                                key={sub.name}
                                                to={sub.path}
                                                onClick={() => setIsMenuOpen(false)}
                                                className="block px-6 py-3 text-sm text-gray-600 border-b border-gray-50 last:border-0 hover:bg-gray-50"
                                            >
                                                - {sub.name}
                                            </Link>
                                        ))}
                                    </div>
                                ) : (
                                    <Link
                                        to={item.path}
                                        onClick={() => setIsMenuOpen(false)}
                                        className="block px-6 py-3 text-sm text-gray-600 hover:bg-gray-50"
                                    >
                                        바로가기
                                    </Link>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            )}
        </header>
    );
};

export default Header;
