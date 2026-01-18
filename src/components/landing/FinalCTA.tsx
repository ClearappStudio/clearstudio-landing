import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export const FinalCTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} id="signup" className="py-32 px-6 relative overflow-hidden">
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
          <h2 className="text-headline md:text-display-sm mb-6">
            El correo no debería vivir en tu cabeza.
          </h2>
          <p className="text-xl text-text-secondary mb-12">
            Debería entrar, resolverse y desaparecer.
          </p>

          {/* Email signup form */}
          <div className="max-w-md mx-auto mb-8">
            <p className="text-muted-foreground mb-2">
              Estamos probando este sistema con un grupo reducido.
            </p>
            <p className="text-lg text-foreground font-medium mb-2">
              Si te interesa, deja tu correo.
            </p>
            <p className="text-muted-foreground mb-6">
              Te escribiremos para explicarte el siguiente paso.
            </p>

            {/* Plain HTML form (reliable) */}
            <form
              action="https://formsubmit.co/hello@clearstudio.app"
              method="POST"
              className="flex flex-col sm:flex-row gap-3"
            >
              <input type="hidden" name="_captcha" value="false" />
              <input type="hidden" name="_subject" value="Clear – acceso inicial" />
              <input type="hidden" name="_next" value="https://clearstudio.app/#signup" />

              <input
                type="email"
                name="email"
                required
                placeholder="tu@email.com"
                className="flex-1 h-12 px-4 rounded-lg bg-secondary/50 border border-border text-white"
              />

              <button
                type="submit"
                className="h-12 px-6 rounded-lg bg-green-500 text-black font-semibold"
              >
                Enviar →
              </button>
            </form>

            <p className="text-sm text-muted-foreground mt-4 italic">
              No es una newsletter.
            </p>
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