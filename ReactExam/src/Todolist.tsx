import React, {useState} from 'react';

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

  const handleCheckedChange = (itemId : number) => {
    setTodos((prevItems) =>
      prevItems.map((item) => 
        item.id == itemId ? {...item, isChecked : !item.isChecked} : item
      )
    )
  }

  return(
    <div>
      <h1>{title}</h1>
      <p></p>
      <div className='container'>
        <div className='board'>
          <ul>
            {
              todos.map((todo) => (
                <li key={todo.id}>
                  <input type="checkbox" 
                  onChange={()=>{
                    handleCheckedChange(todo.id);
                  }}/>
                  <span>
                    {
                      todo.isChecked ? 
                      <del>{todo.text}</del>
                      : <span>{todo.text}</span>
                    }
                  </span>
                </li>
              ))
            }
          </ul>
        </div>
        
      </div>
    </div>
  )
}

export default TodoList;