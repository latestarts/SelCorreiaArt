import type { ReactNode } from "react";
import { motion } from "framer-motion";

type MotionRevealProps = {
  children: ReactNode;
  className?: string;
  delay?: number;
  direction?: "up" | "left" | "right";
};

const offsetByDirection = {
  up: { x: 0, y: 24 },
  left: { x: 28, y: 0 },
  right: { x: -28, y: 0 },
};

const MotionReveal = ({
  children,
  className,
  delay = 0,
  direction = "up",
}: MotionRevealProps) => {
  const offset = offsetByDirection[direction];

  return (
    <motion.div
      className={className}
      initial={{ opacity: 0, x: offset.x, y: offset.y }}
      whileInView={{ opacity: 1, x: 0, y: 0 }}
      viewport={{ once: false, amount: 0.18 }}
      transition={{ duration: 0.55, delay, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
};

export default MotionReveal;
