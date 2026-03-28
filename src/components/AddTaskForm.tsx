import { useState } from "react";
import type { SetTasks } from "../types/task";
import type { Task } from "../types/task";
import { BASE_URL } from "../api";

function AddTaskForm({ setTasks }: { setTasks: SetTasks }) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const completedAt = completed ? new Date().toISOString() : null;
  
    const res = await fetch(`${BASE_URL}/api/tasks`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: title,
        description: description,
        completed: completed,
        completedAt
      })
    });
  
    const newTask = await res.json();
    const normalizedTask: Task = {
      ...newTask,
      completed: typeof newTask.completed === "boolean" ? newTask.completed : completed,
      completedAt: newTask.completedAt ?? completedAt
    };
  
    setTasks((prevTasks: Task[]) => [...prevTasks, normalizedTask]);
  
    setTitle("");
    setDescription("");
    setCompleted(false);
  };

  return (
    <form className="flex flex-col gap-2 border-2 border-gray-600 p-2 rounded-md shadow-md" onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="New task..."
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />

      <input
        type="checkbox"
        checked={completed}
        onChange={(e) => setCompleted(e.target.checked)}
      />

      <input
        type="text"
        placeholder="Description..."
        value={description}
        onChange={(e) => setDescription(e.target.value)}
      />
      
      <button className="bg-blue-500 text-white p-2 rounded-md" type="submit">
        Add Task
      </button>
    </form>
  );
}

export default AddTaskForm;