/* ==========================================================================
   LuminaForge — Site Configuration
   --------------------------------------------------------------------------
   This is the ONLY file you need to edit to update your portfolio content.
   Everything below renders automatically into the page.

   HOW TO ADD A PROJECT SCREENSHOT
   1. Save your screenshot as a .jpg or .webp (≈1600×1000, top of the page).
   2. Drop it into  assets/projects/  (e.g. assets/projects/salon.jpg).
   3. Set  image: "assets/projects/salon.jpg"  on that project below.
   If image is left empty, a clean branded placeholder shows automatically —
   nothing breaks, and the layout stays identical.
   ========================================================================== */

const SITE = {
  brand: "LuminaForge",
  tagline: "Websites that make small businesses look serious.",
  // --- Contact details — update these to your real ones ---
  email: "siakhan7575@gmail.com",
  // WhatsApp number in international format, digits only (no +, spaces or dashes).
  // TODO: replace with your real number, e.g. "923001234567".
  whatsapp: "923000000000",
  location: "Mardan, KPK · Serving Rawalpindi & Islamabad",
  // Optional contact-form endpoint (e.g. a Formspree URL "https://formspree.io/f/xxxx").
  // Leave empty to fall back to opening the visitor's email client automatically.
  formEndpoint: "",
  social: {
    studio: "https://lumierestudio.netlify.app",
    github: "https://github.com/siakhan7575-cyber",
  },
};

/* --------------------------------------------------------------------------
   PROJECTS  — your featured website work.
   status: "live"        → shows "View Live Demo" + "View Project" buttons
           "comingSoon"  → shows a tasteful "In progress" state, buttons muted
   image:  path to screenshot, or "" to use the auto placeholder.
   -------------------------------------------------------------------------- */
const PROJECTS = [
  {
    name: "Lumière Salon",
    type: "Beauty & Salon",
    status: "live",
    image: "", // add assets/projects/salon.jpg
    description:
      "A polished booking-first website for a modern salon — services, pricing and an easy way for clients to get in touch, wrapped in a warm, editorial look.",
    features: ["Services & pricing", "Booking CTA", "Mobile-first", "Fast load"],
    liveUrl: "https://lumierestudio.netlify.app",
    projectUrl: "https://lumierestudio.netlify.app",
  },
  {
    name: "Terra Trio",
    type: "Creative / Landing Page",
    status: "live",
    image: "", // add assets/projects/terra-trio.jpg
    description:
      "An immersive single-page experience with an animated starfield and orbiting hero — built to show off motion, layout and performance without a heavy framework.",
    features: ["Canvas animation", "Scroll reveal", "Reduced-motion", "Zero dependencies"],
    liveUrl: "demos/terra-trio.html",
    projectUrl: "demos/terra-trio.html",
  },
  {
    name: "Your Next Project",
    type: "Business Website",
    status: "comingSoon",
    image: "",
    description:
      "A slot ready for your next build. Duplicate this entry in data.js, drop in a screenshot, and it appears here instantly — no layout changes needed.",
    features: ["Add a screenshot", "Set the live link", "Ship it"],
    liveUrl: "",
    projectUrl: "",
  },
];

/* --------------------------------------------------------------------------
   SERVICES
   -------------------------------------------------------------------------- */
const SERVICES = [
  {
    icon: "layout",
    title: "Website Design & Build",
    text: "Custom, responsive websites designed around your business — not a template everyone else is using.",
    points: ["Design + development", "Mobile, tablet & desktop", "Clean, fast, modern"],
  },
  {
    icon: "code",
    title: "Full-Stack Development",
    text: "Frontend, backend and admin dashboards when your site needs to do more than look good.",
    points: ["React & JavaScript", "Supabase / backend", "Admin dashboards"],
  },
  {
    icon: "spark",
    title: "Digital Presence Setup",
    text: "Get a small business online properly — brand, domain, hosting and a site you can actually grow with.",
    points: ["Brand & identity", "Domain + hosting", "Launch on Netlify"],
  },
];

/* --------------------------------------------------------------------------
   PROCESS
   -------------------------------------------------------------------------- */
const PROCESS = [
  { title: "Discover", text: "We talk through your business, goals and what a great result actually looks like for you." },
  { title: "Design", text: "I craft a clean, on-brand layout and share it early so nothing is a surprise." },
  { title: "Build", text: "I develop it with fast, maintainable code — responsive and tested across devices." },
  { title: "Launch", text: "We go live, I hand everything over, and I make sure you're comfortable running it." },
];

/* --------------------------------------------------------------------------
   WHY WORK WITH ME
   -------------------------------------------------------------------------- */
const WHY = [
  { icon: "user", title: "You work with me directly", text: "No account managers or hand-offs. You talk to the person actually designing and building your site." },
  { icon: "eye", title: "Design-led, not template-led", text: "Every site is built to fit your business — thoughtful typography, spacing and detail, not a drag-and-drop clone." },
  { icon: "gauge", title: "Fast & built to last", text: "Lightweight, accessible code that loads quickly and is easy to maintain and extend later." },
  { icon: "chat", title: "Clear communication", text: "Honest timelines, no jargon, and updates you can actually follow from first message to launch." },
];

/* --------------------------------------------------------------------------
   TESTIMONIALS
   These are neutral PLACEHOLDERS so you can see the layout. Replace the text
   and names with real client quotes as you collect them, or set this to an
   empty array []  to show a tasteful "testimonials coming soon" state.
   -------------------------------------------------------------------------- */
const TESTIMONIALS = [
  { quote: "Add a real client quote here once you've wrapped a project — a sentence or two on what it was like working with you.", name: "Client Name", role: "Business type" },
  { quote: "Keep these short and specific. A line about the result or the experience lands better than generic praise.", name: "Client Name", role: "Business type" },
  { quote: "Swap in genuine words from the people you build for. Until then, this section is clearly marked as placeholder.", name: "Client Name", role: "Business type" },
];
