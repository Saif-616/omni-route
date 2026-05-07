"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { X, ChevronLeft, ChevronRight, Activity, Cpu, Globe2, TrendingUp, ShieldCheck } from "lucide-react";
import { useRouter } from "next/navigation";
import { useOmniContext } from "@/lib/context/OmniContext";
import { ThermalTrafficMap } from "@/components/map/ThermalTrafficMap";
import { OmniDashboard } from "@/components/dashboard/OmniDashboard";

// 12 Slides content mapping
const slides = [
  { id: "title", component: SlideTitle },
  { id: "opportunity", component: SlideOpportunity },
  { id: "problem", component: SlideProblem },
  { id: "solution", component: SlideSolution },
  { id: "tech", component: SlideTechStack },
  { id: "resolution", component: SlideResolution },
  { id: "ecosystem", component: SlideEcosystem },
  { id: "market", component: SlideMarket },
  { id: "competition", component: SlideCompetition },
  { id: "roadmap", component: SlideRoadmap },
  { id: "vision", component: SlideVision },
  { id: "launch", component: SlideLaunch }
];

export const PitchDeckView = ({ isModal = false }: { isModal?: boolean }) => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === "ArrowRight" || e.key === "Space") {
        setCurrentSlide((prev: number) => Math.min(prev + 1, slides.length - 1));
      } else if (e.key === "ArrowLeft") {
        setCurrentSlide((prev: number) => Math.max(prev - 1, 0));
      } else if (e.key === "Escape" && isModal) {
        router.back();
      }
    };
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [isModal, router]);

  const SlideComponent = slides[currentSlide].component;

  const content = (
    <div className="w-full h-full relative overflow-hidden bg-[#070707] text-white flex flex-col font-sans">
      {/* Header Controls */}
      <div className="absolute top-0 left-0 right-0 z-50 p-6 flex justify-between items-center pointer-events-none">
        <div className="flex items-center gap-3 pointer-events-auto">
          <div className="w-8 h-8 rounded-full bg-primary shadow-neon flex items-center justify-center">
            <Globe2 className="text-black" size={18} />
          </div>
          <div className="flex flex-col">
            <span className="font-extrabold text-xl tracking-tight leading-none">OMNI<span className="text-primary">-ROUTE</span></span>
            <span className="text-[10px] font-black text-primary uppercase tracking-[0.2em] mt-1">Interactive Demo</span>
          </div>
        </div>
        <div className="flex items-center gap-4 pointer-events-auto">
          <button 
            onClick={() => router.push("/")} 
            className="px-4 py-2 bg-white/5 hover:bg-white/10 rounded-full transition-all border border-white/10 text-xs font-bold tracking-widest uppercase flex items-center gap-2"
          >
            Exit to Dashboard
          </button>
          {isModal && (
            <button onClick={() => router.back()} className="p-3 bg-white/5 hover:bg-white/10 rounded-full transition-colors border border-white/10 backdrop-blur">
              <X size={20} />
            </button>
          )}
        </div>
      </div>

      {/* Main Slide Area */}
      <div className="flex-1 relative flex items-center justify-center p-8 mt-16 overflow-hidden">
        <AnimatePresence mode="wait">
          <motion.div
            key={currentSlide}
            initial={{ opacity: 0, scale: 0.95, rotateY: 90 }}
            animate={{ opacity: 1, scale: 1, rotateY: 0 }}
            exit={{ opacity: 0, scale: 1.05, rotateY: -90 }}
            transition={{ duration: 0.6, type: "spring", bounce: 0.3 }}
            className="w-full max-w-6xl h-full flex flex-col items-center justify-center relative origin-center perspective-1000"
          >
            <SlideComponent />
          </motion.div>
        </AnimatePresence>
      </div>

      {/* Footer Navigation */}
      <div className="absolute bottom-0 left-0 right-0 z-50 p-6 flex justify-between items-center pointer-events-none">
        <div className="text-sm font-bold text-gray-500 tracking-widest uppercase">
          Slide {currentSlide + 1} / {slides.length}
        </div>
        <div className="flex gap-4 pointer-events-auto">
          <button 
            onClick={() => setCurrentSlide((prev: number) => Math.max(prev - 1, 0))}
            disabled={currentSlide === 0}
            className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-primary/20 hover:text-primary hover:border-primary/50 disabled:opacity-30 transition-all"
          >
            <ChevronLeft size={24} />
          </button>
          <button 
            onClick={() => setCurrentSlide((prev: number) => Math.min(prev + 1, slides.length - 1))}
            disabled={currentSlide === slides.length - 1}
            className="p-3 rounded-full bg-white/5 border border-white/10 hover:bg-primary/20 hover:text-primary hover:border-primary/50 disabled:opacity-30 transition-all shadow-[0_0_15px_rgba(50,181,49,0.3)]"
          >
            <ChevronRight size={24} />
          </button>
        </div>
      </div>
    </div>
  );

  if (!isModal) {
    return <div className="h-screen w-full">{content}</div>;
  }

  return (
    <div className="fixed inset-0 z-[100] flex items-center justify-center bg-black/80 backdrop-blur-md">
      <motion.div 
        layoutId="insights-card"
        className="w-[95vw] h-[95vh] rounded-[2rem] overflow-hidden shadow-2xl border border-white/10"
      >
        {content}
      </motion.div>
    </div>
  );
};

// --- SLIDES COMPONENTS ---

function SlideTitle() {
  return (
    <div className="text-center space-y-6">
      <h1 className="text-7xl md:text-9xl font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-primary to-green-700 drop-shadow-[0_0_25px_rgba(50,181,49,0.5)]">
        OMNI-ROUTE
      </h1>
      <p className="text-2xl md:text-3xl text-gray-300 font-light">Bridging the AI Implementation Gap in Dubai Logistics</p>
      <div className="mt-12 inline-block px-6 py-2 border border-primary/30 rounded-full bg-primary/10 text-primary font-bold tracking-widest text-sm uppercase shadow-neon">
        Powered by NVIDIA Earth-2 & G42 Research
      </div>
    </div>
  );
}

function SlideOpportunity() {
  return (
    <div className="text-center max-w-4xl">
      <h2 className="text-5xl md:text-7xl font-extrabold text-primary mb-12">THE OPPORTUNITY</h2>
      <p className="text-3xl md:text-5xl leading-tight font-light text-white">
        70% of UAE enterprises are piloting AI,<br/>
        <span className="text-gray-500">yet only</span> <span className="text-primary font-bold">7%</span> <span className="text-gray-500">achieve measurable ROI.</span>
      </p>
      <p className="text-2xl mt-12 text-gray-400 font-semibold tracking-wide">
        We are here to bridge that <span className="text-white">63% gap.</span>
      </p>
    </div>
  );
}

function SlideProblem() {
  return (
    <div className="flex flex-col md:flex-row items-center gap-12 max-w-6xl w-full">
      <div className="flex-1 space-y-8">
        <h2 className="text-4xl md:text-6xl font-extrabold text-white border-l-4 border-primary pl-6">THE INVISIBLE BARRIER</h2>
        <p className="text-xl text-gray-300">Dubai's climate isn't just a weather fact; it's a <span className="text-primary font-bold">logistics bottleneck.</span></p>
        <ul className="space-y-4 text-lg text-gray-400">
          <li className="flex items-start gap-3"><X className="text-red-500 mt-1 shrink-0" /> Extreme heat spikes impact rider safety & delivery speed.</li>
          <li className="flex items-start gap-3"><X className="text-red-500 mt-1 shrink-0" /> Hyper-local fog (detected at 200m) causes fatal delays.</li>
          <li className="flex items-start gap-3"><X className="text-red-500 mt-1 shrink-0" /> Traditional apps ignore "Thermal Stress" variables.</li>
          <li className="flex items-start gap-3"><X className="text-red-500 mt-1 shrink-0" /> Siloed traffic data prevents real-time "Green Wave" routing.</li>
        </ul>
      </div>
      <div className="flex-1 w-full bg-white/5 border border-white/10 rounded-3xl p-8 relative overflow-hidden group">
         <div className="absolute inset-0 bg-primary/5 opacity-0 group-hover:opacity-100 transition-opacity" />
         <img src="https://scootup.ae/cdn/shop/articles/E-Scooter_Safety_Gear___What_Dubai_Riders_Need.jpg?v=1744650840&width=1024" alt="Rider Gear" className="rounded-xl w-full object-cover shadow-2xl mix-blend-screen" />
      </div>
    </div>
  );
}

function SlideSolution() {
  return (
    <div className="text-center w-full max-w-6xl">
      <h2 className="text-4xl md:text-6xl font-extrabold text-white border-l-4 border-primary pl-6 text-left mb-16">THE SOLUTION: OMNI-ROUTE</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
        {[
          { icon: <Cpu size={48} />, title: "ADVANCED SCIENCE", desc: "NVIDIA Earth-2 CorrDiff data for meter-level weather precision." },
          { icon: <Activity size={48} />, title: "DAILY UTILITY", desc: "A B2B SaaS platform that turns raw AI data into rider comfort and speed." },
          { icon: <Globe2 size={48} />, title: "ORCHESTRATION", desc: "Bridging RTA Digital Twins with high-res atmospheric models." }
        ].map((item, i) => (
          <motion.div key={i} whileHover={{ y: -10 }} className="bg-[#0a0a0a] border border-white/10 p-10 rounded-3xl flex flex-col items-center gap-6 shadow-2xl group">
            <div className="text-primary group-hover:scale-110 transition-transform drop-shadow-[0_0_15px_rgba(50,181,49,0.5)]">{item.icon}</div>
            <h3 className="text-2xl font-bold tracking-widest">{item.title}</h3>
            <p className="text-gray-400">{item.desc}</p>
          </motion.div>
        ))}
      </div>
    </div>
  );
}

function SlideTechStack() {
  return (
    <div className="flex flex-col md:flex-row items-center gap-12 max-w-6xl w-full">
      <div className="flex-1 space-y-8">
        <h2 className="text-4xl md:text-6xl font-extrabold text-white border-l-4 border-primary pl-6">DEEP TECH STACK</h2>
        <p className="text-xl text-gray-300">Omni-Route leverages the <span className="text-primary font-bold">NANDA Model</span>—a custom G42 variant of NVIDIA's CorrDiff.</p>
        <p className="text-xl text-gray-300">This allows for <span className="text-primary font-bold">200-meter resolution</span> forecasts, capturing urban heat islands and coastal interactions that global models miss.</p>
        <p className="text-xl text-gray-300">Integration with <span className="text-primary font-bold">NVIDIA cuOpt</span> ensures every route is optimized for thermal cost and fuel efficiency.</p>
      </div>
      <div className="flex-1 w-full rounded-3xl overflow-hidden border border-primary/30 shadow-neon h-[400px]">
        <img src="https://static.tweaktown.com/news/9/6/96955_93_nvidia-creates-earth-2-digital-twin-generative-ai-to-simulate-visualize-weather-and-climate_full.jpg" alt="Earth-2" className="w-full h-full object-cover" />
      </div>
    </div>
  );
}

function SlideResolution() {
  return (
    <div className="flex flex-col md:flex-row items-center gap-12 max-w-5xl w-full">
      <div className="flex-1 text-center border-r border-white/10 pr-12">
        <h2 className="text-9xl font-black text-primary drop-shadow-[0_0_30px_rgba(50,181,49,0.8)]">100x</h2>
        <p className="text-2xl font-bold mt-4 text-white">Higher Resolution</p>
      </div>
      <div className="flex-1 space-y-6 pl-6">
        <h3 className="text-sm font-bold tracking-widest text-primary uppercase">Beyond Standard Forecasts</h3>
        <p className="text-xl text-gray-300">While Apple Weather generalizes across 10km, Omni-Route identifies the <span className="text-primary font-bold">exact temperature of the street</span> you are on.</p>
        <p className="text-xl text-gray-300">This translates to a <span className="text-primary font-bold">22% reduction</span> in rider fatigue and <span className="text-primary font-bold">15% faster</span> sub-30min delivery fulfillment.</p>
      </div>
    </div>
  );
}

function SlideEcosystem() {
  const { location, routes, selectedRouteId, weather } = useOmniContext();
  
  return (
    <div className="w-full max-w-7xl space-y-8">
      <h2 className="text-4xl md:text-6xl font-extrabold text-white border-l-4 border-primary pl-6">PRODUCT ECOSYSTEM</h2>
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 h-[400px]">
        <div className="bg-[#0a0a0a] rounded-3xl border border-primary/30 overflow-hidden flex flex-col group relative">
          <div className="absolute top-4 left-4 z-10 bg-black/80 px-3 py-1 rounded text-xs font-bold text-primary border border-primary/50 shadow-neon uppercase tracking-widest pointer-events-none">Live Interactive GPS</div>
          <div className="flex-1 pointer-events-auto relative">
             <div className="absolute inset-0 scale-[1.5] origin-center opacity-80 group-hover:opacity-100 transition-opacity">
               <ThermalTrafficMap center={location.coords} routes={routes} selectedRouteId={selectedRouteId} />
             </div>
          </div>
          <div className="p-6 bg-black z-10">
            <h3 className="text-xl font-bold text-primary mb-2">GPS CORE</h3>
            <p className="text-sm text-gray-400">Real-time "Coolest Path" routing for last-mile fleets. Pan map above.</p>
          </div>
        </div>

        <div className="bg-[#0a0a0a] rounded-3xl border border-primary/30 overflow-hidden flex flex-col pointer-events-auto">
          <div className="flex-1 p-4 overflow-y-auto scale-90 origin-top">
            <OmniDashboard weather={weather} routes={routes} selectedRouteId={selectedRouteId} />
          </div>
          <div className="p-6 bg-black z-10 border-t border-white/5">
            <h3 className="text-xl font-bold text-primary mb-2">OMNI-DASHBOARD</h3>
            <p className="text-sm text-gray-400">Fleet-wide thermal stress & ROI analytics. Live connected.</p>
          </div>
        </div>

        <div className="bg-[#0a0a0a] rounded-3xl border border-primary/30 overflow-hidden flex flex-col group relative">
           <div className="flex-1 bg-[url('https://png.pngtree.com/thumb_back/fw800/background/20260128/pngtree-futuristic-digital-dashboard-displaying-various-data-analytics-charts-and-graphs-with-image_21236983.webp')] bg-cover bg-center opacity-60 mix-blend-screen group-hover:opacity-100 transition-opacity flex items-center justify-center">
              <div className="bg-black/80 border border-primary/50 p-4 rounded-xl shadow-neon flex items-center gap-4">
                 <div className="w-12 h-12 rounded-full bg-primary flex items-center justify-center animate-pulse">
                   <ShieldCheck className="text-black" size={24} />
                 </div>
                 <div className="text-left">
                   <div className="text-primary font-bold text-sm">Omni-Bot</div>
                   <div className="text-white text-xs typing-effect">"Analyzing RTA conditions..."</div>
                 </div>
              </div>
           </div>
           <div className="p-6 bg-black z-10">
            <h3 className="text-xl font-bold text-primary mb-2">OMNI-BOT</h3>
            <p className="text-sm text-gray-400">AI assistant explaining the science behind the route.</p>
          </div>
        </div>
      </div>
    </div>
  );
}

function SlideMarket() {
  const tiers = [
    {
      name: "Core API",
      features: "Standard Routing + Basic Weather Data",
      price: "$499",
      period: "/mo",
      highlight: false,
    },
    {
      name: "Omni-Pro",
      features: "200m Thermal Routing + NVIDIA Earth-2 Integration",
      price: "$2,499",
      period: "/mo",
      highlight: true,
    },
    {
      name: "Enterprise",
      features: "Full Digital Twin Sync + RTA Custom Data",
      price: "Custom",
      period: "",
      highlight: false,
    },
  ];

  return (
    <div className="flex flex-col md:flex-row items-center gap-12 max-w-6xl w-full">
      <div className="flex-[1.5] space-y-10">
        <h2 className="text-4xl md:text-6xl font-extrabold text-white border-l-4 border-primary pl-6 tracking-tight">
          REVENUE ENGINE <span className="text-primary">&</span> PRICING
        </h2>

        {/* Pricing Table */}
        <div className="w-full space-y-3">
          {/* Header */}
          <div className="grid grid-cols-[160px_1fr_160px] gap-6 px-8 py-2 text-[10px] font-black tracking-[0.2em] uppercase text-gray-600">
            <div>Tier</div>
            <div>Features</div>
            <div className="text-right">Price</div>
          </div>

          {/* Rows */}
          {tiers.map((tier, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, x: -50 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ delay: i * 0.15, duration: 0.5 }}
              className={`grid grid-cols-[160px_1fr_160px] gap-6 px-8 py-6 rounded-[1.5rem] border transition-all duration-500 group relative overflow-hidden ${
                tier.highlight
                  ? "bg-primary/5 border-primary/40 shadow-[0_0_30px_rgba(50,181,49,0.1)]"
                  : "bg-white/[0.02] border-white/10 hover:border-white/20"
              }`}
            >
              {tier.highlight && (
                <div className="absolute inset-0 bg-gradient-to-r from-primary/10 to-transparent pointer-events-none" />
              )}
              <div className="font-black text-white text-xl tracking-tight z-10">{tier.name}</div>
              <div className="text-gray-400 text-sm flex items-center leading-relaxed z-10">{tier.features}</div>
              <div className="text-right flex items-center justify-end gap-1 z-10">
                <span className={`text-3xl font-black ${tier.highlight ? "text-primary drop-shadow-[0_0_15px_rgba(50,181,49,0.5)]" : "text-white"}`}>
                  {tier.price}
                </span>
                {tier.period && <span className="text-gray-500 text-xs font-bold mt-2">{tier.period}</span>}
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Right side - Visual Credit Card / Wallet Graphic */}
      <div className="flex-1 flex flex-col items-center gap-8 mt-12">
        <motion.div 
          initial={{ rotateY: 20, rotateX: -10, scale: 0.9 }}
          whileInView={{ rotateY: 0, rotateX: 0, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="w-full max-w-[320px] aspect-[4/3] rounded-[2.5rem] bg-[#0c0c0c] border border-primary/30 relative flex flex-col items-center justify-center shadow-[0_0_60px_rgba(50,181,49,0.15)] group hover:border-primary/60 transition-colors"
        >
          {/* Omni-Wallet Icon Simulation */}
          <div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_50%,rgba(50,181,49,0.1),transparent)]" />
          <div className="w-32 h-32 rounded-full bg-primary/20 flex items-center justify-center relative">
             <div className="absolute inset-0 rounded-full border border-primary animate-ping opacity-20" />
             <div className="w-20 h-20 rounded-2xl bg-primary flex items-center justify-center shadow-neon">
                <TrendingUp size={40} className="text-black" />
             </div>
          </div>
          <div className="mt-6 text-center">
            <div className="text-primary font-black text-2xl tracking-widest">OMNI-CREDIT</div>
            <div className="text-gray-500 text-[10px] font-bold uppercase mt-1 tracking-widest">Regional Growth Fund</div>
          </div>
        </motion.div>
        
        <div className="max-w-[280px] space-y-4">
          <p className="text-center text-sm text-gray-400 italic leading-relaxed">
            "Annual contracts receive <span className="text-primary font-black shadow-neon-text">15% credit</span> toward G42 computing resources."
          </p>
          <div className="h-px w-full bg-gradient-to-r from-transparent via-white/10 to-transparent" />
          <p className="text-[10px] text-center text-gray-600 uppercase font-black tracking-widest">
            Strategic Infrastructure Partnership
          </p>
        </div>
      </div>
    </div>
  );
}

function SlideCompetition() {
  const rows = [
    { cap: "Weather Resolution", std: "10km - 30km", omni: "200m (Hyper-Local)" },
    { cap: "Thermal Routing", std: "None (Static)", omni: "Dynamic (Heat-Aware)" },
    { cap: "RTA Digital Twin Integration", std: "Third-party delayed", omni: "Native Real-time" },
    { cap: "Rider Welfare ESG tracking", std: "No data", omni: "Full Dashboard Reporting" },
  ];
  return (
    <div className="w-full max-w-5xl space-y-8">
      <h2 className="text-4xl md:text-6xl font-extrabold text-white border-l-4 border-primary pl-6 mb-12">COMPETITIVE SUPERIORITY</h2>
      <div className="w-full border border-white/10 rounded-2xl overflow-hidden bg-[#0a0a0a]">
         <div className="grid grid-cols-3 bg-white/5 p-6 border-b border-white/10">
            <div className="font-bold text-gray-400">Capability</div>
            <div className="font-bold text-gray-400">Standard Apps</div>
            <div className="font-bold text-primary">Omni-Route</div>
         </div>
         {rows.map((row, i) => (
           <div key={i} className="grid grid-cols-3 p-6 border-b border-white/5 hover:bg-white/5 transition-colors">
              <div className="text-white font-medium">{row.cap}</div>
              <div className="text-gray-400">{row.std}</div>
              <div className="text-primary font-bold shadow-neon-text">{row.omni}</div>
           </div>
         ))}
      </div>
    </div>
  );
}

function SlideRoadmap() {
  const steps = [
    { q: "Q1 2026", title: "NANDA Model", desc: "Integration & Alpha Test" },
    { q: "Q2 2026", title: "Pilot with Dubai", desc: "Logistics City Partners" },
    { q: "Q3 2026", title: "B2B SaaS Launch for", desc: "Enterprise" },
    { q: "Q4 2026", title: "Expansion to Riyadh &", desc: "GCC Cities" },
  ];
  return (
    <div className="w-full max-w-6xl space-y-16 text-center">
       <h2 className="text-4xl md:text-6xl font-extrabold text-white border-l-4 border-primary pl-6 text-left mb-24">STRATEGIC ROADMAP</h2>
       <div className="relative flex justify-between items-start pt-10">
         {/* Line */}
         <div className="absolute top-0 left-10 right-10 h-1 bg-white/10" />
         <motion.div 
           initial={{ width: 0 }} 
           whileInView={{ width: "100%" }} 
           transition={{ duration: 1.5 }}
           className="absolute top-0 left-10 h-1 bg-primary shadow-neon" 
         />
         
         {steps.map((step, i) => (
           <motion.div 
             initial={{ opacity: 0, y: 20 }}
             whileInView={{ opacity: 1, y: 0 }}
             transition={{ delay: i * 0.3 }}
             key={i} 
             className="relative flex flex-col items-center w-1/4"
           >
             <div className="absolute -top-[45px] w-6 h-6 rounded-full bg-black border-4 border-primary shadow-neon z-10" />
             <div className="text-primary font-bold tracking-widest uppercase mb-4">{step.q}</div>
             <div className="text-white font-bold text-xl">{step.title}</div>
             <div className="text-gray-400 mt-2">{step.desc}</div>
           </motion.div>
         ))}
       </div>
    </div>
  );
}

function SlideVision() {
  return (
    <div className="text-center max-w-4xl space-y-12">
       <p className="text-4xl md:text-5xl font-light leading-relaxed text-white">
         "AI in Dubai is no longer an experiment; it is a baseline for survival. <span className="font-bold text-primary">Omni-Route makes that baseline visible.</span>"
       </p>
       <p className="text-2xl text-gray-500 font-medium">— Digital Business Strategy Report, 2026</p>
    </div>
  );
}

function SlideLaunch() {
  return (
    <div className="text-center space-y-12 w-full max-w-4xl">
       <h1 className="text-6xl md:text-8xl font-black text-primary drop-shadow-[0_0_30px_rgba(50,181,49,0.5)]">READY TO LAUNCH?</h1>
       <p className="text-2xl text-gray-300">Join the digital revolution of Dubai's last-mile ecosystem.</p>
       
       <div className="mt-16 p-8 border border-primary/50 bg-primary/5 rounded-3xl backdrop-blur-md">
         <p className="text-xl font-bold text-white tracking-widest">www.omniroute.ai | contact@omniroute.ai</p>
       </div>
    </div>
  );
}
