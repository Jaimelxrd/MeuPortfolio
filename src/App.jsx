import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  apps,
  profile,
  projects,
  skills,
  wallpapers,
  fileTree,
} from "./data.js";
import {
  Search,
  Wifi,
  Volume2,
  Battery,
  ChevronUp,
  CalendarDays,
  Power,
  Minimize2,
  Square,
  X,
  ArrowLeft,
  ArrowRight,
  ArrowUp,
  LayoutGrid,
  List,
  Folder,
  FileText,
  FileCode2,
  Image as ImageIcon,
  ExternalLink,
  Copy,
  Check,
  MoreHorizontal,
  Monitor,
  Palette,
  RotateCcw,
  Menu,
  Maximize2,
  Download,
  Mail,
  Github,
  Linkedin,
  Command,
  Clock3,
} from "lucide-react";

const defaults = {
  theme: "dark",
  wallpaper: 0,
  accent: "#79a9ff",
  icons: true,
  notifications: true,
};
const loadSettings = () => {
  try {
    return {
      ...defaults,
      ...JSON.parse(localStorage.getItem("portfolio-settings") || "{}"),
    };
  } catch {
    return defaults;
  }
};
const getIcon = (type) =>
  type === "folder"
    ? Folder
    : type === "pdf" || type === "file"
      ? FileText
      : type === "code"
        ? FileCode2
        : type === "image"
          ? ImageIcon
          : ExternalLink;
const initialWindows = [];

export default function App() {
  const [windows, setWindows] = useState(initialWindows),
    [z, setZ] = useState(5),
    [start, setStart] = useState(false),
    [query, setQuery] = useState(""),
    [context, setContext] = useState(null),
    [toast, setToast] = useState(""),
    [settings, setSettings] = useState(loadSettings),
    [time, setTime] = useState(new Date()),
    [calendar, setCalendar] = useState(false),
    [active, setActive] = useState(""),
    [filePath, setFilePath] = useState(["Este Computador"]),
    [selected, setSelected] = useState(null),
    [view, setView] = useState("grid"),
    [sort, setSort] = useState("name"),
    [fileQuery, setFileQuery] = useState(""),
    [history, setHistory] = useState([["Este Computador"]]),
    [histIndex, setHistIndex] = useState(0),
    [fileMenu, setFileMenu] = useState(null),
    [doc, setDoc] = useState(null);
  const drag = useRef(null),
    searchRef = useRef(null);
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    localStorage.setItem("portfolio-settings", JSON.stringify(settings));
  }, [settings]);
  useEffect(() => {
    const close = () => {
      setContext(null);
      setFileMenu(null);
    };
    const key = (e) => {
      if (e.key === "Escape") {
        setStart(false);
        setContext(null);
        setCalendar(false);
        setDoc(null);
        setFileMenu(null);
      }
      if ((e.ctrlKey && e.code === "Space") || e.key === "Meta") {
        e.preventDefault();
        setStart((v) => !v);
      }
      if (
        e.ctrlKey &&
        e.key.toLowerCase() === "f" &&
        !e.target.matches("input,textarea")
      ) {
        e.preventDefault();
        setStart(true);
        setTimeout(() => searchRef.current?.focus(), 10);
      }
      if (
        e.ctrlKey &&
        e.key.toLowerCase() === "w" &&
        active &&
        !e.target.matches("input,textarea")
      ) {
        e.preventDefault();
        closeWindow(active);
      }
      if (e.altKey && e.key === "Tab") {
        e.preventDefault();
        const opened = windows.filter((w) => !w.minimized);
        if (opened.length) {
          const i = opened.findIndex((w) => w.id === active),
            next = opened[(i + 1) % opened.length];
          focus(next.id);
        }
      }
    };
    window.addEventListener("click", close);
    window.addEventListener("keydown", key);
    return () => {
      window.removeEventListener("click", close);
      window.removeEventListener("keydown", key);
    };
  }, [windows, active]);
  const say = (s) => {
    if (!settings.notifications) return;
    setToast(s);
    setTimeout(() => setToast(""), 2600);
  };
  const focus = (id) => {
    setActive(id);
    setZ((v) => v + 1);
    setWindows((v) =>
      v.map((w) => (w.id === id ? { ...w, minimized: false, z: z + 1 } : w)),
    );
  };
  const open = (id, extra = {}) => {
    setStart(false);
    setContext(null);
    setFileMenu(null);
    setDoc(null);
    let existing = windows.find((w) => w.app === id);
    if (existing) {
      focus(existing.id);
      return;
    }
    let app = apps.find((a) => a.id === id);
    let wid = id + "-" + Date.now();
    setZ((v) => v + 1);
    setWindows((v) => [
      ...v,
      {
        id: wid,
        app: id,
        title: app?.name || "Explorador de Ficheiros",
        x: Math.max(25, window.innerWidth / 2 - 420 + Math.random() * 40),
        y: Math.max(24, window.innerHeight / 2 - 280 + Math.random() * 30),
        w: 840,
        h: 570,
        z: z + 1,
        minimized: false,
        maximized: window.innerWidth < 700,
        restore: null,
        path: extra.path,
      },
    ]);
    setActive(wid);
  };
  const change = (id, props) =>
    setWindows((v) => v.map((w) => (w.id === id ? { ...w, ...props } : w)));
  const closeWindow = (id) => {
    setWindows((v) => v.filter((w) => w.id !== id));
    if (active === id)
      setActive(
        windows.filter((w) => w.id !== id && !w.minimized).at(-1)?.id || "",
      );
  };
  const win = windows.find((w) => w.id === active);
  const setPref = (k, v) => setSettings((s) => ({ ...s, [k]: v }));
  const navigate = (path, record = true) => {
    setFilePath(path);
    setSelected(null);
    setFileQuery("");
    if (record) {
      const h = history.slice(0, histIndex + 1);
      h.push(path);
      setHistory(h);
      setHistIndex(h.length - 1);
    }
  };
  const goBack = () =>
    histIndex > 0 &&
    (setHistIndex(histIndex - 1), setFilePath(history[histIndex - 1]));
  const goForward = () =>
    histIndex < history.length - 1 &&
    (setHistIndex(histIndex + 1), setFilePath(history[histIndex + 1]));
  const route = (path) => open("computer", { path });
  const desktopOpen = (id) => open(id);
  const activeFolder = filePath.at(-1) || "Este Computador";
  const items = (fileTree[activeFolder] || [])
    .filter((x) => x.name.toLowerCase().includes(fileQuery.toLowerCase()))
    .sort((a, b) =>
      sort === "name"
        ? a.name.localeCompare(b.name)
        : a.type.localeCompare(b.type),
    );
  const results = useMemo(() => {
    let q = query.trim().toLowerCase();
    if (!q) return [];
    let out = [];
    apps.forEach((a) => {
      if (a.name.toLowerCase().includes(q))
        out.push({
          name: a.name,
          type: "Aplicação",
          desc: "Abrir aplicação",
          act: () => open(a.id),
        });
    });
    projects.forEach((p) => {
      if ((p.name + p.stack + p.description).toLowerCase().includes(q))
        out.push({
          name: p.name,
          type: "Projeto",
          desc: p.stack,
          act: () => open("projects"),
        });
    });
    Object.entries(fileTree).forEach(([folder, children]) => {
      if (folder.toLowerCase().includes(q))
        out.push({
          name: folder,
          type: "Pasta",
          desc: "Este Computador",
          act: () =>
            route(
              folder === "Este Computador"
                ? ["Este Computador"]
                : [...findPath(folder)],
            ),
        });
      children.forEach((f) => {
        if (f.name.toLowerCase().includes(q))
          out.push({
            name: f.name,
            type: "Ficheiro",
            desc: folder,
            act: () => {
              route(findPath(folder));
              setDoc(f);
            },
          });
      });
    });
    if (
      profile.about.toLowerCase().includes(q) ||
      profile.role.toLowerCase().includes(q)
    )
      out.push({
        name: "Sobre Mim",
        type: "Perfil",
        desc: profile.role,
        act: () => open("about"),
      });
    return out.slice(0, 12);
  }, [query]);
  function findPath(folder) {
    if (folder === "Este Computador") return ["Este Computador"];
    for (const [p, arr] of Object.entries(fileTree))
      if (arr.some((i) => i.name === folder && i.type === "folder"))
        return [p, folder];
    return ["Este Computador", folder];
  }
  function moveToRecycle(item) {
    fileTree.Reciclagem.push({ ...item, origin: activeFolder });
    fileTree[activeFolder] = fileTree[activeFolder].filter((x) => x !== item);
    say("Item movido para a Reciclagem");
  }
  function openFile(item) {
    if (item.type === "folder") {
      navigate([...filePath, item.name]);
      return;
    }
    if (item.type === "link") {
      window.open(item.body, "_blank", "noopener,noreferrer");
      return;
    }
    setDoc(item);
  }
  const onTitleDown = (e, w) => {
    if (e.target.closest("button")) return;
    if (w.maximized) {
      return;
    }
    e.preventDefault();
    drag.current = { id: w.id, dx: e.clientX - w.x, dy: e.clientY - w.y };
    focus(w.id);
  };
  useEffect(() => {
    const move = (e) => {
      if (!drag.current) return;
      const w = windows.find((x) => x.id === drag.current.id);
      if (!w) return;
      change(w.id, {
        x: Math.max(
          -w.w + 180,
          Math.min(window.innerWidth - 90, e.clientX - drag.current.dx),
        ),
        y: Math.max(
          0,
          Math.min(window.innerHeight - 100, e.clientY - drag.current.dy),
        ),
      });
    };
    const up = (e) => {
      if (drag.current) {
        const w = windows.find((x) => x.id === drag.current.id);
        if (w && e.clientX < 16)
          change(w.id, {
            maximized: false,
            x: 0,
            y: 0,
            w: window.innerWidth / 2,
            h: window.innerHeight - 48,
            restore: { x: w.x, y: w.y, w: w.w, h: w.h },
          });
        else if (w && e.clientX > window.innerWidth - 16)
          change(w.id, {
            maximized: false,
            x: window.innerWidth / 2,
            y: 0,
            w: window.innerWidth / 2,
            h: window.innerHeight - 48,
            restore: { x: w.x, y: w.y, w: w.w, h: w.h },
          });
        drag.current = null;
      }
    };
    window.addEventListener("pointermove", move);
    window.addEventListener("pointerup", up);
    return () => {
      window.removeEventListener("pointermove", move);
      window.removeEventListener("pointerup", up);
    };
  }, [windows]);
  const switchMax = (w) => {
    if (w.maximized) change(w.id, { maximized: false, ...(w.restore || {}) });
    else
      change(w.id, {
        maximized: true,
        restore: { x: w.x, y: w.y, w: w.w, h: w.h },
      });
  };
  const iconButton = (app) => {
    const I = app.Icon;
    return (
      <button
        className="app-icon"
        key={app.id}
        onDoubleClick={() => desktopOpen(app.id)}
        onClick={() => setSelected(app.id)}
        onKeyDown={(e) => {
          if (e.key === "Enter") desktopOpen(app.id);
        }}
        title={app.name}
      >
        <span className="icon-tile" style={{ "--icon": app.color }}>
          <I size={23} />
        </span>
        <span>{app.name}</span>
      </button>
    );
  };
  const renderApp = (w) => {
    switch (w.app) {
      case "home":
        return <Home open={open} say={say} />;
      case "computer":
        return (
          <Explorer
            path={w.path}
            filePath={filePath}
            navigate={navigate}
            goBack={goBack}
            goForward={goForward}
            items={items}
            selected={selected}
            setSelected={setSelected}
            view={view}
            setView={setView}
            sort={sort}
            setSort={setSort}
            fileQuery={fileQuery}
            setFileQuery={setFileQuery}
            openFile={openFile}
            setFileMenu={setFileMenu}
            history={history}
            histIndex={histIndex}
          />
        );
      case "projects":
        return <Projects />;
      case "about":
        return <About />;
      case "resume":
        return <Resume say={say} />;
      case "skills":
        return <Skills />;
      case "contacts":
        return <Contacts say={say} />;
      case "recycle":
        return <Recycle say={say} />;
      case "settings":
        return <SettingsApp settings={settings} setPref={setPref} say={say} />;
      default:
        return null;
    }
  };
  const toggleMenu = (e) => {
    e.stopPropagation();
    setStart((v) => !v);
    setContext(null);
  };
  return (
    <div
      className={`desktop ${settings.theme}`}
      style={{
        "--accent": settings.accent,
        "--wallpaper": `url("${wallpapers[settings.wallpaper]?.url}")`,
      }}
      onContextMenu={(e) => {
        e.preventDefault();
        setStart(false);
        setContext({ x: e.clientX, y: e.clientY });
      }}
    >
      <div className="wallpaper" />
      {settings.icons && (
        <div className="desktop-icons">{apps.map(iconButton)}</div>
      )}
      {windows.map((w) => {
        let app = apps.find((a) => a.id === w.app);
        let I = app?.Icon || Folder;
        return (
          !w.minimized && (
            <section
              key={w.id}
              className={`window ${active === w.id ? "focused" : ""} ${w.maximized ? "maximized" : ""}`}
              style={
                w.maximized
                  ? { zIndex: w.z }
                  : {
                      left: w.x,
                      top: w.y,
                      width: w.w,
                      height: w.h,
                      zIndex: w.z,
                    }
              }
              onPointerDown={() => focus(w.id)}
            >
              <header
                className="titlebar"
                onPointerDown={(e) => onTitleDown(e, w)}
                onDoubleClick={() => switchMax(w)}
              >
                <span className="title-app">
                  <I size={16} />
                  {w.title}
                </span>
                <div className="window-controls">
                  <button
                    title="Minimizar"
                    onClick={() => change(w.id, { minimized: true })}
                  >
                    <Minimize2 size={14} />
                  </button>
                  <button
                    title={w.maximized ? "Restaurar" : "Maximizar"}
                    onClick={() => switchMax(w)}
                  >
                    {w.maximized ? (
                      <Minimize2 size={14} />
                    ) : (
                      <Square size={13} />
                    )}
                  </button>
                  <button
                    className="close"
                    title="Fechar"
                    onClick={() => closeWindow(w.id)}
                  >
                    <X size={15} />
                  </button>
                </div>
              </header>
              <div className="window-content">{renderApp(w)}</div>
              {!w.maximized && (
                <div
                  className="resize-handle"
                  onPointerDown={(e) => {
                    e.stopPropagation();
                    focus(w.id);
                    const sx = e.clientX,
                      sy = e.clientY,
                      sw = w.w,
                      sh = w.h;
                    const fn = (ev) =>
                      change(w.id, {
                        w: Math.max(360, sw + ev.clientX - sx),
                        h: Math.max(300, sh + ev.clientY - sy),
                      });
                    const up = () => {
                      window.removeEventListener("pointermove", fn);
                      window.removeEventListener("pointerup", up);
                    };
                    window.addEventListener("pointermove", fn);
                    window.addEventListener("pointerup", up);
                  }}
                />
              )}
            </section>
          )
        );
      })}
      <div className="taskbar">
        <div className="task-left">
          <button
            className={`task-start ${start ? "on" : ""}`}
            onClick={toggleMenu}
            aria-label="Iniciar"
          >
            <span className="winmark">
              <i />
              <i />
              <i />
              <i />
            </span>
          </button>
          <button
            className="task-search"
            onClick={() => {
              setStart(true);
              setTimeout(() => searchRef.current?.focus(), 20);
            }}
          >
            <Search size={16} />
            <span>Pesquisar</span>
          </button>
        </div>
        <div className="task-apps">
          {apps.slice(0, 7).map((a) => {
            let I = a.Icon,
              instance = windows.find((w) => w.app === a.id);
            return (
              <button
                key={a.id}
                className={`task-app ${instance ? "running" : ""} ${instance?.id === active ? "active" : ""}`}
                title={a.name}
                onClick={() =>
                  instance
                    ? instance.minimized
                      ? focus(instance.id)
                      : instance.id === active
                        ? change(instance.id, { minimized: true })
                        : focus(instance.id)
                    : open(a.id)
                }
              >
                <I size={19} />
              </button>
            );
          })}
        </div>
        <div className="system-tray">
          <button className="tray-status" aria-label="Estado de rede e volume">
            <Wifi size={15} />
            <Volume2 size={15} />
            <Battery size={16} />
          </button>
          <button className="clock" onClick={() => setCalendar((v) => !v)}>
            <span>
              {time.toLocaleTimeString("pt-MZ", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </span>
            <small>
              {time.toLocaleDateString("pt-MZ", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
            </small>
          </button>
          <button
            className="show-desktop"
            title="Mostrar ambiente de trabalho"
            onClick={() =>
              setWindows((v) => v.map((w) => ({ ...w, minimized: true })))
            }
          />
        </div>
      </div>
      {start && (
        <div className="start-menu" onClick={(e) => e.stopPropagation()}>
          <div className="start-search">
            <Search size={17} />
            <input
              ref={searchRef}
              placeholder="Pesquisar aplicações, projetos e ficheiros"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter" && results[0]) results[0].act();
              }}
            />
          </div>
          {query ? (
            <div className="search-results">
              {results.length ? (
                results.map((r, i) => (
                  <button key={i} onClick={r.act}>
                    <span className="result-symbol">
                      <Search size={16} />
                    </span>
                    <span>
                      <b>{r.name}</b>
                      <small>
                        {r.type} · {r.desc}
                      </small>
                    </span>
                    <ArrowRight size={14} />
                  </button>
                ))
              ) : (
                <div className="empty-search">
                  Sem resultados para “{query}”
                </div>
              )}
            </div>
          ) : (
            <>
              <div className="start-section-head">
                <b>Afixadas</b>
                <span>
                  Explorar aplicações <ArrowRight size={13} />
                </span>
              </div>
              <div className="pinned-grid">
                {apps.map((a) => {
                  let I = a.Icon;
                  return (
                    <button key={a.id} onClick={() => open(a.id)}>
                      <span style={{ "--icon": a.color }}>
                        <I size={20} />
                      </span>
                      {a.name}
                    </button>
                  );
                })}
              </div>
              <div className="start-section-head recent-head">
                <b>Recomendado</b>
                <span>
                  Ver tudo <ArrowRight size={13} />
                </span>
              </div>
              <button className="recent-card" onClick={() => open("projects")}>
                <span className="recent-thumb">
                  <Folder size={18} />
                </span>
                <span>
                  <b>Projetos recentes</b>
                  <small>Portfolio OS · Gestor de Tarefas</small>
                </span>
              </button>
            </>
          )}
          <footer className="start-footer">
            <span className="profile-avatar">J</span>
            <b>{profile.name}</b>
            <button title="Definições" onClick={() => open("settings")}>
              <Settings size={17} />
            </button>
            <button
              title="Encerrar experiência"
              onClick={() => {
                setStart(false);
                say("Obrigado por visitar o meu portfólio");
              }}
            >
              <Power size={17} />
            </button>
          </footer>
        </div>
      )}
      {calendar && (
        <div className="calendar-pop" onClick={(e) => e.stopPropagation()}>
          <header>
            <b>
              {time.toLocaleDateString("pt-MZ", {
                weekday: "long",
                day: "numeric",
                month: "long",
              })}
            </b>
            <CalendarDays size={18} />
          </header>
          <div className="calendar-time">
            {time.toLocaleTimeString("pt-MZ", {
              hour: "2-digit",
              minute: "2-digit",
            })}
          </div>
          <p>O seu dia está em dia.</p>
        </div>
      )}
      {context && (
        <div
          className="context-menu"
          style={{
            left: Math.min(context.x, window.innerWidth - 220),
            top: Math.min(context.y, window.innerHeight - 210),
          }}
          onClick={(e) => e.stopPropagation()}
        >
          {[
            [
              "Atualizar desktop",
              () => {
                setSelected(null);
                say("Ambiente de trabalho atualizado");
              },
            ],
            ["Alterar wallpaper", () => open("settings")],
            ["Organizar ícones", () => say("Ícones alinhados")],
            ["Abrir Definições", () => open("settings")],
            ["Personalizar aparência", () => open("settings")],
          ].map(([n, f]) => (
            <button
              key={n}
              onClick={() => {
                f();
                setContext(null);
              }}
            >
              {n}
            </button>
          ))}
        </div>
      )}
      {fileMenu && (
        <div
          className="context-menu file-context"
          style={{
            left: Math.min(fileMenu.x, window.innerWidth - 210),
            top: Math.min(fileMenu.y, window.innerHeight - 150),
          }}
          onClick={(e) => e.stopPropagation()}
        >
          <button onClick={() => openFile(fileMenu.item)}>Abrir</button>
          <button
            onClick={() => {
              navigator.clipboard?.writeText(fileMenu.item.name);
              say("Nome copiado");
            }}
          >
            Copiar nome
          </button>
          <button onClick={() => moveToRecycle(fileMenu.item)}>
            Mover para Reciclagem
          </button>
        </div>
      )}
      {doc && (
        <div className="overlay" onClick={() => setDoc(null)}>
          <article
            className="document-viewer"
            onClick={(e) => e.stopPropagation()}
          >
            <header>
              <div>
                <FileText size={18} />
                <b>{doc.name}</b>
              </div>
              <button onClick={() => setDoc(null)}>
                <X size={18} />
              </button>
            </header>
            {doc.type === "image" ? (
              <img src={doc.body} alt={doc.name} />
            ) : (
              <pre>
                {doc.body ||
                  "Este ficheiro de demonstração ainda não contém texto."}
              </pre>
            )}
            <footer>Pré-visualização do portfólio</footer>
          </article>
        </div>
      )}
      {toast && (
        <div className="toast">
          <Check size={16} />
          {toast}
        </div>
      )}
    </div>
  );
}

function Home({ open, say }) {
  return (
    <div className="home-app">
      <div className="welcome-panel">
        <span className="eyebrow">PORTFOLIO · 2026</span>
        <h1>
          Olá, eu sou {profile.name}
          <span>.</span>
        </h1>
        <p>
          {profile.role} a construir experiências digitais úteis e memoráveis.
        </p>
        <div className="welcome-actions">
          <button className="primary" onClick={() => open("projects")}>
            Explorar projetos <ArrowRight size={16} />
          </button>
          <button className="quiet" onClick={() => open("about")}>
            Conhecer o meu percurso
          </button>
        </div>
        <div className="welcome-meta">
          <span>
            <span className="online-dot" /> Disponível para oportunidades
          </span>
          <span>{profile.location}</span>
        </div>
      </div>
      <div className="home-bottom">
        <div
          className="home-card feature-card"
          onClick={() => open("projects")}
        >
          <div className="card-heading">
            <span>EM DESTAQUE</span>
            <ArrowRight size={16} />
          </div>
          <div
            className="feature-img"
            style={{ backgroundImage: `url(${projects[0].image})` }}
          />
          <h3>{projects[0].name}</h3>
          <p>{projects[0].description}</p>
        </div>
        <div className="home-card quick-card">
          <div className="card-heading">
            <span>ACESSO RÁPIDO</span>
            <Command size={15} />
          </div>
          {apps.slice(1, 5).map((a) => {
            let I = a.Icon;
            return (
              <button key={a.id} onClick={() => open(a.id)}>
                <span style={{ "--icon": a.color }}>
                  <I size={17} />
                </span>
                {a.name}
                <ArrowRight size={14} />
              </button>
            );
          })}
        </div>
        <div className="home-card note-card">
          <span className="note-kicker">UM POUCO SOBRE MIM</span>
          <p>{profile.about}</p>
          <button onClick={() => open("about")}>
            Mais sobre mim <ArrowRight size={14} />
          </button>
        </div>
      </div>
    </div>
  );
}

function Projects() {
  return (
    <div className="app-scroll projects-app">
      <div className="app-heading">
        <div>
          <span className="eyebrow">TRABALHO SELECIONADO</span>
          <h2>Projetos</h2>
          <p>Ideias transformadas em experiências funcionais.</p>
        </div>
        <span className="count-pill">{projects.length} projetos</span>
      </div>
      <div className="project-grid">
        {projects.map((p, i) => (
          <article className="project-card" key={p.name}>
            <div
              className="project-image"
              style={{ backgroundImage: `url(${p.image})` }}
            >
              <span>0{i + 1}</span>
              <a
                href={p.url}
                target="_blank"
                rel="noreferrer"
                aria-label="Abrir projeto"
              >
                <ExternalLink size={17} />
              </a>
            </div>
            <div className="project-info">
              <small>{p.type}</small>
              <h3>{p.name}</h3>
              <p>{p.description}</p>
              <div className="tag-row">
                {p.stack.split(" · ").map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
}
function About() {
  return (
    <div className="app-scroll about-app">
      <div className="about-top">
        <div className="portrait">
          J<span className="online-dot" />
        </div>
        <div>
          <span className="eyebrow">UM POUCO SOBRE MIM</span>
          <h2>
            {profile.name} <span className="muted">— {profile.role}</span>
          </h2>
          <p className="location-line">
            {profile.location} <span>·</span> Curioso por tecnologia e design
          </p>
        </div>
      </div>
      <div className="about-copy">
        <h3>Olá, mundo.</h3>
        <p>{profile.about}</p>
        <p>
          Gosto de aprender construindo: cada projeto é uma oportunidade para
          explorar novas ferramentas, resolver problemas reais e cuidar dos
          detalhes que tornam um produto intuitivo.
        </p>
        <div className="about-stats">
          <div>
            <b>06</b>
            <span>Projetos de demonstração</span>
          </div>
          <div>
            <b>03+</b>
            <span>Anos a aprender e criar</span>
          </div>
          <div>
            <b>∞</b>
            <span>Curiosidade</span>
          </div>
        </div>
        <div className="quote-card">
          “A melhor forma de prever o futuro é construí-lo.”
        </div>
      </div>
    </div>
  );
}
function Resume({ say }) {
  return (
    <div className="app-scroll resume-app">
      <div className="resume-head">
        <div>
          <span className="eyebrow">DOCUMENTO PROFISSIONAL</span>
          <h2>Currículo</h2>
          <p>Um resumo do meu percurso e das áreas em que estou a crescer.</p>
        </div>
        <button
          className="primary"
          onClick={() =>
            say(
              "Adicione o seu PDF em src/data.js para disponibilizar o download",
            )
          }
        >
          <Download size={16} /> Descarregar PDF
        </button>
      </div>
      <div className="resume-columns">
        <section>
          <h3>Experiência & projetos</h3>
          <div className="timeline">
            <div>
              <span>2025 — agora</span>
              <h4>Programador independente</h4>
              <p>
                Desenvolvimento de projetos pessoais e académicos com foco em
                aplicações web, Java e APIs.
              </p>
            </div>
            <div>
              <span>2023 — agora</span>
              <h4>Estudante de tecnologia</h4>
              <p>
                Aprendizagem contínua de fundamentos de programação, estruturas
                de dados e engenharia de software.
              </p>
            </div>
          </div>
        </section>
        <section>
          <h3>Formação</h3>
          <div className="timeline">
            <div>
              <span>EM CURSO</span>
              <h4>Formação em tecnologia</h4>
              <p>Adicione aqui a instituição, curso e datas da sua formação.</p>
            </div>
          </div>
          <h3 className="resume-subhead">Idiomas</h3>
          <p className="language-line">
            Português <span>Fluente</span>
          </p>
        </section>
      </div>
    </div>
  );
}
function Skills() {
  return (
    <div className="app-scroll skills-app">
      <div className="app-heading">
        <div>
          <span className="eyebrow">FERRAMENTAS DO OFÍCIO</span>
          <h2>Competências</h2>
          <p>Tecnologias que utilizo e continuo a aprofundar.</p>
        </div>
      </div>
      <div className="skills-list">
        {skills.map((g, i) => (
          <section className="skill-group" key={g.group}>
            <div className="skill-group-icon">0{i + 1}</div>
            <div>
              <h3>{g.group}</h3>
              <p>
                {i === 0
                  ? "Linguagens que uso para dar vida às ideias."
                  : i === 1
                    ? "Ecossistema e ferramentas do meu fluxo de trabalho."
                    : "Princípios que aplico ao desenvolver soluções."}
              </p>
              <div className="skill-tags">
                {g.items.map((s, j) => (
                  <span key={s}>
                    <i style={{ "--level": `${Math.max(48, 88 - j * 8)}%` }} />
                    {s}
                  </span>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>
      <p className="skills-footnote">
        Os níveis representam familiaridade pessoal e não uma avaliação formal.
      </p>
    </div>
  );
}
function Contacts({ say }) {
  return (
    <div className="app-scroll contacts-app">
      <div className="contact-hero">
        <span className="eyebrow">VAMOS CONVERSAR</span>
        <h2>
          Uma boa ideia começa
          <br />
          com uma conversa.
        </h2>
        <p>
          Tem um projeto em mente ou quer apenas trocar ideias? Estou a um
          clique.
        </p>
        <a className="primary" href={`mailto:${profile.email}`}>
          <Mail size={17} /> Escrever um email <ArrowRight size={15} />
        </a>
      </div>
      <div className="contact-links">
        <div>
          <span>Email</span>
          <b>{profile.email}</b>
          <button
            onClick={() => {
              navigator.clipboard?.writeText(profile.email);
              say("Email copiado");
            }}
          >
            <Copy size={15} /> Copiar
          </button>
        </div>
        <a href={profile.github} target="_blank" rel="noreferrer">
          <Github size={18} />
          <span>
            <small>CODE & PROJETOS</small>
            <b>GitHub</b>
          </span>
          <ExternalLink size={15} />
        </a>
        <a href={profile.linkedin} target="_blank" rel="noreferrer">
          <Linkedin size={18} />
          <span>
            <small>REDE PROFISSIONAL</small>
            <b>LinkedIn</b>
          </span>
          <ExternalLink size={15} />
        </a>
      </div>
      <p className="contact-note">
        <span className="online-dot" /> Normalmente respondo dentro de 1–2 dias
        úteis.
      </p>
    </div>
  );
}
function SettingsApp({ settings, setPref, say }) {
  const [tab, setTab] = useState("Personalização");
  const tabs = [
    ["Personalização", Palette],
    ["Ambiente de trabalho", Monitor],
    ["Sistema", Command],
  ];
  return (
    <div className="settings-layout">
      <aside className="settings-sidebar">
        <div className="settings-user">
          <span className="profile-avatar">J</span>
          <span>
            <b>{profile.name}</b>
            <small>Conta local</small>
          </span>
        </div>
        {tabs.map(([n, I]) => (
          <button
            className={tab === n ? "selected" : ""}
            key={n}
            onClick={() => setTab(n)}
          >
            <I size={16} />
            {n}
          </button>
        ))}
      </aside>
      <div className="settings-main app-scroll">
        <span className="eyebrow">DEFINIÇÕES</span>
        <h2>{tab}</h2>
        {tab === "Personalização" ? (
          <>
            <section className="settings-section">
              <h3>Tema</h3>
              <p>Escolha a aparência do ambiente.</p>
              <div className="theme-options">
                <button
                  className={settings.theme === "dark" ? "chosen" : ""}
                  onClick={() => {
                    setPref("theme", "dark");
                    say("Tema escuro ativado");
                  }}
                >
                  <span className="theme-preview dark-preview" />
                  Escuro
                </button>
                <button
                  className={settings.theme === "light" ? "chosen" : ""}
                  onClick={() => {
                    setPref("theme", "light");
                    say("Tema claro ativado");
                  }}
                >
                  <span className="theme-preview light-preview" />
                  Claro
                </button>
              </div>
            </section>
            <section className="settings-section">
              <h3>Wallpaper</h3>
              <p>Escolha o ambiente que acompanha a sua visita.</p>
              <div className="wallpaper-options">
                {wallpapers.map((w, i) => (
                  <button
                    className={settings.wallpaper === i ? "chosen" : ""}
                    key={w.name}
                    onClick={() => {
                      setPref("wallpaper", i);
                      say("Wallpaper atualizado");
                    }}
                  >
                    <img src={w.url} alt="" />
                    <span>{w.name}</span>
                  </button>
                ))}
              </div>
            </section>
            <section className="settings-section">
              <h3>Cor de destaque</h3>
              <div className="swatches">
                {["#79a9ff", "#ac91fa", "#61c7ae", "#f2a46f", "#ec849b"].map(
                  (c) => (
                    <button
                      aria-label="Selecionar cor"
                      key={c}
                      style={{ background: c }}
                      onClick={() => setPref("accent", c)}
                    />
                  ),
                )}
              </div>
            </section>
            <section className="settings-section">
              <h3>Notificações</h3>
              <p>Mensagens breves sobre ações efetuadas.</p>
              <label className="switch-row">
                Mostrar notificações{" "}
                <input
                  type="checkbox"
                  checked={settings.notifications}
                  onChange={(e) => setPref("notifications", e.target.checked)}
                />
              </label>
            </section>
          </>
        ) : tab === "Ambiente de trabalho" ? (
          <>
            <section className="settings-section">
              <h3>Ícones do ambiente de trabalho</h3>
              <p>Mostrar ou ocultar os atalhos no desktop.</p>
              <label className="switch-row">
                Mostrar ícones{" "}
                <input
                  type="checkbox"
                  checked={settings.icons}
                  onChange={(e) => setPref("icons", e.target.checked)}
                />
              </label>
            </section>
            <section className="settings-section">
              <h3>Restaurar preferências</h3>
              <p>Repor o tema, wallpaper e opções iniciais.</p>
              <button
                className="secondary-button"
                onClick={() => {
                  Object.entries(defaults).forEach(([k, v]) => setPref(k, v));
                  say("Configurações restauradas");
                }}
              >
                <RotateCcw size={15} /> Restaurar predefinições
              </button>
            </section>
          </>
        ) : (
          <section className="settings-section">
            <h3>Sobre este portfólio</h3>
            <p>Portfolio OS · versão 1.0.0</p>
            <div className="system-info">
              <span>
                Ambiente<strong>Desktop interativo</strong>
              </span>
              <span>
                Conteúdo<strong>Dados locais de demonstração</strong>
              </span>
              <span>
                Privacidade<strong>Sem backend ou recolha de dados</strong>
              </span>
            </div>
          </section>
        )}
      </div>
    </div>
  );
}
function Recycle({ say }) {
  const [items, setItems] = useState([...fileTree.Reciclagem]);
  return (
    <div className="app-scroll recycle-app">
      <div className="app-heading">
        <div>
          <span className="eyebrow">SISTEMA DE FICHEIROS VIRTUAL</span>
          <h2>Reciclagem</h2>
          <p>Itens removidos deste ambiente de demonstração.</p>
        </div>
        {items.length > 0 && (
          <button
            className="secondary-button"
            onClick={() => {
              fileTree.Reciclagem.splice(0);
              setItems([]);
              say("Reciclagem esvaziada");
            }}
          >
            Esvaziar Reciclagem
          </button>
        )}
      </div>
      {items.length ? (
        <div className="recycle-items">
          {items.map((item, i) => (
            <div key={i}>
              <FileText size={18} />
              <span>
                <b>{item.name}</b>
                <small>Local original: {item.origin || "Desconhecido"}</small>
              </span>
              <button
                onClick={() => {
                  fileTree[item.origin || "Desktop"].push(item);
                  fileTree.Reciclagem.splice(i, 1);
                  setItems([...fileTree.Reciclagem]);
                  say("Item restaurado");
                }}
              >
                Restaurar
              </button>
              <button
                onClick={() => {
                  fileTree.Reciclagem.splice(i, 1);
                  setItems([...fileTree.Reciclagem]);
                  say("Item eliminado");
                }}
              >
                <X size={15} />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <div className="empty-recycle">
          <span>
            <Trash2 size={28} />
          </span>
          <h3>A Reciclagem está vazia</h3>
          <p>Os itens removidos aparecerão aqui.</p>
        </div>
      )}
    </div>
  );
}

function Explorer({
  path,
  filePath,
  navigate,
  goBack,
  goForward,
  items,
  selected,
  setSelected,
  view,
  setView,
  sort,
  setSort,
  fileQuery,
  setFileQuery,
  openFile,
  setFileMenu,
  history,
  histIndex,
}) {
  useEffect(() => {
    if (path) navigate(path);
  }, []);
  const folders = [
    "Este Computador",
    "Desktop",
    "Documentos",
    "Projetos",
    "Imagens",
    "Competências",
    "Contactos",
    "Reciclagem",
  ];
  return (
    <div className="explorer">
      <div className="explorer-toolbar">
        <button disabled={histIndex === 0} onClick={goBack}>
          <ArrowLeft size={16} />
        </button>
        <button disabled={histIndex === history.length - 1} onClick={goForward}>
          <ArrowRight size={16} />
        </button>
        <button onClick={() => navigate(filePath.slice(0, -1))}>
          <ArrowUp size={16} />
        </button>
        <div className="addressbar">
          <Folder size={15} />
          <span>{filePath.join("  ›  ")}</span>
        </div>
        <div className="explorer-search">
          <Search size={15} />
          <input
            placeholder="Pesquisar nesta pasta"
            value={fileQuery}
            onChange={(e) => setFileQuery(e.target.value)}
          />
        </div>
      </div>
      <div className="explorer-tools">
        <button onClick={() => setView(view === "grid" ? "list" : "grid")}>
          {view === "grid" ? <List size={15} /> : <LayoutGrid size={15} />}{" "}
          {view === "grid" ? "Detalhes" : "Ícones"}
        </button>
        <label>
          Ordenar por{" "}
          <select value={sort} onChange={(e) => setSort(e.target.value)}>
            <option value="name">Nome</option>
            <option value="type">Tipo</option>
          </select>
        </label>
        <span>{items.length} itens</span>
      </div>
      <div className="explorer-body">
        <aside className="explorer-nav">
          {[["Acesso rápido", null], ...folders.map((f) => [f, f])].map(
            ([n, f], i) => (
              <button
                key={i}
                className={activePath(n, filePath) ? "active" : ""}
                onClick={() =>
                  f &&
                  navigate(
                    f === "Este Computador"
                      ? ["Este Computador"]
                      : findVirtual(f),
                  )
                }
              >
                <Folder size={15} />
                {n}
              </button>
            ),
          )}
        </aside>
        <div
          className={`file-area ${view}`}
          onContextMenu={(e) => {
            e.preventDefault();
            if (selected) {
              let item = items.find((x) => x.name === selected);
              if (item) setFileMenu({ x: e.clientX, y: e.clientY, item });
            }
          }}
        >
          {items.length ? (
            items.map((item) => {
              const I = getIcon(item.type);
              return (
                <button
                  key={item.name}
                  className={`file-item ${selected === item.name ? "selected" : ""}`}
                  onClick={() => setSelected(item.name)}
                  onDoubleClick={() => openFile(item)}
                  onContextMenu={(e) => {
                    e.preventDefault();
                    setSelected(item.name);
                    setFileMenu({ x: e.clientX, y: e.clientY, item });
                  }}
                >
                  <span className={`file-icon ${item.type}`}>
                    <I size={view === "grid" ? 23 : 18} />
                  </span>
                  <span className="file-name">{item.name}</span>
                  {view === "list" && (
                    <small>
                      {item.type === "folder" ? "Pasta" : item.type}
                    </small>
                  )}
                </button>
              );
            })
          ) : (
            <div className="folder-empty">
              <FolderOpen size={30} />
              <b>Esta pasta está vazia</b>
              <span>Tente escolher outra localização.</span>
            </div>
          )}
        </div>
      </div>
      <footer className="explorer-status">
        {filePath.join(" › ")} <span>{items.length} itens</span>
      </footer>
    </div>
  );
}
function findVirtual(folder) {
  for (const [parent, children] of Object.entries(fileTree))
    if (children.some((c) => c.name === folder && c.type === "folder"))
      return [parent, folder];
  return ["Este Computador", folder];
}
function activePath(name, path) {
  return path.at(-1) === name;
}
