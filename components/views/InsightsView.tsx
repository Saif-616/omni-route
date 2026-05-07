"use client";

import { motion } from "framer-motion";
import { X, Lightbulb, HelpCircle } from "lucide-react";
import { useRouter } from "next/navigation";

export const InsightsView = ({ isModal = false }: { isModal?: boolean }) => {
  const router = useRouter();

  const content = (
    <div className="p-6 md:p-10 h-full overflow-y-auto">
      <div className="flex justify-between items-start mb-8">
        <div>
          <h1 className="text-3xl font-extrabold tracking-tight">THE FUTURE OF LOGISTICS</h1>
          <p className="text-gray-400">Insights & Knowledge Base</p>
        </div>
        {isModal && (
          <button onClick={() => router.back()} className="p-2 bg-white/10 rounded-full hover:bg-white/20 transition-colors">
            <X size={24} />
          </button>
        )}
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* Section 1: The Difference */}
        <div>
          <div className="flex items-center gap-3 mb-6 text-primary">
            <Lightbulb size={24} />
            <h2 className="text-xl font-bold">The Difference</h2>
          </div>
          <div className="prose prose-invert max-w-none text-gray-300 space-y-4">
            <p>
              Traditional delivery platforms route drivers based on a single metric: <strong>Speed</strong>. 
              In the UAE, this ignores a critical factor—the Urban Heat Island (UHI) effect.
            </p>
            <p>
              <strong>Omni-Route</strong> bridges the gap between traditional Dubai conglomerates and AI by 
              fusing NVIDIA Earth-2's 200m resolution atmospheric data with the RTA's real-time traffic 
              twins. 
            </p>
            <div className="p-4 bg-white/5 border border-primary/30 rounded-xl mt-4">
              <h4 className="font-bold text-white mb-2">Why it matters:</h4>
              <ul className="list-disc pl-5 space-y-1 text-sm">
                <li>Motorcycle couriers experience ambient temperatures 5-8°C hotter than reported due to asphalt radiation.</li>
                <li>Our <strong>Rider Comfort Engine</strong> actively maps the city's shade, tunnels, and wind corridors.</li>
                <li>We trade off minimal time penalties for massive reductions in fleet thermal stress.</li>
              </ul>
            </div>
          </div>
        </div>

        {/* Section 2: FAQ */}
        <div>
          <div className="flex items-center gap-3 mb-6 text-accent">
            <HelpCircle size={24} />
            <h2 className="text-xl font-bold">Frequently Asked Questions</h2>
          </div>
          <div className="space-y-4">
            {[
              { q: "Where does the weather data come from?", a: "We ingest data from NVIDIA Earth-2 CorrDiff models via G42, supplemented by street-level sensor networks like FortyGuard." },
              { q: "How often is traffic updated?", a: "Traffic is updated in real-time via Dubai Pulse APIs and RTA Clear Guide metrics." },
              { q: "What happens during a sandstorm?", a: "Our Anomaly Detection system recalculates ETA predictions and warns riders to adjust their speed or seek shelter if visibility drops below safe thresholds." }
            ].map((faq, i) => (
              <div key={i} className="glass p-4 rounded-xl border border-white/5">
                <h4 className="font-bold text-white mb-2">{faq.q}</h4>
                <p className="text-sm text-gray-400">{faq.a}</p>
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
