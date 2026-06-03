"use client";

import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import Navbar         from "@/components/Navbar";
import ScrollProgress  from "@/components/ScrollProgress";
import CustomCursor    from "@/components/CustomCursor";
import HeroSection     from "@/components/HeroSection";
import MarqueeTicker   from "@/components/MarqueeTicker";
import VideoSection    from "@/components/VideoSection";
import AboutSection    from "@/components/AboutSection";
import ContactSection  from "@/components/ContactSection";
import Footer          from "@/components/Footer";
import WelcomeScreen   from "@/components/WelcomeScreen";

export default function Home() {
  const [entered, setEntered] = useState(false);

  const handleEnter = async () => {
    try {
      const docEl = document.documentElement as any;
      const requestFullscreen =
        docEl.requestFullscreen ||
        docEl.webkitRequestFullscreen ||
        docEl.mozRequestFullScreen ||
        docEl.msRequestFullscreen;
        
      if (requestFullscreen) {
        await requestFullscreen.call(docEl);
      }
    } catch (err) {
      console.warn("Fullscreen request failed or unsupported:", err);
    }
    setEntered(true);
  };

  return (
    <main style={{ backgroundColor: "#080808", minHeight: "100vh" }}>
      {/* Global noise texture overlay */}
      <div
        aria-hidden="true"
        className="noise-overlay"
      />

      <AnimatePresence>
        {!entered && <WelcomeScreen key="welcome" onEnter={handleEnter} />}
      </AnimatePresence>

      {entered && (
        <>
          <CustomCursor />
          <ScrollProgress />
          <Navbar />
          <HeroSection />
          <div style={{ position: "relative", zIndex: 10, backgroundColor: "#080808" }}>
            <MarqueeTicker />
            <VideoSection />
            <AboutSection />
            <ContactSection />
            <Footer />
          </div>
        </>
      )}
    </main>
  );
}
