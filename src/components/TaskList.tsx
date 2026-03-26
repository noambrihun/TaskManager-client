import TaskItem from "./TaskItem";
import type { Task } from "../types/task";
import type { SetTasks } from "../types/task";

function TaskList( { tasks , setTasks }: { tasks: Task[], setTasks: SetTasks }) {
  return (
    <ul>
      {tasks.map((task: Task) => (
        <TaskItem key={task._id} task={task} setTasks={setTasks} />
      ))}
    </ul>
  );
}

export default TaskList;