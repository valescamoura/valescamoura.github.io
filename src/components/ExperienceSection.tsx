import { workExperience } from "@/lib/data";
import TimelineItem from "./TimelineItem";
import { motion } from "framer-motion";
import MotionWrapper from "./MotionWrapper";
import { BriefcaseBusiness, Building2, Calendar, MapPin, UserRound } from "lucide-react";

export default function ExperienceSection() {
  return (
    <section
      id="experience"
      className="py-12 bg-gradient-to-b from-muted/20 to-background"
    >
      <div className="container max-w-4xl mx-auto px-6 md:px-4">
        <MotionWrapper>
          <h2 className="text-2xl font-bold mb-8 text-center md:text-left flex items-center md:inline-block">
            <motion.span
              className="mr-2 inline-flex align-middle"
              initial={{ rotate: 0 }}
              whileInView={{ rotate: [0, -10, 10, -5, 5, 0] }}
              transition={{ duration: 0.5, delay: 0.2 }}
              viewport={{ once: true }}
            >
              <BriefcaseBusiness className="h-6 w-6 text-purple-500" />
            </motion.span>
            Work Experience
          </h2>
        </MotionWrapper>
        <div className="mb-8">
          {workExperience.map((job, index) => {
            const itemKey = `${job.company}-${job.position}-${job.period}`;

            return (
              <TimelineItem
                key={itemKey}
                title={job.position}
                subtitle={job.company}
                date={job.period}
                titleIcon={<UserRound className="h-5 w-5 text-purple-500" />}
                subtitleIcon={<Building2 className="h-4 w-4 text-muted-foreground" />}
                dateIcon={<Calendar className="h-4 w-4 text-muted-foreground" />}
                isLast={index === workExperience.length - 1}
                index={index}
              >
                <p className="mt-1 flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {job.location}
                </p>

                <ul className="mt-2 max-w-2xl space-y-1 text-xs leading-relaxed text-muted-foreground/85 md:text-sm">
                  {job.achievements.map((achievement, i) => (
                    <li
                      key={i}
                      className="relative pl-4 before:absolute before:left-0 before:top-[0.65em] before:h-1 before:w-1 before:rounded-full before:bg-purple-500/45"
                    >
                      {achievement}
                    </li>
                  ))}
                </ul>
              </TimelineItem>
            );
          })}
        </div>
      </div>
    </section>
  );
}
