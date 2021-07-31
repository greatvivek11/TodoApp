import { h } from 'preact';
import { StateUpdater, useState } from 'preact/hooks';
import { Task } from './Task';
import { TaskStatus } from './TaskStatus';

export default function AddTasks(props:any) {
  const [newTasks, setnewTasks] = useState<Task[]>([])
  const Tasks:Task[] = props.Tasks;
  const setTasks:StateUpdater<Task[]> = props.setTasks; 

  function onSubmit(e: any) {
    e.preventDefault();
    e.target.reset();
    setTasks(newTasks);
  }
  function addInputChange(task:string) {
    if(!validateInput(task)){
      return;
    }
    const newTask: Task = { task: task ,status:TaskStatus.Active };
    setnewTasks([...Tasks,newTask]);
  }
  function validateInput(task:string):boolean {
    return (task.length<32)?true:false;
  }
  return (
    <div class="container mx-auto mt-2">
      <form class="my-6" onSubmit={onSubmit}>
        <input type="text" name="addTask" class="mx-2 text-black" id="addTask" placeholder="Add a task" onInput={(e:any) => addInputChange(e.target.value)} />
        <button class="border border-red-800 bg-red-600 mx-2 mt-4 rounded-md px-4" type="submit">Add Task</button>
      </form>
    </div>
  );
}
