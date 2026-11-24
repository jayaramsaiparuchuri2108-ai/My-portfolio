import React, { useEffect, useMemo, useRef, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  ArrowDownToLine,
  ArrowLeft,
  ArrowUpRight,
  Bell,
  BriefcaseBusiness,
  Check,
  ChevronRight,
  CircleHelp,
  ClipboardList,
  Download,
  GraduationCap,
  LayoutDashboard,
  Mail,
  Menu,
  MoreHorizontal,
  Pencil,
  Plus,
  Search,
  Settings2,
  Trash2,
  Upload,
  X,
  LockKeyhole,
  LogOut,
} from "lucide-react";
import { projects as defaultProjects } from "./data/projects.js";
import { education as defaultEducation } from "./data/education.js";
import { readLocalData, storageKeys, writeLocalData } from "./data/storage.js";

const tabs = [
  { id: "overview", label: "Overview", icon: LayoutDashboard },
  { id: "projects", label: "Projects", icon: BriefcaseBusiness },
  { id: "education", label: "Education", icon: GraduationCap },
  { id: "inquiries", label: "Form submissions", icon: ClipboardList },
];
const emptyProject = {
  title: "",
  subtitle: "",
  status: "Live",
  url: "",
  image: "",
  tech: [],
  description: "",
};
const emptyEducation = {
  level: "",
  degree: "",
  institution: "",
  period: "",
  result: "",
};
const newId = () => globalThis.crypto?.randomUUID?.() ?? String(Date.now());

function AdminHeader({ title, subtitle, children, onMenu }) {
  return (
    <header className="admin-header">
      <button
        className="admin-mobile-menu"
        onClick={onMenu}
        aria-label="Toggle admin menu"
      >
        <Menu size={19} />
      </button>
      <div>
        <p className="admin-eyebrow">
          JAYARAM SAI PARUCHURI <span>·</span> SITE ADMIN
        </p>
        <h1>{title}</h1>
        <p className="admin-header-subtitle">{subtitle}</p>
      </div>
      <div className="admin-header-actions">{children}</div>
    </header>
  );
}

function StatCard({ label, value, note, icon: Icon, tone }) {
  return (
    <div className="admin-stat-card">
      <div className={`admin-stat-icon ${tone}`}>
        <Icon size={18} />
      </div>
      <div className="admin-stat-label">{label}</div>
      <div className="admin-stat-value">{value}</div>
      <div className="admin-stat-note">{note}</div>
    </div>
  );
}

function ProjectEditor({ record, onClose, onSave }) {
  const [form, setForm] = useState({
    ...emptyProject,
    ...record,
    tech: record?.tech?.join(", ") ?? "",
  });
  const update = (key) => (event) =>
    setForm((current) => ({ ...current, [key]: event.target.value }));
  const submit = (event) => {
    event.preventDefault();
    onSave({
      ...form,
      tech: form.tech
        .split(",")
        .map((item) => item.trim())
        .filter(Boolean),
    });
  };
  return (
    <EditorShell
      title={record ? "Edit project" : "Add project"}
      description="Keep project details accurate and easy to scan."
      onClose={onClose}
    >
      <form className="admin-editor-form" onSubmit={submit}>
        <label>
          Project name
          <input
            required
            value={form.title}
            onChange={update("title")}
            placeholder="e.g. Product analytics dashboard"
          />
        </label>
        <label>
          Short description
          <input
            required
            value={form.subtitle}
            onChange={update("subtitle")}
            placeholder="A concise one-line summary"
          />
        </label>
        <div className="admin-form-row">
          <label>
            Status
            <select value={form.status} onChange={update("status")}>
              <option value="Live">Completed</option>
              <option value="In Progress">In Progress / Running Project</option>
            </select>
          </label>
          <label>
            Live site URL
            <input
              type="url"
              value={form.url}
              onChange={update("url")}
              placeholder="https://example.com"
            />
          </label>
        </div>
        <label>
          Screenshot path
          <input
            value={form.image}
            onChange={update("image")}
            placeholder="/projects/project-name.png"
          />
        </label>
        <label>
          Technologies
          <input
            value={form.tech}
            onChange={update("tech")}
            placeholder="React, Node.js, MySQL"
          />
          <small>Separate technologies with commas.</small>
        </label>
        <label>
          Project details
          <textarea
            required
            rows="4"
            value={form.description}
            onChange={update("description")}
            placeholder="What does it do? What did you build?"
          />
        </label>
        <div className="admin-editor-actions">
          <button
            type="button"
            className="admin-button subtle"
            onClick={onClose}
          >
            Cancel
          </button>
          <button type="submit" className="admin-button primary">
            <Check size={15} /> Save project
          </button>
        </div>
      </form>
    </EditorShell>
  );
}

function EducationEditor({ record, onClose, onSave }) {
  const [form, setForm] = useState({ ...emptyEducation, ...record });
  const update = (key) => (event) =>
    setForm((current) => ({ ...current, [key]: event.target.value }));
  const submit = (event) => {
    event.preventDefault();
    onSave(form);
  };
  return (
    <EditorShell
      title={record ? "Edit education" : "Add qualification"}
      description="Update one item in the education timeline."
      onClose={onClose}
    >
      <form className="admin-editor-form" onSubmit={submit}>
        <label>
          Qualification
          <input
            required
            value={form.degree}
            onChange={update("degree")}
            placeholder="Bachelor of Science in Computer Science"
          />
        </label>
        <label>
          Level or program label
          <input
            required
            value={form.level}
            onChange={update("level")}
            placeholder="BACHELOR OF SCIENCE · COMPUTER SCIENCE"
          />
        </label>
        <label>
          Institution
          <input
            required
            value={form.institution}
            onChange={update("institution")}
            placeholder="Institution name and location"
          />
        </label>
        <div className="admin-form-row">
          <label>
            Year / period
            <input
              required
              value={form.period}
              onChange={update("period")}
              placeholder="May 2024"
            />
          </label>
          <label>
            Grade or result
            <input
              value={form.result}
              onChange={update("result")}
              placeholder="CGPA: 7.24 / 10.0"
            />
          </label>
        </div>
        <div className="admin-editor-actions">
          <button
            type="button"
            className="admin-button subtle"
            onClick={onClose}
          >
            Cancel
          </button>
          <button type="submit" className="admin-button primary">
            <Check size={15} /> Save education
          </button>
        </div>
      </form>
    </EditorShell>
  );
}

function EditorShell({ title, description, children, onClose }) {
  return (
    <motion.div
      className="admin-modal-backdrop"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      onMouseDown={onClose}
    >
      <motion.div
        className="admin-editor-modal"
        initial={{ opacity: 0, y: 18, scale: 0.98 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        onMouseDown={(event) => event.stopPropagation()}
      >
        <div className="admin-editor-heading">
          <div>
            <p className="admin-eyebrow">SITE CONTENT</p>
            <h2>{title}</h2>
            <p>{description}</p>
          </div>
          <button
            className="admin-icon-button"
            onClick={onClose}
            aria-label="Close editor"
          >
            <X size={18} />
          </button>
        </div>
        {children}
      </motion.div>
    </motion.div>
  );
}

function InquiryDetail({ inquiry, onClose, onDelete }) {
  return (
    <EditorShell
      title="Form submission"
      description="Contact request received through the portfolio form."
      onClose={onClose}
    >
      <div className="inquiry-detail">
        <div>
          <small>FROM</small>
          <strong>{inquiry.name}</strong>
          <a href={`mailto:${inquiry.email}`}>{inquiry.email}</a>
        </div>
        {inquiry.phone && (
          <div>
            <small>PHONE</small>
            <strong>{inquiry.phone}</strong>
          </div>
        )}
        <div>
          <small>PROJECT TYPE</small>
          <strong>{inquiry.projectType || "Not specified"}</strong>
        </div>
        <div>
          <small>RECEIVED</small>
          <strong>{new Date(inquiry.createdAt).toLocaleString()}</strong>
        </div>
        <div className="inquiry-message">
          <small>MESSAGE</small>
          <p>{inquiry.message}</p>
        </div>
        <div className="admin-editor-actions">
          <button
            className="admin-button danger"
            onClick={() => onDelete(inquiry.id)}
          >
            <Trash2 size={15} /> Delete submission
          </button>
          <button className="admin-button primary" onClick={onClose}>
            Done
          </button>
        </div>
      </div>
    </EditorShell>
  );
}

export default function AdminPage() {
  const [authStatus, setAuthStatus] = useState("checking");
  const [loginError, setLoginError] = useState("");
  const [credentials, setCredentials] = useState({ username: "", password: "" });
  const [loginBusy, setLoginBusy] = useState(false);
  useEffect(() => {
    fetch("/api/admin/session")
      .then(async (response) => ({ response, data: await response.json() }))
      .then(({ response, data }) => setAuthStatus(response.ok && data.authenticated ? "authenticated" : data.configured === false ? "unconfigured" : "logged-out"))
      .catch(() => setAuthStatus("unavailable"));
  }, []);
  const login = async (event) => {
    event.preventDefault();
    setLoginBusy(true);
    setLoginError("");
    try {
      const response = await fetch("/api/admin/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(credentials),
      });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "Unable to sign in.");
      setCredentials({ username: "", password: "" });
      setAuthStatus("authenticated");
    } catch (error) {
      setLoginError(error.message || "Admin API is unavailable. Start the project with Vercel CLI to use login locally.");
    } finally {
      setLoginBusy(false);
    }
  };
  const logout = async () => {
    await fetch("/api/admin/logout", { method: "POST" }).catch(() => {});
    setAuthStatus("logged-out");
  };
  const [activeTab, setActiveTab] = useState("overview");
  const [projects, setProjects] = useState(() =>
    readLocalData(storageKeys.projects, defaultProjects).map((item, index) => ({
      ...item,
      id: item.id ?? `project-${index + 1}`,
    })),
  );
  const [education, setEducation] = useState(() =>
    readLocalData(storageKeys.education, defaultEducation).map(
      (item, index) => ({
        ...item,
        id: item.id ?? `education-${index + 1}`,
      }),
    ),
  );
  const [inquiries, setInquiries] = useState(() =>
    readLocalData(storageKeys.inquiries, []),
  );
  const [projectEditor, setProjectEditor] = useState(null);
  const [educationEditor, setEducationEditor] = useState(null);
  const [selectedInquiry, setSelectedInquiry] = useState(null);
  const [pendingDelete, setPendingDelete] = useState(null);
  const [search, setSearch] = useState("");
  const [toast, setToast] = useState("");
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const importRef = useRef(null);
  const unread = inquiries.filter((item) => !item.read).length;
  const filteredProjects = useMemo(
    () =>
      projects.filter((project) =>
        `${project.title} ${project.subtitle} ${project.tech.join(" ")}`
          .toLowerCase()
          .includes(search.toLowerCase()),
      ),
    [projects, search],
  );
  const notify = (message) => {
    setToast(message);
    window.setTimeout(() => setToast(""), 2400);
  };
  const saveProjects = (next) => {
    setProjects(writeLocalData(storageKeys.projects, next));
  };
  const saveEducation = (next) => {
    setEducation(writeLocalData(storageKeys.education, next));
  };
  const saveInquiries = (next) => {
    setInquiries(writeLocalData(storageKeys.inquiries, next));
  };
  const saveProject = (record) => {
    const editing = projectEditor?.id;
    const next = editing
      ? projects.map((item) =>
          item.id === editing ? { ...record, id: editing } : item,
        )
      : [...projects, { ...record, id: newId() }];
    saveProjects(next);
    setProjectEditor(null);
    notify(editing ? "Project updated" : "Project added");
  };
  const saveEducationItem = (record) => {
    const editing = educationEditor?.id;
    const next = editing
      ? education.map((item) =>
          item.id === editing
            ? { ...record, id: editing, marker: item.marker }
            : item,
        )
      : [
          ...education,
          {
            ...record,
            id: newId(),
            marker: String(education.length + 1).padStart(2, "0"),
          },
        ];
    saveEducation(next);
    setEducationEditor(null);
    notify(editing ? "Education updated" : "Qualification added");
  };
  const deleteRecord = () => {
    if (!pendingDelete) return;
    if (pendingDelete.kind === "project")
      saveProjects(projects.filter((item) => item.id !== pendingDelete.id));
    if (pendingDelete.kind === "education")
      saveEducation(education.filter((item) => item.id !== pendingDelete.id));
    if (pendingDelete.kind === "inquiry") {
      saveInquiries(inquiries.filter((item) => item.id !== pendingDelete.id));
      setSelectedInquiry(null);
    }
    setPendingDelete(null);
    notify("Item deleted");
  };
  const openInquiry = (inquiry) => {
    setSelectedInquiry(inquiry);
    if (!inquiry.read)
      saveInquiries(
        inquiries.map((item) =>
          item.id === inquiry.id ? { ...item, read: true } : item,
        ),
      );
  };
  const exportData = () => {
    const blob = new Blob([JSON.stringify({ projects, education }, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const anchor = document.createElement("a");
    anchor.href = url;
    anchor.download = "jayaram-portfolio-content.json";
    anchor.click();
    URL.revokeObjectURL(url);
  };
  const importData = async (event) => {
    const file = event.target.files?.[0];
    if (!file) return;
    try {
      const data = JSON.parse(await file.text());
      if (!Array.isArray(data.projects) || !Array.isArray(data.education))
        throw new Error("The file needs projects and education lists.");
      saveProjects(data.projects);
      saveEducation(data.education);
      notify("Portfolio content imported");
    } catch {
      notify("Could not import that JSON file");
    }
    event.target.value = "";
  };
  const currentTitle =
    tabs.find((tab) => tab.id === activeTab)?.label ?? "Overview";

  if (authStatus !== "authenticated") {
    return (
      <main className="admin-auth-page">
        <motion.section className="admin-auth-card" initial={{ opacity: 0, y: 18 }} animate={{ opacity: 1, y: 0 }}>
          <a className="admin-brand" href="/" aria-label="Back to the public portfolio">
            <span className="admin-brand-mark">J</span>
            <span>Jayaram Sai <b>Paruchuri</b><small>PORTFOLIO ADMIN</small></span>
          </a>
          <span className="admin-auth-icon"><LockKeyhole size={21} /></span>
          <p className="admin-eyebrow">PRIVATE WORKSPACE</p>
          <h1>{authStatus === "checking" ? "Checking access…" : "Admin sign in"}</h1>
          {authStatus === "unconfigured" ? (
            <p className="admin-auth-message">Set ADMIN_USERNAME, ADMIN_PASSWORD, and SESSION_SECRET in your Vercel project settings, then redeploy to enable admin access.</p>
          ) : authStatus === "unavailable" ? (
            <p className="admin-auth-message">The admin API is unavailable. Run this project with Vercel CLI locally, or open the deployed Vercel site.</p>
          ) : (
            <form className="admin-auth-form" onSubmit={login}>
              <label>Username<input autoComplete="username" required value={credentials.username} onChange={(event) => setCredentials((current) => ({ ...current, username: event.target.value }))} /></label>
              <label>Password<input type="password" autoComplete="current-password" required value={credentials.password} onChange={(event) => setCredentials((current) => ({ ...current, password: event.target.value }))} /></label>
              {loginError && <p className="admin-auth-error" role="alert">{loginError}</p>}
              <button className="admin-button primary" type="submit" disabled={loginBusy || authStatus === "checking"}>{loginBusy ? "Signing in…" : "Sign in securely"}</button>
            </form>
          )}
          <a className="admin-back-link" href="/">← Back to portfolio</a>
        </motion.section>
      </main>
    );
  }

  return (
    <div className="admin-app">
      <aside className={`admin-sidebar ${mobileMenuOpen ? "is-open" : ""}`}>
        <a
          className="admin-brand"
          href="/"
          aria-label="Back to the public portfolio"
        >
          <span className="admin-brand-mark">J</span>
          <span>
            Jayaram Sai <b>Paruchuri</b>
            <small>PORTFOLIO ADMIN</small>
          </span>
        </a>
        <div className="admin-sidebar-caption">WORKSPACE</div>
        <nav className="admin-nav">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              className={activeTab === id ? "active" : ""}
              onClick={() => {
                setActiveTab(id);
                setMobileMenuOpen(false);
              }}
            >
              <Icon size={17} />
              <span>{label}</span>
              {id === "inquiries" && unread > 0 && <i>{unread}</i>}
            </button>
          ))}
        </nav>
        <div className="admin-sidebar-bottom">
          <div className="admin-profile">
            <div className="admin-avatar">JS</div>
            <div>
              <b>Jayaram Sai Paruchuri</b>
              <small>Portfolio owner</small>
            </div>
            <MoreHorizontal size={17} />
          </div>
          <a href="/" className="admin-back-link">
            <ArrowLeft size={15} /> View public site <ArrowUpRight size={14} />
          </a>
        </div>
      </aside>
      <main className="admin-main">
        <AdminHeader
          title={currentTitle}
          subtitle={
            activeTab === "overview"
              ? "A clear view of your portfolio content and incoming requests."
              : `Manage your ${currentTitle.toLowerCase()} content.`
          }
          onMenu={() => setMobileMenuOpen((value) => !value)}
        >
          <span className="admin-local-indicator">
            <i /> Signed in
          </span>
          <button className="admin-button subtle" onClick={logout} aria-label="Sign out"><LogOut size={15} /> Sign out</button>
          {activeTab === "projects" && (
            <button
              className="admin-button primary"
              onClick={() => setProjectEditor({})}
            >
              <Plus size={16} /> Add project
            </button>
          )}
          {activeTab === "education" && (
            <button
              className="admin-button primary"
              onClick={() => setEducationEditor({})}
            >
              <Plus size={16} /> Add qualification
            </button>
          )}
        </AdminHeader>
        <div className="admin-content">
          <div className="admin-local-notice">
            <CircleHelp size={16} />
            <span>
              <b>Browser-local content:</b> projects, education, and form
              submissions are stored in this browser only. Admin sign-in is
              protected on Vercel, while shared publishing and a cross-device
              inbox need a database connection.
            </span>
          </div>
          {activeTab === "overview" && (
            <>
              <div className="admin-stats-grid">
                <StatCard
                  label="TOTAL PROJECTS"
                  value={projects.length}
                  note={`${projects.filter((item) => item.status === "Live").length} completed · ${projects.filter((item) => item.status !== "Live").length} in progress`}
                  icon={BriefcaseBusiness}
                  tone="blue"
                />
                <StatCard
                  label="EDUCATION RECORDS"
                  value={education.length}
                  note="Qualifications in your timeline"
                  icon={GraduationCap}
                  tone="purple"
                />
                <StatCard
                  label="FORM SUBMISSIONS"
                  value={inquiries.length}
                  note={`${unread} unread in this browser`}
                  icon={Mail}
                  tone="green"
                />
                <StatCard
                  label="CONTENT STATUS"
                  value="Ready"
                  note="Changes save automatically"
                  icon={Check}
                  tone="amber"
                />
              </div>
              <div className="admin-overview-grid">
                <section className="admin-panel">
                  <div className="admin-panel-heading">
                    <div>
                      <p className="admin-eyebrow">PORTFOLIO CONTENT</p>
                      <h2>Recent projects</h2>
                    </div>
                    <button
                      className="admin-text-button"
                      onClick={() => setActiveTab("projects")}
                    >
                      Manage projects <ChevronRight size={14} />
                    </button>
                  </div>
                  <div className="admin-recent-list">
                    {projects.slice(0, 5).map((item) => (
                      <div
                        className="admin-recent-row"
                        key={item.id ?? item.title}
                      >
                        <span className="admin-project-mini">
                          {item.title.slice(0, 1)}
                        </span>
                        <div>
                          <b>{item.title}</b>
                          <small>{item.subtitle}</small>
                        </div>
                        <span
                          className={`admin-status ${item.status === "Live" ? "complete" : "progress"}`}
                        >
                          {item.status === "Live" ? "Completed" : "In progress"}
                        </span>
                      </div>
                    ))}
                  </div>
                </section>
                <section className="admin-panel admin-quick-panel">
                  <div className="admin-panel-heading">
                    <div>
                      <p className="admin-eyebrow">QUICK ACTIONS</p>
                      <h2>Keep things current</h2>
                    </div>
                    <Settings2 size={18} />
                  </div>
                  <button
                    onClick={() => {
                      setActiveTab("projects");
                      setProjectEditor({});
                    }}
                  >
                    <span>
                      <Plus size={16} />
                    </span>
                    <div>
                      <b>Add a project</b>
                      <small>Showcase a new piece of work</small>
                    </div>
                    <ChevronRight size={15} />
                  </button>
                  <button
                    onClick={() => {
                      setActiveTab("education");
                      setEducationEditor({});
                    }}
                  >
                    <span>
                      <GraduationCap size={16} />
                    </span>
                    <div>
                      <b>Update education</b>
                      <small>Add a qualification to your timeline</small>
                    </div>
                    <ChevronRight size={15} />
                  </button>
                  <button onClick={exportData}>
                    <span>
                      <Download size={16} />
                    </span>
                    <div>
                      <b>Export your content</b>
                      <small>Save a JSON backup on this device</small>
                    </div>
                    <ChevronRight size={15} />
                  </button>
                </section>
              </div>
              <section className="admin-panel admin-note-panel">
                <div className="admin-note-icon">
                  <Bell size={17} />
                </div>
                <div>
                  <b>Keep your public portfolio up to date</b>
                  <p>
                    Project and education edits are saved on this device. Export
                    your content backup before clearing browser data.
                  </p>
                </div>
                <button
                  className="admin-button subtle"
                  onClick={() => importRef.current?.click()}
                >
                  <Upload size={15} /> Import backup
                </button>
              </section>
            </>
          )}
          {activeTab === "projects" && (
            <section className="admin-panel">
              <div className="admin-panel-heading admin-list-heading">
                <div>
                  <p className="admin-eyebrow">
                    PROJECT LIBRARY ·{" "}
                    {projects.length.toString().padStart(2, "0")}
                  </p>
                  <h2>All projects</h2>
                </div>
                <label className="admin-search">
                  <Search size={15} />
                  <input
                    value={search}
                    onChange={(event) => setSearch(event.target.value)}
                    placeholder="Search projects"
                  />
                </label>
              </div>
              <div className="admin-project-list">
                {filteredProjects.map((item) => (
                  <article
                    className="admin-project-row"
                    key={item.id ?? item.title}
                  >
                    <div className="admin-project-thumb">
                      {item.image ? (
                        <img src={item.image} alt="" />
                      ) : (
                        <BriefcaseBusiness size={19} />
                      )}
                    </div>
                    <div className="admin-project-row-main">
                      <div className="admin-project-row-title">
                        <h3>{item.title}</h3>
                        <span
                          className={`admin-status ${item.status === "Live" ? "complete" : "progress"}`}
                        >
                          {item.status === "Live"
                            ? "Completed"
                            : "In Progress / Running Project"}
                        </span>
                      </div>
                      <p>{item.subtitle}</p>
                      <div className="admin-tech-list">
                        {item.tech.slice(0, 5).map((tech) => (
                          <span key={tech}>{tech}</span>
                        ))}
                      </div>
                    </div>
                    <div className="admin-row-actions">
                      <button
                        className="admin-icon-button"
                        onClick={() => setProjectEditor(item)}
                        aria-label={`Edit ${item.title}`}
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        className="admin-icon-button danger-icon"
                        onClick={() =>
                          setPendingDelete({
                            kind: "project",
                            id: item.id ?? item.title,
                            label: item.title,
                          })
                        }
                        aria-label={`Delete ${item.title}`}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </article>
                ))}
                {filteredProjects.length === 0 && (
                  <div className="admin-empty">
                    No projects match that search.
                  </div>
                )}
              </div>
            </section>
          )}
          {activeTab === "education" && (
            <div className="admin-panel">
              <div className="admin-panel-heading">
                <div>
                  <p className="admin-eyebrow">
                    ACADEMIC HISTORY ·{" "}
                    {education.length.toString().padStart(2, "0")}
                  </p>
                  <h2>Education timeline</h2>
                </div>
                <button
                  className="admin-button subtle"
                  onClick={() => setEducationEditor({})}
                >
                  <Plus size={15} /> Add qualification
                </button>
              </div>
              <div className="admin-education-list">
                {education.map((item, index) => (
                  <article
                    className="admin-education-row"
                    key={item.id ?? item.degree}
                  >
                    <span className="admin-edu-marker">
                      {item.marker ?? String(index + 1).padStart(2, "0")}
                    </span>
                    <div className="admin-education-main">
                      <p>{item.level}</p>
                      <h3>{item.degree}</h3>
                      <span>{item.institution}</span>
                    </div>
                    <div className="admin-education-period">
                      <b>{item.period}</b>
                      <small>{item.result}</small>
                    </div>
                    <div className="admin-row-actions">
                      <button
                        className="admin-icon-button"
                        onClick={() => setEducationEditor(item)}
                        aria-label={`Edit ${item.degree}`}
                      >
                        <Pencil size={15} />
                      </button>
                      <button
                        className="admin-icon-button danger-icon"
                        onClick={() =>
                          setPendingDelete({
                            kind: "education",
                            id: item.id ?? item.degree,
                            label: item.degree,
                          })
                        }
                        aria-label={`Delete ${item.degree}`}
                      >
                        <Trash2 size={15} />
                      </button>
                    </div>
                  </article>
                ))}
                {education.length === 0 && (
                  <div className="admin-empty">
                    No education records yet. Add your first qualification.
                  </div>
                )}
              </div>
            </div>
          )}
          {activeTab === "inquiries" && (
            <section className="admin-panel">
              <div className="admin-panel-heading">
                <div>
                  <p className="admin-eyebrow">
                    CONTACT FORM ·{" "}
                    {inquiries.length.toString().padStart(2, "0")}
                  </p>
                  <h2>Recent submissions</h2>
                </div>
                <span className="admin-inquiry-count">{unread} unread</span>
              </div>
              {inquiries.length === 0 ? (
                <div className="admin-empty-state">
                  <div>
                    <Mail size={22} />
                  </div>
                  <h3>No submissions yet</h3>
                  <p>
                    Contact form messages submitted from this browser will
                    appear here.
                  </p>
                </div>
              ) : (
                <div className="admin-inquiry-list">
                  {[...inquiries]
                    .sort(
                      (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
                    )
                    .map((item) => (
                      <button
                        className={`admin-inquiry-row ${item.read ? "" : "unread"}`}
                        key={item.id}
                        onClick={() => openInquiry(item)}
                      >
                        <span className="admin-inquiry-avatar">
                          {item.name?.slice(0, 1)?.toUpperCase() || "?"}
                        </span>
                        <span className="admin-inquiry-main">
                          <b>{item.name || "Visitor"}</b>
                          <small>
                            {item.email} ·{" "}
                            {item.projectType || "General inquiry"}
                          </small>
                          <span>{item.message}</span>
                        </span>
                        <time>
                          {new Date(item.createdAt).toLocaleDateString()}
                        </time>
                        <ChevronRight size={16} />
                      </button>
                    ))}
                </div>
              )}
            </section>
          )}
        </div>
      </main>
      <input
        ref={importRef}
        type="file"
        accept="application/json,.json"
        hidden
        onChange={importData}
      />
      <AnimatePresence>
        {projectEditor && (
          <ProjectEditor
            record={projectEditor.id ? projectEditor : null}
            onClose={() => setProjectEditor(null)}
            onSave={saveProject}
          />
        )}
        {educationEditor && (
          <EducationEditor
            record={educationEditor.id ? educationEditor : null}
            onClose={() => setEducationEditor(null)}
            onSave={saveEducationItem}
          />
        )}
        {selectedInquiry && (
          <InquiryDetail
            inquiry={selectedInquiry}
            onClose={() => setSelectedInquiry(null)}
            onDelete={(id) =>
              setPendingDelete({
                kind: "inquiry",
                id,
                label: selectedInquiry.name,
              })
            }
          />
        )}
        {pendingDelete && (
          <motion.div
            className="admin-modal-backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onMouseDown={() => setPendingDelete(null)}
          >
            <motion.div
              className="admin-confirm-modal"
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              onMouseDown={(event) => event.stopPropagation()}
            >
              <span className="admin-confirm-icon">
                <Trash2 size={20} />
              </span>
              <h2>Delete this item?</h2>
              <p>
                <b>{pendingDelete.label}</b> will be removed from this browser’s
                portfolio data.
              </p>
              <div className="admin-editor-actions">
                <button
                  className="admin-button subtle"
                  onClick={() => setPendingDelete(null)}
                >
                  Cancel
                </button>
                <button className="admin-button danger" onClick={deleteRecord}>
                  Delete
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
      <AnimatePresence>
        {toast && (
          <motion.div
            className="admin-toast"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0 }}
          >
            <Check size={15} />
            {toast}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
