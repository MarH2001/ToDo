import { useState, useEffect } from "react";
import Todos from "./Todos";
import AddTodo from "./AddTodo";

const App = () => {

  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem('todos')) || []
  );
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  useEffect(() => {
    const todosList = todos.map(item => {
      if (filterType === 'all') {
        item.show = true;
        return item;
      }
      if (filterType === 'active')
        item.done === false ? item.show = true : item.show = false;
      if (filterType === 'completed')
        item.done === true ? item.show = true : item.show = false;
      return item;
    })
    setTodos(todosList);
  }, [filterType])

  const addTodo = todo => {
    if (!todo.title) return;
    const newTodos = [todo, ...todos];
    setTodos(newTodos);
  }

  const removeTodo = id => {
    const newTodos = todos.filter(todo => todo.id !== id);
    setTodos(newTodos);
  }

  const removeAllTodo = () => {
    const newTodos = todos.filter(todo => todo.done === !todo.done);
    setTodos(newTodos);
  }

  const doneTodo = id => {
    let newTodos = todos.map(todo => {
      if (todo.id === id) {
        todo.done = !todo.done;
        if(filterType !== 'all')
         todo.show = !todo.show;
      }
      return todo;
    });
    setTodos(newTodos);
  }

  return (
    <div className="app">
      <div className="title">#todo</div>
      <AddTodo
        addTodo={addTodo}
        setFilterType={setFilterType}
        filterType={filterType}
      />
      <Todos
        todos={todos}
        removeTodo={removeTodo}
        doneTodo={doneTodo}
        filterType={filterType}
      />
      {filterType === 'completed' && todos.findIndex(item => item.done === true) > -1 && <button className="btn" onClick={removeAllTodo}><i className='fas fa-trash'></i> delete all</button>}
    </div>
  )
}

export default App;
