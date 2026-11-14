import React from "react";
import { Link } from "react-router-dom";
import { Briefcase, ArrowRight, ArrowLeft } from "lucide-react";
import { portfolioData } from "../data/portfolioData";

export default function Career() {
  return (
    <div className="py-12 space-y-12">
        {/* Navigation Link back */}
        <Link
          to="/"
          className="inline-flex items-center gap-2 text-sm font-mono font-bold text-bronze hover:underline group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Home
        </Link>

        <div className="space-y-4 text-center md:text-left">
          <div className="inline-flex items-center gap-2 text-bronze font-mono text-sm tracking-wider uppercase justify-center md:justify-start">
            <Briefcase className="w-4 h-4" />
            <span>Professional Experience</span>
          </div>
          <h1 className="text-4xl md:text-6xl font-display font-medium italic tracking-tight">
            Work Timeline
          </h1>
          <p className="text-lg opacity-80 max-w-2xl leading-relaxed">
            A chronological look at my roles, responsibilities, and key engineering achievements. Click on any role to see detailed case studies of my work.
          </p>
        </div>

        <div className="relative pl-6 md:pl-8 border-l border-aurometalsaurus/25 space-y-12 py-4 max-w-4xl">
          {portfolioData.experience.map((exp, idx) => (
            <div key={idx} className="relative group">
              {/* Timeline bullet indicator */}
              <span className="absolute -left-[30px] md:-left-[38px] top-3.5 w-2.5 h-2.5 rounded-full transition-colors bg-lightgray dark:bg-aurometalsaurus group-hover:bg-bronze"></span>

              {/* Experience Card */}
              <div className="p-6 rounded border transition-colors bg-white/50 dark:bg-blackolive/60 border-lightgray dark:border-aurometalsaurus/20 hover:border-bronze/50">
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                  <div>
                    <h3 className="text-lg font-bold tracking-tight">
                      {exp.role}
                    </h3>
                    <p className="text-sm font-semibold text-bronze font-mono">
                      {exp.company}
                    </p>
                  </div>
                  <span className="text-xs font-mono px-3 py-1 rounded-none border self-start md:self-center bg-lightgray/15 dark:bg-blackolive/60 border-quicksilver/30 dark:border-aurometalsaurus/15">
                    {exp.duration}
                  </span>
                </div>

                <p className="text-sm leading-relaxed opacity-85 mb-4 font-sans">
                  {exp.longDescription || exp.description[0]}
                </p>

                {/* Sub-Timeline for projects delivered in this role */}
                {exp.keyProjects && exp.keyProjects.length > 0 && (
                  <div className="mb-6 pl-4 border-l border-dashed border-bronze/35 space-y-2">
                    <span className="text-[10px] font-mono font-bold uppercase tracking-wider text-bronze block">
                      Key Deliverables / Projects:
                    </span>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                      {exp.keyProjects.map((proj, pIdx) => (
                        <div
                          key={pIdx}
                          className="p-3 border border-quicksilver/20 dark:border-aurometalsaurus/15 bg-lightgray/5 dark:bg-blackolive/30 flex items-center justify-between gap-4 transition-all duration-200 hover:border-bronze/30"
                        >
                          <div className="space-y-0.5">
                            <span className="font-semibold text-sm font-display italic block">
                              {proj.name}
                            </span>
                            <span className="text-[10px] opacity-60 block font-mono">
                              Role: {proj.role}
                            </span>
                          </div>
                          <span className="w-1.5 h-1.5 bg-bronze rotate-45 shrink-0 shadow-[0_0_8px_#C5A059]"></span>
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap items-center justify-between gap-4 pt-3 border-t border-dashed border-aurometalsaurus/10">
                  <div className="flex flex-wrap gap-1.5">
                    {exp.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[10px] font-mono px-2.5 py-0.5 rounded-none border transition-all duration-200 cursor-default bg-lightgray/10 dark:bg-blackolive/40 border-quicksilver/20 dark:border-aurometalsaurus/20 hover:border-bronze/40 hover:text-bronze"
                      >
                        #{skill}
                      </span>
                    ))}
                  </div>

                  <Link
                    to={`/career/${exp.id}`}
                    className="text-xs font-mono font-bold text-bronze hover:underline inline-flex items-center gap-1.5 transition-all group-hover:translate-x-1"
                  >
                    Case Study & Achievements <ArrowRight className="w-3 h-3" />
                  </Link>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
  );
}
