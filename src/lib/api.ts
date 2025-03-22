import { z } from "zod";

const RouteSchema = z.object({
    ID: z.string(),
    OriginAirport: z.string(),
    OriginRegion: z.string(),
    DestinationAirport: z.string(),
    DestinationRegion: z.string(),
    NumDaysOut: z.number(),
    Distance: z.number(),
    Source: z.string(),
});

  
const FlightAvailabilitySchema = z.object({
    ID: z.string(),
    RouteID: z.string(),
    Route: RouteSchema,
    Date: z.string(),
    ParsedDate: z.string(),
  
    YAvailable: z.boolean(),
    WAvailable: z.boolean(),
    JAvailable: z.boolean(),
    FAvailable: z.boolean(),
  
    YMileageCost: z.string(),
    WMileageCost: z.string(),
    JMileageCost: z.string(),
    FMileageCost: z.string(),
  
    YRemainingSeats: z.number(),
    WRemainingSeats: z.number(),
    JRemainingSeats: z.number(),
    FRemainingSeats: z.number(),
  
    YAirlines: z.string(),
    WAirlines: z.string(),
    JAirlines: z.string(),
    FAirlines: z.string(),
  
    YDirect: z.boolean(),
    WDirect: z.boolean(),
    JDirect: z.boolean(),
    FDirect: z.boolean(),
  
    Source: z.string(),
    CreatedAt: z.string(),
    UpdatedAt: z.string(),
    AvailabilityTrips: z.null(),
});
  

const FlightsResponseSchema = z.object({
    data: z.array(FlightAvailabilitySchema),
    count: z.number(),
    hasMore: z.boolean(),
    cursor: z.number(),
  });

export async function fetchFlights(params: {
    origin: string;
    destination: string;
    cabin?: "economy" | "premium" | "business" | "first";
    start_date?: string;
    end_date?: string;
    take?: number;
    skip?: number;
    order_by?: string;
}) {
    const query = new URLSearchParams({
        origin_airport: params.origin,
        destination_airport: params.destination,
        cabin: params.cabin || "economy",
        start_date: params.start_date || "",
        end_date: params.end_date || "",
        take: params.take?.toString() || "500",
        skip: params.skip?.toString() || "0",
        order_by: params.order_by || "",
    });

    try {
        const response = await fetch(`https://seats.aero/partnerapi/search?${query.toString()}`, {
            headers: {
                "accept": "application/json",
                "Partner-Authorization": "pro_2jfHDqr43XXLfj7Kv2RbwwJ1TWp"
            }
        });

        if (!response.ok) {
            throw new Error(`API request failed: ${response.statusText}`);
        }

        const data = await response.json();
        const parsed = FlightsResponseSchema.parse(data);
        return parsed.data;
    } catch (error) {
        console.log("Error fetching flights:", error);
        throw error;
    }
}