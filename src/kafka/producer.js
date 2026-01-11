import { Kafka } from 'kafkajs';
import logger from '../utils/logger.js';

const kafka = new Kafka({
    clientId: 'activity-producer',
    brokers: [process.env.KAFKA_BROKER || 'kafka:9092'],
    retry: {
        initialRetryTime: 300,
        maxRetryTime: 30000,
        retries: 20
    }
});

const producer = kafka.producer();



const sendActivity = async (activity) => {
    try {
        await producer.connect();
        await producer.send({
            topic: 'user-activity-logs',
            messages: [{ value: JSON.stringify(activity) }],
        });
        logger.info(`Sent: ${activity.userId}`);
    } catch (err) {
        logger.error('Failed to send to Kafka', err);
        throw err;
    }
};

export default sendActivity;