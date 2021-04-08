import AWS from "../../config/aws/config";
// import { ICreateTopicReturn } from "@interfaces/controllers/sns";

export default async function clearEventSourcesFromLambda(lambdaName: string): Promise<any>  {

  
    try {

        var listPromiseDeleteEventSource = [];
        const listEventSource = await new AWS.Lambda()
        .listEventSourceMappings({
          FunctionName: lambdaName
        }).promise();


        listEventSource.EventSourceMappings.forEach(eventSource => {
          listPromiseDeleteEventSource.push(
            new AWS.Lambda().deleteEventSourceMapping({
              UUID: eventSource.UUID
            }).promise()
          );
        });

        return await Promise.all(listPromiseDeleteEventSource);
       
    } catch (e) {
      throw(e);
    }
  
};
