import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sun, Moon, Menu, X, Mail } from "lucide-react";
import { portfolioData } from "../data/portfolioData";

const ACCENT_COLORS = [
  { name: "Gold", hex: "#C5A059", class: "bg-[#C5A059]" },
  { name: "Terracotta", hex: "#B25034", class: "bg-[#B25034]" },
  { name: "Steel Blue", hex: "#4A6B82", class: "bg-[#4A6B82]" },
  { name: "Forest Green", hex: "#2E7D52", class: "bg-[#2E7D52]" },
];

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [darkMode, setDarkMode] = useState<boolean>(true);
  const [accentColor, setAccentColor] = useState<string>(() => {
    return localStorage.getItem("accentColor") || "Gold";
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState<boolean>(false);

  const location = useLocation();

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

  // Synchronize darkMode state with html class
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  // Handle dynamic accent color switching
  useEffect(() => {
    const activeColor = ACCENT_COLORS.find((c) => c.name === accentColor);
    if (activeColor) {
      document.documentElement.style.setProperty(
        "--color-accent",
        activeColor.hex,
      );
      localStorage.setItem("accentColor", accentColor);
    }
  }, [accentColor]);

  // Handle scrolling to hash anchor or top of the page on route change
  useEffect(() => {
    if (location.hash) {
      const id = location.hash.replace("#", "");
      const element = document.getElementById(id);
      if (element) {
        const timer = setTimeout(() => {
          element.scrollIntoView({ behavior: "smooth" });
        }, 100);
        return () => clearTimeout(timer);
      }
    } else {
      window.scrollTo(0, 0);
    }
  }, [location.pathname, location.hash]);

  // Update theme state and save to local storage
  const toggleTheme = () => {
    const newMode = !darkMode;
    setDarkMode(newMode);
    localStorage.setItem("theme", newMode ? "dark" : "light");
  };

  return (
    <div
      className={`min-h-screen transition-colors duration-300 ${
        darkMode
          ? "bg-blackolive text-isabelline"
          : "bg-isabelline text-blackolive"
      } font-sans selection:bg-bronze selection:text-blackolive flex flex-col justify-between`}
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
        <div
          className={`absolute top-[5%] left-[-15%] w-[35rem] h-[35rem] rounded-full blur-[130px] opacity-25 animate-float-slow transition-colors duration-500 ${
            darkMode ? "bg-bronze/60" : "bg-bronze/40"
          }`}
        ></div>

        <div
          className={`absolute bottom-[10%] right-[-15%] w-[40rem] h-[40rem] rounded-full blur-[150px] opacity-20 animate-float-reverse transition-colors duration-500 ${
            darkMode ? "bg-aurometalsaurus/60" : "bg-lightgray"
          }`}
        ></div>

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
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="font-display text-2xl font-bold tracking-tight hover:text-bronze transition-colors duration-200"
          >
            V<span className="text-bronze">.</span>S
          </Link>

          {/* Desktop Nav Items */}
          <nav className="hidden md:flex items-center gap-8">
            <Link
              to="/"
              className={`text-sm font-medium hover:text-bronze transition-colors duration-200 ${
                location.pathname === "/" && !location.hash ? "text-bronze" : ""
              }`}
            >
              Home
            </Link>
            <Link
              to="/career"
              className={`text-sm font-medium hover:text-bronze transition-colors duration-200 ${
                location.pathname === "/career" ||
                location.pathname.startsWith("/career/")
                  ? "text-bronze"
                  : ""
              }`}
            >
              Career
            </Link>
            <Link
              to="/projects"
              className={`text-sm font-medium hover:text-bronze transition-colors duration-200 ${
                location.pathname === "/projects" ||
                location.pathname.startsWith("/projects/")
                  ? "text-bronze"
                  : ""
              }`}
            >
              Projects
            </Link>
            <Link
              to="/blogs"
              className={`text-sm font-medium hover:text-bronze transition-colors duration-200 ${
                location.pathname.startsWith("/blogs") ? "text-bronze" : ""
              }`}
            >
              Blogs
            </Link>
            {/* Color Theme Switcher */}
            <div className="flex items-center gap-2.5 mr-2">
              {ACCENT_COLORS.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setAccentColor(color.name)}
                  className={`w-3.5 h-3.5 rotate-45 transition-all duration-200 cursor-pointer border hover:scale-125 ${
                    accentColor === color.name
                      ? "border-isabelline dark:border-blackolive ring-1 ring-bronze scale-110"
                      : "border-transparent opacity-60 hover:opacity-100"
                  } ${color.class}`}
                  title={`Switch to ${color.name}`}
                  aria-label={`Switch to ${color.name} theme`}
                />
              ))}
            </div>

            {/* Vertical Line */}
            <span
              className={`h-4 w-px ${darkMode ? "bg-aurometalsaurus/35" : "bg-quicksilver/50"}`}
            ></span>

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className={`p-2 rounded-none border transition-all duration-300 ${
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

            {/* Direct Email CTA */}
            <a
              href={portfolioData.socials.email}
              className="px-4 py-2 font-mono text-xs font-bold border border-bronze text-bronze hover:bg-bronze hover:text-blackolive transition-all duration-200 flex items-center gap-2"
            >
              <Mail className="w-3.5 h-3.5" /> Email Me
            </a>
          </nav>

          {/* Mobile Navigation Toggle buttons */}
          <div className="flex items-center gap-4 md:hidden">
            {/* Mobile Accent Switcher */}
            <div className="flex items-center gap-2 mr-1">
              {ACCENT_COLORS.map((color) => (
                <button
                  key={color.name}
                  onClick={() => setAccentColor(color.name)}
                  className={`w-3 h-3 rotate-45 transition-all duration-200 cursor-pointer border hover:scale-125 ${
                    accentColor === color.name
                      ? "border-isabelline dark:border-blackolive ring-1 ring-bronze scale-110"
                      : "border-transparent opacity-60 hover:opacity-100"
                  } ${color.class}`}
                  title={`Switch to ${color.name}`}
                  aria-label={`Switch to ${color.name} theme`}
                />
              ))}
            </div>

            <button
              onClick={toggleTheme}
              className={`p-2 rounded-none border transition-all duration-300 ${
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
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="text-left text-lg font-medium hover:text-bronze py-2 border-b border-dashed border-aurometalsaurus/10 bg-transparent"
            >
              Home
            </Link>
            <Link
              to="/career"
              onClick={() => setMobileMenuOpen(false)}
              className="text-left text-lg font-medium hover:text-bronze py-2 border-b border-dashed border-aurometalsaurus/10 bg-transparent"
            >
              Career
            </Link>
            <Link
              to="/#skills"
              onClick={() => setMobileMenuOpen(false)}
              className="text-left text-lg font-medium hover:text-bronze py-2 border-b border-dashed border-aurometalsaurus/10 bg-transparent"
            >
              Skills
            </Link>
            <Link
              to="/projects"
              onClick={() => setMobileMenuOpen(false)}
              className="text-left text-lg font-medium hover:text-bronze py-2 border-b border-dashed border-aurometalsaurus/10 bg-transparent"
            >
              Projects
            </Link>
            <Link
              to="/blogs"
              onClick={() => setMobileMenuOpen(false)}
              className="text-lg font-medium hover:text-bronze py-2 border-b border-dashed border-aurometalsaurus/10"
            >
              Blogs
            </Link>
            <Link
              to="/#contact"
              onClick={() => setMobileMenuOpen(false)}
              className="text-left text-lg font-medium hover:text-bronze py-2 border-b border-dashed border-aurometalsaurus/10 bg-transparent"
            >
              Contact
            </Link>
            <a
              href={portfolioData.socials.email}
              onClick={() => setMobileMenuOpen(false)}
              className="text-left text-lg font-mono font-bold text-bronze py-2 flex items-center gap-2"
            >
              <Mail className="w-4 h-4" /> Email Me
            </a>
          </div>
        )}
      </header>

      {/* Main Content Area */}
      <main className="max-w-6xl mx-auto px-6 relative z-10 w-full flex-grow flex flex-col">
        {children}
      </main>

      {/* FOOTER */}
      <footer
        className={`border-t py-12 relative z-10 transition-colors duration-300 w-full ${
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
              Gray • Black Olive • Bronze
            </p>
          </div>

          <div className="flex items-center gap-6">
            <Link
              to="/"
              onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
              className="text-xs font-mono hover:text-bronze transition-colors cursor-pointer"
            >
              Home
            </Link>
            <a
              href={portfolioData.socials.github}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-mono hover:text-bronze transition-colors"
            >
              GitHub
            </a>
            <a
              href={portfolioData.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="text-xs font-mono hover:text-bronze transition-colors"
            >
              LinkedIn
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
