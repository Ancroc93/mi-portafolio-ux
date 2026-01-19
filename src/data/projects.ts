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
    // Advanced Case Study Data
    caseStudy: {
      heroImage: "https://images.unsplash.com/photo-1557804506-669a67965ba0?q=80&w=2000",
      heroVideo: "https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4",
      challenge:
        "Construyendo Democracia, Maestro started as an independent podcast trying to make social and political phenomena in Colombia easier to understand. After 11 months of planning across 3 phases, the main challenge was to evolve from a simple podcast into a full multimedia outlet with serious research capabilities, while maintaining community trust and engagement.",
      solution:
        "We designed a strategic transformation through Service Design methodologies: defining clear user personas (allied clients aged 25-45 and general users 18-35), creating service blueprints and user journey maps, and building a scalable content system. The new platform facilitates dialogue between community and public administration through research-backed, pedagogical content.",
      challengeImages: [
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200",
        "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1200",
        "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1200",
      ],
      galleryImages: [
        "https://images.unsplash.com/photo-1531498860502-7c67cf05f6fd?q=80&w=1200",
        "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1200",
        "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?q=80&w=1200",
        "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200",
        "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200",
        "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1200",
        "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1200",
      ],
      accentColor: "#F59E0B", // Amber accent for social/community vibe
      nextProjectSlug: "nexo-wallet",
    },
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
    // Advanced Case Study Data
    caseStudy: {
      heroImage: "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=2000",
      heroVideo: "https://storage.googleapis.com/coverr-main/mp4/Northern_Lights.mp4",
      challenge:
        "With over 2 million users, Nexo Wallet's information architecture had become cluttered and confusing. Users experienced high error rates (-22%) during critical transactions, and conversion on top-ups was stagnant. Our challenge was to redesign the entire flow while maintaining trust and familiarity.",
      solution:
        "We implemented a card-based, AI-assisted navigation system that anticipates user needs. The new architecture reduces cognitive load by 40%, with clear visual hierarchy and contextual actions. AI explanations helped users understand complex operations, boosting confidence and completion rates by 12%.",
      challengeImages: [
        "https://images.unsplash.com/photo-1559526324-593bc073d938?q=80&w=1200",
        "https://images.unsplash.com/photo-1563986768609-322da13575f3?q=80&w=1200",
        "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200",
      ],
      beforeImage:
        "https://images.unsplash.com/photo-1611162616305-c69b3fa7fbe0?q=80&w=1400",
      afterImage:
        "https://images.unsplash.com/photo-1639762681485-074b7f938ba0?q=80&w=1400",
      comparisonLabel: { before: "Old Design", after: "New Design" },
      galleryImages: [
        "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=1200",
        "https://images.unsplash.com/photo-1509836639153-18ba02e2e1ba?q=80&w=1200",
        "https://images.unsplash.com/photo-1563986768494-4dee2763ff3f?q=80&w=1200",
        "https://images.unsplash.com/photo-1573164713988-8665fc963095?q=80&w=1200",
        "https://images.unsplash.com/photo-1551650975-87deedd944c3?q=80&w=1200",
      ],
      accentColor: "#4F46E5", // Indigo accent
      nextProjectSlug: "cdm-service-plan",
    },
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
