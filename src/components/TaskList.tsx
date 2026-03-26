import TaskItem from "./TaskItem";
import type { Task } from "../types/task";

function TaskList( { tasks }: { tasks: Task[] }) {
  return (
    <ul>
      {tasks.map((task: Task) => (
        <TaskItem key={task._id} task={task} />
      ))}
    </ul>
  );
}

export default TaskList;