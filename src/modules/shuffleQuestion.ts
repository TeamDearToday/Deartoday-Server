import dayjs from 'dayjs';
import timezone from 'dayjs/plugin/timezone';
import utc from 'dayjs/plugin/utc';

dayjs.extend(utc);
dayjs.extend(timezone);
const now = dayjs().tz('Asia/Seoul');

const year = now.get('year');
const month = now.get('month') + 1;
const date = now.get('date');

const question1 = ['이 순간에 대해 설명해줄 수 있어?', '이때 어떤 일이 있었는지 설명해줄 수 있어?', '이때가 어떤 순간이었는지 설명해줄 수 있을까?', '이때가 어떤 순간이었는지 궁금해!'];
const question2 = [
  '그렇구나.\n그럼, 이때 어떤 감정과 생각이 들었어?',
  '그렇구나.\n그럼, 혹시 이때 어떤 감정과 생각이 들었었는지 기억나?',
  '그렇구나.\n그럼, 그 당시에 너는 어떤 감정과 생각이 들었던 것 같아?',
  '그렇구나.\n그럼, 그 순간에 너는 어떤 감정과 생각이 들었어?',
];
const question3 = [
  '너에게 제일 궁금한 게 있어!\n너는 많은 순간들 중에 왜 이때로 돌아오고 싶었어?',
  '너에게 제일 궁금한 게 있어!\n너가 이 순간으로 돌아오고 싶다고 생각한 이유가 알고 싶어.',
  '너에게 제일 궁금한 게 있어!\n너가 왜 돌아가고 싶은 순간으로 이때를 골랐는지 알고 싶어.',
];
const question4 = [
  '이때를 떠올리면 지금은 어떤 감정과 생각이 들어?',
  '과거의 이 순간을 떠올리면 지금은 어떤 감정과 생각이 들어?',
  '이 순간을 생각했을 때 혹시 과거랑 지금 달라진 점이 있을까?',
  '이때의 경험에 대해 시간이 지나면서 달라진 감정이나 생각이 있을까?',
  '이 순간에 대한 감정과 생각이 과거와 달라진 점이 있을까?',
];
const question5 = [
  '그렇다면, 너는 이때의 경험으로부터 어떤 점들을 가져가고 싶어?',
  '그렇다면, 이때의 경험은 너에게 어떤 의미를 가지는 것 같아?',
  '그렇다면, 이때의 경험이 가지는 의미를 새롭게 생각해볼 수 있지 않을까?',
];
const question6 = ['너의 오늘은 어때?', '너의 지금은 어때?', `너의 ${year}년은 어때?`, `너의 ${year}년 ${month}월 ${date}일은 어때?`];
const lastMessage = [
  ['너의 오늘은,\n나에게는 살아보고 싶고 정말 기대되는 날이고,\n미래의 우리에게는 너무나도 돌아가고 싶고 그리울, 소중한 좋은 때일 거야.', '그러니 행복한 오늘에 하루하루 최선을 다해 살 수 있기를 :)'],
  ['너의 소중한 오늘은,\n10년 후에도, 20년 후에도,\n정말 되돌아가고 싶고 되돌리고 싶어할 바로 그 순간일 거야.', '그러니 행복한 오늘에 하루하루 최선을 다해 살 수 있기를 :)'],
  [
    '우리는 어쩌면 10년 후에 “그때가 좋았지” 하면서\n시간을 되돌리고 싶어할 수도 있어.',
    '그럼, 지금부터 다시 시작하자.\n너는 지금, 10년 후의 미래에서 되돌아온 거야.\n그러니 행복한 이 순간에 최선을 다해 살 수 있기를 :)',
  ],
];

const shuffleAndSelect = (array: Array<string | string[]>) => {
  const randomArray = array.sort(() => Math.random() - 0.5);
  return randomArray[0];
};

const getRandomQuestions = () => {
  const resultQuestion: string[] = [];
  resultQuestion.push(shuffleAndSelect(question1) as string);
  resultQuestion.push(shuffleAndSelect(question2) as string);
  resultQuestion.push(shuffleAndSelect(question3) as string);
  resultQuestion.push(shuffleAndSelect(question4) as string);
  resultQuestion.push(shuffleAndSelect(question5) as string);
  resultQuestion.push(shuffleAndSelect(question6) as string);

  const resultLastMessage: string[] = shuffleAndSelect(lastMessage) as string[];

  const result = {
    questions: resultQuestion,
    lastMessage: resultLastMessage,
  };

  return result;
};

export default getRandomQuestions;
