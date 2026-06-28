import type { Metadata } from "next";
import "./globals.css";

import { Bricolage_Grotesque } from "next/font/google";
import { Playwrite_NZ } from "next/font/google";
import { Quicksand } from "next/font/google";
import { Shadows_Into_Light } from "next/font/google";

import Navbar from "@/components/ui/Navbar";
import Footer from "@/components/ui/Footer";
import BootProvider from "@/components/core/BootProvider";

const bricolage = Bricolage_Grotesque({
  subsets: ["latin"],
  weight: ["200", "300", "400", "500", "600", "700", "800"],
  variable: "--font-bricolage",
});

const playwrite = Playwrite_NZ({
  weight: ["100", "200", "300", "400"],
  variable: "--font-playwrite",
});

const shadows = Shadows_Into_Light({
  subsets: ["latin"],
  weight: "400",
  variable: "--font-shadows",
});

const quicksand = Quicksand({
  subsets: ["latin"],
  variable: "--font-quicksand",
  weight: ["300", "400", "500", "600", "700"],
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL("https://ken-travis-portfolio.vercel.app"),

  title: {
    default:
      "Kensuomo Travis | Frontend Developer | React, Next.js & React Native Engineer",
    template: "%s | Ken Travis",
  },

  description:
    "Ken Travis is a Frontend & Mobile Software Engineer based in Yenagoa, Bayelsa State, Nigeria. Specialized in React, Next.js, TypeScript, React Native, Expo, Angular, Ionic, Tailwind CSS, Firebase and modern web technologies. Building fast, accessible and scalable digital experiences.",

  keywords: [
    "Ken Travis",
    "Kensuomo Travis",
    "Kensuomo Travis Portfolio",
    "Ken Travis Portfolio",
    "Frontend Developer Nigeria",
    "Frontend Developer ",
    "Frontend Developer Bayelsa",
    "Frontend Engineer Nigeria",
    "Frontend Engineer ",
    "Software Engineer Nigeria",
    "Frontend Developer Bayelsa",
    "Frontend Developer Yenagoa",
    "React Developer",
    "React Developer Nigeria",
    "Next.js Developer",
    "React Native Developer",
    "Mobile App Developer",
    "TypeScript Developer",
    "JavaScript Developer",
    "Angular Developer",
    "Ionic Developer",
    "Expo Developer",
    "Firebase Developer",
    "Tailwind CSS",
    "GSAP Developer",
    "Framer Motion",
    "UI Engineer",
    "Web Developer",
    "Portfolio",
    "Software Developer",
  ],

  authors: [
    {
      name: "Kensuomo Travis",
      url: "https://ken-travis-portfolio.vercel.app",
    },
  ],

  creator: "Kensuomo Travis",

  publisher: "Kensuomo Travis",

  category: "Technology",

  applicationName: "Ken Travis Portfolio",

  alternates: {
    canonical: "https://ken-travis-portfolio.vercel.app",
  },

  robots: {
    index: true,
    follow: true,
    nocache: false,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-video-preview": -1,
      "max-snippet": -1,
    },
  },

  icons: {
    icon: "/favicon.ico",
    shortcut: "/favicon.ico",
    apple: "/images/hero-img.JPG",
  },

  openGraph: {
    title:
      "Ken Travis | Frontend Developer | React, Next.js & React Native",

    description:
      "Frontend & Mobile Software Engineer from Yenagoa, Bayelsa State, Nigeria. Building high-performance web and mobile applications with React, Next.js, React Native and TypeScript.",

    url: "https://ken-travis-portfolio.vercel.app",

    siteName: "Ken Travis Portfolio",

    locale: "en_US",

    type: "website",

    images: [
      {
        url: "/images/hero-img.JPG",
        width: 1200,
        height: 630,
        alt: "Ken Travis Portfolio",
      },
    ],
  },

  twitter: {
    card: "summary_large_image",

    creator: "@YOUR_TWITTER_USERNAME",

    title:
      "Ken Travis | Frontend Developer | React, Next.js & React Native",

    description:
      "Frontend & Mobile Engineer from Nigeria building modern digital experiences.",

    images: ["/images/hero-img.JPG"],
  },

  verification: {
    google: "YOUR_GOOGLE_SEARCH_CONSOLE_CODE",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html
      lang="en"
      className={`${quicksand.variable} ${playwrite.variable} ${bricolage.variable} ${shadows.variable}`}
    >
      <body>
        <BootProvider>
          <Navbar />
          <div className="min-h-screen">{children}</div>
          <Footer />
        </BootProvider>
      </body>
    </html>
  );
}