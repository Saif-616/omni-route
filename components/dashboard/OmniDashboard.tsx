"use client";

import { BentoCard } from "../ui/BentoCard";
import Link from "next/link";
import { motion } from "framer-motion";
import { Activity, Thermometer, Wind, Zap } from "lucide-react";
import { WeatherData } from "@/lib/api/earth2-mock";
import { RouteOption } from "@/lib/utils/route-engine";

interface OmniDashboardProps {
  weather: WeatherData | null;
  routes: RouteOption[];
  selectedRouteId: string | null;
}

export const OmniDashboard = ({ weather, routes, selectedRouteId }: OmniDashboardProps) => {
  const selectedRoute = routes.find(r => r.id === selectedRouteId) || routes[0];
  
  if (!weather || !selectedRoute) {
    return <BentoCard className="animate-pulse h-64 flex items-center justify-center">Loading AI Modules...</BentoCard>;
  }

  const stressLevel = weather.temperature > 40 ? "CRITICAL" : weather.temperature > 35 ? "ELEVATED" : "NORMAL";
  const efficiencyGain = selectedRoute.isCoolest ? "+18%" : "Baseline";

  return (
    <div className="grid grid-cols-2 gap-4">
      {/* Fleet Thermal Stress */}
      <Link href="/weather" scroll={false} className="col-span-2 sm:col-span-1 block group">
        <motion.div layoutId="weather-card" className="h-full cursor-pointer">
          <BentoCard glowColor="primary" delay={0.1} className="h-full">
            <div className="flex items-center gap-3 mb-4">
              <div className="p-2 bg-primary/20 rounded-xl text-primary">
                <Thermometer size={24} />
              </div>
              <h3 className="font-bold text-gray-300">Fleet Thermal Stress</h3>
            </div>
            <div className="flex items-end gap-2">
              <span className="text-4xl font-extrabold text-white group-hover:text-primary transition-colors">{weather.temperature.toFixed(1)}°C</span>
              <span className={`text-sm font-semibold mb-1 ${stressLevel === 'CRITICAL' ? 'text-red-500' : 'text-primary'}`}>
                {stressLevel}
              </span>
            </div>
            <p className="text-xs text-gray-400 mt-2">NVIDIA Earth-2 Hyper-local (200m)</p>
          </BentoCard>
        </motion.div>
      </Link>

      {/* Efficiency Gain */}
      <BentoCard glowColor="accent" delay={0.2} className="col-span-2 sm:col-span-1">
        <div className="flex items-center gap-3 mb-4">
          <div className="p-2 bg-accent/20 rounded-xl text-accent">
            <Zap size={24} />
          </div>
          <h3 className="font-bold text-gray-300">AI Efficiency Gain</h3>
        </div>
        <div className="flex items-end gap-2">
          <span className="text-4xl font-extrabold text-white">{efficiencyGain}</span>
        </div>
        <p className="text-xs text-gray-400 mt-2">Compared to Shortest Path</p>
      </BentoCard>

      {/* Anomalies */}
      <Link href="/anomaly" scroll={false} className="col-span-2 block group">
        <motion.div layoutId="anomaly-card" className="h-full cursor-pointer">
          <BentoCard delay={0.3} className="bg-white/5 border-red-500/30 group-hover:border-red-500/80 transition-colors">
            <div className="flex items-center justify-between mb-4">
               <div className="flex items-center gap-3">
                 <div className="p-2 bg-red-500/20 rounded-xl text-red-500 group-hover:scale-110 transition-transform">
                   <Wind size={20} />
                 </div>
                 <h4 className="font-bold text-white group-hover:text-red-400 transition-colors">Anomaly Detection</h4>
               </div>
               <div className="text-xs font-bold px-2 py-1 bg-red-500/20 text-red-500 rounded-md">View Details</div>
            </div>
            
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
               <div className="bg-black/40 p-3 rounded-xl border border-white/5">
                  <div className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Sandstorm</div>
                  <div className="text-sm font-bold text-white">{weather.sandstormRisk}</div>
               </div>
               <div className="bg-black/40 p-3 rounded-xl border border-white/5">
                  <div className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Rainfall</div>
                  <div className="text-sm font-bold text-white truncate" title={weather.anomalies.rainfallRisk}>{weather.anomalies.rainfallRisk}</div>
               </div>
               <div className="bg-black/40 p-3 rounded-xl border border-white/5">
                  <div className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Flood</div>
                  <div className="text-sm font-bold text-white truncate" title={weather.anomalies.floodRisk}>{weather.anomalies.floodRisk}</div>
               </div>
               <div className="bg-black/40 p-3 rounded-xl border border-white/5">
                  <div className="text-[10px] text-gray-400 uppercase tracking-widest mb-1">Fog</div>
                  <div className="text-sm font-bold text-white truncate" title={weather.anomalies.fogRisk}>{weather.anomalies.fogRisk}</div>
               </div>
            </div>
          </BentoCard>
        </motion.div>
      </Link>
    </div>
  );
};
