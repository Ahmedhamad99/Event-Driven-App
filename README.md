# Event-Driven-App User Activity Logging Microservice

A **scalable, event-driven backend microservice** for real-time user activity logging.  
The service uses **Apache Kafka** for asynchronous event processing, **MongoDB** for persistence, and follows **Domain-Driven Design (DDD)** principles to ensure clean architecture, scalability, and maintainability.

Built with **Node.js**, **Express**, **KafkaJS**, **MongoDB**, and **Docker**.

---

##  Problem Statement

Modern applications generate large volumes of user activity events such as logins, page views, and actions.  
Processing these events synchronously leads to increased latency and poor scalability.

This service adopts an **event-driven architecture** to process activities asynchronously, ensuring high throughput and reliable storage.

---

##  Architecture Overview
    Client
    |
    | REST API
    v
    Express API
    |
    | Publish Event
    v
    Kafka Producer
    |
    | user-activity topic
    v
    Kafka Consumer (Consumer Group)
    |
    | Domain Logic
    v
    MongoDB


---

## Domain-Driven Design (DDD)

The codebase is structured around **business domains** rather than technical layers.

DB/
│ ├── models/
│ │ ├── UserActivity.js
| ├──connections.js

src/
│ ├── kafka/
│ │ ├── producer.js
│ │ ├── consumer.js
│ │ └── kafkaClient.js
│ ├── middleware/
│ │ └── errorHandler.js
│ ├──module/
| |  ├──activity/
| |   ├── controller.js
| |   ├── repository.js
│ |   └── service.js
│ ├──utils/
| | ├── logger.js
| |  
| └──intialize.js
├── docker-compose.yml
├── Dockerfile
├── index.js
├── package-lock.jon
└── package.json


### Why DDD?
- Clear separation of business logic and infrastructure
- Easier testing and maintenance
- Infrastructure can change without affecting domain logic

---

##  Data Flow

1. Client sends an activity via REST API
2. API publishes the event to Kafka
3. Kafka stores the message in a topic
4. Consumer processes the event asynchronously
5. Domain logic validates and transforms the data
6. Data is persisted in MongoDB
7. Logs are retrieved via REST API with filtering and pagination

---

##  Kafka Design

- Producer publishes user activity events
- Topic: `user-activity`
- Consumer group allows horizontal scaling
- At-least-once delivery ensures no data loss
- Supports future consumers (analytics, alerts)

---

##  MongoDB & Indexing

MongoDB is used for flexible schema and fast writes.

Indexes are applied on:
- `userId`
- `type`
- `createdAt`

This enables efficient filtering, pagination, and time-range queries.

---

##  REST API

### POST `/api/logs`
Publishes a user activity event to Kafka.

```json
{
  "userId": "123",
  "type": "LOGIN",
  "metadata": {
    "ip": "127.0.0.1"
  }
}




