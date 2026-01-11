import sendActivity from '../../kafka/producer.js';
import { z } from 'zod';

const activitySchema = z.object({
    userId: z.string(),
    activityType: z.enum(['LOGIN', 'LOGOUT', 'VIEW_PAGE', 'PURCHASE']),
    metadata: z.object().optional()
});

class ActivityService {
    async create(dto) {
        const validated = activitySchema.parse(dto);
        await sendActivity(validated);
        return { success: true, message: 'Activity sent to Kafka' };
    }
}

export default new ActivityService();