import { readFileSync } from 'fs';
import path from 'path';
import { GoogleAuth } from 'google-auth-library';

const SCOPES = ['https://www.googleapis.com/auth/webmasters.readonly'];

export const getGSCAccessToken = async () => {
  const keyPath = path.join(process.cwd(), 'keys', 'gsc-keys.json');
  const keys = JSON.parse(readFileSync(keyPath, 'utf8'));

  const auth = new GoogleAuth({
    credentials: keys,
    scopes: SCOPES,
  });

  const client = await auth.getClient();
  const tokenResponse = await client.getAccessToken();
  const token = tokenResponse.token;

  if (!token) {
    throw new Error('No se pudo obtener access token de Google Search Console');
  }

  return token;
};
