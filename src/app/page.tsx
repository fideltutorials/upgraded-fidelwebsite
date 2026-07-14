import Layout from "@/layouts/Layout";
import HeroSeven from "@/components/home/HeroSeven";
import Trust from "@/components/home/Trust";
import WhoWeServe from "@/components/home/WhoWeServe";
import WhyFidel from "@/components/home/WhyFidel";
import Testimonials from "@/components/home/Testimonials";
import FinalCTA from "@/components/home/FinalCTA";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fidel Tutorial — Tutoring built for the moments that count",
  description: "Fidel Tutorial pairs students across Ethiopia and the diaspora with vetted tutors and a track record of results. KG through university, SAT, TOEFL, IELTS, exam bootcamps, summer camps. Online and in-home. Addis Ababa.",
};

export default function Home() {
  return (
    <Layout
      navVersion="minimal"
      title="Fidel Tutorial — Tutoring built for the moments that count"
    >
      {/* Global Canvas Wrapper with Background Glow Layers */}
      <div className="relative bg-brand-paper overflow-hidden">
        {/* Floating background glowing highlights */}
        <div className="absolute top-[15%] right-[-100px] w-96 h-96 bg-brand-primary/5 rounded-full blur-[120px] pointer-events-none -z-10"></div>
        <div className="absolute top-[40%] left-[-150px] w-[500px] h-[500px] bg-brand-secondary/5 rounded-full blur-[140px] pointer-events-none -z-10"></div>
        <div className="absolute top-[70%] right-[-100px] w-[450px] h-[450px] bg-brand-primary/5 rounded-full blur-[130px] pointer-events-none -z-10"></div>

        <HeroSeven />

        <div className="relative z-20 -mt-10 max-w-[1100px] mx-auto">
          <div className="border border-brand-rule rounded-2xl shadow-xl shadow-brand-primary-deep/5 overflow-hidden">
            <Trust />
          </div>
        </div>

        <WhoWeServe />
        <WhyFidel />
        <Testimonials />
        <FinalCTA />
      </div>
    </Layout>
  );
}
