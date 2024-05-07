function logName(name) {
    console.log(name);
}
logName('yo');
// let age : number = '20'; // 컴파일 에러 : 컴파일 타입에 에러 메세지 발생(syntax error)
// 함수의 데이터 타입 명시 (매개변수, 리턴타입)
function Plus(a, b) {
    return a + b;
}
// 함수에 리턴 타입이 없는 경우 - 리턴 타입을 void로 지정해줌
function Minus(a, b) {
    a - b;
}
function getInfo(id) {
    return {
        stdId: id,
        stdName: 'lee',
        age: 20,
        gneder: 'female',
        course: 'javascript',
        completed: true
    };
}
console.log(getInfo(5678));
