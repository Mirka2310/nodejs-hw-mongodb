import mongoose from 'mongoose';
import { env } from '../utils/env.js';

export const initMongoConnection = async () => {
  const user = env('MONGODB_USER');
  const pwd = env('MONGODB_PASSWORD');
  const url = env('MONGODB_URL');
  const db = env('MONGODB_DB');

  if (!user || !pwd || !url || !db) {
    throw new Error('Missing necessary environment variables for MongoDB connection');
  }

  const connectionString = `mongodb+srv://${user}:${pwd}@${url}/${db}?retryWrites=true&w=majority&appName=MyCluster`;

  try {
    await mongoose.connect(connectionString, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
    });
    console.log('Mongo connection successfully established!');
  } catch (error) {
    console.error('Error while setting up mongo connection', error);
    throw error;
  }
};
