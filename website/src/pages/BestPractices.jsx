import React, { useState } from 'react';
import { Download } from 'lucide-react';

const BestPractices = () => {
    const [selectedYear, setSelectedYear] = useState('2025');
    const [activeTab, setActiveTab] = useState('기관부문');

    // Dummy data based on the extracted 2025 PDF content
    const data = {
        '2025': {
            '기관부문': [
                {
                    id: 1,
                    award: '종합대상',
                    name: '광주광역시 광산구',
                    category: '기관부문',
                    description: '고독사 예방 및 우울증 없는 주거 분위기 조성, AI스피커 및 생활감지 센서를 활용한 인공지능 돌봄 로봇 서비스 제공 등.'
                },
                {
                    id: 2,
                    award: '종합대상',
                    name: '전주시 주거복지센터',
                    category: '기관부문',
                    description: '지역사회의 공공·민간·학계·기업 등 25개가 넘는 파트너를 엮어 탄소중립 주택난방 플랫폼 등 복합적인 주거 문제 해결.'
                },
                {
                    id: 3,
                    award: '대 상',
                    name: '고양특례시',
                    category: '기관부문',
                    description: '기초지자체 최초 「고양특례시 주거복지기금」 조성(2025년 30억 확보). 현장 관찰과 데이터 연계를 통한 위기가구 발굴.'
                },
                {
                    id: 4,
                    award: '대 상',
                    name: '국립공원공단',
                    category: '기관부문',
                    description: '주거환경이 취약한 섬마을(한려해상 동부, 다도해) 마을길 개선, 문패 교체, 태양광 LED 등불 설치 등 주거환경 개선 사업 실시.'
                },
                {
                    id: 5,
                    award: '대 상',
                    name: '수원시',
                    category: '기관부문',
                    description: '전국 최초 「새빛하우스」 2천호 지원(국비 2억 원 확보, 주택 1호당 1천 2백만 원 한도 집수리 지원) 및 주거상향 지원.'
                },
                {
                    id: 6,
                    award: '대 상',
                    name: '시흥시',
                    category: '기관부문',
                    description: '시흥형 아동주거비 지원 및 주거상향 지원사업(이주 61호), 주택 청소 지원 등 아동 주거권 보장에 특화.'
                },
                {
                    id: 7,
                    award: '대 상',
                    name: '인천광역시 광역주거복지센터',
                    category: '기관부문',
                    description: '주거복지사가 이용자의 신체와 주택 노후화를 함께 진단하는 고령친화 맞춤형 집수리 사업 및 방대한 주거상향 지원.'
                },
                {
                    id: 8,
                    award: '대 상',
                    name: '평택시',
                    category: '기관부문',
                    description: '고시원 및 비닐하우스 등 비정상 거처 거주자에게 직접 이주비 지원(40만 원) 및 무보증 공공임대주택 11호 운영.'
                },
                {
                    id: 9,
                    award: '최우수상',
                    name: '구리시',
                    category: '기관부문',
                    description: '주거복지센터 직영 개소. 중증장애인 주택 내 편의시설 설치 및 민·관 협력을 통한 위기가구 주거환경 개선.'
                },
                {
                    id: 10,
                    award: '최우수상',
                    name: '안성시주거복지센터',
                    category: '기관부문',
                    description: '경기도 내 유일하게 시 예산으로 위기가구에 사례관리비를 직접 지원. 다국어 전세사기 예방 안내문 배포 및 안성맞춤 청년주택 제도 혁신.'
                },
                {
                    id: 11,
                    award: '최우수상',
                    name: '의정부시',
                    category: '기관부문',
                    description: '노숙인, 쪽방 주민 등을 대상으로 비정상 거처 주거상향 지원(85가구). 이사비 및 생필품 직접 지원.'
                },
                {
                    id: 12,
                    award: '최우수상',
                    name: '파주시',
                    category: '기관부문',
                    description: '전세사기 피해자 지원 조례 제정 및 소송 비용, 긴급생계비 지원. 파주형 G-하우징 및 주거상향 지원사업 추진.'
                },
                {
                    id: 13,
                    award: '최우수상',
                    name: '포항시',
                    category: '기관부문',
                    description: '우수사례 벤치마킹을 통한 포항형 1,000원 주택 공급. 생애주기별 공공주택 포트폴리오 구축 및 현장동행 서비스.'
                },
                {
                    id: 14,
                    award: '우수상',
                    name: '광주광역시 종합주거복지센터',
                    category: '기관부문',
                    description: '광주주거복지포털 구축 및 주거복지 상담(21,606건). 주거상향 이주 지원(286세대) 및 청년주거복지 실천단 운영.'
                }
            ],
            '단체부문': [
                {
                    id: 15,
                    award: '대 상',
                    name: '(사)기장군자원봉사센터',
                    category: '단체부문',
                    description: '전문 자원봉사단(바르게도배봉사단) 양성 및 한전KPS와의 기업 파트너십을 통한 전문적인 주거환경 개선 사업 수행.'
                },
                {
                    id: 16,
                    award: '대 상',
                    name: '다산한강반도유보라아파트',
                    category: '단체부문',
                    description: '주민 자치 커뮤니티 시설 운영, 대규모 축제 개최 및 투명한 소통으로 경기도 공동주택 모범·상생관리단지 선정.'
                },
                {
                    id: 17,
                    award: '대 상',
                    name: '동두천송내3단지주거행복지원센터',
                    category: '단체부문',
                    description: '문화누리카드 찾아가는 서비스 유치, 정신건강 위험 가구 연계 등 단지 내 종합 복지센터 역할 수행.'
                },
                {
                    id: 18,
                    award: '대 상',
                    name: '백합봉사단',
                    category: '단체부문',
                    description: 'LH 임대아파트 관리소장들이 자발적으로 결성하여 고독사 세대 추모 제례 등 사후 주거복지 모델 제시.'
                },
                {
                    id: 19,
                    award: '최우수상',
                    name: '가온마을7단지 숲길작은도서관',
                    category: '단체부문',
                    description: '도서관을 거점으로 아동 돌봄 식사 제공(행복한 밥상), 평생학습 프로그램 운영 등 우리 동네 다목적 거실 역할 수행.'
                },
                {
                    id: 20,
                    award: '최우수상',
                    name: '고양삼송신원마을4단지아파트',
                    category: '단체부문',
                    description: '주민 봉사단(신원투게더봉사단) 조직, 외부 공모사업 유치를 통한 쌈채소 나눔, 김장 나눔 등 풍성한 공동체 활동.'
                },
                {
                    id: 21,
                    award: '우수상',
                    name: '양산 이지더원2차그랜드파크아파트',
                    category: '단체부문',
                    description: '투명한 관리로 관리비 환급, 아파트 종사자 복지 향상(바디캠 지급 등) 및 알뜰장터 수익금 기부로 지역사회 상생 실천.'
                },
                {
                    id: 22,
                    award: '우수상',
                    name: '인천청라하우스토리커낼뷰아파트',
                    category: '단체부문',
                    description: '전문적인 시설 유지보수(소방, 주차장 청소 등) 자체 공사를 통해 관리비를 크게 절감하고 주거만족도 향상.'
                },
                {
                    id: 23,
                    award: '우수상',
                    name: '칠곡군종합자원봉사센터',
                    category: '단체부문',
                    description: '마을 전체를 대상으로 집수리, 벽화, 의료 등을 종합 지원하는 대규모 찾아라! 칠곡 행복마을 프로젝트 운영.'
                }
            ],
            '개인부문': [
                {
                    id: 24,
                    award: '대 상',
                    name: '김경옥',
                    category: '개인부문',
                    description: '아산탕정LH7단지 경리실장. 관리비 체납 세대를 위기가구로 발굴하여 복지 연계를 통해 퇴거 위기를 막는 혁신적 프로세스 실천.'
                },
                {
                    id: 25,
                    award: '대 상',
                    name: '김명수',
                    category: '개인부문',
                    description: '공감종합관리 대표. 소규모 공동주택(나홀로 아파트)을 위한 비상주 순회형 위탁관리 모델 창업 및 블로그를 통한 투명한 정보 제공.'
                },
                {
                    id: 26,
                    award: '대 상',
                    name: '김미영',
                    category: '개인부문',
                    description: '주택관리공단 춘천권사업소 직원. 비정상 거처 거주자들을 위해 보증금 마련 특별 작전을 펼치는 등 끈질긴 현장 중심 주거상향 지원.'
                },
                {
                    id: 27,
                    award: '대 상',
                    name: '박성한',
                    category: '개인부문',
                    description: '밤섬경남아파트 관리소장. 이웃 단지 관리소장, 구청 주무관과 협력하여 고질적인 단지 간 갈등을 상생과 협력으로 해결.'
                },
                {
                    id: 28,
                    award: '최우수상',
                    name: '노용균',
                    category: '개인부문',
                    description: '(주)그린테크 대표(자활명장). 자활기업을 전문 집수리 업체로 성장시키고, 전남광역주거복지협동조합 설립을 주도하여 취약계층 일자리 창출.'
                },
                {
                    id: 29,
                    award: '최우수상',
                    name: '박지환',
                    category: '개인부문',
                    description: '서산푸르지오더센트럴 입주자대표회장. 시공사와의 끈질긴 협상으로 주거환경을 개선하고, 관리 종사자 상생 문화를 이끈 모범적 리더십.'
                },
                {
                    id: 30,
                    award: '최우수상',
                    name: '성현기',
                    category: '개인부문',
                    description: '익산부송1단지 상주 주거복지사. 코레일, 로타리클럽과 연계한 기차여행 문화체험(해피트레인) 지원 및 복합 위기가구 통합 솔루션 제공.'
                },
                {
                    id: 31,
                    award: '우수상',
                    name: '김원진',
                    category: '개인부문',
                    description: '래미안웰스트림 관리소장. 이웃 단지 관리소장, 구청 주무관과 협력하여 고질적인 단지 간 분쟁을 상생으로 전환하는 데 기여.'
                },
                {
                    id: 32,
                    award: '우수상',
                    name: '송기석',
                    category: '개인부문',
                    description: '시흥 은계호반써밋플레이스 입주자대표회장. 회의 생중계, 다단계 전자결재 등 혁신적인 투명 관리시스템 도입으로 관리비 절감 실현.'
                },
                {
                    id: 33,
                    award: '우수상',
                    name: '연임숙',
                    category: '개인부문',
                    description: '다산한강반도유보라 관리소장. 성공적인 커뮤니티 자치관리 전환 및 20여 개 프로그램 운영으로 모범상생관리단지 선정 주도.'
                },
                {
                    id: 34,
                    award: '우수상',
                    name: '장경숙',
                    category: '개인부문',
                    description: '고양삼송신원마을4단지 센터장. 막대한 외부 공모사업 유치 및 신원투게더봉사단 육성으로 풍부한 나눔과 활기가 넘치는 공동체 조성.'
                },
                {
                    id: 35,
                    award: '우수상',
                    name: '정재덕',
                    category: '개인부문',
                    description: '삼성꽃마을아파트 관리소장. 조경기능사 취득, 주민 재능기부와 공모사업 유치로 황폐한 화단을 아름다운 정원으로 탈바꿈시킴.'
                },
                {
                    id: 36,
                    award: '우수상',
                    name: '조명화',
                    category: '개인부문',
                    description: '양원금호어울림 관리소장. 승강기 뽑기 행사 기획, 행복학습마을 운영, 정신건강 상담 연계 등 따뜻한 공동체 문화 조성.'
                },
                {
                    id: 37,
                    award: '우수상',
                    name: '최정우',
                    category: '개인부문',
                    description: '마포구청(주택상생과) 주무관. 이웃 단지 관리소장, 구청 주무관과 협력하여 공동주택 지원금을 촉매로 아파트 간 상생 협력을 이끌어냄.'
                },
                {
                    id: 38,
                    award: '우수상',
                    name: '최중원',
                    category: '개인부문',
                    description: '부산동삼2 영구임대단지 직원. 은둔형 중년 남성 사회적응 프로그램 운영 및 우리동네 ESG 센터(폐플라스틱 재활용) 기획.'
                }
            ]
        },
        '2024': {
            '기관부문': [],
            '단체부문': [],
            '개인부문': []
        }
    };

    const years = Object.keys(data).sort((a, b) => b - a);
    const tabs = ['기관부문', '단체부문', '개인부문'];

    const currentData = data[selectedYear]?.[activeTab] || [];

    const handleDownload = () => {
        // In a real app, this would trigger the actual PDF download
        alert('PDF 다운로드를 시작합니다.');
    };

    return (
        <div className="py-20 bg-gray-50 min-h-[60vh]">
            <div className="container mx-auto px-4">
                {/* Header Section */}
                <div className="text-center mb-12">
                    <h1 className="text-4xl font-bold text-gray-900 mb-4">주거복지우수사례</h1>
                    <p className="text-gray-600">대한민국주거복지문화대상 우수사례를 소개합니다.</p>
                </div>

                {/* Filters and Download */}
                <div className="flex flex-col sm:flex-row justify-between items-center mb-8 gap-4">
                    <div className="flex items-center space-x-4">
                        <label htmlFor="year-select" className="font-semibold text-gray-700">연도별 보기:</label>
                        <select
                            id="year-select"
                            value={selectedYear}
                            onChange={(e) => setSelectedYear(e.target.value)}
                            className="p-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary w-32"
                        >
                            {years.map(year => (
                                <option key={year} value={year}>{year}년</option>
                            ))}
                        </select>
                    </div>

                    <button
                        onClick={handleDownload}
                        className="flex items-center space-x-2 bg-primary text-white px-4 py-2 rounded-md hover:bg-primary-dark transition-colors"
                    >
                        <Download size={20} />
                        <span>우수사례집 PDF 다운로드</span>
                    </button>
                </div>

                {/* Main Content Area */}
                <div className="bg-white rounded-2xl shadow-sm overflow-hidden min-h-[500px]">
                    {/* Tabs */}
                    <div className="flex border-b border-gray-200">
                        {tabs.map(tab => (
                            <button
                                key={tab}
                                onClick={() => setActiveTab(tab)}
                                className={`flex-1 py-4 text-center font-semibold text-lg transition-colors
                                    ${activeTab === tab
                                        ? 'text-primary border-b-2 border-primary bg-primary/5'
                                        : 'text-gray-500 hover:text-gray-700 hover:bg-gray-50'
                                    }`}
                            >
                                {tab}
                            </button>
                        ))}
                    </div>

                    {/* Content List */}
                    <div className="p-6 md:p-8">
                        {currentData.length > 0 ? (
                            <div className="grid gap-6 md:grid-cols-2">
                                {currentData.map((item) => (
                                    <div key={item.id} className="border border-gray-200 rounded-xl p-6 hover:shadow-md transition-shadow bg-white">
                                        <div className="flex justify-between items-start mb-4">
                                            <span className="inline-block px-3 py-1 bg-primary/10 text-primary text-sm font-bold rounded-full">
                                                {item.award}
                                            </span>
                                            <span className="text-sm text-gray-500">{item.category}</span>
                                        </div>
                                        <h3 className="text-2xl font-bold text-gray-900 mb-3">{item.name}</h3>
                                        <p className="text-gray-600 leading-relaxed">
                                            {item.description}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="flex flex-col items-center justify-center py-20 text-gray-500">
                                <p className="text-lg">등록된 사례가 없습니다.</p>
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default BestPractices;
