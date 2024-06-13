// src/utils/env.js
import 'dotenv/config';

export const env = (name, defaultValue) => {
  if (!process.env[name] && defaultValue === undefined) {
    throw new Error(`Missing: process.env[${name}]`);
  }
  return process.env[name] || defaultValue;
};
