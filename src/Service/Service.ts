import { h } from 'preact';
import { Task } from '../Model/Task';
const taskId: number = 1;
const pkId: number = 1;

var url = ``;
if (process.env.NODE_ENV == "development") {
    url = `http://localhost:7071`;
}
export async function getTasks() {
    console.log("fetchings tasks using getTasks")
    return await fetch(url + `/api/getTasks?id=${taskId}&partitionKeyValue=${pkId}`)
        .then(res => res.json());
}

export async function updateTasks(tasks: Task[]) {
    console.log("Posting tasks");
    console.log(tasks);
    await fetch(url + `/api/putTasks`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tasks)
    }).then(response => {console.log(response)}).catch(err => {console.log(err)})
}