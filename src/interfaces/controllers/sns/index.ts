export interface ICreateTopicReturn {
  ResponseMetadata: { RequestId: string };
  TopicArn: string;
}

export interface IGetAllTopicsReturn {
  ResponseMetadata: { RequestId: string };
  Topics: Array<IGetTopicReturn>;
}

export interface IAttributeValue {
  [key: string]: Array<any>;
}



export interface IMessageAttributes {
  [key: string]: IMessageAttributeValue
}

export interface IMessageAttributeValue {
    DataType: string;
    StringValue: string;
}


export interface ISubscription {
  Endpoint: string;
  Owner: string;
  Protocol: string;
  SubscriptionArn: string;
  TopicArn: string;
}

export interface IGetSubscriptionsInTopic {
  ResponseMetadata: { RequestId: string };
  Subscriptions: Array<ISubscription>;
}



export interface IGetTopicReturn {
  TopicArn: string;
}

export interface IGetTopicAttributesReturn {
  ResponseMetadata: { RequestId: string };
  Attributes: {
    Policy: string;
    Owner: string;
    SubscriptionsPending: string;
    TopicArn: string;
    EffectiveDeliveryPolicy: string;
    SubscriptionsConfirmed: string;
    FifoTopic: string;
    DisplayName: string;
    ContentBasedDeduplication: string;
    SubscriptionsDeleted: string;
  };
}

export interface IGetQueueAttributes {
  ResponseMetadata: { RequestId: string };
  Attributes: { QueueArn: string };
}

export interface ISubscribeReturn {
  ResponseMetadata: { RequestId: string };
  SubscriptionArn: string;
}
export interface IPublishReturn {
  ResponseMetadata: { RequestId: string };
  MessageId: string;
  SequenceNumber: string;
}
