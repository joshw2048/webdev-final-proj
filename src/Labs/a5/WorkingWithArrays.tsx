import React, { useState, useEffect } from "react";
import axios from "axios";

const API_BASE = process.env.REACT_APP_API_BASE;

function WorkingWithArrays() {
  const API = `${API_BASE}/a5/todos`;
  const [todo, setTodo] = useState({
    id: 1,    
    title: "NodeJS Assignment",
    description: "Create a NodeJS server with ExpressJS",
    due: "2021-09-09",
    completed: false,
  });

  const [todos, setTodos] = useState<any[]>([]);
  const fetchTodos = async () => {
    const response = await axios.get(API);
    setTodos(response.data);
  };

  const deleteTodo = async (todo: any) => {
    const response = await axios.delete(`${API}/${todo.id}`);
    setTodos(todos.filter((t) => t.id !== todo.id));
  };

  const postTodo = async () => {
    const response = await axios.post(API, todo);
    setTodos([...todos, response.data]);
  };

  const fetchTodoById = async (id: number) => {
    const response = await axios.get(`${API}/${id}`);
    setTodo(response.data);
  };

  const updateTodo = async () => {
    const response = await axios.put(`${API}/${todo.id}`, todo);
    setTodos(todos.map((t) => (t.id === todo.id ? todo : t)));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      <h3>Working with Arrays</h3>
      <h4>Retrieving Arrays</h4>
      <a href={API}>
        Get Todos
      </a>
      <h4>Retrieving an Item from an Array by ID</h4>
      <input value={todo.id}
        onChange={(e) => setTodo({ ...todo,
          id: parseInt(e.target.value) })}/>
      <a href={`${API}/${todo.id}`}>
        Get Todo by ID
      </a><br />
      <h3>Updating an Item in an Array</h3><br />
      <p> These links no longer work, because we've removed the old endpoints in lab 3.5! See code for commented out verion</p>
      <a href={`#`} >
        Update Title to {todo.title}
      </a> <br />
      <a href={`#`} >
        Update Completed to {todo.completed ? "true" : "false"}
      </a><br />
      <a href={`#`} >
        Update Description to {todo.description}
      </a>
      {/* <a href={`${API}/${todo.id}/title/${todo.title}`} >
        Update Title to {todo.title}
      </a> <br />
      <a href={`${API}/${todo.id}/completed/${todo.completed}`} >
        Update Completed to {todo.completed ? "true" : "false"}
      </a><br />
      <input type="checkbox" name="Completed" 
        onChange={(e) => setTodo({ ...todo, completed: !todo.completed})}/> <br />
      <a href={`${API}/${todo.id}/description/${todo.description}`} >
        Update Description to {todo.description}
      </a> */}
      <input type="text" 
        onChange={(e) => setTodo({ ...todo,
            description: e.target.value })}
        value={todo.description}/> <br />
      <h3>Filtering Array Items</h3>
      <a href={`${API}?completed=true`}>
        Get Completed Todos
      </a>
      <h3>Creating new Items in an Array</h3>
      <a href={`${API}/create`}>
        Create Todo
      </a>
      <h3>Deleting from an Array</h3>
      <a href={`${API}/${todo.id}/delete`}>
        Delete Todo with ID = {todo.id}
      </a> <br /> <br />
      <h3>Section 3.5 stuff, with axios and json</h3>
      <input type="text" value={todo.title}
        onChange={(e) => setTodo({
          ...todo, title: e.target.value })}/><br />
      <textarea value={todo.description} 
        onChange={(e) => setTodo({ ...todo,
          description: e.target.value })} /> <br />
      <input value={todo.due} type="date"
        onChange={(e) => setTodo({
          ...todo, due: e.target.value })} /> <br />
      <label>
        <input checked={todo.completed} type="checkbox"
          onChange={(e) => setTodo({
            ...todo, completed: e.target.checked })} />
        Completed
      </label><br />
      <button onClick={postTodo}> Post Todo </button>
      <button onClick={updateTodo}>
        Update Todo
      </button>
      <ul>
        {todos.map((todo: any) => (
          <li key={todo.id}>
            <button onClick={() => deleteTodo(todo)}
              className="btn btn-danger float-end ms-2">
              Delete
            </button>
            <button onClick={() => fetchTodoById(todo.id)} >
              Edit
            </button>
            <input checked={todo.completed}
              type="checkbox" readOnly />
            {todo.title}
            <p>{todo.description}</p>
            <p>{todo.due}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
export default WorkingWithArrays;