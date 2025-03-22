import { useEffect, useMemo, useState } from 'react';
import Fuse from 'fuse.js';
import airportsRaw from '@/data/airports.json';
import { AirportArraySchema, type Airport } from '@/lib/schemas/airport.schema';


export function useAirportSearch(query: string, maxResults = 200) {
  const [results, setResults] = useState<Airport[]>([]);

  const fuse = useMemo(() => {
    const parsed = AirportArraySchema.safeParse(airportsRaw);
    if (!parsed.success) {
      console.error('Airport data validation failed:', parsed.error.issues);
      return null;
    }

    return new Fuse(parsed.data, {
      keys: ['name', 'code', 'continent', 'iso', 'country'],
      threshold: 0.3,
    });
  }, []);

  useEffect(() => {
    if (!fuse || !query.trim()) {
      setResults([]);
      return;
    }

    const timer = setTimeout(() => {
      const res = fuse.search(query).map((r) => r.item);
      setResults(res.slice(0, maxResults));
    }, 150);

    return () => clearTimeout(timer);
  }, [query, fuse, maxResults]);
  return results;
}
