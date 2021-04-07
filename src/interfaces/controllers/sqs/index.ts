export interface IQueueAttributes {
  ResponseMetadata: { RequestId: string };
  Attributes: { QueueArn: string };
}

export interface IGetQueueReturn {
  ResponseMetadata: { RequestId: string };
  QueueUrl?: string;
}

export interface IEventSourceMappingConfiguration {
  UUID: string;
  EventSourceArn: string;
  FunctionArn: string;
}