import { useEffect, useMemo } from "react";
import { useParams, Link } from "react-router-dom";
import { getProjects } from "../data/projects";
import Navbar from "../components/ui/Navbar";
import Footer from "../components/ui/Footer";
import { H2, Paragraph } from "../components/ui/Typography";
import Badge from "../components/ui/Badge";
import { motion } from "framer-motion";
import { useI18n } from "../i18n";

// New Case Study Components
import HeroParallax from "../components/project/HeroParallax";
import MetadataGrid from "../components/project/MetadataGrid";
import ChallengeSolution from "../components/project/ChallengeSolution";
import NextProjectFooter from "../components/project/NextProjectFooter";
import SolutionDetail from "../components/project/SolutionDetail";
import FlowVisualization from "../components/project/FlowVisualization";
import ResultsSection from "../components/project/ResultsSection";
import SpotlightCollage from "../components/project/SpotlightCollage";
import ProjectCredits from "../components/project/ProjectCredits";
import TakeawaysSection from "../components/project/TakeawaysSection";
import JourneyTimeline from "../components/project/JourneyTimeline";
import EcosystemExplorer from "../components/project/EcosystemExplorer";
import ServiceBlueprintBoard from "../components/project/ServiceBlueprintBoard";

const emphasizeSubstring = (text, substring, className = "font-semibold") => {
  if (typeof text !== "string" || !substring) return text;
  const idx = text.indexOf(substring);
  if (idx === -1) return text;
  const before = text.slice(0, idx);
  const after = text.slice(idx + substring.length);
  return (
    <>
      {before}
      <strong className={className}>{substring}</strong>
      {after}
    </>
  );
};

const renderBlock = (block, idx) => {
  if (block.type === "text") {
    return (
      <div key={idx} className="flex flex-col gap-6 py-8 max-w-4xl">
        {block.title && <h2 className="text-3xl md:text-4xl font-bold text-primary tracking-tight">{block.title}</h2>}
        {block.content.split("\n\n").map((paragraph, i) => (
          <p key={i} className="text-lg md:text-xl text-secondary leading-relaxed font-light">
            {paragraph}
          </p>
        ))}
      </div>
    );
  }
  if (block.type === "list") {
    return (
      <div key={idx} className="py-6 max-w-4xl">
        <ul className="list-disc list-inside space-y-3 text-lg text-secondary font-light">
          {block.items.map((item) => (
            <li key={item} className="pl-2">{item}</li>
          ))}
        </ul>
      </div>
    );
  }
  if (block.type === "image" || block.type === "gif") {
    return (
      <div key={idx} className="py-8 w-full">
        <div className="overflow-hidden rounded-3xl border border-white/5 bg-surface/30 shadow-2xl">
          <img
            src={block.src}
            alt={block.alt || "Media"}
            className="w-full h-auto object-cover"
            loading="lazy"
          />
        </div>
      </div>
    );
  }
  if (block.type === "video") {
    return (
      <div key={idx} className="py-8 w-full">
        <div className="overflow-hidden rounded-3xl border border-white/5 bg-surface/30 shadow-2xl">
          {block.embed ? (
            <iframe
              src={block.src}
              title={block.alt || "Video"}
              className="h-[500px] w-full"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              loading="lazy"
            />
          ) : (
            <video
              className="w-full h-auto"
              src={block.src}
              poster={block.poster}
              controls
              playsInline
              muted
              loop
            />
          )}
        </div>
      </div>
    );
  }
  return null;
};

const ProjectPage = () => {
  const { slug } = useParams();
  const { t, locale } = useI18n();
  const projects = useMemo(() => getProjects(locale), [locale]);
  useEffect(() => {
    window.scrollTo({ top: 0, left: 0, behavior: "auto" });
  }, [slug]);
  const project = useMemo(
    () =>
      projects.find((p) => {
        const projectId = p.slug ?? p.title;
        return projectId === slug;
      }),
    [slug, projects]
  );

  if (!project) {
    return (
      <div className="min-h-screen bg-background text-primary flex items-center justify-center">
        <div className="text-center">
          <p className="text-sm uppercase tracking-[0.3em] text-secondary font-mono">404</p>
          <H2 className="mt-2 text-primary">{t("project.notFound")}</H2>
          <Link
            className="mt-6 inline-flex items-center justify-center rounded-full border border-white/10 bg-white/5 px-6 py-2 text-sm font-mono text-primary hover:bg-white/10 transition-colors"
            to="/"
          >
            {t("project.goHome")}
          </Link>
        </div>
      </div>
    );
  }

  // Check if this is an advanced case study
  const hasCaseStudy = !!project.caseStudy;
  const nextProject = project.caseStudy?.nextProjectSlug
    ? projects.find((p) => p.slug === project.caseStudy.nextProjectSlug)
    : null;

  // For advanced case studies, render the new template
  if (hasCaseStudy) {
    let heroSubtitle = project.description;
    if (project.slug === "registro-personas-juridicas") {
      heroSubtitle = locale === "es"
        ? (<>
            <p>Rediseñé la experiencia de registro para empresas en Mercado Pago, <strong className="font-semibold">llevando la tasa de completitud del 46 al 62% y la conversión a compliance del 39 al 50%.</strong></p>
            <p>Un proceso que antes tardaba 15 minutos, era confuso y generaba drop en pasos clave, hoy genera una mayor y mejor conversión de forma sostenida.</p>
          </>)
        : (<>
            <p>I redesigned the company registration experience in Mercado Pago, <strong className="font-semibold">improving completion rate from 46% to 62% and compliance conversion from 39% to 50%.</strong></p>
            <p>A process that used to take 15 minutes, was confusing and caused drop-offs at key steps, now drives higher and more consistent conversion.</p>
          </>);
    } else if (project.slug === "plamp") {
      heroSubtitle = locale === "es"
        ? emphasizeSubstring(
            project.description,
            "un sistema de lavado que integra sensores de monitoreo de agua, un punto de información y un programa de apropiación social en un municipio con 10.350 víctimas del conflicto armado colombiano.",
            "font-semibold"
          )
        : emphasizeSubstring(
            project.description,
            "a washing system was implemented integrating water monitoring sensors, an information hub, and a social appropriation program in a municipality with 10,350 victims of the Colombian armed conflict.",
            "font-semibold"
          );
    } else if (project.slug === "construyendo-democracia") {
      heroSubtitle = locale === "es"
        ? emphasizeSubstring(
            project.description,
            "En 11 meses, el proyecto evolucionó de un podcast a una plataforma multimedia con investigaciones estructuradas desde tres perspectivas: el espacio, los protagonistas y los procesos de resistencia.",
            "font-semibold"
          )
        : emphasizeSubstring(
            project.description,
            "In 11 months, the project evolved from a podcast into a multimedia platform with structured investigations from three perspectives: space, protagonists, and resistance processes.",
            "font-semibold"
          );
    }

    let solutionComment;
    if (project.slug === "registro-personas-juridicas") {
      solutionComment = locale === "es"
        ? "Creíamos que el problema era un flujo largo. Los datos mostraron que el problema era un flujo confuso."
        : "We thought the problem was a long flow. Data showed the real problem was a confusing flow.";
    } else if (project.slug === "plamp") {
      solutionComment = locale === "es"
        ? "Creíamos que el problema era optimizar el uso de agua. Al llegar al territorio descubrimos que el verdadero desafío era reconstruir confianza."
        : "We thought the problem was optimizing water usage. When we arrived on the ground, we discovered the real challenge was rebuilding trust.";
    } else if (project.slug === "construyendo-democracia") {
      solutionComment = locale === "es"
        ? "Creíamos que el desafío era crear contenido. El verdadero desafío era diseñar un sistema que nos permitiera entender a quién le hablábamos."
        : "We thought the challenge was creating content. The real challenge was designing a system that would help us understand who we were talking to.";
    }

    let solutionDetailData = null;
    let journeyBlueprintData = null;
    let serviceBlueprintData = null;
    if (project.slug === "registro-personas-juridicas") {
      solutionDetailData = {
        title: locale === "es" ? "La solución" : "The Solution",
        blocks: locale === "es"
          ? [
            {
              subtitle: "Primero la narrativa, después la interfaz",
              content: "Antes de tocar un solo componente, construí una historia de contenido completa: prototipos de texto, testeo de mensajes y escenarios. Esto me dio las bases para que a través de herramientas de UI y de copy se contara una historia sin ruido.",
            },
            {
              subtitle: "Iteraciones rápidas, decisiones con datos",
              content: "Generé +50 versiones de flujo, revisadas colaborativamente con producto y tecnología, cumpliendo de forma definitiva los pedidos regulatorios para operar en el país.",
            },
            {
              subtitle: "Ciclos completos de iteración en 3 días",
              content: "Diseñar → estresar → testear → aprender → Iterar. Cada decisión de diseño estuvo respaldada por benchmarks cross-industry y datos de comportamiento real.\n\nIntegré inteligencia artificial en puntos estratégicos del flujo con un objetivo concreto: que el sistema hiciera el trabajo pesado, no el usuario. Por ejemplo, a partir de un solo número de CUIT, el flujo auto-completaba razón social, domicilio legal y datos del negocio — eliminando pasos manuales y reduciendo errores.",
            },
            {
              subtitle: "Arquitectura modular y escalable",
              content: "Diseñé el flujo con una arquitectura que permite escalar a otros mercados y tipos de persona jurídica sin rediseñar desde cero.",
            },
          ]
          : [
            {
              subtitle: "Narrative first, interface second",
              content: "Before touching a single component, I built a complete content story: text prototypes, message testing, and scenarios. This gave me the foundation so that UI and copy could tell each other a coherent story without noise.",
            },
            {
              subtitle: "Fast iterations, data-driven decisions",
              content: "I generated 50+ flow versions, collaboratively reviewed with product and engineering, definitively meeting the regulatory requirements to operate in the country.",
            },
            {
              subtitle: "Full iteration cycles in 3 days",
              content: "Design → stress-test → test → learn → Iterate. Every design decision was backed by cross-industry benchmarks and real behavioral data.\n\nI integrated artificial intelligence at strategic points in the flow with one clear goal: let the system do the heavy lifting, not the user. For example, from a single tax ID number, the flow auto-filled company name, legal address, and business data — eliminating manual steps and reducing errors.",
            },
            {
              subtitle: "Modular and scalable architecture",
              content: "I designed the flow with an architecture that allows scaling to other markets and legal entity types without redesigning from scratch.",
            },
          ],
      };
    } else if (project.slug === "plamp") {
      solutionDetailData = {
        title: locale === "es" ? "La resolución" : "The Resolution",
        blocks: locale === "es"
          ? [
            {
              subtitle: "Diseño con la comunidad, no para la comunidad",
              content: "Diseñé las dinámicas de co-creación usando modelado físico progresivo — desde maquetas de baja fidelidad hasta modelos de alta resolución — siempre socializados y evaluados con la comunidad en comités abiertos. Cada decisión de diseño fue tomada colectivamente, generando sentido de pertenencia antes de que se colocara un solo ladrillo.",
            },
            {
              subtitle: "De los hallazgos a una intervención multimodal",
              content: "Construí un User Journey Map que contrastó los pain points de las entrevistas con los touchpoints reales del espacio. Esto me permitió diseñar una solución que operaba en múltiples capas:\n\nCapa física: rediseño del espacio con iluminación, escaleras seguras, zona de secado y área de encuentro — resolviendo los 5 dolores identificados en investigación.\n\nCapa tecnológica: sistema de sensores de flujo y control de agua que alimenta un punto de información físico — dándole a la comunidad datos para tomar sus propias decisiones sobre el uso del recurso hídrico.\n\nCapa social: talleres de educación ambiental para 60 estudiantes y programa de apropiación del espacio a través de comités comunitarios.",
            },
            {
              subtitle: "Iteraciones rápidas en contexto extremo",
              content: "Cada iteración de diseño se resolvió in situ, con recursos locales y maestros constructores de la zona. No era un sprint en una oficina — era co-diseño en un territorio de conflicto, donde la velocidad de ejecución dependía de la confianza construida con la comunidad.",
            },
          ]
          : [
            {
              subtitle: "Design with the community, not for the community",
              content: "I designed the co-creation dynamics using progressive physical modeling — from low-fidelity mockups to high-resolution models — always socialized and evaluated with the community in open committees. Every design decision was made collectively, generating a sense of ownership before a single brick was laid.",
            },
            {
              subtitle: "From findings to a multimodal intervention",
              content: "I built a User Journey Map that contrasted interview pain points with the actual touchpoints of the space. This allowed me to design a solution that operated on multiple layers:\n\nPhysical layer: redesign of the space with lighting, safe stairs, drying area, and meeting point — solving the 5 pain points identified in research.\n\nTechnology layer: flow sensors and water control system feeding a physical information hub — giving the community data to make their own decisions about water resource usage.\n\nSocial layer: environmental education workshops for 60 students and a space appropriation program through community committees.",
            },
            {
              subtitle: "Fast iterations in extreme context",
              content: "Every design iteration was resolved on-site, with local resources and builders from the area. This wasn't a sprint in an office — it was co-design in a conflict territory, where execution speed depended on the trust built with the community.",
            },
          ],
      };
    } else if (project.slug === "construyendo-democracia") {
      journeyBlueprintData = locale === "es"
        ? {
          subtitle: "User Journey Map y Service Blueprint",
          content: "Diseñamos una adaptación del User Journey Map y un Service Blueprint para identificar los puntos más críticos del servicio en relación con la interacción con los usuarios. Esto nos permitió identificar los momentos que requieren más trabajo del equipo y los puntos de contacto en cada etapa de la experiencia.\n\nCon estas herramientas, fue más fácil proponer modificaciones al servicio entendiendo el valor real que estos cambios tendrían para nuestros usuarios.",
        }
        : {
          subtitle: "User Journey Map & Service Blueprint",
          content: "We designed an adaptation of the User Journey Map and a Service Blueprint to identify the most critical points of our service regarding user interaction. This helped us identify the moments that require the most work from our team and the interaction touchpoints at each stage of the experience.\n\nWith these tools, it became easier to propose service modifications while understanding the real value these changes would have for our users.",
        };

      serviceBlueprintData = locale === "es"
        ? {
          title: "Service Blueprint",
          subtitle: "Modelamos los momentos críticos del servicio para visualizar la experiencia del usuario y las operaciones internas que la sostienen.",
          labels: {
            moments: "Momentos",
            touchpoints: "Touch points",
            backstage: "Backstage",
            frontstage: "Frontstage",
          },
          phases: [
            { label: "Antes de usar el servicio", span: 3 },
            { label: "Durante el uso del servicio", span: 7 },
            { label: "Después de usar el servicio", span: 3 },
          ],
          moments: [
            {
              label: "Descubrimiento del producto",
              touchpoints: ["Voz a voz", "Orgánico", "Anuncios en redes"],
              backstage: ["Voz a voz", "Orgánico", "Social media advertising", "Articulación de aliados"],
            },
            {
              label: "Primer contacto con la marca",
              touchpoints: ["Post en redes", "Escucha de podcast"],
              backstage: ["Social media post", "Podcast listening", "Web published research", "Instagram lives"],
            },
            {
              label: "Sigue a CD,M en redes",
              touchpoints: ["Seguir perfiles", "Interacciones iniciales"],
              backstage: ["Follow on podcast platforms", "Follow on social media"],
            },
            {
              label: "Lee investigación principal",
              touchpoints: ["Sección Coordenadas", "Sección Gritos"],
              backstage: ["Edición y fact-checking", "Diseño editorial web"],
            },
            {
              label: "Consume contenido complementario",
              touchpoints: ["Post en redes", "Escucha podcast"],
              backstage: ["Repurposing multimedia", "Curaduría temática"],
            },
            {
              label: "Interactúa en redes",
              touchpoints: ["Lives en Instagram", "Comentarios y DMs"],
              backstage: ["Moderación", "Analítica de engagement"],
            },
            {
              label: "Podcast y eventos",
              touchpoints: ["Podcast mensual", "Evento especial"],
              backstage: ["Producción audiovisual", "Coordinación de invitados"],
            },
            {
              label: "Foro",
              touchpoints: ["Formulario de registro", "Confirmación mail"],
              backstage: ["Automatización de registro", "Soporte de acceso"],
            },
            {
              label: "Registro",
              touchpoints: ["Acceso a sala virtual", "Encuesta final"],
              backstage: ["Base de datos de audiencia", "Segmentación por afinidad"],
            },
            {
              label: "Comunicación uno a uno",
              touchpoints: ["Post personalizado", "Sección web relacionada"],
              backstage: ["CRM editorial", "Planificación de recorridos de contenido"],
            },
            {
              label: "Compra de merchandising",
              touchpoints: ["Tienda web", "Checkout"],
              backstage: ["Gestión de catálogo", "Operación logística"],
            },
            {
              label: "Donaciones",
              touchpoints: ["Página de aportes", "Pasarela de pago"],
              backstage: ["Reporte financiero", "Seguimiento de aportantes"],
            },
            {
              label: "Se activa en CD,M",
              touchpoints: ["Sitio web", "E-mail"],
              backstage: ["Programa de fidelización", "Nuevos ciclos de contenido"],
            },
          ],
        }
        : {
          title: "Service Blueprint",
          subtitle: "We mapped the most critical service moments to visualize user experience and the internal operations that sustain it.",
          labels: {
            moments: "Moments",
            touchpoints: "Touch points",
            backstage: "Backstage",
            frontstage: "Frontstage",
          },
          phases: [
            { label: "Before using the service", span: 3 },
            { label: "During service use", span: 7 },
            { label: "After using the service", span: 3 },
          ],
          moments: [
            {
              label: "Product discovery",
              touchpoints: ["Word of mouth", "Organic channels", "Social ads"],
              backstage: ["Word of mouth", "Organic", "Social media advertising", "External allies"],
            },
            {
              label: "First contact with the brand",
              touchpoints: ["Social post", "Podcast listening"],
              backstage: ["Social media post", "Podcast listening", "Web published research", "Instagram lives"],
            },
            {
              label: "Follows CD,M on social media",
              touchpoints: ["Follow profiles", "Initial interactions"],
              backstage: ["Follow on podcast platforms", "Follow on social media"],
            },
            {
              label: "Reads core research",
              touchpoints: ["Coordenadas section", "Gritos section"],
              backstage: ["Editing and fact-checking", "Web editorial design"],
            },
            {
              label: "Consumes complementary content",
              touchpoints: ["Social posts", "Podcast listening"],
              backstage: ["Multimedia repurposing", "Topic curation"],
            },
            {
              label: "Interacts on social media",
              touchpoints: ["Instagram lives", "Comments and DMs"],
              backstage: ["Moderation", "Engagement analytics"],
            },
            {
              label: "Podcast and events",
              touchpoints: ["Monthly podcast", "Special event"],
              backstage: ["AV production", "Guest coordination"],
            },
            {
              label: "Forum",
              touchpoints: ["Registration form", "Mail confirmation"],
              backstage: ["Registration automation", "Access support"],
            },
            {
              label: "Registration",
              touchpoints: ["Virtual room access", "Final survey"],
              backstage: ["Audience database", "Affinity segmentation"],
            },
            {
              label: "One-to-one communication",
              touchpoints: ["Personalized post", "Related web section"],
              backstage: ["Editorial CRM", "Content journey planning"],
            },
            {
              label: "Merchandising purchase",
              touchpoints: ["Web store", "Checkout"],
              backstage: ["Catalog management", "Logistics operation"],
            },
            {
              label: "Donations",
              touchpoints: ["Contributions page", "Payment gateway"],
              backstage: ["Financial reporting", "Donor follow-up"],
            },
            {
              label: "Activates in CD,M",
              touchpoints: ["Website", "E-mail"],
              backstage: ["Loyalty program", "New content cycles"],
            },
          ],
        };

      solutionDetailData = {
        title: locale === "es" ? "Concepto de diseño y prototipo de servicio" : "Design Concept & Service Prototype",
        blocks: locale === "es"
          ? [
            {
              subtitle: "Definición del arquetipo de usuario",
              content: "Tomamos los datos demográficos recolectados durante la planificación del medio a través de entrevistas y encuestas, y los contrastamos con los datos de redes sociales durante la fase MVP. Esto nos permitió estructurar un perfil de user persona que sirvió como base para definir dos conceptos fundamentales para la planificación del sistema.",
            },
            {
              subtitle: "Propuesta de valor y mapa de concepto",
              content: "Una vez definido el arquetipo de usuario, creamos un mapa que nos permitió visualizar la propuesta de valor de CD,M. Estructuramos la información recolectada durante las dos primeras fases del proyecto para identificar oportunidades de innovación sin alterar el producto principal.",
            },
            {
              subtitle: "Prototipo de microservicio",
              content: "Propusimos un nuevo microservicio basado en tres pilares:\n\n01. Reuniones virtuales con expertos invitados sobre temas específicos, recolectando datos de los asistentes.\n\n02. Base de datos estructurada para organizar la información según las afinidades de los usuarios.\n\n03. Campañas publicitarias segmentadas usando herramientas de redes sociales para identificar los grupos de usuarios con mayor respuesta — optimizando la inversión en publicidad en fases posteriores.",
            },
          ]
          : [
            {
              subtitle: "User archetype definition",
              content: "We took the demographic data collected during the media planning stage through interviews and surveys, and compared it with social media data during our MVP phase. This allowed us to structure a user persona profile that served as the basis for defining two fundamental concepts for the system's planning.",
            },
            {
              subtitle: "Value proposition and concept map",
              content: "Once our user archetype was defined, we created a map that allowed us to visualize CD,M's value proposition. We structured the information collected during the first two phases of the project to identify innovation opportunities without altering the core product.",
            },
            {
              subtitle: "Microservice prototype",
              content: "We proposed a new microservice based on three pillars:\n\n01. Virtual meetings with expert guests on specific topics, collecting data from attendees.\n\n02. A structured database to organize information according to user affinities.\n\n03. Segmented advertising campaigns using social media tools to identify user groups with the highest response — optimizing advertising investment in later phases.",
            },
          ],
      };
    }

    let resultsData = null;
    if (project.slug === "registro-personas-juridicas") {
      resultsData = locale === "es"
        ? {
          title: "Resultados",
          headers: {
            metric: "Métrica",
            before: "Antes",
            after: "Después",
            delta: "Δ Delta",
          },
          rows: [
            { metric: "Tasa de completitud (Registro)", before: "Base", after: "Post-rediseño", delta: "+16% ↗" },
            { metric: "PJ compliance", before: "Base", after: "Post-rediseño", delta: "+11% ↗" },
          ],
          evolutionTitle: "Evolución sostenida",
          introLead: "La mejora no fue un pico aislado.",
          introStrong: "Los datos muestran una tendencia de crecimiento sostenido basada en claridad y reducción de carga cognitiva,",
          introTail: " validando que las decisiones de diseño generaron impacto estructural, no cosmético:",
          bullets: [
            { label: "Registro", content: "Creció de forma consistente con una mejora acumulada de +16%, sosteniendo la tendencia incluso en periodos de menor volumen.", highlights: ["+16%"] },
            { label: "PJ compliance", content: "Mejoró +11%, confirmando que la claridad del flujo y la arquitectura modular impactaron directamente en la conversión a compliance.", highlights: ["+11%"] },
            { label: "Consistencia operativa", content: "Las mejoras se sostuvieron sin sacrificar volumen ni estabilidad del flujo, incluso bajo escenarios de mayor complejidad." },
          ],
        }
        : {
          title: "Results",
          headers: {
            metric: "Metric",
            before: "Before",
            after: "After",
            delta: "Δ Delta",
          },
          rows: [
            { metric: "Completion rate (Registration)", before: "Baseline", after: "Post-redesign", delta: "+16% ↗" },
            { metric: "PJ compliance", before: "Baseline", after: "Post-redesign", delta: "+11% ↗" },
          ],
          evolutionTitle: "Sustained growth",
          introLead: "The improvement was not an isolated spike.",
          introStrong: "Data shows a sustained growth trend driven by clarity and lower cognitive load,",
          introTail: " validating that design decisions created structural, not cosmetic, impact:",
          bullets: [
            { label: "Registration", content: "Grew consistently with a cumulative +16% uplift, maintaining momentum even during lower-volume periods.", highlights: ["+16%"] },
            { label: "PJ compliance", content: "Improved by +11%, confirming that clearer touchpoints and modular flow architecture directly impacted compliance conversion.", highlights: ["+11%"] },
            { label: "Operational consistency", content: "Gains remained stable without sacrificing volume or flow reliability, even in more complex scenarios." },
          ],
        };
    } else if (project.slug === "plamp") {
      resultsData = locale === "es"
        ? {
          title: "Resultados",
          headers: {
            metric: "KPI",
            before: "",
            after: "Resultado",
            delta: "",
          },
          rows: [
            { metric: "Participación comunitaria", before: "", after: "+80 personas en comités e intervenciones de restauración", delta: "" },
            { metric: "Formación", before: "", after: "~60 estudiantes en talleres de educación ambiental", delta: "" },
            { metric: "Impacto ambiental", before: "", after: "Disminución en deposición de desechos en la fuente hídrica", delta: "" },
          ],
          evolutionTitle: "Impacto sostenible",
          introLead: "El verdadero indicador de éxito:",
          introStrong: "meses después de irme, el proyecto seguía funcionando y la comunidad seguía usándolo y cuidándolo.",
          introTail: "",
          bullets: [],
        }
        : {
          title: "Results",
          headers: {
            metric: "KPI",
            before: "",
            after: "Result",
            delta: "",
          },
          rows: [
            { metric: "Community participation", before: "", after: "80+ people in committees and restoration interventions", delta: "" },
            { metric: "Training", before: "", after: "~60 students in environmental education workshops", delta: "" },
            { metric: "Environmental impact", before: "", after: "Decreased waste deposits in water source", delta: "" },
          ],
          evolutionTitle: "Sustainable impact",
          introLead: "The true success indicator:",
          introStrong: "months after leaving, the project kept running and the community kept using and caring for it.",
          introTail: "",
          bullets: [],
        };
    } else if (project.slug === "construyendo-democracia") {
      resultsData = locale === "es"
        ? {
          title: "Resultados",
          headers: {
            metric: "Entregable",
            before: "",
            after: "Resultado",
            delta: "",
          },
          rows: [
            { metric: "Evolución del medio", before: "", after: "De podcast a plataforma multimedia en 11 meses", delta: "" },
            { metric: "Propuesta de valor", before: "", after: "Mapa de concepto de diseño estructurado", delta: "" },
            { metric: "Prototipo de servicio", before: "", after: "Microservicio de recolección y segmentación de datos de audiencia", delta: "" },
            { metric: "User Journey Map", before: "", after: "Identificación de touchpoints y momentos críticos del servicio", delta: "" },
            { metric: "Service Blueprint", before: "", after: "Desglose de actividades del equipo para clientes internos y externos", delta: "" },
            { metric: "Business Model Canvas", before: "", after: "Estructura de negocio para guiar futuros ciclos de iteración", delta: "" },
          ],
          evolutionTitle: "Visión a futuro",
          introLead: "Con esta estructura,",
          introStrong: "CD,M tiene una base sólida para iterar sobre sus productos existentes, crear nuevas categorías de contenido y optimizar recursos",
          introTail: " — siempre alineado con su visión y generando valor adicional para los usuarios.",
          bullets: [],
        }
        : {
          title: "Results",
          headers: {
            metric: "Deliverable",
            before: "",
            after: "Result",
            delta: "",
          },
          rows: [
            { metric: "Media evolution", before: "", after: "From podcast to multimedia platform in 11 months", delta: "" },
            { metric: "Value proposition", before: "", after: "Structured design concept map", delta: "" },
            { metric: "Service prototype", before: "", after: "Microservice for audience data collection and segmentation", delta: "" },
            { metric: "User Journey Map", before: "", after: "Identification of touchpoints and critical service moments", delta: "" },
            { metric: "Service Blueprint", before: "", after: "Team activity breakdown for internal and external clients", delta: "" },
            { metric: "Business Model Canvas", before: "", after: "Business structure to guide future iteration cycles", delta: "" },
          ],
          evolutionTitle: "Looking ahead",
          introLead: "With this structure,",
          introStrong: "CD,M has a solid foundation to iterate on existing products, create new content categories, and optimize resources",
          introTail: " — always aligned with its vision and generating additional value for users.",
          bullets: [],
        };
    }

    let journeySteps = null;
    if (project.slug === "plamp") {
      journeySteps = locale === "es"
        ? [
          {
            title: "Preparación de la ropa",
            image: `${import.meta.env.BASE_URL}projects/plamp-journey-01.png`,
            emotionalState: "Entusiasmo",
            emotionalColor: "#7BC67E",
            keyObjects: ["Ropa", "Canasta"],
            insights: "La preparación comienza en casa; algunas personas hacen un prelavado o remojo antes de ir a Los Lavaderos.",
          },
          {
            title: "Transporte a Los Lavaderos",
            image: `${import.meta.env.BASE_URL}projects/plamp-journey-02.png`,
            emotionalState: "Preocupación",
            emotionalColor: "#D97B5B",
            keyObjects: ["Ropa", "Canasta", "Motocicleta"],
            insights: "Existen diferentes formas de transporte hacia Los Lavaderos. Se usan motocicletas y transporte pago, pero lo más común es cargar la ropa al hombro.",
          },
          {
            title: "Bajada de escaleras",
            image: `${import.meta.env.BASE_URL}projects/plamp-journey-03.png`,
            emotionalState: "Precaución",
            emotionalColor: "#E8A838",
            keyObjects: ["Ropa", "Canasta", "Escaleras"],
            insights: "Las personas enfrentan dificultades al descender las escaleras: no hay condiciones de seguridad y la estructura presenta desgaste.",
          },
          {
            title: "Descarga de la ropa",
            image: `${import.meta.env.BASE_URL}projects/plamp-journey-04.png`,
            emotionalState: "Incomodidad",
            emotionalColor: "#D97B5B",
            keyObjects: ["Ropa", "Canasta", "Los Lavaderos", "Quebrada"],
            insights: "La carga se ubica sobre la misma superficie donde se lava, ocupando espacio de trabajo y dificultando la operación.",
          },
          {
            title: "Descenso a la quebrada",
            image: `${import.meta.env.BASE_URL}projects/plamp-journey-05.png`,
            emotionalState: "Incomodidad",
            emotionalColor: "#D97B5B",
            keyObjects: ["Ropa", "Canasta", "Los Lavaderos", "Quebrada"],
            insights: "Entrar a la quebrada implica esfuerzo físico y exposición a agua potencialmente contaminada, con riesgo para la salud.",
          },
          {
            title: "Inicio del lavado",
            image: `${import.meta.env.BASE_URL}projects/plamp-journey-06.png`,
            emotionalState: "Satisfacción",
            emotionalColor: "#7BC67E",
            keyObjects: ["Ropa", "Canasta", "Los Lavaderos", "Quebrada", "Jabón para ropa"],
            insights: "Durante el lavado, gran parte del detergente termina en la quebrada sin filtración previa.",
          },
          {
            title: "Finalización del lavado",
            image: `${import.meta.env.BASE_URL}projects/plamp-journey-07.png`,
            emotionalState: "Satisfacción",
            emotionalColor: "#7BC67E",
            keyObjects: ["Ropa mojada", "Canasta", "Los Lavaderos", "Quebrada"],
            insights: "Después del lavado, la ropa mojada incrementa significativamente su peso y hace más exigente el traslado.",
          },
          {
            title: "Ascenso desde la quebrada",
            image: `${import.meta.env.BASE_URL}projects/plamp-journey-08.png`,
            emotionalState: "Incomodidad",
            emotionalColor: "#D97B5B",
            keyObjects: ["Ropa mojada", "Canasta", "Los Lavaderos", "Quebrada"],
            insights: "Se presentan dificultades físicas al salir de la quebrada, especialmente por el peso y la inestabilidad del terreno.",
          },
          {
            title: "Regreso a casa",
            image: `${import.meta.env.BASE_URL}projects/plamp-journey-09.png`,
            emotionalState: "Incomodidad",
            emotionalColor: "#D97B5B",
            keyObjects: ["Ropa mojada", "Canasta", "Los Lavaderos", "Quebrada", "Escaleras", "Transporte"],
            insights: "Transportar una carga mojada y pesada puede afectar la salud de las personas. La salida de Los Lavaderos también se vuelve más riesgosa al ir con la ropa y el cuerpo mojados.",
          },
        ]
        : [
          {
            title: "Clothes preparation",
            image: `${import.meta.env.BASE_URL}projects/plamp-journey-01.png`,
            emotionalState: "Enthusiasm",
            emotionalColor: "#7BC67E",
            keyObjects: ["Clothes", "Basket"],
            insights: "Preparation starts at home; some residents do a pre-wash or soaking before going to Los Lavaderos.",
          },
          {
            title: "Transport to Los Lavaderos",
            image: `${import.meta.env.BASE_URL}projects/plamp-journey-02.png`,
            emotionalState: "Concern",
            emotionalColor: "#D97B5B",
            keyObjects: ["Clothes", "Basket", "Motorcycle"],
            insights: "There are different ways to transport clothes to Los Lavaderos. Motorcycles and paid transport are used, although carrying clothes on the shoulder is more common.",
          },
          {
            title: "Descending the stairs",
            image: `${import.meta.env.BASE_URL}projects/plamp-journey-03.png`,
            emotionalState: "Caution",
            emotionalColor: "#E8A838",
            keyObjects: ["Clothes", "Basket", "Stairs"],
            insights: "Users face difficulties going down the stairs: there are no safety conditions and the structure is worn out.",
          },
          {
            title: "Unloading clothes",
            image: `${import.meta.env.BASE_URL}projects/plamp-journey-04.png`,
            emotionalState: "Discomfort",
            emotionalColor: "#D97B5B",
            keyObjects: ["Clothes", "Basket", "Los Lavaderos", "Creek"],
            insights: "The load is placed on the same surface where washing happens, taking up extra space and reducing usability.",
          },
          {
            title: "Descending into the creek",
            image: `${import.meta.env.BASE_URL}projects/plamp-journey-05.png`,
            emotionalState: "Discomfort",
            emotionalColor: "#D97B5B",
            keyObjects: ["Clothes", "Basket", "Los Lavaderos", "Creek"],
            insights: "Users experience physical difficulty when entering the creek. Exposure to highly contaminated water can also create health risks.",
          },
          {
            title: "Start of washing",
            image: `${import.meta.env.BASE_URL}projects/plamp-journey-06.png`,
            emotionalState: "Satisfaction",
            emotionalColor: "#7BC67E",
            keyObjects: ["Clothes", "Basket", "Los Lavaderos", "Creek", "Laundry soap"],
            insights: "During washing, a significant amount of detergent goes directly into the creek without filtration.",
          },
          {
            title: "End of washing",
            image: `${import.meta.env.BASE_URL}projects/plamp-journey-07.png`,
            emotionalState: "Satisfaction",
            emotionalColor: "#7BC67E",
            keyObjects: ["Wet clothes", "Basket", "Los Lavaderos", "Creek"],
            insights: "After washing, clothes become much heavier, increasing effort for the remaining journey.",
          },
          {
            title: "Ascending from the creek",
            image: `${import.meta.env.BASE_URL}projects/plamp-journey-08.png`,
            emotionalState: "Discomfort",
            emotionalColor: "#D97B5B",
            keyObjects: ["Wet clothes", "Basket", "Los Lavaderos", "Creek"],
            insights: "Users encounter physical difficulties when exiting the creek, especially due to wet surfaces and additional weight.",
          },
          {
            title: "Return home",
            image: `${import.meta.env.BASE_URL}projects/plamp-journey-09.png`,
            emotionalState: "Discomfort",
            emotionalColor: "#D97B5B",
            keyObjects: ["Wet clothes", "Basket", "Los Lavaderos", "Creek", "Stairs", "Transport"],
            insights: "Carrying a heavy wet load can affect users' health. Exiting Los Lavaderos is also riskier because users are wet and fatigued.",
          },
        ];
    }

    let creditsData = null;
    if (project.slug === "registro-personas-juridicas") {
      creditsData = locale === "es"
        ? {
          title: "Créditos",
          subtitle: "Equipo interdisciplinario que colaboró en la estrategia, diseño, implementación y compliance del proyecto.",
          groups: [
            { title: "Equipo UX", members: ["[Nombre UX 1]", "[Nombre UX 2]", "[Nombre UX 3]"] },
            { title: "Equipo de Producto", members: ["[Nombre PM 1]", "[Nombre PM 2]"] },
            { title: "Equipo de Desarrollo", members: ["[Nombre Dev 1]", "[Nombre Dev 2]", "[Nombre Dev 3]"] },
            { title: "Equipo AML", members: ["[Nombre AML 1]", "[Nombre AML 2]"] },
          ],
        }
        : {
          title: "Credits",
          subtitle: "Cross-functional team that collaborated on strategy, design, implementation, and compliance.",
          groups: [
            { title: "UX Team", members: ["[UX Name 1]", "[UX Name 2]", "[UX Name 3]"] },
            { title: "Product Team", members: ["[PM Name 1]", "[PM Name 2]"] },
            { title: "Engineering Team", members: ["[Dev Name 1]", "[Dev Name 2]", "[Dev Name 3]"] },
            { title: "AML Team", members: ["[AML Name 1]", "[AML Name 2]"] },
          ],
        };
    } else if (project.slug === "plamp") {
      creditsData = locale === "es"
        ? {
          title: "Créditos",
          subtitle: "Equipo interdisciplinario del proyecto PLAMP — Colciencias + Ideas Para el Cambio.",
          groups: [
            { title: "Diseño e intervención", members: ["[Nombre Diseñador 1]", "[Nombre Diseñador 2]"] },
            { title: "Investigación", members: ["[Nombre Investigador 1]", "[Nombre Investigador 2]"] },
            { title: "Ingeniería y sensores", members: ["[Nombre Ing. 1]", "[Nombre Ing. 2]"] },
            { title: "Universidad Distrital", members: ["[Director extensión]", "[Coordinador]"] },
          ],
        }
        : {
          title: "Credits",
          subtitle: "Cross-functional team behind PLAMP — Colciencias + Ideas Para el Cambio.",
          groups: [
            { title: "Design & intervention", members: ["[Designer 1]", "[Designer 2]"] },
            { title: "Research", members: ["[Researcher 1]", "[Researcher 2]"] },
            { title: "Engineering & sensors", members: ["[Engineer 1]", "[Engineer 2]"] },
            { title: "Universidad Distrital", members: ["[Extension director]", "[Coordinator]"] },
          ],
        };
    } else if (project.slug === "construyendo-democracia") {
      creditsData = locale === "es"
        ? {
          title: "Créditos",
          subtitle: "Equipo interdisciplinario detrás de Construyendo Democracia, Maestro.",
          groups: [
            { title: "Diseño de servicio e ilustración", members: ["[Nombre Service Designer]"] },
            { title: "Dirección editorial", members: ["[Director editorial 1]", "[Director editorial 2]"] },
            { title: "Investigación periodística", members: ["[Periodista 1]", "[Periodista 2]", "[Periodista 3]"] },
            { title: "Producción multimedia", members: ["[Productor 1]", "[Productor 2]"] },
          ],
        }
        : {
          title: "Credits",
          subtitle: "Cross-functional team behind Construyendo Democracia, Maestro.",
          groups: [
            { title: "Service Design & Illustration", members: ["[Service Designer]"] },
            { title: "Editorial Direction", members: ["[Editor 1]", "[Editor 2]"] },
            { title: "Investigative Journalism", members: ["[Journalist 1]", "[Journalist 2]", "[Journalist 3]"] },
            { title: "Multimedia Production", members: ["[Producer 1]", "[Producer 2]"] },
          ],
        };
    }

    let takeawaysData = null;
    if (project.slug === "registro-personas-juridicas") {
      takeawaysData = locale === "es"
        ? {
          title: "Aprendizajes clave",
          items: [
            { label: "Pensamiento estratégico", content: "Reencuadré el problema — de \"flujo largo\" a \"flujo confuso\" — cambiando la dirección del proyecto." },
            { label: "Content-first design", content: "Prioricé la construcción de la narrativa antes que la interfaz para que la línea gráfica también contara la historia de forma coherente." },
            { label: "Impacto medible en negocio", content: "+16% en registro y +11% en PJ compliance = más empresas operando en Mercado Pago, más volumen transaccional." },
            { label: "Crecimiento sostenido", content: "No fue un one-shot. La curva ascendente prueba que el diseño resolvió problemas estructurales." },
            { label: "AI aplicada con criterio", content: "No como tendencia, sino como herramienta para reducir fricción real." },
          ],
        }
        : {
          title: "Key learnings",
          items: [
            { label: "Strategic thinking", content: "I reframed the problem — from a \"long flow\" to a \"confusing flow\" — changing the direction of the project." },
            { label: "Content-first design", content: "I prioritized building the narrative before the interface so that the visual language would also tell the story coherently." },
            { label: "Measurable business impact", content: "+16% in registration and +11% in PJ compliance = more companies operating in Mercado Pago, more transactional volume." },
            { label: "Sustained growth", content: "It was not a one-shot. The upward curve proves the design solved structural problems." },
            { label: "AI applied with intention", content: "Not as a trend, but as a practical tool to reduce real friction." },
          ],
        };
    } else if (project.slug === "plamp") {
      takeawaysData = locale === "es"
        ? {
          title: "Aprendizajes clave",
          items: [
            { label: "Diseño en contexto extremo", content: "Aprendí que en territorios de conflicto y poblaciones vulnerables, la metodología importa tanto como la solución. Sin confianza, no hay apropiación real de las iniciativas, ni resultados sostenibles." },
            { label: "Co-diseño real, no performativo", content: "Los modelos físicos y los comités abiertos no fueron un paso del proceso — fueron el proceso. La comunidad no validó mi diseño; lo construimos juntos." },
            { label: "Producto multimodal", content: "Conecté intervención física + tecnología IoT + programa social en un sistema coherente. Cada capa resolvía un dolor distinto pero todas se reforzaban mutuamente." },
            { label: "Diseño que se sostiene solo", content: "El verdadero KPI de éxito: meses después de irme, el proyecto seguía funcionando y la comunidad seguía usándolo y cuidándolo." },
            { label: "De Service Design a Product Thinking", content: "Abordé un reto de servicio comunitario con mentalidad de producto — journey maps, touchpoints, iteraciones basadas en data y una arquitectura de solución escalable." },
          ],
        }
        : {
          title: "Key learnings",
          items: [
            { label: "Design in extreme context", content: "I learned that in conflict territories and vulnerable populations, methodology matters as much as the solution. Without trust, there is no real appropriation of initiatives, nor sustainable results." },
            { label: "Real co-design, not performative", content: "Physical models and open committees weren't a step in the process — they were the process. The community didn't validate my design; we built it together." },
            { label: "Multimodal product", content: "I connected physical intervention + IoT technology + social program into a coherent system. Each layer solved a different pain point, but all reinforced each other." },
            { label: "Design that sustains itself", content: "The true success KPI: months after I left, the project kept running and the community kept using and caring for it." },
            { label: "From Service Design to Product Thinking", content: "I tackled a community service challenge with a product mindset — journey maps, touchpoints, data-driven iterations, and a scalable solution architecture." },
          ],
        };
    } else if (project.slug === "construyendo-democracia") {
      takeawaysData = locale === "es"
        ? {
          title: "Aprendizajes clave",
          items: [
            { label: "Service Design en medios independientes", content: "Aprendí que las herramientas de diseño de servicio son igual de potentes en un medio digital que en una empresa de tecnología — journey maps, blueprints y prototipos de servicio ayudaron a dar estructura a un proyecto con recursos limitados." },
            { label: "Producto de nicho ≠ producto sin estrategia", content: "El hecho de que CD,M sea un producto de nicho no significa que no pueda crecer estratégicamente. La clave fue innovar en los canales de distribución sin alterar la esencia del producto principal." },
            { label: "De datos cualitativos a segmentación real", content: "Conecté datos de entrevistas con métricas de redes sociales para construir un arquetipo de usuario accionable — no una persona genérica, sino una herramienta para tomar decisiones concretas." },
            { label: "Diseño con impacto social", content: "Este proyecto me confirmó que el diseño puede ser una herramienta de transformación social cuando se aplica con rigor metodológico y respeto por el contexto." },
            { label: "Pensamiento sistémico", content: "Estructuré el Business Model Canvas, el Service Blueprint y el Journey Map como un sistema interconectado — cada cambio en un componente impactaba los demás, y eso obligó a pensar en el diseño como arquitectura, no como decoración." },
          ],
        }
        : {
          title: "Key learnings",
          items: [
            { label: "Service Design in independent media", content: "I learned that service design tools are equally powerful in a digital media outlet as in a tech company — journey maps, blueprints, and service prototypes helped structure a project with limited resources." },
            { label: "Niche product ≠ product without strategy", content: "The fact that CD,M is a niche product doesn't mean it can't grow strategically. The key was innovating in distribution channels without altering the core product's essence." },
            { label: "From qualitative data to real segmentation", content: "I connected interview data with social media metrics to build an actionable user archetype — not a generic persona, but a tool for making concrete decisions." },
            { label: "Design with social impact", content: "This project confirmed that design can be a tool for social transformation when applied with methodological rigor and respect for context." },
            { label: "Systems thinking", content: "I structured the Business Model Canvas, Service Blueprint, and Journey Map as an interconnected system — every change in one component impacted the others, forcing me to think of design as architecture, not decoration." },
          ],
        };
    }

    return (
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        transition={{ duration: 0.6 }}
        className="min-h-screen bg-background text-primary selection:bg-accent selection:text-background relative"
        style={{
          "--project-accent-color": project.caseStudy?.accentColor || "#ffffff",
        }}
      >
        {/* Cinematic Background */}
        <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.08),transparent_60%)] pointer-events-none" />

        <Navbar />

        <main>
          {/* Hero Parallax Section */}
          <HeroParallax
            title={project.title}
            subtitle={heroSubtitle}
            backgroundImage={project.caseStudy?.heroImage || project.image}
            backgroundVideo={project.caseStudy?.heroVideo}
            accentColor={project.caseStudy?.accentColor}
          />

          {/* Metadata Grid */}
          <div className="mx-auto max-w-6xl">
            <MetadataGrid
              items={[
                {
                  label: t("project.role"),
                  value: Array.isArray(project.role)
                    ? project.role
                    : [project.role],
                },
                { label: t("project.year"), value: project.year },
                ...(project.metrics || []),
              ]}
            />
          </div>

          {/* Challenge & Solution */}
          {(project.caseStudy?.challenge || project.caseStudy?.solution) && (
            <ChallengeSolution
              challenge={project.caseStudy.challenge}
              solution={project.caseStudy.solution}
              solutionComment={solutionComment}
              images={project.caseStudy.challengeImages}
              accentColor={project.caseStudy.accentColor}
            />
          )}

          {/* Solution Detail */}
          {solutionDetailData && (
            <SolutionDetail
              title={solutionDetailData.title}
              blocks={solutionDetailData.blocks}
            >
              {project.slug === "registro-personas-juridicas" && (
                <FlowVisualization
                  accentColor={project.caseStudy?.accentColor}
                  className="py-0 md:py-0"
                />
              )}
              {project.slug === "plamp" && journeySteps && (
                <JourneyTimeline
                  steps={journeySteps}
                  accentColor={project.caseStudy?.accentColor}
                />
              )}
              {project.slug === "construyendo-democracia" && (
                <>
                  <EcosystemExplorer
                    accentColor={project.caseStudy?.accentColor}
                  />
                </>
              )}
            </SolutionDetail>
          )}

          {project.slug === "construyendo-democracia" && journeyBlueprintData && (
            <div className="w-full pb-20 md:pb-24">
              <div className="mx-auto max-w-6xl px-6">
                <div className="w-full max-w-none text-left">
                  <h3 className="text-lg md:text-xl font-semibold text-primary tracking-tight">
                    {journeyBlueprintData.subtitle}
                  </h3>
                  <div className="space-y-4 mt-4">
                    {journeyBlueprintData.content
                      .split("\n\n")
                      .map((p) => p.trim())
                      .filter(Boolean)
                      .map((paragraph, i) => (
                        <p
                          key={i}
                          className="text-base md:text-lg text-secondary leading-relaxed font-light"
                        >
                          {paragraph}
                        </p>
                      ))}
                  </div>

                  {serviceBlueprintData && (
                    <ServiceBlueprintBoard
                      title={serviceBlueprintData.title}
                      subtitle={serviceBlueprintData.subtitle}
                      labels={serviceBlueprintData.labels}
                      phases={serviceBlueprintData.phases}
                      moments={serviceBlueprintData.moments}
                      accentColor={project.caseStudy?.accentColor}
                    />
                  )}
                </div>
              </div>
            </div>
          )}

          {/* Results */}
          {resultsData && (
            <ResultsSection
              title={resultsData.title}
              headers={resultsData.headers}
              rows={resultsData.rows}
              evolutionTitle={resultsData.evolutionTitle}
              introLead={resultsData.introLead}
              introStrong={resultsData.introStrong}
              introTail={resultsData.introTail}
              bullets={resultsData.bullets}
            >
              {project.slug === "registro-personas-juridicas" && (
                <SpotlightCollage
                  accentColor={project.caseStudy?.accentColor}
                  className="py-0 md:py-0"
                  items={[
                    { src: `${import.meta.env.BASE_URL}projects/collage-desk-1.png`, type: "desktop", caption: locale === "es" ? "Hub de datos básicos" : "Basic data hub" },
                    { src: `${import.meta.env.BASE_URL}projects/collage-desk-2.png`, type: "desktop", caption: locale === "es" ? "Residencia fiscal (persona)" : "Tax residency (person)" },
                    { src: `${import.meta.env.BASE_URL}projects/collage-desk-3.png`, type: "desktop", caption: locale === "es" ? "Residencia fiscal (accionistas)" : "Tax residency (shareholders)" },
                    { src: `${import.meta.env.BASE_URL}projects/collage-desk-4.png`, type: "desktop", caption: locale === "es" ? "Accionistas PEP" : "PEP shareholders" },
                    { src: `${import.meta.env.BASE_URL}projects/collage-mobile-1.png`, type: "mobile", caption: locale === "es" ? "Resumen del negocio" : "Business summary" },
                    { src: `${import.meta.env.BASE_URL}projects/collage-mobile-2.png`, type: "mobile", caption: locale === "es" ? "Agregar socio PEP" : "Add PEP shareholder" },
                    { src: `${import.meta.env.BASE_URL}projects/collage-mobile-3.png`, type: "mobile", caption: locale === "es" ? "Confirmación de socios" : "Shareholders confirmation" },
                    { src: `${import.meta.env.BASE_URL}projects/collage-mobile-4.png`, type: "mobile", caption: locale === "es" ? "Residencia fiscal exterior" : "Foreign tax residency" },
                  ]}
                />
              )}
            </ResultsSection>
          )}

          {/* Takeaways */}
          {takeawaysData && (
            <TakeawaysSection
              title={takeawaysData.title}
              items={takeawaysData.items}
            />
          )}

          {/* Credits */}
          {creditsData && (
            <ProjectCredits
              title={creditsData.title}
              subtitle={creditsData.subtitle}
              groups={creditsData.groups}
            />
          )}

          {/* Next Project Footer */}
          {nextProject && (
            <NextProjectFooter
              nextProjectSlug={nextProject.slug}
              nextProjectTitle={nextProject.title}
              nextProjectImage={nextProject.image}
            />
          )}
        </main>

        <Footer />
      </motion.div>
    );
  }

  // Original template for non-case-study projects
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      exit={{ opacity: 0 }}
      transition={{ duration: 0.6 }}
      className="min-h-screen bg-background text-primary selection:bg-accent selection:text-background relative"
    >
      {/* Cinematic Background */}
      <div className="fixed inset-0 -z-10 bg-[radial-gradient(circle_at_50%_0%,rgba(255,255,255,0.08),transparent_60%)] pointer-events-none" />

      <Navbar />

      <main className="pt-32 pb-24">
        <div className="mx-auto w-full max-w-5xl px-6 flex flex-col gap-16">

          {/* Header Section */}
          <div className="flex flex-col gap-8">
            <Link
              to="/"
              className="w-fit pl-1 text-xs font-mono uppercase tracking-[0.2em] text-secondary/60 hover:text-primary transition-colors"
            >
              {t("project.back")}
            </Link>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.7, ease: "easeOut" }}
              className="text-6xl md:text-8xl font-bold tracking-tighter text-primary leading-[0.9]"
            >
              {project.title}
            </motion.h1>

            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.7 }}
              className="flex flex-wrap gap-x-12 gap-y-6 pt-6 border-t border-white/10"
            >
              <div>
                <span className="block text-secondary/40 text-[10px] uppercase tracking-widest mb-2 font-mono">
                  {t("project.role")}
                </span>
                <span className="text-primary font-mono text-sm tracking-wide">{Array.isArray(project.role) ? project.role.join(", ") : project.role}</span>
              </div>
              <div>
                <span className="block text-secondary/40 text-[10px] uppercase tracking-widest mb-2 font-mono">
                  {t("project.year")}
                </span>
                <span className="text-primary font-mono text-sm tracking-wide">{project.year}</span>
              </div>
              {project.metrics && project.metrics.map((metric, i) => (
                <div key={i}>
                  <span className="block text-secondary/40 text-[10px] uppercase tracking-widest mb-2 font-mono">{metric.label}</span>
                  <span className="text-accent font-mono text-sm tracking-wide">{metric.value}</span>
                </div>
              ))}
            </motion.div>

            <div className="flex flex-wrap gap-3 mt-4">
              {project.tags?.map((tag) => (
                <Badge key={tag} className="border-white/10 bg-white/5 text-secondary/80 font-mono text-xs backdrop-blur-md px-3 py-1">{tag}</Badge>
              ))}
            </div>

            <Paragraph className="text-xl md:text-2xl text-secondary leading-relaxed max-w-3xl mt-4 font-light">
              {project.description}
            </Paragraph>
          </div>

          {/* Hero Video/Image */}
          {project.video && (
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.4, duration: 0.8 }}
              className="overflow-hidden rounded-3xl border border-white/5 bg-surface/30 shadow-2xl"
            >
              <video
                className="w-full h-auto"
                src={project.video}
                poster={project.image}
                controls
                playsInline
                muted
                loop
              />
            </motion.div>
          )}

          {/* Content Blocks - Seamless Flow */}
          <div className="flex flex-col gap-8">
            {project.blocks?.map((block, idx) => renderBlock(block, idx))}
          </div>
        </div>
      </main>
      <Footer />
    </motion.div>
  );
};

export default ProjectPage;
