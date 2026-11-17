"use client";
import { useRef } from "react";
import dynamic from "next/dynamic";
import SiteProvider from "./SiteProvider";
import Header from "./Header";
import Hero from "./Hero";
import About from "./About";
import Marquee from "./Marquee";
import Work from "./Work";
import Systems from "./Systems";
import KeyProjects from "./KeyProjects";
import Skills from "./Skills";
import Experience from "./Experience";
import Contact from "./Contact";
import Footer from "./Footer";
import Micro from "./Micro";
import ScrollMotion from "./ScrollMotion";

// The case dialog only exists after a click — keep it out of the initial bundle.
const ProjectDialog = dynamic(() => import("./ProjectDialog"), { ssr: false });

export default function Site() {
  const root = useRef<HTMLDivElement>(null);
  return (
    <SiteProvider>
      {/* overflow-x: clip (not hidden) — nothing can ever widen the page sideways, and sticky still works */}
      <div ref={root} style={{ overflowX: "clip" }}>
        <Header />
        <main id="main">
          <Hero />
          <About />
          <KeyProjects />
          <Marquee />
          <Work />
          <Systems />
          <Skills />
          <Experience />
          <Contact />
        </main>
        <Footer />
      </div>
      <ProjectDialog />
      <Micro />
      <ScrollMotion scope={root} />
    </SiteProvider>
  );
}
