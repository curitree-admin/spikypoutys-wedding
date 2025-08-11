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

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguage] = useState<Language>('ko');
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
    invitationIntro: '수많은 물음표로 가득했던 삶에서</br>서로에게 확실한 느낌표가 되어주었습니다.<br/>저희의 새로운 시작에<br/>소중한 분들을 모시고자 합니다.',
    groomParents: '최진태・한미현의 차남 최연준',
    brideParents: '고형균・박명선의 장녀 고은경',
    dateLocation: '2025. 11. 09 일요일 오전 11시 30분',
    locationNameFull: '수원 노보텔 2층 샴페인 홀',
    locationName: '노보텔 앰배서더 수원',
    locationAddress: '경기 수원시 팔달구 덕영대로 90<br/>2층 샴페인 홀<br/>Tel. 031-547-6600',
    byCar: '자가용',
    carText: '호텔 정면 주차장 입구2 혹은 후면 주차장입구1 통해 입차 하실수 있습니다.<br/>GATE 7번으로 진입하시면 조금 더 수월한 주차가 가능합니다.',
    byBus: '버스',
    busText: '수원역 노보텔 수원 정류장 하차',
    byTrain: '지하철',
    trainText: '수원역 (1호선, 분당선) 4번 출구 바로 앞',
    congratulate: '마음 전하실 곳',
    groomAccount: '신랑측 계좌번호',
    brideAccount: '신부측 계좌번호',
    copy: '복사하기',
    copied: '복사되었습니다.',
    close: '닫기',
    depositor: '예금주',
    rsvp: '참석 여부 알리기',
    '신랑 계좌': '신랑 계좌',
    '신부 계좌': '신부 계좌',
    '혼주 계좌': '혼주 계좌',
  },
  en: {
    invitationHeading: "You're Invited to Our Wedding",
    invitationIntro: 'We are joining together in love and faith. We would be honored if you come celebrate and bless our future.',
    groomParents: "Choi Jintae & Han Mihyun's son Yeonjoon",
    brideParents: "Ko Hyeonggyun & Park Myungsun's daughter Eunkyung",
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
    rsvp: 'RSVP',
    '신랑 계좌': "Groom's account",
    '신부 계좌': "Bride's account",
    '혼주 계좌': "Parents' account",
  },
};

export const useTranslation = () => {
  const { language } = useLanguage();
  return (key: string) => translations[language][key] || key;
};

