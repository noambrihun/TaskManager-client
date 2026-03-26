import { useState, useEffect } from "react";
import TaskList from "../components/TaskList";
import AddTaskForm from "../components/AddTaskForm";

type Task = {
  _id: string;
  title: string;
  description: string;
  completed: boolean;
  completedAt: string | null;
  createdAt: string;
};
function HomePage() {

  const [tasks, setTasks] = useState<Task[]>([]);

  useEffect(() => {
    fetch("http://localhost:3000/api/tasks")
      .then(res => res.json())
      .then(data => setTasks(data));
  }, []);

  console.log(tasks);
  console.log(tasks.length);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen min-w-screen bg-white rounded-md p-4">
      <h1 className="text-2xl font-bold text-center mb-4">Task Manager</h1>
      <TaskList tasks={tasks} setTasks={setTasks} />
      <AddTaskForm setTasks={setTasks} />
    </div>
  );
}

export default HomePage;