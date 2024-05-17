import React, {useState} from 'react';
import { Button } from 'react-bootstrap';
import TodoMoal from './TodoModal';

type Todo = {
  id : number;
  text : string;
  isChecked : boolean;
}

const TodoList : React.FC = () => {
  const title : string = "오늘 할 일";
  const [todos, setTodos] = useState<Todo[]>([
    {id: 1, text: '공부하기', isChecked: false}, 
    {id: 2, text: '잠자기', isChecked: false}, 
    {id: 3, text: '미팅하기', isChecked: false}
  ]); // 구조 분해 할당

  const [newTodo, setNewTodo] = useState<string>('');

  const [showDetail, setShowDeteail] = useState<boolean>(false);
  const [selectedTodo, setSelectedTodo] = useState<Todo | null>(null);

  const handleCheckedChange = (itemId : number) => {
    setTodos((prevItems) =>
      prevItems.map((item) => 
        item.id == itemId ? {...item, isChecked : !item.isChecked} : item
      )
    )
  }

  const addTodo = () => {
    if(newTodo.trim() != '') {
      setTodos([...todos, {id: Date.now(), text: newTodo, isChecked: false}]);
      setNewTodo('');
    }
  }

  const removeTodo = (id : number) => {
    setTodos(todos.filter((todo)=> todo.id !== id))
  }

  const handleTodoClick = (todo : Todo) => {
    setShowDeteail(true);
    setSelectedTodo(todo);
  }

  const handleCloseDetail = () => {
    setShowDeteail(false);
  }

  return(
    <div>
      <h1>{title}</h1>
      <p></p>
      <div className='container'>
        <div>
          <input type="text" placeholder='할일 입력' style={{marginRight : '10px', writingMode : 'horizontal-tb'}}
          onChange={(e)=>{ setNewTodo(e.target.value) }}/>
          <Button variant='warning' onClick={addTodo}>추가</Button>
        </div>
        <p></p>

        <div className='board'>
          <ul>
            {
              todos.map((todo) => (
                <li key={todo.id}>
                  <input type="checkbox" 
                  onChange={()=>{
                    handleCheckedChange(todo.id);
                  }}/>
                  <span onClick={()=>handleTodoClick(todo)}>
                    {
                      todo.isChecked ? 
                      <del>{todo.text}</del>
                      : <span>{todo.text}</span>
                    }
                  </span>
                  <button
                    onClick={()=>removeTodo(todo.id)}
                    className='delbutton'
                  >삭제</button>
                </li>
              ))
            }
          </ul>
        </div>
        <TodoMoal show={showDetail} todo={selectedTodo} handleClose={handleCloseDetail}></TodoMoal>
      </div>
    </div>
  )
}

export default TodoList;