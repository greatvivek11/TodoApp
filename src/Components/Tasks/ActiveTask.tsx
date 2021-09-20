import { h } from 'preact';
import { useRef } from 'preact/hooks';
import CheckButton from '../ButtonComponents/CheckButton';
import DeleteButton from '../ButtonComponents/DeleteButton';
import Editable from "../Editable";
import { TaskStatus } from '../../Model/TaskStatus';
import { ActiveTasksState, CompletedTasksState } from '../../Recoil/recoilState';
import { getRecoil, setRecoil } from 'recoil-nexus';

export default function ActiveTask() {
    var NewTask:string
    var Index:number
    const ActiveTasks = getRecoil(ActiveTasksState);
    const CompletedTasks = getRecoil(CompletedTasksState);


    const onCheck = (index: number) => {
        setRecoil(CompletedTasksState, [...CompletedTasks, { task: ActiveTasks[index].task, status: TaskStatus.Completed }]);
        onDelete(index);
    }
    const onDelete = (index: number) => {
        setRecoil(ActiveTasksState, ActiveTasks.filter((_, i) => i != index));
    }
    const inputRef = useRef<any>();

    function pushTasks(e: any,i:number) {
        if (e.key === "Enter") {
            setRecoil(ActiveTasksState,(tasks) => {
                let newTasks = [...tasks];
                newTasks[i] = {task:e.target.value,status:TaskStatus.Active}
                return newTasks;
            } );
        }
    }

    return (
        <div class="container overflow-y:auto mx-auto mb-5">
            {ActiveTasks?.map((task, i) => {
                return (
                    <div class="flex flex-wrap px-5 md:px-20">
                        <CheckButton onCheck={onCheck} index={i} />
                        <Editable
                            class="flex-grow w-2/3"
                            text={task.task}
                            placeholder="Write a task name"
                            type="input"
                            childRef={inputRef}
                            handleKeyDown={(e: any) => pushTasks(e,i)}
                        />
                        <DeleteButton onDelete={onDelete} index={i} />
                    </div>
                );
            })}
        </div>
    )
}
