export interface ICreateTopicFun {
  ResponseMetadata?: { RequestId: string };
  TopicArn: string;
  TopicName?: string;
}


export interface IGetAllQueueFun {
  ResponseMetadata: {
    RequestId: string;
  };
  QueueUrls?: Array<string>;
}

export interface ICreateQueueFun {
  ResponseMetadata: {
    RequestId: string;
  };
  QueueUrl?: string;
}

export interface IQueueAttribute {
  ResponseMetadata: { RequestId: string };
  Attributes: { QueueArn: string };
}

export interface IPublishedMessage {
  ResponseMetadata: { RequestId: string };
  MessageId: string;
  SequenceNumber: string;
}
