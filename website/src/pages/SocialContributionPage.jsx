import React from 'react';


const SocialContributionPage = () => {
    // Import all images from the social_partners directory
    const imageModules = import.meta.glob('../assets/social_partners/*.png', { eager: true });

    // Convert to array of image URLs and sort by filename
    const partnerImages = Object.keys(imageModules)
        .sort()
        .map(path => imageModules[path].default);

    // If we have fewer than 21 images, we can fill the rest with placeholders or just show what we have.
    // For now, let's show the actual images and if we need placeholders for the specific 21 slots, we can adjust.
    // The user mentioned 21 images, so we'll target that, but render whatever is available correctly.

    // Create an array to display. If we have more than 21, show all of them. 
    // If less, fill up to 21 with placeholders.
    const totalSlots = Math.max(21, partnerImages.length);
    const displayItems = Array.from({ length: totalSlots }, (_, i) => ({
        id: i + 1,
        image: partnerImages[i] || null
    }));

    return (
        <div className="min-h-screen bg-white">
            {/* Banner Section */}
            <div className="relative h-80 bg-gray-900 overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-gray-900 to-gray-800 opacity-90"></div>
                <div className="relative container mx-auto px-4 h-full flex flex-col justify-center text-white text-center md:text-left">
                    <h1 className="text-4xl md:text-5xl font-bold mb-6">사회공헌 파트너</h1>
                    <p className="text-lg md:text-xl text-gray-300 leading-relaxed max-w-3xl">
                        주거복지문화운동본부와 함께하는 사회공헌 파트너는<br className="hidden md:block" />
                        주거취약계층의 주거복지 증진과 삶의 질 향상을 위해 기업의 사회적 책임을 다하며,<br className="hidden md:block" />
                        나눔과 상생의 가치를 실천하는 아름다운 동행입니다.
                    </p>
                </div>
            </div>

            {/* Partners Grid */}
            <div className="container mx-auto px-4 py-16">



                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
                    {displayItems.map((item) => (
                        <div key={item.id} className="group bg-white rounded-xl overflow-hidden border border-gray-200 shadow-sm hover:shadow-xl transition-all duration-300 transform hover:-translate-y-1">
                            <div className="aspect-[3/4] bg-white relative flex items-center justify-center overflow-hidden p-4">
                                {item.image ? (
                                    <img
                                        src={item.image}
                                        alt={`Partner ${item.id}`}
                                        className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-105"
                                    />
                                ) : (
                                    <div className="text-center p-6 w-full">
                                        <div className="w-16 h-16 bg-gray-100 rounded-full mx-auto mb-4 flex items-center justify-center text-gray-400">
                                            <span className="text-2xl font-bold">{item.id}</span>
                                        </div>
                                        <p className="text-gray-400 text-sm">이미지 준비 중</p>
                                    </div>
                                )}
                                <div className="absolute inset-0 bg-black/0 group-hover:bg-black/2 transition-colors duration-300"></div>
                            </div>
                            {/* Simple caption if needed, or remove if image contains all info */}
                            {/* <div className="p-4 border-t border-gray-100">
                                <h3 className="font-bold text-gray-800">파트너사 {id}</h3>
                            </div> */}
                        </div>
                    ))}
                </div>

                <div className="mt-16 p-8 bg-blue-50 rounded-2xl text-center">
                    <h3 className="text-xl font-bold text-blue-900 mb-2">함께해주시는 모든 분들께 감사드립니다</h3>
                    <p className="text-blue-700">
                        여러분의 소중한 참여와 관심이 주거복지문화 발전에 큰 힘이 됩니다.
                    </p>
                </div>
            </div>
        </div>
    );
};

export default SocialContributionPage;
