import React, { ReactNode } from "react";
import { ForwardRefComponent, HTMLMotionProps, motion } from "framer-motion";

interface Props extends HTMLMotionProps<"div">{
  children: ReactNode;
}

function DribbleHoverAnimation({ children, ...props }: Props) {
  return (
    <motion.div
      whileHover={{
        scale: 1.1,
        y: -10,
        boxShadow: "0px 10px 30px rgba(167, 139, 250, 0.3)",
      }}
      transition={{
        type: "spring",
        stiffness: 400,
        damping: 10,
      }}
      {...props}
    >
      {children}
    </motion.div>
  );
}

export default DribbleHoverAnimation;
