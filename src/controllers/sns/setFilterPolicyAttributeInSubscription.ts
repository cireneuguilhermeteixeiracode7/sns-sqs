import AWS from "../../config/aws/config";
import { IAttributeValue } from '../../interfaces/controllers/sns/index';

export default (SubscriptionArn: string, attributeValue: IAttributeValue): Promise<any> => {
  return new Promise((resolve, reject) => {
    try {
      const setFilterPolicyAttributeInSubscription = new AWS.SNS({ apiVersion: process.env.AWS_API_VERSION })
        .setSubscriptionAttributes({
          SubscriptionArn: SubscriptionArn,
          AttributeName: 'FilterPolicy',
          AttributeValue: JSON.stringify(attributeValue)
        })
        .promise();

        setFilterPolicyAttributeInSubscription
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
};
