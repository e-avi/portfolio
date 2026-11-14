import React, { useState, useEffect } from "react";
import { Link, useLocation } from "react-router-dom";
import { Sun, Moon, Menu, X, Mail } from "lucide-react";
import { portfolioData } from "../data/portfolioData";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  const [darkMode, setDarkMode] = useState<boolean>(true);
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
      className={`min-h-screen transition-colors duration-200 ${
        darkMode
          ? "bg-blackolive text-isabelline"
          : "bg-isabelline text-blackolive"
      } font-sans flex flex-col justify-between`}
    >
      {/* Minimal Header */}
      <header
        className={`sticky top-0 z-50 backdrop-blur-md border-b transition-colors duration-200 ${
          darkMode
            ? "bg-blackolive/80 border-aurometalsaurus/20 text-isabelline"
            : "bg-isabelline/80 border-lightgray text-blackolive"
        }`}
      >
        <div className="max-w-4xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link
            to="/"
            className="font-semibold text-lg tracking-tight hover:text-bronze transition-colors"
          >
            {portfolioData.name}
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/"
              className={`text-sm hover:text-bronze transition-colors ${
                location.pathname === "/" && !location.hash
                  ? "text-bronze font-medium"
                  : "text-aurometalsaurus dark:text-quicksilver"
              }`}
            >
              Home
            </Link>
            <Link
              to="/career"
              className={`text-sm hover:text-bronze transition-colors ${
                location.pathname === "/career" ||
                location.pathname.startsWith("/career/")
                  ? "text-bronze font-medium"
                  : "text-aurometalsaurus dark:text-quicksilver"
              }`}
            >
              Career
            </Link>
            <Link
              to="/projects"
              className={`text-sm hover:text-bronze transition-colors ${
                location.pathname === "/projects" ||
                location.pathname.startsWith("/projects/")
                  ? "text-bronze font-medium"
                  : "text-aurometalsaurus dark:text-quicksilver"
              }`}
            >
              Projects
            </Link>
            <Link
              to="/blogs"
              className={`text-sm hover:text-bronze transition-colors ${
                location.pathname.startsWith("/blogs")
                  ? "text-bronze font-medium"
                  : "text-aurometalsaurus dark:text-quicksilver"
              }`}
            >
              Writing
            </Link>

            <span
              className={`h-4 w-px ${darkMode ? "bg-aurometalsaurus/30" : "bg-lightgray"}`}
            />

            {/* Dark Mode Toggle */}
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded hover:bg-lightgray/40 dark:hover:bg-aurometalsaurus/20 transition-colors text-aurometalsaurus dark:text-quicksilver hover:text-blackolive dark:hover:text-isabelline"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>

            {/* Direct Email CTA */}
            <a
              href={portfolioData.socials.email}
              className="text-xs font-mono px-3 py-1.5 rounded border border-aurometalsaurus/30 dark:border-aurometalsaurus/40 hover:border-bronze hover:text-bronze transition-colors flex items-center gap-1.5"
            >
              <Mail className="w-3.5 h-3.5" /> Contact
            </a>
          </nav>

          {/* Mobile Nav Toggle */}
          <div className="flex items-center gap-3 md:hidden">
            <button
              onClick={toggleTheme}
              className="p-1.5 rounded text-aurometalsaurus dark:text-quicksilver"
              aria-label="Toggle theme"
            >
              {darkMode ? <Sun className="w-4 h-4" /> : <Moon className="w-4 h-4" />}
            </button>
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="p-1.5 rounded text-aurometalsaurus dark:text-quicksilver"
              aria-label="Toggle menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Dropdown */}
        {mobileMenuOpen && (
          <div
            className={`md:hidden border-b px-6 py-4 flex flex-col gap-3 text-sm ${
              darkMode
                ? "bg-blackolive border-aurometalsaurus/20"
                : "bg-isabelline border-lightgray"
            }`}
          >
            <Link
              to="/"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-bronze"
            >
              Home
            </Link>
            <Link
              to="/career"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-bronze"
            >
              Career
            </Link>
            <Link
              to="/projects"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-bronze"
            >
              Projects
            </Link>
            <Link
              to="/blogs"
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 hover:text-bronze"
            >
              Writing
            </Link>
            <a
              href={portfolioData.socials.email}
              onClick={() => setMobileMenuOpen(false)}
              className="py-1 text-bronze font-mono flex items-center gap-2"
            >
              <Mail className="w-4 h-4" /> Email Me
            </a>
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="max-w-4xl mx-auto px-6 w-full flex-grow flex flex-col">
        {children}
      </main>

      {/* Minimal Footer */}
      <footer
        className={`border-t py-8 transition-colors duration-200 w-full ${
          darkMode
            ? "border-aurometalsaurus/20 text-aurometalsaurus"
            : "border-lightgray text-quicksilver"
        }`}
      >
        <div className="max-w-4xl mx-auto px-6 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs font-mono">
          <p>
            © {new Date().getFullYear()} {portfolioData.name}
          </p>
          <div className="flex items-center gap-6">
            <a
              href={portfolioData.socials.github}
              target="_blank"
              rel="noreferrer"
              className="hover:text-bronze transition-colors"
            >
              GitHub
            </a>
            <a
              href={portfolioData.socials.linkedin}
              target="_blank"
              rel="noreferrer"
              className="hover:text-bronze transition-colors"
            >
              LinkedIn
            </a>
            <a
              href={portfolioData.socials.email}
              className="hover:text-bronze transition-colors"
            >
              Email
            </a>
          </div>
        </div>
      </footer>
    </div>
  );
}
