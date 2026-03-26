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
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white px-4 py-10">
      <div className="mx-auto w-full max-w-5xl rounded-2xl bg-white p-6 shadow-sm ring-1 ring-slate-200">
        <div className="mb-6 flex items-start justify-between gap-4">
          <h1 className="text-2xl font-bold tracking-tight text-slate-900">Task Manager</h1>
          <div className="text-sm text-slate-500">Manage your tasks in one place</div>
        </div>

        <div className="flex flex-col gap-6 md:flex-row md:items-start">
          <section className="min-w-0 flex-1">
            <TaskList tasks={tasks} setTasks={setTasks} />
          </section>
          <aside className="w-full md:w-96">
            <AddTaskForm setTasks={setTasks} />
          </aside>
        </div>
      </div>
    </div>
  );
}

export default HomePage;