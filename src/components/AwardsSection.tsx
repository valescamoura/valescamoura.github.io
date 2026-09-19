import React from "react";
import { awards } from "@/lib/data";
import { Building2, Calendar, Globe2, Map, Trophy } from "lucide-react";
import MotionWrapper from "./MotionWrapper";
import { GlassCard } from "./ui/glass-card";
import { motion } from "framer-motion";

export default function AwardsSection() {
  return (
    <section
      id="awards"
      className="py-12 bg-gradient-to-b from-background to-muted/10"
    >
      <div className="container max-w-4xl mx-auto px-6 md:px-4">
        <MotionWrapper>
          <h2 className="text-2xl font-bold mb-8 text-center md:text-left">
            <span className="inline-flex items-center gap-2">
              <Trophy className="h-6 w-6 text-purple-500" />
              Awards
            </span>
          </h2>
        </MotionWrapper>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {awards.map((award, index) => (
            <MotionWrapper key={award.name + award.date} delay={index * 0.1}>
              <GlassCard className="p-4 dark:border-purple-500/10 hover:border-purple-500/30 transition-all duration-300 flex flex-col h-full">
                <div className="flex items-center mb-2">
                  <motion.div
                    whileHover={{ rotate: 20 }}
                    transition={{ type: "spring", stiffness: 500 }}
                    className="flex items-center justify-center bg-gradient-to-r from-amber-500 to-yellow-500 rounded-full p-1.5 mr-2"
                  >
                    <Trophy className="h-4 w-4 text-white" />
                  </motion.div>
                  <h3 className="font-medium">{award.name}</h3>
                </div>
                <p className="mb-1 flex items-center gap-2 pl-8 text-xs text-muted-foreground">
                  <Building2 className="h-3.5 w-3.5" />
                  {award.issuer}
                </p>
                {award.description && (
                  <p className="mb-3 pl-8 text-xs leading-relaxed text-muted-foreground">
                    {award.description}
                  </p>
                )}
                <div className="flex flex-col space-y-2 mt-auto">
                  <div className="flex items-center">
                    <span className="inline-flex items-center gap-1.5 rounded-md bg-background/50 px-2 py-1 text-xs text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5" />
                      {award.date}
                    </span>
                  </div>
                  <motion.span
                    className="text-xs text-muted-foreground/80 bg-background/50 px-2 py-1 rounded-md w-fit"
                    whileHover={{ scale: 1.05 }}
                  >
                    {award.type === "International" ? (
                      <Globe2 className="mr-1 inline h-3.5 w-3.5" />
                    ) : (
                      <Map className="mr-1 inline h-3.5 w-3.5" />
                    )}
                    {award.type}
                  </motion.span>
                </div>
              </GlassCard>
            </MotionWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
