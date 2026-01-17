import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { X } from "lucide-react";

const notForList = [
  "Te gusta tener cientos de correos visibles",
  "Prefieres clasificar en mil carpetas",
  "Quieres que una IA decida por ti",
  "Buscas otro cliente de email genérico",
];

export const NotForYou = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 px-6">
      <div className="container max-w-3xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-12"
        >
          <p className="text-sm uppercase tracking-widest text-muted-foreground mb-6">
            Filtro
          </p>
          
          <h2 className="text-headline md:text-display-sm">
            Lo que <span className="text-muted-foreground">no es</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="card-elevated p-8"
        >
          <p className="text-lg text-text-secondary mb-6 text-center">
            Este sistema no es para ti si:
          </p>

          <ul className="space-y-4">
            {notForList.map((item, index) => (
              <motion.li
                key={index}
                initial={{ opacity: 0, x: -10 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ delay: 0.4 + index * 0.1, duration: 0.4 }}
                className="flex items-center gap-4 text-muted-foreground"
              >
                <X className="w-5 h-5 text-muted-foreground/50 flex-shrink-0" />
                {item}
              </motion.li>
            ))}
          </ul>

          <motion.p
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.9, duration: 0.5 }}
            className="text-center mt-8 text-primary font-medium"
          >
            Y está bien así.
          </motion.p>
        </motion.div>
      </div>
    </section>
  );
};
