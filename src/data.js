import {
  House,
  BriefcaseBusiness,
  UserRound,
  FileUser,
  Code2,
  Mail,
  Trash2,
  Settings,
  Monitor,
  FileText,
} from "lucide-react";

export const profile = {
  name: "Jaime Fernando Nhacumba",
  birthDate: "2004-01-05",
  role: "Programador freelancer e explicador",
  location: "Maputo, Moçambique",
  email: "jaimenhacumba@gmail.com",
  whatsapp: "+258847852208",
  github: "https://github.com/Jaimelxrd/MeuPortfolio",
  linkedin: "",
  otherProfiles: [],
  summary:
    "Estudante de Engenharia de Tecnologias e Sistemas de Informação, programador freelancer e explicador, com especial interesse em Engenharia de Software.",
  about:
    "Sou Jaime Fernando Nhacumba, estudante de Engenharia de Tecnologias e Sistemas de Informação na Universidade Joaquim Chissano, com especial interesse em Engenharia de Software. Atuo como programador freelancer, desenvolvendo soluções de software para diferentes necessidades e transformando ideias em projetos funcionais. Também sou apaixonado por matemática e trabalho como explicador de matemática, física e disciplinas técnicas relacionadas com programação e sistemas de informação.",
};

export const aboutSections = [
  {
    title: "Programação e desenvolvimento de software",
    description:
      "Trabalho como freelancer há vários anos, desenvolvendo projetos para outras pessoas e explorando ideias próprias. Procuro compreender cada problema, analisar as necessidades e criar soluções tecnológicas adequadas.",
  },
  {
    title: "Matemática e resolução de problemas",
    description:
      "A matemática é um dos meus principais interesses. Gosto de resolver exercícios, explorar métodos diferentes e compreender a lógica por detrás de cada problema. Essa prática também influencia a forma como analiso desafios de programação.",
  },
  {
    title: "Ensino e partilha de conhecimento",
    description:
      "Dou explicações a alunos do ensino secundário e superior. Apoio estudantes em matemática e física, bem como em análise matemática, bases de dados e programação em Java e Python. Ensinar ajuda-me a aprofundar conhecimentos e a explicar conceitos técnicos com clareza.",
  },
];

export const education = [
  {
    degree:
      "Licenciatura em Engenharia de Tecnologias e Sistemas de Informação",
    institution: "Universidade Joaquim Chissano",
    focus: "Engenharia de Software",
    status: "Em curso",
    description:
      "Formação orientada para tecnologias e sistemas de informação, com interesse em desenvolvimento de software, programação, bases de dados, análise de sistemas e conceção de soluções tecnológicas.",
  },
];

export const certificates = [
  {
    name: "Java Development",
    provider: "FIAP — Nano Course",
    workload: "60 horas",
    issued: "26 de setembro de 2026",
    validationUrl: "https://on.fiap.com.br/validar-certificado/",
    validationCode: "5EC3A1E4A72AAB9013D307E9FBB82D73",
    image: "",
  },
  {
    name: "Python Development",
    provider: "FIAP — Nano Course",
    workload: "80 horas",
    issued: "2 de julho de 2025",
    validationUrl:
      "https://on.fiap.com.br/local/nanocourses/validar-certificado",
    validationCode: "dcceb23e9181295d65a03f316e7cc48e",
    image: "",
  },
  {
    name: "Software Development",
    provider: "Power Learn Project",
    workload: "Programa de 16 semanas",
    issued: "",
    validationUrl:
      "https://academy.powerlearnprojectafrica.org/certificates?scholarship=76a52676-d442-41af-b6bd-69e1c3ecfa2b&certId=c5955d93-c705-4eb9-9002-bb4a941d60a3",
    validationCode: "c5955d93-c705-4eb9-9002-bb4a941d60a3",
    image: "",
  },
];

export const experience = [
  {
    role: "Programador Freelancer",
    description:
      "Desenvolvimento independente de projetos de software para diferentes necessidades, incluindo projetos solicitados por outras pessoas e iniciativas pessoais. Experiência prática na exploração de ideias, implementação de funcionalidades e utilização de diferentes tecnologias de desenvolvimento.",
    activities: [
      "Desenvolvimento de aplicações e soluções de software",
      "Implementação de funcionalidades de acordo com os requisitos dos projetos",
      "Trabalho com diferentes linguagens e tecnologias",
      "Desenvolvimento de projetos pessoais para aprendizagem e experimentação",
      "Exploração de APIs e serviços web",
      "Análise de problemas e procura de soluções técnicas",
    ],
  },
  {
    role: "Explicador e Tutor Académico",
    description:
      "Apoio estudantes do ensino secundário e superior na compreensão de conceitos científicos, matemáticos e tecnológicos, procurando desenvolver o raciocínio lógico, a capacidade de resolução de problemas e a compreensão prática das matérias.",
    activities: [
      "Matemática e física",
      "Análise matemática",
      "Bases de dados",
      "Programação Java e Python",
      "Outras disciplinas técnicas relacionadas com a minha formação e conhecimentos",
    ],
  },
];

export const projects = [
  {
    name: "Portfolio OS",
    type: "Aplicação Web",
    status: "Demonstração — substituir por projeto real",
    provisional: true,
    description:
      "Exemplo provisório de portfólio interativo que apresenta projetos e informações num ambiente de desktop virtual.",
    problem: "Conteúdo de demonstração; problema real a documentar.",
    solution: "Conteúdo de demonstração; solução real a documentar.",
    features: [
      "Interface de desktop",
      "Janelas interativas",
      "Pesquisa global",
    ],
    technologies: ["React", "JavaScript", "CSS", "Vite"],
    image:
      "https://images.unsplash.com/photo-1486946255434-2466348c2166?auto=format&fit=crop&w=800&q=80",
    sourceUrl: "",
    demoUrl: "",
  },
  {
    name: "Gestor de Tarefas",
    type: "Aplicação Java",
    status: "Exemplo provisório",
    provisional: true,
    description:
      "Exemplo provisório de uma aplicação para organizar tarefas e acompanhar o progresso de atividades.",
    problem: "Conteúdo de demonstração; problema real a documentar.",
    solution: "Conteúdo de demonstração; solução real a documentar.",
    features: [
      "Organização de tarefas",
      "Prioridades",
      "Acompanhamento de progresso",
    ],
    technologies: ["Java", "SQLite"],
    image:
      "https://images.unsplash.com/photo-1454165804606-c3d57bc86b40?auto=format&fit=crop&w=800&q=80",
    sourceUrl: "",
    demoUrl: "",
  },
  {
    name: "API de Catálogo",
    type: "APIs e Serviços",
    status: "Exemplo provisório",
    provisional: true,
    description:
      "Exemplo provisório de um serviço REST para gerir dados de um catálogo.",
    problem: "Conteúdo de demonstração; problema real a documentar.",
    solution: "Conteúdo de demonstração; solução real a documentar.",
    features: ["Operações de consulta", "Criação e atualização de registos"],
    technologies: ["Java", "REST", "SQL"],
    image:
      "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=800&q=80",
    sourceUrl: "",
    demoUrl: "",
  },
  {
    name: "Análise de Dados",
    type: "Projetos Python",
    status: "Exemplo provisório",
    provisional: true,
    description:
      "Exemplo provisório de análise e visualização de dados com um fluxo reproduzível.",
    problem: "Conteúdo de demonstração; problema real a documentar.",
    solution: "Conteúdo de demonstração; solução real a documentar.",
    features: ["Exploração de dados", "Visualização de resultados"],
    technologies: ["Python"],
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=800&q=80",
    sourceUrl: "",
    demoUrl: "",
  },
  {
    name: "Página de Produtos",
    type: "Aplicação Web",
    status: "Exemplo provisório",
    provisional: true,
    description:
      "Exemplo provisório de uma interface de catálogo com pesquisa e filtros.",
    problem: "Conteúdo de demonstração; problema real a documentar.",
    solution: "Conteúdo de demonstração; solução real a documentar.",
    features: ["Catálogo responsivo", "Pesquisa", "Filtros"],
    technologies: ["HTML5", "CSS3", "JavaScript"],
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=800&q=80",
    sourceUrl: "",
    demoUrl: "",
  },
  {
    name: "Projeto Académico",
    type: "Projetos Académicos",
    status: "Exemplo provisório",
    provisional: true,
    description:
      "Exemplo provisório de um projeto académico colaborativo. Substituir pelos detalhes de um projeto real.",
    problem: "Conteúdo de demonstração; problema real a documentar.",
    solution: "Conteúdo de demonstração; solução real a documentar.",
    features: ["Trabalho colaborativo", "Organização de funcionalidades"],
    technologies: ["Java", "UML"],
    image:
      "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&w=800&q=80",
    sourceUrl: "",
    demoUrl: "",
  },
];

export const skills = [
  {
    group: "Linguagens de programação",
    description: "Linguagens utilizadas no desenvolvimento de software.",
    items: ["Java", "Python", "PHP", "JavaScript"],
  },
  {
    group: "Desenvolvimento frontend",
    description: "Tecnologias para construir interfaces web.",
    items: ["HTML5", "CSS3", "JavaScript", "React"],
  },
  {
    group: "Desenvolvimento backend",
    description: "Desenvolvimento de aplicações e serviços web.",
    items: ["Spring Boot", "Django", "Aplicações backend", "APIs REST"],
  },
  {
    group: "Bases de dados",
    description: "Estruturação e utilização de dados relacionais.",
    items: ["Bases de dados relacionais", "Modelação de dados", "SQL"],
  },
  {
    group: "Inteligência Artificial",
    description: "Exploração e integração de serviços de IA.",
    items: [
      "Inteligência Artificial",
      "Integração de funcionalidades de IA",
      "APIs de IA",
    ],
  },
  {
    group: "Outras tecnologias",
    description: "Tecnologias adicionais de desenvolvimento.",
    items: ["Flex", "Git", "GitHub"],
  },
];

export const complementarySkills = [
  "Raciocínio lógico e analítico",
  "Resolução de problemas",
  "Pensamento matemático",
  "Aprendizagem autónoma",
  "Explicação e transmissão de conhecimentos",
  "Análise de requisitos e compreensão de necessidades",
  "Desenvolvimento de soluções tecnológicas",
];

export const interests = [
  "Matemática e resolução de exercícios",
  "Programação e desenvolvimento de software",
  "Criação de projetos pessoais",
  "Exploração de tecnologias e ferramentas de desenvolvimento",
  "Inteligência Artificial e integração de serviços",
  "Partilha de conhecimentos e apoio académico",
];

export const languages = [
  { name: "Português", level: "Fluente" },
  { name: "Inglês", level: "Razoável" },
];

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

const skillFolderItems = (group) =>
  skills
    .find((category) => category.group === group)
    .items.map((name) => ({ name: `${name}.txt`, type: "file" }));

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
      body: `Bem-vindo ao portfólio de ${profile.name}. Explore as aplicações para conhecer o seu percurso e trabalho.`,
    },
    { name: "Portfolio OS", type: "folder" },
  ],
  Documentos: [
    { name: "Sobre Mim", type: "folder" },
    { name: "Currículo", type: "folder" },
    { name: "Formação", type: "folder" },
    { name: "Certificados", type: "folder" },
  ],
  "Sobre Mim": [{ name: "Perfil.txt", type: "file", body: profile.about }],
  Currículo: [
    {
      name: "Experiência.txt",
      type: "file",
      body: experience
        .map((item) => `${item.role}\n${item.description}`)
        .join("\n\n"),
    },
  ],
  Formação: [
    {
      name: "Formação académica.txt",
      type: "file",
      body: education
        .map(
          (item) =>
            `${item.degree}\n${item.institution}\n${item.status}\n${item.description}`,
        )
        .join("\n\n"),
    },
  ],
  Certificados: certificates.map((certificate) => ({
    name: `${certificate.name}.txt`,
    type: "file",
    body: `${certificate.provider}\n${certificate.workload}\nEmitido em ${certificate.issued}\n\nValidar: ${certificate.validationUrl}\nCódigo de validação: ${certificate.validationCode}`,
  })),
  Projetos: [
    "Aplicações Web",
    "Aplicações Java",
    "Projetos Python",
    "APIs e Serviços",
    "Projetos Académicos",
  ].map((name) => ({ name, type: "folder" })),
  "Aplicações Web": projects
    .filter((project) => project.type === "Aplicação Web")
    .map((project) => ({
      name: `${project.name}.project`,
      type: "code",
      body: `${project.status}\n${project.description}`,
    })),
  "Aplicações Java": projects
    .filter((project) => project.type === "Aplicação Java")
    .map((project) => ({
      name: `${project.name}.project`,
      type: "code",
      body: `${project.status}\n${project.description}`,
    })),
  "Projetos Python": projects
    .filter((project) => project.type === "Projetos Python")
    .map((project) => ({
      name: `${project.name}.project`,
      type: "code",
      body: `${project.status}\n${project.description}`,
    })),
  "APIs e Serviços": projects
    .filter((project) => project.type === "APIs e Serviços")
    .map((project) => ({
      name: `${project.name}.project`,
      type: "code",
      body: `${project.status}\n${project.description}`,
    })),
  "Projetos Académicos": projects
    .filter((project) => project.type === "Projetos Académicos")
    .map((project) => ({
      name: `${project.name}.project`,
      type: "code",
      body: `${project.status}\n${project.description}`,
    })),
  Imagens: [
    { name: "Fotografias", type: "folder" },
    { name: "Wallpapers", type: "folder" },
  ],
  Fotografias: [],
  Wallpapers: wallpapers.map((wallpaper) => ({
    name: `${wallpaper.name}.jpg`,
    type: "image",
    body: wallpaper.url,
  })),
  Competências: [
    { name: "Linguagens de programação", type: "folder" },
    { name: "Desenvolvimento frontend", type: "folder" },
    { name: "Desenvolvimento backend", type: "folder" },
    { name: "Bases de dados", type: "folder" },
    { name: "Inteligência Artificial", type: "folder" },
    { name: "Outras tecnologias", type: "folder" },
  ],
  "Linguagens de programação": skillFolderItems("Linguagens de programação"),
  "Desenvolvimento frontend": skillFolderItems("Desenvolvimento frontend"),
  "Desenvolvimento backend": skillFolderItems("Desenvolvimento backend"),
  "Bases de dados": skillFolderItems("Bases de dados"),
  "Inteligência Artificial": skillFolderItems("Inteligência Artificial"),
  "Outras tecnologias": skillFolderItems("Outras tecnologias"),
  Contactos: [
    ...(profile.email
      ? [{ name: "Email.txt", type: "file", body: profile.email }]
      : []),
    ...(profile.whatsapp
      ? [
          {
            name: "WhatsApp.url",
            type: "link",
            body: `https://wa.me/${profile.whatsapp.replace(/\D/g, "")}`,
          },
        ]
      : []),
    ...(profile.github
      ? [{ name: "GitHub.url", type: "link", body: profile.github }]
      : []),
    ...(profile.linkedin
      ? [{ name: "LinkedIn.url", type: "link", body: profile.linkedin }]
      : []),
    ...profile.otherProfiles.map((item) => ({
      name: `${item.name}.url`,
      type: "link",
      body: item.url,
    })),
  ],
  Reciclagem: [
    {
      name: "lembrete-para-continuar.txt",
      type: "file",
      origin: "Desktop",
      body: "Mesmo um passo pequeno ainda é progresso. Continua a aprender, a praticar e a construir.",
    },
    {
      name: "nota-de-desanimo.txt",
      type: "file",
      origin: "Documentos",
      body: "Hoje parece que nada vai dar certo e que não sou capaz de terminar. Vou guardar esta nota como lembrança de um dia difícil, não como definição do meu futuro.",
    },
    {
      name: "ideia-que-ficou-pelo-caminho.txt",
      type: "file",
      origin: "Projetos",
      body: "Nem toda ideia precisa virar um projeto. Posso aprender com esta tentativa, descansar e voltar com uma abordagem diferente.",
    },
    {
      name: "frase-motivacional-antiga.txt",
      type: "file",
      origin: "Desktop",
      body: "Não preciso saber tudo para começar. Aprendo enquanto faço, erro, corrijo e tento outra vez.",
    },
  ],
};
