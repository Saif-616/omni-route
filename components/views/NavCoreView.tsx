"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useOmniContext } from "@/lib/context/OmniContext";
import { X, Navigation, MapPin, Wind, Droplets, Sun, Thermometer, ShieldCheck, AlertTriangle, Clock, ArrowRight } from "lucide-react";
import { useRouter } from "next/navigation";
import { ThermalTrafficMap } from "@/components/map/ThermalTrafficMap";

const DUBAI_ZONES = [
  "Downtown Dubai",
  "DIFC",
  "JLT",
  "Dubai Marina",
  "Deira",
  "Business Bay"
];

export const NavCoreView = ({ isModal = false }: { isModal?: boolean }) => {
  const { location, routes, selectedRouteId, weather } = useOmniContext();
  const [isPlanned, setIsPlanned] = useState(false);
  const [destination, setDestination] = useState(DUBAI_ZONES[0]);
  const router = useRouter();

  const handlePlanRoute = () => {
    setIsPlanned(true);
  };

  const content = (
    <div className="flex flex-col h-full bg-black relative overflow-hidden">
      {/* Background Map */}
      <div className="absolute inset-0 z-0">
        <ThermalTrafficMap center={location.coords} routes={routes} selectedRouteId={selectedRouteId} />
      </div>

      {/* Overlays */}
      <div className="relative z-10 p-4 md:p-6 flex flex-col h-full pointer-events-none">
        {/* Header/Input Section */}
        <div className="flex justify-between items-start w-full">
          <motion.div 
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            className="bg-black/90 backdrop-blur-xl p-6 rounded-3xl border border-white/10 pointer-events-auto w-full max-w-sm shadow-2xl"
          >
            <h2 className="text-xl font-black mb-6 flex items-center gap-2 uppercase tracking-tight">
              <Navigation size={22} className="text-primary"/> Plan a Drive
            </h2>
            
            <div className="space-y-4">
              <div className="space-y-1">
                <label className="text-[10px] font-black text-gray-500 uppercase tracking-widest ml-1">Origin</label>
                <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/10 opacity-70">
                  <div className="w-2 h-2 rounded-full bg-blue-500 animate-pulse" />
                  <div className="text-sm font-bold text-gray-300">Current Location</div>
                </div>
              </div>

              <div className="space-y-1">
                <label className="text-[10px] font-black text-primary uppercase tracking-widest ml-1">Destination</label>
                <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-primary/40 focus-within:border-primary transition-colors">
                  <MapPin size={18} className="text-primary" />
                  <select 
                    className="bg-transparent text-white text-sm w-full outline-none cursor-pointer font-bold"
                    value={destination}
                    onChange={(e) => setDestination(e.target.value)}
                  >
                    {DUBAI_ZONES.map(zone => (
                      <option key={zone} value={zone} className="bg-black">{zone}</option>
                    ))}
                  </select>
                </div>
              </div>
            </div>
            
            <button 
              onClick={handlePlanRoute}
              className="w-full mt-6 bg-primary text-black font-black py-4 rounded-xl hover:scale-[1.02] active:scale-[0.98] transition-all shadow-neon uppercase tracking-widest text-sm"
            >
              Plan Route
            </button>
          </motion.div>

          {isModal && (
            <button onClick={() => router.back()} className="p-3 bg-black/80 backdrop-blur-md rounded-full hover:bg-white/10 transition-colors border border-white/10 pointer-events-auto">
              <X size={24} />
            </button>
          )}
        </div>

        {/* Results Panel */}
        <AnimatePresence>
          {isPlanned && (
            <motion.div 
              initial={{ y: 50, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 50, opacity: 0 }}
              className="mt-auto pointer-events-auto flex flex-col gap-4 w-full"
            >
              {/* Weather Strip */}
              <div className="flex items-center justify-around bg-black/90 backdrop-blur-xl p-4 rounded-2xl border border-white/10 overflow-x-auto gap-8">
                <div className="flex items-center gap-3">
                  <Thermometer className="text-orange-500" size={20} />
                  <div>
                    <div className="text-[10px] font-black text-gray-500 uppercase">Temp</div>
                    <div className="text-sm font-black">42.4°C</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Droplets className="text-blue-400" size={20} />
                  <div>
                    <div className="text-[10px] font-black text-gray-500 uppercase">Humidity</div>
                    <div className="text-sm font-black">18%</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Sun className="text-yellow-400" size={20} />
                  <div>
                    <div className="text-[10px] font-black text-gray-500 uppercase">UV Index</div>
                    <div className="text-sm font-black text-red-500">11 (EXTREME)</div>
                  </div>
                </div>
                <div className="flex items-center gap-3">
                  <Wind className="text-primary" size={20} />
                  <div>
                    <div className="text-[10px] font-black text-gray-500 uppercase">Wind</div>
                    <div className="text-sm font-black">14 km/h</div>
                  </div>
                </div>
              </div>

              {/* Route Comparison */}
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {/* Route A */}
                <div className="bg-black/90 backdrop-blur-xl p-6 rounded-3xl border border-white/10 relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4">
                    <span className="text-[10px] font-black text-red-500/50 uppercase tracking-[0.2em]">Route A</span>
                  </div>
                  <h3 className="text-xl font-bold mb-1">Direct Path</h3>
                  <p className="text-xs text-gray-500 mb-4 font-bold uppercase tracking-widest">Via Sheikh Zayed Road</p>
                  
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="bg-white/5 px-3 py-2 rounded-xl">
                        <div className="text-[10px] font-black text-gray-500 uppercase">Time</div>
                        <div className="text-lg font-black text-white">12m</div>
                      </div>
                      <div className="bg-white/5 px-3 py-2 rounded-xl">
                        <div className="text-[10px] font-black text-gray-500 uppercase">Dist</div>
                        <div className="text-lg font-black text-white">8.4km</div>
                      </div>
                    </div>
                    <div className="text-right">
                       <div className="text-[10px] font-black text-red-400 uppercase mb-1">Exposure Index</div>
                       <div className="text-3xl font-black text-red-500">84</div>
                    </div>
                  </div>

                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2 text-xs text-gray-400 font-medium">
                      <AlertTriangle size={14} className="text-red-500" /> 85% Unshaded asphalt exposure
                    </li>
                    <li className="flex items-center gap-2 text-xs text-gray-400 font-medium">
                      <AlertTriangle size={14} className="text-red-500" /> High asphalt radiation (UHI)
                    </li>
                    <li className="flex items-center gap-2 text-xs text-gray-400 font-medium">
                      <Clock size={14} className="text-gray-500" /> Minimal traffic delays
                    </li>
                  </ul>

                  <button className="w-full py-3 rounded-xl border border-white/10 text-xs font-black uppercase tracking-widest hover:bg-white/5 transition-colors">
                    Select Direct
                  </button>
                </div>

                {/* Route B */}
                <div className="bg-black/95 backdrop-blur-xl p-6 rounded-3xl border border-primary/40 shadow-[0_0_40px_rgba(50,181,49,0.15)] relative overflow-hidden group">
                  <div className="absolute top-0 right-0 p-4 flex items-center gap-2">
                    <ShieldCheck size={14} className="text-primary" />
                    <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em]">Recommended</span>
                  </div>
                  <h3 className="text-xl font-bold mb-1">Shaded Corridor</h3>
                  <p className="text-xs text-primary/70 mb-4 font-bold uppercase tracking-widest">Optimized for Comfort</p>
                  
                  <div className="flex items-center justify-between mb-6">
                    <div className="flex items-center gap-4">
                      <div className="bg-primary/10 px-3 py-2 rounded-xl border border-primary/20">
                        <div className="text-[10px] font-black text-primary/70 uppercase">Time</div>
                        <div className="text-lg font-black text-white">16m</div>
                      </div>
                      <div className="bg-primary/10 px-3 py-2 rounded-xl border border-primary/20">
                        <div className="text-[10px] font-black text-primary/70 uppercase">Dist</div>
                        <div className="text-lg font-black text-white">10.2km</div>
                      </div>
                    </div>
                    <div className="text-right">
                       <div className="text-[10px] font-black text-primary uppercase mb-1 text-shadow-neon">Exposure Index</div>
                       <div className="text-3xl font-black text-primary drop-shadow-neon">42</div>
                    </div>
                  </div>

                  <ul className="space-y-2 mb-6">
                    <li className="flex items-center gap-2 text-xs text-gray-300 font-medium">
                      <ShieldCheck size={14} className="text-primary" /> Passes through 3 shaded tunnels
                    </li>
                    <li className="flex items-center gap-2 text-xs text-gray-300 font-medium">
                      <ShieldCheck size={14} className="text-primary" /> Coastal wind corridor active
                    </li>
                    <li className="flex items-center gap-2 text-xs text-gray-300 font-medium">
                      <ShieldCheck size={14} className="text-primary" /> 60% building-shade coverage
                    </li>
                  </ul>

                  <button className="w-full py-3 rounded-xl bg-primary text-black text-xs font-black uppercase tracking-widest hover:scale-[1.02] transition-transform shadow-neon">
                    Start Shaded Route
                  </button>
                </div>
              </div>

              {/* Bottom Tip */}
              <div className="bg-primary/5 border border-primary/20 p-3 rounded-xl flex items-center justify-center gap-3 text-[10px] md:text-xs font-bold text-primary/80 uppercase tracking-widest">
                 <Droplets size={16} className="text-primary animate-pulse" />
                 Omni-Route recommends hydration breaks every 45 minutes when exposure index exceeds 60.
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );

  if (!isModal) {
    return <div className="h-full w-full">{content}</div>;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md">
      <motion.div 
        layoutId="nav-card"
        className="w-full h-full bg-[#0a0a0a] overflow-hidden relative"
      >
        <div className="absolute inset-0 pointer-events-none scanline opacity-20 z-50" />
        {content}
      </motion.div>
    </div>
  );
};
