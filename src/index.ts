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

const snsSqnSlq = new SnsSqsSlq();

async function funcCreateTopic() {
  const newQueue: any = await snsSqnSlq.createOrGetQueue("code8");

  const queueAttribute = await snsSqnSlq.getQueueAttributes(newQueue.QueueUrl);

  const newTopic: ICreateTopicFun = await snsSqnSlq.createOrGetTopic("code8");

  console.log("queueAttributes:", queueAttribute);

  console.log("newTopic:", newTopic);

  const newSubscription = await snsSqnSlq.subscribeToTopic(
    newTopic.TopicArn,
    queueAttribute.Attributes.QueueArn
  );

  const newPublishMessage = await snsSqnSlq.publishToTopic(
    newTopic.TopicArn.split(":")[5],
    "Code8 Test Message",
    "tested",
    "resd",
    newTopic.TopicArn
  );

  console.log("newPublishMessage:", newPublishMessage);

  console.log("newSubscription:", newSubscription);
}

// funcCreateTopic();
