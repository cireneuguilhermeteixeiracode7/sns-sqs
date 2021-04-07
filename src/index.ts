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
  associatesQueueWithLambdaFun,
  setFilterPolicyAttributeInSubscriptionFun,
  getSubscriptionsInTopicFun,
  deleteTopicFun,
  deleteQueueFun,
  clearEventSourcesFromLambdaFun,
  deleteSubscriptionFun
} from "./controllers";
import { ICreateTopicFun, ICreateQueueFun, IGetAllQueueFun } from "./interfaces/controllers";
import {IGetAllTopicsReturn} from "./interfaces/controllers/sns";
import { IEventSourceMappingConfiguration } from "./interfaces/controllers/sqs";
import { IGetSubscriptionsInTopic, IAttributeValue, IMessageAttributes } from "./interfaces/controllers/sns/index";

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

  async createOrGetQueue(queueName: string): Promise<ICreateQueueFun> {
    return await createOrGetQueueFun(queueName);
  }

  async subscribeToTopic(
    topicArn: string,
    queueArn: string,
    queueUrl: string
  ): Promise<any> {
    return await subscribeToTopicFun(topicArn, queueArn, queueUrl);
  }

  async publishToTopic(
    topicName: string,
    message: string,
    messageGroupId: string,
    messageDeduplicationId: string,
    topicArn: string,
    MessageAttributes?: IMessageAttributes
  ) {
    return await publishToTopicFun(
      topicName,
      message,
      messageGroupId,
      messageDeduplicationId,
      topicArn,
      MessageAttributes
    );
  }

  async getTopicAttributes(topicArn: string): Promise<any> {
    return await getTopicAttributesFun(topicArn);
  }

  async getQueueAttributes(queueUrl: string): Promise<any> {
    return await getQueueAttributesFun(queueUrl);
  }

  async getSubscriptionsInTopic(topicArn: string): Promise<IGetSubscriptionsInTopic> {
    return await getSubscriptionsInTopicFun(topicArn);
  }

  async setFilterPolicyAttributeInSubscription(
    SubscriptionArn: string,
    attributeValue: IAttributeValue
  ): Promise<any> {
    return await setFilterPolicyAttributeInSubscriptionFun(
      SubscriptionArn,
      attributeValue
    );
  }

  async associatesQueueWithLambda(eventSourceArn: string, functionName: string):Promise<IEventSourceMappingConfiguration>{
    return await associatesQueueWithLambdaFun (eventSourceArn, functionName);
  }

  async deleteTopic(topicArn: string, deleteSubscriptions: boolean):Promise<any>{
    return await deleteTopicFun(topicArn, deleteSubscriptions);
  }


  async deleteQueue(queueArn: string, queueUrl: string, deleteSubscriptions: boolean):Promise<any>{
    return await deleteQueueFun(queueArn, queueUrl, deleteSubscriptions);
  }

  async deleteSubscription(subscriptionArn: string):Promise<any>{
    return await deleteSubscriptionFun(subscriptionArn);
  }

  async clearEventSourcesFromLambda(lambdaName: string):Promise<any>{
    return await clearEventSourcesFromLambdaFun(lambdaName);
  }
}
