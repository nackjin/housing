import React from 'react';
import { Link } from 'react-router-dom';

const GalleryGrid = ({ posts }) => {
    return (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {posts.length > 0 ? (
                posts.map((post) => (
                    <Link key={post.id} to={`/news/${post.category}/${post.id}`} className="group block bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow">
                        <div className="relative aspect-video overflow-hidden bg-gray-100">
                            {post.image ? (
                                <img
                                    src={post.image}
                                    alt={post.title}
                                    className="w-full h-full object-cover transform group-hover:scale-105 transition-transform duration-500"
                                />
                            ) : (
                                <div className="w-full h-full flex items-center justify-center text-gray-400">
                                    No Image
                                </div>
                            )}
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors"></div>
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
                    </Link>
                ))
            ) : (
                <div className="col-span-full py-12 text-center text-gray-500">
                    게시물이 없습니다.
                </div>
            )}
        </div>
    );
};

export default GalleryGrid;
