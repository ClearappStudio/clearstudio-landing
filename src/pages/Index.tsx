import { Hero } from "@/components/landing/Hero";
import { Problem } from "@/components/landing/Problem";
import { Truth } from "@/components/landing/Truth";
import { Proposal } from "@/components/landing/Proposal";
import { System } from "@/components/landing/System";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { Benefits } from "@/components/landing/Benefits";
import { NotForYou } from "@/components/landing/NotForYou";
import { Privacy } from "@/components/landing/Privacy";
import { FinalCTA } from "@/components/landing/FinalCTA";

const Index = () => {
  return (
    <main className="min-h-screen bg-background">
      <Hero />
      <Problem />
      <Truth />
      <Proposal />
      <System />
      <HowItWorks />
      <Benefits />
      <NotForYou />
      <Privacy />
      <FinalCTA />
      
      {/* Footer */}
      <footer className="py-12 px-6 border-t border-border">
        <div className="container text-center">
          <p className="text-sm text-muted-foreground">
            © 2025 · Beta privada
          </p>
        </div>
      </footer>
    </main>
  );
};

export default Index;
