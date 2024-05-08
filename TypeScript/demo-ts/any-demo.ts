// any 타입
// let anyVal : any = 100;
// anyVal = 'string';


// 유니온 타입
let anyVal : number | string = 100;
// anyVal = 'string';

function convertToString(val : number | string) : string {
  return String(val);
}

function convertToNumber(val : number | string) : number {
  return Number(val);
}

console.log(convertToString(anyVal));
console.log(convertToNumber(anyVal));


// 타입 별칭, 타입 알리아스
type strOrNum = number | string;
let anyVal2 : strOrNum = '100';

let item : number;
item = anyVal2; // item은 number 타입인데 string이 올 경우 에러