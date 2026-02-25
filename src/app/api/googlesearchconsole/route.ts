import { NextResponse } from 'next/server';
import { getGSCAccessToken } from '../../../Utils/gscClient';
import { subDays, format } from 'date-fns';

const SITE_URL = 'https://caviglia.com'; // Cambia a tu propiedad verificada

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const range = searchParams.get('range') || '7';

  const endDate = new Date();
  const startDate = subDays(endDate, parseInt(range, 10));
  const start = format(startDate, 'yyyy-MM-dd');
  const end = format(endDate, 'yyyy-MM-dd');

  try {
    const token = await getGSCAccessToken();
    const response = await fetch(
      `https://searchconsole.googleapis.com/webmasters/v3/sites/${encodeURIComponent(SITE_URL)}/searchAnalytics/query`,
      {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          startDate: start,
          endDate: end,
          dimensions: ['query'],
          rowLimit: 100,
        }),
        cache: 'no-store',
      }
    );

    if (!response.ok) {
      const details = await response.text();
      throw new Error(`GSC API error ${response.status}: ${details}`);
    }

    const data = await response.json();

    return NextResponse.json(data.rows || []);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Error fetching GSC data' }, { status: 500 });
  }
}
