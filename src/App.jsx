import React, { useEffect, useMemo, useRef, useState } from "react";
import {
  apps,
  profile,
  projects,
  skills,
  wallpapers,
  fileTree,
  aboutSections,
  education,
  experience,
  complementarySkills,
  interests,
  languages,
  certificates,
} from "./data.js";
import {
  Search,
  Wifi,
  Volume2,
  Battery,
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
  Monitor,
  Palette,
  RotateCcw,
  Download,
  Mail,
  MessageCircle,
  Github,
  Linkedin,
  Command,
  Settings,
  Trash2,
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
    [powerOptions, setPowerOptions] = useState(false),
    [query, setQuery] = useState(""),
    [context, setContext] = useState(null),
    [toast, setToast] = useState(""),
    [shutdownStage, setShutdownStage] = useState(null),
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
    searchRef = useRef(null),
    startButtonRef = useRef(null),
    startMenuRef = useRef(null);
  useEffect(() => {
    const t = setInterval(() => setTime(new Date()), 1000);
    return () => clearInterval(t);
  }, []);
  useEffect(() => {
    localStorage.setItem("portfolio-settings", JSON.stringify(settings));
  }, [settings]);
  useEffect(() => {
    const close = (event) => {
      if (!event.target.closest(".context-menu")) setContext(null);
      if (!event.target.closest(".file-context")) {
        setFileMenu(null);
      }
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
  useEffect(() => {
    if (!start) return;
    const closeStartOutside = (event) => {
      const target = event.target instanceof Element ? event.target : null;
      if (
        startMenuRef.current?.contains(target) ||
        startButtonRef.current?.contains(target) ||
        target?.closest(".task-search")
      ) return;
      setStart(false);
    };
    document.addEventListener("pointerdown", closeStartOutside);
    return () => document.removeEventListener("pointerdown", closeStartOutside);
  }, [start]);
  const say = (s) => {
    if (!settings.notifications) return;
    setToast(s);
    setTimeout(() => setToast(""), 2600);
  };
  const focus = (id) => {
    setActive(id);
    const ordered = [
      ...windows.filter((w) => w.id !== id).sort((a, b) => a.z - b.z),
      ...windows.filter((w) => w.id === id),
    ];
    setZ(ordered.length + 6);
    setWindows(
      ordered.map((w, index) => ({
        ...w,
        minimized: w.id === id ? false : w.minimized,
        z: index + 6,
      })),
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
    const nextZ = Math.max(5, ...windows.map((w) => w.z)) + 1;
    setZ(nextZ);
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
        z: nextZ,
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
      const projectSearchText = [
        p.name,
        p.description,
        p.type,
        ...p.technologies,
        ...p.features,
      ]
        .join(" ")
        .toLowerCase();
      if (projectSearchText.includes(q))
        out.push({
          name: p.name,
          type: "Projeto",
          desc: p.technologies.join(" · "),
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
    skills.forEach((category) => {
      category.items.forEach((skill) => {
        if (`${skill} ${category.group}`.toLowerCase().includes(q))
          out.push({
            name: skill,
            type: "Competência",
            desc: category.group,
            act: () => open("skills"),
          });
      });
    });
    education.forEach((item) => {
      if (
        `${item.degree} ${item.institution} ${item.focus}`
          .toLowerCase()
          .includes(q)
      )
        out.push({
          name: item.degree,
          type: "Formação",
          desc: item.institution,
          act: () => open("resume"),
        });
    });
    experience.forEach((item) => {
      if (
        `${item.role} ${item.description} ${item.activities.join(" ")}`
          .toLowerCase()
          .includes(q)
      )
        out.push({
          name: item.role,
          type: "Experiência",
          desc: item.description,
          act: () => open("resume"),
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
        return <Home open={open} />;
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
        return <Resume />;
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
  const toggleMenu = () => {
    setStart((v) => !v);
    setContext(null);
  };
  const shutdown = () => {
    setStart(false);
    setPowerOptions(false);
    setShutdownStage("processing");
    window.setTimeout(() => {
      setShutdownStage("farewell");
      window.setTimeout(() => {
        if (window.history.length > 1) window.history.back();
        else setShutdownStage(null);
      }, 1800);
    }, 1100);
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
            ref={startButtonRef}
            className={`task-start ${start ? "on" : ""}`}
            onClick={toggleMenu}
            aria-label="Iniciar"
            aria-expanded={start}
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
        <div ref={startMenuRef} className="start-menu">
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
            <span className="profile-avatar">JN</span>
            <b>{profile.name}</b>
            <button title="Definições" onClick={() => open("settings")}>
              <Settings size={17} />
            </button>
            <button
              title="Opções de energia"
              aria-label="Opções de energia"
              aria-expanded={powerOptions}
              onClick={() => setPowerOptions((open) => !open)}
            >
              <Power size={17} />
            </button>
          </footer>
          {powerOptions && (
            <div className="power-options">
              <button onClick={shutdown}>
                <Power size={15} /> Sair
              </button>
              <button onClick={() => window.location.reload()}>
                <RotateCcw size={15} /> Recarregar
              </button>
            </div>
          )}
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
          <button
            onClick={() => {
              openFile(fileMenu.item);
              setFileMenu(null);
            }}
          >
            Abrir
          </button>
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
      {shutdownStage && (
        <div className="shutdown-screen" role="status" aria-live="polite">
          {shutdownStage === "processing" ? (
            <>
              <span className="shutdown-spinner" aria-hidden="true" />
              <h2>Processando…</h2>
              <p>Encerrando a visita</p>
            </>
          ) : (
            <>
              <div className="farewell-character" aria-hidden="true">
                <span className="farewell-head" />
                <span className="farewell-body" />
                <span className="farewell-arm" />
                <span className="farewell-leg farewell-leg-left" />
                <span className="farewell-leg farewell-leg-right" />
                <span className="farewell-ground" />
              </div>
              <h2>Até logo!</h2>
              <p>Obrigado pela visita. Foi um prazer receber você!</p>
            </>
          )}
        </div>
      )}
    </div>
  );
}

function Home({ open }) {
  return (
    <div className="home-app">
      <div className="welcome-panel">
        <span className="eyebrow">PORTFÓLIO PESSOAL</span>
        <h1>
          Olá, eu sou {profile.name}
          <span>.</span>
        </h1>
        <p>{profile.summary}</p>
        <div className="welcome-actions">
          <button className="primary" onClick={() => open("projects")}>
            Explorar projetos <ArrowRight size={16} />
          </button>
          <button className="quiet" onClick={() => open("about")}>
            Conhecer o meu percurso
          </button>
        </div>
        <div className="welcome-meta">
          <span>{profile.role}</span>
          <span>{profile.location}</span>
        </div>
      </div>
      <div className="home-bottom">
        <div
          className="home-card feature-card"
          onClick={() => open("projects")}
        >
          <div className="card-heading">
            <span>
              {projects[0].provisional ? "EXEMPLO PROVISÓRIO" : "EM DESTAQUE"}
            </span>
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
              {p.sourceUrl && (
                <a
                  href={p.sourceUrl}
                  target="_blank"
                  rel="noreferrer"
                  aria-label={`Ver código de ${p.name}`}
                >
                  <Github size={17} />
                </a>
              )}
            </div>
            <div className="project-info">
              <small>{p.type}</small>
              <span className="project-status">
                {p.provisional ? "Conteúdo provisório" : p.status}
              </span>
              <h3>{p.name}</h3>
              <p>{p.description}</p>
              <div className="tag-row">
                {p.technologies.map((t) => (
                  <span key={t}>{t}</span>
                ))}
              </div>
              <details className="project-details">
                <summary>Detalhes do projeto</summary>
                <p>
                  <b>Problema:</b> {p.problem}
                </p>
                <p>
                  <b>Solução:</b> {p.solution}
                </p>
                <ul>
                  {p.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
                {p.demoUrl && (
                  <a href={p.demoUrl} target="_blank" rel="noreferrer">
                    Demonstração <ExternalLink size={13} />
                  </a>
                )}
              </details>
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
        <div className="portrait">JN</div>
        <div>
          <span className="eyebrow">UM POUCO SOBRE MIM</span>
          <h2>
            {profile.name} <span className="muted">— {profile.role}</span>
          </h2>
          <p className="location-line">
            {profile.location} <span>·</span> {education[0].institution}
          </p>
        </div>
      </div>
      <div className="about-copy">
        <h3>Olá, mundo.</h3>
        <p>{profile.summary}</p>
        <section className="about-section">
          <h4>Percurso académico</h4>
          <p>
            <b>{education[0].degree}</b> · {education[0].institution}. Formação
            em curso, com foco de interesse em{" "}
            {education[0].focus.toLowerCase()}.
          </p>
        </section>
        {aboutSections.map((section) => (
          <section className="about-section" key={section.title}>
            <h4>{section.title}</h4>
            <p>{section.description}</p>
          </section>
        ))}
        <section className="about-interests">
          <h4>Interesses</h4>
          <div className="tag-row">
            {interests.map((item) => (
              <span key={item}>{item}</span>
            ))}
          </div>
        </section>
        <section className="about-certificates">
          <div className="section-heading">
            <div>
              <span className="eyebrow">FORMAÇÃO COMPLEMENTAR</span>
              <h4>Certificados</h4>
            </div>
            <span className="count-pill">{certificates.length}</span>
          </div>
          <div className="certificate-grid">
            {certificates.map((certificate) => (
              <article className="certificate-card" key={certificate.name}>
                {certificate.image ? (
                  <img
                    className="certificate-image"
                    src={certificate.image}
                    alt={`Certificado ${certificate.name} emitido por ${certificate.provider}`}
                  />
                ) : (
                  <div className="certificate-mark">
                    {certificate.provider === "Power Learn Project"
                      ? "PLP"
                      : certificate.provider.split(" ")[0]}
                    <span>
                      {certificate.provider.startsWith("FIAP")
                        ? "NANO COURSE"
                        : "POWER LEARN PROJECT"}
                    </span>
                  </div>
                )}
                <span className="certificate-kind">
                  CERTIFICADO DE CONCLUSÃO
                </span>
                <h5>{certificate.name}</h5>
                <p>
                  {certificate.provider} · {certificate.workload}
                </p>
                {certificate.issued && <p>Emitido em {certificate.issued}</p>}
                <code className="certificate-code">
                  {certificate.validationCode}
                </code>
                <div className="certificate-actions">
                  <a
                    href={certificate.validationUrl}
                    target="_blank"
                    rel="noreferrer"
                  >
                    Validar certificado <ExternalLink size={13} />
                  </a>
                  <button
                    onClick={() => {
                      navigator.clipboard?.writeText(
                        certificate.validationCode,
                      );
                    }}
                  >
                    <Copy size={13} /> Copiar código
                  </button>
                </div>
              </article>
            ))}
          </div>
          <p className="certificate-note">
            Confirma cada certificado na página oficial da respetiva instituição.</p>
        </section>
      </div>
    </div>
  );
}
function Resume() {
  return (
    <div className="app-scroll resume-app">
      <div className="resume-head">
        <div>
          <span className="eyebrow">DOCUMENTO PROFISSIONAL</span>
          <h2>Currículo</h2>
          <p>
            {profile.name} · {profile.role} · {profile.location}
          </p>
        </div>
        <button className="primary" onClick={() => window.print()}>
          <Download size={16} /> Imprimir currículo
        </button>
      </div>
      <div className="resume-columns">
        <section>
          <h3>Experiência profissional</h3>
          <div className="timeline">
            {experience.map((item) => (
              <div key={item.role}>
                <span>ATIVIDADE PROFISSIONAL</span>
                <h4>{item.role}</h4>
                <p>{item.description}</p>
                <ul>
                  {item.activities.map((activity) => (
                    <li key={activity}>{activity}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>
        <section>
          <h3>Formação académica</h3>
          <div className="timeline">
            {education.map((item) => (
              <div key={item.degree}>
                <span>{item.status.toUpperCase()}</span>
                <h4>{item.degree}</h4>
                <p>
                  <b>{item.institution}</b>
                </p>
                <p>Área de interesse: {item.focus}</p>
                <p>{item.description}</p>
              </div>
            ))}
          </div>
          <h3 className="resume-subhead">Idiomas</h3>
          {languages.map((language) => (
            <p className="language-line" key={language.name}>
              {language.name}
              <span>{language.level}</span>
            </p>
          ))}
          <h3 className="resume-subhead">Certificações</h3>
          <ul className="resume-certificates">
            {certificates.map((certificate) => (
              <li key={certificate.name}>
                <b>{certificate.name}</b> — {certificate.workload},{" "}
                {certificate.issued && `${certificate.issued}. `}
                <a
                  href={certificate.validationUrl}
                  target="_blank"
                  rel="noreferrer"
                >
                  Validar
                </a>
              </li>
            ))}
          </ul>
          <h3 className="resume-subhead">Competências técnicas</h3>
          <div className="resume-skills">
            {skills.map((category) => (
              <p key={category.group}>
                <b>{category.group}:</b> {category.items.join(", ")}
              </p>
            ))}
          </div>
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
              <p>{g.description}</p>
              <div className="skill-tags">
                {g.items.map((s) => (
                  <span key={s}>{s}</span>
                ))}
              </div>
            </div>
          </section>
        ))}
      </div>
      <section className="complementary-skills">
        <h3>Competências complementares</h3>
        <div className="tag-row">
          {complementarySkills.map((item) => (
            <span key={item}>{item}</span>
          ))}
        </div>
      </section>
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
          {profile.email && profile.whatsapp
            ? "Tem um projeto em mente ou quer trocar ideias? Contacte-me por email ou WhatsApp."
            : profile.email
              ? "Tem um projeto em mente ou quer trocar ideias? Escreva-me por email."
              : profile.whatsapp
                ? "Tem um projeto em mente ou quer trocar ideias? Envie-me uma mensagem no WhatsApp."
                : "Os canais de contacto serão adicionados assim que estiverem configurados."}
        </p>
        {profile.email && (
          <a className="primary" href={`mailto:${profile.email}`}>
            <Mail size={17} /> Escrever um email <ArrowRight size={15} />
          </a>
        )}
        {profile.whatsapp && (
          <a
            className="primary"
            href={`https://wa.me/${profile.whatsapp.replace(/\D/g, "")}`}
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle size={17} /> WhatsApp <ArrowRight size={15} />
          </a>
        )}
      </div>
      <div className="contact-links">
        {profile.email && (
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
        )}
        {profile.whatsapp && (
          <a
            href={`https://wa.me/${profile.whatsapp.replace(/\D/g, "")}`}
            target="_blank"
            rel="noreferrer"
          >
            <MessageCircle size={18} />
            <span>
              <small>CONTACTO DIRETO</small>
              <b>{profile.whatsapp}</b>
            </span>
            <ExternalLink size={15} />
          </a>
        )}
        {profile.github && (
          <a href={profile.github} target="_blank" rel="noreferrer">
            <Github size={18} />
            <span>
              <small>CODE & PROJETOS</small>
              <b>GitHub · Jaimelxrd</b>
            </span>
            <ExternalLink size={15} />
          </a>
        )}
        {profile.linkedin && (
          <a href={profile.linkedin} target="_blank" rel="noreferrer">
            <Linkedin size={18} />
            <span>
              <small>REDE PROFISSIONAL</small>
              <b>LinkedIn</b>
            </span>
            <ExternalLink size={15} />
          </a>
        )}
        {profile.otherProfiles.map((item) => (
          <a href={item.url} target="_blank" rel="noreferrer" key={item.name}>
            <ExternalLink size={18} />
            <span>
              <small>PERFIL PROFISSIONAL</small>
              <b>{item.name}</b>
            </span>
            <ExternalLink size={15} />
          </a>
        ))}
      </div>
      {!profile.email &&
        !profile.whatsapp &&
        !profile.github &&
        !profile.linkedin &&
        !profile.otherProfiles.length && (
          <p className="contact-empty">
            Os canais profissionais serão apresentados assim que forem
            configurados.
          </p>
        )}
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
          <span className="profile-avatar">JN</span>
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
            <div className="recycle-item" key={`${item.name}-${i}`}>
              <FileText size={18} />
              <span>
                <b>{item.name}</b>
                <small>Local original: {item.origin || "Desconhecido"}</small>
                {item.body && <p>{item.body}</p>}
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
