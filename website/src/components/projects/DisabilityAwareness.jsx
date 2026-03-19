import React from 'react';

const DisabilityAwareness = () => {
    return (
        <div className="animate-fade-in text-gray-800">
            {/* Header Section */}
            <div className="mb-10 border-b border-gray-100 pb-8 text-center sm:text-left">
                <h3 className="text-2xl font-bold mb-4">직장 내 장애인 인식개선 교육</h3>
                <p className="text-xl text-primary font-semibold mb-2">
                    전문 강사와 함께 <span className="text-red-500 underline decoration-2 underline-offset-4">'전액 무료'</span>로 준비하세요!
                </p>
                <p className="text-gray-600">
                    주거복지문화운동본부는 고용노동부 지정 강사지원사업 수행기관입니다.
                </p>
            </div>

            {/* Section 1: Education Info & Legal Duty */}
            <div className="mb-12">
                <h4 className="text-xl font-bold text-secondary flex items-center mb-6">
                    <span className="bg-secondary text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">1</span>
                    교육 안내 및 법적 의무
                </h4>
                <div className="bg-gray-50 rounded-xl p-6 border border-gray-100">
                    <p className="font-semibold mb-4 text-gray-900 border-l-4 border-primary pl-3">
                        장애인 인식개선 교육은 선택이 아닌 필수 법정의무교육입니다.
                    </p>
                    <ul className="space-y-3 text-gray-600">
                        <li className="flex items-start">
                            <span className="text-primary mr-2 mt-1">✓</span>
                            <span><strong>교육 목적:</strong> 장애인에 대한 직장 내 편견을 제거하고, 안정적인 근무 여건 조성 및 채용 확대를 목적으로 합니다.</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-primary mr-2 mt-1">✓</span>
                            <span><strong>법적 근거:</strong> 「장애인고용촉진 및 직업재활법」 제5조의2</span>
                        </li>
                        <li className="flex items-start">
                            <span className="text-primary mr-2 mt-1">✓</span>
                            <span><strong>교육 대상:</strong> 모든 사업주 및 근로자 (연 1회, 1시간 이상 필수)</span>
                        </li>
                        <li className="flex items-start text-red-600 font-medium">
                            <span className="mr-2 mt-1">⚠️</span>
                            <span><strong>과태료 안내:</strong> 교육 실시 의무 미이행 시 관련 법령에 따라 최대 300만 원 이하의 과태료가 부과됩니다.</span>
                        </li>
                    </ul>
                </div>
            </div>

            {/* Section 2: Free Support Benefits */}
            <div className="mb-12">
                <h4 className="text-xl font-bold text-secondary flex items-center mb-6">
                    <span className="bg-secondary text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">2</span>
                    주거복지문화운동본부만의 '무료' 지원 혜택
                </h4>
                <p className="text-gray-600 mb-6 font-medium">
                    본 본부는 정부 지원을 통해 사업주의 비용 부담 없이 전문 교육을 제공합니다.
                </p>

                <div className="overflow-x-auto">
                    <table className="w-full text-left border-collapse border border-gray-200">
                        <thead>
                            <tr className="bg-gray-100">
                                <th className="p-4 border border-gray-200 font-bold text-gray-700 w-1/4">구분</th>
                                <th className="p-4 border border-gray-200 font-bold text-gray-700 w-3/4">주요 내용</th>
                            </tr>
                        </thead>
                        <tbody>
                            <tr>
                                <td className="p-4 border border-gray-200 font-semibold bg-gray-50">지원 대상</td>
                                <td className="p-4 border border-gray-200 text-gray-600">상시근로자 5인 이상 300인 미만 사업장</td>
                            </tr>
                            <tr>
                                <td className="p-4 border border-gray-200 font-semibold bg-gray-50">교육 비용</td>
                                <td className="p-4 border border-gray-200 font-bold text-primary">전액 무료 (정부 지원 사업)</td>
                            </tr>
                            <tr>
                                <td className="p-4 border border-gray-200 font-semibold bg-gray-50">교육 방법</td>
                                <td className="p-4 border border-gray-200 text-gray-600">전문 자격을 갖춘 강사가 사업장으로 직접 방문하여 교육 실시</td>
                            </tr>
                            <tr>
                                <td className="p-4 border border-gray-200 font-semibold bg-gray-50">증빙 지원</td>
                                <td className="p-4 border border-gray-200 text-gray-600">교육 실시 완료 후 교육일지, 참석자 명단 등 증빙 서류 지원</td>
                            </tr>
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Section 3: Curriculum */}
            <div className="mb-12">
                <h4 className="text-xl font-bold text-secondary flex items-center mb-6">
                    <span className="bg-secondary text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">3</span>
                    교육 커리큘럼
                </h4>
                <p className="text-gray-600 mb-4 font-medium">
                    법정 필수 교육 내용 4가지를 충실히 담았습니다.
                </p>
                <div className="grid sm:grid-cols-2 gap-4">
                    <div className="bg-primary/5 rounded-lg p-5 border border-primary/10">
                        <span className="inline-block bg-primary text-white text-xs font-bold px-2 py-1 rounded mb-2">항목 1</span>
                        <p className="text-gray-800 font-medium">장애에 대한 이해와 장애가 가지는 차이에 대한 존중</p>
                    </div>
                    <div className="bg-primary/5 rounded-lg p-5 border border-primary/10">
                        <span className="inline-block bg-primary text-white text-xs font-bold px-2 py-1 rounded mb-2">항목 2</span>
                        <p className="text-gray-800 font-medium">직장 내 장애인의 인권과 차별금지 및 정당한 편의제공</p>
                    </div>
                    <div className="bg-primary/5 rounded-lg p-5 border border-primary/10">
                        <span className="inline-block bg-primary text-white text-xs font-bold px-2 py-1 rounded mb-2">항목 3</span>
                        <p className="text-gray-800 font-medium">장애인 고용촉진 및 직업재활 관련 법과 제도</p>
                    </div>
                    <div className="bg-primary/5 rounded-lg p-5 border border-primary/10">
                        <span className="inline-block bg-primary text-white text-xs font-bold px-2 py-1 rounded mb-2">항목 4</span>
                        <p className="text-gray-800 font-medium">그 밖에 직장 내 장애인 인식개선에 필요한 사항</p>
                    </div>
                </div>
            </div>

            {/* Section 4: Application & Contact */}
            <div>
                <h4 className="text-xl font-bold text-secondary flex items-center mb-6">
                    <span className="bg-secondary text-white rounded-full w-8 h-8 flex items-center justify-center mr-3 text-sm">4</span>
                    신청 방법 및 문의
                </h4>

                <div className="bg-cardBg rounded-2xl p-8 border border-gray-200 text-center shadow-sm">
                    <p className="text-lg font-bold text-gray-800 mb-6">
                        지금 바로 온라인으로 간편하게 신청하세요!
                    </p>

                    <a
                        href="https://forms.gle/MTmq6kvBMqgovr3PA"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-block mb-8 px-8 py-4 bg-primary text-white font-bold rounded-full shadow-md hover:bg-primary-dark transition-colors transform hover:-translate-y-1"
                    >
                        👉 무료 교육 신청하러 가기 (구글 폼)
                    </a>

                    <div className="border-t border-gray-200 pt-6 mt-2">
                        <p className="text-gray-600 mb-2 font-medium">교육 관련 문의</p>
                        <p className="text-2xl font-bold text-secondary flex items-center justify-center">
                            <svg className="w-6 h-6 mr-2 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"></path></svg>
                            02-533-8910
                        </p>
                        <p className="text-sm text-gray-500 mt-1">(주거복지문화운동본부 사무국)</p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default DisabilityAwareness;
