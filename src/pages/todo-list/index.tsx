import React, { useState } from 'react'
import { View, Input, Button, Image } from '@tarojs/components'

type Todo = {
  id: number
  text: string
}

const initialTodos: Todo[] = []

const TodoList: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>(initialTodos)
  const [newTodo, setNewTodo] = useState<string>('3423432')

  const handleNewTodoChange = (event: any) => {
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

  return (
    <div className='px-32px'>
      <ul>
        {todos.map((todo) => (
          <li key={todo.id} className='flex justify-between py-10px'>
            <div className='flex-1'> {todo.text} </div>
            <Button
              size='mini'
              plain
              type='warn'
              className='todo-opeartion-btn inline text-right'
              onClick={() => handleDeleteTodo(todo.id)}
            >
              Delete
            </Button>
          </li>
        ))}
      </ul>
      <div className='mt-20px'>
        <Input
          type='text'
          value={newTodo}
          className='border border-#ccc'
          onInput={handleNewTodoChange}
        />
        <Button type='warn' onClick={handleAddTodo}>
          Add Todo
        </Button>
      </div>
    </div>
  )
}

export default TodoList
