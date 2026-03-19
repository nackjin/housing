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

            {/* Stats / Impact Section */}
            <section className="py-20 bg-white">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-center">
                        <div className="p-8 rounded-2xl bg-gray-50 hover:shadow-lg transition-all">
                            <div className="w-16 h-16 mx-auto bg-blue-100 text-primary rounded-full flex items-center justify-center mb-6">
                                <Home size={32} />
                            </div>
                            <h3 className="text-4xl font-bold text-gray-900 mb-2">1,200+</h3>
                            <p className="text-gray-600">주거환경 개선 가구</p>
                        </div>
                        <div className="p-8 rounded-2xl bg-gray-50 hover:shadow-lg transition-all">
                            <div className="w-16 h-16 mx-auto bg-green-100 text-green-600 rounded-full flex items-center justify-center mb-6">
                                <Users size={32} />
                            </div>
                            <h3 className="text-4xl font-bold text-gray-900 mb-2">350+</h3>
                            <p className="text-gray-600">자원봉사자 참여</p>
                        </div>
                        <div className="p-8 rounded-2xl bg-gray-50 hover:shadow-lg transition-all">
                            <div className="w-16 h-16 mx-auto bg-orange-100 text-orange-600 rounded-full flex items-center justify-center mb-6">
                                <Award size={32} />
                            </div>
                            <h3 className="text-4xl font-bold text-gray-900 mb-2">50+</h3>
                            <p className="text-gray-600">협력 기관</p>
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
                                {/* Image Placeholder */}
                                <div className="absolute inset-0 bg-gray-300 group-hover:scale-105 transition-transform duration-500"></div>
                                <div className="absolute top-4 left-4 bg-primary text-white text-xs font-bold px-3 py-1 rounded-full">주요사업</div>
                            </div>
                            <div className="p-8">
                                <h3 className="text-xl font-bold text-gray-900 mb-3 group-hover:text-primary transition-colors">대한민국 주거복지문화대상</h3>
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
                                <div className="absolute inset-0 bg-gray-300 group-hover:scale-105 transition-transform duration-500"></div>
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
                                <div className="absolute inset-0 bg-gray-300 group-hover:scale-105 transition-transform duration-500"></div>
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

            {/* News Section */}
            <section className="py-24">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row gap-16">
                        <div className="flex-1">
                            <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
                                <h2 className="text-2xl font-bold text-gray-900">공지사항 / 뉴스</h2>
                                <Link to="/news/notice" className="text-gray-500 hover:text-primary text-sm flex items-center gap-1">더보기 <ChevronRight size={16} /></Link>
                            </div>
                            <ul className="space-y-6">
                                {posts.filter(p => p.category === 'notice').slice(0, 3).map((item) => (
                                    <li key={item.id} className="group">
                                        <Link to={`/news/notice/${item.id}`} className="flex gap-6 items-start">
                                            <div className="flex-shrink-0 w-20 text-center pt-1">
                                                <span className="block text-2xl font-bold text-gray-300 group-hover:text-primary transition-colors">
                                                    {new Date(item.date).getDate().toString().padStart(2, '0')}
                                                </span>
                                                <span className="block text-xs text-gray-400 uppercase">
                                                    {new Date(item.date).toLocaleString('en-US', { month: 'short' })}. {new Date(item.date).getFullYear()}
                                                </span>
                                            </div>
                                            <div>
                                                <h4 className="text-lg font-medium text-gray-800 group-hover:text-primary transition-colors mb-2 line-clamp-1">
                                                    {item.title}
                                                </h4>
                                                <p className="text-gray-500 text-sm line-clamp-2">
                                                    {item.content}
                                                </p>
                                            </div>
                                        </Link>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        <div className="w-full md:w-1/3">
                            <div className="flex justify-between items-center mb-8 border-b border-gray-100 pb-4">
                                <h2 className="text-2xl font-bold text-gray-900">영상 갤러리</h2>
                                <Link to="/news/video" className="text-gray-500 hover:text-primary text-sm flex items-center gap-1">더보기 <ChevronRight size={16} /></Link>
                            </div>
                            {(() => {
                                const latestVideo = posts.find(p => p.category === 'video');
                                if (!latestVideo) return null;

                                // Extract youtube ID to show thumbnail
                                let videoId = '';
                                if (latestVideo.videoUrl) {
                                    const regExp = /^.*(youtu.be\/|v\/|u\/\w\/|embed\/|watch\?v=|\&v=)([^#\&\?]*).*/;
                                    const match = latestVideo.videoUrl.match(regExp);
                                    videoId = (match && match[2].length === 11) ? match[2] : null;
                                }

                                return (
                                    <Link to={`/news/video/${latestVideo.id}`} className="block group rounded-xl overflow-hidden relative aspect-video bg-gray-900">
                                        {videoId ? (
                                            <img src={`https://img.youtube.com/vi/${videoId}/hqdefault.jpg`} alt={latestVideo.title} className="absolute inset-0 w-full h-full object-cover opacity-80 group-hover:opacity-60 transition-opacity" />
                                        ) : (
                                            <div className="absolute inset-0 bg-gray-800 opacity-60 group-hover:opacity-40 transition-opacity"></div>
                                        )}
                                        <div className="absolute inset-0 flex items-center justify-center">
                                            <div className="w-16 h-16 bg-white/20 backdrop-blur rounded-full flex items-center justify-center group-hover:scale-110 transition-transform shadow-lg">
                                                <div className="w-0 h-0 border-t-[10px] border-t-transparent border-l-[18px] border-l-white border-b-[10px] border-b-transparent ml-1"></div>
                                            </div>
                                        </div>
                                        <div className="absolute bottom-0 left-0 right-0 p-6 bg-gradient-to-t from-black/80 via-black/40 to-transparent">
                                            <span className="text-white font-bold text-lg line-clamp-2">{latestVideo.title}</span>
                                        </div>
                                    </Link>
                                );
                            })()}
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
};

export default HomePage;
