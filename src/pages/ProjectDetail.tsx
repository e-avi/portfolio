import React from "react";
import { useParams, Link } from "react-router-dom";
import {
  Github,
  ExternalLink,
  ArrowLeft,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Cpu,
  BarChart3
} from "lucide-react";
import { portfolioData } from "../data/portfolioData";

const getProjectHeroVisual = (id: string) => {
  if (id === "sudo-resume") {
    return (
      <div className="h-64 md:h-80 w-full relative overflow-hidden bg-gradient-to-br from-[#2B2F2E] via-[#353833] to-bronze/15 border-b border-quicksilver/20 dark:border-aurometalsaurus/15 flex items-center justify-center">
        <div className="absolute inset-0 opacity-[0.06] bg-[radial-gradient(#F4F0EC_2px,transparent_2px)] [background-size:24px_24px]"></div>
        
        {/* Document Wireframe scan simulation */}
        <div className="relative w-48 h-60 border border-bronze/20 bg-blackolive/20 p-4 space-y-4 rounded-none group-hover:border-bronze/40 transition-colors duration-500">
          <div className="w-12 h-2.5 bg-bronze/40"></div>
          <div className="space-y-1.5 pt-2">
            <div className="w-full h-1 bg-quicksilver/30"></div>
            <div className="w-5/6 h-1 bg-quicksilver/30"></div>
            <div className="w-4/6 h-1 bg-quicksilver/30"></div>
          </div>
          <div className="w-10 h-2 bg-bronze/30"></div>
          <div className="space-y-1.5 pt-1">
            <div className="w-full h-1 bg-quicksilver/30"></div>
            <div className="w-full h-1 bg-quicksilver/30"></div>
          </div>
          
          {/* Laser scanning line */}
          <div className="absolute left-0 right-0 h-0.5 bg-bronze animate-scan shadow-[0_0_10px_#C5A059]"></div>
        </div>
        
        {/* Metric badge overlay */}
        <div className="absolute top-8 right-8 bg-blackolive/80 border border-bronze/30 px-3 py-1.5 font-mono text-[10px] tracking-wider text-bronze uppercase">
          Score: ATS-98%
        </div>
      </div>
    );
  }
  
  if (id === "prompt-forge") {
    return (
      <div className="h-64 md:h-80 w-full relative overflow-hidden bg-gradient-to-br from-[#382E2B] via-[#40312D] to-bronze/15 border-b border-quicksilver/20 dark:border-aurometalsaurus/15 flex items-center justify-center">
        <div className="absolute inset-0 opacity-[0.05] bg-[linear-gradient(to_right,#3B3C36_1px,transparent_1px)] [background-size:32px_32px]"></div>
        
        {/* Version Tree Node Map */}
        <div className="relative flex items-center justify-center gap-12 font-mono text-xs">
          <div className="p-2 border border-bronze/30 bg-blackolive/40 relative z-10">
            v1.0.0
            <div className="absolute top-1/2 left-full w-12 h-px bg-bronze/30 -z-10"></div>
          </div>
          <div className="flex flex-col gap-6">
            <div className="p-2 border border-bronze/60 bg-bronze/10 relative z-10">
              v1.1.0-beta
              <div className="absolute top-1/2 left-full w-12 h-px bg-bronze/30 -z-10"></div>
            </div>
            <div className="p-2 border border-quicksilver/30 bg-blackolive/20 opacity-60">
              v1.0.1
            </div>
          </div>
          <div className="p-2 border border-bronze bg-bronze text-blackolive font-bold">
            v1.2.0 (Active)
          </div>
        </div>
        
        <div className="absolute bottom-4 right-8 font-mono text-[9px] uppercase tracking-widest opacity-40">
          PROMPT ENGINE COMPILING...
        </div>
      </div>
    );
  }
  
  if (id === "quicktag") {
    return (
      <div className="h-64 md:h-80 w-full relative overflow-hidden bg-gradient-to-br from-[#2E353B] via-[#343C42] to-bronze/15 border-b border-quicksilver/20 dark:border-aurometalsaurus/15 flex items-center justify-center">
        <div className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(#C5A059_1.5px,transparent_1.5px)] [background-size:18px_18px]"></div>
        
        {/* QR Matrix Overlay simulation */}
        <div className="w-36 h-36 border border-bronze/30 bg-blackolive/30 p-2.5 grid grid-cols-3 gap-2 relative">
          <div className="border-2 border-bronze p-1"><div className="w-full h-full bg-bronze/60"></div></div>
          <div className="flex flex-col justify-around py-1"><div className="h-1 bg-bronze/30"></div><div className="h-1 bg-bronze/30"></div></div>
          <div className="border-2 border-bronze p-1"><div className="w-full h-full bg-bronze/60"></div></div>
          
          <div className="col-span-2 flex flex-col justify-around"><div className="h-1 bg-bronze/30"></div><div className="h-1 bg-bronze/30"></div></div>
          <div className="w-3 h-3 bg-bronze self-center justify-self-center"></div>
          
          <div className="border-2 border-bronze p-1"><div className="w-full h-full bg-bronze/60"></div></div>
          <div className="col-span-2 flex flex-col justify-around"><div className="h-1 bg-bronze/30"></div><div className="h-1 bg-bronze/30"></div></div>
        </div>
        
        <div className="absolute top-8 left-8 font-mono text-[9px] uppercase tracking-widest opacity-50">
          SCANNING DATA LOGS
        </div>
      </div>
    );
  }

  // default omni-analytics or other
  return (
    <div className="h-64 md:h-80 w-full relative overflow-hidden bg-gradient-to-br from-[#2E3B33] via-[#33423A] to-bronze/15 border-b border-quicksilver/20 dark:border-aurometalsaurus/15 flex items-center justify-center">
      <div className="absolute inset-0 opacity-[0.06] bg-[linear-gradient(to_right,#3B3C36_1px,transparent_1px)] [background-size:24px_24px]"></div>
      
      {/* Chart bars animation simulation */}
      <div className="flex items-end gap-3 h-32 w-56 relative z-10">
        <div className="w-6 h-12 bg-bronze/20 border border-bronze/40"></div>
        <div className="w-6 h-24 bg-bronze/35 border border-bronze/60"></div>
        <div className="w-6 h-16 bg-bronze/20 border border-bronze/40"></div>
        <div className="w-6 h-28 bg-bronze text-blackolive font-bold border border-bronze flex items-center justify-center text-[10px] font-mono">
          99%
        </div>
        <div className="w-6 h-20 bg-bronze/40 border border-bronze/60"></div>
      </div>
    </div>
  );
};

export default function ProjectDetail() {
  const { id } = useParams<{ id: string }>();
  const project = portfolioData.projects.find((p) => p.id === id);

  if (!project) {
    return (
      <div className="py-24 text-center space-y-6">
        <h2 className="text-3xl font-display font-bold">Case Study Not Found</h2>
        <p className="opacity-70 max-w-md mx-auto">
          The project case study you are looking for does not exist or has been moved.
        </p>
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 px-6 py-3 bg-bronze text-blackolive font-bold hover:bg-bronze-dark transition-colors"
        >
          <ArrowLeft className="w-4 h-4" /> Back to Projects
        </Link>
      </div>
    );
  }

  return (
    <div className="py-12 space-y-12">
        {/* Navigation Link back */}
        <Link
          to="/projects"
          className="inline-flex items-center gap-2 text-sm font-mono font-bold text-bronze hover:underline group"
        >
          <ArrowLeft className="w-4 h-4 transition-transform group-hover:-translate-x-1" />
          Back to Projects
        </Link>

        {/* Dynamic Hero Cover Panel */}
        <div className="border border-quicksilver/30 dark:border-aurometalsaurus/20 overflow-hidden">
          {getProjectHeroVisual(project.id)}
          
          <div className="p-6 md:p-10 space-y-6">
            <div className="flex flex-wrap items-center gap-3">
              {project.featured && (
                <span className="text-xs font-mono font-bold tracking-wider px-3 py-1 bg-bronze/10 dark:bg-bronze/15 border border-bronze/35 text-bronze uppercase">
                  Featured Case Study
                </span>
              )}
              {project.tags.map((tag, idx) => (
                <span
                  key={idx}
                  className="text-xs font-mono px-3 py-1 rounded-none border border-quicksilver/35 dark:border-aurometalsaurus/20 bg-lightgray/10 dark:bg-blackolive/40"
                >
                  #{tag}
                </span>
              ))}
            </div>

            <h1 className="text-4xl md:text-6xl font-display font-medium italic tracking-tight">
              {project.title}
            </h1>

            <p className="text-lg md:text-xl opacity-90 max-w-3xl leading-relaxed font-sans">
              {project.description}
            </p>
            
            {/* CTA External Links */}
            <div className="flex flex-wrap gap-4 pt-4 border-t border-dashed border-aurometalsaurus/20">
              {project.githubUrl && (
                <a
                  href={project.githubUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 border border-current font-bold hover:text-bronze hover:border-bronze transition-colors bg-white/5 font-mono text-xs"
                >
                  <Github className="w-4 h-4" /> View Codebase
                </a>
              )}
              {project.liveUrl && (
                <a
                  href={project.liveUrl}
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-2 px-6 py-3 bg-bronze text-blackolive font-bold hover:bg-bronze-dark transition-colors font-mono text-xs"
                >
                  <ExternalLink className="w-4 h-4" /> Launch Live App
                </a>
              )}
            </div>
          </div>
        </div>

        {/* Detailed Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12">
          {/* Main Content Details */}
          <div className="lg:col-span-8 space-y-12">
            {/* Overview */}
            {project.longDescription && (
              <div className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-display font-semibold italic">Project Overview</h2>
                <div className="text-base md:text-lg leading-relaxed opacity-85 space-y-4 whitespace-pre-line font-sans">
                  {project.longDescription}
                </div>
              </div>
            )}

            {/* Key Features */}
            {project.keyFeatures && project.keyFeatures.length > 0 && (
              <div className="space-y-4">
                <h2 className="text-2xl md:text-3xl font-display font-semibold italic">Core Architecture & Features</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {project.keyFeatures.map((feat, idx) => (
                    <div
                      key={idx}
                      className="p-5 border border-quicksilver/30 dark:border-aurometalsaurus/15 bg-white/5 flex items-start gap-3"
                    >
                      <CheckCircle2 className="w-5 h-5 text-bronze shrink-0 mt-0.5" />
                      <p className="text-sm leading-relaxed opacity-90">{feat}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Challenges and Solutions */}
            {project.challengesAndSolutions && project.challengesAndSolutions.length > 0 && (
              <div className="space-y-6">
                <h2 className="text-2xl md:text-3xl font-display font-semibold italic">Technical Obstacles & Solutions</h2>
                <div className="space-y-6">
                  {project.challengesAndSolutions.map((item, idx) => (
                    <div
                      key={idx}
                      className="border border-quicksilver/30 dark:border-aurometalsaurus/15 overflow-hidden bg-white/5"
                    >
                      {/* Challenge header */}
                      <div className="px-6 py-4 bg-red-500/5 dark:bg-red-500/10 border-b border-quicksilver/20 dark:border-aurometalsaurus/15 flex items-start gap-3">
                        <AlertTriangle className="w-5 h-5 text-red-500 shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-xs font-mono uppercase tracking-wider text-red-500 font-bold">The Challenge</h4>
                          <p className="text-sm font-semibold leading-relaxed mt-1">{item.challenge}</p>
                        </div>
                      </div>
                      {/* Solution block */}
                      <div className="px-6 py-5 bg-emerald-500/5 dark:bg-emerald-500/10 flex items-start gap-3">
                        <Lightbulb className="w-5 h-5 text-emerald-500 shrink-0 mt-0.5" />
                        <div>
                          <h4 className="text-xs font-mono uppercase tracking-wider text-emerald-500 font-bold">The Solution</h4>
                          <p className="text-sm opacity-90 leading-relaxed mt-1">{item.solution}</p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>

          {/* Sidebar Info */}
          <div className="lg:col-span-4 space-y-8">
            {/* Tech Stack Breakdown */}
            {project.techStackDetails && project.techStackDetails.length > 0 && (
              <div className="p-6 border border-quicksilver/30 dark:border-aurometalsaurus/15 bg-white/5 space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-dashed border-aurometalsaurus/20 text-bronze">
                  <Cpu className="w-5 h-5" />
                  <h3 className="font-mono text-sm uppercase font-bold tracking-wider">Technologies Used</h3>
                </div>
                <ul className="space-y-2">
                  {project.techStackDetails.map((tech, idx) => (
                    <li key={idx} className="text-sm font-mono flex items-center gap-2 opacity-95">
                      <span className="w-1.5 h-1.5 bg-bronze rotate-45"></span>
                      {tech}
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Project Metrics & Impact */}
            {project.impactOrMetrics && project.impactOrMetrics.length > 0 && (
              <div className="p-6 border border-quicksilver/30 dark:border-aurometalsaurus/15 bg-white/5 space-y-4">
                <div className="flex items-center gap-2 pb-3 border-b border-dashed border-aurometalsaurus/20 text-bronze">
                  <BarChart3 className="w-5 h-5" />
                  <h3 className="font-mono text-sm uppercase font-bold tracking-wider">Project Impact</h3>
                </div>
                <div className="space-y-4">
                  {project.impactOrMetrics.map((metric, idx) => (
                    <div key={idx} className="flex items-start gap-3">
                      <span className="w-1.5 h-1.5 bg-bronze rotate-45 mt-2 shrink-0"></span>
                      <p className="text-sm opacity-90 leading-relaxed">{metric}</p>
                    </div>
                  ))}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
  );
}
