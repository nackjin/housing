import React, { createContext, useContext, useState, useEffect } from 'react';

const PostContext = createContext();

export const usePosts = () => useContext(PostContext);

export const PostProvider = ({ children }) => {
    const [apiError, setApiError] = useState(false);
    // Load posts from localStorage if available
    const loadFromLocalStorage = () => {
        try {
            const stored = localStorage.getItem('posts');
            if (stored) {
                const parsed = JSON.parse(stored);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    setPosts(parsed);
                    return true;
                }
            }
        } catch (e) {
            console.error('Failed to parse posts from localStorage', e);
        }
        return false;
    };
    // Mock Data (Default) - This ensures data is always available if localStorage is empty
    const defaultPosts = [
        // 공지사항 Data
        {
            id: 1,
            category: 'notice',
            title: '2026년도 주거복지문화대상 시상식 개최 안내',
            date: '2026-01-05',
            author: '관리자',
            views: 128,
            content: '2026년도 주거복지문화대상 시상식이 오는 2월 15일 개최됩니다. 많은 관심 부탁드립니다.',
        },
        {
            id: 11,
            category: 'notice',
            title: '홈페이지 서버 점검 안내 (1/30)',
            date: '2026-01-20',
            author: '관리자',
            views: 45,
            content: '안정적인 서비스 제공을 위해 서버 점검이 진행될 예정입니다.',
        },

        // 보도자료 Data
        {
            id: 2,
            category: 'press',
            title: '주거복지문화운동본부, 새로운 비전 선포',
            date: '2025-12-28',
            author: '홍보팀',
            views: 342,
            content: '주거복지문화운동본부가 창립 10주년을 맞아 새로운 비전을 선포했습니다.',
        },
        {
            id: 21,
            category: 'press',
            title: '[보도] 취약계층을 위한 주거환경 개선 사업 확대',
            date: '2026-01-15',
            author: '홍보팀',
            views: 210,
            content: '올해부터 취약계층 주거환경 개선 사업이 전국으로 확대됩니다.',
        },



        // 갤러리 Data
        {
            id: 3,
            category: 'gallery',
            title: '제9회 시상식 현장 스케치',
            date: '2025-12-26',
            author: '관리자',
            views: 550,
            image: 'https://images.unsplash.com/photo-1544161513-0179fe746fd5?q=80&w=2070&auto=format&fit=crop',
            content: '시상식의 생생한 현장을 사진으로 담았습니다.',
        },
        {
            id: 41,
            category: 'gallery',
            title: '사랑의 집짓기 봉사활동',
            date: '2025-11-15',
            author: '관리자',
            views: 420,
            image: 'https://images.unsplash.com/photo-1593113598332-cd288d649433?q=80&w=2070&auto=format&fit=crop',
            content: '자원봉사자 분들과 함께한 사랑의 집짓기 현장입니다.',
        },
        {
            id: 42,
            category: 'gallery',
            title: '주거복지 세미나 개최',
            date: '2025-10-30',
            author: '관리자',
            views: 310,
            image: 'https://images.unsplash.com/photo-1517457373958-b7bdd4587205?q=80&w=2069&auto=format&fit=crop',
            content: '전문가들과 함께한 주거복지 세미나 현장입니다.',
        },

        // 영상 Data (YouTube ID or URL)
        {
            id: 51,
            category: 'video',
            title: '주거복지문화운동본부 홍보영상',
            date: '2026-01-01',
            author: '미디어팀',
            views: 1200,
            videoUrl: 'https://www.youtube.com/watch?v=ScMzIvxBSi4', // Example URL
            content: '우리가 꿈꾸는 세상, 함께 만들어갑니다.',
        },
        {
            id: 52,
            category: 'video',
            title: '2025년 활동 결산',
            date: '2025-12-31',
            author: '미디어팀',
            views: 890,
            videoUrl: 'https://www.youtube.com/watch?v=LXb3EKWsInQ', // Example URL
            content: '지난 1년간의 활동을 영상으로 정리했습니다.',
        }
    ];

    // Initialize state from localStorage or use default
    // We check if the saved data is valid and has length. If not, we fallback to defaultPosts.
    const [posts, setPosts] = useState([]);
    const isDev = import.meta.env.DEV;
    const BACKEND_URL = isDev ? 'http://localhost:3002' : 'https://housing-fcu7.onrender.com';
    const API_BASE_URL = `${BACKEND_URL}/api/posts`;

    // Helper to fix image URLs from localhost to production
    const fixPostUrls = (post) => {
        const fixUrl = (url) => {
            if (!url) return url;
            if (url.startsWith('/uploads/')) return BACKEND_URL + url;
            if (url.includes('localhost:')) {
                return url.replace(/http:\/\/localhost:\d+/, BACKEND_URL);
            }
            return url;
        };
        return {
            ...post,
            image: fixUrl(post.image),
            images: post.images && Array.isArray(post.images) ? post.images.map(fixUrl) : []
        };
    };

    useEffect(() => {
        // Try loading from localStorage first
        const loaded = loadFromLocalStorage();
        if (!loaded) {
            const fetchPosts = async () => {
                try {
                    const response = await fetch(API_BASE_URL);
                    if (response.ok) {
                        const data = await response.json();
                        const fixed = data.map(fixPostUrls);
                        setPosts(fixed);
                        localStorage.setItem('posts', JSON.stringify(fixed));
                        setApiError(false);
                    } else {
                        console.error('Failed to fetch posts from API');
                        setPosts(defaultPosts);
                        setApiError(true);
                    }
                } catch (error) {
                    console.error('API is not running, falling back to default data:', error);
                    setPosts(defaultPosts);
                    setApiError(true);
                }
            };
            fetchPosts();
        } else {
            setApiError(false);
        }
    }, []);

    // Helper to generate a random view count for video posts (200~300)
    const getRandomViews = () => Math.floor(Math.random() * 101) + 200;

    const addPost = async (post) => {
        const isFormData = post instanceof FormData;

        let body;
        let headers = {};

        if (isFormData) {
            // If using FormData, ensure a views field is added for video category
            if (post.get('category') === 'video' && !post.has('views')) {
                post.append('views', getRandomViews().toString());
            }
            body = post;
        } else {
            // For plain JSON posts, set views = 0 by default, but override for video posts
            const basePost = { ...post, views: 0 };
            if (post.category === 'video') {
                basePost.views = getRandomViews();
            }
            const newPostData = basePost; // Server assigns ID and Date
            body = JSON.stringify(newPostData);
            headers['Content-Type'] = 'application/json';
        }

        try {
            const response = await fetch(API_BASE_URL, {
                method: 'POST',
                headers,
                body
            });

            if (response.ok) {
                const createdPost = await response.json();
                console.log('Successfully added to local server:', createdPost);
                setPosts((prevPosts) => {
                    const updated = [fixPostUrls(createdPost), ...prevPosts];
                    localStorage.setItem('posts', JSON.stringify(updated));
                    return updated;
                });
            } else {
                console.error('Failed to add post via API');
            }
        } catch (error) {
            console.error('Network error when adding post', error);
        }
    };

    const deletePost = async (id) => {
        try {
            const response = await fetch(`${API_BASE_URL}/${id}`, {
                method: 'DELETE'
            });

            if (response.ok) {
                setPosts(prevPosts => {
                    const updated = prevPosts.filter(p => p.id !== id);
                    localStorage.setItem('posts', JSON.stringify(updated));
                    return updated;
                });
            } else {
                console.error('Failed to delete post via API');
            }
        } catch (error) {
            console.error('Network error when deleting post', error);
        }
    };

    const editPost = async (id, updatedPost) => {
        const isFormData = updatedPost instanceof FormData;
        let body;
        let headers = {};

        if (isFormData) {
            body = updatedPost;
        } else {
            body = JSON.stringify(updatedPost);
            headers['Content-Type'] = 'application/json';
        }

        try {
            const response = await fetch(`${API_BASE_URL}/${id}`, {
                method: 'PUT',
                headers,
                body
            });

            if (response.ok) {
                const result = await response.json();
                setPosts(prevPosts => {
                    const updated = prevPosts.map(p => p.id === id ? fixPostUrls(result) : p);
                    localStorage.setItem('posts', JSON.stringify(updated));
                    return updated;
                });
            } else {
                console.error('Failed to update post via API');
            }
        } catch (error) {
            console.error('Network error when updating post', error);
        }
    };

    // Helper to reset data (for debugging or if things go wrong)
    const resetData = () => {
        setPosts(defaultPosts);
    };

    return (
        <PostContext.Provider value={{ posts, addPost, deletePost, editPost, resetData, apiError }}>
            {children}
        </PostContext.Provider>
    );
};
