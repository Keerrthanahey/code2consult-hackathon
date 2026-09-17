"use client";

import Navbar from "@/components/Navbar";
import RecruitmentsContent from "@/components/RecruitmentsPage";
import Footer from "@/components/Footer";

export default function RecruitmentsPage() {
  return (
    <main className="relative min-h-screen bg-background">
      <Navbar />
      <RecruitmentsContent />
      <Footer />
    </main>
  );
}
