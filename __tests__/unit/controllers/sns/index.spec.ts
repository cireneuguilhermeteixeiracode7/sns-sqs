import checkIfTopicExists from "@controllers/sns/checkIfTopicExists";
import createTopic from "@controllers/sns/createTopic";
import getTopic from "@controllers/sns/getTopic";
import getAllTopics from "@controllers/sns/getAllTopics";
import getTopicAttributes from "@controllers/sns/getTopicAttributes";
import publishToTopic from "@controllers/sns/publishToTopic";
import subscribeToTopic from "@controllers/sns/subscribeToTopic";

import getQueue from "@controllers/sqs/getQueue";
import getAllQueue from "@controllers/sqs/getAllQueue";
import getQueueAttributes from "@controllers/sqs/getQueueAttribute";

import {
  ICreateTopicReturn,
  IGetTopicReturn,
  IGetTopicAttributesReturn,
  ISubscribeReturn,
  IPublishReturn,
  IGetAllTopicsReturn,
} from "@interfaces/controllers/sns";

import { IGetQueueReturn } from "@interfaces/controllers/sqs";

describe("SNS tests", () => {
  it("should check if topic exists", async () => {
    const ifTopicExists: boolean = await checkIfTopicExists("code8");

    expect(typeof ifTopicExists).toBe("boolean");
  });


  it("should get all topics from your default region.", async () => {
    const topicsResponse: IGetAllTopicsReturn = await getAllTopics();
    
    expect(typeof topicsResponse).toBe("object");
    expect(typeof topicsResponse.ResponseMetadata).toBe("object");
    expect(typeof topicsResponse.ResponseMetadata.RequestId).toBe("string");
    expect(typeof topicsResponse.Topics.length).toBe("number");
  });

  it("should create a topic", async () => {
    const topic: ICreateTopicReturn = await createTopic("code8");

    expect(typeof topic).toBe("object");
    expect(typeof topic.ResponseMetadata).toBe("object");
    expect(typeof topic.ResponseMetadata.RequestId).toBe("string");
    expect(typeof topic.TopicArn).toBe("string");
  });

  it("should get a topic", async () => {
    const topic: IGetTopicReturn | undefined = await getTopic("code8");

    if (topic) {
      expect(typeof topic).toBe("object");
      expect(typeof topic.TopicArn).toBe("string");
    } else {
      expect(typeof topic).toBe("undefined");
    }
  });

  it("should get topic attributes", async () => {
    const topic: IGetTopicReturn | undefined = await getTopic("code8");

    if (topic) {
      const attributes: IGetTopicAttributesReturn = await getTopicAttributes(
        topic.TopicArn
      );
      expect(typeof attributes).toBe("object");
      expect(typeof attributes.ResponseMetadata).toBe("object");
      expect(typeof attributes.ResponseMetadata.RequestId).toBe("string");
      expect(typeof attributes.Attributes).toBe("object");
      expect(typeof attributes.Attributes.ContentBasedDeduplication).toBe(
        "string"
      );
      expect(typeof attributes.Attributes.DisplayName).toBe("string");
      expect(typeof attributes.Attributes.EffectiveDeliveryPolicy).toBe(
        "string"
      );
      expect(typeof attributes.Attributes.FifoTopic).toBe("string");
      expect(typeof attributes.Attributes.Owner).toBe("string");
      expect(typeof attributes.Attributes.Policy).toBe("string");
      expect(typeof attributes.Attributes.SubscriptionsConfirmed).toBe(
        "string"
      );
      expect(typeof attributes.Attributes.SubscriptionsDeleted).toBe("string");
      expect(typeof attributes.Attributes.SubscriptionsPending).toBe("string");
      expect(typeof attributes.Attributes.TopicArn).toBe("string");
    }
  });

  it("should subscribe to topic", async () => {
    const topic: IGetTopicReturn = await getTopic("code8");
    const queue: IGetQueueReturn = await getQueue("code10");

    if (topic && queue) {
      const topicAttributes: IGetTopicAttributesReturn = await getTopicAttributes(
        topic.TopicArn
      );

      const queueAttributes: any = await getQueueAttributes(queue.QueueUrl);

      if (topicAttributes) {
        const subscription: ISubscribeReturn = await subscribeToTopic(
          topicAttributes.Attributes.TopicArn,
          queueAttributes.Attributes.QueueArn
        );

        expect(typeof subscription).toBe("object");
        expect(typeof subscription.ResponseMetadata).toBe("object");
        expect(typeof subscription.ResponseMetadata.RequestId).toBe("string");
        expect(typeof subscription.SubscriptionArn).toBe("string");
      }
    }
  });

  it("should publish to topic", async () => {
    const topic: IGetTopicReturn = await getTopic("code8");

    if (topic) {
      const publishment: IPublishReturn = await publishToTopic(
        "Message test",
        topic.TopicArn,
        "test",
        "test"
      );
      expect(typeof publishment).toBe("object");
      expect(typeof publishment.MessageId).toBe("string");
      expect(typeof publishment.SequenceNumber).toBe("string");
      expect(typeof publishment.ResponseMetadata).toBe("object");
      expect(typeof publishment.ResponseMetadata.RequestId).toBe("string");
    }
  });
});
