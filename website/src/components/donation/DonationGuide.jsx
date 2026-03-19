import React from 'react';
import { Heart, CreditCard, Gift, Landmark, Phone } from 'lucide-react';

const DonationGuide = () => {
    return (
        <div className="animate-fade-in w-full max-w-4xl mx-auto">
            {/* Intro text */}
            <div className="text-center mb-12">
                <div className="inline-flex items-center justify-center w-16 h-16 rounded-full bg-primary/10 text-primary mb-6">
                    <Heart size={32} className="fill-current" />
                </div>
                <h3 className="text-2xl font-bold text-gray-900 mb-4">함께 만드는 따뜻한 세상</h3>
                <p className="text-lg text-gray-600 leading-relaxed break-keep">
                    주거 사각지대에 놓인 이웃들에게 안전하고 쾌적한 보금자리를 선물해주세요.<br />
                    여러분의 소중한 후원금은 투명하게 관리되며, 주거환경개선 사업에 전액 사용됩니다.
                </p>
            </div>

            {/* Donation Types */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
                <div className="bg-gray-50 rounded-xl p-8 text-center border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="mx-auto w-14 h-14 bg-white rounded-full flex items-center justify-center text-primary mb-4 shadow-sm border border-gray-100">
                        <Heart size={24} />
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">정기후원</h4>
                    <p className="text-gray-600 text-sm">
                        매월 약정하신 금액을<br />정기적으로 후원합니다.
                    </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-8 text-center border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="mx-auto w-14 h-14 bg-white rounded-full flex items-center justify-center text-blue-500 mb-4 shadow-sm border border-gray-100">
                        <CreditCard size={24} />
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">일시후원</h4>
                    <p className="text-gray-600 text-sm">
                        원하시는 때에 자유롭게<br />일시불로 후원합니다.
                    </p>
                </div>
                <div className="bg-gray-50 rounded-xl p-8 text-center border border-gray-100 hover:shadow-md transition-shadow">
                    <div className="mx-auto w-14 h-14 bg-white rounded-full flex items-center justify-center text-green-500 mb-4 shadow-sm border border-gray-100">
                        <Gift size={24} />
                    </div>
                    <h4 className="text-lg font-bold text-gray-900 mb-2">물품/재능기부</h4>
                    <p className="text-gray-600 text-sm">
                        건축 자재, 생활용품 후원이나<br />집수리 재능기부를 받습니다.
                    </p>
                </div>
            </div>

            {/* Bank Info & Benefits */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div className="border border-gray-200 rounded-xl p-8">
                    <div className="flex items-center gap-3 mb-6">
                        <Landmark className="text-primary" size={24} />
                        <h4 className="text-xl font-bold text-gray-900">후원계좌 안내</h4>
                    </div>
                    <div className="bg-gray-50 p-6 rounded-lg mb-6">
                        <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-4">
                            <span className="text-gray-500 font-medium">은행명</span>
                            <span className="font-bold text-gray-900 text-lg">농협은행</span>
                        </div>
                        <div className="flex justify-between items-center border-b border-gray-200 pb-4 mb-4">
                            <span className="text-gray-500 font-medium">계좌번호</span>
                            <span className="font-bold text-primary text-xl tracking-wider">301-xxxx-xxxx-xx</span>
                        </div>
                        <div className="flex justify-between items-center">
                            <span className="text-gray-500 font-medium">예금주</span>
                            <span className="font-bold text-gray-900">주거복지문화운동본부</span>
                        </div>
                    </div>
                    <p className="text-sm text-gray-500 flex items-center gap-2">
                        <Phone size={16} />
                        기부 및 후원 문의 : 02-xxxx-xxxx
                    </p>
                </div>

                <div className="border border-gray-200 rounded-xl p-8 bg-primary/5">
                    <div className="flex items-center gap-3 mb-6">
                        <Heart className="text-primary" size={24} />
                        <h4 className="text-xl font-bold text-gray-900">기부금 영수증 및 혜택</h4>
                    </div>
                    <ul className="space-y-4">
                        <li className="flex items-start gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                            <p className="text-gray-700">주거복지문화운동본부는 기획재정부 지정 기부금 단체로, 연말정산 시 세액공제 혜택을 받으실 수 있습니다.</p>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                            <p className="text-gray-700">연말정산 간소화 서비스를 통해 기부 내역이 자동 등록됩니다. (주민등록번호 제공 동의 시)</p>
                        </li>
                        <li className="flex items-start gap-3">
                            <span className="w-1.5 h-1.5 rounded-full bg-primary mt-2 flex-shrink-0"></span>
                            <p className="text-gray-700">정기 소식지와 연간 사업 보고서를 발송해 드립니다.</p>
                        </li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default DonationGuide;
