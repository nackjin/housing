import React from 'react';

const Awards = () => {
    return (
        <div className="animate-fade-in text-gray-800">
            {/* Main Header & Intro */}
            <div className="mb-12 border-b border-gray-100 pb-8 text-center">
                <h3 className="text-3xl font-bold mb-4 text-primary">대한민국주거복지문화대상 우수사례 모집</h3>
                <p className="text-gray-600 max-w-2xl mx-auto leading-relaxed mb-6">
                    주거복지문화운동본부는 아름다운 주거복지공동체를 만들어 보다 따뜻하고 건강한 미래 사회를 만들고자 아래와 같이 제9회 「대한민국주거복지문화大賞」 우수사례를 모집 공고합니다.
                </p>
                <div className="flex flex-col items-center justify-center text-sm font-semibold text-gray-500">
                    <span>2026. 4. 1.</span>
                    <span className="text-secondary mt-1 text-base">주거복지문화운동본부</span>
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
                        "대한민국주거복지문화대상"은 우리 사회를 더욱 따뜻하고 건강한 미래로 이끌기 위한 목적으로 제정되었습니다. 이 상은 아름다운 주거복지공동체를 형성하고, 아름다운 주거복지문화를 실현하기 위해 헌신하는 단체, 기관, 그리고 개인의 노력과 성과를 발굴하여 널리 알리고자 합니다. 이를 통해, 더욱 포용적이고 지속 가능한 주거 환경을 조성하여, 모든 시민이 보다 나은 삶의 질을 누릴 수 있는 기반을 마련하려는 것입니다.
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
                                제9회 ‘대한민국주거복지문화大賞’ 대회
                            </div>
                        </li>
                        <li className="flex flex-col sm:flex-row">
                            <div className="sm:w-1/4 bg-gray-50 p-4 font-bold text-gray-700 sm:border-r border-gray-100 flex items-center">
                                주최/후원
                            </div>
                            <div className="sm:w-3/4 p-4 text-gray-700">
                                <span className="mr-4"><strong>주최:</strong> 주거복지문화운동본부</span>
                                <span><strong>후원:</strong> 국토교통부</span>
                            </div>
                        </li>
                        <li className="flex flex-col sm:flex-row">
                            <div className="sm:w-1/4 bg-gray-50 p-4 font-bold text-gray-700 sm:border-r border-gray-100 flex items-center">
                                시상 관련
                            </div>
                            <div className="sm:w-3/4 p-4 text-gray-700">
                                <ul className="space-y-1">
                                    <li><strong>시상식:</strong> 2026년 10월 중 (국회도서관 대강당 예정)</li>
                                    <li><strong>시상계획:</strong> 개인/단체/기관부문 총 50개 내외</li>
                                    <li><strong>수상혜택:</strong> 상장, 현판ㆍ상패ㆍ포상금(상위)</li>
                                </ul>
                            </div>
                        </li>
                        <li className="flex flex-col sm:flex-row">
                            <div className="sm:w-1/4 bg-gray-50 p-4 font-bold text-gray-700 sm:border-r border-gray-100 flex items-center">
                                대회 기간
                            </div>
                            <div className="sm:w-3/4 p-4 text-gray-700">
                                <strong>접수:</strong> 4월 1일 ~ 6월 30일 <span className="mx-2">|</span> <strong>발표:</strong> 9월 25일 (예정)
                            </div>
                        </li>
                        <li className="flex flex-col sm:flex-row">
                            <div className="sm:w-1/4 bg-gray-50 p-4 font-bold text-gray-700 sm:border-r border-gray-100 flex items-center">
                                심사 관련
                            </div>
                            <div className="sm:w-3/4 p-4 text-gray-700">
                                <ul className="space-y-1">
                                    <li><strong>심사절차:</strong> 예비심사 → 서류심사 → 현장심사(대상부문) → 최종심사</li>
                                    <li><strong>심사단:</strong> 주거복지전문가 및 시민사회 활동가 7명으로 구성</li>
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
                            홈페이지(www.good1004.kr) &gt; 주요사업 &gt; 공고문/양식 다운로드 후 <strong>메일 접수</strong>
                        </p>
                        <p className="text-red-500 text-sm font-medium">※ 2023~25년에 종합대상 수상자는 접수가 제한됩니다.</p>
                <a href="/pdfs/announcement.hwp" download className="text-primary underline">공고문 다운로드</a>
                        <p className="text-primary text-sm font-medium mt-1">※ 한글문서로 파일명은 "기관·단체·개인 명"으로 작성 (ex. 대회신청서_서울시.hwp)</p>
                    </div>

                    <div className="grid sm:grid-cols-3 gap-4 border-t border-gray-200 pt-6">
                        <div className="bg-white p-4 rounded-lg shadow-sm text-center border border-gray-100">
                            <span className="block text-gray-500 text-sm mb-1">접수 이메일</span>
                            <span className="font-bold text-gray-800">good@good1004.kr</span>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm text-center border border-gray-100">
                            <span className="block text-gray-500 text-sm mb-1">전화 문의</span>
                            <span className="font-bold text-gray-800">02-533-8910</span>
                        </div>
                        <div className="bg-white p-4 rounded-lg shadow-sm text-center border border-gray-100">
                            <span className="block text-gray-500 text-sm mb-1">팩스 번호</span>
                            <span className="font-bold text-gray-800">02-533-4311</span>
                        </div>
                    </div>
                </div>
            </div>

        </div>
    );
};

export default Awards;
