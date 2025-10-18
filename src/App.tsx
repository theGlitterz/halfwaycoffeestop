// src/App.tsx
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu as MenuIcon, MapPin, Clock, Instagram, Facebook,
  Download, Phone, Mail, ChevronRight, ChevronLeft
} from "lucide-react";
import { Routes, Route, Link } from "react-router-dom";
import HalfwayLogo from "./assets/halfway-logo.png";


/* ================= Brand tokens ================= */
const brand = {
  coffee: "#5C4033",
  pumpkin: "#E87024",
  cream: "#F3E5D8",
  sage: "#8CA78B",
  peach: "#F7E1CF",
};

/* ================= Utilities ================= */
const Container: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ children, className = "" }) => (
  <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

// Gentle reveal (safe defaults)
const Reveal: React.FC<React.PropsWithChildren<{ delay?: number }>> = ({ children, delay = 0 }) => (
  <motion.div initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ duration: 0.45, delay }}>
    {children}
  </motion.div>
);

const FloatOnHover: React.FC<React.PropsWithChildren<{ amount?: number }>> = ({ children, amount = 6 }) => (
  <motion.div whileHover={{ y: -amount }} transition={{ type: "spring", stiffness: 280, damping: 18 }}>
    {children}
  </motion.div>
);

/* ================= Nav ================= */
const Nav: React.FC = () => {
  const [open, setOpen] = useState(false);
  const links = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "Our Story" },
    { href: "#menu", label: "Menu" },
    { href: "#gallery", label: "Gallery" },
    { href: "#visit", label: "Visit" },
  ];
  return (
    // <nav className="fixed top-0 z-50 w-full backdrop-blur supports-[backdrop-filter]:bg-white/50 bg-white/70 border-b border-black/5">
<nav className="fixed top-0 z-50 w-full border-b border-black/5 bg-[#6d4b40] backdrop-blur-sm">
      <Container className="flex h-16 items-center justify-between">
       <a
  href="#home"
  className="flex h-16 items-center gap-2 shrink-0"   // full bar height
  aria-label="Halfway Coffee Stop"
>
  <img
    src={HalfwayLogo}
    alt="Halfway Coffee Stop"
    width={1702}
    height={1322}
    className="block h-full max-h-[60px] w-auto object-contain " // fill height, leave 2px breathing room
  />
  <span className="sr-only">Halfway Coffee Stop</span>
</a>


        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-[#F3E5D8] hover:text-[#E87024] transition-colors">{l.label}</a>
          ))}
          <a href="#menu" className="rounded-full px-4 py-2 text-sm font-semibold text-white" style={{ backgroundColor: brand.pumpkin }}>
            Order Ahead
          </a>
        </div>
        <button className="md:hidden rounded-full p-2 border border-neutral-200" aria-label="Open Menu" onClick={() => setOpen((v) => !v)}>
          <MenuIcon className="h-5 w-5" />
        </button>
      </Container>
      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="md:hidden overflow-hidden border-t border-neutral-200 bg-white">
            <Container className="flex flex-col py-2">
              {links.map((l) => (
                <a key={l.href} href={l.href} onClick={() => setOpen(false)} className="py-2 text-neutral-800">{l.label}</a>
              ))}
              <a href="#menu" onClick={() => setOpen(false)} className="mt-2 rounded-full px-4 py-2 text-center font-semibold text-white" style={{ backgroundColor: brand.pumpkin }}>
                Order Ahead
              </a>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

/* ================= Drive-thru status ================= */
const DriveThruStatus: React.FC = () => {
  const [label, setLabel] = useState("Open now");
  useEffect(() => {
    const update = () => {
      const now = new Date();
      const day = now.getDay(); // 0=Sun..6=Sat
      const mins = now.getHours() * 60 + now.getMinutes();
      let open = false;
      // Mon–Fri: 6:00–18:00; Sat–Sun: 9:00–15:00
      if (day >= 1 && day <= 5) open = mins >= 6 * 60 && mins < 18 * 60;
      else open = mins >= 9 * 60 && mins < 15 * 60;
      setLabel(open ? "Open now" : "Closed — see hours");
    };
    update();
    const id = setInterval(update, 60000);
    return () => clearInterval(id);
  }, []);
  const open = label.startsWith("Open");
  return (
    <div className="sticky top-16 z-40 w-full border-b bg-white/80 backdrop-blur">
      <Container className="flex items-center gap-3 py-2 text-sm">
        <span className="relative inline-flex h-2.5 w-2.5">
          <span className={`absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping ${open ? "bg-green-500" : "bg-neutral-400"}`} />
          <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${open ? "bg-green-600" : "bg-neutral-500"}`} />
        </span>
        <span className="font-medium text-neutral-800">Drive-thru: {label}</span>
        <span className="ml-auto hidden sm:block text-neutral-600">Queue friendly • Fresh cakes daily</span>
      </Container>
    </div>
  );
};

/* ================= Hero ================= */
const Hero: React.FC = () => (
  <section id="home" className="relative isolate pt-24 sm:pt-28">
    {/* vertical container ribs + warm glow */}
    <div className="absolute inset-0 -z-10 opacity-[0.18] [background:repeating-linear-gradient(90deg,rgba(0,0,0,0.15)_0_8px,transparent_8px_26px)]" />
    <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(232,112,36,0.16),transparent_60%)]" />
    <Container className="grid items-center gap-10 pb-16 pt-10 lg:grid-cols-2">
      <Reveal>
        <h1 className="text-4xl sm:text-5xl font-extrabold leading-tight" style={{ color: brand.coffee }}>
          Cozy Coffee. <span style={{ color: brand.pumpkin }}>Drive-Thru Joy.</span>
        </h1>
        <p className="mt-4 text-lg text-neutral-700 max-w-prose">
          Fresh coffee, cakes, and smiles—faster than your playlist’s first chorus. Meet Tulia & Rhys and the Halfway family.
        </p>
        <div className="mt-6 flex flex-wrap gap-3">
          <FloatOnHover>
            <a href="#menu" className="rounded-full px-5 py-3 font-semibold text-white" style={{ backgroundColor: brand.pumpkin }}>See Menu</a>
          </FloatOnHover>
          <FloatOnHover>
            <a href="#visit" className="rounded-full px-5 py-3 font-semibold border" style={{ borderColor: brand.pumpkin, color: brand.pumpkin }}>Visit Us</a>
          </FloatOnHover>
        </div>

        {/* Seasonal pill (enhanced visibility, left-aligned on desktop / centered on mobile) */}
        <div className="mt-6 flex">
          <div className="rounded-full border px-4 py-2 text-sm font-semibold shadow-sm mx-auto sm:mx-0"
               style={{ borderColor: brand.pumpkin, background: "white", color: brand.pumpkin }}>
            Now pouring: Pumpkin Spice Latte 🎃
          </div>
        </div>
      </Reveal>

      <Reveal delay={0.1}>
        <div className="relative">
          <div className="aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-xl border" style={{ borderColor: brand.peach, background: brand.cream }}>
            <img src="https://images.unsplash.com/photo-1512568400610-62da28bc8a13?q=80&w=1600&auto=format&fit=crop" alt="Cozy coffee" className="h-full w-full object-cover" />
          </div>
        </div>
      </Reveal>
    </Container>
  </section>
);

/* ================= How to Halfway (simple animator) ================= */
// === REPLACE your HowToHalfwaySection with this ===
// === REPLACE the whole HowToHalfwaySection with this measured version ===
const HowToHalfwaySection: React.FC = () => {
  const checkpoints = [
    { id: "A", label: "Pull In",  title: "Pull in to the lane", desc: "Follow the arrows and roll up to the window." },
    { id: "B", label: "Order",    title: "Say hi & order",      desc: "Order your drink and we start brewing." },
    { id: "C", label: "Roll Out", title: "Grab & go",            desc: "Collect your fresh cup—hit the road!" },
  ];

  const [idx, setIdx] = useState(0);
  const [centers, setCenters] = useState<number[]>([]);

  const trackRef = React.useRef<HTMLDivElement | null>(null);
  const markerRefs = React.useRef<(HTMLDivElement | null)[]>([]);


  // Animate A → B → C → restart
  useEffect(() => {
    const t = setInterval(() => setIdx(v => (v < 2 ? v + 1 : 0)), 1500);
    return () => clearInterval(t);
  }, []);

  // Measure marker centers relative to the track
  const measure = React.useCallback(() => {
    const track = trackRef.current;
    if (!track) return;
    const trackBox = track.getBoundingClientRect();
    const px = markerRefs.current.map((el) => {
      if (!el) return 0;
      const r = el.getBoundingClientRect();
      return r.left + r.width / 2 - trackBox.left; // center X within track
    });
    setCenters(px);
  }, []);

  React.useEffect(() => {
    measure();
    window.addEventListener("resize", measure);
    const ro = new ResizeObserver(measure);
    if (trackRef.current) ro.observe(trackRef.current);
    return () => {
      window.removeEventListener("resize", measure);
      ro.disconnect();
    };
  }, [measure]);

  const active = checkpoints[idx];
  const carLeft = centers[idx] ?? 0;

  return (
    <section id="how-to" className="py-16">
      <Container>
        <Reveal>
          <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: brand.coffee }}>
            How to Halfway — Drive-thru made simple
          </h2>
        </Reveal>

        <Reveal delay={0.05}>
          <div
            className="mt-6 relative overflow-hidden rounded-3xl border bg-white p-5 shadow-sm"
            style={{ borderColor: brand.peach }}
          >
            {/* Track wrapper */}
            <div ref={trackRef} className="relative h-48 sm:h-44 w-full rounded-2xl bg-gradient-to-r from-[#f7e1cf] via-[#fffaf6] to-[#f7e1cf]">

              {/* ROAD (horizontal band) */}
              <div className="absolute top-[21%] left-0 w-full -translate-y-1/2">
                <div className="mx-6 h-12 rounded-full" style={{ background: "rgba(0,0,0,0.06)" }} />
                <div className="pointer-events-none absolute left-6 right-6 top-1/2 -translate-y-1/2 h-[3px] opacity-70
                                [background:repeating-linear-gradient(90deg,#ffffff_0_12px,transparent_12px_24px)]" />
              </div>

              {/* Markers (A / B / C) */}
              <div className="absolute inset-x-6 top-4 flex items-start justify-between">
                {checkpoints.map((c, i) => (
                  <div
                    key={c.id}
                    ref={(el) => { markerRefs.current[i] = el; }}
                    className="text-neutral-900 text-center select-none"
                  >
                    <div
                      className={`mx-auto grid h-10 w-10 place-items-center rounded-full ring-1
                        ${i === idx ? "bg-black/15 ring-black/20" : "bg-black/10 ring-black/10"}`}
                    >
                      <span className="font-semibold">{c.id}</span>
                    </div>
                    <p className="mt-1 text-sm font-medium">{c.label}</p>
                  </div>
                ))}

                
              </div>

              {/* Car ON the road, aligned to marker centers */}
<motion.div
  className="absolute top-[25%] z-20"
  initial={false}
  animate={{ left: carLeft }}
  transition={{ duration: 0.6, ease: "easeInOut" }}
  style={{ transform: "translate(-50%, -50%)" }}
  aria-hidden="true"
>
  <div className="relative translate-y-[6px]">
    {/* shadow */}
    <div className="absolute left-1/2 -bottom-1 h-2 w-10 -translate-x-1/2 rounded-full bg-black/10 blur-sm" />
    {/* car with bob + spinning wheels */}
    <motion.svg
      width="36" height="20" viewBox="0 0 28 16" xmlns="http://www.w3.org/2000/svg"
      animate={{ y: [0, -1.5, 0] }}
      transition={{ duration: 1.6, repeat: Infinity, ease: "easeInOut" }}
    >
      <rect x="2" y="7" width="18" height="6" rx="2" fill={brand.pumpkin} />
      <rect x="8" y="4" width="8" height="5" rx="1.5" fill={brand.pumpkin} />
      <motion.g style={{ transformOrigin: "7px 14px" }} animate={{ rotate: 360 }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}>
        <circle cx="7" cy="14" r="2" fill="#333" />
      </motion.g>
      <motion.g style={{ transformOrigin: "18px 14px" }} animate={{ rotate: 360 }}
                transition={{ duration: 1.2, repeat: Infinity, ease: "linear" }}>
        <circle cx="18" cy="14" r="2" fill="#333" />
      </motion.g>
    </motion.svg>
  </div>
</motion.div>


              {/* Live status card */}
            <motion.div
              key={active.id}
              initial={{ opacity: 0, y: 8 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.25 }}
className="absolute inset-x-6 bottom-2 z-30 rounded-xl border bg-white/90 px-4 py-3 shadow-sm backdrop-blur-sm"
              style={{ borderColor: brand.peach }}
              aria-live="polite"
            >
              <div className="flex items-start gap-3">
                <div className="grid h-8 w-8 shrink-0 place-items-center rounded-full text-sm font-semibold"
                     style={{ background: brand.peach, color: brand.coffee }}>
                  {active.id}
                </div>
                <div className="min-w-0">
                  <p className="text-base sm:text-lg font-semibold" style={{ color: brand.coffee }}>
                    {active.title}
                  </p>
                  <p className="text-sm text-neutral-600">{active.desc}</p>
                </div>
              </div>
            </motion.div>
            </div>

            
          </div>
        </Reveal>
      </Container>
    </section>
  );
};



/* ================= Menu Highlights (6 cards + View full menu) ================= */
const highlights = [
  {
    name: "Pumpkin Spice Latte",
    desc: "Seasonal, cozy spices",
    price: "€4.10",
    img: "https://images.unsplash.com/photo-1512568400610-62da28bc8a13?q=80&w=1600&auto=format&fit=crop",
    tag: "Seasonal",
  },
  { name: "Cinnamon Roll", desc: "Sticky swirl", price: "€2.80", img: "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1600&auto=format&fit=crop" },
  { name: "Iced Latte", desc: "Bright & chilled", price: "€3.70", img: "https://images.unsplash.com/photo-1517705008128-361805f42e86?q=80&w=1600&auto=format&fit=crop" },
  { name: "Flat White", desc: "Silky & strong", price: "€3.60", img: "https://images.unsplash.com/photo-1453614512568-c4024d13c247?q=80&w=1600&auto=format&fit=crop" },
  { name: "Banana Bread", desc: "Toasty slice", price: "€2.60", img: "https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=1600&auto=format&fit=crop" },
  { name: "Cold Brew", desc: "Slow & bold", price: "€3.90", img: "https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=1600&auto=format&fit=crop" },
];

const MenuHighlights: React.FC = () => {
  // 👇 Add ref + auto-scroll effect
  const scrollRef = React.useRef<HTMLUListElement | null>(null);

  React.useEffect(() => {
    const el = scrollRef.current;
    if (!el) return;

    // Nudge right and back once
    el.scrollTo({ left: 60, behavior: "smooth" });
    const t = setTimeout(() => el.scrollTo({ left: 0, behavior: "smooth" }), 800);

    return () => clearTimeout(t);
  }, []);

  return (
    <section className="relative py-16">
      <div className="absolute inset-0 -z-10 opacity-[0.06] [background:repeating-linear-gradient(90deg,rgba(0,0,0,0.6)_0_6px,transparent_6px_22px)]" />
      <Container>
        <Reveal>
          <div className="flex items-end justify-between">
            <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: brand.coffee }}>
              Menu Highlights
            </h2>

            <Link
              to="/menu"
              className="hidden sm:inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold"
              style={{ borderColor: brand.pumpkin, color: brand.pumpkin }}
            >
              View full menu
            </Link>

            {/* Mobile-only swipe hint */}
            <div className="flex items-center gap-2 text-sm text-neutral-500 sm:hidden">
              <ChevronRight className="h-4 w-4 animate-pulse" />
              <span>Swipe →</span>
            </div>
          </div>
        </Reveal>

        {/* Edge-faded horizontal scroll section */}
<div className="relative mt-6 rounded-3xl overflow-hidden">
  {/* Left fade (brand cream) */}
  <div
    className="pointer-events-none absolute left-0 top-0 bottom-0 z-10 w-10
               bg-gradient-to-r from-[#F3E5D8] to-transparent"
  />
  {/* Right fade (brand cream) */}
  <div
    className="pointer-events-none absolute right-0 top-0 bottom-0 z-10 w-10
               bg-gradient-to-l from-[#F3E5D8] to-transparent"
  />

  {/* Scroll container (keeps smooth native scroll) */}
  <div className="overflow-x-auto [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden pb-2">
    {/* Attach ref here for the auto-scroll nudge */}
    <ul ref={scrollRef} className="flex items-start gap-6 pr-6 [scroll-snap-type:x_mandatory]">
      {highlights.map((it) => (
        <motion.li
          key={it.name}
          whileHover={{ y: -6 }}
          className="relative shrink-0 w-[220px] sm:w-[260px] aspect-[3/4]
                     rounded-3xl overflow-hidden border shadow-sm [scroll-snap-align:center]"
          style={{ borderColor: brand.peach }}
        >
          <img src={it.img} alt={it.name} className="absolute inset-0 h-full w-full object-cover" />
          <div className="absolute inset-0 bg-gradient-to-t from-black/45 via-black/15 to-transparent" />
          {it.tag && (
            <span
              className="absolute left-3 top-3 rounded-full px-2 py-1 text-[11px] font-semibold text-white"
              style={{ background: brand.pumpkin }}
            >
              {it.tag}
            </span>
          )}
          <div
            className="absolute bottom-3 left-3 right-3 flex items-center justify-between
                       rounded-2xl bg-white/85 px-3 py-2 backdrop-blur-md shadow"
          >
            <div className="min-w-0">
              <p className="truncate font-semibold" style={{ color: brand.coffee }}>
                {it.name}
              </p>
              <p className="text-xs text-neutral-600 truncate">{it.desc}</p>
            </div>
            <span
              className="ml-3 shrink-0 rounded-full px-3 py-1 text-xs font-semibold"
              style={{
                border: `1px solid ${brand.pumpkin}`,
                color: brand.coffee,
                background: brand.peach,
              }}
            >
              {it.price}
            </span>
          </div>
        </motion.li>
      ))}
    </ul>
  </div>
</div>


        <div className="mt-6 sm:hidden">
          <Link
            to="/menu"
            className="inline-flex items-center gap-2 rounded-full border px-4 py-2 text-sm font-semibold"
            style={{ borderColor: brand.pumpkin, color: brand.pumpkin }}
          >
            View full menu
          </Link>
        </div>
      </Container>
    </section>
  );
};


/* ================= About ================= */
/** About — Cinematic, modern, non-typical */
const About: React.FC = () => {
  const milestones = [
    { k: "2023", t: "Barista course", d: "Tulia trains; falls in love with the craft." },
    { k: "Week 1", t: "The takeover", d: "Owner exits—Tulia & Rhys step in." },
    { k: "7 days", t: "Rebrand sprint", d: "New name, cups, signage—reopen in a week." },
    { k: "6–4", t: "All-in grind", d: "7 days a week, 6–4—just the two of them." },
    { k: "Today", t: "Halfway family", d: "4–5 crew; Waterford’s cozy drive-thru ritual." },
  ];

  return (
    <section id="about" className="relative py-20">
      {/* Subtle container ribs */}
      <div className="absolute inset-0 -z-10 opacity-[0.08] [background:repeating-linear-gradient(90deg,rgba(0,0,0,0.6)_0_6px,transparent_6px_22px)]" />

      <Container>
        {/* Cinematic poster panel */}
        <Reveal>
          <div className="grid items-stretch gap-10 lg:grid-cols-2">
            {/* Poster */}
            <div className="relative">
              <div
                className="aspect-[4/5] w-full overflow-hidden rounded-[28px] border shadow-xl"
                style={{ borderColor: brand.peach, background: brand.cream }}
              >
                {/* Replace with Sora/exported still or hero photo */}
                <img
                  src="https://images.unsplash.com/photo-1512568400610-62da28bc8a13?q=80&w=1600&auto=format&fit=crop"
                  alt="Halfway Coffee — inside the container"
                  className="h-full w-full object-cover"
                />
                {/* Warm film wash */}
                <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(232,112,36,0.15),transparent_60%)] mix-blend-multiply" />
                {/* Corner caption tag */}
                <div className="absolute left-4 top-4 rounded-full bg-white/85 px-3 py-1 text-xs font-semibold backdrop-blur"
                     style={{ color: brand.coffee, border: `1px solid ${brand.peach}` }}>
                  Waterford • Drive-thru • Since 2023
                </div>
                {/* Signature badge */}
                <div className="absolute bottom-4 right-4 rounded-2xl bg-white/90 px-4 py-2 text-sm font-semibold backdrop-blur shadow"
                     style={{ color: brand.coffee }}>
                  Halfway Coffee Stop
                </div>
              </div>
            </div>
{/* RIGHT: Tall receipt that matches the image height */}
<div className="aspect-[4/5] w-full">
  <div
    className="relative h-full rounded-[28px] border bg-[#FFF8F3] p-5 sm:p-6 shadow-xl flex flex-col"
    style={{
      borderColor: brand.pumpkin,
      fontFamily:
        "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, 'Liberation Mono', 'Courier New', monospace",
    }}
  >
    {/* Perforated top */}
    <div
      aria-hidden
      className="pointer-events-none absolute left-0 right-0 top-0 h-3"
      style={{
        background:
          "radial-gradient(circle at 10px 1.5px, #fff 2px, transparent 2.2px)",
        backgroundSize: "20px 3px",
        backgroundRepeat: "repeat-x",
        transform: "translateY(-1px)",
      }}
    />

    {/* Header block */}
        {/* Title inside the receipt (smaller for balance) */}
    <h3
      className="mt-3 text-lg sm:text-xl font-extrabold leading-snug"
      style={{ color: brand.coffee }}
    >
      Our Journey — A week to rebrand. A city to serve.
    </h3>
    <div className="flex items-center justify-between">
      <span className="text-[11px] tracking-wider" style={{ color: brand.coffee }}>
        ORDER #0001
      </span>
      <span
        className="rounded-full px-2 py-0.5 text-[11px] font-semibold"
        style={{ background: brand.peach, color: brand.coffee }}
      >
        HALFWAY
      </span>
    </div>
 
    <div className="mt-2 h-px w-16" style={{ background: brand.pumpkin }} />

   

    {/* Dotted divider */}
    <div className="my-3 h-px bg-[repeating-linear-gradient(90deg,rgba(0,0,0,0.08)_0_10px,transparent_10px_20px)]" />

    {/* Rows with dotted leaders */}
    <div className="space-y-3 text-[13px] leading-relaxed text-neutral-900">
      {/* Row */}
      <div className="flex items-baseline">
        <span className="shrink-0 font-semibold" style={{ color: brand.coffee }}>
          Origin
        </span>
        <span
          className="mx-2 flex-1 h-[1px] translate-y-[2px]"
          style={{
            background:
              "repeating-linear-gradient(90deg, rgba(0,0,0,.22) 0 6px, transparent 6px 12px)",
          }}
        />
        <span className="shrink-0 text-right">
          2023 → Barista course → shifts in this container
        </span>
      </div>

      <div className="flex items-baseline">
        <span className="shrink-0 font-semibold" style={{ color: brand.coffee }}>
          Turnaround
        </span>
        <span
          className="mx-2 flex-1 h-[1px] translate-y-[2px]"
          style={{
            background:
              "repeating-linear-gradient(90deg, rgba(0,0,0,.22) 0 6px, transparent 6px 12px)",
          }}
        />
        <span className="shrink-0 text-right">
          7 days to rename, reprint, restock — reopen
        </span>
      </div>

      <div className="flex items-baseline">
        <span className="shrink-0 font-semibold" style={{ color: brand.coffee }}>
          Hours (then)
        </span>
        <span
          className="mx-2 flex-1 h-[1px] translate-y-[2px]"
          style={{
            background:
              "repeating-linear-gradient(90deg, rgba(0,0,0,.22) 0 6px, transparent 6px 12px)",
          }}
        />
        <span className="shrink-0 text-right">
          6–4 • 7 days • two humans + a steam wand
        </span>
      </div>

      <div className="flex items-baseline">
        <span className="shrink-0 font-semibold" style={{ color: brand.coffee }}>
          Today
        </span>
        <span
          className="mx-2 flex-1 h-[1px] translate-y-[2px]"
          style={{
            background:
              "repeating-linear-gradient(90deg, rgba(0,0,0,.22) 0 6px, transparent 6px 12px)",
          }}
        />
        <span className="shrink-0 text-right">
          4–5 crew • same cozy ritual • faster service
        </span>
      </div>
    </div>

    {/* Spacer grows to push footer to the bottom = tall/vertical feel */}
    <div className="flex-1" />

    {/* Footer line + barcode */}
    <div className="my-3 h-px bg-[repeating-linear-gradient(90deg,rgba(0,0,0,0.08)_0_10px,transparent_10px_20px)]" />
    <div className="flex items-center justify-between text-[11px]">
      <span className="text-neutral-500">Thank you, Waterford</span>
      <span className="font-semibold" style={{ color: brand.coffee }}>
        See you at the window →
      </span>
    </div>
    <div className="mt-3 h-8 w-32 bg-[repeating-linear-gradient(90deg,#1a1a1a_0_2px,transparent_2px_4px)] opacity-80" />

    {/* Perforated bottom */}
    <div
      aria-hidden
      className="pointer-events-none absolute left-0 right-0 bottom-0 h-3"
      style={{
        background:
          "radial-gradient(circle at 10px 1.5px, #fff 2px, transparent 2.2px)",
        backgroundSize: "20px 3px",
        backgroundRepeat: "repeat-x",
        transform: "translateY(1px) rotate(180deg)",
      }}
    />
  </div>
</div>


          </div>
        </Reveal>
      </Container>
    </section>
  );
};


/* ================= Menu (compact tabs -> horizontal list) ================= */
const Menu: React.FC = () => {
  const tabs = [
    { name: "Coffee", items: [
      { title: "Latte", desc: "Velvety + smooth", price: "€3.50" },
      { title: "Cappuccino", desc: "Foamy classic", price: "€3.40" },
      { title: "Pumpkin Spice Latte", desc: "Seasonal fave 🎃", price: "€4.10" },
      { title: "Flat White", desc: "Silky & strong", price: "€3.60" },
      { title: "Americano", desc: "Clean & classic", price: "€3.00" },
    ]},
    { name: "Iced", items: [
      { title: "Iced Latte", desc: "Chilled comfort", price: "€3.70" },
      { title: "Cold Brew", desc: "Slow & bold", price: "€3.90" },
      { title: "Iced Mocha", desc: "Choco chill", price: "€4.20" },
    ]},
    { name: "Cakes & Bites", items: [
      { title: "Cinnamon Roll", desc: "Sticky swirl", price: "€2.80" },
      { title: "Banana Bread", desc: "Toasty slice", price: "€2.60" },
      { title: "Brownie", desc: "Fudgy square", price: "€2.70" },
    ]},
  ];
  const [active, setActive] = useState(0);
  const [size, setSize] = useState<"S"|"M"|"L">("M");
  return (
    <section id="menu" className="py-20">
      <Container>
        <Reveal>
          <div className="flex flex-col items-start gap-4 sm:flex-row sm:items-center sm:justify-between">
            <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: brand.coffee }}>Menu</h2>
            <a href="/assets/menu.pdf" className="inline-flex items-center gap-2 rounded-full px-4 py-2 text-white" style={{ backgroundColor: brand.pumpkin }}>
              <Download className="h-4 w-4" /> Download PDF
            </a>
          </div>
        </Reveal>
        <Reveal delay={0.05}>
          <div className="mt-6 flex flex-wrap items-center gap-3">
            <div className="flex flex-wrap gap-2">
              {tabs.map((t, i) => (
                <button key={t.name} onClick={() => setActive(i)}
                        className={`rounded-full border px-4 py-2 text-sm transition ${active === i ? "text-white" : "text-neutral-700"}`}
                        style={{ backgroundColor: active === i ? brand.pumpkin : "transparent", borderColor: brand.pumpkin }}>
                  {t.name}
                </button>
              ))}
            </div>
            <div className="ml-auto flex items-center gap-2 text-sm">
              <span className="text-neutral-600">Size</span>
              {(["S","M","L"] as const).map(s => (
                <button key={s} onClick={() => setSize(s)}
                        className={`rounded-full border px-3 py-1 ${size===s? "text-white" : "text-neutral-700"}`}
                        style={{ backgroundColor: size===s? brand.coffee : "transparent", borderColor: brand.coffee }}>
                  {s}
                </button>
              ))}
            </div>
          </div>
        </Reveal>
        <Reveal delay={0.1}>
          <div className="mt-8 overflow-x-auto pb-2 [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
            <ul className="flex gap-4 pr-6 [scroll-snap-type:x_mandatory]">
              {tabs[active].items.map((it) => (
                <motion.li key={it.title} whileHover={{ y: -6 }}
                           className="group w-[260px] shrink-0 [scroll-snap-align:start] rounded-2xl border bg-white p-5 shadow-sm">
                  <div className="flex h-full flex-col justify-between">
                    <div>
                      <h3 className="font-semibold text-lg" style={{ color: brand.coffee }}>{it.title}</h3>
                      <p className="text-sm text-neutral-600">{it.desc}</p>
                      <div className="mt-3 flex flex-wrap items-center gap-2 text-xs text-neutral-600">
                        <span className="rounded-full border px-2 py-1">{size} size</span>
                        <span className="rounded-full border px-2 py-1">Oat milk +€0.40</span>
                        <span className="rounded-full border px-2 py-1">Extra shot +€0.50</span>
                      </div>
                    </div>
                    <div className="mt-4 flex items-center justify-between">
                      <span className="rounded-full px-3 py-1 text-sm font-semibold" style={{ backgroundColor: brand.peach }}>{it.price}</span>
                      <button className="rounded-full border px-3 py-1 text-xs" style={{ borderColor: brand.pumpkin }}>Add</button>
                    </div>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>
        </Reveal>
      </Container>
    </section>
  );
};

/* ================= Gallery ================= */
const Gallery: React.FC = () => {
  const imgs = [
    "https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1517705008128-361805f42e86?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1453614512568-c4024d13c247?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=1600&auto=format&fit=crop",
  ];
  const [index, setIndex] = useState<number | null>(null);
  return (
    <section id="gallery" className="py-20" style={{ background: brand.cream }}>
      <Container>
        <Reveal><h2 className="text-3xl sm:text-4xl font-bold" style={{ color: brand.coffee }}>Gallery</h2></Reveal>
        <Reveal delay={0.05}>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {imgs.map((src, i) => (
              <button key={src} onClick={() => setIndex(i)} className="group relative overflow-hidden rounded-2xl">
                <img src={src} alt="" className="h-40 w-full object-cover transition group-hover:scale-105" />
                <div className="pointer-events-none absolute inset-0 bg-black/0 group-hover:bg-black/10 transition" />
              </button>
            ))}
          </div>
        </Reveal>
        <AnimatePresence>
          {index !== null && (
            <motion.div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-6"
                        initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
                        onClick={() => setIndex(null)}>
              <motion.img key={index} src={imgs[index]} alt="" className="max-h-[80vh] w-auto rounded-xl shadow-2xl"
                          initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }} />
              <div className="absolute inset-x-0 bottom-6 flex items-center justify-center gap-4">
                <button className="rounded-full bg-white p-2" onClick={(e) => { e.stopPropagation(); setIndex((i) => (i === 0 ? imgs.length - 1 : (i ?? 0) - 1)); }} aria-label="Prev">
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button className="rounded-full bg-white p-2" onClick={(e) => { e.stopPropagation(); setIndex((i) => (i === imgs.length - 1 ? 0 : (i ?? 0) + 1)); }} aria-label="Next">
                  <ChevronRight className="h-5 w-5" />
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </Container>
    </section>
  );
};

/* ================= Visit (with updated hours + map) ================= */
const Visit: React.FC = () => (
  <section id="visit" className="py-20">
    <Container>
      <Reveal><h2 className="text-3xl sm:text-4xl font-bold" style={{ color: brand.coffee }}>Visit Us</h2></Reveal>
      <Reveal delay={0.05}>
        <div className="mt-6 grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl border p-6 bg-white shadow-sm">
            <div className="flex items-start gap-3">
              <MapPin className="mt-1 h-5 w-5" style={{ color: brand.pumpkin }} />
              <div><p className="font-semibold">Find us here</p><p className="text-neutral-600">123 Container Lane, Your Town, Ireland</p></div>
            </div>
            <div className="mt-4 flex items-start gap-3">
              <Clock className="mt-1 h-5 w-5" style={{ color: brand.pumpkin }} />
              <div>
                <p className="font-semibold">Opening Hours</p>
                <ul className="mt-2 grid grid-cols-2 gap-y-1 text-sm text-neutral-700">
                  <li>Mon–Fri</li><li>6:00 – 18:00</li>
                  <li>Sat</li><li>9:00 – 15:00</li>
                  <li>Sun</li><li>9:00 – 15:00</li>
                </ul>
              </div>
            </div>
            <div className="mt-4 flex items-center gap-4 text-sm">
              <a href="https://instagram.com" className="inline-flex items-center gap-2 hover:underline"><Instagram className="h-4 w-4" /> Instagram</a>
              <a href="https://facebook.com" className="inline-flex items-center gap-2 hover:underline"><Facebook className="h-4 w-4" /> Facebook</a>
              <a href="tel:+3530000000" className="inline-flex items-center gap-2 hover:underline"><Phone className="h-4 w-4" /> Call</a>
              <a href="mailto:hello@halfwaycoffee.com" className="inline-flex items-center gap-2 hover:underline"><Mail className="h-4 w-4" /> Email</a>
            </div>
          </div>
          <div className="rounded-2xl overflow-hidden border">
            <iframe title="Map" className="h-[360px] w-full" src="https://www.openstreetmap.org/export/embed.html?bbox=-10.85%2C51.39%2C-5.33%2C55.44&layer=mapnik" />
          </div>
        </div>
      </Reveal>
    </Container>
  </section>
);

/* ================= Loyalty ================= */
const LoyaltyStamp: React.FC = () => (
  <section className="py-12" style={{ background: brand.cream }}>
    <Container>
      <Reveal>
        <div className="relative overflow-hidden rounded-3xl border bg-white p-6 shadow-sm">
          <div className="absolute inset-0 opacity-[0.06] [background:repeating-linear-gradient(90deg,rgba(0,0,0,0.8)_0_6px,transparent_6px_20px)]" />
          <div className="relative flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div>
              <h3 className="text-2xl font-extrabold tracking-tight" style={{ color: brand.coffee }}>Loyalty Perks</h3>
              <p className="mt-1 text-neutral-700">Powered by Square — <b>Get your 8th and 9th coffee free</b> when you’re a regular at Halfway ☕</p>
            </div>
            <a href="#" className="rounded-full px-4 py-2 text-sm font-semibold text-white" style={{ background: brand.pumpkin }}>Check your balance</a>
          </div>
        </div>
      </Reveal>
    </Container>
  </section>
);

/* ================= Footer & QuickDock ================= */
const Footer: React.FC = () => (
  <footer className="border-t py-10" style={{ background: brand.cream }}>
    <Container className="flex flex-col items-center gap-3 text-center">
      <p className="text-sm text-neutral-600">© {new Date().getFullYear()} Halfway Coffee Stop • Brewed with love</p>
      <div className="flex items-center gap-4 text-sm">
        <a href="#about" className="hover:underline">About</a>
        <a href="#menu" className="hover:underline">Menu</a>
        <a href="#gallery" className="hover:underline">Gallery</a>
        <a href="#visit" className="hover:underline">Visit</a>
      </div>
    </Container>
  </footer>
);

const QuickDock: React.FC = () => (
  <div className="fixed bottom-4 left-1/2 z-[60] -translate-x-1/2 md:hidden">
    <div className="flex items-center gap-2 rounded-full border bg-white/90 px-3 py-2 shadow-xl backdrop-blur">
      <a href="#menu" className="rounded-full border px-3 py-1 text-sm">Menu</a>
      <a href="tel:+3530000000" className="rounded-full border px-3 py-1 text-sm">Call</a>
      <a href="#visit" className="rounded-full border px-3 py-1 text-sm">Directions</a>
    </div>
  </div>
);

/* ================= Full Menu Page (route /menu) ================= */
const FullMenuPage = () => {
  const items = [
    { cat: "Coffee", name: "Latte", price: "€3.50", imageUrl: "https://placehold.co/80x80/5C4033/F3E5D8?text=Latte" },
    { cat: "Coffee", name: "Cappuccino", price: "€3.40", imageUrl: "https://placehold.co/80x80/5C4033/F3E5D8?text=Capuccino" },
    { cat: "Coffee", name: "Flat White", price: "€3.60", imageUrl: "https://placehold.co/80x80/5C4033/F3E5D8?text=Flat+White" },
    { cat: "Coffee", name: "Americano", price: "€3.00", imageUrl: "https://placehold.co/80x80/5C4033/F3E5D8?text=Americano" },
    { cat: "Seasonal", name: "Pumpkin Spice Latte", price: "€4.10", imageUrl: "https://placehold.co/80x80/E87024/FFFFFF?text=PSL" },
    { cat: "Iced", name: "Iced Latte", price: "€3.70", imageUrl: "https://placehold.co/80x80/8CA78B/FFFFFF?text=Iced+Latte" },
    { cat: "Iced", name: "Cold Brew", price: "€3.90", imageUrl: "https://placehold.co/80x80/8CA78B/FFFFFF?text=Cold+Brew" },
    { cat: "Iced", name: "Iced Mocha", price: "€4.20", imageUrl: "https://placehold.co/80x80/8CA78B/FFFFFF?text=Iced+Mocha" },
    { cat: "Bites", name: "Cinnamon Roll", price: "€2.80", imageUrl: "https://placehold.co/80x80/F7E1CF/5C4033?text=Roll" },
    { cat: "Bites", name: "Banana Bread", price: "€2.60", imageUrl: "https://placehold.co/80x80/F7E1CF/5C4033?text=Bread" },
    { cat: "Bites", name: "Brownie", price: "€2.70", imageUrl: "https://placehold.co/80x80/F7E1CF/5C4033?text=Brownie" },
  ];

  return (
    <div className="min-h-screen bg-white">
      <Nav />
      <DriveThruStatus />
      <section className="py-16">
        <Container>
          <Reveal>
            <div className="flex items-end justify-between">
              <h1 className="text-3xl sm:text-4xl font-bold" style={{ color: brand.coffee }}>
                Full Menu
              </h1>
              <a
                href="/assets/menu.pdf"
                className="hidden sm:inline-flex items-center gap-2 rounded-full px-4 py-2 text-white"
                style={{ backgroundColor: brand.pumpkin }}
              >
                <Download className="h-4 w-4" /> Download PDF
              </a>
            </div>
          </Reveal>

          <Reveal delay={0.05}>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-3">
              {items.map((it) => (
                <div
                  key={`${it.cat}-${it.name}`}
                  className="rounded-2xl border bg-white p-4 shadow-lg flex items-center gap-4 transition hover:shadow-xl"
                  style={{ borderColor: brand.peach }}
                >
                    {/* Image on the left */}
                    <img 
                      src={it.imageUrl} 
                      alt={it.name} 
                      className="h-16 w-16 object-cover rounded-xl shadow-inner border shrink-0"
                      style={{ borderColor: brand.peach }}
                    />
                    
                    {/* Item details in the middle */}
                    <div className="flex-grow min-w-0">
                      <p className="text-xs uppercase tracking-widest font-medium" style={{ color: brand.pumpkin }}>{it.cat}</p>
                      <p className="truncate text-lg font-bold" style={{ color: brand.coffee }}>{it.name}</p>
                    </div>
                    
                    {/* Price on the right */}
                    <span 
                      className="shrink-0 rounded-full px-4 py-1 text-base font-bold text-white" 
                      style={{ backgroundColor: brand.pumpkin }}
                    >
                      {it.price}
                    </span>
                </div>
              ))}
            </div>
          </Reveal>

          <div className="mt-8 flex items-center justify-between">
            <Link
              to="/"
              className="rounded-full border px-4 py-2 text-sm font-semibold"
              style={{ borderColor: brand.pumpkin, color: brand.pumpkin }}
            >
              ← Back to home
            </Link>
            <a
              href="/assets/menu.pdf"
              className="sm:hidden rounded-full px-4 py-2 text-sm font-semibold text-white"
              style={{ backgroundColor: brand.pumpkin }}
            >
              Download PDF
            </a>
          </div>
        </Container>
      </section>
      <Footer />
    </div>
  );
};

/* ================= Home Page layout ================= */
const HomePage: React.FC = () => (
  <>
    <Nav />
    <DriveThruStatus />
    <Hero />
    <HowToHalfwaySection />
    <MenuHighlights />
    <About />
    <Menu />
    <Gallery />
    <Visit />
    <LoyaltyStamp />
    <Footer />
    <QuickDock />
  </>
);

/* ================= App with Routes ================= */
export default function App() {
  // tiny cursor dot microinteraction (kept from your earlier code)
  useEffect(() => {
    const dot = document.createElement("div");
    dot.style.cssText = `position:fixed;inset:auto;pointer-events:none;width:6px;height:6px;border-radius:9999px;background:${brand.pumpkin};opacity:.8;transform:translate(-50%,-50%);z-index:9999;`;
    document.body.appendChild(dot);
    const move = (e: PointerEvent) => { dot.style.left = e.clientX + "px"; dot.style.top = e.clientY + "px"; };
    window.addEventListener("pointermove", move);
    return () => { window.removeEventListener("pointermove", move); dot.remove(); };
  }, []);

  return (
    <div className="min-h-screen bg-white text-neutral-900 overflow-x-hidden">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/menu" element={<FullMenuPage />} />
      </Routes>
    </div>
  );
}
