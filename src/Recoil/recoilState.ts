import { atom } from 'recoil';
import { Task } from '../Model/Task';

export const TasksState = atom<Task[]>({
    key: 'TasksState',
    default: (localStorage.getItem("Tasks") !== null) ? JSON.parse(localStorage.getItem("Tasks")!!) : [],
});

export function updateTaskAtIndex(tasks:Task[],task:Task,i:number):Task[] {
    const newTasks = [...tasks];
    newTasks[i] = task;
    return newTasks;
}