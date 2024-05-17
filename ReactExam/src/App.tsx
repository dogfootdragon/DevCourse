import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ClassCom from './ClassCom';
import FuncCom from './FuncCom';
import TodoList from './Todolist';
import MapTest from './MapTest';
import MyButton from './CountTest';
import Clock from './Timer';
import MyWeather from './MyWeather';

function App() {
  const [count, setCount] = useState(0)

  return(
    <div className='container'>
      <TodoList></TodoList> 
      <MyWeather weather='맑음'>일기예보</MyWeather>
      {/* <Clock></Clock> */}
      {/* <MapTest></MapTest> */}
    </div>
  )

  // return(
  //   <div className='component'>
  //     <ClassCom></ClassCom> {/* 클래스형 컴포넌트 사용 */}
  //     <FuncCom></FuncCom> { /* 함수형 컴포넌트 사용 */}
  //   </div>
  // )

  // let name = "리액트";
  // const style = { // css와 달리 카멜식으로 표기
  //   backgroundColor : 'black',
  //   color : 'white'
  // }

  // return (
  //   <>
  //   <div>
  //     <h1 style = {style}>Hello, 
  //     {
  //       name === "리액트" ? (<h1>YES</h1>) : (<h1>NO</h1>)
  //     }!</h1>
  //     <p>반갑습니다.</p>
  //     {/* 주석 작성 */}
  //   </div>
  //   </>
  // )

  // test port번호 리턴과 or 연산자
  // const port = undefined;
  // return(
  //   <div>
  //     {
  //       port || '3000'
  //     }
  //   </div>
  // )
}

export default App
