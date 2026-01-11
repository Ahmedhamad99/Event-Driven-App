import express from 'express';
import connection from '../DB/connection.js';
import activityRoutes from './module/activity/controller.js';
import errorHandler from './middleware/errorHandler.js';
import { startConsumer } from './kafka/consumer.js';

const initializeApp = (app) => {
  app.use(express.json());
  connection();

  app.post('/api/logs', activityRoutes.createActivity);
  app.get('/api/logs', activityRoutes.getActivities);

  app.use(errorHandler);

  startConsumer().catch(console.error);

  app.use((req, res, next) => {
    res.status(404).json({
      success: false,
      message: `Route not found: ${req.originalUrl}`
    });
  });
};

export default initializeApp;