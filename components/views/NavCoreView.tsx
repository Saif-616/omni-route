"use client";

import { motion } from "framer-motion";
import { useOmniContext } from "@/lib/context/OmniContext";
import { X, Navigation, MapPin } from "lucide-react";
import { useRouter } from "next/navigation";
import { ThermalTrafficMap } from "@/components/map/ThermalTrafficMap";
import { MOCK_LOCATIONS } from "@/lib/api/earth2-mock";

export const NavCoreView = ({ isModal = false }: { isModal?: boolean }) => {
  const { location, setLocation, routes, selectedRouteId, weather } = useOmniContext();
  const router = useRouter();

  const content = (
    <div className="flex flex-col h-full bg-black relative">
      {/* Top Bar over map */}
      <div className="absolute top-0 inset-x-0 z-10 p-6 flex justify-between items-start pointer-events-none">
        <div className="bg-black/80 backdrop-blur-md p-4 rounded-2xl border border-white/10 pointer-events-auto max-w-sm w-full">
          <h2 className="text-xl font-bold mb-4 flex items-center gap-2"><Navigation size={20} className="text-primary"/> Plan a Drive</h2>
          
          <div className="space-y-3">
            <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-white/10">
              <MapPin size={16} className="text-gray-400" />
              <div className="text-sm">Current Location</div>
            </div>
            <div className="w-0.5 h-4 bg-white/20 ml-5" />
            <div className="flex items-center gap-3 bg-white/5 p-3 rounded-xl border border-primary/50">
              <MapPin size={16} className="text-primary" />
              <select 
                className="bg-transparent text-white text-sm w-full outline-none cursor-pointer"
                value={location.name}
                onChange={(e) => setLocation(MOCK_LOCATIONS.find(l => l.name === e.target.value) || MOCK_LOCATIONS[0])}
              >
                {MOCK_LOCATIONS.map(loc => (
                  <option key={loc.name} value={loc.name} className="bg-black">{loc.name}</option>
                ))}
              </select>
            </div>
          </div>
          
          <button className="w-full mt-4 bg-primary text-black font-bold py-3 rounded-xl hover:bg-primary/90 transition-colors shadow-neon">
            START NAVIGATION
          </button>
        </div>

        {isModal && (
          <button onClick={() => router.back()} className="p-3 bg-black/80 backdrop-blur-md rounded-full hover:bg-white/10 transition-colors border border-white/10 pointer-events-auto">
            <X size={24} />
          </button>
        )}
      </div>

      <div className="flex-1 w-full h-full">
        <ThermalTrafficMap center={location.coords} routes={routes} selectedRouteId={selectedRouteId} />
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
