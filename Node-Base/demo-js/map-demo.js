
// map 함수(메소드) vs foreach 차이

const arr = [1, 2, 3, 4, 5];

// 객체(또는 배열)에서 요소를 하나 꺼낸 다음 
// 매개변수로 그 요소를 전달하여 호출되는 콜백함수
const foreachArr = arr.forEach((el, idx, ojt) => {
            //요소, 인덱스, 객체(통째로)
  return el * 2;
})
console.log(arr);

const mapArr = arr.map((el, idx, ojt) => {
         //요소, 인덱스, 객체(통째로)
return el * 2;
})
console.log(arr);

console.log("=======================")
console.log(`foreach로 return하면 ${foreachArr}`);
console.log(`map으로 return하면 ${mapArr}`);