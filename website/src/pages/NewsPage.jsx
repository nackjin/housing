import React, { useEffect } from 'react';
import { useParams, NavLink, Navigate, Link, useNavigate } from 'react-router-dom';
import { usePosts } from '../context/PostContext';
import { useAuth } from '../context/AuthContext';
import BoardList from '../components/board/BoardList';
import GalleryGrid from '../components/board/GalleryGrid';
import VideoGrid from '../components/board/VideoGrid';
import PostPagination from '../components/board/PostPagination';
import PostDetail from '../components/board/PostDetail';
import { ChevronRight, Home } from 'lucide-react';

const NewsPage = () => {
    const { category } = useParams();
    const { posts } = usePosts();
    const { isAdmin } = useAuth();
    const navigate = useNavigate();

    // Define categories config
    const categories = [
        { id: 'notice', label: '공지/뉴스', type: 'list' },
        { id: 'support', label: '파트너 소식', type: 'list' },
        { id: 'press', label: '보도자료', type: 'list' },
        { id: 'video', label: '영상', type: 'video' },
        { id: 'gallery', label: '갤러리', type: 'gallery' },
    ];

    // Redirect to default category if current category is invalid or missing
    const currentCategory = categories.find(c => c.id === category);

    if (!category || !currentCategory) {
        return <Navigate to="/news/notice" replace />;
    }

    // Filter posts
    // CRITICAL: Ensure we are filtering by the exact category string
    const filteredPosts = posts.filter(post => post.category === category);

    // Render board based on type
    const renderBoard = () => {
        switch (currentCategory.type) {
            case 'list':
                return <BoardList posts={filteredPosts} />;
            case 'gallery':
                return <GalleryGrid posts={filteredPosts} />;
            case 'video':
                return <VideoGrid posts={filteredPosts} />;
            default:
                return <BoardList posts={filteredPosts} />;
        }
    };

    return (
        <div className="min-h-screen bg-white">
            {/* Header / Banner Area (Simple for now) */}
            <div className="bg-primary/5 py-16">
                <div className="container mx-auto px-4">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">소식</h1>
                    <p className="text-gray-600">주거복지문화운동본부의 새로운 소식을 전해드립니다.</p>
                </div>
            </div>

            {/* Breadcrumb */}
            <div className="border-b border-gray-200">
                <div className="container mx-auto px-4 py-4 flex items-center text-sm text-gray-500">
                    <Link to="/" className="hover:text-primary"><Home size={16} /></Link>
                    <ChevronRight size={16} className="mx-2" />
                    <span>소식</span>
                    <ChevronRight size={16} className="mx-2" />
                    <span className="text-primary font-medium">{currentCategory.label}</span>
                </div>
            </div>

            <div className="container mx-auto px-4 py-12 flex flex-col lg:flex-row gap-12">
                {/* Sidebar Navigation */}
                <aside className="w-full lg:w-64 flex-shrink-0">
                    <div className="bg-gray-50 rounded-lg p-6 sticky top-24">
                        <h2 className="text-xl font-bold text-gray-900 mb-6 px-2 border-l-4 border-primary">
                            소식
                        </h2>
                        <nav className="flex flex-col gap-1">
                            {categories.map((cat) => (
                                <NavLink
                                    key={cat.id}
                                    to={`/news/${cat.id}`}
                                    className={({ isActive }) => `
                                        px-4 py-3 rounded-md transition-all font-medium flex justify-between items-center
                                        ${isActive
                                            ? 'bg-white text-primary shadow-sm border border-primary/10'
                                            : 'text-gray-600 hover:bg-gray-100 hover:text-gray-900'
                                        }
                                    `}
                                >
                                    {cat.label}
                                    <ChevronRight size={16} className={`opacity-0 transition-opacity ${category === cat.id ? 'opacity-100' : ''}`} />
                                </NavLink>
                            ))}
                        </nav>
                    </div>
                </aside>

                {/* Main Content */}
                <main className="flex-1">
                    <div className="mb-8 flex justify-between items-end border-b-2 border-gray-900 pb-4">
                        <h2 className="text-2xl font-bold text-gray-900">
                            {currentCategory.label}
                        </h2>
                        {isAdmin && import.meta.env.DEV && (
                            <button
                                onClick={() => navigate(`/admin/write?category=${currentCategory.id}`)}
                                className="bg-primary hover:bg-primary-dark text-white px-5 py-2 rounded-lg font-medium transition-colors shadow-sm text-sm"
                            >
                                글쓰기
                            </button>
                        )}
                    </div>

                    {/* Conditional Rendering: Detail View or List View */}
                    {useParams().id ? (
                        <PostDetail />
                    ) : (
                        <>
                            {renderBoard()}

                            <PostPagination
                                currentPage={1}
                                totalPages={1}
                                onPageChange={() => { }}
                            />
                        </>
                    )}
                </main>
            </div >
        </div >
    );
};

export default NewsPage;
