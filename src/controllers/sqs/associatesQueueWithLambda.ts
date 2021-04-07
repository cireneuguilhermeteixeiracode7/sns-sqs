import AWS from "../../config/aws/config";
import { IEventSourceMappingConfiguration } from "../../interfaces/controllers/sqs";

export default async function associatesQueueWithLambda(eventSourceArn: string, functionName: string): Promise<IEventSourceMappingConfiguration> {

  
  return new Promise((resolve, reject) => {
    try {
      
      var hasAssociation = false;
      var createEventSourceMapping = null;
      const listEventSource = new AWS.Lambda()
        .listEventSourceMappings({
          FunctionName: functionName
        }).promise();


      listEventSource
        .then((listEventSourceResponse) => {
            
            listEventSourceResponse.EventSourceMappings.forEach(eventSource => {
              if (eventSource.EventSourceArn == eventSourceArn){
                hasAssociation = true;
                createEventSourceMapping = eventSource;
              }
            });
            if(!hasAssociation){
              createEventSourceMapping = new AWS.Lambda()
              .createEventSourceMapping({
                EventSourceArn: eventSourceArn,
                FunctionName: functionName
              }).promise();
            }
            return createEventSourceMapping;
        })
        
        .then((data) => {
            resolve(data);
          })
          .catch((err) => {
            reject(err);
          });
      
    } catch (e) {
      reject(e);
    }
  });
};