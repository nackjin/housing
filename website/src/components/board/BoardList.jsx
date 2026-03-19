import React from 'react';
import { Link } from 'react-router-dom';

const BoardList = ({ posts }) => {
    return (
        <div className="overflow-x-auto">
            <table className="w-full border-t-2 border-primary">
                <thead>
                    <tr className="bg-gray-50 border-b border-gray-200 text-gray-700">
                        <th className="py-4 px-4 text-center w-16 md:w-24">번호</th>
                        <th className="py-4 px-4 text-center">제목</th>
                        <th className="py-4 px-4 text-center w-24 md:w-32">작성자</th>
                        <th className="py-4 px-4 text-center w-24 md:w-32">작성일</th>
                        <th className="py-4 px-4 text-center w-16 md:w-24">조회</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.length > 0 ? (
                        posts.map((post, index) => (
                            <tr key={post.id} className="border-b border-gray-100 hover:bg-gray-50 transition-colors">
                                <td className="py-4 px-4 text-center text-gray-500">{posts.length - index}</td>
                                <td className="py-4 px-4">
                                    <Link to={`/news/${post.category}/${post.id}`} className="hover:text-primary transition-colors block text-gray-800 line-clamp-1">
                                        {post.title}
                                    </Link>
                                </td>
                                <td className="py-4 px-4 text-center text-gray-500">{post.author}</td>
                                <td className="py-4 px-4 text-center text-gray-500 text-sm whitespace-nowrap">{post.date}</td>
                                <td className="py-4 px-4 text-center text-gray-500 text-sm">{post.views}</td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan="5" className="py-12 text-center text-gray-500">
                                게시물이 없습니다.
                            </td>
                        </tr>
                    )}
                </tbody>
            </table>
        </div>
    );
};

export default BoardList;
