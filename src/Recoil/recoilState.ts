import { atom } from 'recoil';
import { Task } from '../Model/Task';

export const ActiveTasksState = atom<Task[]>({
    key: 'ActiveTasksState',
    default: (localStorage.getItem("ActiveTasks") !== null ) ? JSON.parse(localStorage.getItem("ActiveTasks")!!) : [],
});
export const CompletedTasksState = atom<Task[]>({
    key: 'CompletedTasksState',
    default: (localStorage.getItem("CompletedTasks") !== null) ? JSON.parse(localStorage.getItem("CompletedTasks")!!) : [],
});
