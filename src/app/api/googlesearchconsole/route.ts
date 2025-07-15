import { NextResponse } from 'next/server';
import { getGSCClient } from '../../../Utils/gscClient';
import { subDays, format } from 'date-fns';

const SITE_URL = 'https://caviglia.com'; // Cambia a tu propiedad verificada

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const range = searchParams.get('range') || '7';

  const endDate = new Date();
  const startDate = subDays(endDate, parseInt(range));
  const start = format(startDate, 'yyyy-MM-dd');
  const end = format(endDate, 'yyyy-MM-dd');

  try {
    const client = await getGSCClient();
    const response = await client.searchanalytics.query({
      siteUrl: SITE_URL,
      requestBody: {
        startDate: start,
        endDate: end,
        dimensions: ['query'],
        rowLimit: 100,
      },
    });

    return NextResponse.json(response.data.rows || []);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error fetching GSC data' }, { status: 500 });
  }
}
