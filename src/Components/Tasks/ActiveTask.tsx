import { h } from 'preact';
import { useRef } from 'preact/hooks';
import CheckButton from '../ButtonComponents/CheckButton';
import DeleteButton from '../ButtonComponents/DeleteButton';
import Editable from "../Editable";
import { TaskStatus } from '../../Model/TaskStatus';
import { TasksState, updateTaskAtIndex } from '../../Recoil/recoilState';
import { toast } from 'react-toastify';
import { useRecoilState } from 'recoil';
import { Task } from '../../Model/Task';

export default function ActiveTask() {
    const [Tasks, setTasksState] = useRecoilState(TasksState);

    // console.log(Tasks);

    const onCheck = (task: Task) => {
        const index = Tasks.findIndex(t => t == task);
        const newTask = { task: task.task, status: TaskStatus.Completed };
        setTasksState(oldTasks => updateTaskAtIndex(oldTasks, newTask, index));
        toast.success('Task has been finished successfully', { style: { background: "green" } });
    }
    const onDelete = (task: Task) => {
        const index = Tasks.findIndex(t => t == task);
        setTasksState(oldTasks => oldTasks.filter((_, i) => i != index));
        toast.error('Task has been removed!');
    }
    const inputRef = useRef<any>();

    function pushTasks(e: any, task: Task) {
        if (e.key === "Enter") {
            const newTask = { task: e.target.value, status: TaskStatus.Active };
            const index = Tasks.findIndex(t => t == task);
            setTasksState(oldTasks => updateTaskAtIndex(oldTasks,newTask,index));
            toast.info('Task has been updated successfully.', { style: { background: "darkorange" } });
        }
    }

    return (
        <div class="container overflow-y:auto mx-auto mb-5">
            {Tasks?.filter(task => task.status === TaskStatus.Active).map((task) => {
                return (
                    <div class="flex flex-wrap px-5 md:px-20">
                        <CheckButton onCheck={onCheck} task={task} />
                        <Editable
                            class="flex-grow w-2/3"
                            text={task.task}
                            placeholder="Write a task name"
                            type="input"
                            childRef={inputRef}
                            handleKeyDown={(e: any) => pushTasks(e, task)}
                        />
                        <DeleteButton onDelete={onDelete} task={task} />
                    </div>
                );
            })}
        </div>
    )
}
