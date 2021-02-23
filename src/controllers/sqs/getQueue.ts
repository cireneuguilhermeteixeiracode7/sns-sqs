import AWS from "../../config/aws/config";
import { IGetQueueReturn } from "../../interfaces/controllers/sqs";
import { standartazeQueueName } from "../../utils/validators/index";

export default async function getQueue(
  queueName: string
): Promise<IGetQueueReturn> {
  const sdQueueName: string = standartazeQueueName(queueName);

  return new Promise((resolve, reject) => {
    try {
      const listQueues = new AWS.SQS({ apiVersion: "2012-11-05" })
        .listQueues({})
        .promise();

      listQueues
        .then((data) => {
          let queueResponse: {
            ResponseMetadata: { RequestId: string };
            QueueUrl?: string;
          } = { ResponseMetadata: { RequestId: "" } };
          if (
            data.QueueUrls &&
            typeof data.QueueUrls === "object" &&
            data.QueueUrls.length > 0
          ) {
            data.QueueUrls.forEach((queue) => {
              if (queue.split("/")[4] === sdQueueName) {
                queueResponse.QueueUrl = queue;
              }
            });
          }

          if (!queueResponse.QueueUrl) {
            resolve(undefined);
          } else {
            queueResponse.ResponseMetadata.RequestId =
              data.ResponseMetadata.RequestId;

            resolve(queueResponse);
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
