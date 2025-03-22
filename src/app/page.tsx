'use client';

import { useState } from 'react';
import SearchForm from '@/components/SearchForm';
import FlightCard from '@/components/FlightCard';
import Loader from '@/components/Loader';

type Flight = {
  ID: string;
  RouteID: string;
  Route: {
    ID: string;
    OriginAirport: string;
    OriginRegion: string;
    DestinationAirport: string;
    DestinationRegion: string;
    NumDaysOut: number;
    Distance: number;
    Source: string;
  };
  Date: string;
  ParsedDate: string;
  YAvailable: boolean;
  WAvailable: boolean;
  JAvailable: boolean;
  FAvailable: boolean;
  YMileageCost: string;
  WMileageCost: string;
  JMileageCost: string;
  FMileageCost: string;
  YRemainingSeats: number;
  WRemainingSeats: number;
  JRemainingSeats: number;
  FRemainingSeats: number;
  YAirlines: string;
  WAirlines: string;
  JAirlines: string;
  FAirlines: string;
  YDirect: boolean;
  WDirect: boolean;
  JDirect: boolean;
  FDirect: boolean;
  Source: string;
  CreatedAt: string;
  UpdatedAt: string;
  AvailabilityTrips: any; // or a more specific type if known
}

export default function HomePage() {
  const [flights, setFlights] = useState<Array<Flight>>([]);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleSearch = async ({
    origin,
    destination,
    cabin,
    start_date,
    end_date,
  }: {
    origin: string;
    destination: string;
    cabin: string;
    start_date: string;
    end_date: string;
  }) => {
    setError(null);
    setLoading(true);
  
    try {
      const res = await fetch('/api/flights?' + new URLSearchParams({
        origin,
        destination,
        cabin,
        start_date,
        end_date,
      }));
  
      if (!res.ok) {
        throw new Error('Failed to fetch flights');
      }
  
      const data = await res.json();
      if (!data || data.length === 0) {
        setError('No flights found. Try different inputs.');
      }
  
      setFlights(data);
    } catch (err) {
      console.error(err);
      setError('Something went wrong while searching.');
    } finally {
      setLoading(false);
    }
  };
  

  return (
    <main className="min-h-screen bg-gray-100 px-4 pb-10">
      <div className="sticky top-0 z-50 bg-gray-100 pt-4 pb-2 border-b border-gray-300">
        <SearchForm onSearch={handleSearch}  />
      </div>

      {loading && <Loader />}

      {error ? (
        <div className="text-center py-8 text-red-500 font-medium">{error}</div>
      ) : flights.length === 0 ? (
        <div className="text-center py-8 text-gray-400">No flights to display.</div>
      ) : (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {flights.map((flight) => (
            <FlightCard key={flight.ID} flight={flight} />
          ))}
        </div>
      )}
    </main>
  );
}
