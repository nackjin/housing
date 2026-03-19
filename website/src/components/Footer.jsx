import React from 'react';
import { Link } from 'react-router-dom';
import { Facebook, Youtube, Instagram } from 'lucide-react';

const Footer = () => {
    return (
        <footer className="bg-gray-100/80 border-t border-gray-200 pt-16 pb-8">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-start gap-12 mb-12">
                    {/* Organization Info */}
                    <div>
                        <div className="flex items-center gap-2 mb-6">
                            <div className="w-8 h-8 bg-gray-400 rounded flex items-center justify-center text-white font-bold">
                                H
                            </div>
                            <span className="text-xl font-bold text-gray-800">주거복지문화운동본부</span>
                        </div>
                        <div className="text-sm text-gray-600 space-y-2 leading-relaxed">
                            <p>사무총장: 성낙진 | 사업자등록번호: 504-82-81710</p>
                            <p>주소: 서울특별시 서초구 방배천로 2길 15, 5층</p>
                            <p>전화: <a href="tel:02-533-8910" className="hover:text-primary">02-533-8910</a> | 팩스: 02-533-6311</p>
                            <p>이메일: good@good1004.kr</p>
                        </div>
                    </div>

                    {/* Quick Links */}
                    <div className="flex gap-16">
                        <div>
                            <h4 className="font-bold text-gray-900 mb-4">운동본부</h4>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li><Link to="/about/intro" className="hover:text-primary">소개</Link></li>
                                <li><Link to="/about/history" className="hover:text-primary">연혁</Link></li>
                                <li><Link to="/about/org" className="hover:text-primary">조직도</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 mb-4">사업안내</h4>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li><Link to="/projects/awards" className="hover:text-primary">주거복지문화대상</Link></li>
                                <li><Link to="/projects/disability" className="hover:text-primary">장애인인식개선</Link></li>
                            </ul>
                        </div>
                        <div>
                            <h4 className="font-bold text-gray-900 mb-4">참여하기</h4>
                            <ul className="space-y-2 text-sm text-gray-600">
                                <li><Link to="/news/notice" className="hover:text-primary">공지사항</Link></li>
                            </ul>
                        </div>
                    </div>
                </div>

                <div className="border-t border-gray-200 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-xs text-gray-500">
                        © 2026 Housing Welfare Culture Movement Headquarters. All rights reserved.
                    </p>

                    <div className="flex gap-4">
                        <a href="#" className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-primary hover:border-primary transition-all">
                            <Facebook size={16} />
                        </a>
                        <a href="#" className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-red-500 hover:border-red-500 transition-all">
                            <Youtube size={16} />
                        </a>
                        <a href="#" className="w-8 h-8 rounded-full bg-white border border-gray-200 flex items-center justify-center text-gray-500 hover:text-pink-500 hover:border-pink-500 transition-all">
                            <Instagram size={16} />
                        </a>
                    </div>
                </div>
            </div>
        </footer>
    );
};

export default Footer;
