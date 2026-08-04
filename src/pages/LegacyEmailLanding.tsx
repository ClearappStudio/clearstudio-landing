import { Benefits } from "@/components/landing/Benefits";
import { FinalCTA } from "@/components/landing/FinalCTA";
import { Hero } from "@/components/landing/Hero";
import { HowItWorks } from "@/components/landing/HowItWorks";
import { NotForYou } from "@/components/landing/NotForYou";
import { Privacy } from "@/components/landing/Privacy";
import { Problem } from "@/components/landing/Problem";
import { Proposal } from "@/components/landing/Proposal";
import { System } from "@/components/landing/System";
import { Truth } from "@/components/landing/Truth";

export default function LegacyEmailLanding() {
  return (
    <div className="legacy-email">
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
      <footer className="legacy-footer">
        © {new Date().getFullYear()} · Beta privada
      </footer>
    </div>
  );
}
