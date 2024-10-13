import { assets } from "@/assets";
import { useFollowPointer } from "@/hooks/useFollowPointer";
import { useRef } from "react";
import { motion } from "framer-motion";

export default function FollowPointer() {
  const ref = useRef<HTMLImageElement>(null);
  const { x, y, pointerSize } = useFollowPointer(ref);

  return (
    <motion.img
      ref={ref}
      style={{ x, y, width: pointerSize, height: pointerSize }}
      src={assets.svgs.logoIcon}
      alt="Coiton Logo"
      className="pointer-events-none fixed left-0 top-0 z-[9999] hidden size-6 object-contain transition-[width,height] duration-200 ease-in-out md:block"
    />
  );
}
