import { google } from 'googleapis';
import { readFileSync } from 'fs';
import path from 'path';

const SCOPES = ['https://www.googleapis.com/auth/webmasters.readonly'];

export const getGSCClient = () => {
  const keyPath = path.join(process.cwd(), 'keys', 'gsc-keys.json');
  const keys = JSON.parse(readFileSync(keyPath, 'utf8'));

  const auth = new google.auth.GoogleAuth({
    credentials: keys,
    scopes: SCOPES,
  });

  return google.searchconsole({ version: 'v1', auth });
};
