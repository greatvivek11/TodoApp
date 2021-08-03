import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { getTasks, updateTasks } from './Service/Service';
import AddTasks from './Components/Tasks/AddTasks';
import CompletedTask from './Components/Tasks/CompletedTask';
import ActiveTask from './Components/Tasks/ActiveTask';
import { Task } from './Model/Task';
import { TaskStatus } from './Model/TaskStatus';
import * as dotenv from 'dotenv';

export const App = (() => {
  const divInstall = document.getElementById('installContainer');
  const butInstall = document.getElementById('butInstall');

  /* Only register a service worker if it's supported */
if ('serviceWorker' in navigator) {
  navigator.serviceWorker.register('/service-worker.js');
}

/**
 * Warn the page must be served over HTTPS
 * The `beforeinstallprompt` event won't fire if the page is served over HTTP.
 * Installability requires a service worker with a fetch event handler, and
 * if the page isn't served over HTTPS, the service worker won't load.
 */
if (window.location.protocol === 'http:') {
  const requireHTTPS = document.getElementById('requireHTTPS')!!;
  const link = requireHTTPS.querySelector('a')!!;
  link.href = window.location.href.replace('http://', 'https://');
  requireHTTPS.classList.remove('hidden');
}

  const initialActiveTasks: Task[] = (localStorage.getItem("ActiveTasks") !== null) ? JSON.parse(localStorage.getItem("ActiveTasks")!!) : [];
  const initialCompletedTasks: Task[] = (localStorage.getItem("CompletedTasks") !== null) ? JSON.parse(localStorage.getItem("CompletedTasks")!!) : [];
  const [ActiveTasks, setActiveTasks] = useState<Task[]>(initialActiveTasks);
  const [CompletedTasks, setCompletedTasks] = useState<Task[]>(initialCompletedTasks);
  const [UpdateTasks, setUpdateTasks] = useState(false);

  function onCheck(index: number): void {
    const completedTask = ActiveTasks[index];
    completedTask.status = TaskStatus.Completed;
    setCompletedTasks([...CompletedTasks,completedTask]);
    onDelete(index);
  }
  function onDelete(index: number): void {
    ActiveTasks.splice(index, 1);
    setActiveTasks([...ActiveTasks]);
    setUpdateTasks(true);
  }
  function onAddTask(task: Task[]):void {
    setActiveTasks(task);
    setUpdateTasks(true);
  }
  function onUncheck(index: number): void {
    const deleteCompletedTask = CompletedTasks[index];
    deleteCompletedTask.status = TaskStatus.Active;
    setActiveTasks([...ActiveTasks, deleteCompletedTask]);
    CompletedTasks.splice(index, 1);
    setCompletedTasks([...CompletedTasks]);
    setUpdateTasks(true);
  }

  useEffect(() => {
    localStorage.setItem('ActiveTasks', JSON.stringify(ActiveTasks));
  }, [ActiveTasks])

  useEffect(() => {
    localStorage.setItem('CompletedTasks', JSON.stringify(CompletedTasks));
  }, [CompletedTasks])

  /* useEffect(() => {
    getTasks().then((tasks:Tasks) => { 
      if(tasks.tasks!=null){
        const activeTasks = tasks.tasks.filter((x:Task) => x.status=="Active");
        const completedTasks = tasks.tasks.filter((x:Task) => x.status=="Completed");
        setActiveTasks(activeTasks);
        setCompletedTasks(completedTasks);    
        }
      })
      .catch(e => console.log(e))
  }, []);

  useEffect(() => {
    if(UpdateTasks){
      updateTasks([...ActiveTasks,...CompletedTasks])
      setUpdateTasks(false);
    }
  }, [UpdateTasks]) */

  function returnLineBreak(): any {
    if (CompletedTasks.length > 0 && ActiveTasks.length > 0) {
      return (
        <hr></hr>
      );
    }
  }

  console.log("Active Tasks: " + ActiveTasks.length);
  console.log("Completed Tasks: " + CompletedTasks.length);

  return (
    <div class="container mx-auto md:w-1/2">
      <h1 class="text-5xl">Todo App</h1>
      <AddTasks Tasks={ActiveTasks} onAddTask={onAddTask} />
      <ActiveTask Tasks={ActiveTasks} onCheck={onCheck} onDelete={onDelete} />
      {returnLineBreak()}
      <CompletedTask CompletedTasks={CompletedTasks} onDelete={onUncheck} />
    </div>
  );
}
)

