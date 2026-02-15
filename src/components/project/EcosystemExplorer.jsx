import { useState, useCallback, useRef } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useI18n } from "../../i18n";

/* ═══════════════════════════════════════════════════════════════════
   ECOSYSTEM EXPLORER — Drill-down interactivo por niveles

   ► Agregar/quitar nodos → editar children[] en TREE
   ► Agregar niveles       → anidar más children
   ► Cambiar colores       → editar color (hijos heredan del padre)
   ► Cambiar textos        → editar label / description { es, en }
   ► Cambiar encabezado    → editar HEADER
   ═══════════════════════════════════════════════════════════════════ */

/* ─── Ecosystem tree ───────────────────────────────────────────── */
// Cada nodo: { id, label, description?, color?, children? }
// `color` es opcional en hijos; heredan del ancestro más cercano.
// `description` se muestra cuando el nodo es el centro activo.

const TREE = {
  id: "service",
  label: {
    es: "Servicio\nCD,M",
    en: "CD,M\nService",
  },
  description: {
    es: "Medio digital independiente que contribuye a la reconstrucción del tejido social a través de investigaciones relacionadas con el conflicto armado colombiano desde tres perspectivas principales: el espacio, los protagonistas y los procesos de resistencia y reparación — haciendo uso de una narrativa multimedia.",
    en: "Independent digital medium that contributes to the reconstruction of the social fabric through research related to the Colombian armed conflict from three main perspectives: space, protagonists, and resistance and reparation processes — making use of a multimedia narrative.",
  },
  color: "#C44536",
  children: [
    {
      id: "brand-dna",
      label: { es: "ADN de\nmarca", en: "Brand\nDNA" },
      color: "#8B5CF6",
      description: {
        es: "Los valores fundacionales que definen la identidad y el propósito de Construyendo Democracia, Maestro como medio independiente.",
        en: "The foundational values that define the identity and purpose of Construyendo Democracia, Maestro as an independent medium.",
      },
      children: [
        {
          id: "social-resp",
          label: { es: "Responsabilidad\nsocial", en: "Social\nresponsibility" },
          description: {
            es: "Compromiso con el impacto social positivo a través del periodismo responsable.",
            en: "Commitment to positive social impact through responsible journalism.",
          },
        },
        {
          id: "bridge-builders",
          label: { es: "Constructores\nde puentes", en: "Bridge\nbuilders" },
          description: {
            es: "Facilitar el diálogo entre los diferentes actores del conflicto.",
            en: "Facilitating dialogue between the different actors of the conflict.",
          },
        },
        {
          id: "listen",
          label: { es: "Escuchamos\nsus voces", en: "We listen\nto them" },
          description: {
            es: "Dar espacio a las narrativas de quienes vivieron el conflicto de primera mano.",
            en: "Giving space to the narratives of those who experienced the conflict firsthand.",
          },
        },
        {
          id: "resignify",
          label: { es: "Resignificar\ndemocracia", en: "Resignify\ndemocracy" },
          description: {
            es: "Repensar el concepto de democracia desde las experiencias del conflicto.",
            en: "Rethinking the concept of democracy from the experiences of the conflict.",
          },
        },
        {
          id: "educate-brand",
          label: { es: "Educar\naudiencia", en: "Educate\naudience" },
          description: {
            es: "Generar contenido que informe y forme criterio en la audiencia.",
            en: "Creating content that informs and builds critical thinking in the audience.",
          },
        },
        {
          id: "duty",
          label: { es: "Deber con\nlas víctimas", en: "Duty to\nvictims" },
          description: {
            es: "Nuestro compromiso ético con las víctimas del conflicto armado.",
            en: "Our ethical commitment to the victims of the armed conflict.",
          },
        },
      ],
    },
    {
      id: "strategic",
      label: { es: "Alineación\nestratégica", en: "Strategic\nalignment" },
      color: "#6366F1",
      description: {
        es: "Los pilares estratégicos que guían cada decisión del medio: desde la sostenibilidad económica hasta el compromiso con el activismo social.",
        en: "The strategic pillars guiding every decision of the media: from economic sustainability to commitment to social activism.",
      },
      children: [
        {
          id: "self-sustainable",
          label: { es: "Auto-\nsostenible", en: "Self-\nsustainable" },
          description: {
            es: "Garantizar la viabilidad económica del medio a largo plazo.",
            en: "Ensuring the media's long-term economic viability.",
          },
        },
        {
          id: "conflict-ref",
          label: { es: "Referencia en\nconflicto", en: "Conflict\nreference" },
          description: {
            es: "Ser referente en Colombia sobre el tema del conflicto armado.",
            en: "Being a reference point in Colombia on armed conflict issues.",
          },
        },
        {
          id: "responsible-econ",
          label: { es: "Economía\nresponsable", en: "Responsible\neconomy" },
          description: {
            es: "Operar con transparencia financiera y responsabilidad económica.",
            en: "Operating with financial transparency and economic responsibility.",
          },
        },
        {
          id: "readership",
          label: { es: "Base de\nlectores", en: "Readership\nbase" },
          description: {
            es: "Construir una comunidad sólida y comprometida de lectores.",
            en: "Building a solid and engaged community of readers.",
          },
        },
        {
          id: "social-activism",
          label: { es: "Activismo\nsocial", en: "Social\nactivism" },
          description: {
            es: "Impulsar cambios sociales a través del periodismo.",
            en: "Driving social change through journalism.",
          },
        },
      ],
    },
    {
      id: "channels",
      label: { es: "Canales", en: "Channels" },
      color: "#EC4899",
      description: {
        es: "El ecosistema multicanal a través del cual el medio conecta con diferentes segmentos de audiencia, usando los formatos que mejor se adaptan a sus hábitos de consumo.",
        en: "The multichannel ecosystem through which the media connects with different audience segments, using the formats that best match their consumption habits.",
      },
      children: [
        { id: "ch-video", label: { es: "Video", en: "Video" }, description: { es: "Producción audiovisual para plataformas digitales.", en: "Audiovisual production for digital platforms." } },
        { id: "ch-text", label: { es: "Texto", en: "Text" }, description: { es: "Artículos, crónicas e investigaciones escritas.", en: "Articles, chronicles, and written investigations." } },
        { id: "ch-illustration", label: { es: "Ilustración", en: "Illustration" }, description: { es: "Narrativa visual a través de ilustración editorial.", en: "Visual narrative through editorial illustration." } },
        { id: "ch-photo", label: { es: "Fotografía", en: "Photography" }, description: { es: "Fotoperiodismo y documentación visual.", en: "Photojournalism and visual documentation." } },
        { id: "ch-community", label: { es: "Comunidad", en: "Community" }, description: { es: "Espacios de participación y diálogo con la audiencia.", en: "Spaces for audience participation and dialogue." } },
        { id: "ch-social", label: { es: "Redes\nsociales", en: "Social\nmedia" }, description: { es: "Presencia estratégica en plataformas sociales.", en: "Strategic presence on social platforms." } },
        { id: "ch-web", label: { es: "Sitio web", en: "Website" }, description: { es: "Plataforma central de publicación y archivo.", en: "Central publication and archive platform." } },
        { id: "ch-podcast", label: { es: "Podcast", en: "Podcast" }, description: { es: "Contenido sonoro de largo formato.", en: "Long-form audio content." } },
        { id: "ch-events", label: { es: "Eventos\nen vivo", en: "Live\nevents" }, description: { es: "Encuentros presenciales y virtuales con la audiencia.", en: "In-person and virtual meetings with the audience." } },
        { id: "ch-multimedia", label: { es: "Material\nmultimedia", en: "Multimedia\nmaterial" }, description: { es: "Piezas interactivas y recursos descargables.", en: "Interactive pieces and downloadable resources." } },
      ],
    },
    {
      id: "offer",
      label: { es: "Oferta", en: "Offer" },
      color: "#14B8A6",
      description: {
        es: "Los cinco pilares de contenido que conforman la propuesta de valor del medio, cada uno con su propia estrategia de producción y distribución.",
        en: "The five content pillars that make up the media's value proposition, each with its own production and distribution strategy.",
      },
      children: [
        {
          id: "of-podcast",
          label: { es: "Podcast", en: "Podcast" },
          description: { es: "Programa de audio con tres formatos de producción.", en: "Audio program with three production formats." },
          children: [
            { id: "of-pod-report", label: { es: "Reportaje\nde evento", en: "Event\nreport" }, description: { es: "Cobertura sonora de eventos relevantes.", en: "Audio coverage of relevant events." } },
            { id: "of-pod-research", label: { es: "Investigación\nmensual", en: "Monthly\nresearch" }, description: { es: "Investigaciones de largo aliento publicadas mensualmente.", en: "Long-form investigations published monthly." } },
            { id: "of-pod-social", label: { es: "Contenido\nde redes", en: "Social\ncontent" }, description: { es: "Piezas cortas derivadas del podcast para redes sociales.", en: "Short podcast-derived pieces for social media." } },
          ],
        },
        {
          id: "of-social",
          label: { es: "Redes\nsociales", en: "Social\nmedia" },
          description: { es: "Estrategia de contenido para plataformas sociales.", en: "Content strategy for social platforms." },
          children: [
            { id: "of-soc-content", label: { es: "Contenido\norgánico", en: "Organic\ncontent" }, description: { es: "Publicaciones regulares de alto valor informativo.", en: "Regular high-value informational posts." } },
            { id: "of-soc-campaigns", label: { es: "Campañas", en: "Campaigns" }, description: { es: "Campañas publicitarias segmentadas.", en: "Segmented advertising campaigns." } },
            { id: "of-soc-announcements", label: { es: "Anuncios y\neducativo", en: "Announcements\n& education" }, description: { es: "Contenido educativo y anuncios institucionales.", en: "Educational content and institutional announcements." } },
          ],
        },
        {
          id: "of-website",
          label: { es: "Sitio web", en: "Website" },
          description: { es: "Plataforma con cinco secciones editoriales.", en: "Platform with five editorial sections." },
          children: [
            { id: "of-web-resistance", label: { es: "Resistencia", en: "Resistance" }, description: { es: "Historias de resistencia y reparación.", en: "Stories of resistance and reparation." } },
            { id: "of-web-coords", label: { es: "Coordenadas", en: "Coordenadas" }, description: { es: "El espacio como protagonista del conflicto.", en: "Space as the protagonist of the conflict." } },
            { id: "of-web-gritos", label: { es: "Gritos", en: "Gritos" }, description: { es: "Las voces de los protagonistas del conflicto.", en: "The voices of the conflict's protagonists." } },
            { id: "of-web-editorial", label: { es: "Editorial", en: "Editorial" }, description: { es: "Opinión y análisis del equipo editorial.", en: "Opinion and analysis from the editorial team." } },
            { id: "of-web-critical", label: { es: "Crítica", en: "Critical" }, description: { es: "Sección de crítica y debate público.", en: "Public criticism and debate section." } },
          ],
        },
        { id: "of-docs", label: { es: "Documentales", en: "Documentaries" }, description: { es: "Producciones audiovisuales de largo formato.", en: "Long-form audiovisual productions." } },
        {
          id: "of-merch",
          label: { es: "Merchandising", en: "Merchandising" },
          description: { es: "Productos de identidad corporativa.", en: "Corporate identity products." },
          children: [
            { id: "of-merch-identity", label: { es: "Identidad\ncorporativa", en: "Corporate\nidentity" }, description: { es: "Aplicaciones de marca en productos físicos.", en: "Brand applications on physical products." } },
          ],
        },
      ],
    },
    {
      id: "differentiators",
      label: { es: "Diferenciadores", en: "Differentiators" },
      color: "#F59E0B",
      description: {
        es: "Lo que hace único a CD,M frente a otros medios: un enfoque investigativo transversal, el uso de múltiples formatos narrativos y el compromiso con dar voz y visibilidad a los protagonistas.",
        en: "What makes CD,M unique compared to other media: a cross-sectional investigative approach, the use of multiple narrative formats, and the commitment to giving voice and visibility to protagonists.",
      },
      children: [
        { id: "di-crosssect", label: { es: "Investigación\ntransversal", en: "Cross-sectional\nresearch" }, description: { es: "Abordaje de cada investigación desde los tres ejes narrativos del medio.", en: "Approaching each investigation from the media's three narrative axes." } },
        { id: "di-storytelling", label: { es: "Storytelling\nmultimedia", en: "Multimedia\nstorytelling" }, description: { es: "Narrativas que combinan texto, audio, video, fotografía e ilustración.", en: "Narratives combining text, audio, video, photography, and illustration." } },
        { id: "di-educate", label: { es: "Educación de\naudiencia", en: "Audience\neducation" }, description: { es: "Formar criterio y conocimiento en la audiencia sobre el conflicto.", en: "Building knowledge and critical thinking in the audience about the conflict." } },
        { id: "di-voice", label: { es: "Voz y\nvisibilidad", en: "Voice &\nvisibility" }, description: { es: "Dar voz, espacio y visibilidad a las personas y comunidades protagonistas.", en: "Giving voice, space, and visibility to the people and communities involved." } },
      ],
    },
  ],
};

/* ─── Header data ──────────────────────────────────────────────── */

const HEADER = {
  concept: {
    title: { es: "Concepto de diseño", en: "Design Concept" },
    body: {
      es: "Una vez definido el arquetipo de usuario, fue necesario crear un mapa que nos permitiera visualizar la propuesta de valor de CD,M y estructurar la información recolectada durante las fases anteriores del proyecto.",
      en: "Once our user archetype was defined, it was necessary to create a map that allowed us to visualize CD,M's value proposition and structure the information collected during the previous phases of the project.",
    },
  },
  user: {
    title: { es: "Usuario", en: "User" },
    body: {
      es: "María, 28 años. Profesional joven que vive en Bogotá y se informa a través de medios alternativos. Texto y video son sus formatos favoritos para consumir información. Usa redes sociales como canal principal. Alta preocupación por la situación actual de Colombia.",
      en: "María, 28 years old. A young professional living in Bogotá who gets informed through alternative media. Text and video are her favorite formats for consuming information. She uses social networks as her main channel. Highly concerned about Colombia's current situation.",
    },
  },
  needs: {
    title: { es: "Necesidades y oportunidades", en: "Needs & Opportunities" },
    items: {
      es: [
        "Falta de información verificada e imparcial sobre el conflicto armado",
        "Falta de espacios para dar voz a las víctimas",
        "Apatía de la sociedad colombiana frente al conflicto",
        "Transformación del periodismo tradicional en su forma de hablar del conflicto",
        "Auge de los contenidos digitales",
      ],
      en: [
        "Lack of verified and impartial information about the armed conflict",
        "Lack of spaces to give voice to victims",
        "Apathy of Colombian society toward the conflict",
        "Transformation of traditional journalism in how it talks about the conflict",
        "Boom of digital content",
      ],
    },
  },
};

/* ─── Utilities ────────────────────────────────────────────────── */

const findNode = (tree, path) => {
  let current = tree;
  for (const id of path) {
    const child = current.children?.find((c) => c.id === id);
    if (!child) return null;
    current = child;
  }
  return current;
};

const resolveColor = (tree, path) => {
  let color = tree.color;
  let current = tree;
  for (const id of path) {
    const child = current.children?.find((c) => c.id === id);
    if (!child) break;
    if (child.color) color = child.color;
    current = child;
  }
  return color;
};

/* Children orbit ON the circumference of the center circle.
   Their centers sit exactly on the edge of the main circle. */
const CENTER_PCT = 50; // Center circle width as % of container
const ORBIT_RADIUS = CENTER_PCT / 2; // = center circle radius in %

const getChildPositions = (count) => {
  const startAngle = -90;
  return Array.from({ length: count }, (_, i) => {
    const angle = startAngle + (360 / count) * i;
    const rad = (angle * Math.PI) / 180;
    return {
      left: 50 + ORBIT_RADIUS * Math.cos(rad),
      top: 50 + ORBIT_RADIUS * Math.sin(rad),
    };
  });
};

const getChildSize = (count) => (count > 8 ? 10 : count > 5 ? 12 : 14);

/* ─── Animation variants ──────────────────────────────────────── */

const childVariants = {
  initial: { opacity: 0, scale: 0 },
  animate: (i) => ({
    opacity: 1,
    scale: 1,
    transition: {
      type: "spring",
      stiffness: 220,
      damping: 20,
      delay: 0.18 + i * 0.055,
    },
  }),
};

/* ─── Component ────────────────────────────────────────────────── */

const EcosystemExplorer = () => {
  const { locale } = useI18n();
  const [path, setPath] = useState([]);
  const [selectedLeaf, setSelectedLeaf] = useState(null);
  const vizRef = useRef(null);

  /* ── State derivations ──────────────────────────────────────── */
  const activeNode = path.length === 0 ? TREE : findNode(TREE, path);
  const activeColor = resolveColor(TREE, path);
  const children = activeNode?.children || [];
  const hasChildren = children.length > 0;
  const positions = getChildPositions(children.length);
  const childSize = getChildSize(children.length);

  // Parent ghost info
  const parentPath = path.slice(0, -1);
  const parentNode =
    path.length > 0
      ? path.length === 1
        ? TREE
        : findNode(TREE, parentPath)
      : null;
  const parentColor =
    path.length > 0 ? resolveColor(TREE, parentPath) : null;

  /* ── Actions ────────────────────────────────────────────────── */
  const drillDown = useCallback((child) => {
    if (child.children?.length > 0) {
      setPath((prev) => [...prev, child.id]);
      setSelectedLeaf(null);
    } else {
      setSelectedLeaf((prev) => (prev?.id === child.id ? null : child));
    }
  }, []);

  const goBack = useCallback(() => {
    setPath((prev) => prev.slice(0, -1));
    setSelectedLeaf(null);
  }, []);

  const jumpTo = useCallback((level) => {
    setPath((prev) => prev.slice(0, level));
    setSelectedLeaf(null);
  }, []);

  /* ── Breadcrumb ─────────────────────────────────────────────── */
  const breadcrumb = [{ label: TREE.label, level: 0 }];
  let cursor = TREE;
  for (let i = 0; i < path.length; i++) {
    const child = cursor.children?.find((c) => c.id === path[i]);
    if (child) {
      breadcrumb.push({ label: child.label, level: i + 1 });
      cursor = child;
    }
  }

  return (
    <div className="flex flex-col gap-16">
      {/* ── Header ─────────────────────────────────────────── */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-10">
        {/* Card 1 — Usuario */}
        <div className="flex flex-col gap-3 p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
          <h4 className="text-xs font-mono uppercase tracking-widest text-secondary/40">
            {HEADER.user.title[locale]}
          </h4>
          <p className="text-sm text-secondary/70 leading-relaxed font-light">
            {HEADER.user.body[locale]}
          </p>
        </div>
        {/* Card 2 — Necesidades */}
        <div className="flex flex-col gap-3 p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
          <h4 className="text-xs font-mono uppercase tracking-widest text-secondary/40">
            {HEADER.needs.title[locale]}
          </h4>
          <ul className="space-y-1.5">
            {HEADER.needs.items[locale].map((item, i) => (
              <li
                key={i}
                className="flex items-start gap-2 text-sm text-secondary/70 font-light"
              >
                <span className="mt-1.5 h-1 w-1 rounded-full bg-secondary/20 shrink-0" />
                {item}
              </li>
            ))}
          </ul>
        </div>
        {/* Card 3 — Concepto de diseño */}
        <div className="flex flex-col gap-3 p-5 rounded-2xl border border-white/[0.06] bg-white/[0.02]">
          <h4 className="text-xs font-mono uppercase tracking-widest text-secondary/40">
            {HEADER.concept.title[locale]}
          </h4>
          <p className="text-sm text-secondary/70 leading-relaxed font-light">
            {HEADER.concept.body[locale]}
          </p>
        </div>
      </div>

      {/* ── Navigation bar ─────────────────────────────────── */}
      <div className="flex items-center gap-4 min-h-[28px]">
        {path.length > 0 && (
          <motion.button
            initial={{ opacity: 0, x: -8 }}
            animate={{ opacity: 1, x: 0 }}
            onClick={goBack}
            className="text-xs font-mono uppercase tracking-widest text-secondary/40 hover:text-primary transition-colors"
          >
            ← {locale === "es" ? "Volver" : "Back"}
          </motion.button>
        )}
        <div className="flex items-center gap-1.5 flex-wrap">
          {breadcrumb.map((crumb, i) => (
            <span key={`bc-${crumb.level}`} className="flex items-center gap-1.5">
              {i > 0 && (
                <span className="text-secondary/20 text-xs">/</span>
              )}
              <button
                onClick={() => jumpTo(crumb.level)}
                className={`text-xs font-mono tracking-wide transition-colors ${i === breadcrumb.length - 1
                    ? "text-primary"
                    : "text-secondary/30 hover:text-secondary/60"
                  }`}
              >
                {crumb.label[locale]?.replace(/\n/g, " ")}
              </button>
            </span>
          ))}
        </div>
      </div>

      {/* ── Interactive diagram ─────────────────────────────── */}
      <div className="flex flex-col items-center gap-8">
        <div
          ref={vizRef}
          className="relative w-full aspect-square max-w-[640px]"
        >
          {/* L0 — Ambient glow */}
          <div
            className="absolute inset-0 rounded-full pointer-events-none opacity-15"
            style={{
              background: `radial-gradient(circle at 50% 50%, ${activeColor}, transparent 60%)`,
            }}
          />

          {/* Background click target — click outside nodes to go back */}
          {path.length > 0 && (
            <button
              aria-label={locale === "es" ? "Volver al nivel anterior" : "Go back to previous level"}
              onClick={goBack}
              className="absolute inset-0 z-[1] cursor-pointer"
            />
          )}

          {/* L1 — Parent ghost (blurred context circle) */}
          <AnimatePresence>
            {parentNode && (
              <motion.div
                key={`ghost-${parentPath.join("/")}`}
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 1.1 }}
                transition={{ duration: 0.5, ease: "easeOut" }}
                className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
              >
                <div
                  className="w-[62%] aspect-square rounded-full flex items-center justify-center"
                  style={{
                    background: `radial-gradient(circle, ${parentColor}08 0%, transparent 70%)`,
                    border: `1px solid ${parentColor}08`,
                    filter: "blur(10px)",
                  }}
                >
                  <span
                    className="text-base md:text-lg font-semibold whitespace-pre-line text-center select-none"
                    style={{ color: `${parentColor}18` }}
                  >
                    {parentNode.label[locale]}
                  </span>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

          {/* L2 — Orbit ring indicator */}
          {hasChildren && (
            <svg
              className="absolute inset-0 w-full h-full pointer-events-none z-[1]"
              viewBox="0 0 100 100"
            >
              <circle
                cx="50"
                cy="50"
                r={ORBIT_RADIUS}
                fill="none"
                stroke="rgba(255,255,255,0.035)"
                strokeWidth="0.25"
                strokeDasharray="1.2 3"
              />
            </svg>
          )}

          {/* L3 — Center node (with parallax) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`center-${path.join("/")}`}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ duration: 0.4, ease: "easeOut" }}
              className="absolute inset-0 z-[2] pointer-events-none"
            >
              {/* Center halo */}
              <div
                className="absolute pointer-events-none rounded-full"
                style={{
                  left: `${50 - (CENTER_PCT + 8) / 2}%`,
                  top: `${50 - (CENTER_PCT + 8) / 2}%`,
                  width: `${CENTER_PCT + 8}%`,
                  height: `${CENTER_PCT + 8}%`,
                  background: `radial-gradient(circle, ${activeColor}10 30%, transparent 70%)`,
                }}
              />

              {/* Center circle */}
              <div
                className="absolute"
                style={{
                  left: `${50 - CENTER_PCT / 2}%`,
                  top: `${50 - CENTER_PCT / 2}%`,
                  width: `${CENTER_PCT}%`,
                  height: `${CENTER_PCT}%`,
                }}
              >
                <div
                  className="w-full h-full rounded-full flex items-center justify-center text-center cursor-default"
                  style={{
                    background: `radial-gradient(circle at 40% 35%, ${activeColor}15 0%, ${activeColor}06 100%)`,
                    border: `1px solid ${activeColor}25`,
                    boxShadow: `0 0 60px ${activeColor}12, 0 0 120px ${activeColor}06, inset 0 1px 0 ${activeColor}10`,
                  }}
                >
                  <span className="text-sm md:text-base font-semibold text-white/85 whitespace-pre-line leading-tight select-none">
                    {activeNode?.label[locale]}
                  </span>
                </div>
              </div>
            </motion.div>
          </AnimatePresence>

          {/* L4 — Child nodes (with parallax, overlapping center edge) */}
          <AnimatePresence mode="wait">
            <motion.div
              key={`children-${path.join("/")}`}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.3 }}
              className="absolute inset-0 z-[3] pointer-events-none"
            >
              {children.map((child, i) => {
                const pos = positions[i];
                const nodeColor = child.color || activeColor;
                const isLeaf = !child.children?.length;
                const isSelected = selectedLeaf?.id === child.id;

                return (
                  <div
                    key={child.id}
                    className="absolute"
                    style={{
                      left: `${pos.left - childSize / 2}%`,
                      top: `${pos.top - childSize / 2}%`,
                      width: `${childSize}%`,
                      height: `${childSize}%`,
                    }}
                  >
                    <motion.button
                      custom={i}
                      variants={childVariants}
                      initial="initial"
                      animate="animate"
                      onClick={() => drillDown(child)}
                      className="w-full h-full rounded-full flex items-center justify-center text-center relative group cursor-pointer pointer-events-auto"
                      style={{
                        backgroundColor: isSelected
                          ? `${nodeColor}20`
                          : "rgba(255,255,255,0.05)",
                        border: isSelected
                          ? `1px solid ${nodeColor}50`
                          : "1px solid rgba(255,255,255,0.08)",
                        boxShadow: isSelected
                          ? `0 0 16px ${nodeColor}20`
                          : "none",
                      }}
                      whileHover={{
                        scale: 1.14,
                        backgroundColor: `${nodeColor}18`,
                        borderColor: `${nodeColor}45`,
                        boxShadow: `0 0 24px ${nodeColor}30`,
                      }}
                      whileTap={{ scale: 0.92 }}
                    >
                      <span className="text-[0.45rem] md:text-[0.6rem] text-white/60 group-hover:text-white/90 whitespace-pre-line leading-tight px-1 select-none transition-colors duration-200">
                        {child.label[locale]}
                      </span>

                      {!isLeaf && (
                        <span
                          className="absolute -bottom-0.5 -right-0.5 w-3 h-3 md:w-3.5 md:h-3.5 rounded-full flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-200"
                          style={{
                            backgroundColor: `${nodeColor}25`,
                            border: `1px solid ${nodeColor}40`,
                          }}
                        >
                          <span
                            className="text-[7px] font-bold"
                            style={{ color: `${nodeColor}CC` }}
                          >
                            +
                          </span>
                        </span>
                      )}
                    </motion.button>
                  </div>
                );
              })}
            </motion.div>
          </AnimatePresence>

          {/* Deepest level indicator */}
          {!hasChildren && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="absolute bottom-[6%] left-0 right-0 text-center text-[10px] text-secondary/30 font-mono uppercase tracking-widest z-[5]"
            >
              {locale === "es" ? "Nivel más profundo" : "Deepest level"}
            </motion.p>
          )}
        </div>

        {/* ── Description panel ───────────────────────────── */}
        <AnimatePresence mode="wait">
          <motion.div
            key={selectedLeaf?.id || path.join("/")}
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -6 }}
            transition={{ duration: 0.3 }}
            className="text-center max-w-md"
          >
            {selectedLeaf ? (
              <>
                <p className="text-sm font-semibold text-primary mb-1.5">
                  {selectedLeaf.label[locale]?.replace(/\n/g, " ")}
                </p>
                <p className="text-sm text-secondary/60 leading-relaxed font-light whitespace-pre-line">
                  {selectedLeaf.description?.[locale]}
                </p>
              </>
            ) : (
              activeNode?.description && (
                <p className="text-sm text-secondary/60 leading-relaxed font-light whitespace-pre-line">
                  {activeNode.description[locale]}
                </p>
              )
            )}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
};

export default EcosystemExplorer;
