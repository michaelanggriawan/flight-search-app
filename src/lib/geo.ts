import airports from '@/data/airports.json';

function getDistance(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371;
  const dLat = ((lat2 - lat1) * Math.PI) / 180;
  const dLon = ((lon2 - lon1) * Math.PI) / 180;
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos((lat1 * Math.PI) / 180) *
      Math.cos((lat2 * Math.PI) / 180) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
}

export function getNearestAirport(lat: number, lon: number) {
  let minDistance = Infinity;
  let nearest = airports[0];

  for (const airport of airports) {
    if (airport.lat  && airport.lon) {
      const distance = getDistance(lat, lon, +airport.lat, +airport.lon);
      if (distance < minDistance) {
        minDistance = distance;
        nearest = airport;
      }
    }
  }

  return nearest;
}
