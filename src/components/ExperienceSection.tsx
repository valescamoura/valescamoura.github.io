import { workExperience } from "@/lib/data";
import TimelineItem from "./TimelineItem";
import { Briefcase, ChevronDown } from "lucide-react";
import { AnimatePresence, motion } from "framer-motion";
import MotionWrapper from "./MotionWrapper";
import { useState } from "react";

export default function ExperienceSection() {
  const [openItems, setOpenItems] = useState<string[]>([]);

  const toggleAchievements = (itemKey: string) => {
    setOpenItems((items) =>
      items.includes(itemKey)
        ? items.filter((item) => item !== itemKey)
        : [...items, itemKey]
    );
  };

  return (
    <section
      id="experience"
      className="py-12 bg-gradient-to-b from-muted/20 to-background"
    >
      <div className="container max-w-4xl mx-auto px-6 md:px-4">
        <MotionWrapper>
          <h2 className="text-2xl font-bold mb-8 text-center md:text-left flex items-center md:inline-block">
            <motion.span
              className="inline-block mr-2"
              initial={{ rotate: 0 }}
              whileInView={{ rotate: [0, -10, 10, -5, 5, 0] }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              💼
            </motion.span>{" "}
            Work Experience
          </h2>
        </MotionWrapper>
        <div className="mb-8">
          {workExperience.map((job, index) => {
            const itemKey = `${job.company}-${job.position}-${job.period}`;
            const isOpen = openItems.includes(itemKey);

            return (
              <TimelineItem
                key={itemKey}
                title={`👨‍💻 ${job.position}`}
                subtitle={`🏢 ${job.company}`}
                date={`📅 ${job.period}`}
                isLast={index === workExperience.length - 1}
                index={index}
              >
                <p className="text-sm text-muted-foreground mb-3">
                  📍 {job.location}
                </p>

                <motion.div
                  className="mt-3 overflow-hidden rounded-lg border border-purple-500/20 bg-background/80 shadow-sm backdrop-blur-sm backdrop-filter dark:border-purple-500/10 dark:bg-card/10"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: 0.2 }}
                  viewport={{ once: true }}
                >
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-4 p-4 text-left transition-colors hover:bg-purple-500/5"
                    onClick={() => toggleAchievements(itemKey)}
                    aria-expanded={isOpen}
                  >
                    <span className="flex items-center">
                      <span className="h-6 w-6 flex items-center justify-center rounded-full bg-purple-500/10 mr-2">
                        <Briefcase className="h-4 w-4 text-purple-500" />
                      </span>
                      <span className="text-sm font-medium">
                        Key Achievements
                      </span>
                    </span>
                    <motion.span
                      animate={{ rotate: isOpen ? 180 : 0 }}
                      transition={{ duration: 0.2 }}
                      className="flex h-7 w-7 shrink-0 items-center justify-center rounded-md bg-background/70"
                    >
                      <ChevronDown className="h-4 w-4 text-muted-foreground" />
                    </motion.span>
                  </button>

                  <AnimatePresence initial={false}>
                    {isOpen && (
                      <motion.ul
                        className="list-none space-y-2 border-t border-border/30 px-4 pb-4 pt-3 text-sm"
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: "auto", opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.25, ease: "easeInOut" }}
                      >
                        {job.achievements.map((achievement, i) => (
                          <motion.li
                            key={i}
                            className="text-muted-foreground relative pl-6"
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.2, delay: 0.04 * i }}
                          >
                            {achievement}
                          </motion.li>
                        ))}
                      </motion.ul>
                    )}
                  </AnimatePresence>
                </motion.div>
              </TimelineItem>
            );
          })}
        </div>
      </div>
    </section>
  );
}
