import AWS from "../../config/aws/config";
import { IGetAllQueueFun } from '../../interfaces/controllers';

export default async function getAllQueue(): Promise<IGetAllQueueFun> {
  return new Promise((resolve, reject) => {
    try {
      const listQueues = new AWS.SQS({ apiVersion: process.env.AWS_API_VERSION })
        .listQueues({})
        .promise();

      listQueues
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
