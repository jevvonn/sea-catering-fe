import ContactSection from "@/components/landing-page/contact-section";
import MainFooter from "@/components/landing-page/footer";
import HeroSection from "@/components/landing-page/hero";
import ServicesSection from "@/components/landing-page/services";
import TestimonialsSection from "@/components/landing-page/testimonials";

export default function Home() {
  return (
    <>
      <main className="pt-5 md:pt-10 px-4 md:px-10 relative">
        <HeroSection />
        <ServicesSection />
        <TestimonialsSection />
        <ContactSection />
      </main>

      <MainFooter />
    </>
  );
}
