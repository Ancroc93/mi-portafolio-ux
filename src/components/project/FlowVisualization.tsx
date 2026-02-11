import { useRef, useState, useEffect, useMemo, useCallback } from "react";
import { useInView } from "framer-motion";

/* ------------------------------------------------------------------ */
/*  Data model                                                         */
/* ------------------------------------------------------------------ */

interface FlowNode {
    id: string;
    label: string;
    x: number;   // SVG viewBox x (0–1000)
    y: number;   // SVG viewBox y (0–500)
    col: number; // column index for staggered reveal
}

// Nodes across 8 columns — illustrative registration flow
const nodes: FlowNode[] = [
    // Col 0 — Entry
    { id: "start", label: "Inicio", x: 50, y: 250, col: 0 },
    // Col 1 — Branching
    { id: "tipo", label: "Tipo PJ", x: 170, y: 110, col: 1 },
    { id: "pais", label: "País", x: 170, y: 250, col: 1 },
    { id: "giro", label: "Actividad", x: 170, y: 390, col: 1 },
    // Col 2 — Data collection
    { id: "cuit", label: "CUIT", x: 310, y: 80, col: 2 },
    { id: "razon", label: "Razón Social", x: 310, y: 185, col: 2 },
    { id: "domicilio", label: "Domicilio", x: 310, y: 290, col: 2 },
    { id: "contacto", label: "Contacto", x: 310, y: 395, col: 2 },
    // Col 3 — Processing
    { id: "ai-fill", label: "AI Auto-fill", x: 440, y: 120, col: 3 },
    { id: "validar", label: "Validación", x: 440, y: 260, col: 3 },
    { id: "upload", label: "Docs", x: 440, y: 395, col: 3 },
    // Col 4 — Verification
    { id: "ocr", label: "OCR", x: 570, y: 80, col: 4 },
    { id: "verif", label: "Identidad", x: 570, y: 190, col: 4 },
    { id: "match", label: "Matching", x: 570, y: 305, col: 4 },
    { id: "score", label: "Scoring", x: 570, y: 415, col: 4 },
    // Col 5 — Compliance
    { id: "kyb", label: "KYB", x: 700, y: 60, col: 5 },
    { id: "kyc", label: "KYC", x: 700, y: 160, col: 5 },
    { id: "aml", label: "AML", x: 700, y: 255, col: 5 },
    { id: "pep", label: "PEP", x: 700, y: 345, col: 5 },
    { id: "ubo", label: "UBO", x: 700, y: 438, col: 5 },
    // Col 6 — Review
    { id: "auto-rev", label: "Auto Review", x: 835, y: 120, col: 6 },
    { id: "manual-rev", label: "Review", x: 835, y: 275, col: 6 },
    { id: "escalar", label: "Escalamiento", x: 835, y: 405, col: 6 },
    // Col 7 — Outcome
    { id: "ok", label: "Aprobado", x: 955, y: 105, col: 7 },
    { id: "pending", label: "Pendiente", x: 955, y: 265, col: 7 },
    { id: "retry", label: "Reintento", x: 955, y: 405, col: 7 },
];

const nodeMap = new Map(nodes.map((n) => [n.id, n]));

// Edges — connections between nodes
const edges: [string, string][] = [
    ["start", "tipo"], ["start", "pais"], ["start", "giro"],
    ["tipo", "cuit"], ["tipo", "razon"],
    ["pais", "domicilio"], ["pais", "contacto"],
    ["giro", "cuit"], ["giro", "upload"],
    ["cuit", "ai-fill"], ["cuit", "validar"],
    ["razon", "ai-fill"],
    ["domicilio", "validar"],
    ["contacto", "validar"], ["contacto", "upload"],
    ["ai-fill", "ocr"], ["ai-fill", "verif"],
    ["validar", "match"], ["validar", "score"],
    ["upload", "ocr"], ["upload", "match"],
    ["ocr", "kyb"], ["ocr", "kyc"],
    ["verif", "kyc"], ["verif", "aml"],
    ["match", "aml"], ["match", "pep"],
    ["score", "pep"], ["score", "ubo"],
    ["kyb", "auto-rev"],
    ["kyc", "auto-rev"], ["kyc", "manual-rev"],
    ["aml", "manual-rev"],
    ["pep", "manual-rev"], ["pep", "escalar"],
    ["ubo", "escalar"],
    ["auto-rev", "ok"], ["auto-rev", "pending"],
    ["manual-rev", "ok"], ["manual-rev", "pending"], ["manual-rev", "retry"],
    ["escalar", "pending"], ["escalar", "retry"],
];

// Predefined journeys (complete paths through the flow)
const journeys: string[][] = [
    ["start", "tipo", "cuit", "ai-fill", "ocr", "kyb", "auto-rev", "ok"],
    ["start", "pais", "domicilio", "validar", "match", "aml", "manual-rev", "ok"],
    ["start", "giro", "upload", "match", "pep", "escalar", "retry"],
    ["start", "tipo", "cuit", "ai-fill", "verif", "kyc", "auto-rev", "ok"],
    ["start", "pais", "contacto", "validar", "score", "ubo", "escalar", "pending"],
];

/* ------------------------------------------------------------------ */
/*  Utilities                                                          */
/* ------------------------------------------------------------------ */

const getEdgePath = (from: FlowNode, to: FlowNode): string => {
    const dx = to.x - from.x;
    const cp = dx * 0.4;
    return `M ${from.x} ${from.y} C ${from.x + cp} ${from.y}, ${to.x - cp} ${to.y}, ${to.x} ${to.y}`;
};

const edgeId = (a: string, b: string) => `${a}--${b}`;

const getJourneyEdgeIds = (journey: string[]): Set<string> => {
    const s = new Set<string>();
    for (let i = 0; i < journey.length - 1; i++) {
        s.add(edgeId(journey[i], journey[i + 1]));
    }
    return s;
};

/* ------------------------------------------------------------------ */
/*  Component                                                          */
/* ------------------------------------------------------------------ */

interface FlowVisualizationProps {
    accentColor?: string;
    className?: string;
}

const FlowVisualization = ({
    accentColor = "#2D6AE0",
    className = "",
}: FlowVisualizationProps) => {
    const containerRef = useRef<HTMLDivElement>(null);
    const isInView = useInView(containerRef, { once: true, margin: "-60px" });
    const [activeJourney, setActiveJourney] = useState(0);
    const [hoveredNode, setHoveredNode] = useState<string | null>(null);
    const [isRevealed, setIsRevealed] = useState(false);

    // Trigger reveal after entering viewport
    useEffect(() => {
        if (isInView && !isRevealed) {
            const t = setTimeout(() => setIsRevealed(true), 200);
            return () => clearTimeout(t);
        }
    }, [isInView, isRevealed]);

    // Auto-cycle journeys (pause on hover)
    useEffect(() => {
        if (!isRevealed || hoveredNode) return;
        const interval = setInterval(() => {
            setActiveJourney((prev) => (prev + 1) % journeys.length);
        }, 4000);
        return () => clearInterval(interval);
    }, [isRevealed, hoveredNode]);

    // Compute which nodes/edges are active
    const { activeNodeIds, activeEdgeIds } = useMemo(() => {
        if (hoveredNode) {
            const relevant = journeys.filter((j) => j.includes(hoveredNode));
            const nIds = new Set<string>();
            const eIds = new Set<string>();
            for (const j of relevant) {
                for (const id of j) nIds.add(id);
                for (let i = 0; i < j.length - 1; i++) {
                    eIds.add(edgeId(j[i], j[i + 1]));
                }
            }
            return { activeNodeIds: nIds, activeEdgeIds: eIds };
        }
        const journey = journeys[activeJourney];
        return {
            activeNodeIds: new Set(journey),
            activeEdgeIds: getJourneyEdgeIds(journey),
        };
    }, [activeJourney, hoveredNode]);

    // Pre-compute edge SVG data
    const edgeData = useMemo(
        () =>
            edges.map(([fromId, toId]) => {
                const from = nodeMap.get(fromId)!;
                const to = nodeMap.get(toId)!;
                return {
                    id: edgeId(fromId, toId),
                    path: getEdgePath(from, to),
                    col: from.col,
                };
            }),
        []
    );

    const handleNodeHover = useCallback((id: string | null) => {
        setHoveredNode(id);
    }, []);

    return (
        <div className={`w-full py-20 md:py-24 ${className}`} ref={containerRef}>
            <div className="mx-auto max-w-6xl px-6">
                {/* Scrollable on mobile */}
                <div className="overflow-x-auto -mx-6 px-6 md:overflow-visible md:mx-0 md:px-0">
                    <div
                        className="relative min-w-[720px] md:min-w-0"
                        style={{ aspectRatio: "2 / 1" }}
                    >
                        {/* ---- SVG layer: edges + traveling dots ---- */}
                        <svg
                            viewBox="0 0 1000 500"
                            fill="none"
                            className="absolute inset-0 w-full h-full pointer-events-none"
                            style={{ overflow: "visible" }}
                        >
                            <defs>
                                <filter
                                    id="flow-glow"
                                    x="-50%"
                                    y="-50%"
                                    width="200%"
                                    height="200%"
                                >
                                    <feGaussianBlur stdDeviation="4" result="blur" />
                                    <feMerge>
                                        <feMergeNode in="blur" />
                                        <feMergeNode in="SourceGraphic" />
                                    </feMerge>
                                </filter>
                                <filter
                                    id="dot-glow"
                                    x="-200%"
                                    y="-200%"
                                    width="500%"
                                    height="500%"
                                >
                                    <feGaussianBlur stdDeviation="6" result="blur" />
                                    <feMerge>
                                        <feMergeNode in="blur" />
                                        <feMergeNode in="SourceGraphic" />
                                    </feMerge>
                                </filter>
                            </defs>

                            {edgeData.map((edge) => {
                                const isActive = isRevealed && activeEdgeIds.has(edge.id);
                                return (
                                    <g key={edge.id}>
                                        {/* Base dim edge */}
                                        <path
                                            d={edge.path}
                                            stroke="rgba(255,255,255,0.06)"
                                            strokeWidth={1.5}
                                            fill="none"
                                            style={{
                                                opacity: isRevealed ? 1 : 0,
                                                transition: `opacity 800ms ease ${edge.col * 150}ms`,
                                            }}
                                        />

                                        {/* Active highlighted edge */}
                                        {isActive && (
                                            <>
                                                <path
                                                    id={`fp-${edge.id}`}
                                                    d={edge.path}
                                                    stroke={accentColor}
                                                    strokeWidth={2}
                                                    fill="none"
                                                    filter="url(#flow-glow)"
                                                    opacity={0.7}
                                                />
                                                {/* Traveling light dot */}
                                                <circle
                                                    r="4"
                                                    fill={accentColor}
                                                    filter="url(#dot-glow)"
                                                    opacity={0.9}
                                                >
                                                    <animateMotion
                                                        dur="2.5s"
                                                        repeatCount="indefinite"
                                                    >
                                                        <mpath href={`#fp-${edge.id}`} />
                                                    </animateMotion>
                                                </circle>
                                            </>
                                        )}
                                    </g>
                                );
                            })}
                        </svg>

                        {/* ---- HTML layer: glassmorphism nodes ---- */}
                        {nodes.map((node) => {
                            const isActive = isRevealed && activeNodeIds.has(node.id);
                            return (
                                <div
                                    key={node.id}
                                    className={`
                                        absolute -translate-x-1/2 -translate-y-1/2
                                        px-3 py-1.5 rounded-full
                                        text-[10px] font-mono uppercase tracking-wider
                                        border backdrop-blur-sm
                                        cursor-pointer select-none whitespace-nowrap
                                        transition-all duration-500
                                        ${isActive
                                            ? "border-white/25 bg-white/10 text-white"
                                            : "border-white/[0.06] bg-white/[0.03] text-white/25"
                                        }
                                    `}
                                    style={{
                                        left: `${node.x / 10}%`,
                                        top: `${node.y / 5}%`,
                                        opacity: isRevealed ? 1 : 0,
                                        transition: `all 500ms ease ${node.col * 150 + 50}ms`,
                                        boxShadow: isActive
                                            ? `0 0 20px ${accentColor}30, 0 0 40px ${accentColor}10`
                                            : "none",
                                    }}
                                    onMouseEnter={() => handleNodeHover(node.id)}
                                    onMouseLeave={() => handleNodeHover(null)}
                                >
                                    {node.label}
                                </div>
                            );
                        })}
                    </div>
                </div>

                {/* Hint text */}
                <p
                    className="text-center text-[11px] font-mono text-secondary/30 uppercase tracking-widest mt-8 transition-opacity duration-700"
                    style={{ opacity: isRevealed ? 1 : 0 }}
                >
                    Hover sobre un nodo para explorar caminos
                </p>
            </div>
        </div>
    );
};

export default FlowVisualization;
