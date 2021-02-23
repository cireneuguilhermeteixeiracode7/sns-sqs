import AWS from "../../config/aws/config";
import { standartazeQueueName } from "../../utils/validators";

export default async function checkIfQueueExists(
  queueName: string
): Promise<boolean> {
  const sdQueueName: string = standartazeQueueName(queueName);

  return new Promise((resolve, reject) => {
    try {
      const listQueues = new AWS.SQS({ apiVersion: "2012-11-05" })
        .listQueues({})
        .promise();

      listQueues
        .then((data) => {
          let found: boolean = false;
          if (data.QueueUrls) {
            data.QueueUrls.forEach((queue) => {
              if (queue.split("/")[4] === sdQueueName) {
                found = true;
              }
            });
          }

          if (found) {
            resolve(true);
          } else {
            resolve(false);
          }
        })
        .catch((err) => {
          throw err;
        });
    } catch (e) {
      reject(e);
    }
  });
}
