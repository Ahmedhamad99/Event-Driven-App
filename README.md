# Event-Driven 

A **real-time, event-driven microservice** that logs user activities using **Kafka**, stores them in **MongoDB**, and exposes a **REST API** for logging and querying.

Built with **Node.js**, **Express**, **KafkaJS**, **Mongoose**, and **Docker Compose**.

---

## Features

- **POST `/api/logs`** → Send activity to Kafka
- **GET `/api/logs`** → Query logs with filters (`userId`, `type`, `from`, `to`)
- **Kafka Producer & Consumer** → Async processing
- **MongoDB Persistence** → Reliable storage
- **Docker Compose** → One-click deployment
- **Health Checks** → Ensure Kafka & MongoDB are ready
- **Winston Logger** → Structured logging
- **404 Handling** → Clean error responses

---

## Tech Stack

| Component       | Technology                     |
|----------------|--------------------------------|
| Runtime        | Node.js (ESM)                  |
| Framework      | Express                        |
| Message Broker | Apache Kafka (wurstmeister)    |
| Database       | MongoDB                        |
| Logging        | Winston                        |
| Container      | Docker + Docker Compose        |
| Kafka Client   | KafkaJS                        |

---

## Project Structure
