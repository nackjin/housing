import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { useAwardsInfo } from '../../context/AwardsContext';

const Awards = () => {
    const navigate = useNavigate();
    const { isAdmin } = useAuth();
    const { awardsInfo } = useAwardsInfo();
    const info = awardsInfo;

    return (
        <div className="animate-fade-in text-gray-800">
            {/* Main Header & Intro */}
            <div className="mb-12 border-b border-gray-100 pb-8 text-center relative">
                {isAdmin && (
                    <button
                        onClick={() => navigate('/admin/awards')}
                        className="absolute top-0 right-0 bg-primary hover:bg-primary-dark text-white px-4 py-2 rounded-lg font-medium transition-colors shadow-sm text-sm"
                    >
                        정보 수정
                    </button>
                )}
                <h3 className="text-3xl font-bold mb-4 text-primary">{info.pageTitle}</h3>
                <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed mb-6">
                    {info.introText}
                </p>
                <div className="flex flex-col items-center justify-center text-sm font-semibold text-gray-500">
                    <span>{info.introDate}</span>
                    <span className="text-secondary mt-1 text-base">{info.host}</span>
                </div>
            </div>

            {/* Overview Section */}
            <div className="mb-12">
                <h4 className="text-xl font-bold text-secondary flex items-center mb-6">
                    <span className="bg-secondary text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">1</span>
                    대회 개요
                </h4>
                <div className="bg-primary/5 rounded-xl p-6 border border-primary/10">
                    <p className="leading-relaxed text-gray-700">
                        {info.overviewText}
                    </p>
                </div>
            </div>

            {/* Detailed Info Section */}
            <div className="mb-12">
                <h4 className="text-xl font-bold text-secondary flex items-center mb-6">
                    <span className="bg-secondary text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">2</span>
                    대회 상세 요강
                </h4>

                <div className="bg-white rounded-xl border border-gray-200 overflow-hidden shadow-sm">
                    <ul className="divide-y divide-gray-100">
                        <li className="flex flex-col sm:flex-row">
                            <div className="sm:w-1/4 bg-gray-50 p-4 font-bold text-gray-700 sm:border-r border-gray-100 flex items-center">
                                대 회 명
                            </div>
                            <div className="sm:w-3/4 p-4 text-gray-700 font-semibold text-primary">
                                {info.contestName}
                            </div>
                        </li>
                        <li className="flex flex-col sm:flex-row">
                            <div className="sm:w-1/4 bg-gray-50 p-4 font-bold text-gray-700 sm:border-r border-gray-100 flex items-center">
                                주최/후원
                            </div>
                            <div className="sm:w-3/4 p-4 text-gray-700">
                                <span className="mr-4"><strong>주최:</strong> {info.host}</span>
                                <span><strong>후원:</strong> {info.sponsor}</span>
                            </div>
                        </li>
                        <li className="flex flex-col sm:flex-row">
                            <div className="sm:w-1/4 bg-gray-50 p-4 font-bold text-gray-700 sm:border-r border-gray-100 flex items-center">
                                시상 관련
                            </div>
                            <div className="sm:w-3/4 p-4 text-gray-700">
                                <ul className="space-y-1">
                                    <li><strong>시상식:</strong> {info.ceremonyInfo}</li>
                                    <li><strong>시상계획:</strong> {info.awardPlan}</li>
                                    <li><strong>수상혜택:</strong> {info.benefits}</li>
                                </ul>
                            </div>
                        </li>
                        <li className="flex flex-col sm:flex-row">
                            <div className="sm:w-1/4 bg-gray-50 p-4 font-bold text-gray-700 sm:border-r border-gray-100 flex items-center">
                                대회 기간
                            </div>
                            <div className="sm:w-3/4 p-4 text-gray-700">
                                <strong>접수:</strong> {info.periodStart} ~ {info.periodEnd}
                                {info.periodNote && (
                                    <span className="text-red-500 text-xs font-bold ml-1">{info.periodNote}</span>
                                )}
                                <span className="mx-2">|</span> <strong>발표:</strong> {info.announceDate}
                            </div>
                        </li>
                        <li className="flex flex-col sm:flex-row">
                            <div className="sm:w-1/4 bg-gray-50 p-4 font-bold text-gray-700 sm:border-r border-gray-100 flex items-center">
                                심사 관련
                            </div>
                            <div className="sm:w-3/4 p-4 text-gray-700">
                                <ul className="space-y-1">
                                    <li><strong>심사절차:</strong> {info.judgingProcess}</li>
                                    <li><strong>심사단:</strong> {info.judgingPanel}</li>
                                </ul>
                            </div>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Application Section */}
            <div>
                <h4 className="text-xl font-bold text-secondary flex items-center mb-6">
                    <span className="bg-secondary text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">3</span>
                    접수 방법 및 안내
                </h4>

                <div className="bg-gray-50 rounded-2xl p-6 sm:p-8 border border-gray-200">
                    <div className="mb-6">
                        <h5 className="font-bold text-lg mb-2 text-gray-800 flex items-center">
                            <svg className="w-5 h-5 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M15 15l-2 5L9 9l11 4-5 2zm0 0l5 5M7.188 2.239l.777 2.897M5.136 7.965l-2.898-.777M13.95 4.05l-2.122 2.122m-5.657 5.656l-2.12 2.122"></path></svg>
                            응모 방법
                        </h5>
                        <p className="text-gray-700 mb-2">
                            {info.applyMethodText}
                        </p>
                        <p className="text-red-500 text-sm font-medium">{info.restrictionNote}</p>
                        <a href={info.announcementFileUrl} download className="inline-block mt-4 mb-2 bg-primary hover:bg-primary-dark text-white font-bold py-3 px-8 rounded-lg shadow-md transition-colors text-lg">📄 공고문 다운로드 (.hwp)</a>
                        <p className="text-primary text-sm font-medium mt-1">{info.fileNote}</p>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4 border-t border-gray-200 pt-6">
                        <div className="bg-white p-4 rounded-lg shadow-sm text-center border border-gray-100">
                            <span className="block text-gray-500 text-sm mb-1">접수 이메일</span>
                            <span className="font-bold text-gray-800">{info.email}</span>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm text-center border border-gray-100">
                            <span className="block text-gray-500 text-sm mb-1">전화 문의</span>
                            <span className="font-bold text-gray-800">{info.phone}</span>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm text-center border border-gray-100">
                            <span className="block text-gray-500 text-sm mb-1">팩스 번호</span>
                            <span className="font-bold text-gray-800">{info.fax}</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Awards;
