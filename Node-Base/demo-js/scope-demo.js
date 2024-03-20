if(true) {
  var num1 = 7; // (전역변수)
  const num2 = 3; // 블록 {} 스코프. 중괄호 기준으로 안에 선언되었다면 밖에서 선언할 수 없음
  let num3 = 5; // 블록 {} 스코프 (지역변수)

  console.log(`${num1} + ${num2} = ${num3}`); // 템플릿 문자열 (` `)
}

console.log(num1);
// console.log(num2);
console.log(num3);