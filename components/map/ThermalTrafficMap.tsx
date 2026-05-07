"use client";

import { useEffect, useState } from "react";
import Map, { Source, Layer, Marker } from "react-map-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { RouteOption } from "@/lib/utils/route-engine";

interface ThermalTrafficMapProps {
  center: [number, number]; // [lng, lat]
  routes: RouteOption[];
  selectedRouteId: string | null;
}

export const ThermalTrafficMap = ({ center, routes, selectedRouteId }: ThermalTrafficMapProps) => {
  const [mounted, setMounted] = useState(false);
  const mapboxToken = process.env.NEXT_PUBLIC_MAPBOX_TOKEN;
  
  const hasValidToken = mapboxToken && 
                        mapboxToken !== "your_mapbox_token_here" && 
                        mapboxToken !== "your_token_here";

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return <div className="h-full w-full bg-black/50 animate-pulse rounded-2xl" />;

  if (!hasValidToken) {
    return (
      <div className="h-full w-full bg-zinc-900 rounded-2xl flex flex-col items-center justify-center p-6 text-center border border-white/10">
        <div className="text-primary mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><polygon points="3 6 9 3 15 6 21 3 21 18 15 21 9 18 3 21"/><line x1="9" y1="3" x2="9" y2="18"/><line x1="15" y1="6" x2="15" y2="21"/></svg>
        </div>
        <h3 className="font-bold text-white mb-2">Mapbox Token Required</h3>
        <p className="text-sm text-gray-400">Please add NEXT_PUBLIC_MAPBOX_TOKEN to your .env to view the Thermal-Traffic Map of Dubai.</p>
      </div>
    );
  }

  // Generate GeoJSON for routes
  const routeFeatures = routes.map((route) => ({
    type: "Feature",
    properties: {
      id: route.id,
      isCoolest: route.isCoolest,
      isSelected: route.id === selectedRouteId
    },
    geometry: {
      type: "LineString",
      coordinates: route.path
    }
  }));

  const geojsonData = {
    type: "FeatureCollection",
    features: routeFeatures
  };

  return (
    <div className="h-full w-full rounded-2xl overflow-hidden border border-white/10 relative">
      <Map
        mapboxAccessToken={mapboxToken}
        initialViewState={{
          longitude: center[0],
          latitude: center[1],
          zoom: 13.5,
          pitch: 45,
          bearing: -17.6
        }}
        mapStyle="mapbox://styles/mapbox/dark-v11"
        interactiveLayerIds={['routes']}
      >
        {/* Heat Overlay Simulation (Mocked via simple raster/layer logic, or glowing circles) */}
        <Source type="geojson" data={geojsonData as any}>
          {/* Background thick line for active route */}
          <Layer
            id="routes-bg"
            type="line"
            paint={{
              "line-color": [
                "case",
                ["==", ["get", "isSelected"], true],
                "#32B531", // Primary Ben 10 Green
                "#333333"
              ],
              "line-width": [
                "case",
                ["==", ["get", "isSelected"], true],
                8,
                4
              ],
              "line-opacity": 0.5,
              "line-blur": 4
            }}
          />
          {/* Core thin line */}
          <Layer
            id="routes"
            type="line"
            paint={{
              "line-color": [
                "case",
                ["==", ["get", "isSelected"], true],
                "#FFFFFF",
                "#666666"
              ],
              "line-width": 2
            }}
          />
        </Source>

        <Marker longitude={center[0]} latitude={center[1]} anchor="bottom">
          <div className="h-6 w-6 bg-primary rounded-full border-2 border-black shadow-[0_0_15px_#32B531]" />
        </Marker>
      </Map>
      
      {/* Overlay controls/legend */}
      <div className="absolute top-4 right-4 bg-black/80 backdrop-blur-md p-3 rounded-xl border border-white/10 flex flex-col gap-2">
         <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded-full bg-red-500 shadow-[0_0_10px_red]" /> High Heat Stress
         </div>
         <div className="flex items-center gap-2 text-xs">
            <div className="w-3 h-3 rounded-full bg-primary shadow-[0_0_10px_#32B531]" /> Cool Path (Selected)
         </div>
      </div>
    </div>
  );
};
