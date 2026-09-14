import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Stats from "@/components/Stats";
import About from "@/components/About";
import HowItWorks from "@/components/HowItWorks";
import DomainSection from "@/components/DomainSection";
import IssueTaxonomy from "@/components/IssueTaxonomy";
import LanguageTrack from "@/components/LanguageTrack";
import RepositoryStructure from "@/components/RepositoryStructure";
import Participants from "@/components/Participants";
import TeamSection from "@/components/TeamSection";
import Timeline from "@/components/Timeline";
import PullRequest from "@/components/PullRequest";
import Evaluation from "@/components/Evaluation";
import FAQSection from "@/components/FAQ";
import FinalCTA from "@/components/FinalCTA";
import Footer from "@/components/Footer";

export default function Home() {
  return (
    <main className="relative min-h-screen bg-background">
      <Navbar />
      <Hero />
      <Stats />
      <About />
      <HowItWorks />
      <DomainSection />
      <IssueTaxonomy />
      <LanguageTrack />
      <RepositoryStructure />
      <Participants />
      <TeamSection />
      <Timeline />
      <PullRequest />
      <Evaluation />
      <FAQSection />
      <FinalCTA />
      <Footer />
    </main>
  );
}