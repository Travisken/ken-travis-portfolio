import SharePortfolio from "@/components/ui/ShareLink";
import { contactCards } from "@/data/contactCards";
import { Rocket, Mail, Globe } from "lucide-react";
import { Twitter, Linkedin, MessageCircle } from "lucide-react";

export default function ContactPage() {
  const iconMap = {
    Rocket,
    Mail,
    Globe,
  };

  const socialLinks = [
    {
      name: "X",
      href: "https://twitter.com/yourusername",
      icon: Twitter,
    },
    {
      name: "LinkedIn",
      href: "https://www.linkedin.com/in/yourusername",
      icon: Linkedin,
    },
    {
      name: "WhatsApp",
      href: "https://wa.me/234XXXXXXXXXX",
      icon: MessageCircle,
    },
  ];

  return (
    <>
      <section className="pt-30  flex flex-col bg-black items-center justify-center">
        <div className="px-20 w-full">
          <div className="bg-[#0a0a0a] flex rounded-[6rem] min-h-[50vh] w-full"></div>
        </div>
        <div className="min-h-[22vh] w-[90%] flex gap-8 rounded-xl overflow-hidden bg-[#0a0a0a]">
          {contactCards.map((card, index) => {
            const Icon = iconMap[card.icon as keyof typeof iconMap];

            return (
              <div key={index} className="rounded-2xl bg-black p-6">
                <div className="flex gap-4 items-center">
                  <div className="h-12 w-12 flex items-center justify-center rounded-full bg-white/10">
                    <Icon className="h-6 w-6 text-white" />
                  </div>
                  <h3 className="text-base font-semibold mb-2">{card.title}</h3>
                </div>

                <p className="text-white/50 text-sm">{card.description}</p>
              </div>
            );
          })}
        </div>
        <div className="bg-[#0a0a0a] p-10 flex w-full rounded-t-4xl min-h-[50vh]">
          <div className=" flex-1">
            <p className="mb-4 text-3xl text-white/70"> Kensuomo Travis</p>
            <div className="flex gap-4 items-center">
              {/* <div className="h-12 w-12 flex items-center justify-center rounded-full bg-white/10"> */}
              <Mail className="h-6 w-6 text-white" />
              {/* </div> */}
              <h3 className="text-base font-semibold mb-2">
                Kentravis37@gmail.com
              </h3>
            </div>
          </div>
          <div className=" flex-1">
            <SharePortfolio />
          </div>
          <div className="flex-1">
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
                  {/* Icon container */}
                  <div className="flex h-10 w-10 items-center justify-center rounded-full transition-colors duration-200 group-hover:bg-gray-500">
                    <social.icon className="h-5 w-5 text-white/50 transition-colors duration-200 group-hover:text-white" />
                  </div>

                  {/* Tooltip */}
                  <div className="pointer-events-none absolute -top-11 left-1/2 -translate-x-1/2 opacity-0 transition-all duration-200 group-hover:opacity-100 group-hover:-top-12">
                    <div className="relative rounded-md bg-[#230C33] px-3 py-1.5 text-xs font-semibold text-white shadow-lg">
                      {social.name}

                      {/* Arrow */}
                      <span className="absolute left-1/2 top-full -translate-x-1/2 border-4 border-transparent border-t-[#230C33]" />
                    </div>
                  </div>
                </a>
              ))}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
