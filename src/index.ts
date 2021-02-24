import "dotenv/config";

import {
  createOrGetTopicFun,
  publishToTopicFun,
  getTopicAttributesFun,
  subscribeToTopicFun,
  createOrGetQueueFun,
  getQueueAttributesFun,
} from "./controllers";

import { ICreateTopicFun, ICreateQueueFun } from "./interfaces/controllers";

export default class SnsSqsSlq {
  async createOrGetTopic(topicName: string): Promise<ICreateTopicFun> {
    return await createOrGetTopicFun(topicName);
  }

  async createOrGetQueue(queueNane: string): Promise<ICreateQueueFun> {
    return await createOrGetQueueFun(queueNane);
  }

  async publishToTopic(
    topicName: string,
    message: string,
    messageGroupId: string,
    messageDeduplicationId: string,
    topicArn: string
  ) {
    return await publishToTopicFun(
      topicName,
      message,
      messageGroupId,
      messageDeduplicationId,
      topicArn
    );
  }

  async getTopicAttributes(topicArn: string): Promise<any> {
    return await getTopicAttributesFun(topicArn);
  }

  async getQueueAttributes(queueUrl: string): Promise<any> {
    return await getQueueAttributesFun(queueUrl);
  }

  async subscribeToTopic(topicArn: string, queueArn: string): Promise<any> {
    return await subscribeToTopicFun(topicArn, queueArn);
  }
}
