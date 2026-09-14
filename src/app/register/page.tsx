import type { Metadata } from "next";
import Navbar from "@/components/Navbar";
import RegisterContent from "@/components/RegisterContent";
import Footer from "@/components/Footer";

export const metadata: Metadata = {
  title: "Register — CODE2CONSOLE · 180 Degrees Consulting VIT Chennai",
  description:
    "Register for Code2Console, the 8-hour open-source hackathon by 180 Degrees Consulting — VIT Chennai. Register your team, receive a real repository, and ship a production-quality Pull Request.",
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