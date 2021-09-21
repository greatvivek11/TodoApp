import { h } from 'preact';
import { useRef } from 'preact/hooks';
import CheckButton from '../ButtonComponents/CheckButton';
import DeleteButton from '../ButtonComponents/DeleteButton';
import Editable from "../Editable";
import { TaskStatus } from '../../Model/TaskStatus';
import { TasksState, updateTaskAtIndex } from '../../Recoil/recoilState';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';

export default function ActiveTask() {
    const [Tasks,setTasksState] = useRecoilState(TasksState);

    const onCheck = (task: string) => {
        const index = Tasks.findIndex((oldTask)=> oldTask.task===task)
        const newTask = {task:task,status:TaskStatus.Completed}
        setTasksState(oldTasks => updateTaskAtIndex(oldTasks,newTask,index));
        toast.success('Task has been finished successfully',{style:{background:"green"}});
    }
    const onDelete = (index: number) => {
        setTasksState(oldTasks => oldTasks.filter((_, i) => i != index));
        toast.error('Task has been removed!');
    }
    const inputRef = useRef<any>();

    function pushTasks(e: any,i:number) {
        if (e.key === "Enter") {
            const newTask = {task:e.target.value,status:TaskStatus.Active};
            setTasksState(oldTasks => updateTaskAtIndex(oldTasks,newTask,i));
            toast.info('Task has been updated successfully.',{style:{background:"darkorange"}});
        }
    }

    return (
        <div class="container overflow-y:auto mx-auto mb-5">
            {Tasks?.filter(task => task.status===TaskStatus.Active).map((task, i) => {
                return (
                    <div class="flex flex-wrap px-5 md:px-20">
                        <CheckButton onCheck={onCheck} task={task.task} />
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
