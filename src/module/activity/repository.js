import UserActivity from '../../../DB/models/UserActivity.js';

class ActivityRepository {
    async save(activity) {
        return await activity.save();
    }

    async findByUserId(userId, page = 1, limit = 10, filter = {}) {
        return await UserActivity.find({ userId, ...filter })
            .sort({ timestamp: -1 })
            .skip((page - 1) * limit)
            .limit(limit);
    }
}

export default new ActivityRepository();