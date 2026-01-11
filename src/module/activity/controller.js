import ActivityService from './service.js';
import ActivityRepository from './repository.js';

const createActivity = async (req, res) => {
    try {
        const result = await ActivityService.create(req.body);
        res.status(201).json(result);
    } catch (err) {
        res.status(400).json({ error: err.message });
    }
};

const getActivities = async (req, res) => {
    const { userId, page = 1, limit = 10, type } = req.query;
    const filter = type ? { activityType: type } : {};
    const logs = await ActivityRepository.findByUserId(userId, +page, +limit, filter);
    res.json({ data: logs, page: +page, limit: +limit });
};


export default {
    createActivity,
    getActivities
};