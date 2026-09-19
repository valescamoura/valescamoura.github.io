import { academicService } from "@/lib/data";
import { Calendar, ExternalLink, Handshake, MapPin, Tag } from "lucide-react";
import MotionWrapper from "./MotionWrapper";
import { GlassCard } from "./ui/glass-card";
import { motion } from "framer-motion";

function getMostRecentYear(period: string) {
  return Math.max(...(period.match(/\d{4}/g) ?? ["0"]).map(Number));
}

export default function AcademicServiceSection() {
  const sortedAcademicService = [...academicService].sort(
    (a, b) => getMostRecentYear(b.period) - getMostRecentYear(a.period)
  );

  return (
    <section id="academic-service" className="py-12 bg-gradient-to-b from-background to-muted/10">
      <div className="container max-w-4xl mx-auto px-6 md:px-4">
        <MotionWrapper>
          <h2 className="mb-8 text-center text-2xl font-bold md:text-left">
            <span className="inline-flex items-center gap-2">
              <Handshake className="h-6 w-6 text-purple-500" />
              Academic Service
            </span>
          </h2>
        </MotionWrapper>

        <div className="grid grid-cols-1 gap-4 md:grid-cols-2">
          {sortedAcademicService.map((item, index) => (
            <MotionWrapper key={`${item.role}-${item.organization}`} delay={index * 0.08}>
              <GlassCard className="flex h-full flex-col p-4 dark:border-purple-500/10">
                <div className="mb-3 flex flex-wrap items-center gap-2">
                  <span className="rounded-md bg-purple-500/10 px-2 py-1 text-xs">
                    {item.role}
                  </span>
                  <span className="inline-flex items-center gap-1.5 rounded-md bg-background/60 px-2 py-1 text-xs text-muted-foreground">
                    <Calendar className="h-3.5 w-3.5" />
                    {item.period}
                  </span>
                </div>

                <h3 className="text-base font-semibold leading-snug text-foreground">
                  {item.organization}
                </h3>
                <p className="mt-1 flex items-center gap-1.5 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {item.location}
                </p>
                <p className="mt-2 text-sm text-muted-foreground">
                  {item.description}
                </p>

                <div className="mt-3 flex flex-wrap gap-2">
                  {item.tags.map((tag) => (
                    <span
                      key={tag}
                      className="inline-flex items-center rounded-full bg-background/70 px-2.5 py-1 text-xs text-muted-foreground"
                    >
                      <Tag className="mr-1 h-3 w-3" />
                      {tag}
                    </span>
                  ))}
                </div>

                {item.link && (
                  <motion.a
                    href={item.link}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-purple-500"
                    whileHover={{ scale: 1.04 }}
                    whileTap={{ scale: 0.96 }}
                  >
                    <ExternalLink className="mr-2 h-4 w-4" />
                    Website
                  </motion.a>
                )}
              </GlassCard>
            </MotionWrapper>
          ))}
        </div>
      </div>
    </section>
  );
}
