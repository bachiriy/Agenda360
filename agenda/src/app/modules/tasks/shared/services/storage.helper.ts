import { Task } from "../../models/task";


export const getStoredTasks = (): Task[] => {
   return JSON.parse(localStorage.getItem("tasks") || '[]');
}

export const storeTasks = (tasks: Task[]): void => {
   localStorage.setItem("tasks", JSON.stringify(tasks));
}