import { useState, useEffect } from "react";
import TaskList from "../components/TaskList";
import AddTaskForm from "../components/AddTaskForm";
import type { Task } from "../types/task";


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
    <div className="relative min-h-screen overflow-hidden bg-slate-950 text-slate-50">
      <div
        aria-hidden="true"
        className="pointer-events-none absolute inset-0 opacity-60"
      >
        <div className="absolute -top-24 -left-24 h-72 w-72 rounded-full bg-indigo-500/30 blur-3xl" />
        <div className="absolute top-40 -right-28 h-80 w-80 rounded-full bg-cyan-400/20 blur-3xl" />
        <div className="absolute bottom-0 left-0 right-0 h-40 bg-gradient-to-t from-slate-950 to-transparent" />
      </div>

      <div className="relative mx-auto w-full max-w-6xl px-4 py-10">
        <header className="mb-8 flex flex-col gap-4 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-1">
            <h1 className="text-3xl font-bold tracking-tight">Task Manager</h1>
            <p className="text-sm text-slate-300">
              A clean workflow for your daily tasks.
            </p>
          </div>

          <div className="flex items-center gap-3">
            <div className="rounded-full border border-white/10 bg-white/5 px-3 py-1 text-xs text-slate-200">
              Toggle, edit and delete in seconds
            </div>
          </div>
        </header>

        <div className="grid gap-6 lg:grid-cols-[1fr_400px]">
          <section className="rounded-2xl border border-white/10 bg-white/5 p-5 shadow-sm backdrop-blur">
            <div className="mb-4 flex items-start justify-between gap-4">
              <div className="min-w-0">
                <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-300">
                  Tasks
                </h2>
                <p className="mt-1 text-sm text-slate-400">
                  Click the checkbox to mark completion.
                </p>
              </div>
            </div>

            <div className="rounded-xl border border-white/10 bg-slate-900/20 p-3">
              <TaskList tasks={tasks} setTasks={setTasks} />
            </div>
          </section>

          <aside className="rounded-2xl border border-white/10 bg-white p-5 shadow-sm">
            <div className="mb-4">
              <h2 className="text-sm font-semibold uppercase tracking-wider text-slate-700">
                Add a task
              </h2>
              <p className="mt-1 text-sm text-slate-500">
                Keep it simple, stay organized.
              </p>
            </div>
            <div className="rounded-xl bg-slate-50 p-3 ring-1 ring-slate-200">
              <AddTaskForm setTasks={setTasks} />
            </div>
          </aside>
        </div>

        <footer className="mt-8 text-center text-xs text-slate-400">
          Built with React + Tailwind.
        </footer>
      </div>
    </div>
  );
}

export default HomePage;