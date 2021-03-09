import AWS from "../../config/aws/config";
import { IGetAllTopicsReturn } from "../../interfaces/controllers/sns";

export default function getAllTopics(): Promise<IGetAllTopicsReturn> {

  return new Promise((resolve, reject) => {
    try {
      const listTopics = new AWS.SNS({ apiVersion: process.env.AWS_API_VERSION })
        .listTopics({})
        .promise();

      listTopics
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
