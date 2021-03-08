import checkIfQueueExists from "@controllers/sqs/checkIfQueueExists";
import createQueue from "@controllers/sqs/createQueue";
import getQueue from "@controllers/sqs/getQueue";
import getQueueAttributes from "@controllers/sqs/getQueueAttribute";

import {
  ICreateQueueFun,
  IQueueAttribute,
} from "@interfaces/controllers/index";

import { IGetQueueReturn } from "@interfaces/controllers/sqs";

describe("SQS tests", () => {
  it("should check if queue exists", async () => {
    const ifQueueExists: boolean = await checkIfQueueExists("code8");

    expect(typeof ifQueueExists).toBe("boolean");
  });

  it("should create a queue", async () => {
    const queue: ICreateQueueFun = await createQueue("code10");

    expect(typeof queue).toBe("object");
    expect(typeof queue.ResponseMetadata).toBe("object");
    expect(typeof queue.ResponseMetadata.RequestId).toBe("string");
    expect(typeof queue.QueueUrl).toBe("string");
  });

  it("should get a queue", async () => {
    const queue: ICreateQueueFun = await getQueue("code11");

    if (queue) {
      expect(typeof queue).toBe("object");
      expect(typeof queue.ResponseMetadata).toBe("object");
      expect(typeof queue.ResponseMetadata.RequestId).toBe("string");
      expect(typeof queue.QueueUrl).toBe("string");
    } else {
      expect(typeof queue).toBe("undefined");
    }
  });

  it("should get queue attributes", async () => {

    const queue: ICreateQueueFun = await getQueue("code10");

    const attributes: IQueueAttribute = await getQueueAttributes(queue.QueueUrl);

    expect(typeof attributes).toBe("object");
    expect(typeof attributes.ResponseMetadata).toBe("object");
    expect(typeof attributes.ResponseMetadata.RequestId).toBe("string");
    expect(typeof attributes.Attributes).toBe("object");
    expect(typeof attributes.Attributes.QueueArn).toBe("string");
  });
});
