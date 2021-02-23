import AWS from "../../config/aws/config";
import { IGetAttributesReturn } from "@interfaces/controllers/sns";

export default function getTopicAttributes(
  topicArn: string
): Promise<IGetAttributesReturn> {
  return new Promise((resolve, reject) => {
    try {
      const topicAttributes = new AWS.SNS({
        apiVersion: "2010-03-31",
      })
        .getTopicAttributes({ TopicArn: topicArn })
        .promise();

      topicAttributes
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
