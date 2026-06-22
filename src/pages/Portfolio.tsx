import React, { useState } from "react";
import { Link } from "react-router-dom";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code,
  Briefcase,
  Folder,
  Send,
  Terminal,
  Cpu,
  Layers,
  CheckCircle,
  BookOpen,
  Clock,
  ArrowRight,
  ChevronRight,
  Tag,
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

  // Handle contact form submission
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

  // Icon selector based on skill category name
  const getCategoryIcon = (category: string) => {
    const name = category.toLowerCase();
    if (name.includes("lang"))
      return <Terminal className="w-5 h-5 text-bronze" />;
    if (name.includes("front"))
      return <Layers className="w-5 h-5 text-bronze" />;
    if (name.includes("back") || name.includes("data"))
      return <Cpu className="w-5 h-5 text-bronze" />;
    return <Code className="w-5 h-5 text-bronze" />;
  };

  return (
    <div className="py-12 space-y-12">
      {/* HERO SECTION */}
      <section
        id="hero"
        className="min-h-[80vh] flex flex-col items-center justify-center gap-8 py-12 relative text-center animate-fade-in"
      >
        <div className="space-y-6 max-w-4xl flex flex-col items-center justify-center">
          <h1 className="text-6xl md:text-9xl font-semibold tracking-tight leading-[1.05] font-display">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-bronze via-quicksilver to-lightgray">
              {portfolioData.name}
            </span>
          </h1>

          <p className="text-xs md:text-sm font-mono uppercase tracking-[0.25em] font-semibold text-bronze">
            {portfolioData.subtitle}
          </p>

          <p className="text-lg md:text-xl leading-relaxed max-w-3xl text-blackolive/90 dark:text-lightgray/90">
            {portfolioData.bio}
          </p>

          {/* Action CTA */}
          <div className="pt-4">
            <Link
              to="/#projects"
              className="px-8 py-4 rounded-none font-semibold shadow-lg hover:shadow-xl hover:shadow-bronze/10 transition-all hover:-translate-y-0.5 duration-200 border cursor-pointer inline-block bg-bronze text-blackolive border-bronze hover:bg-bronze-dark"
            >
              Explore Projects
            </Link>
          </div>

          <br />

          {/* Social Links */}
          <div className="flex items-center justify-center gap-8 pt-6">
            <a
              href={portfolioData.socials.github}
              target="_blank"
              rel="noreferrer"
              className="p-3.5 rounded-none transition-all hover:scale-110 hover:text-bronze border border-quicksilver/30 dark:border-aurometalsaurus/20 bg-lightgray/10 dark:bg-aurometalsaurus/5 hover:border-bronze/40 hover:bg-bronze/5"
              aria-label="GitHub Profile"
            >
              <Github className="w-8 h-8" />
            </a>
            <a
              href={portfolioData.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="p-3.5 rounded-none transition-all hover:scale-110 hover:text-bronze border border-quicksilver/30 dark:border-aurometalsaurus/20 bg-lightgray/10 dark:bg-aurometalsaurus/5 hover:border-bronze/40 hover:bg-bronze/5"
              aria-label="LinkedIn Profile"
            >
              <Linkedin className="w-8 h-8" />
            </a>
            <a
              href={portfolioData.socials.email}
              className="p-3.5 rounded-none transition-all hover:scale-110 hover:text-bronze border border-quicksilver/30 dark:border-aurometalsaurus/20 bg-lightgray/10 dark:bg-aurometalsaurus/5 hover:border-bronze/40 hover:bg-bronze/5"
              aria-label="Send Email"
            >
              <Mail className="w-8 h-8" />
            </a>
          </div>
        </div>
      </section>

      {/* EXPERIENCE TIMELINE SECTION (CAREER) */}
      <section
        id="experience"
        className="py-24 border-t border-dashed border-aurometalsaurus/20"
      >
        <div className="max-w-4xl mx-auto space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-dashed border-aurometalsaurus/20 pb-6">
            <div className="space-y-3 text-left">
              <div className="inline-flex items-center gap-2 text-bronze font-mono text-xs uppercase tracking-wider">
                <Briefcase className="w-4 h-4" />
                <span>Professional Experience</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-display font-medium italic tracking-tight">
                Work Timeline
              </h2>
            </div>
            <Link
              to="/career"
              className="text-sm font-mono font-bold text-bronze hover:underline inline-flex items-center gap-1.5 self-start md:self-end"
            >
              Detailed Timeline & Case Studies <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="relative pl-6 md:pl-8 border-l border-aurometalsaurus/25 space-y-12 py-4">
            {portfolioData.experience.map((exp, idx) => (
              <div key={idx} className="relative group">
                {/* Timeline bullet indicator */}
                <span className="absolute -left-[28px] md:-left-[36px] top-2.5 w-2.5 h-2.5 rotate-45 border-2 transition-all duration-300 group-hover:scale-125 bg-isabelline dark:bg-blackolive border-bronze/60 group-hover:bg-bronze"></span>

                {/* Experience Card */}
                <div className="p-6 rounded-none border transition-all duration-300 bg-white dark:bg-[#2E2F2A] border-quicksilver/30 dark:border-aurometalsaurus/20 hover:border-bronze/45 hover:shadow-md">
                  <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                    <div>
                      <h3 className="text-lg font-bold tracking-tight">
                        {exp.role}
                      </h3>
                      <p className="text-sm font-semibold text-bronze font-mono">
                        {exp.company}
                      </p>
                    </div>
                    <span className="text-xs font-mono px-3 py-1 rounded-none border self-start md:self-center bg-lightgray/15 dark:bg-blackolive/60 border-quicksilver/30 dark:border-aurometalsaurus/15 text-blackolive dark:text-lightgray">
                      {exp.duration}
                    </span>
                  </div>

                  <ul className="space-y-2 mb-6 list-disc list-inside text-sm leading-relaxed text-blackolive/80 dark:text-lightgray">
                    {exp.description.map((desc, dIdx) => (
                      <li key={dIdx}>{desc}</li>
                    ))}
                  </ul>

                  <div className="flex flex-wrap gap-1.5 pt-3 border-t border-dashed border-aurometalsaurus/10">
                    {exp.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="text-[10px] font-mono px-2.5 py-0.5 rounded-none border transition-all duration-200 cursor-default bg-lightgray/10 dark:bg-blackolive/40 border-quicksilver/20 dark:border-aurometalsaurus/20 text-blackolive/80 dark:text-lightgray hover:border-bronze/40 hover:text-blackolive dark:hover:text-isabelline"
                      >
                        #{skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* SKILLS SECTION */}
      <section
        id="skills"
        className="py-24 border-t border-dashed border-aurometalsaurus/20"
      >
        <div className="space-y-12">
          <div className="space-y-4 text-center">
            <div className="inline-flex items-center gap-2 text-bronze font-mono text-sm tracking-wider uppercase">
              <Code className="w-4 h-4" />
              <span>My Toolkit</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-medium tracking-tight italic">
              Technical Expertise
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {portfolioData.skills.map((cat, idx) => (
              <div
                key={idx}
                className="p-6 rounded-none border flex flex-col justify-between transition-all duration-300 hover:-translate-y-1 hover:shadow-lg bg-white dark:bg-[#2E2F2A] border-quicksilver/30 dark:border-aurometalsaurus/20 hover:border-bronze/45"
              >
                <div>
                  <div className="flex items-center gap-3 mb-6">
                    {getCategoryIcon(cat.category)}
                    <h3 className="font-bold text-lg tracking-tight font-display italic">
                      {cat.category}
                    </h3>
                  </div>
                  <div className="flex flex-wrap gap-2">
                    {cat.skills.map((skill, sIdx) => (
                      <span
                        key={sIdx}
                        className="px-3 py-1.5 rounded-none text-xs font-mono font-medium border transition-all duration-200 cursor-default bg-lightgray/15 dark:bg-blackolive/60 border-quicksilver/30 dark:border-aurometalsaurus/15 text-blackolive dark:text-lightgray hover:border-bronze/40 hover:bg-lightgray/30 dark:hover:text-isabelline"
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* PROJECTS SECTION */}
      <section
        id="projects"
        className="py-24 border-t border-dashed border-aurometalsaurus/20"
      >
        <div className="space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div className="space-y-4">
              <div className="inline-flex items-center gap-2 text-bronze font-mono text-sm tracking-wider uppercase">
                <Folder className="w-4 h-4" />
                <span>My Creations</span>
              </div>
              <h2 className="text-4xl md:text-5xl font-display font-medium tracking-tight italic">
                Featured Projects
              </h2>
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
                      : "border-quicksilver/35 dark:border-aurometalsaurus/20 text-blackolive/70 dark:text-lightgray hover:border-bronze/40 hover:bg-bronze/5"
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
                className="group rounded-none border flex flex-col justify-between overflow-hidden transition-all duration-300 hover:-translate-y-1 bg-white dark:bg-[#2E2F2A] border-quicksilver/30 dark:border-aurometalsaurus/20 hover:border-bronze/45"
              >
                <div className="p-6 md:p-8 space-y-4">
                  {/* Header */}
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <Folder className="w-5 h-5 text-bronze" />
                      {project.featured && (
                        <span className="text-[10px] font-mono font-bold tracking-wider px-2 py-0.5 rounded-none uppercase border bg-lightgray/20 dark:bg-bronze/15 border-quicksilver/45 dark:border-bronze/35 text-blackolive dark:text-isabelline">
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

                  <p className="text-sm leading-relaxed text-blackolive/80 dark:text-lightgray">
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

                {/* Tags footer */}
                <div className="px-6 py-4 flex flex-wrap gap-2 border-t bg-lightgray/5 dark:bg-blackolive/20 border-quicksilver/20 dark:border-aurometalsaurus/10">
                  {project.tags.map((tag, tIdx) => (
                    <span
                      key={tIdx}
                      className="text-xs font-mono opacity-85 hover:opacity-100 cursor-default text-bronze"
                    >
                      #{tag.toLowerCase()}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>

          <div className="text-center pt-8">
            <Link
              to="/projects"
              className="inline-flex items-center gap-2 font-mono text-sm font-bold text-bronze hover:underline group"
            >
              View All Projects & Tech Case Studies
              <ArrowRight className="w-4 h-4 transition-transform group-hover:translate-x-1" />
            </Link>
          </div>

          {filteredProjects.length === 0 && (
            <div className="text-center py-16 opacity-60">
              <p>No projects found matching the selected tag filter.</p>
            </div>
          )}
        </div>
      </section>

      {/* BLOGS SECTION */}
      <section
        id="blogs"
        className="py-24 border-t border-dashed border-aurometalsaurus/20"
      >
        <div className="space-y-12">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-6 border-b border-dashed border-aurometalsaurus/20 pb-6">
            <div className="space-y-3 text-left">
              <div className="inline-flex items-center gap-2 text-bronze font-mono text-xs uppercase tracking-wider">
                <BookOpen className="w-4 h-4" />
                <span>Recent Writing</span>
              </div>
              <h2 className="text-3xl md:text-5xl font-display font-medium italic tracking-tight">
                Latest Insights
              </h2>
            </div>
            <Link
              to="/blogs"
              className="text-sm font-mono font-bold text-bronze hover:underline inline-flex items-center gap-1.5 self-start md:self-end"
            >
              Read All Articles <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {portfolioData.blogs.slice(0, 2).map((post, bIdx) => (
              <article
                key={post.id}
                className="group border flex flex-col justify-between overflow-hidden transition-all duration-300 hover:-translate-y-1 bg-white dark:bg-[#2E2F2A] border-quicksilver/30 dark:border-aurometalsaurus/20 hover:border-bronze/45"
              >
                <div className="p-6 md:p-8 space-y-4">
                  <div className="flex items-center justify-between text-xs font-mono opacity-70">
                    <span className="text-bronze font-bold uppercase tracking-wider">{post.category}</span>
                    <span className="flex items-center gap-1"><Clock className="w-3.5 h-3.5" /> {post.readTime}</span>
                  </div>

                  <h3 className="text-xl font-bold font-display italic tracking-tight leading-snug group-hover:text-bronze transition-colors duration-200">
                    <Link to={`/blogs/${post.id}`}>{post.title}</Link>
                  </h3>

                  <p className="text-sm opacity-85 leading-relaxed line-clamp-3">
                    {post.summary}
                  </p>
                </div>

                <div className="px-6 py-4 border-t border-dashed border-aurometalsaurus/15 flex items-center justify-between bg-lightgray/5 dark:bg-blackolive/20 text-xs font-mono">
                  <span className="opacity-60">{post.publishDate}</span>
                  <Link
                    to={`/blogs/${post.id}`}
                    className="font-bold text-bronze hover:underline inline-flex items-center gap-1 hover:translate-x-1 transition-transform"
                  >
                    Read Post <ChevronRight className="w-3.5 h-3.5" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CONTACT SECTION */}
      <section
        id="contact"
        className="py-24 border-t border-dashed border-aurometalsaurus/20"
      >
        <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
          {/* Info Panel */}
          <div className="lg:col-span-5 space-y-6">
            <div className="flex items-center gap-2 text-bronze font-mono text-sm tracking-wider uppercase">
              <Mail className="w-4 h-4" />
              <span>Contact Info</span>
            </div>
            <h2 className="text-4xl md:text-5xl font-display font-medium tracking-tight italic">
              Let's Connect
            </h2>
            <p className="text-sm md:text-base leading-relaxed text-blackolive/80 dark:text-lightgray">
              I'm always open to discussing new opportunities, collaborations,
              creative ideas, or questions about web development and designs.
            </p>

            <div className="space-y-4 pt-4 font-mono text-xs md:text-sm">
              <a
                href={portfolioData.socials.email}
                className="flex items-center gap-3 hover:text-bronze transition-colors"
              >
                <Mail className="w-4 h-4 text-bronze shrink-0" />
                <span>
                  {portfolioData.socials.email.replace("mailto:", "")}
                </span>
              </a>
              <div className="flex items-center gap-3">
                <span className="w-3.5 h-3.5 block border border-bronze rotate-45 shrink-0 flex items-center justify-center">
                  <span className="w-1.5 h-1.5 bg-bronze rotate-45"></span>
                </span>
                <span>Remote / Global Work</span>
              </div>
            </div>
          </div>

          {/* Input Form */}
          <div className="lg:col-span-7">
            {formSubmitted ? (
              <div className="p-8 rounded-none border flex flex-col items-center justify-center text-center space-y-4 min-h-[300px] transition-all duration-300 bg-white dark:bg-[#2E2F2A] border-bronze/35 text-blackolive dark:text-isabelline">
                <CheckCircle className="w-12 h-12 text-bronze animate-bounce" />
                <h3 className="text-xl font-bold tracking-tight">
                  Message Transmitted!
                </h3>
                <p className="text-sm max-w-sm text-blackolive/75 dark:text-lightgray">
                  Thanks for reaching out, Avi! Your message details have been
                  saved, and I will get back to you shortly.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="p-6 md:p-8 rounded-none border space-y-6 transition-all duration-350 bg-white dark:bg-[#2E2F2A] border-quicksilver/30 dark:border-aurometalsaurus/20 focus-within:border-bronze/30"
              >
                <div className="space-y-2">
                  <label
                    htmlFor="form-name"
                    className="text-xs font-mono font-semibold tracking-wide uppercase text-bronze"
                  >
                    Your Name
                  </label>
                  <input
                    id="form-name"
                    type="text"
                    required
                    value={formData.name}
                    onChange={(e) =>
                      setFormData({ ...formData, name: e.target.value })
                    }
                    placeholder="Jane Doe"
                    className="w-full px-4 py-3 rounded-none border text-sm outline-none transition-all duration-200 bg-lightgray/5 dark:bg-blackolive/40 border-quicksilver/35 dark:border-aurometalsaurus/25 focus:border-bronze text-blackolive dark:text-isabelline placeholder:text-quicksilver dark:placeholder:text-quicksilver/50"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="form-email"
                    className="text-xs font-mono font-semibold tracking-wide uppercase text-bronze"
                  >
                    Email Address
                  </label>
                  <input
                    id="form-email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={(e) =>
                      setFormData({ ...formData, email: e.target.value })
                    }
                    placeholder="jane@example.com"
                    className="w-full px-4 py-3 rounded-none border text-sm outline-none transition-all duration-200 bg-lightgray/5 dark:bg-blackolive/40 border-quicksilver/35 dark:border-aurometalsaurus/25 focus:border-bronze text-blackolive dark:text-isabelline placeholder:text-quicksilver dark:placeholder:text-quicksilver/50"
                  />
                </div>

                <div className="space-y-2">
                  <label
                    htmlFor="form-message"
                    className="text-xs font-mono font-semibold tracking-wide uppercase text-bronze"
                  >
                    Write Message
                  </label>
                  <textarea
                    id="form-message"
                    rows={5}
                    required
                    value={formData.message}
                    onChange={(e) =>
                      setFormData({ ...formData, message: e.target.value })
                    }
                    placeholder="What would you like to build?"
                    className="w-full px-4 py-3 rounded-none border text-sm outline-none resize-none transition-all duration-200 bg-lightgray/5 dark:bg-blackolive/40 border-quicksilver/35 dark:border-aurometalsaurus/25 focus:border-bronze text-blackolive dark:text-isabelline placeholder:text-quicksilver dark:placeholder:text-quicksilver/50"
                  ></textarea>
                </div>

                <button
                  type="submit"
                  className="w-full py-3.5 px-6 rounded-none font-medium transition-all hover:-translate-y-0.5 duration-200 flex items-center justify-center gap-2 border cursor-pointer bg-bronze text-blackolive border-bronze hover:bg-bronze-dark"
                >
                  <Send className="w-4 h-4" />
                  <span className="font-bold">Send Message</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </section>
    </div>
  );
}
