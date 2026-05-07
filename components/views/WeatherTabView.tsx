"use client";

import { motion } from "framer-motion";
import { useOmniContext } from "@/lib/context/OmniContext";
import { X, ThermometerSun, Wind, Droplets } from "lucide-react";
import { useRouter } from "next/navigation";

export const WeatherTabView = ({ isModal = false }: { isModal?: boolean }) => {
  const { weather } = useOmniContext();
  const router = useRouter();

  if (!weather) return null;

  const content = (
    <div className="p-6 md:p-10 h-full overflow-y-auto">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">ATMOSPHERIC CORE</h1>
          <p className="text-gray-400">NVIDIA Earth-2 CorrDiff 200m Resolution</p>
        </div>
        {isModal && (
          <button onClick={() => router.back()} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
            <X size={24} />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="glass rounded-3xl p-6 border-primary/30 shadow-neon">
          <div className="flex items-center gap-3 mb-4 text-primary">
            <ThermometerSun size={24} />
            <h3 className="font-bold">Current Ambient</h3>
          </div>
          <div className="text-5xl font-extrabold">{weather.temperature.toFixed(1)}°C</div>
        </div>
        <div className="glass rounded-3xl p-6">
          <div className="flex items-center gap-3 mb-4 text-blue-400">
            <Droplets size={24} />
            <h3 className="font-bold">Humidity Level</h3>
          </div>
          <div className="text-5xl font-extrabold">{weather.humidity.toFixed(0)}%</div>
          {weather.humidity > 60 && <p className="text-red-400 text-sm mt-2">Spike Detected</p>}
        </div>
        <div className="glass rounded-3xl p-6">
          <div className="flex items-center gap-3 mb-4 text-orange-400">
            <Wind size={24} />
            <h3 className="font-bold">Sandstorm Risk</h3>
          </div>
          <div className="text-5xl font-extrabold">{weather.sandstormRisk}</div>
        </div>
      </div>

      <h2 className="text-2xl font-bold mt-10 mb-6">24-Hour Predictive Heat Map</h2>
      <div className="glass rounded-3xl p-6 flex items-end gap-2 h-64 overflow-x-auto">
        {weather.hourlyForecast?.map((h, i) => (
          <div key={i} className="flex flex-col items-center flex-1 min-w-[30px]">
            <div className="text-xs text-gray-400 mb-2">{h.temp.toFixed(0)}°</div>
            <motion.div 
              initial={{ height: 0 }}
              animate={{ height: `${(h.heatIndex / 55) * 100}%` }}
              className="w-full bg-gradient-to-t from-orange-500/20 to-red-500 rounded-t-sm"
            />
            <div className="text-xs text-gray-500 mt-2">{h.hour}:00</div>
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
        layoutId="weather-card"
        className="w-full h-full max-w-6xl bg-[#0a0a0a] rounded-3xl border border-white/10 overflow-hidden relative shadow-2xl"
      >
        <div className="absolute inset-0 pointer-events-none scanline opacity-20" />
        {content}
      </motion.div>
    </div>
  );
};
