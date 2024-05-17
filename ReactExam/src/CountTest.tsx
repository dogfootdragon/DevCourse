import { useState } from 'react';

function MyButton() {
  const [count, setCount] = useState(0);

  function handleClick() {
    setCount(count + 1);
    // console.log(count); // setCount로 count를 변경한 후 콘솔로 확인
  }

  return (
    <button onClick={handleClick}>
      Clicked {count} times
    </button>
  );
}

export default MyButton;