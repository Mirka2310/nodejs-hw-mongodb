import path from 'path';
import fs from 'fs/promises';
import { SMTP, TEMP_UPLOAD_DIR, UPLOAD_DIR } from '../constans/index.js';
import { env } from './env.js';

export const saveFileToUploadDir = async (file) => {
  await fs.rename(
    path.join(TEMP_UPLOAD_DIR, file.filename),
    path.join(UPLOAD_DIR, file.filename),
  );

  return `${env(SMTP.APP_DOMAIN)}/uploads/${file.filename}`;
};