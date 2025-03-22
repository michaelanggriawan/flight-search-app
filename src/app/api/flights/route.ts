import { NextResponse } from 'next/server';
import { fetchFlights } from '@/lib/api';

export async function GET(request: Request) {
  const { searchParams } = new URL(request.url);

  const origin = searchParams.get('origin') || '';
  const destination = searchParams.get('destination') || '';
  const cabin = searchParams.get('cabin') || 'economy';
  const start_date = searchParams.get('start_date') || '';
  const end_date = searchParams.get('end_date') || '';
  const take = parseInt(searchParams.get('take') || '500');
  const skip = parseInt(searchParams.get('skip') || '0');
  const order_by = searchParams.get('order_by') || '';

  try {
    const flights = await fetchFlights({
      origin,
      destination,
      cabin: cabin as 'economy' | 'premium' | 'business' | 'first',
      start_date,
      end_date,
      take,
      skip,
      order_by,
    });

    return NextResponse.json(flights);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: 'Internal Server Error' }, { status: 500 });
  }
}
