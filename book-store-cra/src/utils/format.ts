export const formatNumber = (number: number) : string => { //세자리 수마다 , 찍는 포멧
  return number.toLocaleString();
}