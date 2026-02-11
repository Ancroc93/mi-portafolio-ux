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
        ? emphasizeSubstring(
            project.description,
            "llevando la tasa de completitud del 46.87% al 62.37% y la conversión a compliance del 39.72% al 50.20%.",
            "font-semibold"
          )
        : emphasizeSubstring(
            project.description,
            "improving completion rate from 46.87% to 62.37% and compliance conversion from 39.72% to 50.20%.",
            "font-semibold"
          );
    } else if (project.slug === "plamp") {
      heroSubtitle = locale === "es"
        ? emphasizeSubstring(
            project.description,
            "Más de 80 personas participaron activamente en comités de restauración del espacio público, 60 estudiantes se formaron en talleres de educación ambiental, y la comunidad redujo el consumo de agua sin sacrificar la dinámica social del espacio.",
            "font-semibold"
          )
        : emphasizeSubstring(
            project.description,
            "Over 80 people actively participated in public space restoration committees, 60 students were trained in environmental education workshops, and the community reduced water consumption without sacrificing the social dynamics of the space.",
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
    }

    let solutionDetailData = null;
    if (project.slug === "registro-personas-juridicas") {
      solutionDetailData = {
        title: locale === "es" ? "La solución" : "The Solution",
        blocks: locale === "es"
          ? [
            {
              subtitle: "Primero la narrativa, después la interfaz",
              content: "Antes de tocar un solo componente, construí una historia de contenido completa: prototipos de texto, testeo de mensajes y escenarios. Esto me dio las bases para que UI y copy se contaran mutuamente una historia sin ruido.",
            },
            {
              subtitle: "Iteraciones rápidas, decisiones con datos",
              content: "Generé +50 versiones de flujo, revisadas colaborativamente con producto y tecnología, cumpliendo de forma definitiva los pedidos regulatorios para operar en el país.",
            },
            {
              subtitle: "Ciclos completos de iteración en 3 días",
              content: "Diseñar → estresar → testear → aprender → Iterar.\nCada decisión de diseño estuvo respaldada por benchmarks cross-industry y datos de comportamiento real.\n\nAI y automatizaciones para absorber complejidad, no para decorar. Integré inteligencia artificial en puntos estratégicos del flujo con un objetivo concreto: que el sistema hiciera el trabajo pesado, no el usuario. Por ejemplo, a partir de un solo número de CUIT, el flujo auto-completaba razón social, domicilio legal y datos del negocio — eliminando pasos manuales y reduciendo errores.",
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
              content: "Design → stress-test → test → learn → Iterate.\nEvery design decision was backed by cross-industry benchmarks and real behavioral data.\n\nAI and automation to absorb complexity, not to decorate. I integrated artificial intelligence at strategic points in the flow with one clear goal: let the system do the heavy lifting, not the user. For example, from a single tax ID number, the flow auto-filled company name, legal address, and business data — eliminating manual steps and reducing errors.",
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
            { metric: "Consumo de agua", before: "", after: "Reducción medible durante meses de seguimiento", delta: "" },
            { metric: "Impacto ambiental", before: "", after: "Disminución en deposición de desechos en la fuente hídrica", delta: "" },
            { metric: "Sostenibilidad", before: "", after: "Proyecto implementado y funcionando en la comunidad", delta: "" },
            { metric: "Cambio de comportamiento", before: "", after: "Tiempos de lavado optimizados sin deteriorar la dinámica social", delta: "" },
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
            { metric: "Water consumption", before: "", after: "Measurable reduction during follow-up months", delta: "" },
            { metric: "Environmental impact", before: "", after: "Decreased waste deposits in water source", delta: "" },
            { metric: "Sustainability", before: "", after: "Project implemented and operational in the community", delta: "" },
            { metric: "Behavior change", before: "", after: "Washing times optimized without harming social dynamics", delta: "" },
          ],
          evolutionTitle: "Sustainable impact",
          introLead: "The true success indicator:",
          introStrong: "months after leaving, the project kept running and the community kept using and caring for it.",
          introTail: "",
          bullets: [],
        };
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
    }

    let takeawaysData = null;
    if (project.slug === "registro-personas-juridicas") {
      takeawaysData = locale === "es"
        ? {
          title: "Lo que me llevé",
          items: [
            { label: "Pensamiento estratégico", content: "Reencuadré el problema — de \"flujo largo\" a \"flujo confuso\" — cambiando la dirección del proyecto." },
            { label: "Content-first design", content: "Prioricé la narrativa del contenido antes de la interfaz, logrando coherencia entre UI y copy." },
            { label: "Impacto medible en negocio", content: "+16% en registro y +11% en PJ compliance = más empresas operando en Mercado Pago, más volumen transaccional." },
            { label: "Crecimiento sostenido", content: "No fue un one-shot. La curva ascendente prueba que el diseño resolvió problemas estructurales." },
            { label: "AI aplicada con criterio", content: "No como tendencia, sino como herramienta para reducir fricción real." },
          ],
        }
        : {
          title: "Key takeaways",
          items: [
            { label: "Strategic thinking", content: "I reframed the problem — from a \"long flow\" to a \"confusing flow\" — changing the direction of the project." },
            { label: "Content-first design", content: "I prioritized content narrative before interface, achieving coherence between UI and copy." },
            { label: "Measurable business impact", content: "+16% in registration and +11% in PJ compliance = more companies operating in Mercado Pago, more transactional volume." },
            { label: "Sustained growth", content: "It was not a one-shot. The upward curve proves the design solved structural problems." },
            { label: "AI applied with intention", content: "Not as a trend, but as a practical tool to reduce real friction." },
          ],
        };
    } else if (project.slug === "plamp") {
      takeawaysData = locale === "es"
        ? {
          title: "Lo que me llevé",
          items: [
            { label: "Diseño en contexto extremo", content: "Aprendí que en territorios de conflicto, la metodología importa tanto como la solución. Sin confianza, no hay adopción." },
            { label: "Co-diseño real, no performativo", content: "Los modelos físicos y los comités abiertos no fueron un paso del proceso — fueron el proceso. La comunidad no validó mi diseño; lo construimos juntos." },
            { label: "Producto multimodal", content: "Conecté intervención física + tecnología IoT + programa social en un sistema coherente. Cada capa resolvía un dolor distinto pero todas se reforzaban mutuamente." },
            { label: "Diseño que se sostiene solo", content: "El verdadero KPI de éxito: meses después de irme, el proyecto seguía funcionando y la comunidad seguía usándolo y cuidándolo." },
            { label: "De Service Design a Product Thinking", content: "Abordé un reto de servicio comunitario con mentalidad de producto — journey maps, touchpoints, iteraciones basadas en data y una arquitectura de solución escalable." },
          ],
        }
        : {
          title: "Key takeaways",
          items: [
            { label: "Design in extreme context", content: "I learned that in conflict territories, methodology matters as much as the solution. Without trust, there is no adoption." },
            { label: "Real co-design, not performative", content: "Physical models and open committees weren't a step in the process — they were the process. The community didn't validate my design; we built it together." },
            { label: "Multimodal product", content: "I connected physical intervention + IoT technology + social program into a coherent system. Each layer solved a different pain point, but all reinforced each other." },
            { label: "Design that sustains itself", content: "The true success KPI: months after I left, the project kept running and the community kept using and caring for it." },
            { label: "From Service Design to Product Thinking", content: "I tackled a community service challenge with a product mindset — journey maps, touchpoints, data-driven iterations, and a scalable solution architecture." },
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
            </SolutionDetail>
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
