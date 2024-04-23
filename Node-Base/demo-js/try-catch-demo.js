let string = '{"num":1}'; // 에러 발생 테스트를 위해 } 지움

try {
  // username;
  let json = JSON.parse(string);

  if (!json.name) {
    throw new SyntaxError("입력 값에 이름이 없습니다.");
  } else {
    console.log(json.name); // undefined. js 입장에서는 에러가 아니지만, 우리 입장에서는 에러 = 입력값이 잘못된 에러
  }

  // if else 로만 예외처리를 하면 아래 코드까지 실행하지만
  // throw 를 사용하면 에러 발생시 throw까지만 코드를 실행
  let name = json.name;
  console.log(name);
  // console.log(json);
} catch (err) {
  // console.log(err);

  console.log(err.name);
  console.log(err.message);
}