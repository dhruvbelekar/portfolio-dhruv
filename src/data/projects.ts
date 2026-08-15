export type Project = {
  slug: string;
  title: string;
  category: string;
  thumb: string;
  thumbAlt: string;
  description: string;
  timeline?: string;
  live: boolean;
  links: { label: string; href: string }[];
  galleryCount: number;
};

export const projects: Project[] = [
  {
    slug: "mahavitaran",
    title: "Mahavitaran",
    category: "UI/UX",
    thumb: "/img/projects/mahavitaran-thumb.png",
    thumbAlt: "Serene Portrait flowers",
    description:
      "Mahavitaran is a UI/UX redesign project that aims to make electricity services simpler and more accessible. Through user research, personas, and journey mapping, we identified key user problems and designed a seamless experience using a mobile app, WhatsApp, AI support, kiosks, and feature phones.",
    timeline: "3 months",
    live: true,
    links: [
      { label: "mahavitaran.whatsapp", href: "https://mahavitaranwhatsapp.figma.site" },
      { label: "mahavitaran.featurephone", href: "https://featurephonemahavitaran.figma.site" },
      { label: "mahavitaran.atm", href: "https://atmmahavitaran.figma.site" },
    ],
    galleryCount: 14,
  },
  {
    slug: "aria",
    title: "Aria",
    category: "UI/UX",
    thumb: "/img/projects/aria-thumb.png",
    thumbAlt: "avant garde portrait",
    description:
      "ARIA is an AI-powered fitness platform that replaces traditional app navigation with a conversational AI assistant. It combines voice interactions, personalized coaching, activity tracking, nutrition guidance, gesture-based workouts, and expert support to create a simple and engaging fitness experience.",
    timeline: "3 months",
    live: true,
    links: [{ label: "aria.fitness", href: "https://aria.fitness" }],
    galleryCount: 21,
  },
  {
    slug: "mp4",
    title: "Mp4 Productions",
    category: "Branding",
    thumb: "/img/projects/mp4-thumb.png",
    thumbAlt: "red hat portrait",
    description:
      "Created in my second year of college, this self-initiated branding project for .mp4 Productions combines my interest in visual identity design with my passion for filmmaking and cinematic storytelling.",
    timeline: "1 month",
    live: false,
    links: [],
    galleryCount: 5,
  },
  {
    slug: "frelo",
    title: "Frelo",
    category: "Brand & Content",
    thumb: "/img/projects/frelo-thumb.png",
    thumbAlt: "Elegant red portrait",
    description:
      "Strengthening Frelo's digital presence through branding, social media campaigns, content strategy, video production, and a community platform designed to connect freelancers and creators.",
    live: true,
    links: [
      { label: "frelo.community", href: "https://frelo.community" },
      { label: "frelo.instagram", href: "https://instagram.com/frelo" },
    ],
    galleryCount: 5,
  },
  {
    slug: "ai-film",
    title: "AI Film",
    category: "AI Filmmaking",
    thumb: "/img/projects/ai-film-thumb.jpg",
    thumbAlt: "The New World, AI-generated short film title card",
    description:
      "An experimental short film created using generative AI, where I worked across the entire process — from developing the concept and creating visuals to generating scenes, voice, and editing the final film. I used tools like Runway, Midjourney, Kling, LumaLabs, and ElevenLabs to bring the story to life, combining AI-generated content with traditional editing. The final film reached 10,000+ views on Instagram.",
    timeline: "6 months",
    live: false,
    links: [],
    galleryCount: 9,
  },
  {
    slug: "ope",
    title: "OPE",
    category: "Photography",
    thumb: "/img/projects/ope-thumb.png",
    thumbAlt: "OPE Global Jam Mumbai event branding",
    description:
      "Photography coverage for OPE's Global Jam event in Mumbai, capturing the energy, people, activities, and key moments throughout the event. I focused on documenting the overall experience through candid moments, event details, and interactions, creating a visual record that reflected the atmosphere and spirit of the global design community.",
    live: false,
    links: [],
    galleryCount: 9,
  },
];

export const testimonials = [
  {
    name: "Vaishakh Sajeevan",
    role: "Founder, Frelo",
    quote:
      "Dhruv played a key role in building Frelo's brand through our website, social media, reels, and creative content, helping us grow our community.",
    avatar: "/img/testimonials/vaishakh-sajeevan.png",
  },
  {
    name: "Nikhil Kulkarni",
    role: "Founder, Docville",
    quote: "The AI-generated UGC videos were creative, engaging, and delivered exactly what we were looking for.",
    avatar: "/img/testimonials/nikhil-kulkarni.png",
  },
  {
    name: "Rupak Shah",
    role: "Co-founder, AiVANTA",
    quote:
      "Over three months, Dhruv used Runway, Midjourney, Kling, and ElevenLabs to create an AI film with strong visual storytelling.",
    avatar: "/img/testimonials/rupak-shah.jpeg",
  },
  {
    name: "Ankit Savla",
    role: "Founder, OPE Innovation Lab",
    quote:
      "It was great working with Dhruv. He captured the event beautifully and made sure every important moment was documented.",
    avatar: "/img/testimonials/ankit-savla.png",
  },
];

export const experience = [
  { role: "Creative Head", company: "Frelo", dates: "Present" },
  { role: "Creative Designer", company: "AiVANTA", dates: "Dec 24/May 25" },
  { role: "Design Intern", company: "Lit Lamps", dates: "Jul 24/Dec 24" },
];

export const skillsRowA = ["UI/UX Design", "Brand Identity", "Visual Design"];
export const skillsRowB = ["Creative Direction", "Photography", "Filmmaking", "AI"];

export const clientLogos = [
  "/img/logos/logo-1.png",
  "/img/logos/logo-2.png",
  "/img/logos/logo-3.png",
  "/img/logos/logo-4.png",
];
