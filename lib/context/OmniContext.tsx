"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { fetchEarth2Data, WeatherData, MOCK_LOCATIONS } from "../api/earth2-mock";
import { RouteOption, analyzeRoutes } from "../utils/route-engine";

interface OmniState {
  location: typeof MOCK_LOCATIONS[0];
  setLocation: (loc: typeof MOCK_LOCATIONS[0]) => void;
  weather: WeatherData | null;
  routes: RouteOption[];
  selectedRouteId: string | null;
  setSelectedRouteId: (id: string) => void;
}

const OmniContext = createContext<OmniState | undefined>(undefined);

export const OmniProvider = ({ children }: { children: React.ReactNode }) => {
  const [location, setLocation] = useState(MOCK_LOCATIONS[0]);
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [routes, setRoutes] = useState<RouteOption[]>([]);
  const [selectedRouteId, setSelectedRouteId] = useState<string | null>(null);

  useEffect(() => {
    async function loadData() {
      const data = await fetchEarth2Data(location.coords);
      setWeather(data);

      const baseLng = location.coords[0];
      const baseLat = location.coords[1];
      
      const mockRoutes: RouteOption[] = [
        {
          id: "r1",
          name: "Sheikh Zayed Rd (Direct)",
          durationMins: 15,
          distanceKm: 8.2,
          averageHeatIndex: 0,
          shadedPercentage: 10,
          isCoolest: false,
          isShortest: true,
          path: [
            [baseLng - 0.02, baseLat - 0.02],
            [baseLng - 0.01, baseLat - 0.01],
            [baseLng, baseLat]
          ]
        },
        {
          id: "r2",
          name: "Al Wasl Route (Shaded)",
          durationMins: 19,
          distanceKm: 9.5,
          averageHeatIndex: 0,
          shadedPercentage: 45,
          isCoolest: false,
          isShortest: false,
          path: [
            [baseLng - 0.02, baseLat - 0.02],
            [baseLng - 0.025, baseLat - 0.005],
            [baseLng - 0.01, baseLat + 0.005],
            [baseLng, baseLat]
          ]
        }
      ];

      const evaluated = analyzeRoutes(data, mockRoutes);
      setRoutes(evaluated);
      const coolest = evaluated.find(r => r.isCoolest);
      if (coolest) setSelectedRouteId(coolest.id);
    }

    loadData();
  }, [location]);

  return (
    <OmniContext.Provider value={{ location, setLocation, weather, routes, selectedRouteId, setSelectedRouteId }}>
      {children}
    </OmniContext.Provider>
  );
};

export const useOmniContext = () => {
  const context = useContext(OmniContext);
  if (context === undefined) {
    throw new Error("useOmniContext must be used within an OmniProvider");
  }
  return context;
};
