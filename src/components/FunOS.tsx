import {
  Briefcase,
  Cpu,
  Download,
  ExternalLink,
  FileText,
  FolderKanban,
  Github,
  Home,
  Linkedin,
  Mail,
  Maximize2,
  Minus,
  Send,
  Sparkles,
  Terminal,
  UserRound,
  Wrench,
  X,
  type LucideIcon,
} from "lucide-react";
import {
  FormEvent,
  PointerEvent as ReactPointerEvent,
  ReactNode,
  useMemo,
  useRef,
  useState,
} from "react";
import { portfolio } from "../data/portfolio";

type WindowId =
  | "about"
  | "projects"
  | "skills"
  | "experience"
  | "resume"
  | "contact"
  | "terminal";

type ExternalId = "github" | "linkedin" | "email";
type AppId = WindowId | ExternalId;

type WindowState = {
  id: WindowId;
  title: string;
  open: boolean;
  minimized: boolean;
  maximized: boolean;
  x: number;
  y: number;
  w: number;
  h: number;
  z: number;
};

type DesktopApp = {
  id: AppId;
  label: string;
  icon: LucideIcon;
  kind: "window" | "external";
  windowId?: WindowId;
  url?: string;
};

const desktopApps: DesktopApp[] = [
  { id: "about", label: "About Me", icon: UserRound, kind: "window", windowId: "about" },
  { id: "projects", label: "Projects", icon: FolderKanban, kind: "window", windowId: "projects" },
  { id: "skills", label: "Skills", icon: Wrench, kind: "window", windowId: "skills" },
  { id: "experience", label: "Experience", icon: Briefcase, kind: "window", windowId: "experience" },
  { id: "resume", label: "Resume", icon: FileText, kind: "window", windowId: "resume" },
  { id: "contact", label: "Contact", icon: Mail, kind: "window", windowId: "contact" },
  { id: "terminal", label: "Terminal", icon: Terminal, kind: "window", windowId: "terminal" },
  { id: "github", label: "GitHub", icon: Github, kind: "external", url: portfolio.links.github },
  { id: "linkedin", label: "LinkedIn", icon: Linkedin, kind: "external", url: portfolio.links.linkedin },
  { id: "email", label: "Email", icon: Mail, kind: "external", url: portfolio.links.email },
];

function createWindows(): Record<WindowId, WindowState> {
  return {
    about: windowState("about", "about.txt", 90, 72, 520, 360),
    projects: windowState("projects", "projects/", 150, 106, 660, 430),
    skills: windowState("skills", "skills.bin", 210, 132, 560, 360),
    experience: windowState("experience", "experience.log", 250, 92, 620, 410),
    resume: windowState("resume", "resume.pdf", 180, 156, 560, 360),
    contact: windowState("contact", "contact.sh", 320, 130, 520, 330),
    terminal: windowState("terminal", "avi@portfolio:~", 120, 120, 640, 420),
  };
}

function windowState(
  id: WindowId,
  title: string,
  x: number,
  y: number,
  w: number,
  h: number,
): WindowState {
  return { id, title, x, y, w, h, z: 10, open: false, minimized: false, maximized: false };
}

type FunOSProps = {
  navigateHome: () => void;
};

export function FunOS({ navigateHome }: FunOSProps) {
  const [windows, setWindows] = useState(createWindows);
  const [startOpen, setStartOpen] = useState(false);
  const nextZ = useRef(20);

  const openWindow = (id: WindowId) => {
    setWindows((current) => ({
      ...current,
      [id]: {
        ...current[id],
        open: true,
        minimized: false,
        z: ++nextZ.current,
      },
    }));
  };

  const focusWindow = (id: WindowId) => {
    setWindows((current) => ({
      ...current,
      [id]: { ...current[id], z: ++nextZ.current },
    }));
  };

  const patchWindow = (id: WindowId, patch: Partial<WindowState>) => {
    setWindows((current) => ({
      ...current,
      [id]: { ...current[id], ...patch },
    }));
  };

  const launchApp = (app: DesktopApp) => {
    setStartOpen(false);
    if (app.kind === "external" && app.url) {
      if (app.url.startsWith("mailto:")) {
        window.location.href = app.url;
      } else {
        window.open(app.url, "_blank", "noopener,noreferrer");
      }
      return;
    }
    if (app.windowId) openWindow(app.windowId);
  };

  const activeWindows = Object.values(windows).filter((item) => item.open);

  return (
    <main className="os-shell" aria-label="Retro Linux portfolio">
      <div className="os-wallpaper" aria-hidden="true">
        <span className="scanline" />
        <span className="crt-corner corner-one" />
        <span className="crt-corner corner-two" />
      </div>

      <div className="os-top-strip">
        <button className="os-home-link" type="button" onClick={navigateHome}>
          <Home size={16} />
          Back to main portfolio
        </button>
        <span className="os-hostname">
          <Cpu size={15} />
          AviOS retro-linux tty7
        </span>
      </div>

      <section className="desktop-icons" aria-label="Desktop shortcuts">
        {desktopApps.map((app) => (
          <button className="desktop-icon" type="button" key={app.id} onClick={() => launchApp(app)}>
            <span className="icon-tile">
              <app.icon size={28} />
            </span>
            <span>{app.label}</span>
          </button>
        ))}
      </section>

      {activeWindows.map((item) => (
        <AppWindow
          key={item.id}
          state={item}
          onFocus={() => focusWindow(item.id)}
          onClose={() => patchWindow(item.id, { open: false })}
          onMinimize={() => patchWindow(item.id, { minimized: true })}
          onMaximize={() => patchWindow(item.id, { maximized: !item.maximized })}
          onMove={(x, y) => patchWindow(item.id, { x, y })}
        >
          <WindowContent id={item.id} openWindow={openWindow} />
        </AppWindow>
      ))}

      <footer className="taskbar">
        <button className="start-button" type="button" onClick={() => setStartOpen((value) => !value)}>
          <Sparkles size={17} />
          start
        </button>
        {startOpen ? (
          <div className="start-menu">
            <strong>AviOS</strong>
            {desktopApps.slice(0, 7).map((app) => (
              <button type="button" key={app.id} onClick={() => launchApp(app)}>
                <app.icon size={16} />
                {app.label}
              </button>
            ))}
          </div>
        ) : null}
        <div className="taskbar-windows">
          {activeWindows.map((item) => (
            <button
              className={item.minimized ? "task-button is-minimized" : "task-button"}
              type="button"
              key={item.id}
              onClick={() =>
                item.minimized ? patchWindow(item.id, { minimized: false, z: ++nextZ.current }) : focusWindow(item.id)
              }
            >
              {item.title}
            </button>
          ))}
        </div>
        <time className="task-clock">
          {new Intl.DateTimeFormat(undefined, { hour: "2-digit", minute: "2-digit" }).format(new Date())}
        </time>
      </footer>
    </main>
  );
}

type AppWindowProps = {
  state: WindowState;
  children: ReactNode;
  onFocus: () => void;
  onClose: () => void;
  onMinimize: () => void;
  onMaximize: () => void;
  onMove: (x: number, y: number) => void;
};

function AppWindow({
  state,
  children,
  onFocus,
  onClose,
  onMinimize,
  onMaximize,
  onMove,
}: AppWindowProps) {
  const dragRef = useRef<{ dx: number; dy: number } | null>(null);

  if (state.minimized) return null;

  const startDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (state.maximized) return;
    onFocus();
    dragRef.current = {
      dx: event.clientX - state.x,
      dy: event.clientY - state.y,
    };
    event.currentTarget.setPointerCapture(event.pointerId);
  };

  const drag = (event: ReactPointerEvent<HTMLDivElement>) => {
    if (!dragRef.current) return;
    const x = Math.max(8, Math.min(window.innerWidth - 180, event.clientX - dragRef.current.dx));
    const y = Math.max(48, Math.min(window.innerHeight - 120, event.clientY - dragRef.current.dy));
    onMove(x, y);
  };

  const stopDrag = (event: ReactPointerEvent<HTMLDivElement>) => {
    dragRef.current = null;
    if (event.currentTarget.hasPointerCapture(event.pointerId)) {
      event.currentTarget.releasePointerCapture(event.pointerId);
    }
  };

  const style = state.maximized
    ? { zIndex: state.z }
    : {
        left: state.x,
        top: state.y,
        width: state.w,
        height: state.h,
        zIndex: state.z,
      };

  return (
    <article
      className={state.maximized ? "os-window is-maximized" : "os-window"}
      style={style}
      onPointerDown={onFocus}
    >
      <div className="window-titlebar" onPointerDown={startDrag} onPointerMove={drag} onPointerUp={stopDrag}>
        <span>{state.title}</span>
        <div className="window-controls">
          <button type="button" onClick={onMinimize} aria-label={`Minimize ${state.title}`}>
            <Minus size={14} />
          </button>
          <button type="button" onClick={onMaximize} aria-label={`Maximize ${state.title}`}>
            <Maximize2 size={13} />
          </button>
          <button type="button" onClick={onClose} aria-label={`Close ${state.title}`}>
            <X size={14} />
          </button>
        </div>
      </div>
      <div className="window-body">{children}</div>
    </article>
  );
}

function WindowContent({ id, openWindow }: { id: WindowId; openWindow: (id: WindowId) => void }) {
  switch (id) {
    case "about":
      return <AboutApp />;
    case "projects":
      return <ProjectsApp />;
    case "skills":
      return <SkillsApp />;
    case "experience":
      return <ExperienceApp />;
    case "resume":
      return <ResumeApp />;
    case "contact":
      return <ContactApp />;
    case "terminal":
      return <TerminalApp openWindow={openWindow} />;
  }
}

function AboutApp() {
  return (
    <div className="window-document">
      <p className="terminal-line">cat /home/avi/about.txt</p>
      <h2>{portfolio.profile.name}</h2>
      <p>{portfolio.profile.about}</p>
      <dl className="fact-list">
        <div>
          <dt>Location</dt>
          <dd>{portfolio.profile.location}</dd>
        </div>
        <div>
          <dt>Status</dt>
          <dd>{portfolio.profile.availability}</dd>
        </div>
      </dl>
    </div>
  );
}

function ProjectsApp() {
  return (
    <div className="window-document">
      <p className="terminal-line">ls -la ./projects</p>
      <div className="os-project-list">
        {portfolio.projects.map((project) => (
          <article key={project.title}>
            <span>{project.status}</span>
            <h2>{project.title}</h2>
            <p>{project.description}</p>
            <div className="chip-row">
              {project.stack.map((item) => (
                <span className="chip chip-bright" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}

function SkillsApp() {
  return (
    <div className="window-document">
      <p className="terminal-line">./print-skills --grouped</p>
      <div className="skill-grid os-skill-grid">
        {portfolio.skillGroups.map((group) => (
          <article className="skill-panel" key={group.label}>
            <h2>{group.label}</h2>
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
  );
}

function ExperienceApp() {
  return (
    <div className="window-document">
      <p className="terminal-line">tail -f experience.log</p>
      <div className="timeline os-timeline">
        {portfolio.experience.map((item) => (
          <article className="timeline-item" key={`${item.role}-${item.organization}`}>
            <span>{item.period}</span>
            <h2>{item.role}</h2>
            <p className="timeline-org">
              {item.organization} · {item.location}
            </p>
            <p>{item.summary}</p>
          </article>
        ))}
      </div>
    </div>
  );
}

function ResumeApp() {
  return (
    <div className="window-document resume-panel">
      <p className="terminal-line">xdg-open resume.pdf</p>
      {portfolio.links.resumeUrl ? (
        <>
          <p>Resume is mounted and ready.</p>
          <a className="primary-action compact-action" href={portfolio.links.resumeUrl} download>
            <Download size={17} />
            Download resume
          </a>
        </>
      ) : (
        <>
          <h2>Resume slot ready</h2>
          <p>
            Add your PDF later and update <code>resumeUrl</code> in the shared portfolio data. The window is already
            wired for preview and download behavior.
          </p>
          <span className="file-placeholder">/public/resume.pdf</span>
        </>
      )}
    </div>
  );
}

function ContactApp() {
  return (
    <div className="window-document">
      <p className="terminal-line">./contact.sh</p>
      <h2>Open a channel</h2>
      <div className="os-contact-actions">
        <a href={portfolio.links.email}>
          <Mail size={17} />
          Email
        </a>
        <a href={portfolio.links.github} target="_blank" rel="noreferrer">
          <Github size={17} />
          GitHub
        </a>
        <a href={portfolio.links.linkedin} target="_blank" rel="noreferrer">
          <Linkedin size={17} />
          LinkedIn
        </a>
      </div>
    </div>
  );
}

function TerminalApp({ openWindow }: { openWindow: (id: WindowId) => void }) {
  const [input, setInput] = useState("");
  const [lines, setLines] = useState<string[]>([
    portfolio.terminal.motd,
    "type `help` for available commands",
  ]);

  const commands = useMemo(
    () => ({
      help: [
        "commands: help, about, projects, skills, experience, contact, resume, links, neofetch, whoami, clear",
        "bonus: try `sudo hire avi`",
      ],
      about: [portfolio.profile.about],
      projects: portfolio.projects.map((project) => `${project.title} - ${project.status}`),
      skills: portfolio.skillGroups.map((group) => `${group.label}: ${group.items.join(", ")}`),
      experience: portfolio.experience.map((item) => `${item.role} @ ${item.organization} (${item.period})`),
      contact: ["email: hello@example.com", "linkedin: /in/your-linkedin", "github: /your-github"],
      links: [portfolio.links.github, portfolio.links.linkedin, portfolio.links.email],
      resume: [portfolio.links.resumeUrl || portfolio.links.resumeLabel],
      whoami: [portfolio.profile.handle],
      neofetch: [
        "       .--.        OS: AviOS retro-linux",
        "      |o_o |       Shell: curiosity",
        "      |:_/ |       WM: draggable-portfolio",
        "     //   \\ \\      Theme: amber phosphor",
        "    (|     | )     Packages: React, TypeScript, Vite",
      ],
      "sudo hire avi": ["permission granted", "opening contact window..."],
    }),
    [],
  );

  const submit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    const command = input.trim().toLowerCase();
    if (!command) return;
    setInput("");

    if (command === "clear") {
      setLines([]);
      return;
    }

    if (command === "sudo hire avi") openWindow("contact");
    if (command === "projects") openWindow("projects");
    if (command === "skills") openWindow("skills");
    if (command === "experience") openWindow("experience");
    if (command === "resume") openWindow("resume");

    const output = commands[command as keyof typeof commands] || [`${command}: command not found`];
    setLines((current) => [...current, `$ ${command}`, ...output]);
  };

  return (
    <div className="terminal-app">
      <div className="terminal-output" aria-live="polite">
        {lines.map((line, index) => (
          <pre key={`${line}-${index}`}>{line}</pre>
        ))}
      </div>
      <form className="terminal-form" onSubmit={submit}>
        <label htmlFor="terminal-input">{portfolio.profile.handle}:~$</label>
        <input
          id="terminal-input"
          value={input}
          onChange={(event) => setInput(event.target.value)}
          autoComplete="off"
          spellCheck={false}
        />
        <button type="submit" aria-label="Run terminal command">
          <Send size={15} />
        </button>
      </form>
    </div>
  );
}
