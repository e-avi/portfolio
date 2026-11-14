import { useState } from "react";
import { Link } from "react-router-dom";
import { Folder, Github, ExternalLink, ArrowRight, ArrowLeft } from "lucide-react";
import { portfolioData } from "../data/portfolioData";

const getProjectVisual = (index: number) => {
  const gradients = [
    "from-[#2B2F2E] via-[#353833] to-bronze/10",
    "from-[#382E2B] via-[#40312D] to-bronze/10",
    "from-[#2E353B] via-[#343C42] to-bronze/10",
    "from-[#2E3B33] via-[#33423A] to-bronze/10",
  ];
  const gradient = gradients[index % gradients.length];
  
  return (
    <div className={`h-40 w-full relative overflow-hidden bg-gradient-to-br ${gradient} border-b border-quicksilver/20 dark:border-aurometalsaurus/10 flex items-center justify-center transition-all duration-500`}>
      <div className="absolute inset-0 opacity-[0.08] bg-[radial-gradient(#F4F0EC_1.5px,transparent_1.5px)] [background-size:20px_20px]"></div>
      
      {/* Visual wireframe accents */}
      <div className="absolute w-28 h-28 border border-bronze/15 rounded-full group-hover:scale-110 group-hover:border-bronze/35 transition-all duration-700"></div>
      <div className="absolute w-20 h-20 border border-dashed border-bronze/20 rotate-45 group-hover:rotate-12 group-hover:scale-105 transition-all duration-700"></div>
      
      {/* Floating glowing core */}
      <div className="absolute w-6 h-6 rotate-45 bg-bronze/15 group-hover:bg-bronze/30 border border-bronze/60 group-hover:border-bronze group-hover:scale-125 transition-all duration-500 shadow-[0_0_15px_rgba(197,160,89,0.2)]"></div>
      
      {/* Category Monospace Signifier */}
      <span className="absolute bottom-3 left-4 font-mono text-[9px] uppercase tracking-widest opacity-45">
        SYS-NODE // {index + 1}
      </span>
    </div>
  );
};

export default function Projects() {
  const [projectFilter, setProjectFilter] = useState<string>("All");

  // Get unique tags for project filtering
  const allTags = [
    "All",
    "Featured",
    ...new Set(portfolioData.projects.flatMap((p) => p.tags)),
  ];

  // Filter projects based on selected filter
  const filteredProjects = portfolioData.projects.filter((project) => {
    if (projectFilter === "All") return true;
    if (projectFilter === "Featured") return !!project.featured;
    return project.tags.includes(projectFilter);
  });

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

        <div className="flex flex-col lg:flex-row lg:items-end justify-between gap-6 border-b border-dashed border-aurometalsaurus/20 pb-8">
          <div className="space-y-4">
            <div className="inline-flex items-center gap-2 text-bronze font-mono text-sm tracking-wider uppercase">
              <Folder className="w-4 h-4" />
              <span>My Creations</span>
            </div>
            <h1 className="text-4xl md:text-6xl font-display font-medium italic tracking-tight">
              Featured Projects
            </h1>
            <p className="text-lg opacity-80 max-w-2xl leading-relaxed">
              Explore case studies and live deployments of tools, systems, and platforms I have engineered.
            </p>
          </div>

          {/* Filters list */}
          <div className="flex flex-wrap gap-2 max-w-full">
            {allTags.map((tag) => (
              <button
                key={tag}
                onClick={() => setProjectFilter(tag)}
                className={`px-3 py-1.5 rounded-none text-xs font-mono font-medium transition-all border cursor-pointer ${
                  projectFilter === tag
                    ? "bg-bronze text-blackolive border-bronze font-semibold"
                    : "border-quicksilver/35 dark:border-aurometalsaurus/20 hover:border-bronze/45 hover:bg-bronze/5 text-current"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        {/* Grid display */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {filteredProjects.map((project, idx) => (
            <div
              key={idx}
              className="group rounded border flex flex-col justify-between overflow-hidden transition-colors bg-white/50 dark:bg-blackolive/60 border-lightgray dark:border-aurometalsaurus/20 hover:border-bronze/50"
            >
              <div>
                {/* Abstract Visual Header */}
                {getProjectVisual(idx)}

                <div className="p-6 md:p-8 space-y-4">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Folder className="w-5 h-5 text-bronze" />
                      {project.featured && (
                        <span className="text-[10px] font-mono font-bold tracking-wider px-2 py-0.5 rounded-none uppercase border bg-lightgray/20 dark:bg-bronze/15 border-quicksilver/45 dark:border-bronze/35 text-bronze">
                          Featured
                        </span>
                      )}
                    </div>

                    {/* Links */}
                    <div className="flex items-center gap-3">
                      {project.githubUrl && (
                        <a
                          href={project.githubUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:text-bronze transition-colors duration-200"
                          aria-label="GitHub Repository"
                        >
                          <Github className="w-5 h-5" />
                        </a>
                      )}
                      {project.liveUrl && (
                        <a
                          href={project.liveUrl}
                          target="_blank"
                          rel="noreferrer"
                          className="hover:text-bronze transition-colors duration-200"
                          aria-label="Live Demo Link"
                        >
                          <ExternalLink className="w-5 h-5" />
                        </a>
                      )}
                    </div>
                  </div>

                  <h3 className="text-xl font-bold tracking-tight group-hover:text-bronze transition-colors duration-200 font-display italic">
                    {project.title}
                  </h3>

                  <p className="text-sm leading-relaxed opacity-85 min-h-[48px]">
                    {project.description}
                  </p>

                  <div className="pt-2">
                    <Link
                      to={`/projects/${project.id}`}
                      className="text-xs font-mono font-bold text-bronze hover:underline inline-flex items-center gap-1.5 transition-all group-hover:translate-x-1"
                    >
                      Case Study & Deep Dive <ArrowRight className="w-3 h-3" />
                    </Link>
                  </div>
                </div>
              </div>

              {/* Tags footer */}
              <div className="px-6 py-4 flex flex-wrap gap-2 border-t bg-lightgray/5 dark:bg-blackolive/20 border-quicksilver/20 dark:border-aurometalsaurus/10">
                {project.tags.map((tag, tIdx) => (
                  <span
                    key={tIdx}
                    className="text-[10px] font-mono opacity-80 hover:opacity-100 cursor-default uppercase tracking-wider text-bronze"
                  >
                    #{tag.toLowerCase()}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>

        {filteredProjects.length === 0 && (
          <div className="text-center py-16 opacity-60">
            <p>No projects found matching the selected tag filter.</p>
          </div>
        )}
      </div>
  );
}
