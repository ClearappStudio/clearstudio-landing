import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Mail, GitBranch, EyeOff, CheckCircle2, Archive, Sparkles } from "lucide-react";

const steps = [
  { icon: Mail, text: "Llega un correo", number: "1" },
  { icon: GitBranch, text: "Tomas una decisión (5 opciones)", number: "2" },
  { icon: EyeOff, text: "El correo desaparece del inbox", number: "3" },
  { icon: CheckCircle2, text: "Vive solo mientras tiene función", number: "4" },
  { icon: Archive, text: "Se archiva", number: "5" },
  { icon: Sparkles, text: "Fin", number: "6" },
];

export const HowItWorks = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 px-6">
      <div className="container max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-sm uppercase tracking-widest text-primary mb-6">
            Cómo funciona
          </p>
          
          <h2 className="text-headline md:text-display-sm">
            Sin fricción
          </h2>
        </motion.div>

        <div className="relative">
          {/* Vertical line */}
          <div className="absolute left-6 top-0 bottom-0 w-px bg-gradient-to-b from-primary/50 via-primary/20 to-transparent md:left-1/2 md:-translate-x-1/2" />

          <div className="space-y-8">
            {steps.map((step, index) => (
              <motion.div
                key={step.number}
                initial={{ opacity: 0, x: index % 2 === 0 ? -30 : 30 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
                className={`relative flex items-center gap-6 ${
                  index % 2 === 0 ? "md:flex-row" : "md:flex-row-reverse"
                }`}
              >
                {/* Number circle */}
                <div className="relative z-10 w-12 h-12 rounded-full bg-background border-2 border-primary flex items-center justify-center flex-shrink-0 md:absolute md:left-1/2 md:-translate-x-1/2">
                  <span className="text-primary font-bold">{step.number}</span>
                </div>

                {/* Content */}
                <div className={`flex-1 pl-6 md:pl-0 ${
                  index % 2 === 0 ? "md:pr-[calc(50%+2rem)] md:text-right" : "md:pl-[calc(50%+2rem)]"
                }`}>
                  <div className={`inline-flex items-center gap-3 px-5 py-3 rounded-xl bg-card border border-border ${
                    index % 2 === 0 ? "md:flex-row-reverse" : ""
                  }`}>
                    <step.icon className="w-5 h-5 text-primary flex-shrink-0" />
                    <span className="text-foreground font-medium">{step.text}</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 1, duration: 0.6 }}
          className="mt-16 text-center space-y-2"
        >
          <p className="text-lg text-text-secondary">No se queda rondando.</p>
          <p className="text-lg text-text-secondary">No vuelve a molestarte.</p>
          <p className="text-lg text-primary font-medium">No ocupa espacio mental.</p>
        </motion.div>
      </div>
    </section>
  );
};
