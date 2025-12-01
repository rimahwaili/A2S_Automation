import path from 'path';
import fs from 'fs';
import dotenv from 'dotenv';

const currentEnv = process.env.ENV || 'recette';
const envFile = `.env.${currentEnv}`;
const envPath = path.resolve(process.cwd(), envFile);

// On nettoie les variables déjà chargées (évite les collisions)
delete process.env.BASE_URL;
delete process.env.USERNAME;
delete process.env.PASSWORD;

if (fs.existsSync(envPath)) {
  dotenv.config({ path: envPath });
  console.log(`[ENV] Chargé depuis ${envPath}`);
} else {
  throw new Error(`[ENV] Fichier introuvable : ${envPath}`);
}

export const credentials = {
  baseUrl: process.env.BASE_URL ?? '',
  username: process.env.LOGIN_USERNAME ?? '',
  password: process.env.LOGIN_PASSWORD ?? '',
  inactive_username: process.env.LOGIN_INACTIF_USERNAME ?? '',
  inactive_password: process.env.LOGIN_INACTIF_PASSWORD ?? '',
};
