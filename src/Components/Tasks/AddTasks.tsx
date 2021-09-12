import { h } from 'preact';
import { useState } from 'preact/hooks';
import { Task } from '../../Model/Task';
import { TaskStatus } from '../../Model/TaskStatus';
import { setActiveTasksState } from '../State';

export default function AddTasks() {
  const [newTask, setnewTask] = useState<string>("");

  function onSubmit(e: any) {
    e.preventDefault();
    e.target.reset();
    setActiveTasksState((oldState: Task[]) => [
        ...oldState,{ task: newTask, status: TaskStatus.Active }
      ]);
    setnewTask("");
  }
  function addInputChange(task: string) {
    setnewTask(task);
  }

  return (
    <div class="container mx-auto mt-2">
      <form class="my-6" autocomplete="off" onSubmit={onSubmit}>
        <input required minLength={1} maxLength={32} type="text" name="addTask" class="mx-2 rounded-full text-black text-center border border-transparent focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent" id="addTask" placeholder="Add a task" onInput={(e: any) => addInputChange(e.target.value)} />
        <button class="border border-red-800 bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-purple-600 focus:ring-opacity-50 mx-2 mt-4 rounded-lg px-4" type="submit">Add Task</button>
      </form>
    </div>
  );
}