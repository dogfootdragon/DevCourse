const obj1 = {};
const obj2 = {message : "비어있지 않음"};
const str1 = "one";
const str2 = ""; // 문자열도 결국 객체

console.log(Object.keys(obj1).length === 0); // length === 0
console.log(Object.keys(obj2).length === 0); // length === 1

console.log(Object.keys(str1).length === 0);
console.log(Object.keys(str2).length === 0);

function isEmpty(obj) {
  if(obj.constructor === Object && Object.keys(obj).length === 0) {
    return true;
  } else {
    return false;
  }
}

console.log("===isEmpty===")
console.log(isEmpty(obj1));
console.log(isEmpty(obj2));
console.log(isEmpty(str1));
console.log(isEmpty(str2));