import { h } from 'preact';
import DeleteButton from '../ButtonComponents/DeleteButton';
import { TaskStatus } from '../../Model/TaskStatus';
import { ActiveTasksState, CompletedTasksState } from '../../Recoil/recoilState';
import { getRecoil, setRecoil } from 'recoil-nexus';

export default function CompletedTask() {
    const ActiveTasks = getRecoil(ActiveTasksState);
    const CompletedTasks = getRecoil(CompletedTasksState);
    const onDelete = (index: number) => {
        setRecoil(ActiveTasksState,[...ActiveTasks, {task:CompletedTasks[index].task, status:TaskStatus.Active}]);
        setRecoil(CompletedTasksState,CompletedTasks.filter((_,i) => i!=index));
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