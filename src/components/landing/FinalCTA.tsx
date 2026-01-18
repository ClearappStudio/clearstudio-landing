import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const FinalCTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  const formRef = useRef<HTMLFormElement | null>(null);

  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    if (!email || !email.includes("@")) {
      toast({
        title: "Email inválido",
        description: "Por favor, introduce un email válido.",
        variant: "destructive",
      });
      return;
    }

    setIsLoading(true);

    // IMPORTANTE:
    // form.submit() NO dispara el evento submit otra vez (a diferencia de requestSubmit),
    // así que no entra en bucle y envía el POST de verdad.
    formRef.current?.submit();

    // UX: confirmación local (no dependemos del redirect)
    setTimeout(() => {
      setIsLoading(false);
      setIsSubmitted(true);
      toast({
        title: "¡Gracias!",
        description: "Revisa tu email: te hemos enviado el siguiente paso.",
      });
    }, 600);
  };

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

            {/* Iframe oculto para evitar navegación */}
            <iframe
              name="formsubmit_hidden_iframe"
              style={{ display: "none" }}
              title="hidden"
            />

            {!isSubmitted ? (
              <form
                ref={formRef}
                onSubmit={handleSubmit}
                action="https://formsubmit.co/hello@clearstudio.app"
                method="POST"
                target="formsubmit_hidden_iframe"
                className="flex flex-col sm:flex-row gap-3"
              >
                {/* FormSubmit config */}
                <input type="hidden" name="_captcha" value="false" />
                <input type="hidden" name="_subject" value="Clear — siguiente paso" />
                {/* _next no importa mucho con iframe, pero lo dejamos */}
                <input type="hidden" name="_next" value="https://clearstudio.app/#signup" />
                <input type="hidden" name="_replyto" value="%email%" />
                <input
                  type="hidden"
                  name="_autoresponse"
                  value={`Gracias por tu interés.

Antes de enviarte nada, quiero asegurarme de una cosa:

Este sistema funciona solo si te comprometes a usarlo durante 7 días.
No es flexible ni automático.

Si te parece bien, responde a este correo con:

"Quiero probarlo"

— Francisco`}
                />

                {/* Look & feel original */}
                <Input
                  type="email"
                  name="email"
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 h-12 bg-secondary/50 border-border focus:border-primary"
                  disabled={isLoading}
                  required
                />

                <Button
                  type="submit"
                  size="lg"
                  className="group glow-effect h-12 px-6"
                  disabled={isLoading}
                >
                  {isLoading ? (
                    <Loader2 className="h-5 w-5 animate-spin" />
                  ) : (
                    <>
                      Enviar
                      <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
                    </>
                  )}
                </Button>
              </form>
            ) : (
              <div className="flex items-center justify-center gap-3 py-4 px-6 rounded-lg bg-primary/10 border border-primary/30">
                <CheckCircle className="h-5 w-5 text-primary" />
                <span className="text-foreground font-medium">
                  ¡Gracias! Revisa tu email.
                </span>
              </div>
            )}

            <p className="text-sm text-muted-foreground mt-4 italic">
              No es una newsletter.
            </p>
          </div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.5, duration: 0.8 }}
          className="mt-24 text-center"
        >
          <div className="inline-block px-8 py-6 rounded-2xl border border-primary/20 bg-primary/5">
            <p className="text-lg text-muted-foreground mb-2">No es para todo el mundo.</p>
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