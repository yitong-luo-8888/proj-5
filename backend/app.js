import express from 'express';
import dotenv from 'dotenv';
import cors from 'cors';
import userRoutes from './routes/userRoutes.js';
import gameRoutes from './routes/gameRoutes.js';
import AppError from './utils/appError.js';
import globalErrorHandler from './controllers/errorController.js';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.use('/api/v1/gameRoutes', gameRoutes);
app.use('/api/v1/userRoutes', userRoutes);
app.all(/.*/, (req, res, next) => {
  next(new AppError(`Can't find ${req.originalUrl} on this server`, 404));
});
app.use(globalErrorHandler);

export default app;