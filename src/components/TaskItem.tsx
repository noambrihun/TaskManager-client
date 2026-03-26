import type { Task } from "../types/task";
    import type { SetTasks } from "../types/task";

  function TaskItem({ task , setTasks }: { task: Task, setTasks: SetTasks }) {

    const handleDelete = async () => {
        await fetch(`http://localhost:3000/api/tasks/${task._id}`, {
            method: "DELETE"
        });
        setTasks((prevTasks: Task[]) => prevTasks.filter((t: Task) => t._id !== task._id));
    }
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
        <p className="text-gray-500">{task.createdAt}</p>
        <button className="bg-red-500 text-white p-2 rounded-md" onClick={handleDelete}>
        Delete Task  
       </button>  
     </div>
    );
  }
  
  export default TaskItem;