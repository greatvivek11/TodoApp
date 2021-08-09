import { AzureFunction, Context, HttpRequest } from "@azure/functions"

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    const tasks = req.body;
    console.log(tasks);
    context.bindings.putTasks = JSON.stringify(tasks);
    context.done;
    const responseMessage = tasks;
    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };
};

export default httpTrigger;