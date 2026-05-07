"use client";

import { useState, useRef, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { MessageSquare, X, Send, Bot } from "lucide-react";
import { cn } from "@/lib/utils/cn";

interface Message {
  id: string;
  role: "user" | "bot";
  content: string;
}

// Pre-defined knowledge base based on the PDFs
const KNOWLEDGE_BASE = [
  {
    keywords: ["earth-2", "nvidia", "weather", "forecast"],
    response: "Omni-Route integrates NVIDIA Earth-2 and G42 CorrDiff models, providing 2km resolution forecasts across the UAE and 200m resolution specifically around Abu Dhabi and Dubai. This captures the effects of urban development and terrain on temperature, humidity, and wind at fine scales, outperforming traditional weather models."
  },
  {
    keywords: ["traffic", "rta", "congestion", "pulse"],
    response: "We leverage Dubai Pulse open-data and RTA's 'Clear Guide' platform to aggregate real-time and historical traffic data. This allows our routing engine to dynamically recalculate paths when incidents or severe congestion occur, maintaining reliable ETAs."
  },
  {
    keywords: ["heat", "temperature", "fortyguard", "street"],
    response: "To address Urban Heat Islands (UHI), we fuse regional models with street-level data providers like FortyGuard. This creates a 'street-to-street thermometer' at a 10m² resolution, allowing our Rider Comfort Engine to suggest paths with maximum shade and minimum heat index."
  },
  {
    keywords: ["rider", "comfort", "safety", "delivery"],
    response: "The Rider Comfort Engine calculates a multi-objective function trading off travel time against heat exposure (the Heat Index). By comparing routes based on cumulative heat exposure, fleet managers can reduce heat-illness risk for motorcycle couriers, especially during peak mid-afternoon hot spots."
  }
];

export const OmniBotFAB = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { id: "1", role: "bot", content: "I am Omni-Bot, your AI guide to the data science behind Omni-Route. Ask me about our Earth-2 weather integration, traffic digital twins, or the Rider Comfort Engine." }
  ]);
  const [input, setInput] = useState("");
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const handleSend = () => {
    if (!input.trim()) return;
    
    const userMsg = input.trim().toLowerCase();
    const newMessages: Message[] = [...messages, { id: Date.now().toString(), role: "user", content: input.trim() }];
    setMessages(newMessages);
    setInput("");

    // Simple keyword matching for strict guardrails
    setTimeout(() => {
      let botResponse = "I am strictly constrained to answering questions regarding the Omni-Route logistics ecosystem, NVIDIA Earth-2 integration, Dubai RTA traffic data, and the Rider Comfort Engine. Please refine your question.";
      
      for (const item of KNOWLEDGE_BASE) {
        if (item.keywords.some(kw => userMsg.includes(kw))) {
          botResponse = item.response;
          break;
        }
      }

      setMessages(prev => [...prev, { id: Date.now().toString(), role: "bot", content: botResponse }]);
    }, 600);
  };

  return (
    <>
      <AnimatePresence>
        {isOpen && (
          <motion.div 
            drag
            dragConstraints={{ left: -window?.innerWidth + 400, right: 0, top: -window?.innerHeight + 500, bottom: 0 }}
            dragElastic={0.05}
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            transition={{ type: "spring", stiffness: 300, damping: 30 }}
            className="fixed bottom-24 right-6 w-80 sm:w-96 h-[500px] max-h-[70vh] glass rounded-3xl border border-primary/30 shadow-neon z-[998] flex flex-col overflow-hidden"
          >
            {/* Header */}
            <div className="p-4 border-b border-white/10 bg-black/50 backdrop-blur-md flex justify-between items-center">
              <div className="flex items-center gap-2">
                <div className="p-2 bg-primary/20 rounded-lg text-primary">
                  <Bot size={20} />
                </div>
                <h3 className="font-bold text-white tracking-tight">OMNI-BOT <span className="text-xs text-primary ml-1">v2.0</span></h3>
              </div>
              <button onClick={() => setIsOpen(false)} className="text-gray-400 hover:text-white transition-colors">
                <X size={20} />
              </button>
            </div>

            {/* Messages */}
            <div className="flex-1 overflow-y-auto p-4 space-y-4">
              {messages.map((msg) => (
                <div key={msg.id} className={cn("flex", msg.role === "user" ? "justify-end" : "justify-start")}>
                  <div className={cn(
                    "max-w-[85%] p-3 rounded-2xl text-sm leading-relaxed",
                    msg.role === "user" 
                      ? "bg-primary text-black rounded-tr-sm font-medium" 
                      : "bg-white/10 text-gray-200 rounded-tl-sm border border-white/5"
                  )}>
                    {msg.content}
                  </div>
                </div>
              ))}
              <div ref={messagesEndRef} />
            </div>

            {/* Input */}
            <div className="p-4 bg-black/50 backdrop-blur-md border-t border-white/10">
              <div className="relative flex items-center">
                <input 
                  type="text" 
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && handleSend()}
                  placeholder="Ask about our data science..."
                  className="w-full bg-white/5 border border-white/10 rounded-full py-3 pl-4 pr-12 text-sm text-white placeholder-gray-500 focus:outline-none focus:border-primary/50 transition-colors"
                />
                <button 
                  onClick={handleSend}
                  disabled={!input.trim()}
                  className="absolute right-2 p-2 text-primary hover:text-white disabled:opacity-50 transition-colors"
                >
                  <Send size={18} />
                </button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        drag
        dragConstraints={{ left: -window?.innerWidth + 80, right: 0, top: -window?.innerHeight + 80, bottom: 0 }}
        dragElastic={0.1}
        dragMomentum={false}
        whileHover={{ scale: 1.05, cursor: "grab" }}
        whileTap={{ scale: 0.95, cursor: "grabbing" }}
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-6 w-14 h-14 bg-primary text-black rounded-full flex items-center justify-center shadow-neon z-[999] overflow-hidden group"
      >
        {isOpen ? <X size={24} /> : <MessageSquare size={24} />}
        <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white/40 to-transparent rotate-0 group-hover:animate-spin" style={{ animationDuration: '3s' }} />
      </motion.button>
    </>
  );
};
