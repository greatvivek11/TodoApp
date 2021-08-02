import { AzureFunction, Context, HttpRequest } from "@azure/functions";

const httpTrigger: AzureFunction = async function (context: Context, req: HttpRequest, getTasks: Document): Promise<void> {
    context.log('HTTP trigger function processed a request.');
    const output = {id:getTasks["id"],tasks:getTasks["tasks"]};
    const responseMessage = output
        ? output
        : "Tasks are empty";

    context.res = {
        // status: 200, /* Defaults to 200 */
        body: responseMessage
    };

};

export default httpTrigger;