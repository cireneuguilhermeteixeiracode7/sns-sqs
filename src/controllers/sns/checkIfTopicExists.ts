import AWS from "../../config/aws/config";
import { standartazeTopicName } from "../../utils/validators";

export default async function checkIfTopicExists(
  topicName: string
): Promise<boolean> {
  const sdTopicName: string = standartazeTopicName(topicName);

  return new Promise((resolve, reject) => {
    try {
      const listTopics = new AWS.SNS({ apiVersion: process.env.AWS_API_VERSION })
        .listTopics({})
        .promise();
      listTopics
        .then((data) => {          
          let found: boolean = false;
          data.Topics.forEach((topic) => {            
            if (standartazeTopicName(topic.TopicArn.split(":")[5]) === sdTopicName) {
              found = true;
            }
          });

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
