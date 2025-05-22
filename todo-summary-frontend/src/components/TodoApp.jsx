import React, { useEffect, useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import axios from "axios";

const backendUrl = import.meta.env.VITE_BACKEND_URL;

const TodoApp = () => {
  const [todos, setTodos] = useState([]);
  const [text, setText] = useState("");
  const [status, setStatus] = useState("");
  const [editingId, setEditingId] = useState(null);
  const [editText, setEditText] = useState("");

  const fetchTodos = async () => {
    try {
      const response = await axios.get(backendUrl);
      setTodos(response.data);
    } catch (error) {
      console.log(error);
    }
  };

  const addTodo = async () => {
    if (!text.trim()) return;
    await axios.post(backendUrl, { text });
    setText("");
    fetchTodos();
  };

  const updateTodo = async (id) => {
    if (!editText.trim()) return;
    await axios.put(`${backendUrl}/${id}`, { text: editText });
    setEditingId(null);
    setEditText("");
    fetchTodos();
  };

  const deleteTodo = async (id) => {
    await axios.delete(`${backendUrl}/${id}`);
    fetchTodos();
  };

  const summarizeTodos = async () => {
    setStatus("Summarizing...");
    try {
      const response = await axios.post(`${backendUrl}/summarize`);
      setStatus(`Sent to Slack: ${response.data.summary}`);
    } catch (error) {
        console.error('Axios error:', error.response || error.message);
        setStatus("Failed to summarize or send to Slack.");
    }
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-teal-400 to-cyan-500 flex items-center justify-center p-4">
      <div className="w-full max-w-xl bg-white shadow-xl rounded-2xl p-6 space-y-6">
        <h1 className="text-3xl font-bold text-center text-gray-800">
          {" "}
          Todo Summary Bot
        </h1>

        <div className="flex gap-2">
          <input
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter a Todo..."
            required
            type="text"
            className="flex-grow px-4 py-2 border rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
          />
          <button
            onClick={addTodo}
            className="bg-blue-500 text-white px-5 py-2 rounded-lg font-semibold hover:bg-blue-600 transition"
          >
            Add
          </button>
        </div>

        <ul className="space-y-2">
          {todos.map((todo) => (
            <li
              key={todo.id}
              className="flex justify-between items-center bg-gray-50 px-4 py-3 rounded-md shadow-sm hover:shadow-md transition"
            >
              {editingId === todo.id ? (
                <input
                  value={editText}
                  onChange={(e) => setEditText(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && updateTodo(todo.id)}
                  onBlur={() => updateTodo(todo.id)}
                  className="flex-grow px-3 py-1 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
                  autoFocus
                />
              ) : (
                <span className="flex-grow text-gray-800">{todo.text}</span>
              )}

              <div className="flex gap-3 ml-4">
                <button
                  onClick={() => {
                    setEditingId(todo.id);
                    setEditText(todo.text);
                  }}
                  className="text-blue-500 hover:text-blue-700 text-lg"
                >
                  <FaEdit />
                </button>
                <button
                  onClick={() => deleteTodo(todo.id)}
                  className="text-red-500 hover:text-red-700 text-lg"
                >
                  <FaTrash />
                </button>
              </div>
            </li>
          ))}
        </ul>

        <div className="text-center pt-4">
          <button
            onClick={summarizeTodos}
            className="bg-green-500 text-white px-6 py-2 rounded-lg font-semibold hover:bg-green-600 transition"
          >
            Summarize & Send to Slack
          </button>
        </div>

        {status && (
          <p className="text-sm text-center text-gray-700 bg-gray-100 p-2 rounded-md mt-2">
            {status}
          </p>
        )}
      </div>
    </div>
  );
};

export default TodoApp;
