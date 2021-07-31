import { h } from 'preact';
import { StateUpdater, useState } from 'preact/hooks';
import CheckButton from '../Components/CheckButton';
import DeleteButton from '../Components/DeleteButton';
import { Task } from './Task';

export default function ListTasks(props: any) {
    const Tasks: Task[] = props.Tasks;
    const onCheck: StateUpdater<number> = props.onCheck;
    const onDelete: StateUpdater<number> = props.onDelete;

    return (
        <div class="container mx-auto">
            {Tasks?.map((task, i) => {
                return (
                    <div class="flex flex-wrap px-5 md:px-20">
                        <CheckButton onCheck={onCheck} index={i}/>
                        <p class="flex-grow w-2/3">{task.task}</p>
                        <DeleteButton onDelete={onDelete} index={i}/>
                    </div>
                );
            })}
        </div>
    )
}

