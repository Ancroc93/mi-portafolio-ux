import { CaseStudyData, ContentBlock, Project } from "../types";

type Locale = "es" | "en";
type LocalizedString = Record<Locale, string>;
type LocalizedStringArray = Record<Locale, string[]>;
interface ImportMetaEnv {
  readonly BASE_URL: string;
}
interface ImportMeta {
  readonly env: ImportMetaEnv;
}
type LocalizedMetric = { label: LocalizedString; value: string };
type LocalizedContentBlock = Omit<ContentBlock, "title" | "content" | "alt" | "items"> & {
  title?: LocalizedString;
  content?: LocalizedString;
  alt?: LocalizedString;
  items?: LocalizedStringArray;
};
type LocalizedCaseStudy = Omit<CaseStudyData, "challenge" | "solution" | "comparisonLabel"> & {
  challenge?: LocalizedString;
  solution?: LocalizedString;
  comparisonLabel?: { before: LocalizedString; after: LocalizedString };
};
type LocalizedProject = Omit<
  Project,
  "title" | "description" | "role" | "tags" | "metrics" | "blocks" | "location" | "caseStudy"
> & {
  title: LocalizedString;
  description: LocalizedString;
  location?: LocalizedString;
  role: Record<Locale, string | string[]>;
  tags?: LocalizedStringArray;
  metrics?: LocalizedMetric[];
  caseStudy?: LocalizedCaseStudy;
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
    location: {
      es: "Argentina",
      en: "Argentina",
    },
    role: {
      es: "Sr. UX Designer",
      en: "Sr. UX Designer",
    },
    featured: true,
    description: {
      es: "Rediseñé la experiencia de registro para empresas en Mercado Pago, llevando la tasa de completitud del 46 al 62% y la conversión a compliance del 39 al 50%.\n\nUn proceso que antes tardaba 15 minutos, era confuso y generaba drop en pasos clave, hoy genera una mayor y mejor conversión de forma sostenida.",
      en: "I redesigned the company registration experience in Mercado Pago, improving completion rate from 46% to 62% and compliance conversion from 39% to 50%.\n\nA process that used to take 15 minutes, was confusing and caused drop-offs at key steps, now drives higher and more consistent conversion.",
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
        es: "Trabajé con el equipo de research en sesiones cualitativas y análisis cuantitativo. Mi objetivo era entender no sólo dónde abandonaban el flujo, sino por qué y me enfoqué en traducir lo que los usuarios decían y hacían en decisiones concretas de diseño.\n\nEl insight clave: los usuarios no se iban por cansancio. Se iban porque no entendían qué se les pedía ni por qué. La carga cognitiva era el verdadero enemigo, no la cantidad de pasos.\n\nEsto cambió completamente la estrategia de diseño. El foco dejó de ser \"acortar el flujo\" y pasó a ser \"dar claridad en cada punto de contacto\".",
        en: "I worked with the research team through qualitative sessions and quantitative analysis. My goal was to understand not only where users dropped off, but why — and I focused on translating what users said and did into concrete design decisions.\n\nThe key insight: users were not leaving because of fatigue. They were leaving because they did not understand what was being asked of them or why. Cognitive load was the real enemy, not the number of steps.\n\nThis completely changed the design strategy. The focus shifted from \"shortening the flow\" to \"bringing clarity at every touchpoint\".",
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
      es: "Diseño social para la reconstrucción del tejido comunitario",
      en: "Social design for community fabric reconstruction",
    },
    year: "2019",
    location: {
      es: "Putumayo",
      en: "Putumayo",
    },
    role: {
      es: "Product & Service Designer",
      en: "Product & Service Designer",
    },
    featured: true,
    description: {
      es: "Diseñé diferentes experiencias comunitarias para apoyar la reconstrucción del tejido social de la población de la Dorada Putumayo.\n\nPor medio de un ecosistema de artefactos y herramientas de diseño comunitario se implementó un sistema de lavado que integra sensores de monitoreo de agua, un punto de información y un programa de apropiación social en un municipio con 10.350 víctimas del conflicto armado colombiano.",
      en: "I designed different community experiences to support the reconstruction of the social fabric in La Dorada, Putumayo.\n\nThrough an ecosystem of artifacts and community design tools, a washing system was implemented integrating water monitoring sensors, an information hub, and a social appropriation program in a municipality with 10,350 victims of the Colombian armed conflict.",
    },
    image: `${import.meta.env.BASE_URL}projects/plamp-next-preview.jpg`,
    tags: {
      es: ["Diseño Social", "Co-creación", "IoT", "Intervención Comunitaria"],
      en: ["Social Design", "Co-creation", "IoT", "Community Intervention"],
    },
    metrics: [
      { label: { es: "Participación", en: "Participation" }, value: "+80" },
      { label: { es: "Formación", en: "Training" }, value: "60 estudiantes" },
    ],
    caseStudy: {
      heroImage: `${import.meta.env.BASE_URL}projects/plamp-hero.png`,
      heroVideo: `${import.meta.env.BASE_URL}projects/plamp-hero-video.mp4`,
      challenge: {
        es: "El conflicto armado ha dejado más de 6.541 personas desplazadas y 597 homicidios en San Miguel Putumayo, un municipio ubicado en el sur de Colombia, marcado por el narcotráfico de los años 90.\n\nComo Product & Service Designer aporté a la reconstrucción del tejido social de esta comunidad por medio del Proyecto de Lavado Artesanal - Mi Pez, liderado por MinCiencias, Ideas para el Cambio y MinTIC, que consistía en la implementación de soluciones tecnológicas para la mejora de la zona de lavado comunitario, un espacio que más que un punto de servicio representaba encuentro e identidad para esta población.",
        en: "The armed conflict has left more than 6,541 displaced people and 597 homicides in San Miguel, Putumayo, a municipality in southern Colombia, marked by drug trafficking in the 1990s.\n\nAs a Product & Service Designer, I contributed to rebuilding the social fabric of this community through the Artisanal Washing Project - Mi Pez, led by MinCiencias, Ideas para el Cambio and MinTIC, which consisted of implementing technological solutions to improve the community washing area, a space that represented much more than a service point — it was a place of encounter and identity for this population.",
      },
      solution: {
        es: "El proyecto planteaba un reto técnico: implementar tecnología para el uso responsable del agua. Pero al llegar al territorio y trabajar con la comunidad (a través de entrevistas cualitativas, mapeos sociales, shadowing y recorridos de observación) descubrimos que los dolores reales eran otros:\n\n— Seguridad: sin iluminación nocturna, el espacio se convertía en zona de actividades ilícitas.\n\n— Accesibilidad: las personas mayores arriesgaban su integridad física en escaleras sin estándares mínimos.\n\n— Salud: el contacto constante con el agua generaba problemas de salud.\n\n— Espacio de secado: no existía infraestructura para tender la ropa.\n\n— Punto de encuentro: la comunidad necesitaba un lugar para reconstruir vínculos.\n\nLa tecnología no podía ser la protagonista, tenía que ser invisible y estar al servicio de una comunidad que necesitaba primero recuperar la confianza en su propio espacio.",
        en: "The project posed a technical challenge: implementing technology for responsible water use. But upon arriving on the ground and working with the community (through qualitative interviews, social mapping, shadowing, and observation walks) we discovered the real pain points were different:\n\n— Safety: without nighttime lighting, the space became a zone for illicit activities.\n\n— Accessibility: elderly people risked their physical safety on stairs lacking minimum standards.\n\n— Health: constant contact with water caused health problems.\n\n— Drying space: no infrastructure existed for hanging clothes.\n\n— Meeting point: the community needed a place to rebuild bonds.\n\nTechnology could not be the protagonist — it had to be invisible and serve a community that first needed to regain trust in their own space.",
      },
      challengeImages: [
        `${import.meta.env.BASE_URL}projects/plamp-challenge-01.png`,
        `${import.meta.env.BASE_URL}projects/plamp-challenge-02.png`,
        `${import.meta.env.BASE_URL}projects/plamp-challenge-03.png`,
        `${import.meta.env.BASE_URL}projects/plamp-challenge-04.png`,
        `${import.meta.env.BASE_URL}projects/plamp-challenge-05.png`,
      ],
      accentColor: "#3B8A5A",
      nextProjectSlug: "construyendo-democracia",
    },
    blocks: [],
  },
  {
    slug: "construyendo-democracia",
    title: {
      es: "Diseño de servicio para un medio digital independiente",
      en: "Service design for an independent digital media",
    },
    year: "2020",
    location: {
      es: "Colombia",
      en: "Colombia",
    },
    role: {
      es: "Service Designer & Ilustrador",
      en: "Service Designer & Illustrator",
    },
    featured: true,
    description: {
      es: "Diseñé la estrategia de servicio y el modelo de crecimiento de Construyendo Democracia, Maestro, un medio de comunicación digital independiente sobre el conflicto armado colombiano.\n\nA través del periodismo multimedia, este medio de comunicación busca contribuir a la reconstrucción del tejido social colombiano visibilizando las historias de las víctimas a través de reportajes estructurados narrados desde los protagonistas, sus territorios y sus procesos de resistencia.",
      en: "I designed the service strategy and growth model for Construyendo Democracia, Maestro — an independent digital media that contributes to rebuilding Colombia's social fabric through multimedia investigative journalism about the armed conflict. In 11 months, the project evolved from a podcast into a multimedia platform with structured investigations from three perspectives: space, protagonists, and resistance processes.",
    },
    image: `${import.meta.env.BASE_URL}projects/construyendo-democracia-next-preview.jpg`,
    tags: {
      es: ["Service Design", "Estrategia Digital", "Periodismo Multimedia", "Diseño Social"],
      en: ["Service Design", "Digital Strategy", "Multimedia Journalism", "Social Design"],
    },
    metrics: [
      { label: { es: "Evolución", en: "Evolution" }, value: "Podcast → Plataforma" },
      { label: { es: "Planificación", en: "Planning" }, value: "11 meses" },
    ],
    caseStudy: {
      heroImage: `${import.meta.env.BASE_URL}projects/construyendo-democracia-next-preview.jpg`,
      heroVideo: `${import.meta.env.BASE_URL}projects/construyendo-democracia-hero.mp4`,
      challenge: {
        es: "El conflicto armado colombiano ha roto el tejido social de las comunidades por más de 60 años. Muchos sobrevivientes han liderado y transitado procesos para la reconstrucción de memoria, paz y reconciliación que necesitan ser visibilizados, sin revictimizar ni afectar la integridad de las víctimas.\n\nSin embargo, los espacios tradicionales existentes para aportar a la visibilización de las luchas y procesos de las víctimas en Colombia para exigir derechos, verdad, justicia y no repetición no son suficientes.\n\nEn este contexto, dos tendencias abren una ventana de oportunidad:\n\n1. El auge del contenido digital \n2. La transformación en la forma en que el periodismo tradicional habla del conflicto armado colombiano\n\nAsí nace Construyendo Democracia, Maestro: una iniciativa que inició como un podcast y creció hasta convertirse en un medio digital independiente que contribuye a la reconstrucción del tejido social a través de investigaciones periodísticas estructuradas desde tres perspectivas: los protagonistas, sus territorios y sus procesos de resistencia. Todo a través de una narrativa multimedia.",
        en: "Colombia is going through a unique stage in its history. Four years after the signing of the peace agreements, acts of reconciliation and memory reconstruction are becoming increasingly known. However, the existing spaces to generate reflection and give voice to the victims of this long conflict are not enough.\n\nIt is difficult to find in traditional media verified information presented impartially that helps build the necessary bridges between the different actors involved in the conflict.\n\nIn this context, two trends open a window of opportunity:\n\n1. The rise of digital content\n2. The transformation in the way traditional journalism talks about the Colombian armed conflict\n\nThis is how Construyendo Democracia, Maestro was born: an initiative that grew into an independent digital media contributing to the reconstruction of the social fabric through research related to the Colombian armed conflict, from three main perspectives: space, protagonists, and resistance and reparation processes — all through multimedia narrative.",
      },
      solution: {
        es: "Construyendo Democracia, Maestro es un medio independiente que después de 11 meses de planificación atravesó diferentes fases que ayudaron a estructurar y replantear los objetivos.\n\nFase 1 — Validación (4 meses): Se lanza un podcast y se evalúa la recepción de la iniciativa por parte de la comunidad.\n\nFase 2 — Estructuración (4 meses): Se estructuran todos los procesos internos necesarios para que el medio evolucione de un podcast a un medio multimedia más completo, con una estructura de investigación seria y enfocada. Durante esta etapa se incorporan nuevos profesionales al equipo.\n\nFase 3 — MVP y rediseño del servicio: Comienza con la emisión inaugural del medio y el lanzamiento del sitio web oficial. En esta fase (donde ingreso como service designer e ilustrador) se realizan cambios estructurales en los flujos de trabajo y en el enfoque del concepto de servicio, además de explorar nuevas posibilidades para aumentar el impacto en redes sociales.\n\nEl hallazgo clave: CD,M es un producto de nicho. No podemos hacer cambios drásticos en el producto principal (periodismo investigativo), pero sí necesitamos innovar en otros aspectos del sistema — particularmente en redes sociales como herramienta primaria para entender la segmentación de usuarios.",
        en: "Construyendo Democracia, Maestro is an independent media that after 11 months of planning went through different phases that helped structure and rethink objectives.\n\nPhase 1 — Validation (4 months): A podcast is launched and the community's reception of the initiative is evaluated.\n\nPhase 2 — Structuring (4 months): All necessary internal processes are structured so the media can evolve from a podcast into a more complete multimedia outlet, with a serious and focused research structure. During this stage, new professionals are recruited.\n\nPhase 3 — MVP and service redesign: Begins with the media's inaugural broadcast and the launch of the official website. In this phase (where I enter as service designer and illustrator) structural changes are made to workflows and the service concept approach, while exploring new possibilities for increasing social media impact.\n\nThe key insight: CD,M is a niche product. We cannot make drastic changes to the main product (investigative journalism), but we need to innovate in other aspects of the system — particularly social media as a primary tool to understand user segmentation.",
      },
      accentColor: "#C44536",
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
  location: project.location?.[locale],
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
