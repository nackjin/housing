import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebase';
import { doc, getDoc, setDoc } from 'firebase/firestore';

const AwardsContext = createContext();

export const useAwardsInfo = () => useContext(AwardsContext);

export const defaultAwardsInfo = {
    introDate: '2026. 4. 1.',
    pageTitle: '대한민국주거복지문화대상 우수사례 모집',
    introText: '주거복지문화운동본부는 아름다운 주거복지공동체를 만들어 보다 따뜻하고 건강한 미래 사회를 만들고자 아래와 같이 제9회 「대한민국주거복지문화大賞」 우수사례를 모집 공고합니다.',
    contestName: "제9회 '대한민국주거복지문화大賞' 대회",
    overviewText: '"대한민국주거복지문화대상"은 우리 사회를 더욱 따뜻하고 건강한 미래로 이끌기 위한 목적으로 제정되었습니다. 이 상은 아름다운 주거복지공동체를 형성하고, 아름다운 주거복지문화를 실현하기 위해 헌신하는 단체, 기관, 그리고 개인의 노력과 성과를 발굴하여 널리 알리고자 합니다. 이를 통해, 더욱 포용적이고 지속 가능한 주거 환경을 조성하여, 모든 시민이 보다 나은 삶의 질을 누릴 수 있는 기반을 마련하려는 것입니다.',
    host: '주거복지문화운동본부',
    sponsor: '행정안전부ㆍ국토교통부',
    ceremonyInfo: '2026년 10월 중 (국회도서관 대강당 예정)',
    awardPlan: '개인/단체/기관부문 총 50개 내외',
    benefits: '상장, 현판ㆍ상패ㆍ포상금(상위)',
    periodStart: '4월 1일',
    periodEnd: '7월 22일',
    periodNote: '(마감연장)',
    announceDate: '9월 25일 (예정)',
    judgingProcess: '예비심사 → 서류심사 → 현장심사(대상부문) → 최종심사',
    judgingPanel: '주거복지전문가 및 시민사회 활동가 7명으로 구성',
    applyMethodText: '홈페이지(www.good1004.kr) > 주요사업 > 공고문/양식 다운로드 후 메일 접수',
    restrictionNote: '※ 2023~25년에 종합대상 수상자는 접수가 제한됩니다.',
    fileNote: '※ 한글문서로 파일명은 "기관·단체·개인 명"으로 작성 (ex. 대회신청서_서울시.hwp)',
    announcementFileUrl: '/pdfs/announcement.hwp',
    email: 'good@good1004.kr',
    phone: '02-533-8910',
    fax: '02-533-4311',
};

export const AwardsProvider = ({ children }) => {
    const [awardsInfo, setAwardsInfo] = useState(defaultAwardsInfo);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchAwardsInfo = async () => {
            try {
                const snap = await getDoc(doc(db, 'settings', 'awards'));
                if (snap.exists()) {
                    setAwardsInfo({ ...defaultAwardsInfo, ...snap.data() });
                }
            } catch (error) {
                console.error('Error fetching awards info:', error);
            } finally {
                setLoading(false);
            }
        };
        fetchAwardsInfo();
    }, []);

    const updateAwardsInfo = async (updatedInfo) => {
        try {
            await setDoc(doc(db, 'settings', 'awards'), updatedInfo, { merge: true });
            setAwardsInfo(prev => ({ ...prev, ...updatedInfo }));
            return true;
        } catch (error) {
            console.error('Error updating awards info:', error);
            return false;
        }
    };

    return (
        <AwardsContext.Provider value={{ awardsInfo, updateAwardsInfo, loading }}>
            {children}
        </AwardsContext.Provider>
    );
};
