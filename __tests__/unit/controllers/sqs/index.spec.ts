import checkIfQueueExists from "@controllers/sqs/checkIfQueueExists";
import createQueue from "@controllers/sqs/createQueue";
import getQueue from "@controllers/sqs/getQueue";
import getQueueAttributes from "@controllers/sqs/getQueueAttribute";
import { IGetAllQueueFun } from "@interfaces/controllers";
import getAllQueue from "@controllers/sqs/getAllQueue";
import associatesQueueWithLambda from "@controllers/sqs/associatesQueueWithLambda";
import clearEventSourcesFromLambda from "@controllers/sqs/clearEventSourcesFromLambda";

import {
  ICreateQueueFun,
  IQueueAttribute,
} from "@interfaces/controllers/index";
import { IEventSourceMappingConfiguration } from "@interfaces/controllers/sqs";
import deleteQueue from "@controllers/sqs/deleteQueue";

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

  it("should get queue attributes and delete queue", async () => {

    const queue: ICreateQueueFun = await createQueue("code100");


    const attributes: IQueueAttribute = await getQueueAttributes(queue.QueueUrl);

    expect(typeof attributes).toBe("object");
    expect(typeof attributes.ResponseMetadata).toBe("object");
    expect(typeof attributes.ResponseMetadata.RequestId).toBe("string");
    expect(typeof attributes.Attributes).toBe("object");
    expect(typeof attributes.Attributes.QueueArn).toBe("string");
    
    const response = await deleteQueue(attributes.Attributes.QueueArn, queue.QueueUrl, true);
    expect(typeof response.ResponseMetadata).toBe("object");
    expect(typeof response.ResponseMetadata.RequestId).toBe("string");
  });


  it("should get all queue from your default region.", async () => {
    const queueResponse: IGetAllQueueFun = await getAllQueue();
    
    expect(typeof queueResponse).toBe("object");
    expect(typeof queueResponse.ResponseMetadata).toBe("object");
    expect(typeof queueResponse.ResponseMetadata.RequestId).toBe("string");
    expect(typeof queueResponse.QueueUrls.length).toBe("number");
  });


  it("should associate SQS queue with a lambda function and remove.", async () => {
    
    const queue: ICreateQueueFun = await getQueue("code10");

    const lambdaName= 'load-contact-dev-lbd_load_contact';
    if (queue){
      const queueAttributes: IQueueAttribute = await getQueueAttributes(queue.QueueUrl);
      const response : IEventSourceMappingConfiguration = await associatesQueueWithLambda(
        queueAttributes.Attributes.QueueArn,
        lambdaName
      );
      
    
      expect(typeof response).toBe("object");
      expect(typeof response.UUID).toBe("string");
      expect(typeof response.EventSourceArn).toBe("string");

      const clearEventSourcesFromLambdaResponse = await clearEventSourcesFromLambda(lambdaName);
            
      expect(typeof clearEventSourcesFromLambdaResponse).toBe("object");
      expect(typeof clearEventSourcesFromLambdaResponse.length).toBe("number");
    }
  });
  

});
