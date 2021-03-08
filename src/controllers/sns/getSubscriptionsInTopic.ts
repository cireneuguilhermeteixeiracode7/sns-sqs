import AWS from "../../config/aws/config";
import { IGetSubscriptionsInTopic } from "../../interfaces/controllers/sns/index";



export default (topicArn: string): Promise<IGetSubscriptionsInTopic> => {
  return new Promise((resolve, reject) => {
    try {
      const listSubscriptions = new AWS.SNS({ apiVersion: process.env.AWS_API_VERSION })
        .listSubscriptionsByTopic({
          TopicArn: topicArn
        })
        .promise();

        listSubscriptions
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
