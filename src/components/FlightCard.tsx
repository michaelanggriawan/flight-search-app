type Flight = {
    ID: string;
    Date: string;
    Route: {
      OriginAirport: string;
      DestinationAirport: string;
    };
    YMileageCost: string;
    JMileageCost: string;
    FMileageCost: string;
    YAirlines: string;
    JAirlines: string;
    FAirlines: string;
  };
  
  function formatMiles(cost: string) {
    const num = parseInt(cost);
    return isNaN(num) || num === 0 ? null : `${num.toLocaleString()} miles`;
  }
  
  export default function FlightCard({ flight }: { flight: Flight }) {
    const economy = formatMiles(flight.YMileageCost);
    const business = formatMiles(flight.JMileageCost);
    const first = formatMiles(flight.FMileageCost);
  
    return (
      <div className="bg-white shadow-md rounded-xl p-5 border w-full max-w-2xl mx-auto">
        <h3 className="text-lg font-semibold text-gray-800">
          {flight.Route.OriginAirport} ➡ {flight.Route.DestinationAirport}
        </h3>
        <p className="text-gray-500 mb-2">📅 {new Date(flight.Date).toDateString()}</p>
  
        <div className="space-y-1 text-sm">
          <p className={economy ? "text-gray-800" : "text-gray-400"}>
            🪑 Economy: {economy ?? "Not available"} {economy && `(${flight.YAirlines})`}
          </p>
          <p className={business ? "text-gray-800" : "text-gray-400"}>
            💼 Business: {business ?? "Not available"} {business && `(${flight.JAirlines})`}
          </p>
          <p className={first ? "text-gray-800" : "text-gray-400"}>
            👑 First: {first ?? "Not available"} {first && `(${flight.FAirlines})`}
          </p>
        </div>
      </div>
    );
  }
  