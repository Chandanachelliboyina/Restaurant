import { useRouter } from "@tanstack/react-router";
import { ArrowLeft } from "lucide-react";
import { motion } from "motion/react";

export function BackButton() {
  const router = useRouter();

  return (
    <motion.button
      type="button"
      initial={{ opacity: 0, x: -12 }}
      animate={{ opacity: 1, x: 0 }}
      transition={{ duration: 0.4, ease: [0.16, 1, 0.3, 1] }}
      onClick={() => {
        if (typeof window !== "undefined" && window.history.length > 1) {
          router.history.back();
        } else {
          router.navigate({ to: "/" });
        }
      }}
      aria-label="Go back"
      className="group inline-flex items-center gap-2 rounded-full border border-primary/40 bg-background/40 px-4 py-2 text-xs font-semibold uppercase tracking-[0.25em] text-foreground/90 backdrop-blur-md transition hover:border-primary hover:bg-primary/10 hover:text-primary"
    >
      <ArrowLeft className="h-4 w-4 transition group-hover:-translate-x-0.5" />
      Back
    </motion.button>
  );
}
