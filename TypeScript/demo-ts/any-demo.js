// any 타입
// let anyVal : any = 100;
// anyVal = 'string';
// 유니온 타입
var anyVal = 100;
// anyVal = 'string';
function convertToString(val) {
    return String(val);
}
function convertToNumber(val) {
    return Number(val);
}
console.log(convertToString(anyVal));
console.log(convertToNumber(anyVal));
var anyVal2 = '100';
var item;
item = anyVal2; // item은 number 타입인데 string이 올 경우 에러
