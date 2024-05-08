// // 일반적인 직원 정보
// let empName : string;
// let age : number;
// let empJob : string;

// function printEmp(empName:string, age:number, empJob:string) : void {
//   console.log(`${empName}의 나이는 ${age} 이고, 직업은 ${empJob}`);
// }

// printEmp('kim', 20, 'developer');


// 멤버변수 == 속성 == 프로퍼티
// 멤버변수 == 메소드

// 클래스 == 붕어빵 틀
// class Employee {
//   // 프로퍼티 앞에 접근지정자를 지정해 외부에서 접근할 수 없게 함 : private
//   // private 프로퍼티는 암묵적으로 변수명 앞에 _를 붙임
//   private _empName : string;
//   private _age : number;
//   private _empJob : string;

//   constructor(empName : string, age? : number, empJob? : string) {
//     this._empName = empName;
//     this._age = age;
//     this._empJob = empJob;
//   }

//   // get/set
//   get empName() {
//     return this._empName;
//   }

//   set empName(val : string) {
//     this._empName = val;
//   }

//   printEmp = () : void => {
//     console.log(`${this._empName}의 나이는 ${this._age} 이고, 직업은 ${this._empJob}`);
//   }  
// }

// 위 클래스 Employee 최적화
class Employee {
  // 프로퍼티 선언과 constructor를 한 번에 함
  constructor(
    private _empName : string, 
    private _age? : number, 
    private _empJob? : string
    ) {
  }

  // get/set
  get empName() {
    return this._empName;
  }

  set empName(val : string) {
    this._empName = val;
  }

  printEmp = () : void => {
    console.log(`${this._empName}의 나이는 ${this._age} 이고, 직업은 ${this._empJob}`);
  }  
}

// 객체 == 붕어삥
let emploiee1 = new Employee('park', 30, 'designer');
// emploiee1.empName = 'jang';
// emploiee1.age = 22;
// emploiee1.empJob = '개발자';

emploiee1.empName = 'lee'; // empName을 lee로 변경 (불안정적인 코드)
                           // 객체지향의 갭슐화 철학을 지키기 위해 접근지정자를 사용 : 데이터 접근을 제한하기 위해
                           // get,set 을 설정했기 때문에 캡슐화를 충족하면서 get/set 메소드로 해당 변수에 접근해 변환 가능
emploiee1.printEmp();