import React from 'react';
import { Link } from 'react-router-dom';
import { ArrowRight, ChevronRight, Home, Users, Award } from 'lucide-react';
import { usePosts } from '../context/PostContext';
import HeroSlider from '../components/HeroSlider';

const HomePage = () => {
    const { posts } = usePosts();
    const slideImages = [
        '/images/slide1.jpg',
        '/images/slide2.jpg',
        '/images/slide3.jpg',
        '/images/slide4.jpg'
    ];

    return (
        <div className="flex flex-col">
            {/* Hero Section */}
            <section className="relative h-[600px] flex items-center bg-gray-900 overflow-hidden">
                {/* Background Image Slider */}
                <HeroSlider images={slideImages} interval={5000} />
                <div className="container mx-auto px-4 relative z-10 text-white">
                    <div className="max-w-2xl animate-fade-in-up">
                        <h1 className="text-5xl md:text-6xl font-bold mb-6 leading-tight">
                            집은 사람을 품고 <br />
                            <span className="text-primary-light text-[#4DB8E8]">희망</span>은 삶을 바꿉니다.
                        </h1>
                        <p className="text-lg md:text-xl text-gray-200 mb-10 leading-relaxed">
                            주거소외계층에게 쾌적하고 안전한 주거환경을 제공하여<br />
                            삶의 질을 높이고 더불어 사는 사회를 만들어갑니다.
                        </p>
                        <div className="flex gap-4">
                            <Link to="/about/intro" className="bg-primary hover:bg-primary-dark text-white px-8 py-4 rounded-full font-bold text-lg transition-all flex items-center gap-2">
                                운동본부 소개 <ArrowRight size={20} />
                            </Link>

                        </div>
                    </div>
                </div>
            </section>



            {/* Focus Areas / Quick Links */}
            <section className="py-24 bg-gray-50">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <span className="text-primary font-bold tracking-wider uppercase text-sm">Focus Areas</span>
                            <h2 className="text-3xl font-bold text-gray-900 mt-2">주요 활동 분야</h2>
                        </div>
                        <Link to="/projects" className="hidden md:flex items-center gap-1 text-gray-500 hover:text-primary transition-colors">
                            전체보기 <ChevronRight size={20} />
                        </Link>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                        {/* Card 1 */}
                        <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                            <div className="h-48 bg-gray-200 relative overflow-hidden">
                                <img src="/images/activity1.jpg" alt="대한민국 주거복지문화대상" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">주요사업</div>
                            </div>
                            <div className="p-8">
                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">대한민국주거복지문화대상</h3>
                                <p className="text-gray-600 mb-6 line-clamp-2">
                                    주거복지 향상을 위해 노력한 단체와 개인을 발굴하여 포상하고 우수사례를 전파합니다.
                                </p>
                                <Link to="/projects/awards" className="inline-flex items-center text-primary font-bold hover:gap-2 transition-all">
                                    자세히 보기 <ArrowRight size={16} className="ml-1" />
                                </Link>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="group bg-cardBg rounded-2xl overflow-hidden shadow-sm hover:bg-cardHover hover:shadow-xl transition-all duration-300">
                            <div className="h-48 bg-gray-200 relative overflow-hidden">
                                <img src="/images/activity2.png" alt="장애인 인식개선 교육" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute top-4 left-4 bg-green-500 text-white text-xs font-bold px-3 py-1 rounded-full">교육지원</div>
                            </div>
                            <div className="p-8">
                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">장애인 인식개선 교육</h3>
                                <p className="text-gray-600 mb-6 line-clamp-2">
                                    <strong>법정 근거</strong>: 「장애인고용촉진 및 직업재활법」 제5조의2·제86조, 시행령 제5조의2.<br />
                                    <strong>대상</strong>: 5인 이상 300인 미만 사업장(월 60시간·16일 미만 근로자는 제외).<br />
                                    <strong>교육 내용</strong>: 장애 이해·차별 금지·편의 제공·법·제도 안내·직장 내 인식 개선 실천 방안.<br />
                                    <strong>교육 방법</strong>: 집합 교육, 원격(화상) 교육, 체험형 교육(현장 실습·시뮬레이션).<br />
                                    <strong>지원</strong>: KEAD(한국장애인고용공단)에서 강사·교육자료·교육기관 정보를 제공하고, 교육 수행 증빙을 3년간 보관하도록 지원합니다.
                                </p>
                                <Link to="/projects/disability" className="inline-flex items-center text-primary font-bold hover:gap-2 transition-all">
                                    자세히 보기 <ArrowRight size={16} className="ml-1" />
                                </Link>
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="group bg-white rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-all duration-300">
                            <div className="h-48 bg-gray-200 relative overflow-hidden">
                                <img src="/images/activity3.png" alt="주거환경 개선 사례" className="absolute inset-0 w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                                <div className="absolute top-4 left-4 bg-orange-500 text-white text-xs font-bold px-3 py-1 rounded-full">우수사례</div>
                            </div>
                            <div className="p-8">
                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">주거환경 개선 사례</h3>
                                <p className="text-gray-600 mb-6 line-clamp-2">
                                    실제 주거환경 개선을 통해 변화된 삶의 모습들을 소개합니다.
                                </p>
                                <Link to="/best-practices" className="inline-flex items-center text-primary font-bold hover:gap-2 transition-all">
                                    자세히 보기 <ArrowRight size={16} className="ml-1" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* News & Gallery Section */}
            <section className="py-24">
                <div className="container mx-auto px-4">
                    <div className="flex justify-between items-end mb-12">
                        <div>
                            <span className="text-primary font-bold tracking-wider uppercase text-sm">News & Community</span>
                            <h2 className="text-3xl font-bold text-gray-900 mt-2">소식 및 갤러리</h2>
                        </div>
                    </div>

                    <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
                        {/* Column 1: Notice / News */}
                        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 h-full flex flex-col transition-all hover:shadow-md">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-2xl font-bold text-gray-900">공지사항 / 뉴스</h3>
                                <Link to="/news/notice" className="text-gray-500 hover:text-primary text-sm flex items-center">더보기 <ChevronRight size={16} /></Link>
                            </div>
                            <ul className="space-y-4 flex-1">
                                {posts.filter(p => p.category === 'notice').slice(0, 5).map((item) => (
                                    <li key={item.id} className="group border-b border-gray-50 last:border-0 pb-4 last:pb-0">
                                        <Link to={`/news/notice/${item.id}`} className="block">
                                            <h4 className="font-medium text-gray-800 group-hover:text-primary transition-colors mb-2 line-clamp-1">
                                                {item.title}
                                            </h4>
                                            <span className="text-xs text-gray-400">
                                                {new Date(item.date).toLocaleDateString('ko-KR')}
                                            </span>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {/* Column 2: Photo Gallery */}
                        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 h-full flex flex-col transition-all hover:shadow-md">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-2xl font-bold text-gray-900">사진 갤러리</h3>
                                <Link to="/news/gallery" className="text-gray-500 hover:text-primary text-sm flex items-center">더보기 <ChevronRight size={16} /></Link>
                            </div>
                            <div className="grid grid-cols-2 gap-4 flex-1">
                                {posts.filter(p => p.category === 'gallery').slice(0, 4).map((item) => (
                                    <Link key={item.id} to={`/news/gallery/${item.id}`} className="group block relative aspect-square rounded-xl overflow-hidden bg-gray-100">
                                        <img src={item.image || '/images/placeholder.jpg'} alt={item.title} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors"></div>
                                    </Link>
                                ))}
                            </div>
                        </div>

                        {/* Column 3: Video Gallery */}
                        <div className="bg-white rounded-2xl p-8 shadow-sm border border-gray-100 h-full flex flex-col transition-all hover:shadow-md">
                            <div className="flex justify-between items-center mb-6">
                                <h3 className="text-2xl font-bold text-gray-900">영상 갤러리</h3>
                                <Link to="/news/video" className="text-gray-500 hover:text-primary text-sm flex items-center">더보기 <ChevronRight size={16} /></Link>
                            </div>
                            <div className="flex flex-col gap-4 flex-1">
                                {posts.filter(p => p.category === 'video').slice(0, 1).map((item) => {
                                    let videoId = '';
                                    if (item.videoUrl) {
                                        const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
                                        const match = item.videoUrl.match(regExp);
                                        videoId = (match && match[2].length === 11) ? match[2] : null;
                                    }
                                    return (
                                        <Link key={item.id} to={`/news/video/${item.id}`} className="group block relative aspect-video rounded-xl overflow-hidden bg-gray-900">
                                            {videoId ? (
                                                <img src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`} alt={item.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                            ) : item.image ? (
                                                <img src={item.image} alt={item.title} className="w-full h-full object-cover opacity-80 group-hover:opacity-100 transition-opacity" />
                                            ) : (
                                                <div className="w-full h-full flex items-center justify-center bg-gray-800 text-gray-500 text-sm">No Video</div>
                                            )}
                                            <div className="absolute inset-0 flex items-center justify-center">
                                                <div className="w-12 h-12 bg-white/20 backdrop-blur rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                                                    <div className="w-0 h-0 border-t-[6px] border-t-transparent border-l-[10px] border-l-white border-b-[6px] border-b-transparent ml-1"></div>
                                                </div>
                                            </div>
                                            <div className="absolute bottom-0 left-0 right-0 p-4 bg-gradient-to-t from-black/80 to-transparent">
                                                <p className="text-white text-sm font-medium line-clamp-1">{item.title}</p>
                                            </div>
                                        </Link>
                                    );
                                })}
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
