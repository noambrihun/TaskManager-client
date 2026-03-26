import type { Task } from "../types/task";
import type { SetTasks } from "../types/task";
import { useState } from "react";

  function TaskItem({ task , setTasks }: { task: Task, setTasks: SetTasks }) {
    const [isEditing, setIsEditing] = useState(false)
    const [editTitle, setEditTitle] = useState(task.title)
    const [editDescription, setEditDescription] = useState(task.description)

    const handleDelete = async () => {
        await fetch(`http://localhost:3000/api/tasks/${task._id}`, {
            method: "DELETE"
        });
        setTasks((prevTasks: Task[]) => prevTasks.filter((t: Task) => t._id !== task._id));
    }

    
    async function toggleTask() {

        const res = await fetch(`http://localhost:3000/api/tasks/${task._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            completed: !task.completed
          })
        })
      
        const updatedTask = await res.json()
      
        setTasks((prevTasks: Task[]) =>
          prevTasks.map((t: Task) =>
            t._id === updatedTask._id ? updatedTask : t
          )
        )
      
      }

      async function handleUpdate() {

        const res = await fetch(`http://localhost:3000/api/tasks/${task._id}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify({
            title: editTitle,
            description: editDescription
          })
        })
      
        const updatedTask = await res.json()
      
        setTasks((prevTasks: Task[]) =>
          prevTasks.map((t: Task) =>
            t._id === updatedTask._id ? updatedTask : t
          )
        )
      
        setIsEditing(false)
      }
    return (
      <div className="flex flex-col gap-4 rounded-xl border border-gray-200 bg-white p-4 shadow-sm transition-shadow hover:shadow-md">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            {isEditing ? (
              <input
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
              />
            ) : (
              <h2 className="truncate text-lg font-semibold text-gray-900">{task.title}</h2>
            )}
          </div>

          <input
            type="checkbox"
            checked={task.completed}
            onChange={() => toggleTask()}
            className="mt-1 h-4 w-4 rounded border-gray-300 text-blue-600 focus:ring-blue-500"
            aria-label="Toggle completion"
          />
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <p
            className={
              task.completed
                ? "inline-flex items-center rounded-full bg-green-50 px-2.5 py-1 text-xs font-medium text-green-700 ring-1 ring-inset ring-green-600/20"
                : "inline-flex items-center rounded-full bg-red-50 px-2.5 py-1 text-xs font-medium text-red-700 ring-1 ring-inset ring-red-600/20"
            }
          >
            {task.completed ? "Completed" : "Not Completed"}
          </p>
        </div>

        {isEditing ? (
          <input
            value={editDescription}
            onChange={(e) => setEditDescription(e.target.value)}
            className="w-full rounded-md border border-gray-300 bg-white px-3 py-2 text-sm shadow-sm focus:border-blue-500 focus:outline-none focus:ring-2 focus:ring-blue-200"
          />
        ) : (
          <p className="text-sm leading-relaxed text-gray-600">{task.description}</p>
        )}

        <div className="flex flex-wrap items-center gap-3 text-xs text-gray-500">
          <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 ring-1 ring-inset ring-gray-200">
            {task.completedAt ? new Date(task.completedAt).toLocaleString() : "Not Completed"}
          </span>
          <span className="inline-flex items-center rounded-md bg-gray-50 px-2 py-1 ring-1 ring-inset ring-gray-200">
            {task.createdAt}
          </span>
        </div>

        <div className="flex flex-wrap items-center gap-2">
          <button
            className="rounded-md bg-red-500 px-3 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-red-600 focus:outline-none focus:ring-2 focus:ring-red-200"
            onClick={handleDelete}
          >
            Delete Task
          </button>

          {isEditing ? (
            <button
              className="rounded-md bg-green-500 px-3 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-200"
              onClick={handleUpdate}
            >
              Save
            </button>
          ) : (
            <button
              className="rounded-md bg-yellow-500 px-3 py-2 text-sm font-medium text-white shadow-sm transition-colors hover:bg-yellow-600 focus:outline-none focus:ring-2 focus:ring-yellow-200"
              onClick={() => setIsEditing(true)}
            >
              Edit
            </button>
          )}
        </div>
      </div>
    );
  }
  
  export default TaskItem;