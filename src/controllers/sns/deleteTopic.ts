import AWS from "../../config/aws/config";

export default async function deleteTopic(topicArn: string, deleteSubscriptions: boolean): Promise<any>  {

  
    try {
      
              
        if (deleteSubscriptions){

          var listSubscriptions = [];
          var nextToken = null;
          do{            
            const subscriptionResponse = await new AWS.SNS().listSubscriptionsByTopic(
              {
                TopicArn: topicArn,
                NextToken: nextToken
              }).promise();
            nextToken = subscriptionResponse.NextToken;
            listSubscriptions = listSubscriptions.concat(subscriptionResponse.Subscriptions);

          }while(nextToken);
          
        

          var unsubscriptions = [];
          
          listSubscriptions.forEach(subscription => {
            unsubscriptions.push(
              new AWS.SNS().unsubscribe({
                SubscriptionArn: subscription.SubscriptionArn
              }).promise()
            )
          });

          unsubscriptions = await Promise.all(unsubscriptions);
        
        }

        const deleteTopic = await new AWS.SNS({ apiVersion: process.env.AWS_API_VERSION })
        .deleteTopic({
          TopicArn: topicArn,
        })
        .promise();

        
        return deleteTopic;


       
    } catch (e) {
      throw(e);
    }
  
};