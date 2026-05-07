"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { useOmniContext } from "@/lib/context/OmniContext";
import { OmniDashboard } from "@/components/dashboard/OmniDashboard";
import { ThermalTrafficMap } from "@/components/map/ThermalTrafficMap";
import { BentoCard } from "@/components/ui/BentoCard";
import { MapPin, Navigation, Clock, ShieldCheck, Info } from "lucide-react";
import { MOCK_LOCATIONS } from "@/lib/api/earth2-mock";

export default function Home() {
  const { location, setLocation, routes, selectedRouteId, setSelectedRouteId } = useOmniContext();

  return (
    <main className="flex-1 overflow-y-auto bg-[#070707] text-white selection:bg-primary selection:text-black scroll-smooth">
      {/* Mobile Header */}
      <header className="sticky top-0 z-40 bg-black/80 backdrop-blur-xl border-b border-white/10 px-6 py-4 flex items-center justify-between">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-primary shadow-neon flex items-center justify-center">
            <Navigation className="text-black" size={18} />
          </div>
          <h1 className="font-extrabold text-xl tracking-tight">OMNI<span className="text-primary">-ROUTE</span></h1>
          <span className="bg-primary/10 text-primary text-[10px] font-black px-2 py-0.5 rounded border border-primary/20 tracking-tighter uppercase">Demo</span>
        </div>
        <div className="flex items-center gap-4">
          <Link href="/insights" scroll={false} className="text-gray-400 hover:text-white transition-colors flex items-center gap-2 text-sm font-semibold">
            <Info size={16} /> <span className="hidden sm:inline">Research</span>
          </Link>
          <div className="flex items-center gap-2 text-sm bg-white/5 px-3 py-1.5 rounded-full border border-white/10">
            <MapPin size={14} className="text-primary" />
            <select 
              className="bg-transparent outline-none cursor-pointer font-bold"
              value={location.name}
              onChange={(e: React.ChangeEvent<HTMLSelectElement>) => setLocation(MOCK_LOCATIONS.find(l => l.name === e.target.value) || MOCK_LOCATIONS[0])}
            >
              {MOCK_LOCATIONS.map(loc => (
                <option key={loc.name} value={loc.name} className="bg-black">{loc.name}</option>
              ))}
            </select>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative pt-20 pb-16 px-6 overflow-hidden">
        <div className="max-w-4xl mx-auto text-center space-y-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight leading-tight">
              Smart routes for <br />
              <span className="text-primary drop-shadow-[0_0_20px_rgba(50,181,49,0.3)]">Dubai's heat.</span>
            </h1>
          </motion.div>

          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-xl md:text-2xl text-gray-400 max-w-2xl mx-auto font-medium leading-relaxed"
          >
            Omni-Route fuses real-time weather and traffic data to protect riders and speed up deliveries.
          </motion.p>

          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <p className="text-sm md:text-base text-gray-500 italic font-medium">
              "Motorcycle couriers experience up to 8°C more heat than reported. <span className="text-white not-italic font-bold">We fix that.</span>"
            </p>
          </motion.div>

          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="flex flex-col sm:flex-row items-center justify-center gap-4 pt-4"
          >
            <Link 
              href="/logistics" 
              className="w-full sm:w-auto px-8 py-4 bg-primary text-black font-black rounded-2xl shadow-neon hover:scale-105 transition-transform text-center uppercase tracking-widest text-sm"
            >
              I'm a Delivery Company
            </Link>
            <Link 
              href="/nav" 
              className="w-full sm:w-auto px-8 py-4 bg-white/5 border border-white/20 text-white font-bold rounded-2xl hover:bg-white/10 transition-colors text-center uppercase tracking-widest text-sm"
            >
              I'm a Rider
            </Link>
          </motion.div>
        </div>

        {/* Decorative Background Elements */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary/5 rounded-full blur-[120px] pointer-events-none" />
      </section>

      <div className="p-4 md:p-6 lg:p-8 max-w-7xl mx-auto space-y-12 md:space-y-20 pb-20">
        {/* Top Grid: Dashboard & 3D Weather */}
        <div className="space-y-6">
          <div className="flex items-center gap-4 px-2">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">Operational Intelligence</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6">
            <div className="lg:col-span-2">
              <OmniDashboard weather={useOmniContext().weather} routes={routes} selectedRouteId={selectedRouteId} />
            </div>
            <Link href="/insights" scroll={false}>
              <BentoCard delay={0.4} layoutId="insights-card" className="flex flex-col cursor-pointer h-full group">
                <div className="flex items-center gap-2 mb-2">
                  <h3 className="text-gray-400 font-bold uppercase tracking-widest text-xs group-hover:text-primary transition-colors">Research Intelligence</h3>
                  <span className="w-1.5 h-1.5 rounded-full bg-primary animate-pulse shadow-[0_0_8px_rgba(50,181,49,0.8)]" />
                </div>
                
                <p className="text-[11px] text-gray-500 leading-tight mb-6">
                  Powered by atmospheric AI models trained on UAE climate data.
                </p>

                <div className="flex-1 space-y-4 mb-8">
                  {[
                    { label: "Data Resolution", value: "200m hyper-local" },
                    { label: "Thermal Sources", value: "NVIDIA Earth-2 + FortyGuard" },
                    { label: "Route Recalculations", value: "Every 90 sec" }
                  ].map((stat, i) => (
                    <div key={i} className="flex justify-between items-center text-xs border-b border-white/5 pb-2">
                      <span className="text-gray-500 font-medium uppercase tracking-tighter">{stat.label}</span>
                      <span className="text-white font-bold">{stat.value}</span>
                    </div>
                  ))}
                </div>

                <div className="mt-auto pt-4 border-t border-white/5">
                  <p className="text-sm font-semibold text-primary group-hover:text-white transition-colors flex items-center gap-2">
                    View Research Base <Info size={14} />
                  </p>
                  <p className="text-[10px] text-gray-500 mt-1">Core Tech & Methodology</p>
                </div>
              </BentoCard>
            </Link>
          </div>
        </div>

        {/* Middle Grid: Map & Routes */}
        <div className="space-y-6">
          <div className="flex items-center gap-4 px-2">
            <div className="h-px flex-1 bg-white/10" />
            <span className="text-[10px] font-black text-gray-500 uppercase tracking-[0.3em]">Live Logistics Hub</span>
            <div className="h-px flex-1 bg-white/10" />
          </div>

          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4 md:gap-6 h-[700px] lg:h-[600px]">
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
                      onClick={(e: React.MouseEvent) => { e.preventDefault(); setSelectedRouteId(route.id); }}
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
      </div>

      {/* Footer */}
      <footer className="border-t border-white/5 py-12 px-6 bg-black/40 backdrop-blur-sm">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-6">
          <div className="flex items-center gap-2">
             <div className="w-6 h-6 rounded-full bg-primary/20 flex items-center justify-center">
                <Navigation className="text-primary" size={12} />
             </div>
             <span className="font-extrabold text-sm tracking-tight">OMNI<span className="text-primary">-ROUTE</span></span>
          </div>
          
          <div className="flex items-center gap-8">
            <Link href="/pitch" scroll={false} className="text-xs font-bold text-gray-500 hover:text-primary transition-colors tracking-widest uppercase">
              Investors & Partners → Launch Pitch Deck
            </Link>
            <span className="text-[10px] text-gray-700 font-bold uppercase tracking-widest">
              © 2026 Omni-Route Ecosystem
            </span>
          </div>
        </div>
      </footer>
    </main>
  );
}
