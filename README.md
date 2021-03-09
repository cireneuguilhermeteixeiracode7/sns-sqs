# SNS SQS SLQ Manager

SNS-SQS-SLQ é um pacote que simplifica o acesso às configurações de filas de mensagens da Amazon. O intuito é centralizar todos os principais recursos utilizados para configuração.

Este pacote de nó foi criado com a arquitetura de microsserviço em mente, portanto, é adequado quando a arquitetura de software requer muita configuração de banco de dados em torno de todos os microsserviços.


## Instalação

Antes de instalar algumas configurações são necessárias.

### Set up the environment variable

Crie um arquivo para armazenar as variáveis ambientes `.env` e insir os atributos abaixo:

```
NODE_ENV=development OU staging OU production

AWS_REGION=REGIAO_EM_QUE_ACESSA_AS_CONFIGURACOES Ex. sa-east-1
AWS_ACCESS_KEY=CHAVE_DE_ACESSO_DO_SEU_USER_NA_AMAZON 
AWS_SECRET_KEY=SENHA_DE_ACESSO_DO_SEU_USER_NA_AMAZON
AWS_API_VERSION=VERSAO_DA_API_NA_AMAZON Ex. 2012-11-05

```
Pronto, agora você já pode instalar este pacote pelo npm e importá-lo no seu projeto.

```
    $ npm install --save sns-sqs-slq-code7
```


## Usage

Para usar adequadamente o pacote de nós, basta instanciar um novo objeto.


```javascript
    const SNSSQS = require('sns-sqs-slq-code7');
    const manager = new SNSSQS.defaut();
```

### Métodos disponíveis e seus parâmetros.

getAllTopics() retorna todos os tópicos SNS criados na região.

```javascript
const allTopics = await manager.getAllTopics();

```

getAllQueue() retorna todas as filas SQS criadas.

```javascript
const allQueue = await manager.getAllQueue();

```


createOrGetTopic() cria um tópico no padrão FIFO ou retorna o tópico que possui esse nome.

```javascript
const topic = await manager.createOrGetTopic(
  topicName: String
);
```


createOrGetQueue() cria uma fila SQS no padrão FIFO ou retorna a fila que possui esse nome.

```javascript
const queue = await manager.createOrGetQueue(
  queueName: String
);
```

subscribeToTopic() inscreve uma fila SQS em um tópico SNS. Mensagens publicadas em tópicos são direcionadas à todas as filas SQS incritas desse tópico.

```javascript
const response = await manager.subscribeToTopic(
  topicArn: String,
  queueArn: String,
  queueUrl: String,
);
```




publishToTopic() envia(publica) uma mensagem para(no) o tópico informado. Os atributos da mensagem (`MessageAttributes`) são utilizados em filas SQS que possuem Política de filtragem.

```javascript
const response = await manager.publishToTopic(
    topicName: String,
    message: String,
    messageGroupId: String, 
    messageDeduplicationId: String,
    topicArn: String,
    MessageAttributes?: { 
        [key: String]:  
        { 
            DataType: String;
            StringValue: String
        } 
    }
);
```


getTopicAttributes() obtem os atributos de um tópico SNS.

```javascript
const topicAttributes = await manager.getTopicAttributes(
  topicArn: String
);
```


getQueueAttributes() obtem os atributos do tipo `QueueArn` de uma fila SQS.

```javascript
const queueAttributes = await manager.getQueueAttributes(
  queueUrl: String
);
```


getSubscriptionsInTopic() obtem todas as filas SQS inscritas em um tópico específico e seus respectivos SubscriptionArn.

```javascript
const subscriptionsInTopic = await manager.getSubscriptionsInTopic(
  topicArn: String
);
```


getSubscriptionsInTopic() obtem todas as filas SQS inscritas em um tópico específico e seus respectivos SubscriptionArn.

```javascript
const subscriptionsInTopic = await manager.getSubscriptionsInTopic(
  topicArn: String
);
```

setFilterPolicyAttributeInSubscription() altera as políticas de filtro de um tópico SNS.

```javascript
const response = await manager.setFilterPolicyAttributeInSubscription(
  topicArn: String,
  SubscriptionArn: String, 
  attributeValue: { [key: String]: Array<Any> };

);

```





