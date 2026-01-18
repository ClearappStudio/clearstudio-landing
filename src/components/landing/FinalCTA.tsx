import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { ArrowRight, Loader2, CheckCircle } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

export const FinalCTA = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });
  const [email, setEmail] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const { toast } = useToast();

  const handleSubmit = async (e: React.FormEvent) => {
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
  
    try {
      const formData = new URLSearchParams();
      formData.append("email", email);
      formData.append("_captcha", "false");
      formData.append("_subject", "Clear — siguiente paso");
      formData.append("_template", "table");
      formData.append("_autoresponse", `Gracias por tu interés.
  
  Antes de enviarte nada, quiero asegurarme de una cosa:
  
  Este sistema funciona solo si te comprometes a usarlo durante 7 días.
  No es flexible ni automático.
  
  Si te parece bien, respóndeme a este correo con:
  
  "Quiero probarlo"
  
  — Francisco`);
  
      const response = await fetch("https://formsubmit.co/hello@clearstudio.app", {
        method: "POST",
        headers: { "Content-Type": "application/x-www-form-urlencoded" },
        body: formData.toString(),
      });
  
      const text = await response.text(); // 👈 clave para ver qué está pasando
      console.log("FormSubmit status:", response.status);
      console.log("FormSubmit response:", text);
  
      if (!response.ok) {
        throw new Error(`Error enviando el email (status ${response.status})`);
      }
  
      setIsSubmitted(true);
      toast({
        title: "¡Gracias!",
        description: "Te escribiremos pronto con los siguientes pasos.",
      });
    } catch (err) {
      console.error(err);
      toast({
        title: "Error",
        description: "No hemos podido enviar el email. Revisa la consola.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
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

            {!isSubmitted ? (
              <form action="https://formsubmit.co/your@email.com" method="POST" className="flex flex-col sm:flex-row gap-3">
                <Input
                  type="email"
                  name="email"
                  required
                  placeholder="tu@email.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="flex-1 h-12 bg-secondary/50 border-border focus:border-primary"
                  disabled={isLoading}
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
                <span className="text-foreground font-medium">¡Gracias! Te escribiremos pronto.</span>
              </div>
            )}

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
