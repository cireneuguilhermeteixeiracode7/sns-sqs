import "dotenv/config";

import {
  getAllTopicsFun,
  createOrGetTopicFun,
  publishToTopicFun,
  getTopicAttributesFun,
  subscribeToTopicFun,
  createOrGetQueueFun,
  getQueueAttributesFun,
  getAllQueueFun,
} from "./controllers";

import { ICreateTopicFun, ICreateQueueFun, IGetAllQueueFun } from "./interfaces/controllers";
import {IGetAllTopicsReturn} from "./interfaces/controllers/sns";
export default class SnsSqsSlq {
  private test: boolean = false;
  constructor() {
    this.test = !this.test;
  }

  async getAllTopics(): Promise<IGetAllTopicsReturn> {
    return await getAllTopicsFun();
  }

  async getAllQueue(): Promise<IGetAllQueueFun> {
    return await getAllQueueFun();
  }


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
