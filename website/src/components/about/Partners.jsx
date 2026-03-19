import React, { useState } from 'react';
import { Building2, Users, Home } from 'lucide-react';

const Partners = () => {
    const [activeTab, setActiveTab] = useState('2025');

    // Data parsed from the user provided list
    const partnersData = [
        // 2020
        { year: '2020', round: '제3회', type: '기관', name: '서울특별시 성북구' },
        { year: '2020', round: '제3회', type: '기관', name: '경기도 고양시' },
        { year: '2020', round: '제3회', type: '기관', name: '경기도 시흥시' },
        { year: '2020', round: '제3회', type: '단체', name: '하동군지역사회보장협의체' },
        { year: '2020', round: '제3회', type: '단체', name: '(사)보령시자원봉사센터' },
        { year: '2020', round: '제3회', type: '단체', name: '전주 우정회 집수리봉사단' },
        { year: '2020', round: '제3회', type: '단체', name: '충북주거복지센터 사회적협동조합' },
        { year: '2020', round: '제3회', type: '단체', name: '한국마스터가드너협회 김해시지부' },
        { year: '2020', round: '제3회', type: '단체', name: '시흥 은계센트럴타운아파트' },
        { year: '2020', round: '제3회', type: '단체', name: '(사)진안군자원봉사센터' },

        // 2021
        { year: '2021', round: '제4회', type: '기관', name: '고양시' },
        { year: '2021', round: '제4회', type: '기관', name: '광명시' },
        { year: '2021', round: '제4회', type: '기관', name: '청주시 서원구 수곡2동' },
        { year: '2021', round: '제4회', type: '기관', name: '대구광역시 달서구' },
        { year: '2021', round: '제4회', type: '기관', name: '경상남도' },
        { year: '2021', round: '제4회', type: '기관', name: '고양도시관리공사' },
        { year: '2021', round: '제4회', type: '기관', name: '충청남도개발공사' },
        { year: '2021', round: '제4회', type: '기관', name: '부산도시공사' },
        { year: '2021', round: '제4회', type: '단체', name: '전주시 주거복지센터' },
        { year: '2021', round: '제4회', type: '단체', name: '(사)진안군자원봉사센터' },
        { year: '2021', round: '제4회', type: '단체', name: '한밭돌봄주거복지사회적협동조합' },
        { year: '2021', round: '제4회', type: '아파트', name: '동우개발' },
        { year: '2021', round: '제4회', type: '아파트', name: '금호건설 제이드웰 NHF' },
        { year: '2021', round: '제4회', type: '단체', name: '송악재능복지수리반' },
        { year: '2021', round: '제4회', type: '아파트', name: '구미도량2-3 주거행복지원센터' },
        { year: '2021', round: '제4회', type: '아파트', name: '진천혁신 LH 천년나무4' },
        { year: '2021', round: '제4회', type: '아파트', name: '동우씨엠(주)' },
        { year: '2021', round: '제4회', type: '아파트', name: '서강해모로아파트' },
        { year: '2021', round: '제4회', type: '단체', name: '마마봉사단' },
        { year: '2021', round: '제4회', type: '아파트', name: '송도더샵그린워크1차아파트' },

        // 2022
        { year: '2022', round: '제5회', type: '기관', name: '전라북도' },
        { year: '2022', round: '제5회', type: '기관', name: '경상남도' },
        { year: '2022', round: '제5회', type: '기관', name: '전라북도 완주군' },
        { year: '2022', round: '제5회', type: '기관', name: '부산도시공사' },
        { year: '2022', round: '제5회', type: '기관', name: '진주시' },
        { year: '2022', round: '제5회', type: '아파트', name: '상주냉림3주거행복지원센터' },
        { year: '2022', round: '제5회', type: '단체', name: '의성군종합자원봉사센터' },
        { year: '2022', round: '제5회', type: '단체', name: '동작주거상담소' },
        { year: '2022', round: '제5회', type: '아파트', name: '양산 유탑유블레스 하늘리에 입주자대표회의' },
        { year: '2022', round: '제5회', type: '단체', name: '협동조합공터' },
        { year: '2022', round: '제5회', type: '아파트', name: '춘천효자8단지주거행복지원센터' },
        { year: '2022', round: '제5회', type: '단체', name: '영광군가족센터' },
        { year: '2022', round: '제5회', type: '아파트', name: '대구월성3 주거행복지원센터' },
        { year: '2022', round: '제5회', type: '단체', name: '유)아름건설' },

        // 2023
        { year: '2023', round: '제6회', type: '기관', name: '충청남도 서산시' },
        { year: '2023', round: '제6회', type: '기관', name: '광주광역시 남구' },
        { year: '2023', round: '제6회', type: '기관', name: '부산광역시 영도구' },
        { year: '2023', round: '제6회', type: '단체', name: '세종특별자치시자원봉사센터' },
        { year: '2023', round: '제6회', type: '단체', name: '사회적협동조합 평택지역자활센터' },
        { year: '2023', round: '제6회', type: '단체', name: '폴리크리닉봉사단' },
        { year: '2023', round: '제6회', type: '단체', name: '울릉이네 봉사단' },
        { year: '2023', round: '제6회', type: '단체', name: '송악재능복지수리반' },
        { year: '2023', round: '제6회', type: '단체', name: '한국주거환경협회' },
        { year: '2023', round: '제6회', type: '아파트', name: '불당파크푸르지오 1단지 입주자대표회의&관리위원회' },
        { year: '2023', round: '제6회', type: '단체', name: '오성집수리봉사단' },
        { year: '2023', round: '제6회', type: '단체', name: '강릉자원봉사센터' },
        { year: '2023', round: '제6회', type: '아파트', name: '동백역 경남아너스빌 입주자대표회의' },

        // 2024
        { year: '2024', round: '제7회', type: '기관', name: '전라북도 완주군' },
        { year: '2024', round: '제7회', type: '기관', name: '수원도시재단' },
        { year: '2024', round: '제7회', type: '단체', name: '청주시주거복지센터' },
        { year: '2024', round: '제7회', type: '기관', name: '광주광역시도시공사' },
        { year: '2024', round: '제7회', type: '기관', name: '부천도시공사' },
        { year: '2024', round: '제7회', type: '단체', name: '시흥시주거복지센터' },
        { year: '2024', round: '제7회', type: '기관', name: '전남개발공사' },
        { year: '2024', round: '제7회', type: '단체', name: '김해시자원봉사센터' },
        { year: '2024', round: '제7회', type: '단체', name: '용산구자원봉사센터' },
        { year: '2024', round: '제7회', type: '단체', name: '칠곡군종합자원봉사센터' },
        { year: '2024', round: '제7회', type: '단체', name: '사단법인 사랑의집수리' },
        { year: '2024', round: '제7회', type: '단체', name: '넷임팩트코리아' },
        { year: '2024', round: '제7회', type: '단체', name: '콩주트Wonju' },
        { year: '2024', round: '제7회', type: '아파트', name: '원흥 LH13단지주거행복지원센터' },
        { year: '2024', round: '제7회', type: '단체', name: '강원주거복지사회적협동조합' },
        { year: '2024', round: '제7회', type: '아파트', name: '더샵송도프라임뷰20BL' },
        { year: '2024', round: '제7회', type: '아파트', name: '울릉이네 봉사단' },
        { year: '2024', round: '제7회', type: '아파트', name: '오산청호 휴먼시아1단지' },
        { year: '2024', round: '제7회', type: '단체', name: '위스테이별내사회적협동조합' },
        { year: '2024', round: '제7회', type: '아파트', name: '동두천송내3단지주거행복지원센터' },
        { year: '2024', round: '제7회', type: '아파트', name: '수원아름마을2 주거행복지원센터' },

        // 2025
        { year: '2025', round: '제8회', type: '기관', name: '광주광역시 광산구' },
        { year: '2025', round: '제8회', type: '기관', name: '전남개발공사' },
        { year: '2025', round: '제8회', type: '기관', name: '경상북도 포항시' },
        { year: '2025', round: '제8회', type: '기관', name: '고양특례시' },
        { year: '2025', round: '제8회', type: '기관', name: '충청북도 청주시' },
        { year: '2025', round: '제8회', type: '단체', name: '광주광역시 종합주거복지센터' },
        { year: '2025', round: '제8회', type: '단체', name: '인천광역시 광역주거복지센터' },
        { year: '2025', round: '제8회', type: '아파트', name: '고양삼송신원마을4단지아파트' },
        { year: '2025', round: '제8회', type: '단체', name: '기장군자원봉사센터' },
    ];

    const years = ['2025', '2024', '2023', '2022', '2021', '2020'];
    const filteredPartners = partnersData.filter(p => p.year === activeTab);

    // Badge styling
    const getTypeBadge = (type) => {
        const styles = {
            '기관': 'bg-blue-100 text-blue-700 border-blue-200',
            '단체': 'bg-green-100 text-green-700 border-green-200',
            '아파트': 'bg-orange-100 text-orange-700 border-orange-200',
        };
        const icons = {
            '기관': <Building2 size={14} className="mr-1" />,
            '단체': <Users size={14} className="mr-1" />,
            '아파트': <Home size={14} className="mr-1" />,
        };

        return (
            <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${styles[type] || 'bg-gray-100 text-gray-800'}`}>
                {icons[type]}
                {type}
            </span>
        );
    };

    return (
        <div className="animate-fade-in w-full">
            {/* 1. MOU Declaration Section */}
            <div className="max-w-4xl mx-auto mb-20">
                <div className="bg-white border hover:border-primary/30 transition-colors rounded-xl overflow-hidden shadow-sm relative">
                    <div className="p-8 md:p-12 text-center relative">
                        <div className="inline-block p-3 bg-primary/10 rounded-full text-primary mb-6">
                            🤝
                        </div>

                        <h3 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 font-serif">
                            주거복지문화 발전을 위한 공동협약
                        </h3>

                        <p className="text-gray-700 mb-10 leading-relaxed max-w-2xl mx-auto font-medium">
                            협약단체와 주거복지문화운동본부는 상호 간의 신뢰를 바탕으로
                            교류와 협력을 통해 공동발전 도모 및 주거복지문화 발전에 기여하고자
                            다음과 같이 협약한다.
                        </p>

                        <div className="bg-gray-50 rounded-xl p-6 text-left inline-block w-full border border-gray-100">
                            <ul className="space-y-4">
                                {[
                                    "주거복지문화 발전을 위한 사업 관련분야 상호협력",
                                    "주거복지문화운동에 적극 동참하며, 인적자원 상호 교류",
                                    "주거복지문화의 개선을 위한 공동조사 및 연구",
                                    "상호간 네트워크 구축을 통한 지식공유 등 워킹그룹 활동 수행",
                                    "기타 상호 발전 및 지역사회 발전에 기여되는 사항"
                                ].map((item, idx) => (
                                    <li key={idx} className="flex items-start text-gray-700">
                                        <span className="flex-shrink-0 w-6 h-6 bg-white border border-gray-200 rounded-full flex items-center justify-center text-primary text-sm font-bold mr-3 shadow-sm">
                                            {idx + 1}
                                        </span>
                                        <span className="mt-0.5">{item}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            </div>

            {/* 2. Partners List Section */}
            <div className="max-w-5xl mx-auto">
                <div className="text-center mb-10">
                    <h3 className="text-2xl font-bold text-gray-900 mb-2">협약기관 명단</h3>
                    <p className="text-gray-500">연도별 협약 체결 현황입니다.</p>
                </div>

                {/* Year Tabs */}
                <div className="flex flex-wrap justify-center gap-2 mb-10">
                    {years.map(year => (
                        <button
                            key={year}
                            onClick={() => setActiveTab(year)}
                            className={`
                                px-6 py-2 rounded-full font-medium transition-all text-sm
                                ${activeTab === year
                                    ? 'bg-primary text-white shadow-md'
                                    : 'bg-white text-gray-600 border border-gray-200 hover:bg-gray-50 hover:border-gray-300'
                                }
                            `}
                        >
                            {year}년
                        </button>
                    ))}
                </div>

                {/* Partners Grid */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                    {filteredPartners.map((partner, index) => (
                        <div
                            key={index}
                            className="bg-gray-50 p-4 rounded-lg border border-gray-100 hover:shadow-md hover:bg-white transition-all hover:border-primary/20 flex flex-col justify-center group h-full"
                        >
                            <div className="flex justify-between items-start mb-2">
                                {getTypeBadge(partner.type)}
                                <div className="text-gray-400 text-sm font-medium">
                                    {partner.round}
                                </div>
                            </div>
                            <span className="text-gray-800 font-bold group-hover:text-primary transition-colors">
                                {partner.name}
                            </span>
                        </div>
                    ))}
                </div>

                {filteredPartners.length === 0 && (
                    <div className="text-center py-20 bg-gray-50 rounded-lg">
                        <p className="text-gray-500">해당 연도의 협약 내역이 없습니다.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default Partners;
