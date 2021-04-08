import AWS from "../../config/aws/config";
// import { ICreateTopicReturn } from "@interfaces/controllers/sns";

export default async function deleteSubscription(subscriptionArn: string): Promise<any>  {

  
    try {
                    
        const subscriptionDeleted = await new AWS.SNS().unsubscribe({
          SubscriptionArn: subscriptionArn
        }).promise()
        
        return subscriptionDeleted;
       
    } catch (e) {
      throw(e);
    }
  
};
