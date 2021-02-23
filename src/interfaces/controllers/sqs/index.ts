export interface IQueueAttributes {
  ResponseMetadata: { RequestId: string };
  Attributes: { QueueArn: string };
}

export interface IGetQueueReturn {
  ResponseMetadata: { RequestId: string };
  QueueUrl?: string;
}
