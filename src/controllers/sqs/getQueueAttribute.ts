import AWS from "../../config/aws/config";

export default function getQueueAttributes(queueUrl: string): Promise<any> {
  return new Promise((resolve, reject) => {
    try {
      const queueAttributes = new AWS.SQS({
        apiVersion: "2012-11-05",
      })
        .getQueueAttributes({
          QueueUrl: queueUrl,
          AttributeNames: ["QueueArn"],
        })
        .promise();

      queueAttributes
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
