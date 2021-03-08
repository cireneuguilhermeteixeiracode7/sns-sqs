import AWS from "../../config/aws/config";

export default (topicArn: string, queueArn: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    try {
      const subscribeToTopic = new AWS.SNS({ apiVersion: process.env.AWS_API_VERSION })
        .subscribe({
          TopicArn: topicArn,
          Protocol: "sqs",
          Endpoint: queueArn,
        })
        .promise();

      subscribeToTopic
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
