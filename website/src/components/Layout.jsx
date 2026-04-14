import React from 'react';
import { usePosts } from '../context/PostContext';
import { Outlet } from 'react-router-dom';
import Header from './Header';
import Footer from './Footer';

const Layout = () => {
    const { apiError } = usePosts();

    return (
        <div className="flex flex-col min-h-screen bg-white">
            <Header />
            {/* API error banner */}
            {apiError && (
                <div className="bg-yellow-50 border border-yellow-200 text-yellow-800 p-3 flex items-center gap-2">
                    <svg className="w-5 h-5 text-yellow-600" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M12 2a10 10 0 100 20 10 10 0 000-20z"/></svg>
                    <span>서버와 연결할 수 없습니다. 로컬 저장소에서 데이터를 불러왔습니다.</span>
                </div>
            )}
            <main className="flex-grow">
                <Outlet />
            </main>
            <Footer />
        </div>
    );
};

export default Layout;
