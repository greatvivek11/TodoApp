import { h } from 'preact';
import { useRef, useState } from 'preact/hooks';
import CheckButton from '../ButtonComponents/CheckButton';
import DeleteButton from '../ButtonComponents/DeleteButton';
import { Task } from '../../Model/Task';
import Editable from "../Editable";
import { TaskStatus } from '../../Model/TaskStatus';
import { ActiveTasksState, CompletedTasksState, setActiveTasksState, setCompletedTasksState } from '../State';

export default function ActiveTask() {
    const [Index, setIndex] = useState(-1);
    const [NewTask, setNewTask] = useState<Task>({ task: "",status:TaskStatus.Active})
    const ActiveTasks: Task[] = ActiveTasksState;
    const CompletedTasks: Task[] = CompletedTasksState;

    const onCheck = (index: number) => {
        setCompletedTasksState([...CompletedTasks, {task:ActiveTasks[index].task,status:TaskStatus.Completed}]);
        onDelete(index);
    }
    const onDelete = (index: number) => {
        ActiveTasks.splice(index, 1);
        setActiveTasksState(ActiveTasks);
    }
    const inputRef = useRef<any>();

    function handleEditTask(e:any,i:number) {
        setNewTask(x => x.task=e.target.value);
        setIndex(i);
    }
    function pushTasks(e:any) {
        if (e.key === "Enter") {
            ActiveTasks.splice(Index,1,NewTask);
            setActiveTasksState(ActiveTasks);
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
                            handleOnInput = {(e:any) => handleEditTask(e,i)}
                            handleKeyDown = {(e:any) => pushTasks(e)}
                        />
                        <DeleteButton onDelete={onDelete} index={i} />
                    </div>
                );
            })}
        </div>
    )
}