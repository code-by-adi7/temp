import Navbar         from "@/components/Navbar";
import ScrollProgress  from "@/components/ScrollProgress";
import CustomCursor    from "@/components/CustomCursor";
import HeroSection     from "@/components/HeroSection";
import MarqueeTicker   from "@/components/MarqueeTicker";
import VideoSection    from "@/components/VideoSection";
import AboutSection    from "@/components/AboutSection";
import ContactSection  from "@/components/ContactSection";
import Footer          from "@/components/Footer";

export default function Home() {
  return (
    <main style={{ backgroundColor: "#080808", minHeight: "100vh" }}>
      {/* Global noise texture overlay */}
      <div
        aria-hidden="true"
        className="noise-overlay"
      />

      <CustomCursor />
      <ScrollProgress />
      <Navbar />
      <HeroSection />
      <MarqueeTicker />
      <VideoSection />
      <AboutSection />
      <ContactSection />
      <Footer />
    </main>
  );
}
