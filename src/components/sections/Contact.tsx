"use client";

import { useState } from "react";
import FormInput from "@/components/ui/FormInput";
import FormTextarea from "@/components/ui/FormTextarea";
import Button from "@/components/ui/Button";
import SocialIcon from "@/components/ui/SocialIcon";
import ScrollReveal from "@/components/ui/ScrollReveal";
import { socialLinks, contactData } from "@/lib/data";

export default function Contact() {
  const [isSubmitting, setIsSubmitting] = useState(false);

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setIsSubmitting(true);
    // Placeholder form handling
    setTimeout(() => setIsSubmitting(false), 1000);
  }

  return (
    <section
      id="contact"
      className="px-6 md:px-12 lg:px-[108px] py-20 border-t border-border"
    >
      <div className="flex flex-col lg:flex-row gap-12 lg:gap-6">
        {/* Left column: heading + contact info + footer */}
        <ScrollReveal variant="left" className="flex-1 flex flex-col gap-8">
          <h2 className="font-display text-[48px] md:text-[60px] lg:text-[76px] leading-[1] gradient-text">
            LET'S CONNCET
          </h2>
          <p className="font-body text-lg leading-[1.5] text-text-secondary">
            Say hello at{" "}
            <a
              href={`mailto:${contactData.email}`}
              className="font-body font-bold text-base leading-[1.5] text-accent underline underline-offset-4 transition-opacity hover:opacity-80"
            >
              {contactData.email}
            </a>
          </p>

          {/* Social icons */}
          <div className="flex items-center gap-6">
            {socialLinks.map((link) => (
              <SocialIcon
                key={link.id}
                platform={link.platform}
                href={link.url}
                ariaLabel={link.ariaLabel}
              />
            ))}
          </div>

          {/* Footer / copyright */}
          <footer className="mt-auto pt-12">
            <p className="font-body font-medium text-base leading-[1.6] text-text-secondary">
              {contactData.copyright}
            </p>
          </footer>
        </ScrollReveal>

        {/* Right column: form */}
        <ScrollReveal variant="right" delay={120} className="flex-1">
          <form
            onSubmit={handleSubmit}
            className="flex flex-col gap-6"
            noValidate
          >
            <FormInput
              id="name"
              label="Name"
              placeholder="Your name"
              required
            />
            <FormInput
              id="email"
              label="Email"
              type="email"
              placeholder="your@email.com"
              required
            />
            <FormTextarea
              id="message"
              label="Message"
              placeholder="Your message..."
              required
            />
            <div className="pt-2">
              <Button variant="submit" disabled={isSubmitting}>
                {isSubmitting ? "Sending..." : "Send Message"}
              </Button>
            </div>
          </form>
        </ScrollReveal>
      </div>
    </section>
  );
}
