import { h } from 'preact';
import { useEffect } from 'preact/hooks';
import AddTasks from './Components/Tasks/AddTasks';
import CompletedTask from './Components/Tasks/CompletedTask';
import ActiveTask from './Components/Tasks/ActiveTask';
import Footer from './Components/Footer';
import { useRecoilValue } from 'recoil';
import { TasksState } from './Recoil/recoilState';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { TaskStatus } from './Model/TaskStatus';

export const App = (() => {

  const Tasks = useRecoilValue(TasksState);

  useEffect(() => {
    localStorage.setItem('Tasks', JSON.stringify(Tasks));
  }, [Tasks])

  console.log("Tasks: " + Tasks.length);
  
  return (
    <div class="container mx-auto lg:w-1/2">
      <h1 class="text-5xl">Todo App</h1>
      <ToastContainer position="top-center" style={{ fontSize: 16 }} theme="colored" autoClose={3000} hideProgressBar={false} newestOnTop closeOnClick={false} rtl={false} pauseOnFocusLoss draggable pauseOnHover />
      <AddTasks />
      <ActiveTask />
      {(Tasks.filter(tasks => tasks.status === TaskStatus.Active).length > 0 && Tasks.filter(tasks => tasks.status === TaskStatus.Completed).length > 0) ? <hr /> : ''}
      <CompletedTask />
      <Footer />
    </div>
  );
})