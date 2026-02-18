"use client";

import SharePortfolio from "@/components/ui/ShareLink";
import { contactCards } from "@/data/contactCards";
import { Rocket, Mail, Globe, Twitter, Linkedin, MessageCircle, Github } from "lucide-react";
import { motion } from "framer-motion";
import ContactForm from "@/components/ui/ContactForm";
import Link from "next/link";

export default function ContactPage() {
  const iconMap = {
    Rocket,
    Mail,
    Globe,
  };

  const socialLinks = [
    {
      name: "X",
      href: "https://x.com/kentrav81649556?s=21",
      icon: Twitter,
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/travisken",
      icon: Linkedin,
    },
    {
      name: "WhatsApp",
      href: "https://wa.me/2347039444495",
      icon: MessageCircle,
    },
    {
      name: "Github",
      href: "https://github.com/Travisken",
      icon: Github,
    },
  ];

  const cardVariants = {
    left: { hidden: { opacity: 0, x: -80 }, visible: { opacity: 1, x: 0 } },
    right: { hidden: { opacity: 0, x: 80 }, visible: { opacity: 1, x: 0 } },
    center: { hidden: { opacity: 1 }, visible: { opacity: 1 } },
  };

  return (
    <motion.section
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.6 }}
      className="pt-24 flex flex-col bg-black items-center justify-center"
    >
      {/* CONTACT FORM SECTION */}
      <div className="px-4 md:px-20  w-full">
        <div className="bg-[#0a0a0a] max-md:pb-8 max-md:pt-4 flex flex-col-reverse md:flex-row rounded-[1rem] md:rounded-[2rem] min-h-[50vh] w-full">
          <ContactForm />

          <motion.div
            initial={{ opacity: 0, x: 40 }}
            whileInView={{ opacity: 1, x: 0 }}
            transition={{ duration: 0.6 }}
            viewport={{ once: true }}
            className="flex-1 p-4 md:p-8 flex flex-col justify-center"
          >
            <h2 className="text-3xl font-semibold mb-4">
              Let’s build something meaningful
            </h2>
            <p className="text-white/60 max-w-md">
              Whether you have a project idea, need a developer’s insight, or
              just want to connect — I’m always open to thoughtful conversations
              and exciting collaborations.
            </p>
          </motion.div>
        </div>
      </div>

      {/* CONTACT CARDS */}
      <div className="min-h-[22vh] w-[90%] flex flex-col md:flex-row gap-8 rounded-2xl overflow-hidden  md:bg-[#0a0a0a] max-md:mt-12">
        {contactCards.map((card, index) => {
          const Icon = iconMap[card.icon as keyof typeof iconMap];
          const position =
            index === 1 ? "center" : index === 0 ? "left" : "right";

          return (
            <motion.div
              key={index}
              variants={cardVariants[position]}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease: "easeOut" }}
              className="rounded-2xl bg-white/10 md:bg-black p-6 flex-1"
            >
              <div className="flex gap-4 mb-4 items-center">
                <div className="h-12 w-12 shrink-0 flex items-center justify-center rounded-full bg-white/10">
                  <Icon className="h-6 w-6 text-white" />
                </div>
                <h3 className="text-base font-semibold mb-2">{card.title}</h3>
              </div>

              <p className="text-white/50 text-sm">{card.description}</p>
            </motion.div>
          );
        })}
      </div>

      {/* FOOTER / SHARE SECTION */}
      <div className="bg-[#0a0a0a] p-6 md:p-10 flex flex-col md:flex-row w-full rounded-t-4xl min-h-[50vh] max-md:mt-20">
        <div className="flex-1 flex items-center max-md:justify-center flex-col ">
          <p className="mb-4 text-3xl text-white/70">Kensuomo Travis</p>

          <Link href="mailto:kentravis37@gmail.com" className="flex gap-2 md:gap-4 ">
            <Mail className="md:h-6 h-4 w-4 md:w-6 text-white" />
            <h3 className="md:text-base text-sm font-semibold mb-2">
              Kentravis37@gmail.com
            </h3>
          </Link>
        </div>

        <div className="flex-1 mt-8 md:mt-0">
          <SharePortfolio />
        </div>

        <div className="flex-1 mt-8 md:mt-0">
          <div className="flex justify-center items-center gap-4">
            {socialLinks.map((social) => (
              <a
                key={social.name}
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="group relative"
                aria-label={social.name}
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-200 group-hover:bg-gray-500">
                  <social.icon className="h-5 w-5 text-white/50 transition-colors duration-200 group-hover:text-white" />
                </div>

                <div className="pointer-events-none absolute -top-11 left-1/2 -translate-x-1/2 opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:-top-12">
                  <div className="relative rounded-md bg-[#230C33] px-3 py-1.5 text-xs font-semibold text-white shadow-lg">
                    {social.name}
                    <span className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-[#230C33]" />
                  </div>
                </div>
              </a>
            ))}
          </div>
        </div>
      </div>
    </motion.section>
  );
}
