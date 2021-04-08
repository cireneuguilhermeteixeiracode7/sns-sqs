import AWS from "../../config/aws/config";
// import { ICreateTopicReturn } from "@interfaces/controllers/sns";

export default async function deleteQueue(queueArn: string, queueUrl: string, deleteSubscriptions: boolean): Promise<any>  {

  
  
    try {
      
        const deleteQueue = await new AWS.SQS({ apiVersion: process.env.AWS_API_VERSION })
        .deleteQueue({
          QueueUrl: queueUrl,
        })
        .promise();
        
              
        if (deleteSubscriptions){

          var listSubscriptions = [];
          var nextToken = null;
          do{            
            const subscriptionResponse = await new AWS.SNS().listSubscriptions({NextToken: nextToken}).promise();
            nextToken = subscriptionResponse.NextToken;
            listSubscriptions = listSubscriptions.concat(subscriptionResponse.Subscriptions);

          }while(nextToken);
          
          
          const subscriptions = listSubscriptions.filter(subscription=> subscription.Endpoint == queueArn)


          var unsubscriptions = [];
          
          subscriptions.forEach(subscription => {
            unsubscriptions.push(
              new AWS.SNS().unsubscribe({
                SubscriptionArn: subscription.SubscriptionArn
              }).promise()
            )
          });

          unsubscriptions = await Promise.all(unsubscriptions);          
  
        }
        return deleteQueue;


       
    } catch (e) {
      throw(e);
    }
  
};
