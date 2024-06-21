import type { Task } from "@/Model/Task";
import { atom } from "recoil";

export const TasksState = atom<Task[]>({
	key: "TasksState",
	default:
		localStorage.getItem("Tasks") !== null
			? JSON.parse(localStorage.getItem("Tasks") || "[]")
			: [],
});

export function updateTaskAtIndex(
	tasks: Task[],
	task: Task,
	i: number,
): Task[] {
	const newTasks = [...tasks];
	newTasks[i] = task;
	return newTasks;
}
