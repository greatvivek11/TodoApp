import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { getTasks, updateTasks } from './Service/Service';
import AddTasks from './Components/Tasks/AddTasks';
import CompletedTask from './Components/Tasks/CompletedTask';
import ActiveTask from './Components/Tasks/ActiveTask';
import { Task } from './Model/Task';
import { TaskStatus } from './Model/TaskStatus';
import * as dotenv from 'dotenv';
import InitializingServiceWorker from './Components/ServiceWorker';
import Footer from './Components/Footer';

export const App = (() => {
  // InitializingServiceWorker();
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
  function onAddTask(tasks: Task[]):void {
    console.log(tasks);
    setActiveTasks([...tasks]);
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
  }, [UpdateTasks])  */

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
    <div class="container mx-auto lg:w-1/2">
      <h1 class="text-5xl">Todo App</h1>
      <AddTasks Tasks={ActiveTasks} onAddTask={onAddTask} />
      <ActiveTask Tasks={ActiveTasks} onCheck={onCheck} onAddTask={onAddTask} onDelete={onDelete} />
      {returnLineBreak()}
      <CompletedTask CompletedTasks={CompletedTasks} onDelete={onUncheck} />
      <Footer />
    </div>
  );
}
)


