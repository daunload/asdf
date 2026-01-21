/**
 * 출생 차트 해석 주제 설정
 * 
 * 전체 14개 주제 중:
 * - 무료 4주제: 기본 성격, 첫인상, 재능·강점, 과제·성장
 * - 유료 10주제: 감정·무의식, 사고·소통, 사랑·관계, 연애·결혼, 행동·욕망, 직업·커리어, 돈·물질, 변화·위기, 영혼·목적, 타이밍
 */

export interface Topic {
  id: string;
  name: string;
  isFree: boolean;
}

export const topics: Topic[] = [
  // 무료 4주제
  {
    id: 'personality-core',
    name: '기본 성격과 자아의 핵심',
    isFree: true,
  },
  {
    id: 'first-impression',
    name: '첫인상과 외부 이미지',
    isFree: true,
  },
  {
    id: 'talents-strengths',
    name: '재능과 강점이 발휘되는 영역',
    isFree: true,
  },
  {
    id: 'challenges-growth',
    name: '인생의 과제·두려움·성장 포인트',
    isFree: true,
  },
  // 유료 10주제
  {
    id: 'emotions-unconscious',
    name: '감정 패턴과 무의식 반응',
    isFree: false,
  },
  {
    id: 'thinking-communication',
    name: '사고방식·소통 스타일·학습 능력',
    isFree: false,
  },
  {
    id: 'love-relationships',
    name: '사랑 방식과 인간관계 가치관',
    isFree: false,
  },
  {
    id: 'romance-marriage',
    name: '연애·결혼에서 반복되는 패턴',
    isFree: false,
  },
  {
    id: 'action-desires',
    name: '행동력·욕망·분노 표현 방식',
    isFree: false,
  },
  {
    id: 'career-vocation',
    name: '직업 적성·커리어 방향·사회적 역할',
    isFree: false,
  },
  {
    id: 'money-material',
    name: '돈·자존가치·물질적 안정 추구 방식',
    isFree: false,
  },
  {
    id: 'changes-crises',
    name: '삶의 큰 변화와 위기 패턴',
    isFree: false,
  },
  {
    id: 'soul-purpose',
    name: '영혼의 방향성·인생의 목적',
    isFree: false,
  },
  {
    id: 'timing-events',
    name: '중요한 인생 사건이 일어나는 타이밍',
    isFree: false,
  },
];

export const freeTopics: Topic[] = topics.filter((topic) => topic.isFree);
export const paidTopics: Topic[] = topics.filter((topic) => !topic.isFree);

export function getTopicById(id: string): Topic | undefined {
  return topics.find((topic) => topic.id === id);
}

export function isFreeTopic(id: string): boolean {
  const topic = getTopicById(id);
  return topic?.isFree ?? false;
}
