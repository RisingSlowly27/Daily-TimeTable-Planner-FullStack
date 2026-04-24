import express from 'express';
import './config/env.js';
import cors from 'cors';
import mongoose from 'mongoose';
import session from 'express-session';
import passport from './config/passport.js'
import logger from './middlewares/logger.js';
import authRoutes from './routes/authRoutes.js';
import activityRoutes from './routes/activityRoutes.js';
import weekRoutes from './routes/weekRoutes.js';
import authMiddleware from './middlewares/authMiddleware.js';
import errorHandler from './middlewares/errorHandler.js';

const app=express();

app.set("trust proxy", 1);

app.use(cors({
  origin:process.env.FRONTEND,
  credentials: true
}));
app.use(express.json());
app.use(logger);
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  rolling: true,
  cookie:{
    secure: true,
    sameSite: "none",
    maxAge:3*24*60*60*1000
  }
}));

app.use(passport.initialize());
app.use(passport.session());

app.use("/auth", authRoutes);
app.use("/activities", authMiddleware, activityRoutes);
app.use("/weeks", authMiddleware, weekRoutes);

app.use(errorHandler);

const startServer = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log("MongoDB Connected");

    app.listen(process.env.PORT, () => {
      console.log(`Server running on port ${process.env.PORT}`);
    });
  } catch (error) {
    console.log("Database connection failed:", error);
  }
};

startServer();