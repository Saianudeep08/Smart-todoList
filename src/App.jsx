import React, { useState, useEffect } from 'react';
import TodoItem from './components/TodoItem';

const FILTERS = {
  ALL: 'all',
  ACTIVE: 'active',
  COMPLETED: 'completed',
};

function App() {
  const [todos, setTodos] = useState(() => {
    const saved = localStorage.getItem('todos');
    return saved ? JSON.parse(saved) : [];
  });
  const [input, setInput] = useState('');
  const [filter, setFilter] = useState(FILTERS.ALL);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = () => {
    if (input.trim() === '') return;
    setTodos([...todos, { id: Date.now(), text: input, completed: false }]);
    setInput('');
  };

  const deleteTodo = (id) => setTodos(todos.filter(todo => todo.id !== id));

  const toggleComplete = (id) =>
    setTodos(todos.map(todo => (
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    )));

  const filteredTodos = todos.filter(todo => {
    if (filter === FILTERS.ACTIVE) return !todo.completed;
    if (filter === FILTERS.COMPLETED) return todo.completed;
    return true;
  });

  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-lg p-6 w-full max-w-md">
        <h1 className="text-2xl font-bold text-center mb-4">Smart To-Do List</h1>

        <div className="flex mb-4">
          <input
            type="text"
            className="flex-1 border border-gray-300 rounded-l px-3 py-2"
            placeholder="Add a task..."
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && addTodo()}
          />
          <button
            onClick={addTodo}
            className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600"
          >
            Add
          </button>
        </div>

        <div className="flex justify-center gap-3 mb-4 text-sm">
          {Object.values(FILTERS).map(f => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              className={`px-3 py-1 rounded ${
                filter === f ? 'bg-blue-500 text-white' : 'bg-gray-200'
              }`}
            >
              {f.charAt(0).toUpperCase() + f.slice(1)}
            </button>
          ))}
        </div>

        <ul className="space-y-2">
          {filteredTodos.length === 0 && <p className="text-center text-gray-400">No tasks</p>}
          {filteredTodos.map(todo => (
            <TodoItem
              key={todo.id}
              todo={todo}
              onToggle={() => toggleComplete(todo.id)}
              onDelete={() => deleteTodo(todo.id)}
            />
          ))}
        </ul>
      </div>
    </div>
  );
}

export default App;
