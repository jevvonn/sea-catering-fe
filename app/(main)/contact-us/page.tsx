import ContactUsForm from "@/components/contact-us/contact-us-form";
import ContactSection from "@/components/landing-page/contact-section";
import React from "react";

const ContactUsPage = () => {
  return (
    <main className="py-5 md:py-10 px-4 md:px-10 relative">
      <div className="max-w-6xl mx-auto px-4 pb-2">
        <div className="text-center">
          <h2 className="text-3xl font-bold tracking-tighter sm:text-4xl md:text-5xl">
            Contact Us
          </h2>
        </div>
      </div>

      <div className="w-full flex flex-col items-center justify-center max-w-2xl mx-auto px-4 mt-4">
        <ContactUsForm />
        <ContactSection />
      </div>
    </main>
  );
};

export default ContactUsPage;
