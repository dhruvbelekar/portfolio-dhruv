/*
  The short version of a case study, told as the page scrolls: the problem,
  the people, what was learned, what was made and how it was tested, one
  screen each. The slides that used to fill these pages went unread, so the
  detail lives on Behance and this carries only the points worth stopping for.

  Each story wears its own project's look (colours, weight of type, the way
  chapters are labelled), so no two projects read as the same template.

  Text wrapped in **double stars** is set in the project's accent colour.
*/

type Image = { src: string; alt: string };

type Chapter = {
  nav: string;
  title: string;
  /* Shown beside the words on a wide screen, under them on a narrow one. */
  image?: Image;
  /* Set on a deep panel in the project's dark colour (DRIVE's navy). */
  deep?: boolean;
  /* Each sentence of the title on a line of its own. */
  stacked?: boolean;
} & (
  | { kind: "intro"; lead?: string; facts?: { name: string; text: string }[] }
  | {
      kind: "personas";
      people: {
        name: string;
        role: string;
        age?: number;
        city?: string;
        photo: string;
        quote: string;
        note: string;
      }[];
    }
  | { kind: "cards"; lead?: string; cards: { name: string; text: string }[]; note?: string }
  | { kind: "statement"; lead?: string; chips?: string[] }
  | { kind: "steps"; meta?: string; steps: { name: string; tags: string[] }[] }
  | { kind: "channels"; channels: { name: string; text: string; image: string }[] }
  | { kind: "gallery"; photos: { src: string; caption: string }[] }
  | { kind: "fixes"; fixes: { name: string; before: string; after: string }[] }
  | { kind: "outro"; lead: string; ctas: { label: string; href: string }[] }
);

export type Story = {
  look: "mahavitaran" | "drive" | "aria" | "film";
  chapters: Chapter[];
};

const behance = "https://www.behance.net/dhruvbelekar1";
const maha = "/img/projects/mahavitaran/story";
const drive = "/img/projects/drive/story";
const aria = "/img/projects/aria/story";
const film = "/img/projects/ai-film/story";

export const stories: Record<string, Story> = {
  mahavitaran: {
    look: "mahavitaran",
    chapters: [
      {
        kind: "intro",
        nav: "Brief",
        title: "Electricity services in Maharashtra were **scattered, slow and hard to trust.**",
        lead: "Paying a bill, raising a complaint or applying for a connection meant juggling a website, an app and the local office.",
        facts: [
          { name: "Website", text: "Cluttered, slow and hard to navigate." },
          { name: "App", text: "Crashes, captchas and OTP fatigue." },
          { name: "Office", text: "Long queues and repeat visits." },
        ],
        image: {
          src: `${maha}/before-platforms.webp`,
          alt: "The old Mahavitaran website and app before the redesign",
        },
      },
      {
        kind: "personas",
        nav: "Users",
        title: "We listened to **three kinds** of customers.",
        people: [
          {
            name: "Shankar Patil",
            role: "Retired government officer",
            age: 68,
            city: "Pune",
            photo: `${maha}/persona-shankar.webp`,
            quote: "Why is this bill payment so complicated?",
            note: "Feels anxious",
          },
          {
            name: "Sunil Jadhav",
            role: "Farmer",
            age: 39,
            city: "Latur",
            photo: `${maha}/persona-sunil.webp`,
            quote: "Registering complaints online never works.",
            note: "Feels distrustful",
          },
          {
            name: "Priya Deshmukh",
            role: "Small business owner",
            age: 32,
            city: "Nagpur",
            photo: `${maha}/persona-priya.webp`,
            quote: "I can’t track what’s happening after I apply.",
            note: "Feels overwhelmed",
          },
        ],
      },
      {
        kind: "cards",
        nav: "Pain points",
        title: "Where it **broke down.**",
        cards: [
          { name: "Payment", text: "Failed payments, refunds that take 7 to 10 days." },
          { name: "Office visits", text: "Long waits, repeat trips, piles of documents." },
          { name: "Complaints", text: "No updates, no timeline, no confirmation." },
          { name: "Website and app", text: "Outdated, slow and easy to get lost in." },
          { name: "Notifications", text: "Late, missed or never sent." },
        ],
        note: "People wanted something simple, reliable and fast that they could trust.",
      },
      {
        kind: "statement",
        nav: "How might we",
        title:
          "How might we design a **simple and reliable** journey that lets every user manage **payments, complaints and services** without stress?",
        chips: [
          "Simpler bill payments for elderly users",
          "Complaints that work on poor internet",
          "A connection journey that flows start to finish",
        ],
      },
      {
        kind: "steps",
        nav: "Process",
        title: "Three months, **five stages.**",
        meta: "August to October",
        steps: [
          { name: "Understand the company", tags: ["Existing platforms"] },
          { name: "Understand the user", tags: ["Review analysis", "Interviews", "Personas"] },
          { name: "Ideate", tags: ["Empathy map", "Journey maps", "How might we"] },
          { name: "Design", tags: ["Information architecture", "User flows", "UI design"] },
          { name: "Test", tags: ["User testing"] },
        ],
      },
      {
        kind: "channels",
        nav: "Solution",
        title: "One AI assistant, on **every channel** people already use.",
        channels: [
          { name: "WhatsApp", text: "Pay, complain and apply right in chat.", image: `${maha}/channel-whatsapp.webp` },
          { name: "App", text: "AI support in Marathi, Hindi and English.", image: `${maha}/channel-app.webp` },
          { name: "ATM", text: "Bill pay and complaints at a machine nearby.", image: `${maha}/channel-atm.webp` },
          { name: "Feature phone", text: "Works without a smartphone or data.", image: `${maha}/channel-featurephone.webp` },
        ],
      },
      {
        kind: "fixes",
        nav: "Testing",
        title: "Testing with users **changed three things.**",
        fixes: [
          { name: "Language", before: "Word for word translations", after: "Natural Marathi and Hindi" },
          { name: "Payment confirmation", before: "A plain line of text", after: "A clear success screen" },
          { name: "Toll free number", before: "56767, hard to remember", after: "1800 267 3435, easy to dial" },
        ],
      },
      {
        kind: "outro",
        nav: "Outcome",
        stacked: true,
        title: "One Platform. Every Channel. **One Mahavitaran.**",
        lead: "Simple, accessible and reliable services for every customer in Maharashtra.",
        ctas: [{ label: "See the full case study on Behance", href: behance }],
        image: {
          src: `${maha}/outcome-channels.webp`,
          alt: "The Mahavitaran assistant on the app, WhatsApp, a feature phone and an ATM",
        },
      },
    ],
  },

  drive: {
    look: "drive",
    chapters: [
      {
        kind: "intro",
        nav: "Hook",
        stacked: true,
        title: "Driving is **freedom.** Driving is **control.** Driving is **independence.**",
        lead: "But what if you’ve never experienced it?",
        image: {
          src: `${drive}/still-preetam.webp`,
          alt: "Preetam, who is visually impaired, standing on a city pavement with a white cane",
        },
      },
      {
        kind: "intro",
        nav: "Problem",
        stacked: true,
        title: "Transportation is accessible. **Driving isn’t.**",
        facts: [
          { name: "Accessibility limit", text: "It helps people reach destinations." },
          { name: "The experience gap", text: "It rarely helps them experience the journey." },
        ],
        image: {
          src: `${drive}/still-passenger.webp`,
          alt: "Preetam riding in the back of a car, cane resting against the seat",
        },
      },
      {
        kind: "statement",
        nav: "Question",
        title: "How might visually impaired people experience driving in an **autonomous future?**",
        lead: "Autonomous cars solve mobility. They don’t solve the experience of driving.",
      },
      {
        kind: "cards",
        nav: "Concept",
        title: "DRIVE, an **AI co driver.**",
        lead: "AI becomes the eyes, sound becomes the road, and control stays in the driver’s hands.",
        cards: [
          { name: "Physical interface", text: "Tactile steering, shifters and spring loaded pedals." },
          { name: "AI companion", text: "Talks through speed, turns and surroundings." },
          { name: "Soundscape", text: "Engine rumble and binaural cues around the driver." },
        ],
        image: {
          src: `${drive}/still-codriver.webp`,
          alt: "Preetam at the wheel while the dashboard reads: right turn in 50 meters",
        },
      },
      {
        kind: "steps",
        nav: "Build",
        deep: true,
        title: "Eleven prototypes, **three phases.**",
        meta: "One question at every step: does the driver feel the road?",
        steps: [
          {
            name: "Cardboard",
            tags: ["Laser cut frame", "Cardboard parts", "Dashboard assembly", "On road testing"],
          },
          {
            name: "Digital fabrication",
            tags: ["3D printed chassis", "Haptic gears", "Accelerator", "Responsive compression"],
          },
          {
            name: "Feedback loop",
            tags: ["Pedal electronics", "Responsive testing", "Haptic steering wheel"],
          },
        ],
      },
      {
        kind: "gallery",
        nav: "Prototypes",
        title: "From cardboard to **live electronics.**",
        photos: [
          { src: `${drive}/proto-cardboard.webp`, caption: "Cardboard wheel" },
          { src: `${drive}/proto-dashboard.webp`, caption: "Fitted in the car" },
          { src: `${drive}/proto-pedal.webp`, caption: "3D printed pedal" },
          { src: `${drive}/proto-wheel.webp`, caption: "Haptic steering wheel" },
        ],
      },
      {
        kind: "statement",
        nav: "Testing",
        title: "“I want to feel like I am actually driving, not just carried around as **cargo.**”",
        lead: "A visually impaired tester, on the road with the cardboard prototype.",
        image: {
          src: `${drive}/test-on-road.webp`,
          alt: "A tester holding the cardboard steering wheel in the passenger seat of a moving car",
        },
      },
      {
        kind: "steps",
        nav: "Experience",
        title: "A drive you **hear and feel.**",
        meta: "A sound box fires a cue at each moment of a real route.",
        steps: [
          { name: "Start", tags: ["The console pulses and the co driver says hello."] },
          { name: "Engine", tags: ["A dial frees the wheel and the engine rumbles."] },
          { name: "Open road", tags: ["Pitch follows the curves through the wheel."] },
          { name: "Tunnel", tags: ["Reverb shifts as haptics tick past each pillar."] },
          { name: "City", tags: ["The wheel clicks at every crossing."] },
        ],
      },
      {
        kind: "outro",
        nav: "Reflection",
        deep: true,
        stacked: true,
        title:
          "Accessibility is not only about reaching a destination. **It’s about experiencing the road along the way.**",
        lead: "Experience the road. Own the journey.",
        ctas: [{ label: "See the full case study on Behance", href: behance }],
        image: {
          src: `${drive}/still-arrived.webp`,
          alt: "Preetam at the wheel as the dashboard reads: destination reached",
        },
      },
    ],
  },

  aria: {
    look: "aria",
    chapters: [
      {
        kind: "intro",
        nav: "Brief",
        title: "An AI fitness companion people **actually keep using.**",
        lead: "A conversational fitness system designed to guide, simplify and engage.",
        facts: [
          { name: "Role", text: "Solo designer" },
          { name: "Scope", text: "Research, IA, UI and testing" },
          { name: "Output", text: "A working prototype" },
        ],
        image: {
          src: `${aria}/brief-laptop.webp`,
          alt: "The ARIA dashboard greeting Arjun on a laptop against a warm orange backdrop",
        },
      },
      {
        kind: "personas",
        nav: "Listening",
        title: "The brief was three sentences, **not a feature list.**",
        people: [
          {
            name: "Meena",
            role: "The parent",
            photo: `${aria}/persona-meena.webp`,
            quote: "Ab nahi hota… age ho gayi hai.",
            note: "Motivation has left",
          },
          {
            name: "Arjun",
            role: "The working pro",
            photo: `${aria}/persona-arjun.webp`,
            quote: "Gym jaana hai… but meeting hai…",
            note: "Time has left",
          },
          {
            name: "Riya",
            role: "The beginner",
            photo: `${aria}/persona-riya.webp`,
            quote: "Abs karu? Cardio? Strength?",
            note: "Direction has left",
          },
        ],
      },
      {
        kind: "cards",
        nav: "Benchmark",
        title: "What the market **already covers.**",
        cards: [
          { name: "Nike Training Club", text: "Guided workouts, little else." },
          { name: "Cult.fit", text: "Live and gym based classes." },
          { name: "MyFitnessPal", text: "Nutrition tracking only." },
          { name: "HealthifyMe", text: "Diet first, with an AI coach." },
          { name: "ARIA", text: "Workouts, food, AI, games and voice together." },
        ],
        note: "Every app solves one persona well and abandons the other two.",
      },
      {
        kind: "statement",
        nav: "How might we",
        title:
          "How might we create a fitness experience that **adapts** to different lifestyles, motivations and behaviours?",
        lead: "Different users don’t need more features. They need different experiences.",
        chips: [
          "Meena: make fitness feel enjoyable",
          "Arjun: make it fit into very little time",
          "Riya: give beginners clear guidance",
        ],
      },
      {
        kind: "steps",
        nav: "Process",
        title: "Eight phases, **one direction.**",
        meta: "From sentences people said, to a structure, to screens.",
        steps: [
          { name: "Listen and model", tags: ["Three sentences", "Three behaviours"] },
          { name: "Benchmark and frame", tags: ["Market check", "One question per person"] },
          { name: "Decide and structure", tags: ["Insight to solution", "Journey", "Five system layers"] },
          { name: "Build and test", tags: ["Seven features", "Five fixes"] },
        ],
      },
      {
        kind: "channels",
        nav: "Solution",
        title: "A coach you **talk to**, not an app you navigate.",
        channels: [
          { name: "Voice AI", text: "Hands free logging and spoken coaching.", image: `${aria}/screen-voice.webp` },
          { name: "GestureRun", text: "A movement game for low motivation days.", image: `${aria}/screen-gesture.webp` },
          { name: "Guided workouts", text: "Curated playlists, so beginners don’t have to choose.", image: `${aria}/screen-workouts.webp` },
          { name: "Effortless tracking", text: "Type, speak or photograph what you ate.", image: `${aria}/screen-tracking.webp` },
        ],
      },
      {
        kind: "fixes",
        nav: "Testing",
        title: "Five findings, **five fixes.**",
        fixes: [
          { name: "Onboarding", before: "Too many inputs", after: "Step by step, fewer fields" },
          { name: "GestureRun", before: "Entry point was missed", after: "Visual cues and a hint" },
          { name: "Voice", before: "Unsure when to speak", after: "Visible mic and “Try saying” prompts" },
          { name: "Beginners", before: "Too many features at once", after: "Progressive disclosure" },
          { name: "Tracking", before: "Manual logging felt like work", after: "Voice and photo input" },
        ],
      },
      {
        kind: "outro",
        nav: "Outcome",
        stacked: true,
        title: "ARIA is not just a fitness app. **It’s a system designed to guide, simplify and engage.**",
        lead: "Users preferred simplicity and guidance over feature richness.",
        ctas: [
          { label: "Try ARIA live", href: "https://dhruvbelekar.github.io/aria-fitness/" },
          { label: "Full case study on Behance", href: behance },
        ],
        image: {
          src: `${aria}/outro-tv.webp`,
          alt: "A man squatting in front of a TV running ARIA, his joints tracked by the camera",
        },
      },
    ],
  },

  "ai-film": {
    look: "film",
    chapters: [
      {
        kind: "intro",
        nav: "Brief",
        title: "A short film made **entirely with AI.**",
        lead: "Every frame, voice and cut came from generative tools, and it reached 10,000+ views on Instagram.",
        facts: [
          { name: "Method", text: "Prompt, frame, shot, cut" },
          { name: "Stack", text: "ChatGPT, Midjourney, Runway, Kling, ElevenLabs, Premiere Pro" },
          { name: "Steps", text: "Six, in sequence" },
        ],
        image: { src: "/img/projects/ai-film-thumb.webp", alt: "The New World title card over a glowing horizon" },
      },
      {
        kind: "steps",
        nav: "Process",
        title: "Six steps, **in sequence.**",
        steps: [
          { name: "Describe the idea", tags: ["ChatGPT"] },
          { name: "Write shot prompts", tags: ["ChatGPT"] },
          { name: "Generate frames", tags: ["Midjourney"] },
          { name: "Image to video", tags: ["Runway", "Kling"] },
          { name: "Voice and lip sync", tags: ["ElevenLabs", "Act One"] },
          { name: "Cut and sound", tags: ["Premiere Pro"] },
        ],
      },
      {
        kind: "statement",
        nav: "Script",
        title: "ChatGPT was cast as a **cinematographer** first.",
        lead: "Scenes arrive one at a time and each breaks into shots, with a prompt for every tool.",
        image: { src: `${film}/setup-prompt.webp`, alt: "The setup message that gave ChatGPT its role" },
      },
      {
        kind: "statement",
        nav: "Frames",
        title: "One prompt, four candidates, **one upscale.**",
        lead: "The pick was about continuity: the frame that matched the character and the room.",
        image: { src: `${film}/midjourney-grid.webp`, alt: "Four Midjourney candidates for one shot" },
      },
      {
        kind: "statement",
        nav: "Motion",
        title: "The still already knows **where it’s going.**",
        lead: "Each frame went into Runway and Kling with its camera move written, not keyframed.",
        image: { src: `${film}/frame-motion.webp`, alt: "A young man staring anxiously at his phone, one hand on his forehead" },
      },
      {
        kind: "statement",
        nav: "Voice and edit",
        title: "Audio first, **then the cut.**",
        lead: "Narration from ElevenLabs, lip sync in Runway Act One, then six video and four audio tracks in Premiere Pro.",
        image: { src: `${film}/premiere-timeline.webp`, alt: "The film's timeline in Premiere Pro" },
      },
      {
        kind: "cards",
        nav: "Learnings",
        title: "The hard part was **the same face, twice.**",
        cards: [
          { name: "Challenge", text: "Keeping one face consistent across new prompts, rooms and angles." },
          { name: "Learning", text: "Writing for each tool in its own language." },
        ],
        note: "Most of the regeneration went into character consistency.",
      },
      {
        kind: "outro",
        nav: "Outcome",
        stacked: true,
        title: "The New World. **10,000+ views.**",
        lead: "Parts two and three are on Instagram.",
        ctas: [
          { label: "Watch the series on Instagram", href: "https://www.instagram.com/p/DEsODJ8B3Vx/?hl=en" },
          { label: "Full process on Behance", href: behance },
        ],
        image: { src: "/img/projects/ai-film/promo-poster.webp", alt: "Earth at night from orbit, a still from the film" },
      },
    ],
  },
};
