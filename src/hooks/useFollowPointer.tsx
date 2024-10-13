import { useMotionValue, useSpring, frame } from "framer-motion";
import { RefObject, useEffect, useState } from "react";

const spring = { damping: 5, stiffness: 100, restDelta: 5 };

export function useFollowPointer(ref: RefObject<HTMLElement>) {
  const xPoint = useMotionValue(0);
  const yPoint = useMotionValue(0);
  const x = useSpring(xPoint, spring);
  const y = useSpring(yPoint, spring);

  // State to track pointer size
  const [pointerSize, setPointerSize] = useState(20); // Default size

  useEffect(() => {
    if (!ref.current) return;

    const handlePointerMove = ({ clientX, clientY }: MouseEvent) => {
      const element = ref.current!;
      frame.read(() => {
        xPoint.set(clientX - element.offsetLeft - element.offsetWidth / 2);
        yPoint.set(clientY - element.offsetTop - element.offsetHeight / 2);
      });
    };

    const handleMouseEnter = () => {
      setPointerSize(40); // Increase size when hovering over a button or link
    };

    const handleMouseLeave = () => {
      setPointerSize(20); // Reset size when not hovering
    };

    // Adding event listeners for hover effects
    const buttonsAndLinks = document.querySelectorAll("button, a");
    buttonsAndLinks.forEach((el) => {
      el.addEventListener("mouseenter", handleMouseEnter);
      el.addEventListener("mouseleave", handleMouseLeave);
    });

    window.addEventListener("pointermove", handlePointerMove);

    return () => {
      // Cleanup event listeners
      window.removeEventListener("pointermove", handlePointerMove);
      buttonsAndLinks.forEach((el) => {
        el.removeEventListener("mouseenter", handleMouseEnter);
        el.removeEventListener("mouseleave", handleMouseLeave);
      });
    };
  }, [ref, xPoint, yPoint]);

  return { x, y, pointerSize };
}
