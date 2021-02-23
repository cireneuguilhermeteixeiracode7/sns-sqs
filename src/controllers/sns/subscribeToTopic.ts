import { standartazeTopicName } from "../../utils/validators";
import AWS from "../../config/aws/config";

export default (topicArn: string, queueArn: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    try {
      const subscribeToTopic = new AWS.SNS({ apiVersion: "2010-03-31" })
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
          throw err;
        });
    } catch (e) {
      reject(e);
    }
  });
};
