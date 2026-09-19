import { talksAndPresentations } from "@/lib/data";
import { Calendar, ExternalLink, FileText, MapPin, Presentation } from "lucide-react";
import MotionWrapper from "./MotionWrapper";
import { GlassCard } from "./ui/glass-card";
import { motion } from "framer-motion";

function getTalkTime(talk: (typeof talksAndPresentations)[number]) {
  return new Date(talk.date ?? `${talk.year}-01-01`).getTime();
}

export default function TalksSection() {
  const sortedTalks = [...talksAndPresentations].sort(
    (a, b) => getTalkTime(b) - getTalkTime(a)
  );

  return (
    <section id="talks" className="py-12 bg-gradient-to-b from-muted/10 to-background">
      <div className="container max-w-4xl mx-auto px-6 md:px-4">
        <MotionWrapper>
          <h2 className="mb-8 text-center text-2xl font-bold md:text-left">
            <span className="inline-flex items-center gap-2">
              <Presentation className="h-6 w-6 text-purple-500" />
              Talks & Presentations
            </span>
          </h2>
        </MotionWrapper>

        <div className="grid grid-cols-1 gap-4">
          {sortedTalks.map((talk, index) => {
            const links = [
              { label: "Event", href: talk.links.event, icon: ExternalLink },
              { label: "Slides", href: talk.links.slides, icon: FileText },
              { label: "Video", href: talk.links.video, icon: ExternalLink },
            ].filter((link) => link.href);

            return (
              <MotionWrapper key={talk.title} delay={index * 0.1}>
                <GlassCard className="p-4 dark:border-purple-500/10">
                  <div className="mb-3 flex flex-wrap items-center gap-2">
                    <span className="rounded-md bg-purple-500/10 px-2 py-1 text-xs">
                      {talk.type}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-md bg-background/60 px-2 py-1 text-xs text-muted-foreground">
                      <Calendar className="h-3.5 w-3.5" />
                      {talk.date ?? talk.year}
                    </span>
                    <span className="inline-flex items-center gap-1.5 rounded-md bg-background/60 px-2 py-1 text-xs text-muted-foreground">
                      <MapPin className="h-3.5 w-3.5" />
                      {talk.location}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold leading-snug text-foreground">
                    {talk.title}
                  </h3>
                  <p className="mt-1 text-sm font-medium text-foreground/80">
                    {talk.event}
                  </p>
                  <p className="mt-2 text-sm text-muted-foreground">
                    {talk.description}
                  </p>

                  {links.length > 0 && (
                    <div className="mt-4 flex flex-wrap gap-3 border-t border-border/30 pt-3">
                      {links.map(({ label, href, icon }) => (
                        <TalkLink
                          key={label}
                          label={label}
                          href={href}
                          icon={icon}
                        />
                      ))}
                    </div>
                  )}
                </GlassCard>
              </MotionWrapper>
            );
          })}
        </div>
      </div>
    </section>
  );
}

type TalkLinkProps = {
  label: string;
  href: string;
  icon: typeof ExternalLink;
};

function TalkLink({ label, href, icon: Icon }: TalkLinkProps) {
  return (
    <motion.a
      href={href}
      target="_blank"
      rel="noopener noreferrer"
      className="inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-purple-500"
      whileHover={{ scale: 1.04 }}
      whileTap={{ scale: 0.96 }}
    >
      <Icon className="mr-2 h-4 w-4" />
      {label}
    </motion.a>
  );
}
