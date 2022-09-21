import React from "react";

const Todos = ({ todos, removeTodo, doneTodo, filterType }) => {
  return <div>
    {todos.map(todo => (
      todo.show && <div key={todo.id} className={todo.done ? 'todo done' : 'todo'}>
        <div className="todoItemContainer">
          <div className="todoItem">
            <input className='todoCheck' type='checkbox' onClick={() => doneTodo(todo.id)} defaultChecked={todo.done ? true : false} />
            <span className="todoText">{todo.title}</span>
          </div>
          {filterType === 'completed' && <div><i className='trashIconGrey fas fa-trash' onClick={() => removeTodo(todo.id)}></i></div>}
        </div>
      </div>
    ))}
  </div>
}

export default Todos;