import React, { useState } from 'react'
import Taro from '@tarojs/taro'

type Todo = {
  id: number
  text: string
}

const initialTodos: Todo[] = [
  { id: 1, text: 'Learn React' },
  { id: 2, text: 'Learn TypeScript' },
]

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos)
  const [newTodo, setNewTodo] = useState<string>('3423432')

  const handleNewTodoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    setNewTodo(event.target.value)
  }

  const handleAddTodo = () => {
    const newId = todos.length > 0 ? todos[todos.length - 1].id + 1 : 1
    const newTodo2: Todo = { id: newId, text: newTodo }
    setTodos([...todos, newTodo2])
    setNewTodo('')
  }

  const handleDeleteTodo = (id: number) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id)
    setTodos(updatedTodos)
  }

  const go2chat = () => Taro.navigateTo({ url: '/pages/chat/index' })
  return (
    <div>
      <h1>Todo List</h1>
      <a onClick={go2chat}>go 2 chat</a>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className='flex justify-between'>
            <span> {todo.text} </span>
            <button className='todo-opeartion-btn' onClick={() => handleDeleteTodo(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
      <div>
        <input type='text' className='border' value={newTodo} onChange={handleNewTodoChange} />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>
    </div>
  )
}

export default TodoList
