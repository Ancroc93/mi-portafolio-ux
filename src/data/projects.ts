import { ContentBlock, Project } from "../types";

type Locale = "es" | "en";
type LocalizedString = Record<Locale, string>;
type LocalizedStringArray = Record<Locale, string[]>;
type LocalizedMetric = { label: LocalizedString; value: string };
type LocalizedContentBlock = Omit<ContentBlock, "title" | "content" | "alt" | "items"> & {
  title?: LocalizedString;
  content?: LocalizedString;
  alt?: LocalizedString;
  items?: LocalizedStringArray;
};
type LocalizedProject = Omit<
  Project,
  "title" | "description" | "role" | "tags" | "metrics" | "blocks"
> & {
  title: LocalizedString;
  description: LocalizedString;
  role: Record<Locale, string | string[]>;
  tags?: LocalizedStringArray;
  metrics?: LocalizedMetric[];
  blocks?: LocalizedContentBlock[];
};

const projectsData: LocalizedProject[] = [
  {
    slug: "cdm-service-plan",
    title: {
      es: "CDM: Construyendo Democracia",
      en: "CDM: Building Democracy",
    },
    year: "2021",
    role: {
      es: "Service Designer e Ilustrador",
      en: "Service Designer & Illustrator",
    },
    featured: true,
    description: {
      es: "Transformación estratégica de un podcast independiente en un ecosistema multimedia para la reconstrucción del tejido social.",
      en: "Strategic transformation of an independent podcast into a multimedia ecosystem to rebuild the social fabric.",
    },
    image: "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1200",
    tags: {
      es: ["Service Design", "Estrategia", "User Research"],
      en: ["Service Design", "Strategy", "User Research"],
    },
    video: "https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4",
    enableVideoPreview: true,
    caseStudyUrl: "https://www.behance.net/gallery/111219591/CDM-Service-Plan",
    metrics: [
      { label: { es: "Comunidad", en: "Community" }, value: "+200%" },
      { label: { es: "Crecimiento", en: "Growth" }, value: "170 to 526" },
    ],
    blocks: [
      {
        type: "text",
        title: {
          es: "El crecimiento de un nuevo medio independiente",
          en: "The growth of a new independent media outlet",
        },
        content: {
          es: "Construyendo Democracia, Maestro es un medio independiente que, tras 11 meses de planeación, atravesó diferentes fases para estructurar y repensar sus objetivos.\n\nFase 1 (4 meses): Lanzamiento del podcast y evaluación de la recepción inicial por la comunidad.\n\nFase 2 (4 meses): Estructuración de procesos internos para evolucionar de podcast a medio multimedia con investigación seria. Reclutamiento de nuevos profesionales.\n\nFase 3: Lanzamiento del sitio web oficial y del MVP. Evaluación de la aceptación de clientes externos y dinámicas de trabajo internas.",
          en: "Construyendo Democracia, Maestro is an independent media outlet that, after 11 months of planning, went through different phases to structure and rethink its goals.\n\nPhase 1 (4 months): Podcast launch and assessment of initial community reception.\n\nPhase 2 (4 months): Internal process structuring to evolve from podcast to a multimedia outlet with rigorous research. Recruitment of new professionals.\n\nPhase 3: Launch of the official website and MVP. Evaluation of acceptance by external clients and internal workflows.",
        },
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200",
        alt: {
          es: "Gráfico de crecimiento: evolución de audiencia por fases",
          en: "Growth chart: audience evolution by phase",
        },
      },
      {
        type: "text",
        title: {
          es: "Sobre el proyecto",
          en: "About the project",
        },
        content: {
          es: "La plataforma nació de la necesidad de facilitar el entendimiento de fenómenos sociales y políticos en el contexto colombiano. Este medio busca generar un diálogo entre la comunidad y la administración pública a través de investigación y contenido pedagógico.",
          en: "The platform was born from the need to make social and political phenomena in the Colombian context easier to understand. This outlet aims to create a dialogue between the community and public administration through research and educational content.",
        },
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1200",
        alt: {
          es: "Conceptos clave: conocimiento, comunidad, multicanal",
          en: "Key concepts: knowledge, community, multichannel",
        },
      },
      {
        type: "text",
        title: {
          es: "¿Quién es la audiencia?",
          en: "Who is the audience?",
        },
        content: {
          es: "Clientes Aliados Potenciales: Personas entre 25-45 años, con alto interés en temas sociales/políticos, pertenecientes a organizaciones comunitarias.\n\nUsuario General: Personas entre 18-35 años buscando informarse de manera dinámica y diferente sobre el acontecer nacional.",
          en: "Potential allied clients: People aged 25–45, with strong interest in social/political topics, belonging to community organizations.\n\nGeneral users: People aged 18–35 seeking to stay informed in a dynamic and distinctive way about national events.",
        },
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1200",
        alt: {
          es: "User persona: Carolina (Administradora Pública)",
          en: "User persona: Carolina (Public Administrator)",
        },
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1531498860502-7c67cf05f6fd?q=80&w=1200",
        alt: {
          es: "Proceso de investigación: brainstorming y sesiones de trabajo",
          en: "Research process: brainstorming and working sessions",
        },
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1200",
        alt: {
          es: "Insights del servicio: hallazgos clave",
          en: "Service insights: key findings",
        },
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?q=80&w=1200",
        alt: {
          es: "Service blueprint: mapa detallado del servicio",
          en: "Service blueprint: detailed service map",
        },
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200",
        alt: {
          es: "User journey map: experiencia del usuario",
          en: "User journey map: user experience",
        },
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200",
        alt: {
          es: "Flujo técnico: antes, durante y después",
          en: "Technical flow: before, during, and after",
        },
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1200",
        alt: {
          es: "Resultados en redes sociales: feed de Instagram",
          en: "Social media results: Instagram feed",
        },
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1200",
        alt: {
          es: "Sistema visual: paleta de colores y tipografía",
          en: "Visual system: color palette and typography",
        },
      },
    ],
  },
  {
    slug: "nexo-wallet",
    title: {
      es: "Nexo Wallet",
      en: "Nexo Wallet",
    },
    year: "2024",
    role: {
      es: "Senior UX Designer",
      en: "Senior UX Designer",
    },
    featured: true,
    description: {
      es: "Nueva arquitectura de información y flujos críticos para una billetera digital con más de 2M de usuarios.",
      en: "New information architecture and critical flows for a digital wallet with 2M+ users.",
    },
    image: "https://images.unsplash.com/photo-1483478550801-ceba5fe50e8e?q=80&w=1200&auto=format&fit=crop",
    tags: {
      es: ["IA", "Fintech", "UX Strategy"],
      en: ["AI", "Fintech", "UX Strategy"],
    },
    video: "https://storage.googleapis.com/coverr-main/mp4/Northern_Lights.mp4",
    enableVideoPreview: true,
    caseStudyUrl: "https://example.com/nexo-wallet",
    metrics: [
      { label: { es: "Conversión", en: "Conversion" }, value: "+12%" },
      { label: { es: "Errores", en: "Errors" }, value: "-22%" },
    ],
    blocks: [
      {
        type: "text",
        content: {
          es: "Wallet multiactivos con capa de IA explicable. Meta: aumentar conversión en top-up y reducir fricción en movimientos críticos.",
          en: "Multi-asset wallet with an explainable AI layer. Goal: increase top-up conversion and reduce friction on critical transactions.",
        },
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1509099836639-18ba02e2e1ba?q=80&w=1200&auto=format&fit=crop",
        alt: { es: "Wallet UI", en: "Wallet UI" },
      },
      {
        type: "video",
        src: "https://storage.googleapis.com/coverr-main/mp4/Northern_Lights.mp4",
        poster: "https://images.unsplash.com/photo-1483478550801-ceba5fe50e8e?q=80&w=1200&auto=format&fit=crop",
      },
    ],
  },
  {
    slug: "lumen-store",
    title: {
      es: "Lumen Store",
      en: "Lumen Store",
    },
    year: "2023",
    role: {
      es: "UI Engineer",
      en: "UI Engineer",
    },
    featured: true,
    description: {
      es: "Optimización de conversión en e-commerce con microinteracciones, testing y sistema modular.",
      en: "E-commerce conversion optimization with microinteractions, testing, and a modular system.",
    },
    image: "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
    tags: {
      es: ["E-commerce", "Motion", "Sistemas UI"],
      en: ["E-commerce", "Motion", "UI Systems"],
    },
    video: "https://storage.googleapis.com/coverr-main/mp4/Footboys.mp4",
    enableVideoPreview: false,
    caseStudyUrl: "https://example.com/lumen-store",
    metrics: [
      { label: { es: "Checkout", en: "Checkout" }, value: "+8%" },
      { label: { es: "Rendimiento", en: "Perf" }, value: "-0.5s" },
    ],
    blocks: [
      {
        type: "text",
        content: {
          es: "E-commerce modular con énfasis en velocidad percibida y microinteracciones. Sistema de cards y layouts reutilizables.",
          en: "Modular e-commerce focused on perceived speed and microinteractions. Reusable card and layout system.",
        },
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop",
        alt: { es: "Ecommerce UI", en: "Ecommerce UI" },
      },
    ],
  },
  {
    slug: "circulo-edu",
    title: {
      es: "Círculo Edu",
      en: "Círculo Edu",
    },
    year: "2023",
    role: {
      es: "Product Designer",
      en: "Product Designer",
    },
    featured: true,
    description: {
      es: "Plataforma educativa con experiencias personalizadas, dashboards claros y contenidos escalables.",
      en: "Educational platform with personalized experiences, clear dashboards, and scalable content.",
    },
    image: "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?q=80&w=1200&auto=format&fit=crop",
    tags: {
      es: ["EdTech", "UX Writing", "Prototipado"],
      en: ["EdTech", "UX Writing", "Prototyping"],
    },
    video: "https://storage.googleapis.com/coverr-main/mp4/Volcano_Lake.mp4",
    enableVideoPreview: false,
    caseStudyUrl: "https://example.com/circulo-edu",
    metrics: [
      { label: { es: "Engagement", en: "Engagement" }, value: "+11%" },
      { label: { es: "Retención", en: "Retention" }, value: "93%" },
    ],
    blocks: [
      {
        type: "text",
        content: {
          es: "Plataforma EdTech con rutas personalizadas por nivel y objetivos. Dashboards claros para progreso y riesgos.",
          en: "EdTech platform with personalized paths by level and goals. Clear dashboards for progress and risks.",
        },
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1200&auto=format&fit=crop",
        alt: { es: "EdTech UI", en: "EdTech UI" },
      },
    ],
  },
  {
    slug: "dash-analytics",
    title: {
      es: "Dashboard de Analítica Dash",
      en: "Dash Analytics Dashboard",
    },
    year: "2022",
    role: {
      es: "UI Designer",
      en: "UI Designer",
    },
    featured: false,
    description: {
      es: "Dashboard interno para seguimiento de ventas.",
      en: "Internal dashboard for sales tracking.",
    },
    tags: {
      es: ["Dashboard", "SaaS"],
      en: ["Dashboard", "SaaS"],
    },
  },
  {
    slug: "alpha-branding",
    title: {
      es: "Kit de Branding Alpha",
      en: "Alpha Branding Kit",
    },
    year: "2022",
    role: {
      es: "Visual Designer",
      en: "Visual Designer",
    },
    featured: false,
    description: {
      es: "Sistema de identidad para una startup fintech.",
      en: "Brand identity system for a fintech startup.",
    },
    tags: {
      es: ["Branding", "Identidad"],
      en: ["Branding", "Identity"],
    },
  },
  {
    slug: "med-connect",
    title: {
      es: "App MedConnect",
      en: "MedConnect App",
    },
    year: "2021",
    role: {
      es: "UX Researcher",
      en: "UX Researcher",
    },
    featured: false,
    description: {
      es: "MVP de telemedicina para zonas remotas.",
      en: "Telemedicine MVP for remote areas.",
    },
    tags: {
      es: ["Mobile", "Salud"],
      en: ["Mobile", "Health"],
    },
  },
];

const localizeBlock = (block: LocalizedContentBlock, locale: Locale): ContentBlock => ({
  ...block,
  title: block.title ? block.title[locale] : undefined,
  content: block.content ? block.content[locale] : undefined,
  alt: block.alt ? block.alt[locale] : undefined,
  items: block.items ? block.items[locale] : undefined,
});

const localizeProject = (project: LocalizedProject, locale: Locale): Project => ({
  ...project,
  title: project.title[locale],
  description: project.description[locale],
  role: project.role[locale],
  tags: project.tags ? project.tags[locale] : undefined,
  metrics: project.metrics?.map((metric) => ({
    label: metric.label[locale],
    value: metric.value,
  })),
  blocks: project.blocks?.map((block) => localizeBlock(block, locale)),
});

export const getProjects = (locale: Locale): Project[] =>
  projectsData.map((project) => localizeProject(project, locale));
