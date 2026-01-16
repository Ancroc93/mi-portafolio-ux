import { useEffect, useState } from "react";
import { motion } from "framer-motion";

export default function CustomCursor() {
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
    const [isHovered, setIsHovered] = useState(false);

    useEffect(() => {
        const mouseMove = (e) => {
            setMousePosition({
                x: e.clientX,
                y: e.clientY,
            });
        };

        const handleHoverStart = (e) => {
            if (
                e.target.tagName === "A" ||
                e.target.tagName === "BUTTON" ||
                e.target.closest("a") ||
                e.target.closest("button")
            ) {
                setIsHovered(true);
            }
        };

        const handleHoverEnd = () => {
            setIsHovered(false);
        };

        window.addEventListener("mousemove", mouseMove);
        window.addEventListener("mouseover", handleHoverStart);
        window.addEventListener("mouseout", handleHoverEnd);

        return () => {
            window.removeEventListener("mousemove", mouseMove);
            window.removeEventListener("mouseover", handleHoverStart);
            window.removeEventListener("mouseout", handleHoverEnd);
        };
    }, []);

    const variants = {
        default: {
            x: mousePosition.x - 8,
            y: mousePosition.y - 8,
            height: 16,
            width: 16,
            backgroundColor: "white",
            mixBlendMode: "difference",
        },
        hover: {
            x: mousePosition.x - 32,
            y: mousePosition.y - 32,
            height: 64,
            width: 64,
            backgroundColor: "white",
            mixBlendMode: "difference",
        },
    };

    return (
        <motion.div
            className="fixed top-0 left-0 z-50 rounded-full pointer-events-none hidden md:block"
            variants={variants}
            animate={isHovered ? "hover" : "default"}
            transition={{
                type: "spring",
                stiffness: 150,
                damping: 15,
                mass: 0.1,
            }}
        />
    );
}
