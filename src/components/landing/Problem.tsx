import { motion } from "framer-motion";
import { useInView } from "framer-motion";
import { useRef } from "react";

const problems = [
  "Correos importantes mezclados con tonterías",
  "Cosas pendientes que viven en tu cabeza",
  '"Luego lo miro" que nunca llega',
  "Una bandeja que no se vacía de verdad",
];

export const Problem = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 px-6">
      <div className="container max-w-4xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <h2 className="text-headline md:text-display-sm mb-6">
            El correo no te roba tiempo.
            <br />
            <span className="text-muted-foreground">Te roba atención.</span>
          </h2>
        </motion.div>

        <motion.ul
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.3, duration: 0.6 }}
          className="space-y-4 mb-12"
        >
          {problems.map((problem, index) => (
            <motion.li
              key={index}
              initial={{ opacity: 0, x: -20 }}
              animate={isInView ? { opacity: 1, x: 0 } : {}}
              transition={{ delay: 0.4 + index * 0.1, duration: 0.5 }}
              className="flex items-center gap-4 text-lg text-text-secondary"
            >
              <span className="w-1.5 h-1.5 rounded-full bg-primary flex-shrink-0" />
              {problem}
            </motion.li>
          ))}
        </motion.ul>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="border-l-2 border-primary pl-6"
        >
          <p className="text-xl text-foreground font-medium">
            No es que tengas demasiados correos.
          </p>
          <p className="text-xl text-primary font-semibold">
            Es que no se cierran.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
