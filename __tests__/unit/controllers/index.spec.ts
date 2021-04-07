describe("Controllers test", () => {
  it("fake test", () => {
    expect(true).toBeTruthy();
  });



  // it("should create or get a queue", async () => {
  //   const queue: ICreateQueueFun = await createOrGetQueueFun("code3");
  //   expect(typeof queue).toBe("object");
  //   expect(typeof queue.ResponseMetadata).toBe("object");
  //   expect(typeof queue.ResponseMetadata.RequestId).toBe("string");
  //   expect(typeof queue.QueueUrl).toBe("string");
  // });
  // it("should get a queue attributes", async () => {
  //   const attributes: IQueueAttributes = await getQueueAttributesFun(
  //     "https://sqs.us-east-1.amazonaws.com/303732912389/code3.fifo"
  //   );
  //   expect(typeof attributes).toBe("object");
  //   expect(typeof attributes.ResponseMetadata).toBe("object");
  //   expect(typeof attributes.ResponseMetadata.RequestId).toBe("string");
  //   expect(typeof attributes.Attributes).toBe("object");
  //   expect(typeof attributes.Attributes.QueueArn).toBe("string");
  // });
});
