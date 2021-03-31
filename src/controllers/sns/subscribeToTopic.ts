import AWS from "../../config/aws/config";

export default (topicArn: string, queueArn: string, queueUrl: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    try {
      const subscribeToTopic = new AWS.SNS({ apiVersion: process.env.AWS_API_VERSION })
        .subscribe({
          TopicArn: topicArn,
          Protocol: "sqs",
          Endpoint: queueArn,
        })
        .promise();


      subscribeToTopic
        .then(data => {
          const queueAttributes = new AWS.SQS({ apiVersion: process.env.AWS_API_VERSION })
          .getQueueAttributes({
            QueueUrl: queueUrl,
            AttributeNames: ['All']
          }).promise();
          
          queueAttributes.then(attributes=>{
            var hasStatement = false;
            var statement = {
                Sid: `topic-subscription-${topicArn}`,
                Effect: "Allow",
                Principal: {
                  AWS: "*"
                },
                Action: "SQS:SendMessage",
                Resource: queueArn,
                Condition: {
                  ArnLike: {
                    "aws:SourceArn": topicArn
                  }
                }
            }

            var policy =  attributes.Attributes.Policy ? JSON.parse(attributes.Attributes.Policy) : null;
            if (policy && policy.Statement && policy.Statement.length> 0) {
                policy.Statement.forEach(statement => {
                    if(statement.Sid == `topic-subscription-${topicArn}`){
                        hasStatement = true;
                    }
                });
                if (!hasStatement){
                    policy.Statement.push(statement);
                }
      
            }else{
                policy = {
                    Version: '2008-10-17', //Foi testado com a versão global no .env e não funcionou
                    Id: `${queueArn}/SQSDefaultPolicy`,
                    Statement : [statement]
                } 
                policy.Statement = [statement]
            }

            const setQueueAttributesResponse = new AWS.SQS({ apiVersion: process.env.AWS_API_VERSION })
            .setQueueAttributes({
              QueueUrl: queueUrl,
              Attributes: {
                  "Policy": JSON.stringify(policy)
              },
            }).promise();

            setQueueAttributesResponse.then(()=>{
              resolve(data);
            })
          })
        })
        .catch((err) => {
           reject(err);
        });
    } catch (e) {
      reject(e);
    }
  });
};
