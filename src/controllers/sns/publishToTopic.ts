import AWS from "../../config/aws/config";
import { IMessageAttributes } from '../../interfaces/controllers/sns/index';


export default async function publish(
  message: string,
  topicArn: string,
  messageGroupId: string,
  messageDeduplicationId: string,
  MessageAttributes?:IMessageAttributes
): Promise<any> {
  return new Promise((resolve, reject) => {
    try {
      const params = {
        Message: message,
        TopicArn: topicArn,
        MessageGroupId: messageGroupId,
        MessageDeduplicationId: messageDeduplicationId,
        MessageAttributes: MessageAttributes
      };

      const publishTopic = new AWS.SNS({ apiVersion: process.env.AWS_API_VERSION })
        .publish(params)
        .promise();

      publishTopic
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
}
