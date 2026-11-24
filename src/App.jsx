import React, { useEffect, useState } from "react";
import { motion, AnimatePresence, useScroll, useSpring } from "framer-motion";
import {
  ArrowDownRight,
  ArrowUpRight,
  Check,
  Cloud,
  Code2,
  Copy,
  Database,
  Download,
  ExternalLink,
  FileText,
  Github,
  Linkedin,
  Mail,
  Menu,
  MessageCircle,
  Server,
  Sparkles,
  X,
} from "lucide-react";
import { projects as defaultProjects } from "./data/projects.js";
import { education as defaultEducation } from "./data/education.js";
import AdminPage from "./AdminPage.jsx";
import { readLocalData, storageKeys, writeLocalData } from "./data/storage.js";
const skills = {
  Frontend: [
    "React.js",
    "JavaScript ES6+",
    "HTML5 & CSS3",
    "Tailwind CSS",
    "Bootstrap",
    "Responsive UI",
    "Modular components",
  ],
  "Backend & DB": [
    "Node.js",
    "Express.js",
    "REST APIs",
    "MySQL",
    "Schema design",
    "Query optimization",
    "CRUD workflows",
  ],
  "Cloud & Tools": [
    "OCI fundamentals",
    "Vercel",
    "Git & GitHub",
    "VS Code",
    "Postman",
    "Cloud deployment",
  ],
  Engineering: [
    "Java",
    "SQL",
    "OOP",
    "Data structures",
    "SDLC & Agile",
    "JWT auth",
    "RBAC",
    "Testing & debugging",
  ],
};
const inquiryMessage =
  "Hello Jayaram, I came across your portfolio and would like to discuss a potential opportunity. Please let me know a convenient time to connect. Thank you.";
const whatsappChatUrl = `https://wa.me/919908032587?text=${encodeURIComponent(inquiryMessage)}`;
const whatsappQrUrl = "https://wa.me/qr/6H4TJPZO4P2IO1";
const emailSubject = "Portfolio inquiry - potential opportunity";
const emailBody = `Hello Jayaram,\n\nI came across your portfolio and would like to discuss a potential opportunity with you. Please let me know a convenient time to connect.\n\nBest regards,\n[Your Name]`;
const emailContactUrl = `mailto:jayaramsaiparuchuri2108@gmail.com?subject=${encodeURIComponent(emailSubject)}&body=${encodeURIComponent(emailBody)}`;
const reveal = {
  hidden: { opacity: 0, y: 24 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.55, ease: [0.22, 1, 0.36, 1] },
  },
};
function Section({ id, eyebrow, title, children }) {
  return (
    <section id={id} className="section wrap">
      <motion.div
        variants={reveal}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
      >
        <p className="eyebrow">{eyebrow}</p>
        <h2 className="section-title">{title}</h2>
      </motion.div>
      {children}
    </section>
  );
}
function PortfolioApp() {
  const [ready, setReady] = useState(false),
    [active, setActive] = useState("All"),
    [category, setCategory] = useState("Frontend"),
    [selected, setSelected] = useState(null),
    [menu, setMenu] = useState(false),
    [toast, setToast] = useState(""),
    [formSent, setFormSent] = useState(false),
    [resumeOpen, setResumeOpen] = useState(false),
    [contactChoiceOpen, setContactChoiceOpen] = useState(false);
  const [projectList] = useState(() =>
    readLocalData(storageKeys.projects, defaultProjects).map((item, index) => ({
      ...item,
      id: item.id ?? `project-${index + 1}`,
    })),
  );
  const [educationList] = useState(() =>
    readLocalData(storageKeys.education, defaultEducation).map(
      (item, index) => ({
        ...item,
        id: item.id ?? `education-${index + 1}`,
      }),
    ),
  );
  const { scrollYProgress } = useScroll();
  const progress = useSpring(scrollYProgress, {
    stiffness: 110,
    damping: 30,
    restDelta: 0.001,
  });
  useEffect(() => {
    const t = setTimeout(() => setReady(true), 1600);
    return () => clearTimeout(t);
  }, []);
  const copy = async (text) => {
    try {
      await navigator.clipboard.writeText(text);
      setToast("Copied to clipboard");
    } catch {
      setToast(text);
    }
    setTimeout(() => setToast(""), 2300);
  };
  const shown = projectList.filter(
    (p) =>
      active === "All" ||
      (active === "Completed" && p.status === "Live") ||
      (active === "In Progress" && p.status === "In Progress"),
  );
  return (
    <>
      <AnimatePresence>
        {!ready && (
          <motion.div
            className="preloader"
            initial={{ opacity: 1 }}
            exit={{ opacity: 0, filter: "blur(8px)" }}
            transition={{ duration: 0.55, ease: "easeInOut" }}
          >
            <motion.div
              className="preloader-aura"
              animate={{ rotate: 360, scale: [0.92, 1.04, 0.92] }}
              transition={{
                rotate: { duration: 12, repeat: Infinity, ease: "linear" },
                scale: { duration: 2.4, repeat: Infinity, ease: "easeInOut" },
              }}
            />
            <div className="preloader-content">
              <motion.p
                className="preloader-kicker"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.45 }}
              >
                <span /> PERSONAL PORTFOLIO <i>·</i> 2026
              </motion.p>
              <h2 className="preloader-name" aria-label="Jayaram Sai Paruchuri">
                {["Jayaram", "Sai", "Paruchuri"].map((word, index) => (
                  <span className="preloader-word-mask" key={word}>
                    <motion.span
                      className={index === 1 ? "accent-word" : ""}
                      initial={{ y: "110%", opacity: 0 }}
                      animate={{ y: 0, opacity: 1 }}
                      transition={{
                        delay: 0.12 + index * 0.13,
                        duration: 0.65,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                    >
                      {word}
                    </motion.span>
                  </span>
                ))}
              </h2>
              <div className="preloader-track">
                <motion.span
                  initial={{ scaleX: 0 }}
                  animate={{ scaleX: 1 }}
                  transition={{
                    duration: 1.25,
                    delay: 0.2,
                    ease: [0.65, 0, 0.35, 1],
                  }}
                />
              </div>
              <motion.div
                className="preloader-status"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.42 }}
              >
                <span>SOFTWARE ENGINEER</span>
                <span className="preloader-loading">
                  <i /> LOADING EXPERIENCE
                </span>
              </motion.div>
            </div>
            <div className="preloader-orbit orbit-a" />
            <div className="preloader-orbit orbit-b" />
          </motion.div>
        )}
      </AnimatePresence>
      <motion.div className="scroll-progress" style={{ scaleX: progress }} />
      <div className="site-shell">
        <div className="mesh" />
        <nav className="nav wrap">
          <a
            className="brand"
            href="#home"
            aria-label="Jayaram Sai Paruchuri home"
          >
            <span className="brand-mark" aria-hidden="true">
              J
            </span>
            <span className="brand-wordmark">
              Jayaram Sai <b>Paruchuri</b>
            </span>
          </a>
          <button
            className="menu-toggle"
            onClick={() => setMenu(!menu)}
            aria-label="Toggle menu"
          >
            {menu ? <X /> : <Menu />}
          </button>
          <div className={`nav-links ${menu ? "open" : ""}`}>
            {[
              "About",
              "Skills",
              "Experience",
              "Projects",
              "Education",
              "Contact",
            ].map((n) => (
              <a
                key={n}
                href={"#" + n.toLowerCase()}
                onClick={() => setMenu(false)}
              >
                {n}
              </a>
            ))}
          </div>
          <div className="nav-actions">
            <button
              className="resume-link"
              onClick={() => setResumeOpen(true)}
              aria-label="View and download resume"
            >
              <FileText size={14} /> Resume
            </button>
            <button
              className="nav-cta hire-cta"
              type="button"
              onClick={() => setContactChoiceOpen(true)}
              aria-haspopup="dialog"
            >
              Hire me <ArrowUpRight size={15} />
            </button>
          </div>
        </nav>
        <main id="home">
          <section className="hero wrap">
            <div className="hero-copy">
              <motion.div
                initial="hidden"
                animate="show"
                variants={{ show: { transition: { staggerChildren: 0.12 } } }}
              >
                <motion.div variants={reveal} className="availability">
                  <span className="live-dot" /> Available for full-stack roles &
                  freelance <b>· Hyderabad, India</b>
                </motion.div>
                <motion.p variants={reveal} className="hello">
                  <span className="hello-index">01</span> HELLO, I’M
                </motion.p>
                <motion.h1 variants={reveal} className="hero-name">
                  Jayaram <span className="hero-name-accent">Sai</span>
                  <br />
                  <span>Paruchuri</span>
                  <i className="hero-name-period">.</i>
                </motion.h1>
                <motion.div variants={reveal} className="hero-name-caption">
                  <span /> SOFTWARE ENGINEER <b>·</b> FULL STACK DEVELOPER
                </motion.div>
                <motion.p variants={reveal} className="hero-role">
                  Full Stack Developer <span className="divider">/</span>{" "}
                  Software Engineer
                </motion.p>
                <motion.p variants={reveal} className="hero-desc">
                  I build thoughtful digital products, scalable web applications
                  and secure APIs that make complex work feel simple.
                </motion.p>
                <motion.div variants={reveal} className="hero-actions">
                  <a className="button primary" href="#projects">
                    Explore my work <ArrowDownRight size={17} />
                  </a>
                  <a className="button secondary" href="#contact">
                    Let's connect <ArrowUpRight size={17} />
                  </a>
                </motion.div>
                <motion.div variants={reveal} className="stats">
                  <div>
                    <b>
                      1.5<span>+</span>
                    </b>
                    <small>years experience</small>
                  </div>
                  <div>
                    <b>7</b>
                    <small>full-stack projects</small>
                  </div>
                  <div>
                    <b>
                      React <span>·</span> Node
                    </b>
                    <small>Java · MySQL</small>
                  </div>
                </motion.div>
              </motion.div>
            </div>
            <motion.div
              className="hero-visual"
              initial={{ opacity: 0, scale: 0.92 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.4, duration: 0.7 }}
            >
              <div className="orbit orbit-one" />
              <div className="orbit orbit-two" />
              <figure className="portrait-frame">
                <img
                  className="portrait-image"
                  src="/jayaram-sai-paruchuri.jpeg"
                  alt="Jayaram Sai Paruchuri"
                  fetchPriority="high"
                />
                <figcaption className="portrait-caption">
                  <span className="live-dot" /> Building thoughtful digital
                  products
                </figcaption>
              </figure>
              <div className="float-chip chip-a">
                <Code2 size={15} /> React + Node
              </div>
              <div className="float-chip chip-b">
                <Cloud size={15} /> Cloud curious
              </div>
            </motion.div>
            <a className="scroll-hint" href="#about">
              <span /> Scroll to explore
            </a>
          </section>
          <Section
            id="about"
            eyebrow="A LITTLE ABOUT ME"
            title={
              <>
                Engineering with <span className="gradient-text">purpose.</span>
              </>
            }
          >
            <motion.div
              variants={reveal}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true }}
              className="about-copy"
            >
              <p>
                I'm a motivated Computer Science graduate with hands-on
                experience designing, building and shipping full-stack web
                applications. I turn business needs into modular React
                interfaces, secure Node.js APIs and reliable MySQL data models.
              </p>
              <p>
                At Magnus Designers, I worked closely with enterprise clients
                from the first conversation through deployment, bringing a
                practical, detail-oriented approach to every release.
              </p>
            </motion.div>
          </Section>
          <Section
            id="skills"
            eyebrow="MY TOOLKIT"
            title={
              <>
                Skills built for{" "}
                <span className="gradient-text">shipping.</span>
              </>
            }
          >
            <div className="skill-tabs">
              {Object.keys(skills).map((k, i) => (
                <button
                  key={k}
                  className={category === k ? "active" : ""}
                  onClick={() => setCategory(k)}
                >
                  {[<Code2 />, <Database />, <Cloud />, <Server />][i]} {k}
                </button>
              ))}
            </div>
            <AnimatePresence mode="wait">
              <motion.div
                key={category}
                className="skill-grid"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -8 }}
                transition={{ duration: 0.2 }}
              >
                {skills[category].map((s, i) => (
                  <motion.div
                    className="skill-card"
                    key={s}
                    initial={{ opacity: 0, y: 12 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: i * 0.035 }}
                  >
                    <span className="skill-mark">
                      {String(i + 1).padStart(2, "0")}
                    </span>
                    {s}
                    <ArrowUpRight size={14} />
                  </motion.div>
                ))}
              </motion.div>
            </AnimatePresence>
          </Section>
          <Section
            id="experience"
            eyebrow="WHERE I'VE MADE AN IMPACT"
            title={
              <>
                Experience that{" "}
                <span className="gradient-text">moves things forward.</span>
              </>
            }
          >
            <div className="timeline">
              <motion.div
                className="timeline-progress"
                initial={{ scaleY: 0 }}
                whileInView={{ scaleY: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 1.2 }}
              />
              <div className="timeline-node" />
              <motion.article
                className="experience-card"
                variants={reveal}
                initial="hidden"
                whileInView="show"
                viewport={{ once: true }}
              >
                <div className="experience-top">
                  <div>
                    <p className="eyebrow">
                      MARCH 2024 — OCTOBER 2025{" "}
                      <span className="current-tag">1.5 YEARS</span>
                    </p>
                    <h3>
                      Full Stack Developer <span>&</span> Client Solutions
                      Associate
                    </h3>
                    <p className="company">
                      Magnus Designers <span>·</span> Hyderabad, India
                    </p>
                  </div>
                  <span className="company-mark">MD</span>
                </div>
                <ul>
                  <li>
                    Engineered responsive full-stack applications, improving
                    site performance through considered frontend and server-side
                    architecture.
                  </li>
                  <li>
                    Partnered directly with enterprise clients to translate
                    business needs into technical plans and scalable layouts.
                  </li>
                  <li>
                    Built reusable UI components and integrated internal and
                    third-party REST APIs.
                  </li>
                  <li>
                    Delivered reliable releases through functional testing,
                    Vercel deployments and MySQL query optimization.
                  </li>
                  <li>
                    Managed version control, patches and hotfixes in Git within
                    Agile workflows.
                  </li>
                </ul>
              </motion.article>
            </div>
          </Section>
          <Section
            id="projects"
            eyebrow={`SELECTED WORK · ${projectList.length.toString().padStart(2, "0")} PROJECTS`}
            title={
              <>
                Things I've <span className="gradient-text">built.</span>
              </>
            }
          >
            <div className="project-toolbar">
              <p>From business platforms to customer experiences.</p>
              <div className="project-filters">
                {["All", "Completed", "In Progress"].map((x) => (
                  <button
                    key={x}
                    onClick={() => setActive(x)}
                    className={active === x ? "active" : ""}
                  >
                    {x}
                    <span>
                      {x === "All"
                        ? projectList.length
                        : projectList.filter((project) =>
                            x === "Completed"
                              ? project.status === "Live"
                              : project.status === "In Progress",
                          ).length}
                    </span>
                  </button>
                ))}
              </div>
            </div>
            <motion.div layout className="project-grid">
              {shown.map((p, i) => (
                <motion.article
                  layout
                  key={p.title}
                  className="project-card"
                  variants={reveal}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true, margin: "-30px" }}
                  transition={{ delay: i * 0.04 }}
                  onClick={() => setSelected(p)}
                >
                  <div className="project-art">
                    {p.image ? (
                      <img
                        className="project-screenshot object-cover object-top"
                        src={p.image}
                        alt={`${p.title} live website screenshot`}
                        loading="lazy"
                      />
                    ) : (
                      <>
                        <div className="art-grid" />
                        <div className="art-window">
                          <div className="art-header">
                            <i />
                            <i />
                            <i />
                          </div>
                          <div className="art-content">
                            <div />
                            <div />
                            <div />
                            <span>{String(i + 1).padStart(2, "0")}</span>
                          </div>
                        </div>
                      </>
                    )}
                    <span
                      className={`status ${p.status === "Live" ? "" : "progress"}`}
                    >
                      <i />
                      {p.status === "Live"
                        ? "Completed"
                        : "In Progress / Running Project"}
                    </span>
                    <button
                      className="card-arrow"
                      aria-label={`Open ${p.title}`}
                    >
                      <ArrowUpRight size={18} />
                    </button>
                  </div>
                  <div className="project-info">
                    <p className="project-kicker">
                      PROJECT /{" "}
                      {String(projectList.indexOf(p) + 1).padStart(2, "0")}
                    </p>
                    <h3>{p.title}</h3>
                    <p className="project-subtitle">{p.subtitle}</p>
                    <div className="tech-tags">
                      {p.tech.slice(0, 4).map((t) => (
                        <span key={t}>{t}</span>
                      ))}
                    </div>
                    <div className="case-link">
                      View case study <ArrowUpRight size={14} />
                    </div>
                  </div>
                </motion.article>
              ))}
            </motion.div>
          </Section>
          <Section
            id="education"
            eyebrow="THE FOUNDATION"
            title={
              <>
                Learning that built the{" "}
                <span className="gradient-text">foundation.</span>
              </>
            }
          >
            <div className="education-layout">
              <div className="education-timeline">
                {educationList.map((item, index) => (
                  <motion.article
                    key={item.marker}
                    className="education-entry"
                    variants={reveal}
                    initial="hidden"
                    whileInView="show"
                    viewport={{ once: true, margin: "-35px" }}
                    transition={{ delay: index * 0.12 }}
                  >
                    <span className="education-marker">{item.marker}</span>
                    <div className="education-entry-body">
                      <p className="eyebrow">{item.level}</p>
                      <h3>{item.degree}</h3>
                      <p className="education-institution">
                        {item.institution}
                      </p>
                      <div className="education-meta">
                        <span>{item.period}</span>
                        <b>{item.result}</b>
                      </div>
                    </div>
                  </motion.article>
                ))}
              </div>
              <div className="education-aside">
                <motion.div
                  className="credential-card"
                  variants={reveal}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                >
                  <div className="card-icon">
                    <Sparkles size={19} />
                  </div>
                  <h3>Certifications</h3>
                  <div className="credential">
                    <Check size={15} />
                    <span>Full Stack Web Development</span>
                  </div>
                  <div className="credential">
                    <Check size={15} />
                    <span>Java Programming</span>
                  </div>
                  <div className="credential">
                    <Check size={15} />
                    <span>SQL & Database Fundamentals</span>
                  </div>
                  <div className="credential">
                    <Check size={15} />
                    <span>Oracle Cloud Infrastructure Foundations</span>
                    <small>Learning</small>
                  </div>
                </motion.div>
                <motion.div
                  className="credential-card language-card"
                  variants={reveal}
                  initial="hidden"
                  whileInView="show"
                  viewport={{ once: true }}
                >
                  <h3>Languages</h3>
                  <div className="languages">
                    <span>
                      EN <b>English · Fluent</b>
                    </span>
                    <span>
                      TE <b>Telugu · Native</b>
                    </span>
                    <span>
                      HI <b>Hindi · Professional Working Proficiency</b>
                    </span>
                  </div>
                </motion.div>
              </div>
            </div>
          </Section>
          <Section
            id="contact"
            eyebrow="LET'S BUILD SOMETHING USEFUL"
            title={
              <>
                Have a project in <span className="gradient-text">mind?</span>
              </>
            }
          >
            <div className="contact-grid">
              <div className="contact-copy">
                <p>
                  Whether you're building a product or growing a team, I'd love
                  to hear what you're working on.
                </p>
                <div className="contact-method">
                  <div className="contact-icon">
                    <Mail size={17} />
                  </div>
                  <div>
                    <small>EMAIL</small>
                    <b>jayaramsaiparuchuri2108@gmail.com</b>
                  </div>
                  <button
                    onClick={() => copy("jayaramsaiparuchuri2108@gmail.com")}
                    aria-label="Copy email"
                  >
                    <Copy size={15} />
                  </button>
                </div>
                <div className="contact-method">
                  <div className="contact-icon">
                    <ArrowUpRight size={17} />
                  </div>
                  <div>
                    <small>PHONE</small>
                    <b>+91 99080 32587</b>
                  </div>
                  <button
                    onClick={() => copy("+91 99080 32587")}
                    aria-label="Copy phone"
                  >
                    <Copy size={15} />
                  </button>
                </div>
                <div className="contact-method">
                  <div className="contact-icon">
                    <Cloud size={17} />
                  </div>
                  <div>
                    <small>LOCATION</small>
                    <b>Hyderabad, Telangana, India</b>
                  </div>
                </div>
                <div className="socials">
                  <a
                    href="https://github.com/jayaramsaiparuchuri2108-ai"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open Jayaram's GitHub profile"
                  >
                    <Github size={17} /> GitHub <ArrowUpRight size={13} />
                  </a>
                  <a
                    href="https://www.linkedin.com/in/jayaramsaiparuchuri/"
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label="Open Jayaram's LinkedIn profile"
                  >
                    <Linkedin size={17} /> LinkedIn <ArrowUpRight size={13} />
                  </a>
                </div>
              </div>
              <form
                className="contact-form"
                onSubmit={(event) => {
                  event.preventDefault();
                  const values = Object.fromEntries(
                    new FormData(event.currentTarget),
                  );
                  const inquiries = readLocalData(storageKeys.inquiries, []);
                  writeLocalData(storageKeys.inquiries, [
                    ...inquiries,
                    {
                      id:
                        globalThis.crypto?.randomUUID?.() ?? String(Date.now()),
                      name: values.name,
                      email: values.email,
                      phone: values.phone,
                      projectType: values.projectType,
                      message: values.message,
                      createdAt: new Date().toISOString(),
                      read: false,
                    },
                  ]);
                  event.currentTarget.reset();
                  setFormSent(true);
                }}
              >
                <div className="form-row">
                  <label>
                    Your name
                    <input name="name" required placeholder="Name" />
                  </label>
                  <label>
                    Email address
                    <input
                      name="email"
                      type="email"
                      required
                      placeholder="you@example.com"
                    />
                  </label>
                </div>
                <div className="form-row">
                  <label>
                    Phone <span className="optional">optional</span>
                    <input
                      name="phone"
                      inputMode="numeric"
                      pattern="[0-9]{10}"
                      placeholder="10-digit Indian mobile"
                      title="Enter a 10-digit mobile number"
                    />
                  </label>
                  <label>
                    Project type
                    <select name="projectType" defaultValue="">
                      <option value="" disabled>
                        Select a type
                      </option>
                      <option>Web application</option>
                      <option>eCommerce</option>
                      <option>API & backend</option>
                      <option>Full-time role</option>
                      <option>Other</option>
                    </select>
                  </label>
                </div>
                <label>
                  Tell me a little about it
                  <textarea
                    name="message"
                    required
                    rows="4"
                    placeholder="What are you looking to build?"
                  />
                </label>
                <button className="button primary submit-button" type="submit">
                  {formSent ? "Message noted — thank you!" : "Send a message"}{" "}
                  {formSent ? <Check size={16} /> : <ArrowUpRight size={16} />}
                </button>
                <small className="form-note">
                  Demo mode saves this submission in this browser only.
                </small>
              </form>
            </div>
          </Section>
        </main>
        <footer className="footer wrap">
          <a
            className="brand"
            href="#home"
            aria-label="Jayaram Sai Paruchuri home"
          >
            <span className="brand-mark" aria-hidden="true">
              J
            </span>
            <span className="brand-wordmark">
              Jayaram Sai <b>Paruchuri</b>
            </span>
          </a>
          <p>
            Engineered with care <span>·</span> © 2026 Jayaram Sai Paruchuri
          </p>
          <a href="#home" className="back-top">
            Back to top <ArrowUpRight size={14} />
          </a>
        </footer>
      </div>
      <AnimatePresence>
        {selected && (
          <motion.div
            className="modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setSelected(null)}
          >
            <motion.div
              className="project-modal"
              initial={{ opacity: 0, y: 20, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 12 }}
              onClick={(e) => e.stopPropagation()}
            >
              <button
                className="modal-close"
                onClick={() => setSelected(null)}
                aria-label="Close"
              >
                <X />
              </button>
              <p className="eyebrow">
                CASE STUDY ·{" "}
                {selected.status === "Live" ? "COMPLETED" : "IN DEVELOPMENT"}
              </p>
              <h2>{selected.title}</h2>
              <p className="modal-subtitle">{selected.subtitle}</p>
              {selected.image && (
                <img
                  className="modal-screenshot object-cover object-top"
                  src={selected.image}
                  alt={`${selected.title} live website screenshot`}
                />
              )}
              <div className="modal-rule" />
              <p>{selected.description}</p>
              <h4>TECHNOLOGIES</h4>
              <div className="tech-tags">
                {selected.tech.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
              {selected.url && (
                <a
                  className="button primary modal-live-link"
                  href={selected.url}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Visit Live Site <ArrowUpRight size={15} />
                </a>
              )}
              <button
                className="button secondary modal-done"
                onClick={() => setSelected(null)}
              >
                Close <X size={15} />
              </button>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      {contactChoiceOpen && (
        <motion.div
          className="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setContactChoiceOpen(false)}
        >
          <motion.div
            className="project-modal contact-choice-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="contact-choice-title"
            initial={{ opacity: 0, y: 18, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.98 }}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setContactChoiceOpen(false)}
              aria-label="Close contact options"
            >
              <X />
            </button>
            <p className="eyebrow">LET’S CONNECT</p>
            <h2 id="contact-choice-title">How would you like to reach me?</h2>
            <p className="contact-choice-intro">
              Choose a channel and I’ll be happy to talk about your project or
              opportunity.
            </p>
            <div className="contact-choice-grid">
              <a
                className="contact-choice-card whatsapp-option"
                href={whatsappChatUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                <span className="contact-choice-icon">
                  <MessageCircle size={21} />
                </span>
                <strong>WhatsApp</strong>
                <span className="contact-choice-description">
                  Open a direct chat with a professional message ready to send.
                </span>
                <span className="contact-choice-action">
                  Chat on WhatsApp <ArrowUpRight size={14} />
                </span>
              </a>
              <a
                className="contact-choice-card email-option"
                href={emailContactUrl}
              >
                <span className="contact-choice-icon">
                  <Mail size={21} />
                </span>
                <strong>Email</strong>
                <span className="contact-choice-description">
                  Start an email with a subject and introduction already filled
                  in.
                </span>
                <span className="contact-choice-action">
                  Write an email <ArrowUpRight size={14} />
                </span>
              </a>
            </div>
            <p className="contact-choice-fallback">
              Prefer your WhatsApp QR link?{" "}
              <a href={whatsappQrUrl} target="_blank" rel="noopener noreferrer">
                Open it here
              </a>
            </p>
          </motion.div>
        </motion.div>
      )}
      {resumeOpen && (
        <motion.div
          className="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={() => setResumeOpen(false)}
        >
          <motion.div
            className="project-modal resume-modal"
            initial={{ opacity: 0, y: 15 }}
            animate={{ opacity: 1, y: 0 }}
            onClick={(e) => e.stopPropagation()}
          >
            <button
              className="modal-close"
              onClick={() => setResumeOpen(false)}
              aria-label="Close"
            >
              <X />
            </button>
            <p className="eyebrow">RESUME</p>
            <h2>Jayaram Sai Paruchuri</h2>
            <p className="modal-subtitle">
              Full Stack Developer · Hyderabad, India
            </p>
            <div className="resume-toolbar">
              <p>Preview my resume here, or open and download the PDF.</p>
              <div className="resume-actions">
                <a
                  className="button secondary"
                  href="/resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Open in new tab <ExternalLink size={15} />
                </a>
                <a
                  className="button primary"
                  href="/resume.pdf"
                  download="Jayaram Sai Paruchuri - Resume.pdf"
                >
                  Download PDF <Download size={15} />
                </a>
              </div>
            </div>
            <iframe
              className="resume-pdf-viewer"
              src="/resume.pdf#toolbar=1&navpanes=0&view=FitH"
              title="Jayaram Sai Paruchuri resume PDF preview"
            />
          </motion.div>
        </motion.div>
      )}
      {toast && (
        <motion.div
          className="toast"
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
        >
          <Check size={15} />
          {toast}
        </motion.div>
      )}
    </>
  );
}

export default function App() {
  const isAdmin = window.location.pathname.replace(/\/+$/, "") === "/admin";
  return isAdmin ? <AdminPage /> : <PortfolioApp />;
}
