import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  ArrowRight,
  ChevronRight,
  CheckCircle,
  Send,
  Briefcase,
  Folder,
  Code,
  BookOpen,
} from "lucide-react";
import { portfolioData } from "../data/portfolioData";

export default function Portfolio() {
  const [projectFilter, setProjectFilter] = useState<string>("All");
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  const allTags = [
    "All",
    "Featured",
    ...new Set(portfolioData.projects.flatMap((p) => p.tags)),
  ];

  const filteredProjects = portfolioData.projects.filter((project) => {
    if (projectFilter === "All") return true;
    if (projectFilter === "Featured") return !!project.featured;
    return project.tags.includes(projectFilter);
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.email && formData.message) {
      setFormSubmitted(true);
      setTimeout(() => {
        setFormSubmitted(false);
        setFormData({ name: "", email: "", message: "" });
      }, 5000);
    }
  };

  return (
    <div className="py-12 space-y-16">
      {/* HERO SECTION */}
      <section id="hero" className="space-y-6 pt-4 pb-2">
        <div className="space-y-2">
          <h1 className="text-3xl sm:text-4xl font-bold tracking-tight text-blackolive dark:text-isabelline">
            {portfolioData.name}
          </h1>
          <p className="text-sm sm:text-base font-mono text-bronze font-medium">
            {portfolioData.subtitle}
          </p>
        </div>

        <p className="text-base sm:text-lg leading-relaxed text-blackolive/80 dark:text-quicksilver max-w-2xl">
          {portfolioData.bio}
        </p>

        {/* Quick Social & Action Links */}
        <div className="flex flex-wrap items-center gap-4 pt-2">
          <a
            href={portfolioData.socials.github}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded border border-lightgray dark:border-aurometalsaurus/30 hover:border-bronze hover:text-bronze transition-colors"
          >
            <Github className="w-3.5 h-3.5" /> GitHub
          </a>
          <a
            href={portfolioData.socials.linkedin}
            target="_blank"
            rel="noreferrer"
            className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded border border-lightgray dark:border-aurometalsaurus/30 hover:border-bronze hover:text-bronze transition-colors"
          >
            <Linkedin className="w-3.5 h-3.5" /> LinkedIn
          </a>
          <a
            href={portfolioData.socials.email}
            className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded border border-lightgray dark:border-aurometalsaurus/30 hover:border-bronze hover:text-bronze transition-colors"
          >
            <Mail className="w-3.5 h-3.5" /> Email
          </a>
          <a
            href="#contact"
            className="inline-flex items-center gap-1.5 text-xs font-mono px-3 py-1.5 rounded bg-bronze text-white dark:text-blackolive font-medium hover:opacity-90 transition-opacity"
          >
            Get in touch
          </a>
        </div>
      </section>

      {/* EXPERIENCE / CAREER SECTION */}
      <section id="experience" className="border-t border-lightgray dark:border-aurometalsaurus/20 pt-12 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <Briefcase className="w-4 h-4 text-bronze" />
            <h2 className="text-xl font-bold tracking-tight">Work Experience</h2>
          </div>
          <Link
            to="/career"
            className="text-xs font-mono text-bronze hover:underline inline-flex items-center gap-1"
          >
            View all & details <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="relative border-l border-lightgray dark:border-aurometalsaurus/30 pl-5 space-y-8 ml-2">
          {portfolioData.experience.map((exp, idx) => (
            <div key={idx} className="relative group space-y-2">
              {/* Dot bullet indicator */}
              <span className="absolute -left-[25px] top-1.5 w-2 h-2 rounded-full bg-lightgray dark:bg-aurometalsaurus group-hover:bg-bronze transition-colors" />

              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1">
                <div>
                  <h3 className="text-base font-semibold tracking-tight text-blackolive dark:text-isabelline">
                    {exp.role}
                  </h3>
                  <p className="text-sm font-mono text-bronze font-medium">
                    {exp.company}
                  </p>
                </div>
                <span className="text-xs font-mono text-aurometalsaurus dark:text-quicksilver shrink-0">
                  {exp.duration}
                </span>
              </div>

              <ul className="space-y-1 list-disc list-inside text-sm leading-relaxed text-blackolive/80 dark:text-quicksilver">
                {exp.description.map((desc, dIdx) => (
                  <li key={dIdx}>{desc}</li>
                ))}
              </ul>

              <div className="flex flex-wrap items-center justify-between gap-2 pt-1">
                <div className="flex flex-wrap gap-1.5">
                  {exp.skills.map((skill, sIdx) => (
                    <span
                      key={sIdx}
                      className="text-[11px] font-mono px-2 py-0.5 rounded bg-lightgray/40 dark:bg-aurometalsaurus/15 text-blackolive/80 dark:text-quicksilver"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
                <Link
                  to={`/career/${exp.id}`}
                  className="text-xs font-mono text-bronze hover:underline inline-flex items-center gap-1"
                >
                  Case study <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section id="projects" className="border-t border-lightgray dark:border-aurometalsaurus/20 pt-12 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-2">
            <Folder className="w-4 h-4 text-bronze" />
            <h2 className="text-xl font-bold tracking-tight">Projects</h2>
          </div>

          {/* Filter Pills */}
          <div className="flex flex-wrap gap-1.5">
            {allTags.slice(0, 5).map((tag) => (
              <button
                key={tag}
                onClick={() => setProjectFilter(tag)}
                className={`px-2.5 py-1 rounded text-xs font-mono transition-colors cursor-pointer ${
                  projectFilter === tag
                    ? "bg-bronze text-white dark:text-blackolive font-semibold"
                    : "border border-lightgray dark:border-aurometalsaurus/30 text-aurometalsaurus dark:text-quicksilver hover:border-bronze hover:text-bronze"
                }`}
              >
                {tag}
              </button>
            ))}
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {filteredProjects.map((project, idx) => (
            <div
              key={idx}
              className="p-5 rounded border border-lightgray dark:border-aurometalsaurus/20 bg-white/40 dark:bg-blackolive/30 flex flex-col justify-between space-y-4 hover:border-bronze/60 transition-colors"
            >
              <div className="space-y-2">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-2">
                    <h3 className="font-semibold text-base tracking-tight text-blackolive dark:text-isabelline">
                      {project.title}
                    </h3>
                    {project.featured && (
                      <span className="text-[10px] font-mono px-1.5 py-0.5 rounded bg-bronze/15 text-bronze font-medium">
                        Featured
                      </span>
                    )}
                  </div>
                  <div className="flex items-center gap-2">
                    {project.githubUrl && (
                      <a
                        href={project.githubUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-aurometalsaurus hover:text-bronze transition-colors"
                        aria-label="GitHub Repository"
                      >
                        <Github className="w-4 h-4" />
                      </a>
                    )}
                    {project.liveUrl && (
                      <a
                        href={project.liveUrl}
                        target="_blank"
                        rel="noreferrer"
                        className="text-aurometalsaurus hover:text-bronze transition-colors"
                        aria-label="Live Demo"
                      >
                        <ExternalLink className="w-4 h-4" />
                      </a>
                    )}
                  </div>
                </div>

                <p className="text-xs sm:text-sm text-blackolive/80 dark:text-quicksilver leading-relaxed">
                  {project.description}
                </p>
              </div>

              <div className="flex items-center justify-between pt-2 border-t border-lightgray/40 dark:border-aurometalsaurus/15">
                <div className="flex flex-wrap gap-1.5">
                  {project.tags.slice(0, 3).map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-[10px] font-mono text-aurometalsaurus dark:text-quicksilver"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
                <Link
                  to={`/projects/${project.id}`}
                  className="text-xs font-mono text-bronze hover:underline inline-flex items-center gap-1"
                >
                  Details <ChevronRight className="w-3 h-3" />
                </Link>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center pt-2">
          <Link
            to="/projects"
            className="inline-flex items-center gap-1.5 text-xs font-mono text-bronze hover:underline"
          >
            View full project archive <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section id="skills" className="border-t border-lightgray dark:border-aurometalsaurus/20 pt-12 space-y-6">
        <div className="flex items-center gap-2">
          <Code className="w-4 h-4 text-bronze" />
          <h2 className="text-xl font-bold tracking-tight">Technical Toolkit</h2>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-6">
          {portfolioData.skills.map((cat, idx) => (
            <div key={idx} className="space-y-2">
              <h3 className="text-xs font-mono uppercase tracking-wider text-aurometalsaurus dark:text-quicksilver font-semibold">
                {cat.category}
              </h3>
              <div className="flex flex-wrap gap-1.5">
                {cat.skills.map((skill, sIdx) => (
                  <span
                    key={sIdx}
                    className="text-xs font-mono px-2 py-1 rounded border border-lightgray dark:border-aurometalsaurus/20 bg-lightgray/20 dark:bg-blackolive/40 text-blackolive/80 dark:text-quicksilver"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* WRITING / BLOGS SECTION */}
      <section id="blogs" className="border-t border-lightgray dark:border-aurometalsaurus/20 pt-12 space-y-6">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <BookOpen className="w-4 h-4 text-bronze" />
            <h2 className="text-xl font-bold tracking-tight">Recent Writing</h2>
          </div>
          <Link
            to="/blogs"
            className="text-xs font-mono text-bronze hover:underline inline-flex items-center gap-1"
          >
            All articles <ArrowRight className="w-3 h-3" />
          </Link>
        </div>

        <div className="space-y-3">
          {portfolioData.blogs.slice(0, 3).map((post) => (
            <Link
              key={post.id}
              to={`/blogs/${post.id}`}
              className="block p-4 rounded border border-lightgray dark:border-aurometalsaurus/20 hover:border-bronze/60 transition-colors group"
            >
              <div className="flex flex-col sm:flex-row sm:items-baseline justify-between gap-1 mb-1">
                <h3 className="font-semibold text-base group-hover:text-bronze transition-colors text-blackolive dark:text-isabelline">
                  {post.title}
                </h3>
                <span className="text-xs font-mono text-aurometalsaurus dark:text-quicksilver shrink-0">
                  {post.publishDate} · {post.readTime}
                </span>
              </div>
              <p className="text-xs sm:text-sm text-blackolive/75 dark:text-quicksilver line-clamp-2 leading-relaxed">
                {post.summary}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section id="contact" className="border-t border-lightgray dark:border-aurometalsaurus/20 pt-12 space-y-8">
        <div className="space-y-2">
          <div className="flex items-center gap-2">
            <Mail className="w-4 h-4 text-bronze" />
            <h2 className="text-xl font-bold tracking-tight">Get In Touch</h2>
          </div>
          <p className="text-sm text-blackolive/80 dark:text-quicksilver max-w-xl leading-relaxed">
            Feel free to reach out for collaborations, engineering opportunities, or AI governance discussions.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-12 gap-8">
          <div className="md:col-span-5 space-y-4 font-mono text-xs sm:text-sm">
            <div className="p-4 rounded border border-lightgray dark:border-aurometalsaurus/20 space-y-3">
              <div>
                <span className="text-xs text-aurometalsaurus uppercase tracking-wider block mb-1">Direct Email</span>
                <a
                  href={portfolioData.socials.email}
                  className="font-medium hover:text-bronze transition-colors break-all"
                >
                  {portfolioData.socials.email.replace("mailto:", "")}
                </a>
              </div>
              <div>
                <span className="text-xs text-aurometalsaurus uppercase tracking-wider block mb-1">Location</span>
                <span className="text-blackolive/80 dark:text-quicksilver">Remote / Worldwide</span>
              </div>
            </div>
          </div>

          <div className="md:col-span-7">
            {formSubmitted ? (
              <div className="p-6 rounded border border-bronze/40 flex flex-col items-center justify-center text-center space-y-2 bg-lightgray/10 dark:bg-blackolive/40">
                <CheckCircle className="w-8 h-8 text-bronze" />
                <h3 className="font-semibold text-base">Message Sent</h3>
                <p className="text-xs text-aurometalsaurus dark:text-quicksilver">
                  Thanks for reaching out! I will get back to you shortly.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-3">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                  <div>
                    <input
                      type="text"
                      required
                      placeholder="Name"
                      value={formData.name}
                      onChange={(e) =>
                        setFormData({ ...formData, name: e.target.value })
                      }
                      className="w-full px-3 py-2 text-xs rounded border border-lightgray dark:border-aurometalsaurus/30 bg-transparent text-blackolive dark:text-isabelline placeholder:text-aurometalsaurus focus:outline-none focus:border-bronze"
                    />
                  </div>
                  <div>
                    <input
                      type="email"
                      required
                      placeholder="Email"
                      value={formData.email}
                      onChange={(e) =>
                        setFormData({ ...formData, email: e.target.value })
                      }
                      className="w-full px-3 py-2 text-xs rounded border border-lightgray dark:border-aurometalsaurus/30 bg-transparent text-blackolive dark:text-isabelline placeholder:text-aurometalsaurus focus:outline-none focus:border-bronze"
                    />
                  </div>
                </div>
                <div>
                  <textarea
                    rows={3}
                    required
                    placeholder="Message"
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    className="w-full px-3 py-2 text-xs rounded border border-lightgray dark:border-aurometalsaurus/30 bg-transparent text-blackolive dark:text-isabelline placeholder:text-aurometalsaurus focus:outline-none focus:border-bronze resize-none"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2 text-xs font-mono rounded bg-bronze text-white dark:text-blackolive font-medium hover:opacity-90 transition-opacity flex items-center gap-1.5 cursor-pointer"
                >
                  <Send className="w-3.5 h-3.5" /> Send message
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
