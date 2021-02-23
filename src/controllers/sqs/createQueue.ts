import AWS from "../../config/aws/config";
import { standartazeQueueName } from "../../utils/validators";

export default (queueName: string): Promise<any> => {
  const sdQueueName: string = standartazeQueueName(queueName);

  return new Promise((resolve, reject) => {
    try {
      const createQueue = new AWS.SQS({ apiVersion: "2012-11-05" })
        .createQueue({
          QueueName: sdQueueName,
          Attributes: {
            FifoQueue: "true",
          },
        })
        .promise();

      createQueue
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
