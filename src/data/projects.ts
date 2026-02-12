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
  caseStudy?: Omit<Project["caseStudy"], "challenge" | "solution" | "comparisonLabel"> & {
    challenge?: LocalizedString;
    solution?: LocalizedString;
    comparisonLabel?: { before: LocalizedString; after: LocalizedString };
  };
  blocks?: LocalizedContentBlock[];
};

const projectsData: LocalizedProject[] = [
  {
    slug: "registro-personas-juridicas",
    title: {
      es: "Registro de Personas Jurídicas en Mercado Pago",
      en: "Legal Entity Registration in Mercado Pago",
    },
    year: "2025",
    role: {
      es: "Sr. UX Designer",
      en: "Sr. UX Designer",
    },
    featured: true,
    description: {
      es: "Rediseñé la experiencia de registro para empresas en Mercado Pago, llevando la tasa de completitud del 46.87% al 62.37% y la conversión a compliance del 39.72% al 50.20%. Un proceso que antes tardaba 15 minutos, era confuso y expulsaba usuarios en pasos clave, hoy convierte más y mejor de forma sostenida.",
      en: "I redesigned the company registration experience in Mercado Pago, improving completion rate from 46.87% to 62.37% and compliance conversion from 39.72% to 50.20%. What used to take 15 minutes, felt confusing, and dropped users at key steps now converts better and more consistently.",
    },
    image: `${import.meta.env.BASE_URL}projects/Portada_Registro_MP.png`,
    tags: {
      es: ["FinTech", "UX Research", "Compliance"],
      en: ["FinTech", "UX Research", "Compliance"],
    },
    video: `${import.meta.env.BASE_URL}projects/registro-hero.m4v`,
    enableVideoPreview: true,
    metrics: [
      { label: { es: "Conversión", en: "Conversion" }, value: "+16%" },
      { label: { es: "PJ compliance", en: "PJ compliance" }, value: "+11%" },
    ],
    caseStudy: {
      heroImage: "https://images.unsplash.com/photo-1554224155-6726b3ff858f?q=80&w=2000",
      heroVideo: `${import.meta.env.BASE_URL}projects/registro-hero.m4v`,
      challenge: {
        es: "El registro de Personas Jurídicas en Argentina enfrentaba una barrera de entrada crítica: métricas de abandono alarmantes y un tiempo promedio de 15 minutos por sesión. El desafío era rediseñar la experiencia end-to-end para reducir la fricción operativa sin comprometer los estrictos requisitos legales y de seguridad de Mercado Pago.",
        en: "Legal entity registration in Argentina faced a critical entry barrier: alarming abandonment metrics and an average session time of 15 minutes per session. The challenge was to redesign the end-to-end experience to reduce operational friction without compromising Mercado Pago's strict legal and security requirements.",
      },
      solution: {
        es: "Trabajé codo a codo con el equipo de research en sesiones cualitativas y análisis cuantitativo. Mi foco: traducir lo que los usuarios decían y hacían en decisiones concretas de diseño — entender no solo dónde abandonaban, sino por qué\n\nEl insight clave: los usuarios no se iban por cansancio. Se iban porque no entendían qué se les pedía ni por qué. La carga cognitiva era el verdadero enemigo, no la cantidad de pasos.\n\nEsto cambió completamente la estrategia de diseño. El foco dejó de ser \"acortar el flujo\" y pasó a ser \"dar claridad en cada punto de contacto\".",
        en: "I worked closely with the research team through qualitative sessions and quantitative analysis. My focus was to translate what users said and did into concrete design decisions - understanding not only where they dropped off, but why.\n\nThe key insight: users were not leaving because of fatigue. They were leaving because they did not understand what was being asked of them or why. Cognitive load was the real enemy, not the number of steps.\n\nThis completely changed the design strategy. The focus shifted from \"shortening the flow\" to \"bringing clarity at every touchpoint\".",
      },
      challengeImages: [
        `${import.meta.env.BASE_URL}projects/pj-iteraciones.m4v`,
      ],
      galleryImages: [
        "https://images.unsplash.com/photo-1460925895917-afdab827c52f?q=80&w=1200",
        "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1200",
        "https://images.unsplash.com/photo-1551434678-e076c223a692?q=80&w=1200",
        "https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?q=80&w=1200",
        "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1200",
      ],
      accentColor: "#2D6AE0",
      nextProjectSlug: "plamp",
    },
    blocks: [
      {
        type: "text",
        title: {
          es: "Contexto del proyecto",
          en: "Project context",
        },
        content: {
          es: "Mercado Pago es la plataforma de pagos líder en Latinoamérica. El registro de personas jurídicas es un flujo crítico que conecta empresas con el ecosistema de cobros y pagos digitales. Sin embargo, la complejidad regulatoria de 9 países y la diversidad de tipos de entidades generaban una experiencia fragmentada y con alta tasa de abandono.",
          en: "Mercado Pago is the leading payments platform in Latin America. Legal entity registration is a critical flow that connects businesses with the digital payments ecosystem. However, the regulatory complexity across 9 countries and the diversity of entity types resulted in a fragmented experience with high abandonment rates.",
        },
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1450101499163-c8848c66ca85?q=80&w=1200",
        alt: {
          es: "Flujo de registro de personas jurídicas",
          en: "Legal entity registration flow",
        },
      },
      {
        type: "text",
        title: {
          es: "Investigación y hallazgos",
          en: "Research and findings",
        },
        content: {
          es: "Realizamos entrevistas con 40+ usuarios en 5 países, análisis heurístico del flujo existente y sesiones de co-creación con equipos de compliance. Los principales hallazgos fueron:\n\n1. Los usuarios no entendían qué documentación necesitaban antes de iniciar.\n2. La falta de un indicador de progreso generaba ansiedad y abandono.\n3. Los mensajes de error eran genéricos y no orientaban a la solución.\n4. El proceso no permitía guardar y retomar, obligando a reiniciar desde cero.",
          en: "We conducted interviews with 40+ users across 5 countries, heuristic analysis of the existing flow, and co-creation sessions with compliance teams. Key findings were:\n\n1. Users didn't understand what documentation they needed before starting.\n2. Lack of a progress indicator caused anxiety and abandonment.\n3. Error messages were generic and didn't guide toward resolution.\n4. The process didn't allow saving and resuming, forcing users to restart from scratch.",
        },
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1200",
        alt: {
          es: "Sesiones de investigación con usuarios",
          en: "User research sessions",
        },
      },
      {
        type: "list",
        items: {
          es: [
            "Conversión de registro: +16%",
            "PJ compliance: +11%",
            "Tickets de soporte relacionados: -55%",
            "Disponible en 9 países de LATAM",
          ],
          en: [
            "Registration conversion: +16%",
            "PJ compliance: +11%",
            "Related support tickets: -55%",
            "Available in 9 LATAM countries",
          ],
        },
      },
    ],
  },
  {
    slug: "plamp",
    title: {
      es: "PLAMP — Diseño social para la reconstrucción del tejido comunitario",
      en: "PLAMP — Social design for community rebuilding",
    },
    year: "2019",
    role: {
      es: "Diseñador de intervención física y co-creación",
      en: "Physical Intervention & Co-creation Designer",
    },
    featured: true,
    description: {
      es: "Diseñé la intervención física y las dinámicas de co-creación de un sistema comunitario de lavado que integra sensores de monitoreo de agua, un punto de información y un programa de apropiación social — en un municipio con 10.350 víctimas del conflicto armado. Más de 80 personas participaron activamente en comités de restauración del espacio público, 60 estudiantes se formaron en talleres de educación ambiental, y la comunidad redujo el consumo de agua sin sacrificar la dinámica social del espacio.",
      en: "I designed the physical intervention and co-creation dynamics for a community washing system integrating water monitoring sensors, an information hub, and a social appropriation program — in a municipality with 10,350 armed conflict victims. Over 80 people actively participated in public space restoration committees, 60 students were trained in environmental education workshops, and the community reduced water consumption without sacrificing the social dynamics of the space.",
    },
    image: `${import.meta.env.BASE_URL}projects/plamp-hero.png`,
    tags: {
      es: ["Diseño Social", "Co-creación", "IoT", "Intervención Comunitaria"],
      en: ["Social Design", "Co-creation", "IoT", "Community Intervention"],
    },
    metrics: [
      { label: { es: "Participación", en: "Participation" }, value: "+80" },
      { label: { es: "Formación", en: "Training" }, value: "60 est." },
    ],
    caseStudy: {
      heroImage: `${import.meta.env.BASE_URL}projects/plamp-hero.png`,
      heroVideo: `${import.meta.env.BASE_URL}projects/plamp-hero-video.mp4`,
      challenge: {
        es: "San Miguel, Putumayo. Sur de Colombia. Un municipio donde 6.541 personas fueron desplazadas y se registran 597 homicidios según la Unidad de Víctimas. Un territorio que durante los 90 vivió el boom de la coca, disputado entre el Frente 48 de las FARC y el Bloque Sur de las AUC.\n\nHoy, la comunidad está cambiando coca por cacao y caña. Está reparando su tejido social. Y en ese proceso, \"Los Lavaderos\" — una zona de lavado artesanal junto a una quebrada — era mucho más que un punto de servicio. Era un espacio de encuentro, de comunidad, de identidad.\n\nLa restricción principal: no podíamos llegar con tecnología a \"modernizar\" un espacio sin entender que para esta comunidad, ese lugar representaba algo mucho más profundo que lavar ropa. Cualquier intervención que rompiera esa dinámica social iba a fracasar.",
        en: "San Miguel, Putumayo. Southern Colombia. A municipality where 6,541 people were displaced and 597 homicides are recorded according to the Victims Unit. A territory that during the 90s experienced the coca boom, disputed between FARC's Front 48 and AUC's Southern Bloc.\n\nToday, the community is trading coca for cacao and sugarcane. They are repairing their social fabric. And in that process, \"Los Lavaderos\" — an artisanal washing area next to a creek — was much more than a service point. It was a meeting space, a community hub, an identity.\n\nThe main constraint: we couldn't arrive with technology to \"modernize\" a space without understanding that for this community, that place represented something much deeper than washing clothes. Any intervention that broke that social dynamic was going to fail.",
      },
      solution: {
        es: "La convocatoria de Colciencias planteaba un reto técnico: implementar tecnología para el uso responsable del agua. Pero al pisar el territorio y trabajar codo a codo con la comunidad — a través de entrevistas cualitativas, mapeos sociales, shadowing y recorridos de observación — descubrimos que los dolores reales eran otros:\n\nSeguridad: sin iluminación nocturna, el espacio se convertía en zona de actividades ilícitas. Accesibilidad: las personas mayores arriesgaban su integridad física en escaleras sin estándares mínimos. Salud: el contacto constante con el agua generaba problemas. Espacio de secado: no existía infraestructura para tender la ropa. Punto de encuentro: la comunidad necesitaba un lugar para reconstruir vínculos.\n\nLa tecnología no podía ser el protagonista. Tenía que ser invisible, al servicio de una comunidad que necesitaba primero recuperar la confianza en su propio espacio.",
        en: "The Colciencias call proposed a technical challenge: implementing technology for responsible water use. But once on the ground, working side by side with the community — through qualitative interviews, social mapping, shadowing, and observation walks — we discovered the real pain points were different:\n\nSafety: without nighttime lighting, the space became a zone for illicit activities. Accessibility: elderly people risked their physical safety on stairs lacking minimum standards. Health: constant contact with creek water caused health issues. Drying space: no infrastructure existed for hanging clothes. Meeting point: the community needed a space that went beyond washing — a place to rebuild bonds.\n\nTechnology could not be the protagonist. It had to be invisible, serving a community that first needed to regain trust in their own space.",
      },
      challengeImages: [
        `${import.meta.env.BASE_URL}projects/plamp-challenge-01.png`,
        `${import.meta.env.BASE_URL}projects/plamp-challenge-02.png`,
        `${import.meta.env.BASE_URL}projects/plamp-challenge-03.png`,
        `${import.meta.env.BASE_URL}projects/plamp-challenge-04.png`,
        `${import.meta.env.BASE_URL}projects/plamp-challenge-05.png`,
      ],
      accentColor: "#3B8A5A",
      nextProjectSlug: "registro-personas-juridicas",
    },
    blocks: [],
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
  caseStudy: project.caseStudy
    ? {
      ...project.caseStudy,
      challenge: project.caseStudy.challenge?.[locale],
      solution: project.caseStudy.solution?.[locale],
      comparisonLabel: project.caseStudy.comparisonLabel
        ? {
          before: project.caseStudy.comparisonLabel.before[locale],
          after: project.caseStudy.comparisonLabel.after[locale],
        }
        : undefined,
    }
    : undefined,
  blocks: project.blocks?.map((block) => localizeBlock(block, locale)),
});

export const getProjects = (locale: Locale): Project[] =>
  projectsData.map((project) => localizeProject(project, locale));
