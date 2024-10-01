import React, { useState, useEffect } from "react";
import {
  Github,
  Linkedin,
  Mail,
  ExternalLink,
  Code,
  Briefcase,
  User,
  Folder,
  Moon,
  Sun,
  Send,
  Terminal,
  Cpu,
  Layers,
  CheckCircle,
  Menu,
  X,
  Sparkles,
} from "lucide-react";
import { portfolioData, Project } from "../data/portfolioData";

export default function Portfolio() {
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [projectFilter, setProjectFilter] = useState<string>("All");
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);
  const [formSubmitted, setFormSubmitted] = useState<boolean>(false);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    message: "",
  });

  // Handle system dark mode setting or stored preference
  useEffect(() => {
    const savedTheme = localStorage.getItem("theme");
    if (savedTheme) {
      setDarkMode(savedTheme === "dark");
    } else {
      const prefersDark = window.matchMedia(
        "(prefers-color-scheme: dark)",
      ).matches;
      setDarkMode(prefersDark);
    }
  }, []);

  // Update theme state and save to local storage
  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

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
      return <Terminal className="w-5 h-5 text-aurometalsaurus" />;
    if (name.includes("front"))
      return <Layers className="w-5 h-5 text-aurometalsaurus" />;
    if (name.includes("back") || name.includes("data"))
      return <Cpu className="w-5 h-5 text-aurometalsaurus" />;
    return <Code className="w-5 h-5 text-aurometalsaurus" />;
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode
          ? "bg-blackolive text-isabelline"
          : "bg-isabelline text-blackolive"
      } font-sans selection:bg-aurometalsaurus selection:text-isabelline`}
    >
      {/* Background Effects */}
      <div className="fixed inset-0 overflow-hidden pointer-events-none z-0">
        {/* Dot Grid Pattern Overlay */}
        <div
          className={`absolute inset-0 transition-opacity duration-500 opacity-[0.12] ${
            darkMode
              ? "bg-[radial-gradient(#F4F0EC_1px,transparent_1px)]"
              : "bg-[radial-gradient(#3B3C36_1px,transparent_1px)]"
          } [background-size:28px_28px]`}
        ></div>

        {/* Animated Gradient Orbs */}
        {/* Orb 1: Top Left */}
        <div
          className={`absolute top-[5%] left-[-15%] w-[35rem] h-[35rem] rounded-full blur-[130px] opacity-25 animate-float-slow transition-colors duration-500 ${
            darkMode ? "bg-aurometalsaurus" : "bg-quicksilver"
          }`}
        ></div>

        {/* Orb 2: Bottom Right */}
        <div
          className={`absolute bottom-[10%] right-[-15%] w-[40rem] h-[40rem] rounded-full blur-[150px] opacity-20 animate-float-reverse transition-colors duration-500 ${
            darkMode ? "bg-aurometalsaurus" : "bg-lightgray"
          }`}
        ></div>

        {/* Orb 3: Mid Center */}
        <div
          className={`absolute top-[40%] left-[25%] w-[30rem] h-[30rem] rounded-full blur-[120px] opacity-15 animate-float-mid transition-colors duration-500 ${
            darkMode ? "bg-quicksilver/50" : "bg-aurometalsaurus/30"
          }`}
        ></div>
      </div>

      {/* Floating Header Navigation */}
      <header
        className={`sticky top-0 z-50 backdrop-blur-md border-b transition-all duration-300 ${
          darkMode
            ? "bg-blackolive/80 border-aurometalsaurus/20 text-isabelline"
            : "bg-isabelline/80 border-quicksilver/30 text-blackolive"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-end">
          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-8">
            <a
              href="#about"
              className="text-sm font-medium hover:text-aurometalsaurus transition-colors duration-200"
            >
              About
            </a>
            <a
              href="#experience"
              className="text-sm font-medium hover:text-aurometalsaurus transition-colors duration-200"
            >
              Experience
            </a>
            <a
              href="#projects"
              className="text-sm font-medium hover:text-aurometalsaurus transition-colors duration-200"
            >
              Projects
            </a>
            <a
              href="#contact"
              className="text-sm font-medium hover:text-aurometalsaurus transition-colors duration-200"
            >
              Contact
            </a>

            {/* Vertical Line */}
            <span
              className={`h-4 w-px ${darkMode ? "bg-aurometalsaurus/35" : "bg-quicksilver/50"}`}
            ></span>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg border transition-all duration-300 ${
                darkMode
                  ? "border-aurometalsaurus/30 hover:bg-aurometalsaurus/20 text-isabelline"
                  : "border-quicksilver/40 hover:bg-quicksilver/20 text-blackolive"
              }`}
              aria-label="Toggle theme"
            >
              {darkMode ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>
          </nav>

          {/* Mobile Navigation Toggle buttons */}
          <div className="flex items-center gap-4 md:hidden">
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-lg border transition-all duration-300 ${
                darkMode
                  ? "border-aurometalsaurus/30 hover:bg-aurometalsaurus/20 text-isabelline"
                  : "border-quicksilver/40 hover:bg-quicksilver/20 text-blackolive"
              }`}
              aria-label="Toggle theme"
            >
              {darkMode ? (
                <Sun className="w-4 h-4" />
              ) : (
                <Moon className="w-4 h-4" />
              )}
            </button>

            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown Menu */}
        {mobileMenuOpen && (
          <div
            className={`md:hidden absolute top-full left-0 right-0 border-b flex flex-col p-6 gap-4 z-40 animate-in fade-in slide-in-from-top-5 duration-200 transition-colors ${
              darkMode
                ? "bg-blackolive border-aurometalsaurus/20 text-isabelline"
                : "bg-isabelline border-quicksilver/30 text-blackolive"
            }`}
          >
            <a
              href="#about"
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium hover:text-aurometalsaurus py-2 border-b border-dashed border-aurometalsaurus/10"
            >
              About
            </a>
            <a
              href="#experience"
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium hover:text-aurometalsaurus py-2 border-b border-dashed border-aurometalsaurus/10"
            >
              Experience
            </a>
            <a
              href="#projects"
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium hover:text-aurometalsaurus py-2 border-b border-dashed border-aurometalsaurus/10"
            >
              Projects
            </a>
            <a
              href="#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium hover:text-aurometalsaurus py-2"
            >
              Contact
            </a>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-6 relative z-10">
        {/* HERO SECTION */}
        <section
          id="hero"
          className="min-h-[85vh] flex flex-col items-center justify-center gap-8 py-20 relative text-center"
        >
          <div className="space-y-6 max-w-3xl flex flex-col items-center justify-center">
            <h1 className="text-5xl md:text-8xl font-bold tracking-tight leading-[1.1]">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-aurometalsaurus via-quicksilver to-lightgray">
                {portfolioData.name}
              </span>
            </h1>

            <p className="text-2xl md:text-3xl font-semibold opacity-90 tracking-tight">
              {portfolioData.subtitle}
            </p>

            <p
              className={`text-lg md:text-xl leading-relaxed max-w-2xl ${
                darkMode ? "text-lightgray" : "text-blackolive/80"
              }`}
            >
              {portfolioData.bio}
            </p>

            {/* Action CTA */}
            <div className="pt-4">
              <a
                href="#projects"
                className={`px-8 py-4.5 rounded-lg font-medium shadow-lg hover:shadow-xl transition-all hover:-translate-y-0.5 duration-200 border cursor-pointer inline-block ${
                  darkMode
                    ? "bg-isabelline text-blackolive border-isabelline hover:bg-lightgray"
                    : "bg-blackolive text-isabelline border-blackolive hover:bg-blackolive/90"
                }`}
              >
                View in a different way
              </a>
            </div>

            <br />

            {/* Social Links */}
            <div className="flex items-center justify-center gap-8 pt-6">
              <a
                href={portfolioData.socials.github}
                target="_blank"
                rel="noreferrer"
                className={`p-3.5 rounded-full transition-all hover:scale-110 hover:text-aurometalsaurus border ${
                  darkMode
                    ? "border-aurometalsaurus/20 bg-aurometalsaurus/5"
                    : "border-quicksilver/30 bg-lightgray/10"
                }`}
                aria-label="GitHub Profile"
              >
                <Github className="w-8 h-8" />
              </a>
              <a
                href={portfolioData.socials.linkedin}
                target="_blank"
                rel="noreferrer"
                className={`p-3.5 rounded-full transition-all hover:scale-110 hover:text-aurometalsaurus border ${
                  darkMode
                    ? "border-aurometalsaurus/20 bg-aurometalsaurus/5"
                    : "border-quicksilver/30 bg-lightgray/10"
                }`}
                aria-label="LinkedIn Profile"
              >
                <Linkedin className="w-8 h-8" />
              </a>
              <a
                href={portfolioData.socials.email}
                className={`p-3.5 rounded-full transition-all hover:scale-110 hover:text-aurometalsaurus border ${
                  darkMode
                    ? "border-aurometalsaurus/20 bg-aurometalsaurus/5"
                    : "border-quicksilver/30 bg-lightgray/10"
                }`}
                aria-label="Send Email"
              >
                <Mail className="w-8 h-8" />
              </a>
            </div>
          </div>
        </section>

        {/* ABOUT & SKILLS SECTION */}
        <section
          id="about"
          className="py-24 border-t border-dashed border-aurometalsaurus/20"
        >
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Column 1: About Me text */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center gap-2 text-aurometalsaurus font-mono text-sm tracking-wider uppercase">
                <User className="w-4 h-4" />
                <span>About Me</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                My Engineering Journey
              </h2>
              <div
                className={`space-y-4 text-base leading-relaxed ${
                  darkMode ? "text-lightgray" : "text-blackolive/80"
                }`}
              >
                <p>
                  I'm a developer who enjoys crafting scalable web systems. My
                  engineering ethos revolves around simplicity, performance, and
                  attention to detail.
                </p>
                <p>
                  Whether working on complex system architectures, designing
                  custom component frameworks, or optimizing database queries, I
                  aim to construct clean, maintainable solutions.
                </p>
                <p>
                  My color theme for this site (Isabelline, Quick Silver,
                  Aurometalsaurus, Light Gray, and Black Olive) reflects my
                  design style: structured, professional, and carefully
                  balanced.
                </p>
              </div>
            </div>

            {/* Column 2: Categorized Skills */}
            <div className="lg:col-span-7 space-y-8">
              <h3 className="text-xl font-bold tracking-tight flex items-center gap-2">
                <Code className="w-5 h-5 text-aurometalsaurus" /> Technologies I
                Work With
              </h3>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {portfolioData.skills.map((cat, idx) => (
                  <div
                    key={idx}
                    className={`p-6 rounded-xl border transition-all duration-300 ${
                      darkMode
                        ? "bg-[#2E2F2A] border-aurometalsaurus/20 hover:border-aurometalsaurus/40"
                        : "bg-white border-quicksilver/30 hover:border-quicksilver/60"
                    }`}
                  >
                    <div className="flex items-center gap-3 mb-4">
                      {getCategoryIcon(cat.category)}
                      <h4 className="font-semibold text-base">
                        {cat.category}
                      </h4>
                    </div>
                    <div className="flex flex-wrap gap-2">
                      {cat.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className={`px-3 py-1 rounded-md text-xs font-mono border ${
                            darkMode
                              ? "bg-blackolive/60 border-aurometalsaurus/15 text-lightgray hover:border-aurometalsaurus/40"
                              : "bg-lightgray/15 border-quicksilver/30 text-blackolive hover:border-quicksilver/60"
                          } transition-colors duration-200`}
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* EXPERIENCE TIMELINE SECTION */}
        <section
          id="experience"
          className="py-24 border-t border-dashed border-aurometalsaurus/20"
        >
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="space-y-4 text-center">
              <div className="inline-flex items-center gap-2 text-aurometalsaurus font-mono text-sm tracking-wider uppercase">
                <Briefcase className="w-4 h-4" />
                <span>Professional Experience</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Work Timeline
              </h2>
            </div>

            <div className="relative pl-6 md:pl-8 border-l border-aurometalsaurus/25 space-y-12 py-4">
              {portfolioData.experience.map((exp, idx) => (
                <div key={idx} className="relative group">
                  {/* Timeline bullet indicator */}
                  <span
                    className={`absolute -left-[31px] md:-left-[39px] top-1.5 w-4 h-4 rounded-full border-2 transition-all duration-300 group-hover:scale-125 ${
                      darkMode
                        ? "bg-blackolive border-aurometalsaurus group-hover:bg-aurometalsaurus"
                        : "bg-isabelline border-aurometalsaurus group-hover:bg-aurometalsaurus"
                    }`}
                  ></span>

                  {/* Experience Card */}
                  <div
                    className={`p-6 rounded-xl border transition-all duration-300 ${
                      darkMode
                        ? "bg-[#2E2F2A] border-aurometalsaurus/20 hover:border-aurometalsaurus/40"
                        : "bg-white border-quicksilver/30 hover:border-quicksilver/60"
                    }`}
                  >
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-2 mb-4">
                      <div>
                        <h3 className="text-lg font-bold tracking-tight">
                          {exp.role}
                        </h3>
                        <p className="text-sm font-medium text-aurometalsaurus font-mono">
                          {exp.company}
                        </p>
                      </div>
                      <span
                        className={`text-xs font-mono px-3 py-1 rounded-full border self-start md:self-center ${
                          darkMode
                            ? "bg-blackolive/60 border-aurometalsaurus/15 text-lightgray"
                            : "bg-lightgray/15 border-quicksilver/30 text-blackolive"
                        }`}
                      >
                        {exp.duration}
                      </span>
                    </div>

                    <ul
                      className={`space-y-2 mb-6 list-disc list-inside text-sm leading-relaxed ${
                        darkMode ? "text-lightgray" : "text-blackolive/80"
                      }`}
                    >
                      {exp.description.map((desc, dIdx) => (
                        <li key={dIdx}>{desc}</li>
                      ))}
                    </ul>

                    <div className="flex flex-wrap gap-1.5 pt-2 border-t border-dashed border-aurometalsaurus/10">
                      {exp.skills.map((skill, sIdx) => (
                        <span
                          key={sIdx}
                          className="text-[10px] font-mono px-2 py-0.5 rounded opacity-75 hover:opacity-100 transition-opacity"
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

        {/* PROJECTS SECTION */}
        <section
          id="projects"
          className="py-24 border-t border-dashed border-aurometalsaurus/20"
        >
          <div className="space-y-12">
            <div className="flex flex-col md:flex-row md:items-end justify-between gap-6">
              <div className="space-y-4">
                <div className="inline-flex items-center gap-2 text-aurometalsaurus font-mono text-sm tracking-wider uppercase">
                  <Folder className="w-4 h-4" />
                  <span>My Creations</span>
                </div>
                <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                  Featured Projects
                </h2>
              </div>

              {/* Filters list */}
              <div className="flex flex-wrap gap-2 max-w-full">
                {allTags.map((tag) => (
                  <button
                    key={tag}
                    onClick={() => setProjectFilter(tag)}
                    className={`px-3 py-1.5 rounded-lg text-xs font-mono font-medium transition-all border ${
                      projectFilter === tag
                        ? darkMode
                          ? "bg-isabelline text-blackolive border-isabelline"
                          : "bg-blackolive text-isabelline border-blackolive"
                        : darkMode
                          ? "border-aurometalsaurus/20 text-lightgray hover:border-aurometalsaurus/40 hover:bg-aurometalsaurus/5"
                          : "border-quicksilver/35 text-blackolive/70 hover:border-quicksilver/60 hover:bg-lightgray/10"
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
                  className={`group rounded-xl border flex flex-col justify-between overflow-hidden transition-all duration-300 hover:-translate-y-1 ${
                    darkMode
                      ? "bg-[#2E2F2A] border-aurometalsaurus/20 hover:border-aurometalsaurus/40"
                      : "bg-white border-quicksilver/30 hover:border-quicksilver/60"
                  }`}
                >
                  <div className="p-6 md:p-8 space-y-4">
                    {/* Header */}
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-2">
                        <Folder className="w-5 h-5 text-aurometalsaurus" />
                        {project.featured && (
                          <span
                            className={`text-[10px] font-mono font-bold tracking-wider px-2 py-0.5 rounded uppercase border ${
                              darkMode
                                ? "bg-aurometalsaurus/15 border-aurometalsaurus/30 text-isabelline"
                                : "bg-lightgray/20 border-quicksilver/45 text-blackolive"
                            }`}
                          >
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
                            className="hover:text-aurometalsaurus transition-colors duration-200"
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
                            className="hover:text-aurometalsaurus transition-colors duration-200"
                            aria-label="Live Demo Link"
                          >
                            <ExternalLink className="w-5 h-5" />
                          </a>
                        )}
                      </div>
                    </div>

                    <h3 className="text-xl font-bold tracking-tight group-hover:text-aurometalsaurus transition-colors duration-200">
                      {project.title}
                    </h3>

                    <p
                      className={`text-sm leading-relaxed ${
                        darkMode ? "text-lightgray" : "text-blackolive/80"
                      }`}
                    >
                      {project.description}
                    </p>
                  </div>

                  {/* Tags footer */}
                  <div
                    className={`px-6 py-4 flex flex-wrap gap-2 border-t ${
                      darkMode
                        ? "bg-blackolive/20 border-aurometalsaurus/10"
                        : "bg-lightgray/5 border-quicksilver/20"
                    }`}
                  >
                    {project.tags.map((tag, tIdx) => (
                      <span
                        key={tIdx}
                        className="text-xs font-mono opacity-85 hover:opacity-100 cursor-default"
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
        </section>

        {/* CONTACT SECTION */}
        <section
          id="contact"
          className="py-24 border-t border-dashed border-aurometalsaurus/20"
        >
          <div className="max-w-4xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-16">
            {/* Info Panel */}
            <div className="lg:col-span-5 space-y-6">
              <div className="flex items-center gap-2 text-aurometalsaurus font-mono text-sm tracking-wider uppercase">
                <Mail className="w-4 h-4" />
                <span>Contact Info</span>
              </div>
              <h2 className="text-3xl md:text-4xl font-bold tracking-tight">
                Let's Connect
              </h2>
              <p
                className={`text-sm md:text-base leading-relaxed ${
                  darkMode ? "text-lightgray" : "text-blackolive/80"
                }`}
              >
                I'm always open to discussing new opportunities, collaborations,
                creative ideas, or questions about web development and designs.
              </p>

              <div className="space-y-4 pt-4 font-mono text-xs md:text-sm">
                <a
                  href={portfolioData.socials.email}
                  className="flex items-center gap-3 hover:text-aurometalsaurus transition-colors"
                >
                  <Mail className="w-4 h-4 text-aurometalsaurus shrink-0" />
                  <span>
                    {portfolioData.socials.email.replace("mailto:", "")}
                  </span>
                </a>
                <div className="flex items-center gap-3">
                  <span className="w-4 h-4 block border border-aurometalsaurus rounded-full shrink-0 flex items-center justify-center">
                    <span className="w-1.5 h-1.5 bg-aurometalsaurus rounded-full"></span>
                  </span>
                  <span>Remote / Global Work</span>
                </div>
              </div>
            </div>

            {/* Input Form */}
            <div className="lg:col-span-7">
              {formSubmitted ? (
                <div
                  className={`p-8 rounded-xl border flex flex-col items-center justify-center text-center space-y-4 min-h-[300px] transition-all duration-300 ${
                    darkMode
                      ? "bg-[#2E2F2A] border-aurometalsaurus/30 text-isabelline"
                      : "bg-white border-quicksilver/40 text-blackolive"
                  }`}
                >
                  <CheckCircle className="w-12 h-12 text-aurometalsaurus animate-bounce" />
                  <h3 className="text-xl font-bold tracking-tight">
                    Message Transmitted!
                  </h3>
                  <p
                    className={`text-sm max-w-sm ${darkMode ? "text-lightgray" : "text-blackolive/75"}`}
                  >
                    Thanks for reaching out, Avi! Your message details have been
                    saved, and I will get back to you shortly.
                  </p>
                </div>
              ) : (
                <form
                  onSubmit={handleSubmit}
                  className={`p-6 md:p-8 rounded-xl border space-y-6 ${
                    darkMode
                      ? "bg-[#2E2F2A] border-aurometalsaurus/20"
                      : "bg-white border-quicksilver/30"
                  }`}
                >
                  <div className="space-y-2">
                    <label
                      htmlFor="form-name"
                      className="text-xs font-mono font-medium tracking-wide uppercase opacity-80"
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
                      className={`w-full px-4 py-3 rounded-lg border text-sm outline-none transition-all duration-200 ${
                        darkMode
                          ? "bg-blackolive/40 border-aurometalsaurus/25 focus:border-aurometalsaurus text-isabelline placeholder:text-quicksilver/50"
                          : "bg-lightgray/5 border-quicksilver/35 focus:border-blackolive text-blackolive placeholder:text-quicksilver"
                      }`}
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="form-email"
                      className="text-xs font-mono font-medium tracking-wide uppercase opacity-80"
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
                      className={`w-full px-4 py-3 rounded-lg border text-sm outline-none transition-all duration-200 ${
                        darkMode
                          ? "bg-blackolive/40 border-aurometalsaurus/25 focus:border-aurometalsaurus text-isabelline placeholder:text-quicksilver/50"
                          : "bg-lightgray/5 border-quicksilver/35 focus:border-blackolive text-blackolive placeholder:text-quicksilver"
                      }`}
                    />
                  </div>

                  <div className="space-y-2">
                    <label
                      htmlFor="form-message"
                      className="text-xs font-mono font-medium tracking-wide uppercase opacity-80"
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
                      className={`w-full px-4 py-3 rounded-lg border text-sm outline-none resize-none transition-all duration-200 ${
                        darkMode
                          ? "bg-blackolive/40 border-aurometalsaurus/25 focus:border-aurometalsaurus text-isabelline placeholder:text-quicksilver/50"
                          : "bg-lightgray/5 border-quicksilver/35 focus:border-blackolive text-blackolive placeholder:text-quicksilver"
                      }`}
                    ></textarea>
                  </div>

                  <button
                    type="submit"
                    className={`w-full py-3.5 px-6 rounded-lg font-medium transition-all hover:-translate-y-0.5 duration-200 flex items-center justify-center gap-2 border cursor-pointer ${
                      darkMode
                        ? "bg-isabelline text-blackolive border-isabelline hover:bg-lightgray"
                        : "bg-blackolive text-isabelline border-blackolive hover:bg-blackolive/90"
                    }`}
                  >
                    <Send className="w-4 h-4" />
                    <span>Send Message</span>
                  </button>
                </form>
              )}
            </div>
          </div>
        </section>
      </main>

      {/* FOOTER */}
      <footer
        className={`border-t py-12 relative z-10 transition-colors duration-300 ${
          darkMode
            ? "bg-blackolive/50 border-aurometalsaurus/15 text-lightgray"
            : "bg-lightgray/10 border-quicksilver/20 text-blackolive/80"
        }`}
      >
        <div className="max-w-6xl mx-auto px-6 flex flex-col md:flex-row items-center justify-between gap-6">
          <div className="space-y-2 text-center md:text-left">
            <p className="text-sm font-mono">
              © {new Date().getFullYear()} {portfolioData.name}. All rights
              reserved.
            </p>
            <p className="text-xs opacity-60">
              Designed with Isabelline • Quick Silver • Aurometalsaurus • Light
              Gray • Black Olive
            </p>
          </div>

          <div className="flex items-center gap-6">
            <a
              href="#about"
              className="text-xs font-mono hover:text-aurometalsaurus transition-colors"
            >
              Back to Top
            </a>
            <a
              href={portfolioData.socials.github}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-mono hover:text-aurometalsaurus transition-colors"
            >
              GitHub
            </a>
            <a
              href={portfolioData.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-mono hover:text-aurometalsaurus transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
