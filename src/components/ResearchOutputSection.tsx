import React, { useMemo, useState } from "react";
import { researchOutput } from "@/lib/data";
import {
  BookOpen,
  Calendar,
  ExternalLink,
  FileText,
  Github,
  MapPin,
  RotateCcw,
  Tag,
} from "lucide-react";
import { motion } from "framer-motion";
import MotionWrapper from "./MotionWrapper";
import { GlassCard } from "./ui/glass-card";
import { Button } from "./ui/button";

const ALL_FILTER = "All";

type ResearchOutput = (typeof researchOutput)[number];

function sortByYearDesc(a: ResearchOutput, b: ResearchOutput) {
  return Number(b.year) - Number(a.year) || a.title.localeCompare(b.title);
}

function getAvailableLinks(output: ResearchOutput) {
  return [
    { label: "Paper", href: output.links.paper, icon: FileText },
    { label: "PDF", href: output.links.pdf, icon: FileText },
    { label: "arXiv", href: output.links.arxiv, icon: FileText },
    { label: "DOI", href: output.links.doi, icon: ExternalLink },
    { label: "GitHub", href: output.links.github, icon: Github },
    { label: "BibTeX", href: output.links.bibtex, icon: FileText },
  ].filter((link) => link.href);
}

export default function ResearchOutputSection() {
  const [selectedType, setSelectedType] = useState(ALL_FILTER);
  const [selectedYear, setSelectedYear] = useState(ALL_FILTER);
  const [selectedTag, setSelectedTag] = useState(ALL_FILTER);

  const types = useMemo(
    () => [
      ALL_FILTER,
      ...Array.from(new Set(researchOutput.map((output) => output.type))).sort(),
    ],
    []
  );

  const years = useMemo(
    () => [
      ALL_FILTER,
      ...Array.from(new Set(researchOutput.map((output) => output.year))).sort(
        (a, b) => Number(b) - Number(a)
      ),
    ],
    []
  );

  const tags = useMemo(
    () => [
      ALL_FILTER,
      ...Array.from(
        new Set(researchOutput.flatMap((output) => output.tags))
      ).sort(),
    ],
    []
  );

  const filteredOutputs = useMemo(
    () =>
      researchOutput
        .filter((output) => {
          const matchesType =
            selectedType === ALL_FILTER || output.type === selectedType;
          const matchesYear =
            selectedYear === ALL_FILTER || output.year === selectedYear;
          const matchesTag =
            selectedTag === ALL_FILTER || output.tags.includes(selectedTag);

          return matchesType && matchesYear && matchesTag;
        })
        .sort(sortByYearDesc),
    [selectedTag, selectedType, selectedYear]
  );

  const hasActiveFilters =
    selectedType !== ALL_FILTER ||
    selectedYear !== ALL_FILTER ||
    selectedTag !== ALL_FILTER;

  const clearFilters = () => {
    setSelectedType(ALL_FILTER);
    setSelectedYear(ALL_FILTER);
    setSelectedTag(ALL_FILTER);
  };

  return (
    <section
      id="research-output"
      className="py-12 bg-gradient-to-b from-background to-muted/10"
    >
      <div className="container max-w-4xl mx-auto px-6 md:px-4">
        <MotionWrapper>
          <div className="mb-8">
            <h2 className="text-2xl font-bold text-center md:text-left">
              <span className="inline-flex items-center gap-2">
                <BookOpen className="h-6 w-6 text-purple-500" />
                Research Output
              </span>
            </h2>
            <p className="mt-2 text-sm text-muted-foreground text-center md:text-left">
              Papers, preprints, and software ordered by year.
            </p>
          </div>
        </MotionWrapper>

        <MotionWrapper delay={0.1}>
          <div className="mb-8 flex flex-col gap-3 rounded-lg border border-purple-500/20 bg-background/70 p-3 backdrop-blur-sm dark:border-purple-500/10 dark:bg-card/10 md:flex-row md:items-end">
            <FilterSelect
              label="Type"
              options={types}
              selected={selectedType}
              onSelect={setSelectedType}
            />
            <FilterSelect
              label="Year"
              options={years}
              selected={selectedYear}
              onSelect={setSelectedYear}
            />
            <FilterSelect
              label="Tag"
              options={tags}
              selected={selectedTag}
              onSelect={setSelectedTag}
            />
            {hasActiveFilters && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearFilters}
                className="h-10 md:ml-auto"
              >
                <RotateCcw className="h-4 w-4 mr-2" />
                Clear
              </Button>
            )}
          </div>
        </MotionWrapper>

        <div className="grid grid-cols-1 gap-6">
          {filteredOutputs.map((output, index) => {
            const links = getAvailableLinks(output);

            return (
              <MotionWrapper key={output.title + output.year} delay={index * 0.08}>
                <GlassCard className="group p-4 dark:border-purple-500/10">
                    <div className="mb-3 flex flex-wrap items-center gap-2">
                      <span className="inline-flex items-center rounded-md bg-background/70 px-2 py-1 text-xs text-muted-foreground">
                        <Calendar className="h-3.5 w-3.5 mr-1" />
                        {output.year}
                      </span>
                      <span className="rounded-md bg-purple-500/10 px-2 py-1 text-xs">
                        {output.type}
                      </span>
                      <span className="rounded-md bg-background/70 px-2 py-1 text-xs text-muted-foreground">
                        {output.status}
                      </span>
                    </div>
                    <h3 className="text-lg font-semibold leading-snug group-hover:text-purple-500 transition-colors duration-300">
                      {output.title}
                    </h3>
                    <p className="pt-2 text-sm text-muted-foreground">
                      {output.authors.join(", ")}
                    </p>
                    <p className="mt-1 flex flex-wrap items-center gap-x-2 gap-y-1 text-sm font-medium text-foreground/80">
                      <span>{output.venue}</span>
                      {output.location && (
                        <span className="inline-flex items-center gap-1 text-muted-foreground">
                          <MapPin className="h-3.5 w-3.5" />
                          {output.location}
                        </span>
                      )}
                    </p>
                    {output.description && (
                      <p className="mt-3 text-sm text-muted-foreground">
                        {output.description}
                      </p>
                    )}

                  {(links.length > 0 || output.tags.length > 0) && (
                    <div className="mt-4 flex flex-col gap-3 md:flex-row md:items-center md:justify-between">
                      <div className="flex flex-wrap gap-3">
                        {links.map(({ label, href, icon: Icon }) => (
                          <motion.a
                            key={label}
                            href={href}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="inline-flex items-center text-sm text-muted-foreground transition-colors hover:text-purple-500"
                            whileHover={{ scale: 1.04 }}
                            whileTap={{ scale: 0.96 }}
                          >
                            <Icon className="h-4 w-4 mr-2" />
                            {label}
                          </motion.a>
                        ))}
                      </div>
                      <div className="flex flex-wrap gap-2 md:justify-end">
                        {output.tags.map((tag) => (
                          <button
                            key={tag}
                            type="button"
                            onClick={() => setSelectedTag(tag)}
                            className="inline-flex items-center rounded-full bg-background/70 px-2.5 py-1 text-xs text-muted-foreground transition-colors hover:bg-purple-500/10 hover:text-purple-500"
                          >
                            <Tag className="h-3 w-3 mr-1" />
                            {tag}
                          </button>
                        ))}
                      </div>
                    </div>
                  )}
                </GlassCard>
              </MotionWrapper>
            );
          })}
        </div>

        {filteredOutputs.length === 0 && (
          <MotionWrapper>
            <p className="mt-8 text-center text-sm text-muted-foreground">
              No research output matches the selected filters.
            </p>
          </MotionWrapper>
        )}
      </div>
    </section>
  );
}

type FilterSelectProps = {
  label: string;
  options: string[];
  selected: string;
  onSelect: (option: string) => void;
};

function FilterSelect({ label, options, selected, onSelect }: FilterSelectProps) {
  return (
    <label className="min-w-0 flex-1">
      <span className="mb-1 block text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {label}
      </span>
      <select
        value={selected}
        onChange={(event) => onSelect(event.target.value)}
        className="h-10 w-full rounded-md border border-border/60 bg-background/80 px-3 text-sm shadow-sm transition-colors hover:border-purple-500/40 focus:border-purple-500 focus:outline-none focus:ring-2 focus:ring-purple-500/20"
      >
        {options.map((option) => (
          <option
            key={option}
            value={option}
          >
            {option}
          </option>
        ))}
      </select>
    </label>
  );
}
