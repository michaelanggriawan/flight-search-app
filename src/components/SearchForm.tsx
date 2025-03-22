'use client';

import { useState, useEffect } from 'react';
import { DateRange } from 'react-date-range';
import { format } from 'date-fns';
import { getNearestAirport } from '@/lib/geo';
import 'react-date-range/dist/styles.css';
import 'react-date-range/dist/theme/default.css';
import AirportSelect from './AirportSelect';


type Props = {
  onSearch: (params: {
    origin: string;
    destination: string;
    cabin: string;
    start_date: string;
    end_date: string;
  }) => void;
};

export default function SearchForm({ onSearch }: Props) {
  const [origin, setOrigin] = useState('');
  const [destination, setDestination] = useState('');
  const [cabin, setCabin] = useState('economy');
  const [isTriggerGeo, setIsTriggerGeo] = useState(false);

  useEffect(() => {
    navigator.geolocation.getCurrentPosition(
      (pos) => {
        const { latitude, longitude } = pos.coords;
        const nearest = getNearestAirport(latitude, longitude);
        setOrigin(nearest.code);
        setIsTriggerGeo(true)
      },
      (err) => {
        console.warn('Geolocation error:', err);
        setIsTriggerGeo(true)
      }
    );
  }, []);

  const [dateRange, setDateRange] = useState([
    {
      startDate: new Date(),
      endDate: new Date(),
      key: 'selection',
    },
  ]);
  const [showCalendar, setShowCalendar] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!origin || !destination) {
      alert('Please select origin and destination');
      return;
    }

    const start = format(dateRange[0].startDate!, 'yyyy-MM-dd');
    const end = format(dateRange[0].endDate!, 'yyyy-MM-dd');

    onSearch({
      origin,
      destination,
      cabin,
      start_date: start,
      end_date: end,
    });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white border shadow-lg rounded-2xl p-6 space-y-6 w-full max-w-4xl mx-auto"
    >
      <h2 className="text-2xl font-bold text-center text-gray-800 flex items-center justify-center gap-2">
        ✈️ Flight Search
      </h2>

      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        { isTriggerGeo && <AirportSelect label="From" value={origin} onChange={(val) => setOrigin(val)} /> }
        <AirportSelect label="To" value={destination} onChange={(val) => {
          setDestination(val)
        }} />

        <div className="relative">
          <label className="text-sm font-medium text-gray-600 mb-1 block">Cabin</label>
          <select
            value={cabin}
            onChange={(e) => setCabin(e.target.value)}
            className="w-full p-3 border rounded-md text-gray-800"
          >
            <option value="">All Cabins</option>
            <option value="economy">Economy</option>
            <option value="premium">Premium</option>
            <option value="business">Business</option>
            <option value="first">First</option>
          </select>
        </div>

        <div className="relative">
          <label className="text-sm font-medium text-gray-600 mb-1 block">Date Range</label>

          <button
            type="button"
            onClick={() => setShowCalendar((prev) => !prev)}
            className="p-3 border rounded-md w-full text-left text-gray-800"
          >
            📅 {format(dateRange[0].startDate!, 'MMM d')} - {format(dateRange[0].endDate!, 'MMM d')}
          </button>

          {showCalendar && (
            <div className="absolute z-10 mt-2 bg-white shadow-lg rounded-md">
              <DateRange
                editableDateInputs={true}
                onChange={(ranges) => {
                  const selection = ranges.selection;
                  if (selection.startDate && selection.endDate) {
                    setDateRange([{
                      startDate: new Date(selection.startDate),
                      endDate: new Date(selection.endDate),
                      key: 'selection',
                    }]);
                  }
                }}
                moveRangeOnFirstSelection={false}
                ranges={dateRange}
                rangeColors={['#2563eb']}
              />
            </div>
          )}
        </div>
      </div>

      <button
        type="submit"
        className="w-full bg-blue-600 text-white font-semibold py-3 px-4 rounded-md hover:bg-blue-700 transition-all shadow"
      >
        Search Flights
      </button>
    </form>
  );
}
