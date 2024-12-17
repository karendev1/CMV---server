import * as dotenv from 'dotenv';
dotenv.config();

import express, { Request, Response } from 'express';
import mongoose from 'mongoose';

import { login } from './controllers/authController';
import { checkToken } from './shared/common-methods';
import { changePassword, deleteUserById, registerUser, searchAllUsers, searchUserById } from './controllers/userController';

const app = express();

app.use(express.json());

app.get("/user/:id", checkToken, async (req: Request, res: Response) => {
  await searchUserById(req, res);
});

app.post("/register-user", checkToken, async (req: Request, res: Response) => {
  await registerUser(req, res);
});

app.post("/auth/login", async (req: Request, res: Response) => {
  await login(req, res);
});

app.get("/users", checkToken, async (req: Request, res: Response) => {
  await searchAllUsers(req, res);
});

app.delete("/user/:id", checkToken, async (req: Request, res: Response) => {
  await deleteUserById(req, res);
});

app.put("/change-password/:id", checkToken, async (req: Request, res: Response) => {
  await changePassword(req, res);
});

const dbUser: string = process.env.DB_USER!;
const dbPassword: string = process.env.DB_PASS!;

mongoose
  .connect(
    `mongodb+srv://${dbUser}:${dbPassword}@cmv-auth.7jtmw.mongodb.net/?retryWrites=true&w=majority&appName=CMV-Auth`
  )
  .then(() => {
    app.listen(3000);
    console.log("Conectou ao banco!");
  })
  .catch((err) => console.log(err));