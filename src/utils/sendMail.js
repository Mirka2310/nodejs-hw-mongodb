import nodemailer from 'nodemailer';
import { SMTP } from '../constants/index.js';
import { env } from './env.js';

// транспортувальника Nodemailer
const transporter = nodemailer.createTransport({
  host: env(SMTP.SMTP_HOST),
  port: Number(env(SMTP.SMTP_PORT)),
  secure: false,
  auth: {
    user: env(SMTP.SMTP_USER),
    pass: env(SMTP.SMTP_PASSWORD),
  },
});

// Функція для надсилання електронних листів з логуванням
export const sendEmail = async (options) => {
  try {
    // Логування параметрів запиту
    console.log('Sending email with options:', options);

    // Надсилання електронного листа
    const info = await transporter.sendMail(options);

    // Логування результату надсилання
    console.log('Email sent:', info);

    return info;
  } catch (error) {
    // Логування помилки
    console.error('Error sending email:', error);

    throw new Error('Failed to send email');
  }
};
