// lib/utils/route-engine.ts
import { WeatherData } from "../api/earth2-mock";

export interface RouteOption {
  id: string;
  name: string;
  durationMins: number;
  distanceKm: number;
  averageHeatIndex: number; // calculated heat index
  shadedPercentage: number;
  isCoolest: boolean;
  isShortest: boolean;
  path: [number, number][]; // Array of [lng, lat]
}

export function calculateHeatIndex(temp: number, humidity: number): number {
  // Simplified Heat Index formula (Steadman's)
  const c1 = -8.78469475556;
  const c2 = 1.61139411;
  const c3 = 2.33854883889;
  const c4 = -0.14611605;
  const c5 = -0.012308094;
  const c6 = -0.0164248277778;
  const c7 = 0.002211732;
  const c8 = 0.00072546;
  const c9 = -0.000003582;

  let HI = c1 + (c2 * temp) + (c3 * humidity) + (c4 * temp * humidity) + 
           (c5 * temp * temp) + (c6 * humidity * humidity) + 
           (c7 * temp * temp * humidity) + (c8 * temp * humidity * humidity) + 
           (c9 * temp * temp * humidity * humidity);

  return HI;
}

export function analyzeRoutes(
  weather: WeatherData,
  routes: RouteOption[]
): RouteOption[] {
  // Calculate specific heat indices based on the mock weather data + route shade
  const evaluatedRoutes = routes.map((route) => {
    const baseHeatIndex = calculateHeatIndex(weather.temperature, weather.humidity);
    // Shade reduces the perceived heat index
    const adjustedHeatIndex = baseHeatIndex - (route.shadedPercentage * 0.1);
    
    // Add time penalty if sandstorm risk is high
    let adjustedDuration = route.durationMins;
    if (weather.sandstormRisk === "High") {
       adjustedDuration *= 1.3; // 30% slower
    } else if (weather.sandstormRisk === "Medium") {
       adjustedDuration *= 1.1; // 10% slower
    }

    return {
      ...route,
      durationMins: adjustedDuration,
      averageHeatIndex: adjustedHeatIndex,
    };
  });

  // Find Coolest Path and Shortest Path
  let minHeat = Infinity;
  let minTime = Infinity;

  evaluatedRoutes.forEach((r) => {
    if (r.averageHeatIndex < minHeat) minHeat = r.averageHeatIndex;
    if (r.durationMins < minTime) minTime = r.durationMins;
  });

  return evaluatedRoutes.map(r => ({
    ...r,
    isCoolest: r.averageHeatIndex === minHeat,
    isShortest: r.durationMins === minTime,
  }));
}
