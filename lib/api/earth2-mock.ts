// lib/api/earth2-mock.ts

export interface WeatherData {
  location: string;
  coordinates: [number, number]; // [longitude, latitude]
  temperature: number; // Celsius
  humidity: number; // Percentage
  sandstormRisk: "Low" | "Medium" | "High";
  windSpeed: number; // km/h
  hourlyForecast: { hour: number; temp: number; heatIndex: number; uhiFactor: number }[];
  anomalies: {
    rainfallRisk: string;
    floodRisk: string;
    fogRisk: string;
  };
}

export const MOCK_LOCATIONS = [
  { name: "Downtown Dubai", coords: [55.2744, 25.1972] as [number, number] },
  { name: "DIFC", coords: [55.2804, 25.2128] as [number, number] },
  { name: "JLT", coords: [55.1403, 25.0768] as [number, number] },
];

/**
 * Simulates NVIDIA Earth-2 CorrDiff API response for a given location.
 * Uses 200m resolution mocking.
 */
export async function fetchEarth2Data(
  coords: [number, number]
): Promise<WeatherData> {
  // Simulate network delay
  await new Promise((resolve) => setTimeout(resolve, 600));

  // Determine location name based on coordinates (simple closest match)
  const location = MOCK_LOCATIONS.reduce((prev, curr) => {
    const prevDist = Math.hypot(prev.coords[0] - coords[0], prev.coords[1] - coords[1]);
    const currDist = Math.hypot(curr.coords[0] - coords[0], curr.coords[1] - coords[1]);
    return prevDist < currDist ? prev : curr;
  });

  // Mock generative weather parameters based on area
  const isJLT = location.name === "JLT";
  const tempBase = isJLT ? 38 : 42; // Coastal vs Inland
  
  const suddenHumidity = Math.random() > 0.7; // 30% chance of sudden humidity spike
  
  // Generate 24 hour mock forecast
  const hourlyForecast = Array.from({ length: 24 }).map((_, i) => {
    const hour = (new Date().getHours() + i) % 24;
    // Peak heat around 2 PM (14:00)
    const heatCurve = Math.sin((hour / 24) * Math.PI - (14 / 24) * Math.PI);
    const hourTemp = tempBase + (heatCurve * 8) + (Math.random() * 2);
    // UHI is worse at night when structures release heat
    const uhiFactor = hour >= 18 || hour <= 6 ? 2 + Math.random() : Math.random();
    
    return {
      hour,
      temp: hourTemp,
      heatIndex: hourTemp + (suddenHumidity ? 5 : 2) + uhiFactor,
      uhiFactor
    };
  });

  return {
    location: location.name,
    coordinates: coords,
    temperature: tempBase + (Math.random() * 4 - 2), // +/- 2 degrees variance
    humidity: suddenHumidity ? 85 : 45 + Math.random() * 10,
    sandstormRisk: Math.random() > 0.8 ? "High" : (Math.random() > 0.4 ? "Medium" : "Low"),
    windSpeed: 15 + Math.random() * 20,
    hourlyForecast,
    anomalies: {
      rainfallRisk: Math.random() > 0.9 ? "Elevated (Cloud Seeding)" : "Minimal",
      floodRisk: suddenHumidity ? "Moderate in low areas" : "None",
      fogRisk: (hour => hour >= 4 && hour <= 8)(new Date().getHours()) && suddenHumidity ? "Severe" : "Low"
    }
  };
}
