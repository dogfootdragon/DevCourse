const arr = [1, 2, 3, 4, 5];

// 객체(또는 배열)에서 요소를 하나 꺼낸 다음 
// 매개변수로 그 요소를 전달하여 호출되는 콜백함수
arr.forEach((el, idx, ojt) => {
            //요소, 인덱스, 객체(통째로)
  // console.log(`el: ${el}, idx: ${idx}, ojt: ${ojt}`);
})

// Map과 forEach
let map = new Map();
map.set(7, "seven");
map.set(9, "nine");
map.set(8, "eight");

map.forEach((el, idx, ojt) => {
  console.log(`el: ${el}, idx: ${idx}, ojt: ${ojt}`);
})