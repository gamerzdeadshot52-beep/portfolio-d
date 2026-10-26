import { AnimatePresence, motion } from "motion/react";
import { useEffect, useState, type ComponentProps } from "react";
import { Sculpture3D, ServiceIcon3D } from "./Canvas3D";
import { Reveal, SectionHead, StaggerText, Tilt } from "./ui";
import { CATEGORIES, CONTACT, PROCESS, PROJECTS, SERVICES, buildMailto, type Project } from "@/lib/portfolio-data";

const NAV = ["Home", "About", "Services", "Work", "Contact"];

function Btn({ variant = "primary", className = "", ...p }: ComponentProps<"a"> & { variant?: "primary" | "ghost" }) {
  const base = "inline-flex items-center justify-center gap-2 rounded-full px-7 py-3.5 text-sm font-semibold transition-all duration-300 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring";
  const v = variant === "primary"
    ? "bg-brand text-primary-foreground shadow-glow hover:scale-[1.04]"
    : "glass text-foreground hover:bg-secondary";
  return <a className={`${base} ${v} ${className}`} {...p} />;
}

export function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [active, setActive] = useState("home");
  const [open, setOpen] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    const io = new IntersectionObserver(
      (es) => es.forEach((e) => e.isIntersecting && setActive(e.target.id)),
      { rootMargin: "-45% 0px -50% 0px" },
    );
    NAV.forEach((n) => { const el = document.getElementById(n.toLowerCase()); if (el) io.observe(el); });
    return () => { window.removeEventListener("scroll", onScroll); io.disconnect(); };
  }, []);
  return (
    <header className={`fixed inset-x-0 top-0 z-50 transition-all duration-500 ${scrolled ? "glass py-3" : "py-6"}`}>
      <nav className="mx-auto flex max-w-7xl items-center justify-between px-6">
        <a href="#home" className="font-display text-lg font-bold">Horizon<span className="text-gradient">.</span></a>
        <ul className="hidden items-center gap-1 md:flex">
          {NAV.map((n) => {
            const id = n.toLowerCase();
            return (
              <li key={n}>
                <a href={`#${id}`} className={`relative rounded-full px-4 py-2 text-sm transition-colors ${active === id ? "text-foreground" : "text-muted-foreground hover:text-foreground"}`}>
                  {active === id && <motion.span layoutId="nav-dot" className="absolute inset-0 -z-10 rounded-full bg-secondary" />}
                  {n}
                </a>
              </li>
            );
          })}
        </ul>
        <div className="flex items-center gap-3">
          <Btn href="#contact" className="hidden !px-5 !py-2.5 sm:inline-flex">Start a Project</Btn>
          <button aria-label="Menu" aria-expanded={open} onClick={() => setOpen(!open)} className="glass flex h-10 w-10 flex-col items-center justify-center gap-1.5 rounded-full md:hidden">
            <span className={`h-px w-4 bg-foreground transition ${open ? "translate-y-[3.5px] rotate-45" : ""}`} />
            <span className={`h-px w-4 bg-foreground transition ${open ? "-translate-y-[3.5px] -rotate-45" : ""}`} />
          </button>
        </div>
      </nav>
      <AnimatePresence>
        {open && (
          <motion.ul initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }} className="glass mx-4 mt-3 rounded-2xl p-3 md:hidden">
            {NAV.map((n) => (
              <li key={n}><a onClick={() => setOpen(false)} href={`#${n.toLowerCase()}`} className="block rounded-xl px-4 py-3 text-lg hover:bg-secondary">{n}</a></li>
            ))}
          </motion.ul>
        )}
      </AnimatePresence>
    </header>
  );
}

const STATS = [["4+", "Years"], ["100+", "Projects"], ["3", "Creative Disciplines"]];

export function Hero() {
  return (
    <section id="home" className="relative flex min-h-screen items-center overflow-hidden pt-24">
      <div className="bg-grid absolute inset-0 opacity-60" />
      <div className="absolute -top-40 left-1/2 h-[600px] w-[900px] -translate-x-1/2 rounded-full bg-primary/20 blur-[140px]" />
      <Sculpture3D variant="hero" className="absolute inset-0 lg:left-[35%]" />
      <div className="relative z-10 mx-auto w-full max-w-7xl px-6 pointer-events-none">
        <div className="max-w-3xl pointer-events-auto">
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.2 }} className="eyebrow mb-6">
            Graphic Designer • Video Editor • Web Designer
          </motion.p>
          <h1 className="text-5xl font-extrabold leading-[0.98] sm:text-6xl lg:text-7xl">
            <StaggerText text="I Turn Ideas Into" />
            <span className="text-gradient"><StaggerText text="Visual Experiences." /></span>
          </h1>
          <Reveal delay={0.6}>
            <p className="mt-8 max-w-lg text-lg text-muted-foreground">
              Creating impactful visuals, engaging videos, and modern digital experiences with creativity and purpose.
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Btn href="#work">View My Work →</Btn>
              <Btn href="#contact" variant="ghost">Let's Work Together</Btn>
            </div>
            <dl className="mt-14 flex gap-10">
              {STATS.map(([v, l]) => (
                <div key={l}>
                  <dt className="font-display text-3xl font-bold md:text-4xl">{v}</dt>
                  <dd className="mt-1 text-xs uppercase tracking-widest text-muted-foreground">{l}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}

export function About() {
  return (
    <section id="about" className="relative mx-auto max-w-7xl px-6 py-32">
      <div className="grid items-center gap-16 lg:grid-cols-[1.2fr_1fr]">
        <div>
          <SectionHead eyebrow="About — Horizon Designs" title="More Than Design. I Create Impact." />
          <Reveal delay={0.15}>
            <p className="max-w-xl text-lg leading-relaxed text-muted-foreground">
              With 4+ years of experience in graphic design, video editing and web design, I help brands and businesses
              transform ideas into engaging visual experiences. My work combines creativity, clean design and purposeful storytelling.
            </p>
            <p className="mt-6 font-display text-xl">Vishal Singh <span className="text-muted-foreground">— Horizon Designs</span></p>
          </Reveal>
          <div className="mt-12 grid grid-cols-3 gap-4">
            {[["4+", "Years of Experience"], ["100+", "Creative Projects"], ["3", "Creative Disciplines"]].map(([v, l], i) => (
              <Reveal key={l} delay={0.1 * i}>
                <div className="glass rounded-2xl p-5">
                  <p className="font-display text-3xl font-bold text-gradient">{v}</p>
                  <p className="mt-2 text-xs text-muted-foreground">{l}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
        <Reveal className="relative aspect-square">
          <div className="absolute inset-8 rounded-full bg-accent/10 blur-3xl" />
          <Sculpture3D variant="about" className="absolute inset-0" />
        </Reveal>
      </div>
    </section>
  );
}

export function Services() {
  return (
    <section id="services" className="mx-auto max-w-7xl px-6 py-32">
      <SectionHead eyebrow="Services" title="What I Do Best" sub="Three disciplines, one standard — considered, cinematic and built to perform." />
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {SERVICES.map((s, i) => (
          <Reveal key={s.title} delay={(i % 3) * 0.1}>
            <Tilt className="group h-full">
              <article className="glass relative h-full overflow-hidden rounded-3xl p-7 transition-all duration-500 group-hover:-translate-y-1 group-hover:border-primary/60 group-hover:shadow-glow">
                <div className="absolute -right-10 -top-10 h-40 w-40 rounded-full bg-primary/10 blur-2xl transition-opacity group-hover:opacity-100" />
                <div className="flex items-start justify-between">
                  <span className="font-display text-sm text-muted-foreground">0{i + 1}</span>
                  <ServiceIcon3D shape={s.shape} className="h-28 w-28" />
                </div>
                <h3 className="mt-2 text-2xl font-bold">{s.title}</h3>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{s.desc}</p>
                <ul className="mt-6 flex flex-wrap gap-2">
                  {s.items.map((it) => <li key={it} className="rounded-full border px-3 py-1 text-xs text-ice">{it}</li>)}
                </ul>
              </article>
            </Tilt>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Work() {
  const [cat, setCat] = useState<string>("All");
  const [sel, setSel] = useState<Project | null>(null);
  const list = cat === "All" ? PROJECTS : PROJECTS.filter((p) => p.category === cat);
  useEffect(() => {
    if (!sel) return;
    const k = (e: KeyboardEvent) => e.key === "Escape" && setSel(null);
    window.addEventListener("keydown", k);
    return () => window.removeEventListener("keydown", k);
  }, [sel]);
  return (
    <section id="work" className="mx-auto max-w-7xl px-6 py-32">
      <SectionHead eyebrow="Selected Work" title="Projects That Speak Louder Than Words" sub="A selection of graphic design, video and web work. Open a project for the full breakdown." />
      <div role="tablist" className="mb-10 flex flex-wrap gap-2">
        {CATEGORIES.map((c) => (
          <button key={c} role="tab" aria-selected={cat === c} onClick={() => setCat(c)}
            className={`relative rounded-full px-5 py-2 text-sm transition-colors ${cat === c ? "text-primary-foreground" : "glass text-muted-foreground hover:text-foreground"}`}>
            {cat === c && <motion.span layoutId="cat" className="absolute inset-0 -z-10 rounded-full bg-brand" />}
            {c}
          </button>
        ))}
      </div>
      <motion.ul layout className="columns-1 gap-6 sm:columns-2 lg:columns-3">
        <AnimatePresence mode="popLayout">
          {list.map((p) => (
            <motion.li key={p.title} layout initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }} exit={{ opacity: 0, scale: 0.9 }} transition={{ duration: 0.4 }} className="mb-6 break-inside-avoid">
              <Tilt className="group">
                <button onClick={() => setSel(p)} className="glass block w-full overflow-hidden rounded-3xl text-left transition-all duration-500 group-hover:-translate-y-2 group-hover:shadow-glow focus-visible:ring-2 focus-visible:ring-ring focus-visible:outline-none">
                  <div className="overflow-hidden">
                    <img src={p.img} alt={p.alt} loading="lazy" className="w-full transition-transform duration-700 group-hover:scale-105" />
                  </div>
                  <div className="flex items-center justify-between p-5">
                    <div>
                      <p className="eyebrow !text-[10px]">{p.category}</p>
                      <h3 className="mt-1.5 text-lg font-semibold">{p.title}</h3>
                    </div>
                    <span className="flex h-10 w-10 items-center justify-center rounded-full border transition-colors group-hover:bg-brand">↗</span>
                  </div>
                </button>
              </Tilt>
            </motion.li>
          ))}
        </AnimatePresence>
      </motion.ul>
      <AnimatePresence>
        {sel && (
          <motion.div role="dialog" aria-modal aria-label={sel.title} initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center bg-background/85 p-4 backdrop-blur-xl" onClick={() => setSel(null)}>
            <motion.div initial={{ y: 40, scale: 0.95 }} animate={{ y: 0, scale: 1 }} exit={{ y: 40, scale: 0.95 }} onClick={(e) => e.stopPropagation()}
              className="glass grid max-h-[90vh] w-full max-w-5xl overflow-auto rounded-3xl md:grid-cols-[1.5fr_1fr]">
              <img src={sel.img} alt={sel.alt} className="h-full w-full object-contain bg-card" />
              <div className="flex flex-col p-8">
                <p className="eyebrow">{sel.category}</p>
                <h3 className="mt-3 text-3xl font-bold">{sel.title}</h3>
                <p className="mt-4 text-muted-foreground">{sel.alt}.</p>
                <dl className="mt-8 space-y-3 text-sm">
                  <div className="flex justify-between border-b pb-3"><dt className="text-muted-foreground">Discipline</dt><dd>{sel.category}</dd></div>
                  <div className="flex justify-between border-b pb-3"><dt className="text-muted-foreground">Studio</dt><dd>Horizon Designs</dd></div>
                </dl>
                <div className="mt-auto flex gap-3 pt-8">
                  <Btn href="#contact" onClick={() => setSel(null)}>Start a similar project</Btn>
                  <button onClick={() => setSel(null)} className="glass rounded-full px-5 text-sm">Close</button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

export function Process() {
  return (
    <section id="process" className="mx-auto max-w-7xl px-6 py-32">
      <SectionHead eyebrow="Process" title="How I Bring Ideas To Life" />
      <div className="relative grid gap-8 md:grid-cols-4">
        <div className="absolute left-0 right-0 top-6 hidden h-px bg-border md:block">
          <motion.div className="h-full origin-left bg-brand" initial={{ scaleX: 0 }} whileInView={{ scaleX: 1 }} viewport={{ once: true }} transition={{ duration: 1.6, ease: "easeInOut" }} />
        </div>
        {PROCESS.map((s, i) => (
          <Reveal key={s.n} delay={0.25 * i}>
            <div className="relative">
              <div className="relative z-10 flex h-12 w-12 items-center justify-center rounded-full bg-background">
                <span className="absolute inset-0 animate-ping rounded-full bg-primary/30" style={{ animationDuration: "3s", animationDelay: `${i * 0.5}s` }} />
                <span className="relative flex h-12 w-12 items-center justify-center rounded-full bg-brand font-display text-sm font-bold text-primary-foreground shadow-glow">{s.n}</span>
              </div>
              <div className="glass mt-6 rounded-2xl p-6">
                <h3 className="text-2xl font-bold">{s.title}</h3>
                <p className="mt-3 text-sm text-muted-foreground">{s.desc}</p>
              </div>
            </div>
          </Reveal>
        ))}
      </div>
    </section>
  );
}

export function Contact() {
  const [state, setState] = useState<"idle" | "sent" | "error">("idle");
  const onSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const f = new FormData(e.currentTarget);
    const d = { name: String(f.get("name") || "").trim(), email: String(f.get("email") || "").trim(), service: String(f.get("service")), details: String(f.get("details") || "").trim() };
    if (!d.name || !/^\S+@\S+\.\S+$/.test(d.email) || !d.details) { setState("error"); return; }
    window.location.href = buildMailto(d);
    setState("sent");
  };
  const field = "w-full rounded-xl border bg-input/40 px-4 py-3 text-sm outline-none transition focus:border-primary focus:ring-2 focus:ring-ring/40";
  return (
    <section id="contact" className="relative overflow-hidden py-32">
      <div className="absolute bottom-0 left-1/2 h-[500px] w-[900px] -translate-x-1/2 rounded-full bg-primary/15 blur-[140px]" />
      <div className="relative mx-auto grid max-w-7xl gap-12 px-6 lg:grid-cols-2">
        <div>
          <SectionHead eyebrow="Contact" title="Let's Create Something Great Together" sub="Available for freelance projects and long-term collaborations. Tell me about your idea." />
          <Reveal delay={0.2} className="space-y-3">
            <a href={`mailto:${CONTACT.email}`} className="glass flex items-center justify-between rounded-2xl p-5 transition hover:border-primary/60">
              <span><span className="block text-xs text-muted-foreground">Email</span>{CONTACT.email}</span><span>↗</span>
            </a>
            <a href={CONTACT.instagram} target="_blank" rel="noreferrer" className="glass flex items-center justify-between rounded-2xl p-5 transition hover:border-primary/60">
              <span><span className="block text-xs text-muted-foreground">Instagram</span>{CONTACT.instagramHandle}</span><span>↗</span>
            </a>
          </Reveal>
          <Sculpture3D variant="contact" className="mt-6 hidden h-64 lg:block" />
        </div>
        <Reveal delay={0.1}>
          <form onSubmit={onSubmit} noValidate className="glass space-y-4 rounded-3xl p-8">
            <h3 className="text-2xl font-bold">Start a Project</h3>
            <div className="grid gap-4 sm:grid-cols-2">
              <label className="space-y-2 text-sm"><span>Name</span><input name="name" required maxLength={100} className={field} /></label>
              <label className="space-y-2 text-sm"><span>Email</span><input name="email" type="email" required maxLength={255} className={field} /></label>
            </div>
            <label className="block space-y-2 text-sm"><span>Service</span>
              <select name="service" className={field}>
                {SERVICES.map((s) => <option key={s.title} className="bg-card">{s.title}</option>)}
              </select>
            </label>
            <label className="block space-y-2 text-sm"><span>Project Details</span><textarea name="details" required rows={5} maxLength={2000} className={field} /></label>
            <button type="submit" className="w-full rounded-full bg-brand py-4 font-semibold text-primary-foreground shadow-glow transition hover:scale-[1.02]">Send Message</button>
            <p role="status" className={`text-sm ${state === "error" ? "text-destructive" : state === "sent" ? "text-ice" : "text-muted-foreground"}`}>
              {state === "error" ? "Please add your name, a valid email and project details." : state === "sent" ? "Your mail app is opening with the details filled in — just hit send." : "Submitting opens your mail app with the details pre-filled."}
            </p>
          </form>
        </Reveal>
      </div>
      <footer className="relative mx-auto mt-24 flex max-w-7xl flex-wrap justify-between gap-4 border-t px-6 pt-8 text-sm text-muted-foreground">
        <span>© {new Date().getFullYear()} Vishal Singh — Horizon Designs</span>
        <a href="#home" className="hover:text-foreground">Back to top ↑</a>
      </footer>
    </section>
  );
}

export function Cursor() {
  const [pos, setPos] = useState({ x: -100, y: 0 });
  const [on, setOn] = useState(false);
  useEffect(() => {
    if (!window.matchMedia("(pointer: fine)").matches || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    setOn(true);
    const m = (e: PointerEvent) => setPos({ x: e.clientX, y: e.clientY });
    window.addEventListener("pointermove", m);
    return () => window.removeEventListener("pointermove", m);
  }, []);
  if (!on) return null;
  return (
    <motion.div aria-hidden className="pointer-events-none fixed left-0 top-0 z-[100] h-8 w-8 rounded-full border border-ice/60 mix-blend-difference"
      animate={{ x: pos.x - 16, y: pos.y - 16 }} transition={{ type: "spring", stiffness: 500, damping: 35, mass: 0.4 }} />
  );
}
