import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Wrench, BookOpen, Clock, Brain } from "lucide-react";

const states = [
  {
    icon: Wrench,
    title: "Action Items",
    emoji: "🛠",
    description: "Correos con cosas que tienes que hacer tú.",
    color: "text-orange-400",
    bgColor: "bg-orange-400/10",
    borderColor: "border-orange-400/20",
  },
  {
    icon: BookOpen,
    title: "Read Later",
    emoji: "📖",
    description: "Correos que tienes que leer con calma (y quizá responder).",
    color: "text-blue-400",
    bgColor: "bg-blue-400/10",
    borderColor: "border-blue-400/20",
  },
  {
    icon: Clock,
    title: "Waiting On",
    emoji: "⏳",
    description: "Correos donde no tienes que hacer nada ahora, pero estás esperando algo de alguien.",
    color: "text-yellow-400",
    bgColor: "bg-yellow-400/10",
    borderColor: "border-yellow-400/20",
  },
  {
    icon: Brain,
    title: "Vault",
    emoji: "🧠",
    description: "Correos importantes que querrás encontrar en el futuro.",
    color: "text-primary",
    bgColor: "bg-primary/10",
    borderColor: "border-primary/20",
  },
];

export const System = () => {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section ref={ref} className="py-32 px-6 bg-secondary/30">
      <div className="container max-w-5xl">
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7 }}
          className="text-center mb-16"
        >
          <p className="text-sm uppercase tracking-widest text-primary mb-6">
            El Sistema
          </p>
          
          <h2 className="text-headline md:text-display-sm mb-4">
            Solo hay <span className="text-gradient">4 estados</span> posibles
          </h2>
          
          <p className="text-lg text-muted-foreground max-w-2xl mx-auto">
            Todo correo nuevo debe terminar en uno de ellos
            (o archivarse directamente)
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-6">
          {states.map((state, index) => (
            <motion.div
              key={state.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + index * 0.1, duration: 0.6 }}
              className={`card-elevated p-6 border ${state.borderColor} hover:border-opacity-50 transition-colors`}
            >
              <div className="flex items-start gap-4">
                <div className={`w-12 h-12 rounded-xl ${state.bgColor} flex items-center justify-center flex-shrink-0`}>
                  <span className="text-2xl">{state.emoji}</span>
                </div>
                <div>
                  <h3 className={`text-lg font-semibold ${state.color} mb-2`}>
                    {state.title}
                  </h3>
                  <p className="text-text-secondary">
                    {state.description}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ delay: 0.8, duration: 0.6 }}
          className="mt-12 text-center space-y-2"
        >
          <p className="text-lg text-text-secondary">No hay limbo.</p>
          <p className="text-lg text-text-secondary">No hay "por si acaso".</p>
          <p className="text-lg text-primary font-medium">No hay acumulación sin sentido.</p>
        </motion.div>
      </div>
    </section>
  );
};
