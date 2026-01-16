import { Project } from '../types';

export const projects: Project[] = [
  {
    slug: "cdm-service-plan",
    title: "CDM: Construyendo Democracia",
    year: "2021",
    role: "Service Designer & Illustrator",
    featured: true,
    description:
      "Transformación estratégica de un podcast independiente en un ecosistema multimedia para la reconstrucción del tejido social.",
    image:
      "https://images.unsplash.com/photo-1504711434969-e33886168f5c?q=80&w=1200", // Hero Image
    tags: ["Service Design", "Strategy", "User Research"],
    video: "https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4",
    enableVideoPreview: true,
    caseStudyUrl: "https://www.behance.net/gallery/111219591/CDM-Service-Plan",
    metrics: [
      { label: "Community", value: "+200%" },
      { label: "Growth", value: "170 to 526" },
    ],
    blocks: [
      // 1. Context & Introduction
      {
        type: "text",
        title: "El crecimiento de un nuevo medio independiente",
        content:
          "Construyendo Democracia, Maestro es un medio independiente que, tras 11 meses de planeación, atravesó diferentes fases para estructurar y repensar sus objetivos.\n\nFase 1 (4 meses): Lanzamiento del podcast y evaluación de la recepción inicial por la comunidad.\n\nFase 2 (4 meses): Estructuración de procesos internos para evolucionar de podcast a medio multimedia con investigación seria. Reclutamiento de nuevos profesionales.\n\nFase 3: Lanzamiento del sitio web oficial y del MVP. Evaluación de la aceptación de clientes externos y dinámicas de trabajo internas.",
      },
      // 2. Image: Growth Chart
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?q=80&w=1200",
        alt: "Gráfico de Crecimiento: Evolución de audiencia por fases",
      },
      // 3. Text: About
      {
        type: "text",
        title: "Sobre el proyecto",
        content:
          "La plataforma nació de la necesidad de facilitar el entendimiento de fenómenos sociales y políticos en el contexto colombiano. Este medio busca generar un diálogo entre la comunidad y la administración pública a través de investigación y contenido pedagógico.",
      },
      // 4. Image: Visual Keywords
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1531403009284-440f080d1e12?q=80&w=1200",
        alt: "Conceptos Clave: Conocimiento, Comunidad, Multicanal",
      },
      // 5. Text: Audience
      {
        type: "text",
        title: "¿Quién es la audiencia?",
        content:
          "Clientes Aliados Potenciales: Personas entre 25-45 años, con alto interés en temas sociales/políticos, pertenecientes a organizaciones comunitarias.\n\nUsuario General: Personas entre 18-35 años buscando informarse de manera dinámica y diferente sobre el acontecer nacional.",
      },
      // 6. Image: User Persona
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?q=80&w=1200",
        alt: "User Persona: Carolina (Administradora Pública)",
      },
      // 7. Image: Process/Research
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1531498860502-7c67cf05f6fd?q=80&w=1200",
        alt: "Proceso de Investigación: Brainstorming y Sesiones de Trabajo",
      },
      // 8. Image: Service Insights
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1200",
        alt: "Insights del Servicio: Hallazgos clave",
      },
      // 9. Image: Service Blueprint
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1507925921958-8a62f3d1a50d?q=80&w=1200",
        alt: "Service Blueprint: Mapa detallado del servicio",
      },
      // 10. Image: User Journey
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1552664730-d307ca884978?q=80&w=1200",
        alt: "User Journey Map: Experiencia del usuario",
      },
      // 11. Image: Technical Flow
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=1200",
        alt: "Flujo Técnico: Antes, Durante y Después",
      },
      // 12. Image: Social Media Output
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1611162617474-5b21e879e113?q=80&w=1200",
        alt: "Resultados en Redes Sociales: Feed de Instagram",
      },
      // 13. Image: Visual System
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1561070791-2526d30994b5?q=80&w=1200",
        alt: "Sistema Visual: Paleta de colores y tipografía",
      },
    ],
  },
  {
    slug: "nexo-wallet",
    title: "Nexo Wallet",
    year: "2024",
    role: "Senior UX Designer",
    featured: true,
    description:
      "Nueva arquitectura de información y flujos críticos para una billetera digital con más de 2M de usuarios.",
    image:
      "https://images.unsplash.com/photo-1483478550801-ceba5fe50e8e?q=80&w=1200&auto=format&fit=crop",
    tags: ["IA", "Fintech", "UX Strategy"],
    video: "https://storage.googleapis.com/coverr-main/mp4/Northern_Lights.mp4",
    enableVideoPreview: true,
    caseStudyUrl: "https://example.com/nexo-wallet",
    metrics: [
      { label: "Conversion", value: "+12%" },
      { label: "Errors", value: "-22%" },
    ],
    blocks: [
      {
        type: "text",
        content:
          "Wallet multiactivos con capa de IA explicable. Meta: aumentar conversión en top-up y reducir fricción en movimientos críticos.",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1509099836639-18ba02e2e1ba?q=80&w=1200&auto=format&fit=crop",
        alt: "Wallet UI",
      },
      {
        type: "video",
        src: "https://storage.googleapis.com/coverr-main/mp4/Northern_Lights.mp4",
        poster:
          "https://images.unsplash.com/photo-1483478550801-ceba5fe50e8e?q=80&w=1200&auto=format&fit=crop",
      },
    ],
  },
  {
    slug: "lumen-store",
    title: "Lumen Store",
    year: "2023",
    role: "UI Engineer",
    featured: true,
    description:
      "Optimización de conversión en e-commerce con microinteracciones, testing y sistema modular.",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
    tags: ["E-commerce", "Motion", "UI Systems"],
    video: "https://storage.googleapis.com/coverr-main/mp4/Footboys.mp4",
    enableVideoPreview: false,
    caseStudyUrl: "https://example.com/lumen-store",
    metrics: [
      { label: "Checkout", value: "+8%" },
      { label: "Perf", value: "-0.5s" },
    ],
    blocks: [
      {
        type: "text",
        content:
          "E-commerce modular con énfasis en velocidad percibida y microinteracciones. Sistema de cards y layouts reutilizables.",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?q=80&w=1200&auto=format&fit=crop",
        alt: "Ecommerce UI",
      },
    ],
  },
  {
    slug: "circulo-edu",
    title: "Círculo Edu",
    year: "2023",
    role: "Product Designer",
    featured: true,
    description:
      "Plataforma educativa con experiencias personalizadas, dashboards claros y contenidos escalables.",
    image:
      "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?q=80&w=1200&auto=format&fit=crop",
    tags: ["EdTech", "UX Writing", "Prototipado"],
    video: "https://storage.googleapis.com/coverr-main/mp4/Volcano_Lake.mp4",
    enableVideoPreview: false,
    caseStudyUrl: "https://example.com/circulo-edu",
    metrics: [
      { label: "Engagement", value: "+11%" },
      { label: "Retention", value: "93%" },
    ],
    blocks: [
      {
        type: "text",
        content:
          "Plataforma EdTech con rutas personalizadas por nivel y objetivos. Dashboards claros para progreso y riesgos.",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1553877522-43269d4ea984?q=80&w=1200&auto=format&fit=crop",
        alt: "EdTech UI",
      },
    ],
  },
  // -- ARCHIVE / NON-FEATURED --
  {
    slug: "dash-analytics",
    title: "Dash Analytics Dashboard",
    year: "2022",
    role: "UI Designer",
    featured: false, // Goes to Archive
    description: "Internal dashboard for sales tracking.",
    tags: ["Dashboard", "SaaS"],
  },
  {
    slug: "alpha-branding",
    title: "Alpha Branding Kit",
    year: "2022",
    role: "Visual Designer",
    featured: false,
    description: "Brand identity system for a fintech startup.",
    tags: ["Branding", "Identity"],
  },
  {
    slug: "med-connect",
    title: "MedConnect App",
    year: "2021",
    role: "UX Researcher",
    featured: false,
    description: "Telemedicine MVP for remote areas.",
    tags: ["Mobile", "Health"],
  },
];
