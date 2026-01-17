import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Shield, Lock, EyeOff, Database } from "lucide-react";

const privacyItems = [
  { icon: Database, text: "No almacenamos contenido completo" },
  { icon: EyeOff, text: "No leemos adjuntos" },
  { icon: Lock, text: "No vendemos datos" },
  { icon: Shield, text: "Solo guardamos decisiones, no correos" },
];

export const Privacy = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 px-6 bg-secondary/30">
      <div className="container max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <p className="text-sm uppercase tracking-widest text-primary mb-6">
            Privacidad
          </p>
          
          <h2 className="text-headline md:text-display-sm mb-4">
            Tu correo sigue siendo <span className="text-gradient">tuyo</span>
          </h2>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4">
          {privacyItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.5 }}
              className="flex items-center gap-4 p-5 rounded-xl bg-card border border-border"
            >
              <div className="w-10 h-10 rounded-lg bg-primary/10 flex items-center justify-center flex-shrink-0">
                <item.icon className="w-5 h-5 text-primary" />
              </div>
              <p className="text-text-secondary">{item.text}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-lg text-text-secondary">
            Aquí no vienes a entregar información.
          </p>
          <p className="text-xl text-primary font-semibold mt-2">
            Vienes a recuperar control.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
