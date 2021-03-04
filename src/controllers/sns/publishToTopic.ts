import AWS from "../../config/aws/config";

export default async function publish(
  message: string,
  topicArn: string,
  messageGroupId: string,
  messageDeduplicationId: string
): Promise<any> {
  return new Promise((resolve, reject) => {
    try {
      const params = {
        Message: message,
        TopicArn: topicArn,
        MessageGroupId: messageGroupId,
        MessageDeduplicationId: messageDeduplicationId,
      };

      const publishTopic = new AWS.SNS({ apiVersion: process.env.AWS_API_VERSION })
        .publish(params)
        .promise();

      publishTopic
        .then((data) => {
          resolve(data);
        })
        .catch((err) => {
          throw err;
        });
    } catch (e) {
      reject(e);
    }
  });
}
