import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export const Proposal = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 px-6">
      <div className="container max-w-3xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
        >
          <p className="text-sm uppercase tracking-widest text-primary mb-6">
            La propuesta
          </p>
          
          <h2 className="text-headline md:text-display-sm mb-8">
            Un correo solo debe existir mientras{" "}
            <span className="text-gradient">requiere atención</span>
          </h2>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.4, duration: 0.6 }}
          className="space-y-6"
        >
          <p className="text-xl text-text-secondary">
            Este sistema parte de una idea muy simple:
          </p>
          
          <div className="inline-block px-8 py-6 rounded-2xl border border-primary/30 bg-primary/5">
            <p className="text-xl md:text-2xl text-foreground font-medium">
              Si un correo no requiere atención,
              <br />
              <span className="text-primary">no debería ocupar espacio en tu cabeza.</span>
            </p>
          </div>

          <p className="text-lg text-muted-foreground">
            Nada más. Nada menos.
          </p>
        </motion.div>
      </div>
    </section>
  );
};
