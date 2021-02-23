import checkIfTopicExists from "./sns/checkIfTopicExists";
import createTopic from "./sns/createTopic";
import publishToTopic from "./sns/publishToTopic";
import getTopic from "./sns/getTopic";
import getTopicAttribute from "./sns/getTopicAttributes";
import subscribeToTopic from "./sns/subscribeToTopic";

import createQueue from "./sqs/createQueue";
import checkIfQueueExists from "./sqs/checkIfQueueExists";
import getQueue from "./sqs/getQueue";
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
  topicArn: string
): Promise<any> {
  try {
    const sdTopicName: string = standartazeTopicName(topicName);
    const ifTopicExists: boolean = await checkIfTopicExists(sdTopicName);

    if (ifTopicExists) {
      const publishedMessage = await publishToTopic(
        message,
        topicArn,
        messageGroupId,
        messageDeduplicationId
      );
      return publishedMessage;
    }
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
    }
  } catch (err) {
    error(err);
    throw err;
  }
}

export async function subscribeToTopicFun(
  topicArn: string,
  queueArn: string
): Promise<any> {
  try {
    const ifTopicExists: boolean = await checkIfTopicExists(
      topicArn.split(":")[5]
    );

    if (ifTopicExists) {
      return subscribeToTopic(topicArn, queueArn);
    }
  } catch (err) {
    error(err);
    throw err;
  }
}

// SQS
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
    }
  } catch (err) {
    error(err);
    throw err;
  }
}
