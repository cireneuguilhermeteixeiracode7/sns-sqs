import AWS from "../../config/aws/config";

export default (SubscriptionArn: string, attributeValue: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    try {
      const setFilterPolicyAttributeInSubscription = new AWS.SNS({ apiVersion: process.env.AWS_API_VERSION })
        .setSubscriptionAttributes({
          SubscriptionArn: SubscriptionArn,
          AttributeName: 'FilterPolicy',
          AttributeValue: attributeValue
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
