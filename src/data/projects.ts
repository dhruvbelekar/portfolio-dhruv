export const filterCategories = ["UI/UX", "Visual Design", "Film", "Photography"] as const;
export type FilterCategory = (typeof filterCategories)[number];

export type Project = {
  slug: string;
  title: string;
  category: string;
  filterCategory: FilterCategory;
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
    filterCategory: "UI/UX",
    thumb: "/img/projects/mahavitaran-thumb.webp",
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
    galleryCount: 15,
  },
  {
    slug: "drive",
    title: "DRIVE",
    category: "UI/UX",
    filterCategory: "UI/UX",
    thumb: "/img/projects/drive-thumb.webp",
    thumbAlt:
      "A driver in dark glasses at the wheel of an autonomous car, the dashboard reading \u201cAI co-driver: in 50 meters, take a left turn\u201d",
    description:
      "A speculative project asking how visually impaired people might experience driving in an autonomous future. DRIVE is an AI co-driver that pairs a tactile steering and pedal interface with a conversational companion and an environmental soundscape, so the vehicle handles the driving while the person keeps the agency and the feel of the road. Eleven prototypes across three phases took it from laser-cut cardboard to 3D-printed haptics and live electronics.",
    timeline: "3 months",
    live: false,
    links: [],
    galleryCount: 20,
  },
  {
    slug: "aria",
    title: "Aria",
    category: "UI/UX",
    filterCategory: "UI/UX",
    thumb: "/img/projects/aria-thumb.webp",
    thumbAlt: "The ARIA dashboard open on a laptop against a warm orange backdrop",
    description:
      "ARIA is an AI-powered fitness platform that replaces traditional app navigation with a conversational AI assistant. It combines voice interactions, personalized coaching, activity tracking, nutrition guidance, gesture-based workouts, and expert support to create a simple and engaging fitness experience.",
    timeline: "3 months",
    live: true,
    links: [{ label: "aria.fitness", href: "https://dhruvbelekar.github.io/aria-fitness/" }],
    galleryCount: 16,
  },
  {
    slug: "mp4",
    title: "Mp4 Productions",
    category: "Branding",
    filterCategory: "Visual Design",
    thumb: "/img/projects/mp4-thumb.webp",
    thumbAlt: "The .mp4 Productions mark as a polished metal pin on blue knit",
    description:
      "Created in my second year of college, this self-initiated branding project for .mp4 Productions combines my interest in visual identity design with my passion for filmmaking and cinematic storytelling.",
    timeline: "1 month",
    live: false,
    links: [],
    galleryCount: 12,
  },
  {
    slug: "frelo",
    title: "Frelo",
    category: "Brand & Content",
    filterCategory: "Visual Design",
    thumb: "/img/projects/frelo-thumb.webp",
    thumbAlt: "Elegant red portrait",
    description:
      "Strengthening Frelo's digital presence through branding, social media campaigns, content strategy, video production, and a community platform designed to connect freelancers and creators.",
    live: true,
    links: [
      { label: "frelo.community", href: "https://frelo.work/community/mumbai/" },
      { label: "frelo.instagram", href: "https://www.instagram.com/frelo.work/" },
    ],
    // Frelo renders the bento layout, not the standard gallery, so there is
    // nothing to count and no page images to read at build time.
    galleryCount: 0,
  },
  {
    slug: "ai-film",
    title: "AI Film",
    category: "AI Filmmaking",
    filterCategory: "Film",
    thumb: "/img/projects/ai-film-thumb.webp",
    thumbAlt: "The New World, AI-generated short film title card",
    description:
      "An experimental short film created using generative AI, where I worked across the entire process — from developing the concept and creating visuals to generating scenes, voice, and editing the final film. I used tools like Runway, Midjourney, Kling, LumaLabs, and ElevenLabs to bring the story to life, combining AI-generated content with traditional editing. The final film reached 10,000+ views on Instagram.",
    timeline: "6 months",
    live: false,
    links: [],
    galleryCount: 9,
  },
  {
    slug: "passion-project",
    title: "Passion Project",
    category: "Personal Project",
    filterCategory: "Film",
    thumb: "/img/projects/passion-project-thumb.webp",
    thumbAlt: "8th August, a personal collage-style short film poster",
    description:
      "A personal passion project documenting my journey from childhood to the present and my growing love for filmmaking, editing, and capturing everyday moments. I explored my memories, experiences, and interests through a collage-style animation, bringing together photographs, videos, graphics, and personal moments to tell my story. The project is a visual reflection of how documenting life became a part of how I see and express the world.",
    live: false,
    links: [],
    galleryCount: 13,
  },
  {
    slug: "ope",
    title: "OPE",
    category: "Photography",
    filterCategory: "Photography",
    thumb: "/img/projects/ope-thumb.webp",
    thumbAlt: "OPE Global Jam Mumbai event branding",
    description:
      "Photography coverage for OPE's Global Jam event in Mumbai, capturing the energy, people, activities, and key moments throughout the event. I focused on documenting the overall experience through candid moments, event details, and interactions, creating a visual record that reflected the atmosphere and spirit of the global design community.",
    live: false,
    links: [],
    galleryCount: 9,
  },
  {
    slug: "coke",
    title: "Coca-Cola Ad",
    category: "3D Animation",
    filterCategory: "Film",
    thumb: "/img/projects/coke-thumb.webp",
    thumbAlt: "3D-rendered Coca-Cola can, close-up with condensation",
    description:
      "A visual advertisement created in Blender to explore a more dynamic and cinematic approach. I focused on camera movement, lighting, animation, and editing to create an engaging visual piece that reflects my creative style.",
    live: false,
    links: [],
    galleryCount: 8,
  },
];

export const testimonials = [
  {
    name: "Vaishakh Sajeevan",
    role: "Founder, Frelo",
    quote:
      "Dhruv played a key role in building Frelo's brand through our website, social media, reels, and creative content, helping us grow our community.",
    avatar: "/img/testimonials/vaishakh-sajeevan.webp",
  },
  {
    name: "Nikhil Kulkarni",
    role: "Founder, Docville",
    quote: "The AI-generated UGC videos were creative, engaging, and delivered exactly what we were looking for.",
    avatar: "/img/testimonials/nikhil-kulkarni.webp",
  },
  {
    name: "Rupak Shah",
    role: "Co-founder, AiVANTA",
    quote:
      "Over three months, Dhruv used Runway, Midjourney, Kling, and ElevenLabs to create an AI film with strong visual storytelling.",
    avatar: "/img/testimonials/rupak-shah.webp",
  },
  {
    name: "Ankit Savla",
    role: "Founder, OPE Innovation Lab",
    quote:
      "It was great working with Dhruv. He captured the event beautifully and made sure every important moment was documented.",
    avatar: "/img/testimonials/ankit-savla.webp",
  },
];

export const experience = [
  {
    company: "Frelo",
    role: "Creative Head",
    // One stop, not two: the promotion is the interesting part, and the same
    // logo twice in a row read as a mistake rather than a step up.
    promotedFrom: "Creative Intern",
    promotion: "Promoted Nov 2025",
    meta: "Full-time",
    dates: "Sep 2025 — Present",
    logo: "/img/logos/logo-4.webp",
    points: [
      "Directed creative for all video and visual content across campaigns.",
      "Produced short and long-form video edits and designed graphics for social and brand storytelling.",
      "Created marketing collateral that boosted brand visibility and recall.",
      "Ideated and executed content for events, partnerships and community milestones.",
    ],
  },
  {
    company: "AiVANTA",
    role: "Creative Designer",
    meta: "Internship · Mumbai, Hybrid",
    dates: "Dec 2024 — May 2025",
    logo: "/img/logos/logo-1.webp",
    points: [
      "Contributed to AI-powered short films, from concept development to final production.",
      "Worked extensively with Runway, Kling, LumaLabs, ElevenLabs and Midjourney.",
      "Gained hands-on experience producing AI-generated audio-visual content end to end.",
    ],
  },
  {
    company: "Lit Lamps",
    role: "Design Intern",
    meta: "Internship · Mumbai, On-site",
    dates: "Jul 2024 — Dec 2024",
    logo: "/img/logos/logo-5.webp",
    points: [
      "Created engaging visuals of the lamps, aligning with the brand's aesthetic.",
      "Collaborated with the team to deliver a company video reflecting the brand's vision.",
      "Redesigned the packaging for the lamps.",
    ],
  },
];

export const skillsRowA = ["UI/UX Design", "Brand Identity", "Visual Design"];
export const skillsRowB = ["Creative Direction", "Photography", "Filmmaking", "AI"];

/*
  The same list the skills ticker carried, standing still so each one can be
  read and shown. Each one points at the cover of the project that makes the
  case for it, so a name and the work behind it are looked at together.
*/
export const services = [
  { name: "UI/UX Design", image: "/img/projects/mahavitaran-thumb.webp" },
  { name: "Experience Design", image: "/img/projects/drive-thumb.webp" },
  { name: "Brand Identity", image: "/img/projects/mp4-thumb.webp" },
  { name: "Visual Design", image: "/img/projects/frelo-thumb.webp" },
  { name: "Photography", image: "/img/projects/ope-thumb.webp" },
  { name: "Filmmaking", image: "/img/projects/passion-project-thumb.webp" },
  { name: "AI", image: "/img/projects/ai-film-thumb.webp" },
];

export const clientLogos = [
  { src: "/img/logos/logo-1.webp", width: 653, height: 122 },
  { src: "/img/logos/logo-2.webp", width: 584, height: 339 },
  { src: "/img/logos/logo-3.webp", width: 682, height: 244 },
  { src: "/img/logos/logo-4.webp", width: 2306, height: 785 },
  { src: "/img/logos/logo-5.webp", width: 1173, height: 260 },
];
