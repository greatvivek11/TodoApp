import { Tasks } from "../Tasks/Tasks";
const taskId:number = 3;
const pkId:number = 3;
// const baseUrl = "https://todo-tasks-api.azurewebsites.net";
const authCode = "1sLhAn9b0IaWFFHKxT8/0y/04UA5uMKGlNQ/UQa9f3oYoOjhd9qFwA=="
const baseUrl ="http://localhost:7071";

export async function getTasks() {
    console.log("fetchings tasks using getTasks")
    return await fetch(baseUrl + `/api/getTasks?id=${taskId}&partitionKeyValue=${pkId}&code=${authCode}`)
        .then(res => res.json());
}

export async function updateTasks(tasks:Tasks) {
    console.log("Posting tasks");
    tasks.id=taskId;
    const response = await fetch(baseUrl + `/api/putTasks`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(tasks)
    })
    return await response.json();
}