import React from 'react';
import { Target, Users, Globe, BookOpen, Award, Mic, HeartHandshake, Heart } from 'lucide-react';

const Intro = () => {
    return (
        <div className="space-y-20">
            {/* Overview Section */}
            <section className="text-center max-w-4xl mx-auto space-y-6">
                <h3 className="text-2xl font-bold text-gray-900 leading-normal">
                    <span className="text-primary block mb-2">진정한 의미의 '주거 복지' 실현</span>
                    주거복지문화운동본부가 앞장서겠습니다.
                </h3>
                <p className="text-gray-600 leading-loose text-lg text-justify md:text-center break-keep">
                    주거복지문화운동본부는 주거 취약계층의 주거 안정뿐만 아니라, <br className="hidden md:block" />
                    교육과 문화 접촉 기회를 확대하여 진정한 의미의 '주거 복지'를 실현하기 위해 설립된 <br className="hidden md:block" />
                    <strong>국토교통부 등록 비영리민간단체</strong>입니다.
                </p>
                <p className="text-gray-600 leading-loose text-lg text-justify md:text-center break-keep">
                    우리는 주거 환경의 격차를 줄이고, 여성·장애인·청년 등 다양한 계층의 자립 생활을 지원함으로써 <br className="hidden md:block" />
                    국민의 삶의 질을 높이고 대한민국 주거복지 문화를 발전시키는 데 이바지하고 있습니다.
                </p>
            </section>

            {/* Mission Section */}
            <section>
                <div className="text-center mb-12">
                    <span className="text-primary font-bold tracking-wider uppercase text-sm">Our Mission</span>
                    <h3 className="text-3xl font-bold text-gray-900 mt-2">핵심 가치 및 미션</h3>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    {/* Mission Item 1 */}
                    <div className="bg-gray-50 rounded-2xl p-8 hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-gray-100 group">
                        <div className="w-14 h-14 bg-blue-100 text-primary rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Target size={28} />
                        </div>
                        <h4 className="text-xl font-bold text-gray-900 mb-3">주거환경 격차 해소</h4>
                        <p className="text-gray-600 leading-relaxed">
                            주거 취약계층을 위한 환경 개선 및 실질적인 정책 제안을 통해 격차를 줄여나갑니다.
                        </p>
                    </div>

                    {/* Mission Item 2 */}
                    <div className="bg-gray-50 rounded-2xl p-8 hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-gray-100 group">
                        <div className="w-14 h-14 bg-green-100 text-green-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Users size={28} />
                        </div>
                        <h4 className="text-xl font-bold text-gray-900 mb-3">자립과 상생</h4>
                        <p className="text-gray-600 leading-relaxed">
                            여성, 장애인, 1인 가구의 자립을 지원하고 함께 살아가는 사회를 위한 인식 개선 교육을 진행합니다.
                        </p>
                    </div>

                    {/* Mission Item 3 */}
                    <div className="bg-gray-50 rounded-2xl p-8 hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-gray-100 group">
                        <div className="w-14 h-14 bg-orange-100 text-orange-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <Globe size={28} />
                        </div>
                        <h4 className="text-xl font-bold text-gray-900 mb-3">문화의 확산</h4>
                        <p className="text-gray-600 leading-relaxed">
                            '대한민국 주거복지문화대상'을 통해 숨어있는 우수 사례를 발굴하고 널리 전파합니다.
                        </p>
                    </div>

                    {/* Mission Item 4 */}
                    <div className="bg-gray-50 rounded-2xl p-8 hover:bg-white hover:shadow-xl transition-all border border-transparent hover:border-gray-100 group">
                        <div className="w-14 h-14 bg-purple-100 text-purple-600 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
                            <BookOpen size={28} />
                        </div>
                        <h4 className="text-xl font-bold text-gray-900 mb-3">미래 세대 육성</h4>
                        <p className="text-gray-600 leading-relaxed">
                            청년 및 아동·청소년을 위한 미래 주거 교육 프로그램을 운영하여 건강한 주거관을 확립합니다.
                        </p>
                    </div>
                </div>
            </section>

            {/* Stats Section */}
            <section className="bg-primary/5 rounded-3xl p-10 md:p-16">
                <div className="text-center mb-12">
                    <span className="text-primary font-bold tracking-wider uppercase text-sm">Achivements</span>
                    <h3 className="text-3xl font-bold text-gray-900 mt-2">숫자로 보는 우리의 발자취</h3>
                    <p className="text-gray-600 mt-4">저희는 현장과 정책을 잇는 가교로서 쉼 없이 활동해왔습니다.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                    {/* Stat 1 */}
                    <div className="text-center bg-white p-6 rounded-2xl shadow-sm">
                        <Award className="mx-auto text-primary mb-4" size={32} />
                        <div className="text-3xl font-bold text-gray-900 mb-1">제8회</div>
                        <div className="text-sm text-gray-500 font-medium mb-3">2018~2025</div>
                        <p className="text-gray-600 text-sm break-keep">대한민국 주거복지문화대상 개최 및 우수사례 보고</p>
                    </div>

                    {/* Stat 2 */}
                    <div className="text-center bg-white p-6 rounded-2xl shadow-sm">
                        <Mic className="mx-auto text-green-600 mb-4" size={32} />
                        <div className="text-3xl font-bold text-gray-900 mb-1">900회+</div>
                        <div className="text-sm text-gray-500 font-medium mb-3">2025.12 기준</div>
                        <p className="text-gray-600 text-sm break-keep">찾아가는 직장 내 장애인 인식개선 무료 교육 돌파</p>
                    </div>

                    {/* Stat 3 */}
                    <div className="text-center bg-white p-6 rounded-2xl shadow-sm">
                        <HeartHandshake className="mx-auto text-orange-600 mb-4" size={32} />
                        <div className="text-3xl font-bold text-gray-900 mb-1">80개</div>
                        <div className="text-sm text-gray-500 font-medium mb-3">2022~2025</div>
                        <p className="text-gray-600 text-sm break-keep">주거복지 발전을 위한 민관 공동협약 기관 체결</p>
                    </div>

                    {/* Stat 4 */}
                    <div className="text-center bg-white p-6 rounded-2xl shadow-sm">
                        <Heart className="mx-auto text-purple-600 mb-4" size={32} />
                        <div className="text-3xl font-bold text-gray-900 mb-1">All</div>
                        <div className="text-sm text-gray-500 font-medium mb-3">전 세대</div>
                        <p className="text-gray-600 text-sm break-keep">어린이·청소년부터 청년, 신혼부부, 중장년 1인 가구까지</p>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default Intro;
