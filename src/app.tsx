import { h } from 'preact';
import { useEffect, useState } from 'preact/hooks';
import { getTasks } from './Service/Service';
import AddTasks from './Tasks/AddTasks';
import CompletedTask from './Tasks/CompletedTask';
import ListTasks from './Tasks/ListTasks';
import { Task } from './Tasks/Task';
import { TaskStatus } from './Tasks/TaskStatus';

export const App = (() => {
  const [Tasks, setTasks] = useState<Task[]>([]);
  const [CompletedTasks, setCompletedTasks] = useState<Task[]>([]);

  function onCheck(index: number): void {
    const completedTask = Tasks[index];
    completedTask.status=TaskStatus.Completed;
    setCompletedTasks([...CompletedTasks, completedTask]);
    onDelete(index);
  }

  function onDelete(index: number): void {
    Tasks.splice(index, 1);
    setTasks([...Tasks]);
  }

  function onDeleteComplete(index: number): void {
    const deleteCompletedTask = CompletedTasks[index];
    deleteCompletedTask.status=TaskStatus.Active;
    setTasks([...Tasks,deleteCompletedTask]);
    CompletedTasks.splice(index, 1);
    setCompletedTasks([...CompletedTasks]);
  }
  // useEffect(() => {
  //   getTasks().then(tasks => {
  //     setTasks([tasks])
  //   }
  //   ).catch(e => console.log(e))
  // }, []);
  console.log(Tasks);
  console.log(CompletedTasks);
  return (
    <div class="container mx-auto md:w-1/2">
      <h1 class="text-5xl">Todo App</h1>
      <AddTasks Tasks={Tasks} setTasks={setTasks} />
      <ListTasks Tasks={Tasks} onCheck={onCheck} onDelete={onDelete} />
      <CompletedTask CompletedTasks={CompletedTasks} onDelete={onDeleteComplete}/>
    </div>
  );
}
)

// export const App = () => (
//   <Provider store={store}>
//     <App1 />
//   </Provider>
// )