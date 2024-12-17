import mongoose from "mongoose";

export interface UserDocument extends mongoose.Document {
    name: string,
    email: string,
    password: string,
    position: string,
  }