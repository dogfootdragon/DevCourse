import dayjs from 'dayjs';

export const formatNumber = (number: number) : string => { //세자리 수마다 , 찍는 포멧
  return number.toLocaleString();
}

export const formatDate = (date: string, format?: string) => {
  return dayjs(date).format(format ? format : 'YYYY년 MM월 DD일');
}