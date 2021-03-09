import AWS from "../../config/aws/config";
// import { IGetAttributesReturn } from "@interfaces/controllers/sns";

export default function getTopicAttributes(topicArn: string): Promise<any> {
  return new Promise((resolve, reject) => {
    try {
      const topicAttributes = new AWS.SNS({
        apiVersion: process.env.AWS_API_VERSION,
      })
        .getTopicAttributes({ TopicArn: topicArn })
        .promise();

      topicAttributes
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
