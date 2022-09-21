import { useState, useEffect } from "react";
import Todos from "./Components/Todos";
import AddTodo from "./Components/AddTodo";

const App = () => {

  const [todos, setTodos] = useState(
    JSON.parse(localStorage.getItem('todos'))?.map(todo => ({show: true, ...todo})) || []
  );
  const [filterType, setFilterType] = useState('all');

  useEffect(() => {
    const prepareToSave = todos.map(({show, ...todo}) => todo);
    localStorage.setItem('todos', JSON.stringify(prepareToSave));
  }, [todos]);
  
  const changeTab = (type) => {
    const todosList = todos.map(item => {
      if (type === 'all') {
        item.show = true;
        return item;
      }
      if (type === 'active')
        item.done === false ? item.show = true : item.show = false;
      if (type === 'completed')
        item.done === true ? item.show = true : item.show = false;
      return item;
    })
    setTodos(() => {
      setFilterType(type);
      return todosList;
    });
  }

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
    const newTodos = todos.filter(todo => !todo.done);
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
        changeTab={changeTab}
        filterType={filterType}
      />
      <Todos
        todos={todos}
        removeTodo={removeTodo}
        doneTodo={doneTodo}
        filterType={filterType}
      />
      {filterType === 'completed' && todos.findIndex(item => item.done === true) > -1 && <button className="btn" onClick={removeAllTodo}><i className='trashIconWhite fas fa-trash'></i> delete all</button>}
    </div>
  )
}

export default App;
