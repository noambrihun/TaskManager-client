export type Task = {
    _id: string;
    title: string;
    description: string;
    completed: boolean;
    completedAt: string | null;
    createdAt: string;
};

export type SetTasks = React.Dispatch<React.SetStateAction<Task[]>>
