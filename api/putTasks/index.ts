import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    const task = { "id": 1, "tasks": req.body }
    console.log(task);
    context.bindings.putTasks = JSON.stringify(task);
    context.done;
    const responseMessage = req.body;
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
};

export default httpTrigger;