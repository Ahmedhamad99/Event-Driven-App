import { Kafka } from 'kafkajs';
import logger from '../utils/logger.js';
import ActivityRepository from '../module/activity/repository.js';

const kafka = new Kafka({
    clientId: 'activity-consumer',
    brokers: [process.env.KAFKA_BROKER || 'localhost:9092'],
    retry: { retries: 10 }
});

const consumer = kafka.consumer({ groupId: 'activity-group' });

export const startConsumer = async () => {
    try {
        await consumer.connect();
        logger.info('Kafka Consumer connected');

        await consumer.subscribe({ topic: 'user-activity-logs', fromBeginning: true });

        await consumer.run({
            eachMessage: async ({ topic, partition, message }) => {
                const activity = JSON.parse(message.value.toString());
                activity.timestamp = new Date();

                await ActivityRepository.save(activity);
                logger.info(`Saved to MongoDB: ${activity.userId} - ${activity.activityType}`);
            },
        });
    } catch (err) {
        logger.error('Consumer failed to start', err);
        throw err;
    }
};