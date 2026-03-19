import React from 'react';
import { Routes, Route, useLocation, Link, Navigate } from 'react-router-dom';
import { useMenu } from '../context/MenuContext';
import History from '../components/about/History';
import Intro from '../components/about/Intro';
import Greetings from '../components/about/Greetings';
import Partners from '../components/about/Partners';

const AboutPage = () => {
    const location = useLocation();
    const { menuItems } = useMenu();

    // Find the 'about' menu item to get sub-items
    const aboutMenu = menuItems.find(item => item.path === '/about');
    const subItems = aboutMenu ? aboutMenu.subItems : [];

    // Get current page title from the path
    const getCurrentTitle = () => {
        const currentPath = location.pathname;
        const currentItem = subItems.find(item => item.path === currentPath);
        return currentItem ? currentItem.name : '소개';
    };

    return (
        <div className="py-20 bg-gray-50 min-h-[60vh]">
            <div className="container mx-auto px-4">
                {/* Header Section */}
                <div className="text-center mb-16">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">{aboutMenu.title}</h1>
                    <p className="text-gray-600">주거복지문화운동본부를 소개합니다.</p>
                </div>

                {/* Sub Navigation */}
                <div className="flex justify-center flex-wrap gap-2 mb-16">
                    {subItems.map((item) => (
                        <Link
                            key={item.id}
                            to={item.path}
                            className={`px-6 py-3 rounded-full text-sm font-bold transition-all ${location.pathname === item.path
                                ? 'bg-primary text-white shadow-md'
                                : 'bg-white text-gray-500 hover:bg-gray-100'
                                }`}
                        >
                            {item.name}
                        </Link>
                    ))}
                </div>

                {/* Content Area */}
                <div className="bg-white rounded-2xl p-8 md:p-12 shadow-sm min-h-[400px]">
                    <h2 className="text-3xl font-bold mb-10 text-center pb-6 border-b border-gray-100">
                        {getCurrentTitle()}
                    </h2>

                    <Routes>
                        <Route path="intro" element={<Intro />} />
                        <Route path="history" element={<History />} />
                        <Route path="greetings" element={<Greetings />} />
                        <Route path="partners" element={<Partners />} />
                        <Route path="*" element={<Navigate to="intro" replace />} />
                    </Routes>
                </div>
            </div>
        </div>
    );
};

export default AboutPage;
