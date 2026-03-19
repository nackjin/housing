import React from 'react';

const History = () => {
    const historyData = [
        {
            year: '2025',
            events: [
                { month: '11', content: '제8회 대한민국주거복지문화대상 우수사례 보고회/ 20개 기관 공동협약식(국토교통부)' }
            ]
        },
        {
            year: '2024',
            events: [
                { month: '11', content: '제7회 대한민국주거복지문화대상 우수사례 보고회/ 20개 기관 공동협약식(행정안전부)' },
                { month: '10', content: '찾아가는 직장내 장애인 인식개선 무료교육 700회 돌파' },
                { month: '09', content: '원룸 오피스텔 1인가구의 주거복지 방안 토론회(행정안전부)' }
            ]
        },
        {
            year: '2023',
            events: [
                { month: '12', content: '제6회 대한민국주거복지문화대상 우수사례 보고회 / 15개 기관 공동협약식' },
                { month: '07', content: '공동주택 관리 종사자 양성평등문화 토론회 개최(서울특별시)' }
            ]
        },
        {
            year: '2022',
            events: [
                { month: '12', content: '제5회 대한민국주거복지문화대상 우수사례 보고회(행정안전부)' },
                { month: '10', content: '서울특별시 집합건물 담당자 교육(서울특별시)' },
                { month: '04~11', content: '청년 주거복지탐색 프로그램 운영 (서울특별시)' },
                { month: '03~11', content: '어린이청소년 미래도시만들기 프로그램 운영 (여성가족부)' }
            ]
        },
        {
            year: '2021',
            events: [
                { month: '12', content: '제4회 대한민국주거복지문화대상 우수사례 보고회(행정안전부)' },
                { month: '07~12', content: '2021 자치분권형 서울주거복지포럼 주관(서울특별시)' }
            ]
        },
        {
            year: '2020',
            events: [
                { month: '12', content: '제3회 대한민국주거복지문화대상 우수사례 보고회(행정안전부)' },
                { month: '04~10', content: '주거복지 일자리창출 온라인포럼 2차 개최(서울특별시)' }
            ]
        },
        {
            year: '2019',
            events: [
                { month: '12', content: '제2회 대한민국주거복지문화대상 우수사례 보고회(행정안전부)' },
                { month: '04', content: '한국장애인고용공단 직장 내 장애인인식개선교육 위탁교육기관 지정' },
                { month: '04~10', content: '주거복지 일자리창출 시민포럼 5차 개최(서울특별시)' }
            ]
        },
        {
            year: '2018',
            events: [
                { month: '12', content: '신혼부부 주거탐색지원 교육 운영(서울특별시)' },
                { month: '11', content: '제1회 대한민국주거복지문화대상 우수사례 보고회(행정안전부)' }
            ]
        },
        {
            year: '2017',
            events: [
                { month: '11', content: '국토교통부 제5호 비영리민간단체 등록' }
            ]
        },
        {
            year: '2015',
            events: [
                { month: '05', content: '단체설립 위원회 구성' }
            ]
        }
    ];

    return (
        <div className="max-w-4xl mx-auto px-4">
            <div className="relative border-l-2 border-primary/20 ml-6 md:ml-12 space-y-12 py-8">
                {historyData.map((yearGroup, index) => (
                    <div key={index} className="relative">
                        {/* Year Marker */}
                        <div className="absolute -left-[33px] md:-left-[57px] top-0 bg-white border-2 border-primary text-primary font-bold rounded-full w-16 h-16 md:w-20 md:h-20 flex items-center justify-center shadow-md z-10 text-sm md:text-lg">
                            {yearGroup.year}
                        </div>

                        <div className="pl-8 md:pl-12 pt-2 space-y-8">
                            {yearGroup.events.map((event, eventIndex) => (
                                <div key={eventIndex} className="relative group">
                                    <div className="absolute -left-[42px] md:-left-[58px] top-2 w-3 h-3 bg-gray-300 rounded-full group-hover:bg-primary transition-colors"></div>
                                    <div className="flex flex-col md:flex-row md:items-start gap-2 md:gap-8">
                                        <div className="text-primary font-bold min-w-[60px] pt-0.5 whitespace-nowrap">
                                            {event.month}월
                                        </div>
                                        <div className="text-gray-700 leading-relaxed font-medium">
                                            {event.content}
                                        </div>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default History;
