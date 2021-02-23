import slugify from "slugify";

export function standartazeTopicName(topicName: string): string {
  let sdTopicName: string = slugify(topicName, {
    replacement: "-",
    lower: true,
    remove: /[!@#$%*()`{}^~|,ºª:;<>?°_=+¬¹²³£¢'"]/g,
  });

  if (sdTopicName.indexOf(".") !== -1) {
    sdTopicName = sdTopicName.substring(0, sdTopicName.indexOf("."));
  }

  sdTopicName += ".fifo";

  return sdTopicName;
}

export function standartazeQueueName(queueName: string): string {
  let sdQueueName: string = slugify(queueName, {
    replacement: "-",
    lower: true,
    remove: /[!@#$%*()`{}^~|,ºª:;<>?°_=+¬¹²³£¢'"]/g,
  });

  if (sdQueueName.indexOf(".") !== -1) {
    sdQueueName = sdQueueName.substring(0, sdQueueName.indexOf("."));
  }

  sdQueueName += ".fifo";

  return sdQueueName;
}
