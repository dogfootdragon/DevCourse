// 변수의 데이터 타입 명시
let stdId = 1111;
let stdName = 'lee';
let age = 20;
let gender = 'male';
let course = 'Typescript';
let completed = false;

// 열거형 : 사용자 정의 타입
enum GenderType {
  Male,
  Female
}

interface Student {
  stdId : number;
  stdName? : string;
  age? : number; // ? : 선택적 프로퍼티
  gneder? : GenderType;
  course? : string;
  completed? : boolean;
  // setName(name:string) : void;
  setName : (name:string) => void;
  // getName : () => string;
}

class MyStudent implements Student {
  stdId : 91900;
  stdName : 'lee';
  age : 30;
  gneder : GenderType.Male;
  course : 'node.js';
  completed : true;

  setName(name : string) : void { //setName을 오버라이딩
    this.stdName = name;
    console.log('이름 설정: ' + this.stdName);
  }
}

const myInstance = new MyStudent();
myInstance.setName('김이름');

// function getInfo(id : number) : Student {
//   return {
//     stdId : id,
//     stdName : 'lee',
//     age : 20,
//     gneder : 'female',
//     course : 'javascript',
//     completed : true
//   }
// }

function setInfo(student : Student) : void {
  // console.log(student);
}

// let std = {
//   stdId : 91900,
//   stdName : 'lee',
//   age : 30,
//   gneder : 'female',
//   course : 'node.js',
//   completed : true
// }

// setInfo(std);

// console.log(getInfo(5678));