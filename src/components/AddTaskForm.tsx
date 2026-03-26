import { useState } from "react";

type Task = {
    _id: string;
    title: string;
    description: string;
    completed: boolean;
    completedAt: string | null;
    createdAt: string;
}

type AddTaskFormProps = {
    setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
};

function AddTaskForm({ setTasks }: AddTaskFormProps) {
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [completed, setCompleted] = useState(false);
  
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  
    const res = await fetch("http://localhost:3000/api/tasks", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        title: title,
        description: description,
        completed: completed,
        completedAt: completed ? new Date().toISOString() : null
      })
    });
  
    const newTask = await res.json();
  
    setTasks((prevTasks: Task[]) => [...prevTasks, newTask]);
  
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
      <input
        type="text"
        placeholder="Completed at..."
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