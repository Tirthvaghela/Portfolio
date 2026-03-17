"use client";
import { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

export default function Loader() {
  const [visible, setVisible] = useState(true);

  useEffect(() => {
    const t = setTimeout(() => setVisible(false), 2200);
    return () => clearTimeout(t);
  }, []);

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          key="loader"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0, transition: { duration: 0.5, ease: "easeInOut" } }}
          style={{
            position: "fixed", inset: 0, zIndex: 9999,
            background: "#fff",
            display: "flex", alignItems: "center", justifyContent: "center",
            flexDirection: "column", gap: 24,
          }}
        >
          {/* TV. initials */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            animate={{ opacity: 1, scale: 1, transition: { duration: 0.5, ease: [0.22, 1, 0.36, 1] } }}
            style={{ fontSize: "clamp(64px, 12vw, 120px)", fontWeight: 900, letterSpacing: "-4px", lineHeight: 1, color: "#111" }}
          >
            TV<span style={{ color: "#2563eb" }}>.</span>
          </motion.div>

          {/* Progress bar */}
          <div style={{ width: "clamp(80px, 20vw, 120px)", height: 2, background: "#f0f0f0", borderRadius: 2, overflow: "hidden" }}>
            <motion.div
              initial={{ width: "0%" }}
              animate={{ width: "100%", transition: { duration: 1.6, delay: 0.3, ease: "easeInOut" } }}
              style={{ height: "100%", background: "#2563eb", borderRadius: 2 }}
            />
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
