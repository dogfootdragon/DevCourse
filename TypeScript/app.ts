function logName(name:string) {
  console.log(name);
}

logName('yo');

// let age : number = '20'; // 컴파일 에러 : 컴파일 타입에 에러 메세지 발생(syntax error)

// 함수의 데이터 타입 명시 (매개변수, 리턴타입)
function Plus (a:number, b:number) : number {
  return a + b;
}

// 함수에 리턴 타입이 없는 경우 - 리턴 타입을 void로 지정해줌
function Minus (a:number, b:number) : void {
  a - b;
}



// 변수의 데이터 타입 명시
// let stdId = 1111;
// let stdName = 'lee';
// let age = 20;
// let gender = 'male';
// let course = 'Typescript';
// let completed = false;

interface Student {
  stdId : number;
  stdName : string;
  age : number;
  gneder : string;
  course : string;
  completed : boolean;
}

function getInfo(id : number) : Student {
  return {
    stdId : id,
    stdName : 'lee',
    age : 20,
    gneder : 'female',
    course : 'javascript',
    completed : true
  }
}

console.log(getInfo(5678));