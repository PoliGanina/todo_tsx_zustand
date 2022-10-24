import create from "zustand";
import { v4 as uuidv4 } from 'uuid';

interface Task {
    id: string;
    title: string;
    createdAt: number;
}

interface ToDoStore {
    tasks: Task[];
    createTask: (title: string) => void;
    updateTask: (id: string, title:string) => void;
    removeTask: (id: string) => void;
}

export const useToDoStore = create<ToDoStore>((set,get) => ({
    tasks: [],
    createTask: (title: string) => {
        const { tasks } = get();
        const newTask = {
            id: uuidv4(),
            title: title,
            createdAt: Date.now(),
        }
        set({
            tasks: [newTask].concat(tasks),
        })
        console.log(tasks);
    },
    updateTask: (id: string, title: string) => {
        const { tasks } = get();
        set({
            tasks: tasks.map((task) => ({
                ...task,
                title: task.id === id ? title : task.title
            }))
        })
    },
    removeTask: (id:string) => {
        const { tasks } = get();
        set({
            tasks: tasks.filter((task) => task.id !== id)
        })
    },
}));