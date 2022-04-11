import { h } from 'preact';
import { TaskStatus } from '../../Model/TaskStatus';
import { TasksState, updateTaskAtIndex } from '../../Recoil/recoilState';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';
import UncheckButton from '../ButtonComponents/UncheckButton';
import { Task } from '../../Model/Task';

export default function CompletedTask() {
    const [Tasks, setTasksState] = useRecoilState(TasksState);

    const onUncheck = (task: Task) => {
        const index = Tasks.findIndex(t => t == task)
        const newTask = { task: task.task, status: TaskStatus.Active };
        setTasksState(oldTasks => updateTaskAtIndex(oldTasks, newTask, index))
        toast.info('Task has been set to Active!');
    }

    return (
        <div class="container overflow-y:auto mx-auto mt-5 pb-2">
            {Tasks?.filter((task) => task.status === TaskStatus.Completed).map((task) => {
                return (
                    <div class="flex flex-wrap px-5 md:px-20">
                        <UncheckButton onUncheck={onUncheck} task={task} />
                        <p class="flex-grow overflow-ellipsis overflow-hidden w-2/3 line-through">{task.task}</p>
                    </div>
                );
            })}
        </div>
    )
}