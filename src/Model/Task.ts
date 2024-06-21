import type { TaskStatus } from "./TaskStatus";

export interface Task {
	task: string;
	status: TaskStatus;
}
