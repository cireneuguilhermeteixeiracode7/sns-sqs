import checkIfTopicExists from "./sns/checkIfTopicExists";
import createTopic from "./sns/createTopic";
import publishToTopic from "./sns/publishToTopic";
import getAllTopics from "./sns/getAllTopics";
import getTopic from "./sns/getTopic";
import getTopicAttribute from "./sns/getTopicAttributes";
import subscribeToTopic from "./sns/subscribeToTopic";
import setFilterPolicyAttributeInSubscription from "./sns/setFilterPolicyAttributeInSubscription";
import getSubscriptionsInTopic from "./sns/getSubscriptionsInTopic";

import createQueue from "./sqs/createQueue";
import checkIfQueueExists from "./sqs/checkIfQueueExists";
import getQueue from "./sqs/getQueue";
import getAllQueue from "./sqs/getAllQueue";
import getQueueAttribute from "./sqs/getQueueAttribute";

import {
  standartazeTopicName,
  standartazeQueueName,
} from "../utils/validators";
import { error } from "../utils/logger/logger";

import { ICreateTopicFun, ICreateQueueFun } from "../interfaces/controllers";

// SNS
export async function createOrGetTopicFun(
  topicName: string
): Promise<ICreateTopicFun> {
  try {
    const sdTopicName: string = standartazeTopicName(topicName);
    const ifTopicExists: boolean = await checkIfTopicExists(sdTopicName);

    if (!ifTopicExists) {
      const newTopic: {
        ResponseMetadata: { RequestId: string };
        TopicArn: string;
        TopicName?: string;
      } = await createTopic(sdTopicName);

      newTopic.TopicName = sdTopicName;

      return newTopic;
    } else {
      return getTopic(sdTopicName);
    }
  } catch (err) {
    error(err);
    throw err;
  }
}

export async function publishToTopicFun(
  topicName: string,
  message: string,
  messageGroupId: string,
  messageDeduplicationId: string,
  topicArn: string,
  MessageAttributes?: object
): Promise<any> {
  try {
    const ifTopicExists: boolean = await checkIfTopicExists(topicName);

    if (ifTopicExists) {
      const publishedMessage = await publishToTopic(
        message,
        topicArn,
        messageGroupId,
        messageDeduplicationId,
        MessageAttributes
      );
      return publishedMessage;
    }else{
      throw("Topic does not exist in that region.")
    }
  } catch (err) {
    error(err);
    throw err;
  }
}


export async function getAllTopicsFun(): Promise<any> {
  try {
    return getAllTopics();
  } catch (err) {
    error(err);
    throw err;
  }
}


export async function getTopicAttributesFun(topicArn: string): Promise<any> {
  try {
    const ifTopicExists: boolean = await checkIfTopicExists(
      topicArn.split(":")[5]
    );

    if (ifTopicExists) {
      return getTopicAttribute(topicArn);
    } else {
      throw("Topic does not exist in that region.")
    }
  } catch (err) {
    error(err);
    throw err;
  }
}

export async function subscribeToTopicFun(
  topicArn: string,
  queueArn: string,
  queueUrl: string
): Promise<any> {
  try {
    const ifTopicExists: boolean = await checkIfTopicExists(
      topicArn.split(":")[5]
    );

    if (ifTopicExists) {
      return subscribeToTopic(topicArn, queueArn, queueUrl);
    }else{
      throw("Topic does not exist in that region.");
    }
  } catch (err) {
    error(err);
    throw err;
  }
}


export async function setFilterPolicyAttributeInSubscriptionFun(SubscriptionArn: string, attributeValue: string): Promise<any> {
  try {
    return setFilterPolicyAttributeInSubscription(SubscriptionArn, attributeValue);
  } catch (err) {
    error(err);
    throw err;
  }
}

export async function getSubscriptionsInTopicFun(topicArn: string) {
  try {
    return getSubscriptionsInTopic(topicArn);
  } catch (err) {
    error(err);
    throw err;
  }
}

// SQS

export async function getAllQueueFun(): Promise<any> {
  try {
    return getAllQueue();
  } catch (err) {
    error(err);
    throw err;
  }
}


export async function createOrGetQueueFun(
  queueName: string
): Promise<ICreateQueueFun> {
  try {
    const sdQueueName: string = standartazeQueueName(queueName);
    const ifQueueExists: boolean = await checkIfQueueExists(sdQueueName);

    if (!ifQueueExists) {
      const newQueue: {
        ResponseMetadata: {
          RequestId: string;
        };
        QueueUrl: string;
      } = await createQueue(sdQueueName);

      return newQueue;
    } else {
      const queue = await getQueue(sdQueueName);

      return queue;
    }
  } catch (err) {
    error(err);
    throw err;
  }
}

export async function getQueueAttributesFun(queueUrl: string): Promise<any> {
  try {
    const ifQueueExists: boolean = await checkIfQueueExists(
      queueUrl.split("/")[4]
    );

    if (ifQueueExists) {
      return getQueueAttribute(queueUrl);
    }else {
      throw("Queue does not exist in that region.")
    }
  } catch (err) {
    error(err);
    throw err;
  }
}
