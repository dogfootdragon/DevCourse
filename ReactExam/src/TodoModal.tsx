import React from 'react';
import {Modal} from 'react-bootstrap';

type Todo = {
  id : number;
  text : string;
  isChecked : boolean;
}

type TodoModalProps = {
  show : boolean;
  todo : Todo | null;
  handleClose : () => void; // void는 리턴값이 없다는 뜻. props로 handleClose 함수를 넘겨받기위해
}

const TodoMoal : React.FC = ({show, todo, handleClose}) => {
  return (
    <div>
      <Modal show={show} onHide={handleClose} centered>
        <Modal.Header closeButton>
          <Modal.Title>Todo 상세정보</Modal.Title>
        </Modal.Header>
        <Modal.Body>{todo?.text}</Modal.Body>
        {/* 옵셔널 체이닝 : ? -  todo에 값이 존재한다면 todo.text를 반환. todo에 속성이 없는 경우 에러를 발생시키지
        않고 undefined를 반환*/}
      </Modal>
    </div>
  )
}

export default TodoMoal;