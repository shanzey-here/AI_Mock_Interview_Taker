import React from "react";
import MainContent from "../components/MainContent";
import Latest from "../components/Latest";
import Footer from "../components/Footer";

export default function Blog() {
  return (
    <div className="text-gray-900 min-h-screen flex flex-col">
      <main className="max-w-6xl mx-auto flex flex-col gap-16 py-16 px-4">
        <MainContent />
        <Latest />
      </main>
      <Footer />
    </div>
  );
}
