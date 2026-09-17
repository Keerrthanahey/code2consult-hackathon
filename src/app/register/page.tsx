import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import RegisterContent from "@/components/RegisterContent";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Register — Code2Consult · 180 Degrees CONSULTing VIT Chennai",
  description:
    "Register for Code2Consult, the 8-hour open-source hackathon by 180 Degrees CONSULTing — VIT Chennai. Register your team, receive a real repository, and ship a production-quality Pull Request.",
};

export default function RegisterPage() {
  return (
    <main className="relative min-h-screen bg-background">
      <Navbar />
      <RegisterContent />
      <Footer />
    </main>
  );
}