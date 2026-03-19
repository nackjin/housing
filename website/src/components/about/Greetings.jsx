import React from 'react';

const Greetings = () => {
    return (
        <div className="max-w-5xl mx-auto">
            <div className="flex flex-col lg:flex-row gap-12 items-start">
                {/* Image Section */}
                <div className="w-full lg:w-1/3 flex flex-col items-center">
                    <div className="relative w-full max-w-sm aspect-[3/4] rounded-2xl overflow-hidden shadow-lg mb-6">
                        <img
                            src="/images/president.png"
                            alt="안현자 상임대표"
                            className="w-full h-full object-cover"
                        />
                    </div>
                </div>

                {/* Text Section */}
                <div className="w-full lg:w-2/3 space-y-8 animate-fade-in-up">
                    <div>
                        <h3 className="text-2xl font-bold text-gray-900 mb-2">안녕하십니까.</h3>
                        <h3 className="text-2xl font-bold text-gray-900">
                            주거복지문화운동본부 상임대표 <span className="text-primary">안현자</span>입니다.
                        </h3>
                    </div>

                    <div className="space-y-6 text-gray-700 leading-loose text-lg text-justify break-keep">
                        <p>
                            주거는 단순히 머무는 공간을 넘어, 한 사람의 존엄과 삶의 가능성을 지탱하는 가장 기본적인 사회적 토대입니다.
                            그러나 오늘날 우리 사회에는 여전히 주거환경의 격차로 인해 일상의 안전과 문화적 기회를 충분히 누리지 못하는 이웃들이 존재합니다.
                        </p>

                        <p>
                            주거복지문화운동본부는 이러한 현실에 문제의식을 가지고,
                            주거 취약계층의 주거 안정은 물론 교육과 문화에 대한 접근 기회까지 포괄하는 ‘확장된 주거복지’의 실현을 목표로 설립된 국토교통부 등록 비영리민간단체입니다.
                        </p>

                        <p>
                            우리는 주거복지를 시혜가 아닌 권리로 인식하며,
                            여성·장애인·청년·1인 가구 등 다양한 사회 구성원이 자립과 상생의 주체로 성장할 수 있는 환경을 만들어가고자 합니다.
                            이를 위해 현장의 목소리를 정책으로 연결하고, 교육과 문화 활동을 통해 사회적 인식을 개선하며, 주거복지의 가치를 우리 사회 전반에 확산시키는 역할을 수행해 왔습니다.
                        </p>

                        <p>
                            특히, 대한민국주거복지문화대상을 통해 주거복지 분야의 우수 사례를 발굴·공유함으로써,
                            지역과 현장에서 실천되고 있는 의미 있는 노력들이 사회 전체의 자산으로 축적될 수 있도록 힘쓰고 있습니다.
                            아울러 청년과 아동·청소년을 대상으로 한 미래 주거 교육 프로그램을 통해 다음 세대가 더 나은 주거 문화를 만들어갈 수 있는 기반을 다지고 있습니다.
                        </p>

                        <div className="bg-gray-50 p-6 rounded-xl border-l-4 border-primary">
                            <p className="font-medium text-gray-800">
                                주거복지문화운동본부는 앞으로도<br />
                                <span className="text-primary font-bold">현장과 정책을 잇는 가교</span>,<br />
                                <span className="text-primary font-bold">사람과 사람을 연결하는 연대의 플랫폼</span>,<br />
                                그리고 <span className="text-primary font-bold">대한민국 주거복지 문화의 방향을 제시하는 공익 파트너</span>로서의 역할을 충실히 수행하겠습니다.
                            </p>
                        </div>

                        <p>
                            주거가 곧 삶의 품격이 되는 사회,
                            모두가 안전하고 존엄한 공간에서 살아갈 수 있는 사회를 향한 여정에
                            여러분의 지속적인 관심과 참여를 부탁드립니다.
                        </p>

                        <p>
                            감사합니다.
                        </p>
                    </div>

                    <div className="pt-8 text-right">
                        <p className="text-xl font-bold text-gray-900">
                            주거복지문화운동본부 상임대표 <br className="md:hidden" />
                            <span className="text-3xl ml-2 font-serif text-primary">안 현 자</span> 드림
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Greetings;
