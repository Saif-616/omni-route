"use client";

import { motion } from "framer-motion";
import { useOmniContext } from "@/lib/context/OmniContext";
import { X, CloudRain, CloudFog, Waves, AlertOctagon } from "lucide-react";
import { useRouter } from "next/navigation";

export const AnomalyView = ({ isModal = false }: { isModal?: boolean }) => {
  const { weather } = useOmniContext();
  const router = useRouter();

  if (!weather) return null;

  const content = (
    <div className="p-6 md:p-10 h-full overflow-y-auto">
      <div className="flex justify-between items-start mb-8">
        <div>
          <div className="flex items-center gap-4 mb-2">
            <button onClick={() => router.push('/')} className="px-3 py-1.5 bg-white/10 hover:bg-white/20 text-white rounded-lg transition-colors flex items-center gap-2 text-sm font-bold border border-white/10">
              <X size={16} /> Close
            </button>
            <h1 className="text-3xl font-extrabold tracking-tight text-red-500">ANOMALY DETECTOR</h1>
          </div>
          <p className="text-gray-400">Extreme Weather & Risk Matrix</p>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
        <div className="glass rounded-3xl p-6 border-blue-500/30">
          <div className="flex items-center gap-3 mb-4 text-blue-400">
            <CloudRain size={24} />
            <h3 className="font-bold">Rainfall Risk</h3>
          </div>
          <div className="text-2xl font-bold text-white">{weather.anomalies.rainfallRisk}</div>
          <p className="text-xs text-gray-400 mt-2">Monitored via NCM Cloud Seeding Data</p>
        </div>

        <div className="glass rounded-3xl p-6 border-cyan-500/30">
          <div className="flex items-center gap-3 mb-4 text-cyan-400">
            <Waves size={24} />
            <h3 className="font-bold">Flash Flood Risk</h3>
          </div>
          <div className="text-2xl font-bold text-white">{weather.anomalies.floodRisk}</div>
          <p className="text-xs text-gray-400 mt-2">Drainage capacity vs precipitation rate</p>
        </div>

        <div className="glass rounded-3xl p-6 border-gray-400/30">
          <div className="flex items-center gap-3 mb-4 text-gray-400">
            <CloudFog size={24} />
            <h3 className="font-bold">Coastal Fog Risk</h3>
          </div>
          <div className="text-2xl font-bold text-white">{weather.anomalies.fogRisk}</div>
          <p className="text-xs text-gray-400 mt-2">Visibility constraints on key highways</p>
        </div>
      </div>

      <div className="glass p-6 rounded-3xl border border-red-500/20 bg-red-500/5">
         <div className="flex items-center gap-3 mb-4 text-red-500">
            <AlertOctagon size={24} />
            <h3 className="font-bold text-lg">Current Directives</h3>
         </div>
         <p className="text-white">
           {weather.sandstormRisk === 'High' 
             ? "SEVERE SANDSTORM: Restrict two-wheelers from open highways (e.g. E11). Re-route deliveries to internal roads only." 
             : "No extreme multi-hazard warnings active for " + weather.location + "."}
         </p>
      </div>
    </div>
  );

  if (!isModal) {
    return <div className="h-full bg-background text-white">{content}</div>;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/60 backdrop-blur-sm">
      <motion.div 
        layoutId="anomaly-card"
        className="w-full h-full max-w-5xl bg-[#0a0a0a] rounded-3xl border border-white/10 overflow-hidden relative shadow-2xl"
      >
        <div className="absolute inset-0 pointer-events-none scanline opacity-20" />
        {content}
      </motion.div>
    </div>
  );
};
