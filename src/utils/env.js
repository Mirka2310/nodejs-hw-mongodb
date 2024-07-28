import dotenv from 'dotenv';

dotenv.config();

<<<<<<< Updated upstream
export const env = (name, defaultValue) => {
=======
export function env(name, defaultValue) {
  
>>>>>>> Stashed changes
  const value = process.env[name];

  if (value) return value;

  if (defaultValue) return defaultValue;

  throw new Error(`Missing: process.env['${name}'].`);
};