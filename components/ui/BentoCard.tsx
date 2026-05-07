"use client";

import { motion, HTMLMotionProps } from "framer-motion";
import { cn } from "@/lib/utils/cn";
import React from "react";

interface BentoCardProps extends HTMLMotionProps<"div"> {
  children: React.ReactNode;
  delay?: number;
  glowColor?: "primary" | "accent" | "none";
}

export const BentoCard = ({ 
  children, 
  className, 
  delay = 0,
  glowColor = "none",
  ...props 
}: BentoCardProps) => {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay }}
      className={cn(
        "glass rounded-3xl p-6 relative overflow-hidden group",
        glowColor === "primary" && "hover:shadow-neon border-primary/30 hover:border-primary/80 transition-all duration-300",
        glowColor === "accent" && "hover:shadow-neon-accent border-accent/30 hover:border-accent/80 transition-all duration-300",
        className
      )}
      {...props}
    >
      <div className="relative z-10">{children}</div>
      {/* Subtle corner gradients */}
      <div className="absolute -top-10 -right-10 w-32 h-32 bg-primary/10 rounded-full blur-3xl group-hover:bg-primary/20 transition-all duration-500" />
      <div className="absolute -bottom-10 -left-10 w-32 h-32 bg-accent/10 rounded-full blur-3xl group-hover:bg-accent/20 transition-all duration-500" />
    </motion.div>
  );
};
