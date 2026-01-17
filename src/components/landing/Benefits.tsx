import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Quote } from "lucide-react";

const testimonials = [
  "Ahora sé exactamente qué tengo pendiente",
  "Ya no me genera ansiedad abrir el correo",
  "He dejado de usar el inbox como lista de tareas",
  "Archivo sin miedo",
  "Pienso menos en el email",
];

export const Benefits = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 px-6 bg-secondary/30">
      <div className="container max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-sm uppercase tracking-widest text-primary mb-6">
            Lo que cambia
          </p>
          
          <h2 className="text-headline md:text-display-sm mb-4">
            Beneficio real
          </h2>
          
          <p className="text-lg text-muted-foreground">
            Las personas que usan este sistema dicen cosas como:
          </p>
        </motion.div>

        <div className="space-y-4">
          {testimonials.map((quote, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
              className="flex items-center gap-4 p-5 rounded-xl bg-card border border-border hover:border-primary/30 transition-colors"
            >
              <Quote className="w-5 h-5 text-primary flex-shrink-0" />
              <p className="text-lg text-foreground">"{quote}"</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.9, duration: 0.6 }}
          className="mt-12 text-center"
        >
          <p className="text-xl text-text-secondary">No es productividad.</p>
          <p className="text-2xl text-gradient font-bold mt-2">Es claridad.</p>
        </motion.div>
      </div>
    </section>
  );
};
