import { useEffect, useState } from 'preact/hooks';
import { Task } from '../Model/Task';

const initialActiveTasksState: Task[] = (localStorage.getItem("ActiveTasks") !== null) ? JSON.parse(localStorage.getItem("ActiveTasks")!!) : [];
const initialCompletedTasksState: Task[] = (localStorage.getItem("CompletedTasks") !== null) ? JSON.parse(localStorage.getItem("CompletedTasks")!!) : [];

export const [ActiveTasksState, setActiveTasksState] = useState(initialActiveTasksState);
export const [CompletedTasksState, setCompletedTasksState] = useState(initialCompletedTasksState);

useEffect(() => {
    localStorage.setItem('ActiveTasks', JSON.stringify(ActiveTasksState));
}, [ActiveTasksState])

useEffect(() => {
    localStorage.setItem('CompletedTasks', JSON.stringify(CompletedTasksState));
}, [CompletedTasksState])