import React, { useState } from 'react'
import { useTodo } from '../contexts/TodoContext';

function TodoItem({todo}) {

    const [TodoIsEditable, setTodoIsEditable] = useState(false);

    const [TodoMessage, setTodoMessage] = useState(todo.todo);

    const {updatedTodo, deleteTodo, toggleComplete} = useTodo();



    const editTodo = () => {
        updatedTodo(todo.id, {...todo, todo: TodoMessage});
        setTodoIsEditable(false)
    }


    const toggleCompleted  = () => {
        toggleComplete(todo.id)
    }



  return (
    <div
            className={`flex border border-black/10 rounded-lg px-3 py-1.5 gap-x-3 shadow-sm shadow-white/50 duration-300  text-black ${
                todo.completed ? "bg-[#c6e9a7]" : "bg-[#ccbed7]"
            }`}
        >
            <input
                type="checkbox"
                className="cursor-pointer"
                checked={todo.completed}
                onChange={toggleCompleted}
            />
            <input
                type="text"
                className={`border outline-none w-full bg-transparent rounded-lg ${
                    TodoIsEditable ? "border-black/10 px-2" : "border-transparent"
                } ${todo.completed ? "line-through" : ""}`}
                value={TodoMessage}
                onChange={(e) => setTodoMessage(e.target.value)}
                readOnly={!TodoIsEditable}
            />
            {/* Edit, Save Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0 disabled:opacity-50"
                onClick={() => {
                    if (todo.completed) return;

                    if (TodoIsEditable) {
                        editTodo();
                    } else setTodoIsEditable((prev) => !prev);
                }}
                disabled={todo.completed}
            >
                {TodoIsEditable ? "📁" : "✏️"}
            </button>
            {/* Delete Todo Button */}
            <button
                className="inline-flex w-8 h-8 rounded-lg text-sm border border-black/10 justify-center items-center bg-gray-50 hover:bg-gray-100 shrink-0"
                onClick={() => deleteTodo(todo.id)}
            >
                ❌
            </button>
        </div>
  )
}

export default TodoItem