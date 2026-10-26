const A = "https://horizon-vision-folio.lovable.app";

export const CONTACT = {
  email: "gamerzdeadshot52@gmail.com",
  instagram: "https://instagram.com/horizon___designs",
  instagramHandle: "@horizon___designs",
};

export const SERVICES = [
  { title: "Graphic Design", desc: "Posters, banners, ads and marketing creatives built on strong hierarchy and clean typography.", items: ["Posters & Banners", "Ad Creatives", "Print Layouts"], shape: "box" },
  { title: "Video Editing", desc: "Short-form and long-form edits with pacing, colour and sound that keep viewers watching.", items: ["Reels & Shorts", "YouTube Edits", "Colour & Sound"], shape: "cone" },
  { title: "Web Design", desc: "Responsive, modern interfaces designed around clarity, rhythm and conversion.", items: ["Landing Pages", "Portfolio Sites", "Responsive UI"], shape: "torus" },
  { title: "Branding", desc: "Visual identity systems — logo lockups, colour, type and usage rules that stay consistent.", items: ["Logo Systems", "Brand Guides", "Identity Kits"], shape: "ico" },
  { title: "Thumbnail Design", desc: "Click-worthy thumbnails engineered for contrast, readability and instant subject focus.", items: ["YouTube Thumbnails", "Series Art", "A/B Variants"], shape: "oct" },
  { title: "Social Media Creatives", desc: "Post and story systems that scale across a full content calendar without losing identity.", items: ["Post Systems", "Story Templates", "Campaign Sets"], shape: "knot" },
] as const;

export const CATEGORIES = ["All", "Graphic Design", "Video Editing", "Web Design", "Branding", "Social Media"] as const;

export type Project = { title: string; category: string; img: string; alt: string };

export const PROJECTS: Project[] = [
  { title: "Ultimate Gaming PC Bundle", category: "Graphic Design", img: `${A}/__l5e/assets-v1/1346db54-2ac5-4327-86a7-b4ef2b2a2ade/gaming-pc-bundle.png`, alt: "Gaming PC bundle advertisement layout with pricing, spec badges and product photography" },
  { title: "Selling eBooks — Money Story", category: "Social Media", img: `${A}/__l5e/assets-v1/3fcd6bec-25a3-48e9-83b4-c4add3f1d877/ebooks.png`, alt: "Selling eBooks promotional graphic with layered typography and phone mockup" },
  { title: "Before / After — PC Transformation", category: "Graphic Design", img: `${A}/__l5e/assets-v1/debdede7-c6eb-4276-81de-aaf9b90d22ef/pc-build.png`, alt: "Before and after split composition of a desktop PC transformed into an RGB lit gaming build" },
  { title: "Gaming Channel Identity", category: "Branding", img: `${A}/__l5e/assets-v1/4d4031a6-8296-4d0e-b1fc-ba98591d0b11/gaming-channel.jpeg`, alt: "Gaming channel key art with illustrated character holding game tiles and neon lettering" },
  { title: "Stunning Thumbnails Promo", category: "Social Media", img: `${A}/__l5e/assets-v1/5fbc2e2c-193b-4bdc-a747-6816989c4616/yt-promo.webp`, alt: "Vertical promotional graphic advertising custom YouTube thumbnail design" },
  { title: "Creator Growth Series", category: "Video Editing", img: `${A}/__l5e/assets-v1/f9429947-f6df-45b9-8e67-58f9574506f6/grow.png`, alt: "Creator growth series artwork with green backdrop, cut-out subject and large earnings figure" },
  { title: "Build Series — Three Panel", category: "Video Editing", img: `${A}/__l5e/assets-v1/73e85461-d095-4abf-ad0a-a6a35e988483/mcpe.jpg`, alt: "Three panel build series artwork showing progressive in-game house builds" },
  { title: "One Block — Survival Episode", category: "Video Editing", img: `${A}/__l5e/assets-v1/79b93b1c-dd73-4de3-a494-a3428984d9b2/oneblock.jpg`, alt: "One Block survival episode artwork with a single floating block and directional arrow" },
  { title: "Platinum 16x — Pack Feature", category: "Graphic Design", img: `${A}/__l5e/assets-v1/d7931c18-a3c4-4e4c-95c6-029d4cebf068/platinum.jpg`, alt: "Platinum 16x pack feature graphic with violet lighting effects and character render" },
  { title: "Royal Clinic — Lucknow", category: "Web Design", img: `${A}/assets/web1-D0iULv-x.jpg`, alt: "Royal Clinic Lucknow website homepage with appointment booking and call actions" },
  { title: "Alaska Family Medical Care", category: "Web Design", img: `${A}/assets/web3-Daf6cqup.jpg`, alt: "Alaska Family Medical Care website homepage for a family clinic in Anchorage" },
  { title: "Craft a Life of Purpose", category: "Web Design", img: `${A}/assets/web4-nxFwomu0.jpg`, alt: "Life coaching website with editorial typography and warm neutral palette" },
  { title: "Fairdeal Agencies", category: "Web Design", img: `${A}/assets/web5-Doa0PleP.jpg`, alt: "Fairdeal Agencies home appliances showroom website with product catalogue" },
  { title: "Fairdeal — Smart Appliances", category: "Web Design", img: `${A}/assets/web6-DN67WxKE.jpg`, alt: "Fairdeal Agencies smart appliances storefront website hero section" },
  { title: "Rakhi Surprises", category: "Web Design", img: `${A}/assets/web2-CWj5x87J.jpg`, alt: "Raksha Bandhan surprise microsite with festive interactive design" },
  { title: "Dhruva Infra & Energy Solutions", category: "Web Design", img: `${A}/assets/web7-BAF-mO0a.jpg`, alt: "Dhruva Infra and Energy Solutions solar website hero with solar panels and free quote CTA" },
  { title: "Star Electronics Ganga", category: "Web Design", img: `${A}/assets/web8-DqsiwlZx.jpg`, alt: "Star Electronics Ganga website showcasing mobiles, electronics and furniture" },
];

export const PROCESS = [
  { n: "01", title: "Discover", desc: "Understanding the brand, the audience and the goal before a single pixel moves." },
  { n: "02", title: "Create", desc: "Concepting and building the visual direction — layout, colour, motion and type." },
  { n: "03", title: "Refine", desc: "Iterating on feedback until every detail reads exactly the way it should." },
  { n: "04", title: "Deliver", desc: "Final files, formats and handover — ready to publish across every channel." },
];

export function buildMailto(d: { name: string; email: string; service: string; details: string }) {
  const subject = `New project enquiry — ${d.service}`;
  const body = `Name: ${d.name}\nEmail: ${d.email}\nService: ${d.service}\n\nProject details:\n${d.details}`;
  return `mailto:${CONTACT.email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
}
