import {
  House,
  FolderOpen,
  BriefcaseBusiness,
  UserRound,
  FileUser,
  Code2,
  Mail,
  Trash2,
  Settings,
  Monitor,
  FileText,
  Image,
  GraduationCap,
} from "lucide-react";
export const profile = {
  name: "Jaime",
  role: "Programador em formação",
  location: "Moçambique",
  email: "jaime@example.com",
  github: "https://github.com/",
  linkedin: "https://linkedin.com/",
  about:
    "Sou um programador curioso, focado em criar experiências digitais úteis e bem construídas. Este espaço interativo apresenta o meu percurso, projetos e tecnologias.",
};
export const apps = [
  { id: "home", name: "Início", Icon: House, color: "#78a9ff" },
  { id: "computer", name: "Este Computador", Icon: Monitor, color: "#61c7c5" },
  {
    id: "projects",
    name: "Projetos",
    Icon: BriefcaseBusiness,
    color: "#e7b76c",
  },
  { id: "about", name: "Sobre Mim", Icon: UserRound, color: "#c39cf5" },
  { id: "resume", name: "Currículo", Icon: FileUser, color: "#7db4ff" },
  { id: "skills", name: "Competências", Icon: Code2, color: "#93d393" },
  { id: "contacts", name: "Contactos", Icon: Mail, color: "#f28f8f" },
  { id: "recycle", name: "Reciclagem", Icon: Trash2, color: "#aab5c5" },
  { id: "settings", name: "Definições", Icon: Settings, color: "#b9c7d9" },
];
export const projects = [
  {
    name: "Portfolio OS",
    type: "Aplicação Web",
    stack: "React · CSS · Vite",
    description:
      "Um portfólio interativo que transforma a exploração do meu trabalho numa experiência de desktop.",
    image:
      "https://images.unsplash.com/photo-1486946255434-2466348c2166?auto=format&fit=crop&w=800&q=80",
    url: "https://github.com/",
  },
  {
    name: "Gestor de Tarefas",
    type: "Aplicação Java",
    stack: "Java · OOP · SQLite",
    description:
      "Aplicação para organizar tarefas, prioridades e progresso de projetos pessoais.",
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
    url: "https://github.com/",
  },
  {
    name: "API de Catálogo",
    type: "APIs e Serviços",
    stack: "Java · REST · PostgreSQL",
    description:
      "Serviço REST demonstrativo para gerir um catálogo com operações CRUD.",
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
    url: "https://github.com/",
  },
  {
    name: "Análise de Dados",
    type: "Projetos Python",
    stack: "Python · Pandas · Matplotlib",
    description:
      "Exploração e visualização de dados com um fluxo de análise reproduzível.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    url: "https://github.com/",
  },
  {
    name: "Página de Produtos",
    type: "Aplicação Web",
    stack: "HTML · CSS · JavaScript",
    description:
      "Interface responsiva de catálogo com pesquisa, filtros e estados interativos.",
    image:
      "https://images.unsplash.com/photo-1460925895917-af dab827c52f?auto=format&fit=crop&w=800&q=80".replace(
        "af dab",
        "afd ab".replace(" ", ""),
      ),
    url: "https://github.com/",
  },
  {
    name: "Projeto Académico",
    type: "Projetos Académicos",
    stack: "Java · UML · Git",
    description:
      "Projeto colaborativo desenvolvido no contexto académico, com foco em arquitetura e trabalho em equipa.",
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
    url: "https://github.com/",
  },
];
export const skills = [
  {
    group: "Linguagens",
    items: ["Java", "JavaScript", "Python", "HTML", "CSS", "SQL"],
  },
  {
    group: "Frameworks e ferramentas",
    items: ["React", "Vite", "Git", "GitHub", "VS Code", "IntelliJ IDEA"],
  },
  {
    group: "Conceitos",
    items: [
      "Programação orientada a objetos",
      "Desenvolvimento web",
      "APIs REST",
      "Bases de dados",
    ],
  },
];
export const wallpapers = [
  {
    name: "Montanhas",
    url: "https://images.unsplash.com/photo-1470770841072-f978cf4d019e?auto=format&fit=crop&w=2200&q=85",
  },
  {
    name: "Costa",
    url: "https://images.unsplash.com/photo-1518837695005-2083093ee35b?auto=format&fit=crop&w=2200&q=85",
  },
  {
    name: "Floresta",
    url: "https://images.unsplash.com/photo-1448375240586-882707db888b?auto=format&fit=crop&w=2200&q=85",
  },
  {
    name: "Noite",
    url: "https://images.unsplash.com/photo-1519608487953-e999c86e7455?auto=format&fit=crop&w=2200&q=85",
  },
];
export const fileTree = {
  "Este Computador": [
    { name: "Desktop", type: "folder" },
    { name: "Documentos", type: "folder" },
    { name: "Projetos", type: "folder" },
    { name: "Imagens", type: "folder" },
    { name: "Competências", type: "folder" },
    { name: "Contactos", type: "folder" },
    { name: "Reciclagem", type: "folder" },
  ],
  Desktop: [
    {
      name: "Bem-vindo.txt",
      type: "file",
      body: "Bem-vindo ao meu portfólio! Explore as aplicações e conheça o meu trabalho.",
    },
    { name: "Portfolio OS", type: "folder" },
  ],
  Documentos: [
    { name: "Sobre Mim", type: "folder" },
    { name: "Currículo", type: "folder" },
    { name: "Certificados", type: "folder" },
    { name: "Formação", type: "folder" },
  ],
  "Sobre Mim": [{ name: "Perfil.txt", type: "file", body: profile.about }],
  Currículo: [
    {
      name: "Curriculo_Jaime.pdf",
      type: "pdf",
      body: "Currículo de demonstração. Substitua este conteúdo pelos seus dados.",
    },
  ],
  Certificados: [
    {
      name: "Certificado de demonstração.pdf",
      type: "pdf",
      body: "Adicione aqui os seus certificados.",
    },
  ],
  Formação: [
    {
      name: "Percurso.txt",
      type: "file",
      body: "Adicione aqui a sua formação académica e cursos.",
    },
  ],
  Projetos: [
    "Aplicações Web",
    "Aplicações Java",
    "Projetos Python",
    "APIs e Serviços",
    "Projetos Académicos",
  ].map((name) => ({ name, type: "folder" })),
  "Aplicações Web": projects
    .filter((x) => x.type === "Aplicação Web")
    .map((x) => ({
      name: x.name + ".project",
      type: "code",
      body: x.description,
    })),
  "Aplicações Java": projects
    .filter((x) => x.type === "Aplicação Java")
    .map((x) => ({
      name: x.name + ".project",
      type: "code",
      body: x.description,
    })),
  "Projetos Python": projects
    .filter((x) => x.type === "Projetos Python")
    .map((x) => ({
      name: x.name + ".project",
      type: "code",
      body: x.description,
    })),
  "APIs e Serviços": projects
    .filter((x) => x.type === "APIs e Serviços")
    .map((x) => ({
      name: x.name + ".project",
      type: "code",
      body: x.description,
    })),
  "Projetos Académicos": projects
    .filter((x) => x.type === "Projetos Académicos")
    .map((x) => ({
      name: x.name + ".project",
      type: "code",
      body: x.description,
    })),
  Imagens: [
    { name: "Fotografias", type: "folder" },
    { name: "Wallpapers", type: "folder" },
  ],
  Fotografias: [],
  Wallpapers: wallpapers.map((w) => ({
    name: w.name + ".jpg",
    type: "image",
    body: w.url,
  })),
  Competências: ["Linguagens de Programação", "Frameworks", "Ferramentas"].map(
    (name) => ({ name, type: "folder" }),
  ),
  "Linguagens de Programação": skills[0].items.map((name) => ({
    name: name + ".txt",
    type: "file",
    body: "Competência de demonstração.",
  })),
  Frameworks: skills[1].items
    .slice(0, 2)
    .map((name) => ({ name: name + ".txt", type: "file" })),
  Ferramentas: skills[1].items
    .slice(2)
    .map((name) => ({ name: name + ".txt", type: "file" })),
  Contactos: [
    { name: "Email.txt", type: "file", body: profile.email },
    { name: "GitHub.url", type: "link", body: profile.github },
    { name: "LinkedIn.url", type: "link", body: profile.linkedin },
  ],
  Reciclagem: [],
};
