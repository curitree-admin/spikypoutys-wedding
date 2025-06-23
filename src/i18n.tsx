import React, { createContext, useContext, useState } from 'react';

export type Language = 'en' | 'ko';

interface Context {
  language: Language;
  toggleLanguage: () => void;
}

const LanguageContext = createContext<Context>({
  language: 'ko',
  toggleLanguage: () => {},
});

const getDefaultLanguage = (): Language => {
  if (typeof navigator !== 'undefined') {
    const lang = navigator.language.split('-')[0];
    if (lang.startsWith('ko')) return 'ko';
    if (lang.startsWith('en')) return 'en';
  }
  return 'ko';
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>(getDefaultLanguage());
  const toggleLanguage = () => setLanguage(l => (l === 'ko' ? 'en' : 'ko'));
  return (
    <LanguageContext.Provider value={{ language, toggleLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => useContext(LanguageContext);

const translations: Record<Language, Record<string, string>> = {
  ko: {
    invitationHeading: '결혼식에 초대합니다',
    invitationIntro: '저희 두 사람이 사랑과 믿음으로 한 가정을 이루게 되었습니다. 바쁘시더라도 부디 오셔서 저희의 앞날을 축복해 주시고 격려해 주시면 감사하겠습니다.',
    groomParents: '최진태・한미현의 차남 최연준',
    brideParents: '고형균・박명선의 차녀 고은경',
    dateLocation: '2025. 11. 09 일요일 오전 11시<br/>수원 노보텔',
    locationName: '수원 노보텔',
    locationAddress: '경기 수원시 팔달구 덕영대로 90<br/>2층 메인 홀<br/>Tel. 031-547-6600',
    publicTransport: '대중교통',
    transport1: '2호선 서울대입구역 3번 출구 → 5511,5513 버스 → 제2공학관(종점) 하차',
    transport2: '2호선 낙성대역 4번 출구 → 관악02 마을버스 → 제2공학관(종점) 하차',
    transport3: '신림선 관악산역 1번 출구 → 5511,5516 버스 → 제2공학관(종점) 하차',
    byCar: '자가용',
    carText: '네비게이션 이용 시 “이라운지 서울대점”을 입력하세요. (주차 2시간 무료)',
    congratulate: '마음 전하실 곳',
    groomAccount: '신랑측 계좌번호',
    brideAccount: '신부측 계좌번호',
    copy: '복사하기',
    copied: '복사되었습니다.',
    close: '닫기',
    depositor: '예금주',
    '신랑 계좌': '신랑 계좌',
    '신부 계좌': '신부 계좌',
    '혼주 계좌': '혼주 계좌',
  },
  en: {
    invitationHeading: "You're Invited to Our Wedding",
    invitationIntro: 'We are joining together in love and faith. We would be honored if you come celebrate and bless our future.',
    groomParents: "Choi Jin Tae & Han Mi Hyun's son Yeon Jun",
    brideParents: "Ko Hyeong Gyun & Park Myung Sun's daughter Eun Kyung",
    dateLocation: 'Nov 9, 2025 (Sun) 11:00 AM<br/>Suwon Novotel',
    locationName: 'Suwon Novotel',
    locationAddress: '90 Deogyeong-daero, Paldal-gu, Suwon-si<br/>2F Main Hall<br/>Tel. 031-547-6600',
    publicTransport: 'Public Transport',
    transport1: 'Line 2 Seoul Nat\'l Univ. Entrance Exit 3 → Bus 5511 or 5513 → Engineering Building 2 (last stop)',
    transport2: 'Line 2 Nakseongdae Exit 4 → Gwanak02 bus → Engineering Building 2 (last stop)',
    transport3: 'Sillim Line Gwanaksan Station Exit 1 → Bus 5511 or 5516 → Engineering Building 2 (last stop)',
    byCar: 'By Car',
    carText: "Enter 'ELounge Seoul Nat\'l Univ' in your navigation. (2 hours free parking)",
    congratulate: 'Where to send congratulations',
    groomAccount: "Groom's Account",
    brideAccount: "Bride's Account",
    copy: 'Copy',
    copied: 'Copied',
    close: 'Close',
    depositor: 'Account Holder',
    '신랑 계좌': "Groom's account",
    '신부 계좌': "Bride's account",
    '혼주 계좌': "Parents' account",
  },
};

export const useTranslation = () => {
  const { language } = useLanguage();
  return (key: string) => translations[language][key] || key;
};

