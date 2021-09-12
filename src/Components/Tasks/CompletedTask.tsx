import { h } from 'preact';
import DeleteButton from '../ButtonComponents/DeleteButton';
import { Task } from '../../Model/Task';
import { TaskStatus } from '../../Model/TaskStatus';
import { ActiveTasksState, CompletedTasksState, setActiveTasksState, setCompletedTasksState } from '../State';

export default function CompletedTask() {
    const CompletedTasks: Task[] = CompletedTasksState;
    const ActiveTasks: Task[] = ActiveTasksState;

    const onDelete = (index: number) => {
        setActiveTasksState([...ActiveTasks, {task:CompletedTasks[index].task, status:TaskStatus.Active}]);
        CompletedTasks.splice(index, 1);
        setCompletedTasksState(CompletedTasks);
    }

    return (
        <div class="container overflow-y:auto mx-auto mt-5 pb-2">
            {CompletedTasks?.map((task, i) => {
                return (
                    <div class="flex flex-wrap px-5 md:px-20">
                        <DeleteButton onDelete={onDelete} index={i} />
                        <p class="flex-grow overflow-ellipsis overflow-hidden w-2/3 line-through">{task.task}</p>
                    </div>
                );
            })}
        </div>
    )
}