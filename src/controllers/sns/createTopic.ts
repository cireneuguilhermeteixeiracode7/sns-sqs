import AWS from "../../config/aws/config";
import { standartazeTopicName } from "../../utils/validators";
import { ICreateTopicReturn } from "@interfaces/controllers/sns";

export default (topicName: string): Promise<ICreateTopicReturn> => {
  const sdTopicName: string = standartazeTopicName(topicName);

  return new Promise((resolve, reject) => {
    try {
      const createTopic = new AWS.SNS({ apiVersion: "2010-03-31" })
        .createTopic({
          Name: sdTopicName,
          Attributes: {
            FifoTopic: "true",
          },
        })
        .promise();
      createTopic
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
