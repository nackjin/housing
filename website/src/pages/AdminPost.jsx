import React, { useState } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { usePosts } from '../context/PostContext';
import { ChevronLeft } from 'lucide-react';

const AdminPost = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const editId = searchParams.get('edit');
    const { addPost, editPost, posts } = usePosts();

    const initialCategory = searchParams.get('category') || 'notice';

    // Default to URL param or 'notice' to ensure a valid initial state
    const [formData, setFormData] = useState({
        category: initialCategory,
        title: '',
        author: '관리자',
        content: '',
        image: '',
        imageFiles: [],
        videoUrl: ''
    });

    React.useEffect(() => {
        if (editId) {
            const postToEdit = posts.find(p => p.id.toString() === editId);
            if (postToEdit) {
                setFormData({
                    category: postToEdit.category,
                    title: postToEdit.title,
                    author: postToEdit.author,
                    content: postToEdit.content,
                    image: postToEdit.image || '',
                    imageFiles: [],
                    videoUrl: postToEdit.videoUrl || ''
                });
            }
        }
    }, [editId, posts]);

    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        if (type === 'file') {
            setFormData(prev => ({
                ...prev,
                imageFiles: Array.from(files)
            }));
        } else {
            setFormData(prev => ({
                ...prev,
                [name]: value
            }));
        }
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        console.log('Form Data before Submit:', formData);

        // Basic validation
        if (!formData.title || !formData.content) {
            alert('제목과 내용을 입력해주세요.');
            return;
        }

        // Prepare data for submission
        let submitData;
        if (formData.imageFiles && formData.imageFiles.length > 0) {
            submitData = new FormData();
            Object.keys(formData).forEach(key => {
                if (key === 'imageFiles') {
                    formData.imageFiles.forEach(file => {
                        submitData.append('images', file);
                    });
                } else if (key !== 'image') { // ignore old image string if uploading new files
                    submitData.append(key, formData[key]);
                }
            });
        } else {
            submitData = { ...formData };
            delete submitData.imageFiles;
        }

        // Add post
        if (editId) {
            editPost(Number(editId), submitData);
            alert('게시물이 수정되었습니다.');
        } else {
            addPost(submitData);
            alert('게시물이 등록되었습니다.');
        }

        // Navigate to the correct category page to see the new post
        navigate(`/news/${formData.category}`);
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
                        <h1 className="text-2xl font-bold text-gray-900">{editId ? '게시물 수정' : '게시물 작성'}</h1>
                        <p className="text-gray-600 mt-1">{editId ? '기존 소식을 수정합니다.' : '새로운 소식을 등록합니다.'}</p>
                    </div>

                    <form onSubmit={handleSubmit} className="p-8 space-y-6">
                        {/* Category & Author Row */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">카테고리</label>
                                {/* CRITICAL: The values here must match the category IDs in NewsPage.jsx and PostContext.jsx */}
                                <select
                                    name="category"
                                    value={formData.category}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                >
                                    <option value="notice">공지/뉴스 (notice)</option>
                                    <option value="support">파트너 소식 (support)</option>
                                    <option value="press">보도자료 (press)</option>
                                    <option value="video">영상 (video)</option>
                                    <option value="gallery">갤러리 (gallery)</option>
                                </select>
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">작성자</label>
                                <input
                                    type="text"
                                    name="author"
                                    value={formData.author}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                />
                            </div>
                        </div>

                        {/* Title */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">제목</label>
                            <input
                                type="text"
                                name="title"
                                value={formData.title}
                                onChange={handleChange}
                                placeholder="제목을 입력하세요"
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                            />
                        </div>

                        {/* URLs */}
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    이미지 첨부 (다중 선택 가능) <span className="text-gray-400 font-normal">(선택)</span>
                                </label>
                                <input
                                    type="file"
                                    multiple
                                    accept={formData.category === 'video' ? "image/*,video/*" : "image/*"}
                                    onChange={handleChange}
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-primary/10 file:text-primary hover:file:bg-primary/20"
                                />
                                {formData.image && formData.imageFiles.length === 0 && editId && (
                                    <p className="mt-2 text-sm text-gray-500">현재 이미지: <a href={formData.image} target="_blank" rel="noreferrer" className="text-primary hover:underline">보기</a></p>
                                )}
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-gray-700 mb-2">
                                    관련 링크 / 영상 URL <span className="text-gray-400 font-normal">(선택)</span>
                                </label>
                                <input
                                    type="text"
                                    name="videoUrl"
                                    value={formData.videoUrl}
                                    onChange={handleChange}
                                    placeholder="https://example.com/article, 또는 YouTube 주소"
                                    className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all"
                                />
                            </div>
                        </div>

                        {/* Content */}
                        <div>
                            <label className="block text-sm font-medium text-gray-700 mb-2">내용</label>
                            <textarea
                                name="content"
                                value={formData.content}
                                onChange={handleChange}
                                rows="10"
                                placeholder="내용을 입력하세요"
                                className="w-full px-4 py-2 rounded-lg border border-gray-300 focus:border-primary focus:ring-1 focus:ring-primary outline-none transition-all resize-none"
                            ></textarea>
                        </div>

                        {/* Buttons */}
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
                                {editId ? '수정하기' : '등록하기'}
                            </button>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AdminPost;
