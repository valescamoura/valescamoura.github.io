import * as React from "react";
import { cn } from "@/lib/utils";
import { motion } from "framer-motion";

interface TimelineItemProps {
  title: string;
  subtitle: string;
  date: string;
  titleIcon?: React.ReactNode;
  subtitleIcon?: React.ReactNode;
  dateIcon?: React.ReactNode;
  isLast?: boolean;
  index?: number;
  children?: React.ReactNode;
}

export default function TimelineItem({
  title,
  subtitle,
  date,
  titleIcon,
  subtitleIcon,
  dateIcon,
  isLast = false,
  index = 0,
  children,
}: TimelineItemProps) {
  return (
    <motion.div
      className="relative flex gap-6"
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5, delay: index * 0.2 }}
      viewport={{ once: true, margin: "-50px" }}
    >
      <div className="flex flex-col items-center">
        <motion.div
          className="flex h-[18px] w-[18px] rounded-full border border-purple-500/50 bg-background dark:bg-muted z-10"
          initial={{ scale: 0 }}
          whileInView={{ scale: 1 }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 15,
            delay: index * 0.2 + 0.2,
          }}
          viewport={{ once: true, margin: "-50px" }}
        />
        {!isLast && (
          <motion.div
            className="w-px grow bg-gradient-to-b from-purple-500/50 to-pink-500/30 dark:from-purple-500/30 dark:to-pink-500/10"
            initial={{ height: 0 }}
            whileInView={{ height: "100%" }}
            transition={{ duration: 0.8, delay: index * 0.2 + 0.3 }}
            viewport={{ once: true, margin: "-50px" }}
          />
        )}
      </div>
      <div className={cn("min-w-0 flex-1 pb-8", isLast ? "pb-0" : "")}>
        <motion.div
          className="flex flex-col gap-0.5"
          initial={{ opacity: 0, x: -20 }}
          whileInView={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.5, delay: index * 0.2 + 0.1 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          <h3 className="flex items-center gap-2 text-lg font-semibold leading-snug text-foreground">
            {titleIcon}
            {title}
          </h3>
          <p className="flex items-center gap-2 text-base font-medium text-foreground/80">
            {subtitleIcon}
            {subtitle}
          </p>
          <p className="mb-1.5 flex items-center gap-2 text-sm text-muted-foreground">
            {dateIcon}
            {date}
          </p>
        </motion.div>
        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: index * 0.2 + 0.4 }}
          viewport={{ once: true, margin: "-50px" }}
        >
          {children}
        </motion.div>
      </div>
    </motion.div>
  );
}
