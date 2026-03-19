import React from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const PostPagination = ({ currentPage = 1, totalPages = 1, onPageChange }) => {
    return (
        <div className="flex items-center justify-center gap-2 mt-12 mb-8">
            <button
                onClick={() => onPageChange(Math.max(1, currentPage - 1))}
                disabled={currentPage === 1}
                className="p-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <ChevronLeft size={16} />
            </button>

            {[...Array(totalPages)].map((_, i) => (
                <button
                    key={i + 1}
                    onClick={() => onPageChange(i + 1)}
                    className={`w-8 h-8 rounded flex items-center justify-center text-sm font-medium transition-colors ${currentPage === i + 1
                            ? 'bg-primary text-white border-primary'
                            : 'border border-gray-300 hover:bg-gray-50 text-gray-700'
                        }`}
                >
                    {i + 1}
                </button>
            ))}

            <button
                onClick={() => onPageChange(Math.min(totalPages, currentPage + 1))}
                disabled={currentPage === totalPages}
                className="p-2 border border-gray-300 rounded hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
                <ChevronRight size={16} />
            </button>
        </div>
    );
};

export default PostPagination;
