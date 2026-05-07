"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useOmniContext } from "@/lib/context/OmniContext";
import { OmniDashboard } from "@/components/dashboard/OmniDashboard";
import { ThermalTrafficMap } from "@/components/map/ThermalTrafficMap";
import { WeatherIcon3D } from "@/components/weather/WeatherIcon3D";
import { BentoCard } from "@/components/ui/BentoCard";
import { MapPin, Navigation, Clock, ShieldCheck, Info } from "lucide-react";
import { MOCK_LOCATIONS } from "@/lib/api/earth2-mock";

export default function Home() {
  const { location, setLocation, routes, selectedRouteId, setSelectedRouteId } = useOmniContext();

  return (
    <main className="flex-1 overflow-y-auto bg-[#070707] text-white selection:bg-primary selection:text-black">
      {/* Mobile Header */}
      <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-xl border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary shadow-neon flex items-center justify-center">
            <Navigation className="text-black" size={18} />
          </div>
          <h1 className="font-extrabold text-xl tracking-tight">OMNI<span className="text-primary">-ROUTE</span></h1>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/insights" scroll={false} className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm font-semibold">
            <Info size={16} /> <span className="hidden sm:inline">Research</span>
          </Link>
          <Link href="/pitch" scroll={false} className="text-primary hover:text-white transition-colors flex items-center gap-2 text-sm font-bold bg-primary/10 hover:bg-primary/20 px-4 py-2 rounded-full border border-primary/30 shadow-neon">
            <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
            <span className="hidden sm:inline">LAUNCH PITCH DECK</span>
          </Link>
          <div className="flex items-center gap-2 text-sm bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
            <MapPin size={14} className="text-primary" />
            <select 
              className="bg-transparent outline-none cursor-pointer"
              value={location.name}
              onChange={(e) => setLocation(MOCK_LOCATIONS.find(l => l.name === e.target.value) || MOCK_LOCATIONS[0])}
            >
              {MOCK_LOCATIONS.map(loc => (
                <option key={loc.name} value={loc.name} className="bg-black">{loc.name}</option>
              ))}
            </select>
          </div>
        </div>
      </header>

      <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-4 md:space-y-6">
        {/* Top Grid: Dashboard & 3D Weather */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
          <div className="lg:col-span-2">
            <OmniDashboard weather={useOmniContext().weather} routes={routes} selectedRouteId={selectedRouteId} />
          </div>
          <Link href="/insights" scroll={false}>
            <BentoCard delay={0.4} layoutId="insights-card" className="flex flex-col items-center justify-center min-h-[250px] cursor-pointer h-full group text-center">
              <h3 className="text-gray-400 font-bold mb-2 uppercase tracking-widest text-xs group-hover:text-primary transition-colors">Research Intelligence</h3>
              <WeatherIcon3D />
              <div className="mt-4 flex flex-col items-center">
                <p className="text-sm font-semibold text-primary group-hover:text-white transition-colors flex items-center justify-center gap-2">View Research Base <Info size={14} /></p>
                <p className="text-xs text-gray-500 mt-1">Core Tech & Methodology</p>
              </div>
            </BentoCard>
          </Link>
        </div>

        {/* Middle Grid: Map & Routes */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 h-[600px]">
          {/* Routes Panel */}
          <div className="flex flex-col gap-4 overflow-y-auto pr-2">
            <div className="flex justify-between items-center px-2">
              <h2 className="text-xl font-bold">Rider Comfort Engine</h2>
              <Link href="/logistics" scroll={false} className="text-xs font-bold text-primary hover:underline">
                View Fleet Hub
              </Link>
            </div>
            
            <Link href="/logistics" scroll={false}>
              <motion.div layoutId="logistics-card" className="space-y-4">
                {routes.map((route, i) => (
                  <BentoCard 
                    key={route.id}
                    delay={0.5 + (i * 0.1)}
                    glowColor={route.id === selectedRouteId ? "primary" : "none"}
                    className={`cursor-pointer transition-all ${route.id !== selectedRouteId ? 'opacity-60 hover:opacity-100' : ''}`}
                    onClick={(e) => { e.preventDefault(); setSelectedRouteId(route.id); }}
                  >
                    <div className="flex justify-between items-start mb-2">
                      <h3 className="font-bold text-lg">{route.name}</h3>
                      {route.isCoolest && (
                        <span className="bg-primary/20 text-primary text-xs px-2 py-1 rounded-md font-bold flex items-center gap-1">
                          <ShieldCheck size={14} /> COOLEST
                        </span>
                      )}
                      {route.isShortest && !route.isCoolest && (
                        <span className="bg-white/10 text-white text-xs px-2 py-1 rounded-md font-bold">
                          SHORTEST
                        </span>
                      )}
                    </div>
                    
                    <div className="grid grid-cols-2 gap-2 mt-4 text-sm">
                      <div className="bg-black/40 rounded-lg p-2 flex items-center gap-2">
                        <Clock size={16} className="text-gray-400" />
                        <span className="font-semibold">{Math.round(route.durationMins)} min</span>
                      </div>
                      <div className="bg-black/40 rounded-lg p-2 flex items-center gap-2">
                        <Navigation size={16} className="text-gray-400" />
                        <span className="font-semibold">{route.distanceKm} km</span>
                      </div>
                      <div className="bg-black/40 rounded-lg p-2 flex items-center gap-2 col-span-2">
                        <span className="text-xs text-gray-500 w-full flex justify-between">
                          Heat Index 
                          <span className={`font-bold ${route.isCoolest ? 'text-primary' : 'text-red-400'}`}>
                            {route.averageHeatIndex.toFixed(1)}
                          </span>
                        </span>
                      </div>
                    </div>
                  </BentoCard>
                ))}
              </motion.div>
            </Link>

            {/* Traffic Control Section */}
            <div className="mt-4">
              <h2 className="text-xl font-bold px-2 mb-4">Traffic Control</h2>
              <BentoCard delay={0.7} className="border-orange-500/30 bg-orange-500/5">
                <div className="flex items-center justify-between mb-2">
                   <h3 className="font-bold text-gray-300">Live Congestion</h3>
                   <span className="text-xs font-bold text-orange-400 bg-orange-400/20 px-2 py-1 rounded-md">MODERATE</span>
                </div>
                <div className="text-sm text-gray-400 mb-3">
                   RTA Clear Guide metrics indicate a 12% delay on primary routes.
                </div>
                <div className="w-full bg-white/10 h-2 rounded-full overflow-hidden">
                   <div className="bg-orange-500 h-full w-[65%]" />
                </div>
              </BentoCard>
            </div>
          </div>


          {/* Map View */}
          <Link href="/nav" scroll={false} className="lg:col-span-2 h-full block">
            <motion.div layoutId="nav-card" className="h-full rounded-3xl overflow-hidden border border-white/10 shadow-2xl relative cursor-pointer group">
              <div className="absolute top-4 left-4 z-10 pointer-events-none">
                <span className="bg-black/80 backdrop-blur px-3 py-1.5 rounded-lg text-xs font-bold border border-white/10 flex items-center gap-2 group-hover:border-primary/50 transition-colors">
                  <span className="w-2 h-2 rounded-full bg-primary animate-pulse" />
                  LIVE THERMAL-TRAFFIC
                </span>
              </div>
              <div className="absolute inset-0 bg-black/0 group-hover:bg-primary/5 transition-colors z-[5] pointer-events-none flex items-center justify-center">
                <div className="opacity-0 group-hover:opacity-100 bg-black/80 text-white font-bold px-4 py-2 rounded-full border border-primary/50 backdrop-blur transition-opacity shadow-neon">
                  Expand Map
                </div>
              </div>
              <div className="pointer-events-none h-full w-full">
                <ThermalTrafficMap center={location.coords} routes={routes} selectedRouteId={selectedRouteId} />
              </div>
            </motion.div>
          </Link>
        </div>
      </div>
    </main>
  );
}
