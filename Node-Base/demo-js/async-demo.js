// async-await : Promise 객체를 좀 더 쉽고 편하게 사용하는 문법
// 즉 비동기 처리가 쉽다.

// async 함수
// function f() {} : 일반 함수
// async function f() {} : async 함수

async function f() {
  return 1; // Promise 객체를 반환 중 : return 1; == return Promise.resolve(1);
  // async 첫 번째 기능
  // async 함수는 무조건 Promise 객체를 반환
  // 만약 반환값이 Promise가 아니면, Promis.resolve()로 감싼다
}

f().then(
  function(result) {
    console.log("promise resolce : ", result);
  },
  function(error) {
    console.log("promise reject : ", error);
  }
);