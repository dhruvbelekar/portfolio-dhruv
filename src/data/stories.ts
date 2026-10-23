/*
  The short version of a case study, told as the page scrolls: the problem,
  the people, what was learned, what was made and how it was tested, one
  screen each. The slides that used to fill these pages went unread, so the
  detail lives on Behance and this carries only the points worth stopping for.

  Text wrapped in **double stars** is set in the project's accent colour.
*/

type Chapter = { nav: string; title: string } & (
  | {
      kind: "intro";
      lead: string;
      facts: { name: string; text: string }[];
      image?: { src: string; alt: string };
    }
  | {
      kind: "personas";
      people: {
        name: string;
        role: string;
        age: number;
        city: string;
        photo: string;
        quote: string;
        feels: string;
      }[];
    }
  | { kind: "cards"; cards: { name: string; text: string }[]; note?: string }
  | { kind: "statement"; chips?: string[] }
  | { kind: "steps"; meta?: string; steps: { name: string; tags: string[] }[] }
  | { kind: "channels"; channels: { name: string; text: string; image: string }[] }
  | { kind: "fixes"; fixes: { name: string; before: string; after: string }[] }
  | {
      kind: "outro";
      lead: string;
      cta: { label: string; href: string };
      image?: { src: string; alt: string };
    }
);

export type Story = {
  /* The project's own brand colour, so the story reads as its project and not
     as the portfolio around it. */
  accent: string;
  chapters: Chapter[];
};

const maha = "/img/projects/mahavitaran/story";

export const stories: Record<string, Story> = {
  mahavitaran: {
    accent: "#DC143C",
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
            feels: "Anxious",
          },
          {
            name: "Sunil Jadhav",
            role: "Farmer",
            age: 39,
            city: "Latur",
            photo: `${maha}/persona-sunil.webp`,
            quote: "Registering complaints online never works.",
            feels: "Distrustful",
          },
          {
            name: "Priya Deshmukh",
            role: "Small business owner",
            age: 32,
            city: "Nagpur",
            photo: `${maha}/persona-priya.webp`,
            quote: "I can’t track what’s happening after I apply.",
            feels: "Overwhelmed",
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
        title: "One Platform. Every Channel. **One Mahavitaran.**",
        lead: "Simple, accessible and reliable services for every customer in Maharashtra.",
        cta: { label: "See the full case study on Behance", href: "https://www.behance.net/dhruvbelekar1" },
        image: {
          src: `${maha}/outcome-channels.webp`,
          alt: "The Mahavitaran assistant on the app, WhatsApp, a feature phone and an ATM",
        },
      },
    ],
  },
};
