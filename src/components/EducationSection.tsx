import { education } from "@/lib/data";
import TimelineItem from "./TimelineItem";
import { Building2, Calendar, ExternalLink, GraduationCap, MapPin } from "lucide-react";
import MotionWrapper from "./MotionWrapper";

export default function EducationSection() {
  return (
    <section
      id="education"
      className="py-12 bg-gradient-to-b from-muted/10 to-background"
    >
      <div className="container max-w-4xl mx-auto px-6 md:px-4">
        <MotionWrapper>
          <h2 className="text-2xl font-bold mb-8 text-center md:text-left">
            <span className="inline-flex items-center gap-2">
              <GraduationCap className="h-6 w-6 text-purple-500" />
              Education
            </span>
          </h2>
        </MotionWrapper>

        <div className="mb-8">
          {education.map((edu, index) => {
            const itemKey = `${edu.institution}-${edu.degree}-${edu.period}`;

            return (
              <TimelineItem
                key={itemKey}
                title={edu.degree}
                subtitle={edu.institution}
                date={edu.period}
                titleIcon={<GraduationCap className="h-5 w-5 text-purple-500" />}
                subtitleIcon={<Building2 className="h-4 w-4 text-muted-foreground" />}
                dateIcon={<Calendar className="h-4 w-4 text-muted-foreground" />}
                isLast={index === education.length - 1}
                index={index}
              >
                <p className="mb-3 flex items-center gap-2 text-sm text-muted-foreground">
                  <MapPin className="h-4 w-4" />
                  {edu.location}
                </p>

                {edu.achievements && edu.achievements.length > 0 && (
                  <ul className="mt-2 max-w-2xl space-y-1 text-xs leading-relaxed text-muted-foreground/85 md:text-sm">
                    {edu.achievements.map((achievement, i) => {
                      const text =
                        typeof achievement === "string"
                          ? achievement
                          : achievement.text;
                      const href =
                        typeof achievement === "string"
                          ? ""
                          : achievement.href;

                      return (
                      <li
                        key={i}
                        className="relative pl-4 before:absolute before:left-0 before:top-[0.65em] before:h-1 before:w-1 before:rounded-full before:bg-purple-500/45"
                      >
                        {href ? (
                          <a
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center transition-colors hover:text-purple-500"
                          >
                            {text}
                            <ExternalLink className="ml-1.5 h-3.5 w-3.5" />
                          </a>
                        ) : (
                          text
                        )}
                      </li>
                    );
                    })}
                  </ul>
                )}
              </TimelineItem>
            );
          })}
        </div>
      </div>
    </section>
  );
}
