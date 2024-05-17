import React from 'react';
import { Component } from 'react';

interface MyProps {
  weather : string;
  children : React.ReactNode;
}

// 함수형 컴포넌트
// const MyWeather : React.FC<MyProps> = ({weather, children}) => { // 아예 구조분해할당으로 받을수도 있다
//   // const {weather, children} = props;

//   return (
//     <div>
//       {children} <p></p>
//       오늘의 날씨는 {weather} 입니다.
//     </div>
//   )
// }

// 클래스형 컴포넌트
class MyWeather extends Component<MyProps>{
  render(){
    const {weather, children} = this.props; // this는 객체지향 언어에서 사용되는 일종의 포인터.
                // 호출당한 입장에서 어떤 객체가 자신을 호출했는지 알아야 할 때도 사용
                // 구조분해할당으로 props를 추출
    return (
      <div>
        {children} <p></p>
        오늘의 날씨는 {weather} 입니다.
      </div>
    )
  }
}

export default MyWeather;