"use client";

import { motion } from "framer-motion";
import { useOmniContext } from "@/lib/context/OmniContext";
import { X, Activity, Zap, Truck, AlertTriangle } from "lucide-react";
import { useRouter } from "next/navigation";

export const LogisticsHubView = ({ isModal = false }: { isModal?: boolean }) => {
  const { weather, routes, selectedRouteId } = useOmniContext();
  const router = useRouter();

  if (!weather) return null;

  const content = (
    <div className="p-6 md:p-10 h-full overflow-y-auto">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">LOGISTICS HUB</h1>
          <p className="text-gray-400">Fleet Operations & Efficiency</p>
        </div>
        {isModal && (
          <button onClick={() => router.back()} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
            <X size={24} />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        <div className="glass rounded-3xl p-6 border-accent/30 shadow-neon-accent">
          <div className="flex items-center gap-3 mb-4 text-accent">
            <Truck size={24} />
            <h3 className="font-bold">Active Fleet</h3>
          </div>
          <div className="text-5xl font-extrabold">1,402</div>
          <p className="text-sm text-gray-400 mt-2">Riders currently active in Dubai</p>
        </div>
        <div className="glass rounded-3xl p-6">
          <div className="flex items-center gap-3 mb-4 text-primary">
            <Zap size={24} />
            <h3 className="font-bold">AI Efficiency Gain</h3>
          </div>
          <div className="text-5xl font-extrabold text-primary">+18%</div>
          <p className="text-sm text-gray-400 mt-2">Reduction in heat exposure</p>
        </div>
        <div className="glass rounded-3xl p-6 col-span-1 lg:col-span-2 bg-red-500/5 border border-red-500/20">
          <div className="flex items-center gap-3 mb-4 text-red-500">
            <AlertTriangle size={24} />
            <h3 className="font-bold">Rider Safety Alerts</h3>
          </div>
          {weather.temperature > 40 ? (
            <p className="text-lg font-bold text-red-400">CRITICAL: Mandatory 15-min hydration breaks initiated for all riders in {weather.location}.</p>
          ) : (
            <p className="text-lg font-bold text-green-400">NORMAL: No immediate heat restrictions active.</p>
          )}
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-6">Live Route Analytics</h2>
      <div className="space-y-4">
        {routes.map(r => (
          <div key={r.id} className="glass p-4 rounded-xl flex items-center justify-between">
            <div>
              <h4 className="font-bold text-lg">{r.name}</h4>
              <p className="text-sm text-gray-400">Distance: {r.distanceKm}km | Time: {r.durationMins.toFixed(0)}m</p>
            </div>
            <div className="text-right">
              <div className="text-xs text-gray-400 uppercase">Exposure Index</div>
              <div className="text-2xl font-bold text-white">{r.averageHeatIndex.toFixed(1)}</div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );

  if (!isModal) {
    return <div className="h-full bg-background text-white">{content}</div>;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/60 backdrop-blur-sm">
      <motion.div 
        layoutId="logistics-card"
        className="w-full h-full max-w-6xl bg-[#0a0a0a] rounded-3xl border border-white/10 overflow-hidden relative shadow-2xl"
      >
        <div className="absolute inset-0 pointer-events-none scanline opacity-20" />
        {content}
      </motion.div>
    </div>
  );
};
