import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ArrowRight } from "lucide-react";
import { Button } from "@/components/ui/button";

export const FinalCTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 px-6 relative overflow-hidden">
      {/* Background glow */}
      <div className="absolute inset-0 flex items-center justify-center">
        <div className="w-[600px] h-[400px] bg-glow/10 rounded-full blur-[100px]" />
      </div>

      <div className="container max-w-3xl relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center"
        >
          <p className="text-lg text-text-secondary mb-4">
            ¿Quieres probarlo antes de que exista como producto?
          </p>

          <p className="text-muted-foreground mb-12">
            Estamos validando el sistema con un grupo reducido
            de personas que quieren menos ruido mental.
          </p>

          <Button size="lg" className="group glow-effect text-lg px-8 py-6 h-auto mb-16">
            Quiero probar el sistema
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>

          <div className="border-t border-border pt-16">
            <h2 className="text-headline md:text-display-sm mb-6">
              El correo no debería vivir en tu cabeza.
            </h2>
            <p className="text-xl text-text-secondary mb-10">
              Debería entrar, resolverse y desaparecer.
            </p>

            <Button 
              size="lg" 
              variant="outline" 
              className="group text-lg px-8 py-6 h-auto border-primary/50 hover:bg-primary/10 hover:border-primary"
            >
              Recupera espacio mental
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
          </div>
        </motion.div>

        {/* Final note */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-24 text-center"
        >
          <div className="inline-block px-8 py-6 rounded-2xl border border-primary/20 bg-primary/5">
            <p className="text-lg text-muted-foreground mb-2">
              No es para todo el mundo.
            </p>
            <p className="text-xl text-foreground font-medium">
              Pero si el email te pesa,
              <br />
              <span className="text-gradient">esto puede cambiarlo.</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
};
