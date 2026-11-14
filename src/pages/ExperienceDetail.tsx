import { useParams, Link } from "react-router-dom";
import {
  ArrowLeft,
  Briefcase,
  Calendar,
  Cpu,
  Trophy
} from "lucide-react";
import { portfolioData } from "../data/portfolioData";

const getExperienceHeroVisual = (company: string) => {
  return (
    <div className="h-48 w-full relative overflow-hidden bg-gradient-to-br from-[#2B2F2E] via-[#353833] to-bronze/10 border-b border-quicksilver/20 dark:border-aurometalsaurus/15 flex items-center justify-center">
      <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(#F4F0EC_2px,transparent_2px)] [background-size:24px_24px]"></div>
      <div className="w-20 h-20 border border-bronze/40 rotate-45 flex items-center justify-center bg-blackolive/30 shadow-[0_0_15px_rgba(197,160,89,0.1)] group">
        <span className="font-display text-2xl font-bold tracking-tight text-bronze -rotate-45 group-hover:scale-110 transition-transform duration-500">
          {company.slice(0, 2).toUpperCase()}
        </span>
      </div>
      <div className="absolute w-36 h-36 border border-dashed border-quicksilver/10 rounded-full animate-spin-slow"></div>
    </div>
  );
};

export default function ExperienceDetail() {
  const { id } = useParams<{ id: string }>();
  const exp = portfolioData.experience.find((e) => e.id === id);

  if (!exp) {
    return (
      <div className="py-24 text-center space-y-6">
        <h2 className="text-3xl font-display font-bold">Role Details Not Found</h2>
        <p className="opacity-70 max-w-md mx-auto">
          The professional experience details you are looking for does not exist.
        </p>
        <Link
          to="/career"
          className="inline-flex items-center gap-2 px-6 py-3 bg-bronze text-blackolive font-bold hover:bg-bronze-dark transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Career
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 space-y-12">
        {/* Navigation Link back */}
        <Link
          to="/career"
          className="inline-flex items-center gap-2 text-sm font-mono font-bold text-bronze hover:underline group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Career Timeline
        </Link>

        {/* Dynamic Header Block with Brand Badge */}
        <div className="border border-quicksilver/30 dark:border-aurometalsaurus/20 overflow-hidden">
          {getExperienceHeroVisual(exp.company)}
          
          <div className="p-6 md:p-10 space-y-4">
            <div className="flex flex-wrap items-center gap-4 text-xs font-mono">
              <span className="flex items-center gap-1.5 text-bronze uppercase font-bold">
                <Briefcase className="w-3.5 h-3.5" /> {exp.company}
              </span>
              <span className="flex items-center gap-1.5 text-quicksilver">
                <Calendar className="w-3.5 h-3.5" /> {exp.duration}
              </span>
            </div>

            <h1 className="text-4xl md:text-6xl font-display font-medium italic tracking-tight">
              {exp.role}
            </h1>

            <div className="flex flex-wrap gap-1.5 pt-2">
              {exp.skills.map((skill, idx) => (
                <span
                  key={idx}
                  className="text-xs font-mono px-3 py-1 rounded-none border border-quicksilver/35 dark:border-aurometalsaurus/20 bg-lightgray/10 dark:bg-blackolive/40 text-bronze"
                >
                  #{skill}
                </span>
              ))}
            </div>
          </div>
        </div>

        {/* Detailed Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 border-t border-dashed border-aurometalsaurus/20 pt-10">
          {/* Main Content */}
          <div className="lg:col-span-8 space-y-12">
            {/* Overview */}
            {exp.longDescription && (
              <div className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-display font-semibold italic">Role Overview & Focus</h2>
                <p className="text-base md:text-lg leading-relaxed opacity-90 whitespace-pre-line">
                  {exp.longDescription}
                </p>
              </div>
            )}

            {/* Key Contributions & Achievements */}
            {exp.contributions && exp.contributions.length > 0 && (
              <div className="space-y-6">
                <h2 className="text-2xl md:text-3xl font-display font-semibold italic">Key Contributions & Outcomes</h2>
                <ul className="space-y-4">
                  {exp.contributions.map((achievement, idx) => (
                    <li
                      key={idx}
                      className="p-5 border border-quicksilver/30 dark:border-aurometalsaurus/15 bg-white/5 flex items-start gap-4"
                    >
                      <Trophy className="w-5 h-5 text-bronze shrink-0 mt-0.5" />
                      <p className="text-sm md:text-base leading-relaxed opacity-95">{achievement}</p>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Key Projects Built */}
            {exp.keyProjects && exp.keyProjects.length > 0 && (
              <div className="space-y-6">
                <h2 className="text-2xl md:text-3xl font-display font-semibold italic">Key Deliverables</h2>
                <div className="space-y-6">
                  {exp.keyProjects.map((proj, idx) => (
                    <div
                      key={idx}
                      className="p-6 border border-quicksilver/30 dark:border-aurometalsaurus/15 bg-white/5 space-y-4"
                    >
                      <div className="space-y-1">
                        <h4 className="text-lg font-bold font-display italic">{proj.name}</h4>
                        <p className="text-xs font-mono text-bronze uppercase tracking-wider font-bold">Role: {proj.role}</p>
                      </div>

                      <p className="text-sm opacity-90 leading-relaxed">{proj.description}</p>

                      <div className="space-y-2 pt-2 border-t border-dashed border-aurometalsaurus/15">
                        <h5 className="text-xs font-mono font-bold uppercase tracking-wider text-bronze">Project Outcomes</h5>
                        <ul className="space-y-1.5">
                          {proj.outcomes.map((outcome, oIdx) => (
                            <li key={oIdx} className="text-sm flex items-start gap-2 opacity-90 leading-relaxed">
                              <span className="w-1.5 h-1.5 bg-bronze rotate-45 mt-2 shrink-0"></span>
                              <span>{outcome}</span>
                            </li>
                          ))}
                        </ul>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar */}
          <div className="lg:col-span-4 space-y-8">
            {/* Tech Stack Breakdown */}
            <div className="p-6 border border-quicksilver/30 dark:border-aurometalsaurus/15 bg-white/5 space-y-4">
              <div className="flex items-center gap-2 pb-3 border-b border-dashed border-aurometalsaurus/20 text-bronze">
                <Cpu className="w-5 h-5" />
                <h3 className="font-mono text-sm uppercase font-bold tracking-wider">Skills & Technologies</h3>
              </div>
              <div className="flex flex-wrap gap-2">
                {exp.skills.map((skill, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1.5 font-mono text-xs border border-quicksilver/20 dark:border-aurometalsaurus/20 bg-lightgray/5 dark:bg-blackolive/30 hover:border-bronze/40 hover:text-bronze transition-colors cursor-default"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>

            {/* Quick Stats */}
            <div className="p-6 border border-quicksilver/30 dark:border-aurometalsaurus/15 bg-white/5 space-y-4">
              <h3 className="font-mono text-sm uppercase font-bold tracking-wider text-bronze pb-3 border-b border-dashed border-aurometalsaurus/20">
                Company Details
              </h3>
              <div className="space-y-3 font-mono text-xs">
                <div>
                  <span className="opacity-60 block">Organization:</span>
                  <span className="text-sm font-bold opacity-95">{exp.company}</span>
                </div>
                <div>
                  <span className="opacity-60 block">Tenure:</span>
                  <span className="text-sm font-bold opacity-95">{exp.duration}</span>
                </div>
                <div>
                  <span className="opacity-60 block">Location:</span>
                  <span className="text-sm font-bold opacity-95">Remote / Hybrid</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
  );
}
