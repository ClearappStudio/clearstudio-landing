import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { X } from "lucide-react";

const falseOrganizers = ["Carpetas infinitas", "Etiquetas sin fin", "Reglas complejas"];

export const Truth = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 px-6 bg-secondary/30">
      <div className="container max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <h2 className="text-headline md:text-display-sm mb-4">
            Clasificar <span className="text-muted-foreground line-through">no funciona</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          animate={isInView ? { opacity: 1, scale: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="flex flex-wrap justify-center gap-4 mb-12"
        >
          {falseOrganizers.map((item, index) => (
            <div
              key={index}
              className="flex items-center gap-2 px-5 py-3 rounded-xl bg-card border border-border text-muted-foreground"
            >
              <X className="w-4 h-4 text-destructive" />
              <span>{item}</span>
            </div>
          ))}
        </motion.div>

        <motion.p
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.6 }}
          className="text-lg text-text-secondary text-center mb-8"
        >
          Todo eso no reduce carga mental.
          <br />
          <span className="text-muted-foreground">Solo la disfraza.</span>
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.7, duration: 0.6 }}
          className="card-elevated p-8 text-center"
        >
          <p className="text-xl text-foreground mb-2">
            El problema no es organizar mejor el correo.
          </p>
          <p className="text-xl text-primary font-semibold">
            El problema es que se queda abierto.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
