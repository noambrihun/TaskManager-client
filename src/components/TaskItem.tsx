import type { Task } from "../types/task";

  function TaskItem({ task }: { task: Task }) {
    return (
      <div className="flex flex-col gap-2 border-2 border-gray-600 p-2 rounded-md shadow-md">
  
        <h2 className="text-xl font-bold">{task.title}</h2>
  
        <p className={task.completed ? "text-green-500" : "text-red-500"}>
          {task.completed ? "Completed" : "Not Completed"}
        </p>
  
        <p className="text-gray-500">{task.description}</p>
  
        <p className="text-gray-500">
          {task.completedAt
            ? new Date(task.completedAt).toLocaleString()
            : "Not Completed"}
        </p>
  
      </div>
    );
  }
  
  export default TaskItem;