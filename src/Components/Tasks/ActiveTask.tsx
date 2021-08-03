import { h } from 'preact';
import { StateUpdater, useState } from 'preact/hooks';
import CheckButton from '../ButtonComponents/CheckButton';
import DeleteButton from '../ButtonComponents/DeleteButton';
import { Task } from '../../Model/Task';

export default function ActiveTask(props: any) {
    const Tasks: Task[] = props.Tasks;
    const onCheck: StateUpdater<number> = props.onCheck;
    const onDelete: StateUpdater<number> = props.onDelete;

    return (
        <div class="container mx-auto mb-5">
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

