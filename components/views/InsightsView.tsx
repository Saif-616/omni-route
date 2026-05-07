"use client";

import React from "react";
import { motion } from "framer-motion";
import { X, Lightbulb, HelpCircle, Thermometer } from "lucide-react";
import { useRouter } from "next/navigation";

export const InsightsView = ({ isModal = false }: { isModal?: boolean }) => {
  const router = useRouter();

  const content = (
    <div className="p-6 md:p-10 h-full overflow-y-auto selection:bg-primary selection:text-black">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">RESEARCH & METHODOLOGY</h1>
          <div className="flex items-center gap-2 mt-1">
            <p className="text-gray-400">Technical Foundation & Strategic Intelligence</p>
            <span className="text-[10px] font-black bg-primary/20 text-primary px-2 py-0.5 rounded border border-primary/20 uppercase tracking-widest">Demo Mode</span>
          </div>
        </div>
        {isModal && (
          <button onClick={() => router.back()} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors border border-white/10">
            <X size={24} />
          </button>
        )}
      </div>

      {/* Main Hook Callout */}
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        className="mb-12 p-8 md:p-12 bg-primary/5 border-l-4 border-primary rounded-r-3xl relative overflow-hidden"
      >
        <div className="absolute top-4 right-4 opacity-10">
          <Thermometer size={80} className="text-primary" />
        </div>
        <p className="text-2xl md:text-4xl font-black text-white leading-tight relative z-10 italic">
          "Motorcycle couriers experience ambient temperatures <span className="text-primary underline decoration-primary/30 underline-offset-8">5–8°C hotter</span> than reported due to asphalt radiation."
        </p>
        <p className="mt-4 text-gray-500 font-bold uppercase tracking-widest text-xs">— Thermal Stress Analysis, Dubai 2026</p>
      </motion.div>

      {/* How It Works */}
      <div className="mb-16">
        <h2 className="text-xs font-black text-primary uppercase tracking-[0.3em] mb-8 text-center">System Orchestration: How It Works</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {[
            { step: "01", title: "Atmospheric Ingestion", desc: "We ingest NVIDIA Earth-2 atmospheric data at 200m resolution via G42's NANDA model." },
            { step: "02", title: "Spatial Overlay", desc: "We overlay RTA real-time traffic twins and hyper-local shade mapping onto the grid." },
            { step: "03", title: "Route Synthesis", desc: "Our Rider Comfort Engine recommends the safest, fastest route based on thermal cost." }
          ].map((item: { step: string; title: string; desc: string }, i: number) => (
            <div key={i} className="bg-white/5 border border-white/10 p-8 rounded-3xl group hover:border-primary/50 transition-colors">
              <div className="text-4xl font-black text-primary/20 mb-4 group-hover:text-primary/40 transition-colors">{item.step}</div>
              <h3 className="text-xl font-bold mb-3">{item.title}</h3>
              <p className="text-sm text-gray-400 leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>

      {/* Comparison Table */}
      <div className="mb-16">
        <h2 className="text-xs font-black text-primary uppercase tracking-[0.3em] mb-8 text-center">The Competitive Edge</h2>
        <div className="w-full border border-white/10 rounded-[2rem] overflow-hidden bg-black/40">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-white/5 border-b border-white/10">
                <th className="p-6 text-xs font-black text-gray-500 uppercase tracking-widest">Metric</th>
                <th className="p-6 text-xs font-black text-gray-500 uppercase tracking-widest">Traditional Routing</th>
                <th className="p-6 text-xs font-black text-primary uppercase tracking-widest">Omni-Route</th>
              </tr>
            </thead>
            <tbody>
              {[
                { m: "Data Used", t: "Standard GPS + Map Traffic", o: "Earth-2 Weather + RTA Digital Twins" },
                { m: "Heat Awareness", t: "None (Static/Ignored)", o: "Dynamic (200m Mesh Precision)" },
                { m: "Rider Safety Alerts", t: "General Weather Only", o: "Predictive Anomaly & Heat Spikes" },
                { m: "Optimization Factor", t: "Shortest Distance/Time", o: "Thermal Cost + Welfare ROI" }
              ].map((row: { m: string; t: string; o: string }, i: number) => (
                <tr key={i} className="border-b border-white/5 hover:bg-white/[0.02] transition-colors">
                  <td className="p-6 text-sm font-bold text-gray-300">{row.m}</td>
                  <td className="p-6 text-sm text-gray-500">{row.t}</td>
                  <td className="p-6 text-sm font-black text-primary drop-shadow-[0_0_10px_rgba(50,181,49,0.3)]">{row.o}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
        {/* Section: Methodology */}
        <div>
          <div className="flex items-center gap-3 mb-6 text-primary">
            <Lightbulb size={24} />
            <h2 className="text-xl font-bold">The Strategic Gap</h2>
          </div>
          <div className="prose prose-invert max-w-none text-gray-300 space-y-4 text-sm leading-relaxed">
            <p>
              Traditional delivery platforms route drivers based on a single metric: <strong>Speed</strong>. 
              In the UAE, this ignores a critical factor—the Urban Heat Island (UHI) effect.
            </p>
            <p>
              <strong>Omni-Route</strong> bridges the gap between traditional Dubai conglomerates and AI by 
              fusing atmospheric science with municipal infrastructure. 
            </p>
            <div className="p-6 bg-white/5 border border-primary/20 rounded-2xl mt-4">
              <h4 className="font-bold text-white mb-3 text-xs uppercase tracking-widest">Why it matters:</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  <span>Our <strong>Rider Comfort Engine</strong> actively maps the city's shade, tunnels, and wind corridors.</span>
                </li>
                <li className="flex items-start gap-3">
                  <div className="w-1.5 h-1.5 rounded-full bg-primary mt-1.5 shrink-0" />
                  <span>We trade off minimal time penalties for massive reductions in fleet thermal stress.</span>
                </li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 2: FAQ */}
        <div>
          <div className="flex items-center gap-3 mb-6 text-accent">
            <HelpCircle size={24} />
            <h2 className="text-xl font-bold">FAQ</h2>
          </div>
          <div className="space-y-4">
            {[
              { q: "Where does the weather data come from?", a: "We ingest data from NVIDIA Earth-2 CorrDiff models via G42, supplemented by street-level sensor networks like FortyGuard." },
              { q: "How often is traffic updated?", a: "Traffic is updated in real-time via Dubai Pulse APIs and RTA Clear Guide metrics." },
              { q: "What happens during a sandstorm?", a: "Our Anomaly Detection system recalculates ETA predictions and warns riders to adjust their speed or seek shelter if visibility drops below safe thresholds." },
              { q: "Is Omni-Route available for individual riders?", a: "Yes — riders can access the route planner directly at omni-route/nav for personal use." }
            ].map((faq: { q: string; a: string }, i: number) => (
              <div key={i} className="bg-white/5 p-5 rounded-2xl border border-white/5 group hover:border-white/10 transition-colors">
                <h4 className="font-bold text-white mb-2 text-sm">{faq.q}</h4>
                <p className="text-xs text-gray-400 leading-relaxed">{faq.a}</p>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  if (!isModal) {
    return <div className="h-full bg-background text-white">{content}</div>;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center p-4 md:p-8 bg-black/60 backdrop-blur-sm">
      <motion.div 
        layoutId="insights-card"
        className="w-full h-full max-w-6xl bg-[#0a0a0a] rounded-3xl border border-white/10 overflow-hidden relative shadow-2xl"
      >
        <div className="absolute inset-0 pointer-events-none scanline opacity-20" />
        {content}
      </motion.div>
    </div>
  );
};
