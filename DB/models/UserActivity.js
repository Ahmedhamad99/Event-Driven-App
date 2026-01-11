import mongoose from 'mongoose';
import { de } from 'zod/v4/locales';

const userActivitySchema = new mongoose.Schema({
    userId: { type: String, required: true, index: true },
    activityType: {
        type: String,
        enum: ['LOGIN', 'LOGOUT', 'VIEW_PAGE', 'PURCHASE'],
        required: true,
        index: true
    },
    timestamp: { type: Date, default: Date.now, index: true },
    metadata: { type: Object, default: {} }
});

export default mongoose.model('UserActivity', userActivitySchema);