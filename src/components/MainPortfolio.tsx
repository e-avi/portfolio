import {
  ArrowRight,
  Download,
  ExternalLink,
  Github,
  Linkedin,
  Mail,
  Sparkles,
  Terminal,
} from "lucide-react";
import { portfolio } from "../data/portfolio";

type MainPortfolioProps = {
  navigateFun: () => void;
};

export function MainPortfolio({ navigateFun }: MainPortfolioProps) {
  return (
    <main className="site-shell">
      <nav className="main-nav" aria-label="Primary">
        <a className="brand-mark" href="#top" aria-label="Back to top">
          <span>AV</span>
        </a>
        <div className="nav-links">
          <a href="#work">Work</a>
          <a href="#skills">Skills</a>
          <a href="#contact">Contact</a>
        </div>
      </nav>

      <section id="top" className="hero-section">
        <div className="hero-backdrop" aria-hidden="true">
          <div className="system-constellation">
            <span className="node node-a" />
            <span className="node node-b" />
            <span className="node node-c" />
            <span className="node node-d" />
            <span className="line line-a" />
            <span className="line line-b" />
            <span className="line line-c" />
          </div>
          <div className="boot-preview">
            <div className="boot-bar">
              <span />
              <span />
              <span />
            </div>
            <p>$ whoami</p>
            <strong>{portfolio.profile.name}</strong>
            <p>$ ./open-fun-side</p>
            <em>mounting retro desktop...</em>
          </div>
        </div>

        <div className="hero-copy">
          <p className="eyebrow">{portfolio.profile.roleLine}</p>
          <h1>{portfolio.profile.name}</h1>
          <p className="hero-lede">{portfolio.profile.headline}</p>
          <div className="hero-actions">
            <button className="primary-action" type="button" onClick={navigateFun}>
              <Sparkles size={18} />
              Take me to the fun side
              <ArrowRight size={18} />
            </button>
            <a className="secondary-action" href={portfolio.links.github} target="_blank" rel="noreferrer">
              <Github size={18} />
              GitHub
            </a>
            <a className="secondary-action" href={portfolio.links.linkedin} target="_blank" rel="noreferrer">
              <Linkedin size={18} />
              LinkedIn
            </a>
          </div>
        </div>
      </section>

      <section className="content-band intro-band" aria-labelledby="about-heading">
        <div className="section-inner intro-grid">
          <div>
            <p className="section-kicker">About</p>
            <h2 id="about-heading">A normal portfolio front door, with a secret terminal in the basement.</h2>
          </div>
          <p>{portfolio.profile.intro}</p>
        </div>
      </section>

      <section id="work" className="content-band" aria-labelledby="work-heading">
        <div className="section-inner">
          <div className="section-heading">
            <p className="section-kicker">Projects</p>
            <h2 id="work-heading">Selected Work</h2>
          </div>
          <div className="project-grid">
            {portfolio.projects.map((project) => (
              <article className="project-card" key={project.title}>
                <div className="project-card-top">
                  <span>{project.status}</span>
                  {project.link || project.repo ? <ExternalLink size={16} /> : null}
                </div>
                <h3>{project.title}</h3>
                <p>{project.description}</p>
                <div className="chip-row">
                  {project.stack.map((item) => (
                    <span className="chip" key={item}>
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section className="content-band split-band" aria-labelledby="experience-heading">
        <div className="section-inner split-grid">
          <div>
            <p className="section-kicker">Experience</p>
            <h2 id="experience-heading">The practical side of the machine.</h2>
          </div>
          <div className="timeline">
            {portfolio.experience.map((item) => (
              <article className="timeline-item" key={`${item.role}-${item.organization}`}>
                <span>{item.period}</span>
                <h3>{item.role}</h3>
                <p className="timeline-org">
                  {item.organization} · {item.location}
                </p>
                <p>{item.summary}</p>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="skills" className="content-band" aria-labelledby="skills-heading">
        <div className="section-inner">
          <div className="section-heading">
            <p className="section-kicker">Skills</p>
            <h2 id="skills-heading">A toolkit that keeps expanding.</h2>
          </div>
          <div className="skill-grid">
            {portfolio.skillGroups.map((group) => (
              <article className="skill-panel" key={group.label}>
                <h3>{group.label}</h3>
                <div className="chip-row">
                  {group.items.map((item) => (
                    <span className="chip chip-bright" key={item}>
                      {item}
                    </span>
                  ))}
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      <section id="contact" className="content-band contact-band" aria-labelledby="contact-heading">
        <div className="section-inner contact-grid">
          <div>
            <p className="section-kicker">Contact</p>
            <h2 id="contact-heading">Let us build something inspectable.</h2>
            <p>{portfolio.profile.availability}</p>
          </div>
          <div className="contact-actions">
            <a className="primary-action" href={portfolio.links.email}>
              <Mail size={18} />
              Email me
            </a>
            {portfolio.links.resumeUrl ? (
              <a className="secondary-action" href={portfolio.links.resumeUrl} download>
                <Download size={18} />
                Resume
              </a>
            ) : (
              <span className="secondary-action is-disabled">
                <Download size={18} />
                {portfolio.links.resumeLabel}
              </span>
            )}
            <button className="secondary-action" type="button" onClick={navigateFun}>
              <Terminal size={18} />
              Open AviOS
            </button>
          </div>
        </div>
      </section>
    </main>
  );
}
