import React from 'react';

const TodoItem = ({ todo, onToggle, onDelete }) => {
  return (
    <li
      className={`flex justify-between items-center px-3 py-2 rounded border ${
        todo.completed ? 'bg-green-100 line-through' : 'bg-gray-100'
      }`}
    >
      <span onClick={onToggle} className="flex-1 cursor-pointer">
        {todo.text}
      </span>
      <button onClick={onDelete} className="text-red-500 hover:text-red-700 ml-3">
        ✕
      </button>
    </li>
  );
};

export default TodoItem;
