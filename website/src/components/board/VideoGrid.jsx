import React, { useState } from 'react';
import { Play, Edit, Trash2 } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { usePosts } from '../../context/PostContext';
import { useNavigate } from 'react-router-dom';

const VideoGrid = ({ posts }) => {
    // Helper to extract YouTube thumbnail
    const getYoutubeThumbnail = (url) => {
        if (!url) return '';
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? `https://img.youtube.com/vi/${match[2]}/maxresdefault.jpg` : '';
    };

    const getYoutubeEmbedUrl = (url) => {
        if (!url) return '';
        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|&v=)([^#&?]*).*/;
        const match = url.match(regExp);
        return (match && match[2].length === 11) ? `https://www.youtube.com/embed/${match[2]}` : '';
    }

    const [selectedVideo, setSelectedVideo] = useState(null);
    const { isAdmin } = useAuth();
    const { deletePost } = usePosts();
    const navigate = useNavigate();

    const handleDelete = (id) => {
        if (window.confirm('정말로 이 게시물을 삭제하시겠습니까?')) {
            deletePost(id);
            setSelectedVideo(null);
            alert('게시물이 삭제되었습니다.');
        }
    };

    return (
        <>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {posts.length > 0 ? (
                    posts.map((post) => (
                        <div
                            key={post.id}
                            onClick={() => setSelectedVideo(post)}
                            className="group cursor-pointer bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
                        >
                            <div className="relative aspect-video overflow-hidden bg-gray-900">
                                {post.videoUrl ? (
                                    <img
                                        src={getYoutubeThumbnail(post.videoUrl)}
                                        alt={post.title}
                                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                                    />
                                ) : post.image ? (
                                    <video
                                        src={post.image}
                                        className="w-full h-full object-cover opacity-90 group-hover:opacity-100 transition-opacity"
                                        muted playsInline
                                    />
                                ) : (
                                    <div className="w-full h-full bg-gray-800 flex items-center justify-center text-gray-400">No Video</div>
                                )}
                                <div className="absolute inset-0 flex items-center justify-center">
                                    <div className="w-12 h-12 bg-white/20 backdrop-blur-sm rounded-full flex items-center justify-center group-hover:bg-red-600 transition-colors">
                                        <Play className="fill-white text-white ml-1" size={20} />
                                    </div>
                                </div>
                            </div>
                            <div className="p-5">
                                <h3 className="font-bold text-gray-800 mb-2 line-clamp-2 group-hover:text-primary transition-colors">
                                    {post.title}
                                </h3>
                                <div className="flex justify-between items-center text-sm text-gray-500">
                                    <span>{post.date}</span>
                                    <span>조회 {post.views}</span>
                                </div>
                            </div>
                        </div>
                    ))
                ) : (
                    <div className="col-span-full py-12 text-center text-gray-500">
                        게시물이 없습니다.
                    </div>
                )}
            </div>

            {/* Video Modal */}
            {selectedVideo && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm" onClick={() => setSelectedVideo(null)}>
                    <div className="w-full max-w-4xl bg-black rounded-lg overflow-hidden shadow-2xl relative" onClick={e => e.stopPropagation()}>
                        <div className="aspect-video">
                            {selectedVideo.videoUrl ? (
                                <iframe
                                    title={selectedVideo.title}
                                    src={`${getYoutubeEmbedUrl(selectedVideo.videoUrl)}?autoplay=1`}
                                    className="w-full h-full"
                                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                    allowFullScreen
                                />
                            ) : selectedVideo.image ? (
                                <video
                                    src={selectedVideo.image}
                                    controls
                                    autoPlay
                                    className="w-full h-full bg-black outline-none"
                                />
                            ) : (
                                <div className="w-full h-full bg-gray-900 flex items-center justify-center text-gray-400">재생할 수 있는 영상이나 화면이 없습니다.</div>
                            )}
                        </div>
                        <div className="p-4 bg-white">
                            <div className="flex justify-between items-start">
                                <h3 className="text-xl font-bold text-gray-900">{selectedVideo.title}</h3>
                                <button className="text-gray-500 hover:text-gray-800" onClick={() => setSelectedVideo(null)}>
                                    <span className="text-2xl">&times;</span>
                                </button>
                            </div>
                            <p className="mt-2 text-gray-600 mb-4">{selectedVideo.content}</p>

                            {isAdmin && (
                                <div className="flex justify-end gap-2 pt-4 border-t border-gray-100">
                                    <button
                                        onClick={() => navigate(`/admin/write?edit=${selectedVideo.id}`)}
                                        className="flex items-center gap-1 px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-primary transition-colors font-medium text-sm"
                                    >
                                        <Edit size={16} />
                                        수정
                                    </button>
                                    <button
                                        onClick={() => handleDelete(selectedVideo.id)}
                                        className="flex items-center gap-1 px-4 py-2 rounded-lg bg-white border border-gray-200 text-gray-700 hover:bg-gray-50 hover:text-red-500 transition-colors font-medium text-sm"
                                    >
                                        <Trash2 size={16} />
                                        삭제
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            )}
        </>
    );
};

export default VideoGrid;
