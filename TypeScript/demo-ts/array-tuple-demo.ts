// 숫자 배열
let numbers : number[] = [1,2,3,4,5];

// 문자 배열
let fruits : string[] = ['apple', 'banana', 'orange'];

// 유니온 배열
let mixedArray : (number | string)[] = [1, 'two', 3, 'four'];

// 읽기 전용 배열
let readOnlyArray : ReadonlyArray<number> = [1,2,3];

// 튜플 (타입의 순서가 지정한대로 정해진다)
let greeting : [number, string, boolean] = [1, 'hello', true];
