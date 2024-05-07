// 변수의 데이터 타입 명시
var stdId = 1111;
var stdName = 'lee';
var age = 20;
var gender = 'male';
var course = 'Typescript';
var completed = false;
// 열거형 : 사용자 정의 타입
var GenderType;
(function (GenderType) {
    GenderType[GenderType["Male"] = 0] = "Male";
    GenderType[GenderType["Female"] = 1] = "Female";
})(GenderType || (GenderType = {}));
var MyStudent = /** @class */ (function () {
    function MyStudent() {
    }
    MyStudent.prototype.setName = function (name) {
        this.stdName = name;
        console.log('이름 설정: ' + this.stdName);
    };
    return MyStudent;
}());
var myInstance = new MyStudent();
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
function setInfo(student) {
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
