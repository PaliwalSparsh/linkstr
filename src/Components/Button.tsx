import { motion, HTMLMotionProps } from "framer-motion";
import { pressScale, pressTransition } from "../lib/motion";

const Button = ({ children, ...props }: HTMLMotionProps<"button">) => (
  <motion.button
    whileTap={pressScale}
    transition={pressTransition}
    {...props}
  >
    {children}
  </motion.button>
);

export default Button;
