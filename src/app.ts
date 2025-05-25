import * as dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';
import mongoose from 'mongoose';

import { login } from './controllers/authController';

const app = express();
const cors = require('cors');
const bodyParser = require('body-parser');
const userRoutes = require('./routers/usersRouters');
const assistedRouter = require('./routers/assistedRouters')
const activityRouter = require('./routers/activityRouters')
const eventRouter = require('./routers/eventRouters')



app.use(cors());

app.use(express.json());

app.post("/api/auth/login", async (req: Request, res: Response) => {
  await login(req, res);
});

app.use(bodyParser.json());
app.use('/api/users', userRoutes);
app.use('/api/assisted', assistedRouter);
app.use('/api/activity', activityRouter);
app.use('/api/event', eventRouter)


const dbUser: string = process.env.DB_USER!;
const dbPassword: string = process.env.DB_PASS!;

mongoose
  .connect(
    `mongodb+srv://${dbUser}:${dbPassword}@cmv-auth.7jtmw.mongodb.net/?retryWrites=true&w=majority&appName=CMV-Auth`
  )
  .then(() => {
    app.listen(3000);
    console.log("Conectou ao banco de dados!");
  })
  .catch((err) => console.log(err)); 