import { h } from 'preact';
import AddTasks from './Components/Tasks/AddTasks';
import CompletedTask from './Components/Tasks/CompletedTask';
import ActiveTask from './Components/Tasks/ActiveTask';
import * as dotenv from 'dotenv';
import InitializingServiceWorker from './Components/ServiceWorker';
import Footer from './Components/Footer';
import { ActiveTasksState, CompletedTasksState } from './Components/State';

export const App = (() => {
  InitializingServiceWorker();
  
  function returnLineBreak(): any {
    if (CompletedTasksState.length > 0 && ActiveTasksState.length > 0) {
      return (
        <hr></hr>
      );
    }
  }

  console.log("Active Tasks: " + ActiveTasksState.length);
  console.log("Completed Tasks: " + CompletedTasksState.length);

  return (
    <div className="container mx-auto lg:w-1/2">
      <h1 className="text-5xl">Todo App</h1>
      <AddTasks />
      <ActiveTask />
      {returnLineBreak()}
      <CompletedTask />
      <Footer />
    </div>
  );
})