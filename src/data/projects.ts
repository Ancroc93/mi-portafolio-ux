export const projects = [
  {
    slug: "atlas-health",
    title: "Atlas Health",
    description:
      "Rediseño end-to-end para una app de salud con enfoque en accesibilidad y reducción de fricción en onboarding.",
    image:
      "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1200&auto=format&fit=crop",
    tags: ["UX Research", "Onboarding", "Accesibilidad"],
    video: "https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4",
    enableVideoPreview: true,
    caseStudyUrl: "https://example.com/atlas-health",
    blocks: [
      {
        type: "text",
        content:
          "Rediseño end-to-end para onboarding clínico. Objetivo: reducir fricción inicial, elevar confianza y cumplir AA en accesibilidad.",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?q=80&w=1200&auto=format&fit=crop",
        alt: "UI clínica",
      },
      {
        type: "list",
        items: [
          "Onboarding: -45% tiempo al primer goal",
          "Accesibilidad AA en flows críticos (contraste + focus visible)",
          "NPS +14 en primer uso; tasa de abandono -18%",
        ],
      },
      {
        type: "video",
        src: "https://storage.googleapis.com/coverr-main/mp4/Mt_Baker.mp4",
        poster:
          "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=1200&auto=format&fit=crop",
      },
      {
        type: "text",
        content:
          "Arquitectura: se definieron tres tracks (Paciente nuevo, Reingreso, Profesional) con estados claros y recuperación de sesión segura.",
      },
      {
        type: "list",
        items: [
          "Motion: microfeedback en inputs + estados de carga esquelética",
          "Seguro: pasos críticos con biometría opcional y resumen verificable",
          "Handoff: specs tokenizadas + variantes para iOS/Android y web",
        ],
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1582719478241-34df0a503c92?q=80&w=1200&auto=format&fit=crop",
        alt: "Flujo de onboarding accesible",
      },
      {
        type: "gif",
        src: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYnppZjJxN3o2ODk0cnR4cXMxdzE0bW5iazVibzRmbWEzM3RrdmJ1diZlcD12MV9naWZzX3NlYXJjaCZjdD1n/UqZ5Q8bLQLTKk/giphy.gif",
        alt: "Microinteracción de confirmación",
      },
    ],
  },
  {
    slug: "nexo-wallet",
    title: "Nexo Wallet",
    description:
      "Nueva arquitectura de información y flujos críticos para una billetera digital con más de 2M de usuarios.",
    image:
      "https://images.unsplash.com/photo-1483478550801-ceba5fe50e8e?q=80&w=1200&auto=format&fit=crop",
    tags: ["IA", "Fintech", "UX Strategy"],
    video: "https://storage.googleapis.com/coverr-main/mp4/Northern_Lights.mp4",
    enableVideoPreview: true,
    caseStudyUrl: "https://example.com/nexo-wallet",
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
        type: "list",
        items: [
          "Top-up +12% conversión",
          "Errores en retiros -22% (copias guiadas + confirmaciones diferidas)",
          "Sesiones reenganchadas +9% con notificaciones contextuales",
        ],
      },
      {
        type: "video",
        src: "https://storage.googleapis.com/coverr-main/mp4/Northern_Lights.mp4",
        poster:
          "https://images.unsplash.com/photo-1483478550801-ceba5fe50e8e?q=80&w=1200&auto=format&fit=crop",
      },
      {
        type: "text",
        content:
          "Arquitectura: IA explica riesgos y fees antes de confirmar; biometría opcional en flujos de alto valor; modo offline degradado.",
      },
      {
        type: "list",
        items: [
          "Playbooks de fraude integrados (alertas y pausas seguras)",
          "Handoff con tokens de componentes y specs para web + mobile",
          "Onboarding segmentado por nivel de riesgo y actividad previa",
        ],
      },
      {
        type: "gif",
        src: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExbmdxdTV2c3BuOTFzYWp2ZmNyZWIxamFkYWVsZHlxOXVudDE0bDZ0ayZlcD12MV9naWZzX3NlYXJjaCZjdD1n/qgQUggAC3Pfv687qPC/giphy.gif",
        alt: "Microinteracción de confirmación segura",
      },
    ],
  },
  {
    slug: "lumen-store",
    title: "Lumen Store",
    description:
      "Optimización de conversión en e-commerce con microinteracciones, testing y sistema modular.",
    image:
      "https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?q=80&w=1200&auto=format&fit=crop",
    tags: ["E-commerce", "Motion", "UI Systems"],
    video: "https://storage.googleapis.com/coverr-main/mp4/Footboys.mp4",
    enableVideoPreview: false,
    caseStudyUrl: "https://example.com/lumen-store",
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
      {
        type: "list",
        items: ["Checkout +8% conversión", "TTFB -0.5s en catálogo y PLP", "Sistema de cards reutilizable"],
      },
      {
        type: "text",
        content:
          "Motion aplicado a estados de stock, precios dinámicos y feedback de carrito. CMS-ready con bloques configurables.",
      },
      {
        type: "gif",
        src: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExdWhlaXNsZTY3bGZxM2o5eWZsb3VzMGdmYWd5ZnRuZWowdHV0cDdiZCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l0MYt5jPR6QX5pnqM/giphy.gif",
        alt: "Interacción de carrito",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1486591978090-58e619d37fe7?q=80&w=1200&auto=format&fit=crop",
        alt: "Landing promocional",
      },
    ],
  },
  {
    slug: "circulo-edu",
    title: "Círculo Edu",
    description:
      "Plataforma educativa con experiencias personalizadas, dashboards claros y contenidos escalables.",
    image:
      "https://images.unsplash.com/photo-1488190211105-8b0e65b80b4e?q=80&w=1200&auto=format&fit=crop",
    tags: ["EdTech", "UX Writing", "Prototipado"],
    video: "https://storage.googleapis.com/coverr-main/mp4/Volcano_Lake.mp4",
    enableVideoPreview: false,
    caseStudyUrl: "https://example.com/circulo-edu",
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
      {
        type: "list",
        items: ["Engagement +11%", "Dropout -7%", "Framework de contenidos escalable"],
      },
      {
        type: "text",
        content:
          "Experiencia multiplataforma con handoff unificado (tokens + design system). Alertas tempranas para riesgo de abandono.",
      },
      {
        type: "gif",
        src: "https://media.giphy.com/media/v1.Y2lkPTc5MGI3NjExYXFxeDNiMGg2a3hnN3pybGIwdGw2cW11enl6dzljcXRseGJ2bXFyNCZlcD12MV9naWZzX3NlYXJjaCZjdD1n/l3q2K5jinAlChoCLS/giphy.gif",
        alt: "Progreso gamificado",
      },
      {
        type: "image",
        src: "https://images.unsplash.com/photo-1509062522246-3755977927d7?q=80&w=1200&auto=format&fit=crop",
        alt: "Rutas personalizadas",
      },
    ],
  },
];
