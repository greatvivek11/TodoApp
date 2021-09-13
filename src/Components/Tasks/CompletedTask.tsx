import { h } from 'preact';
import DeleteButton from '../ButtonComponents/DeleteButton';
import { Task } from '../../Model/Task';
import { TaskStatus } from '../../Model/TaskStatus';
import { useRecoilState } from 'recoil';
import { ActiveTasksState, CompletedTasksState } from '../../Recoil/recoilState';

export default function CompletedTask() {
    const [ActiveTasks, setActiveTasks] = useRecoilState(ActiveTasksState);
    const [CompletedTasks, setCompletedTasks] = useRecoilState(CompletedTasksState);
    const onDelete = (index: number) => {
        setActiveTasks([...ActiveTasks, {task:CompletedTasks[index].task, status:TaskStatus.Active}]);
        const newCT = CompletedTasks.filter((_,i) => i!=index);
        setCompletedTasks(newCT);
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