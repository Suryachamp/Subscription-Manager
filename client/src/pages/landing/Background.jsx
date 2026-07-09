import { motion } from "motion/react";

function Background() {
  return (
    <div className="pointer-events-none absolute inset-0 -z-10 overflow-hidden bg-[#fdfdfd]">
      <div className="bg-grid absolute inset-0 opacity-60" />

      {/* Large soft orange patch — top left */}
      <motion.div
        animate={{ x: [0, 50, 0], y: [0, -40, 0] }}
        transition={{ duration: 25, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -left-32 -top-32 h-[600px] w-[600px] rounded-full mix-blend-multiply filter blur-[80px]"
        style={{ background: "rgba(249, 115, 22, 0.15)" }}
      />
      
      {/* Peach/Pink soft patch — center right */}
      <motion.div
        animate={{ x: [0, -40, 0], y: [0, 60, 0] }}
        transition={{ duration: 30, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -right-20 top-1/4 h-[500px] w-[500px] rounded-full mix-blend-multiply filter blur-[80px]"
        style={{ background: "rgba(251, 146, 60, 0.12)" }}
      />

      {/* Warm amber patch — bottom center */}
      <motion.div
        animate={{ x: [0, 60, 0], y: [0, -30, 0] }}
        transition={{ duration: 20, repeat: Infinity, ease: "easeInOut" }}
        className="absolute -bottom-40 left-1/3 h-[700px] w-[700px] rounded-full mix-blend-multiply filter blur-[100px]"
        style={{ background: "rgba(253, 186, 116, 0.1)" }}
      />
    </div>
  );
}

export default Background;