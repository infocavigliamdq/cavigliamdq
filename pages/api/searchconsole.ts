import { google } from 'googleapis';
import type { NextApiRequest, NextApiResponse } from 'next';
import { JWT } from 'google-auth-library';

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const siteUrl = 'https://caviglia.com';

  try {
    // ✅ Leer y limpiar las credenciales
    const raw = process.env.GSC_CREDENTIALS_JSON;
    if (!raw) throw new Error('GSC_CREDENTIALS_JSON no está definido.');

    const credentials = JSON.parse(raw);
    credentials.private_key = credentials.private_key.replace(/\\n/g, '\n');

    // ✅ Crear el cliente
    const client = new JWT({
      email: credentials.client_email,
      key: credentials.private_key,
      scopes: ['https://www.googleapis.com/auth/webmasters.readonly'],
    });

    const searchconsole = google.searchconsole({ version: 'v1', auth: client });

    const today = new Date();
    const formatDate = (d: Date) => d.toISOString().slice(0, 10);

    const getData = async (days: number) => {
      const endDate = formatDate(today);
      const startDate = formatDate(new Date(today.getTime() - days * 86400000));

      const response = await searchconsole.searchanalytics.query({
        siteUrl,
        requestBody: { startDate, endDate },
      });

      const row = response.data.rows?.[0];
      return {
        startDate,
        endDate,
        clicks: row?.clicks || 0,
        impressions: row?.impressions || 0,
        ctr: row?.ctr || 0,
        position: row?.position || 0,
      };
    };

    const getTopQueries = async (days: number, rowLimit = 15) => {
      const endDate = formatDate(today);
      const startDate = formatDate(new Date(today.getTime() - days * 86400000));

      const response = await searchconsole.searchanalytics.query({
        siteUrl,
        requestBody: {
          startDate,
          endDate,
          dimensions: ['query'],
          rowLimit,
        },
      });

      return response.data.rows?.map(row => ({
        query: row.keys?.[0] || 'N/A',
        clicks: row.clicks || 0,
        impressions: row.impressions || 0,
        ctr: row.ctr || 0,
        position: row.position || 0,
      })) || [];
    };

    const [last7, last28, last90, topQueriesLast28Days] = await Promise.all([
      getData(7),
      getData(28),
      getData(90),
      getTopQueries(90, 25),
    ]);

    res.status(200).json({
      last7,
      last28,
      last90,
      topQueriesLast28Days,
    });
  } catch (error: any) {
    console.error('❌ Error al obtener datos:', error);
    res.status(500).json({
      error: 'Error al obtener los datos de Google Search Console.',
      details: error.message,
      stack: process.env.NODE_ENV === 'development' ? error.stack : undefined,
    });
  }
}
