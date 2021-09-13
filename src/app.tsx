import { h } from 'preact';
import { useEffect } from 'preact/hooks';
import AddTasks from './Components/Tasks/AddTasks';
import CompletedTask from './Components/Tasks/CompletedTask';
import ActiveTask from './Components/Tasks/ActiveTask';
import { Task } from './Model/Task';
import InitializingServiceWorker from './Components/ServiceWorker';
import Footer from './Components/Footer';
import { useRecoilValue } from 'recoil';
import { ActiveTasksState, CompletedTasksState } from './Recoil/recoilState';

export const App = (() => {
  InitializingServiceWorker();
  
  const ActiveTasks = useRecoilValue<Task[]>(ActiveTasksState);
  const CompletedTasks = useRecoilValue<Task[]>(CompletedTasksState);

  useEffect(() => {
    localStorage.setItem('ActiveTasks', JSON.stringify(ActiveTasks));
  }, [ActiveTasks])

  useEffect(() => {
    localStorage.setItem('CompletedTasks', JSON.stringify(CompletedTasks));
  }, [CompletedTasks])

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
        <AddTasks />
        <ActiveTask />
        {returnLineBreak()}
        <CompletedTask />
        <Footer />
      </div>
  );
}
)