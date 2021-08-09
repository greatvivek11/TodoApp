import { h } from 'preact';
import { StateUpdater, useRef } from 'preact/hooks';
import CheckButton from '../ButtonComponents/CheckButton';
import DeleteButton from '../ButtonComponents/DeleteButton';
import { Task } from '../../Model/Task';
import Editable from "../Editable";
import { TaskStatus } from '../../Model/TaskStatus';

export default function ActiveTask(props: any) {
    const Tasks: Task[] = props.Tasks;
    const onCheck: StateUpdater<number> = props.onCheck;
    const onAddTask: StateUpdater<Task[]> = props.onAddTask;
    const onDelete: StateUpdater<number> = props.onDelete;
    const inputRef = useRef<any>();

    function handleEditTask(e:any,i:number) {
        const editedTask:Task = {task:e.target.value,status:TaskStatus.Active};
        Tasks.splice(i, 1, editedTask);
    }
    function pushTasks(e:any) {
        if (e.key === "Enter") {
            onAddTask(Tasks);
        }
    }

    return (
        <div class="container mx-auto mb-5">
            {Tasks?.map((task, i) => {
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
                        {/* <p class="flex-grow w-2/3">{task.task}</p> */}
                        <DeleteButton onDelete={onDelete} index={i} />
                    </div>
                );
            })}
        </div>
    )
}

