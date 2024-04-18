// Promise "객체" : 약속을 지키는 객체

let promise = new Promise(function(resolve, reject){ // 매개변수로 함수를 받는다.
    // executor : 해당 객체가 할 일

    setTimeout(() => resolve("완료"), 3000);

    // 일을 다 끝내면 무조건 콜백함수 resolve() 또는 reject() 둘 중 하나는 호출한다
    // 할 일을 성공적으로 하면 resolve(결과)
    //         실패하면 reject(에러)

}); // 객체 소환

// promise의 기본 메소드 : promise가 일 다 하고(= 약속 다 지키고) 호출해야하는 함수
// 해야하는 일에 성공했을시 자동으로 then의 첫 번째 매개변수 실행. 실패했을시 두 번째 매개변수 실행.
promise.then(
  function(result){
    console.log(result);
  }, 
  function(error){
    console.log(error);
  }
);