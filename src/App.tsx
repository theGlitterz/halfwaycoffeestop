// src/App.tsx
import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import {
  Menu as MenuIcon, X, MapPin, Clock, Instagram,
  Download, ChevronRight, ChevronLeft
} from "lucide-react";
import { Routes, Route, Link, useLocation, useNavigate } from "react-router-dom";
import HalfwayLogo from "./assets/halfway-logo.png";
import AboutPhoto from "./assets/tulia.jpeg";
import { createPortal } from "react-dom";


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
/* ================= Nav ================= */
/* ================= Nav (desktop + mobile drawer) ================= */
const Nav: React.FC = () => {
  const [open, setOpen] = useState(false);

  // close on Esc
  useEffect(() => {
    if (!open) return;
    const onKey = (e: KeyboardEvent) => {
      if (e.key === "Escape") setOpen(false);
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  const links = [
    { href: "#home", label: "Home" },
    { href: "#about", label: "Our Story" },
    { href: "#gallery", label: "Gallery" },
    { href: "#visit", label: "Visit" },
    { href: "#menu", label: "Menu" },
  ];

  return (
    <nav className="fixed top-0 z-50 w-full border-b border-black/5 bg-[#6d4b40] backdrop-blur-sm">
      <Container className="flex h-16 items-center justify-between">
        {/* Logo */}
        <a href="#home" className="flex h-16 items-center gap-2 shrink-0" aria-label="Halfway Coffee Stop">
          <img
            src={HalfwayLogo}
            alt="Halfway Coffee Stop"
            width={1702}
            height={1322}
            className="block h-full max-h-[60px] w-auto object-contain"
          />
          <span className="sr-only">Halfway Coffee Stop</span>
        </a>

        {/* Desktop links */}
        <div className="hidden md:flex items-center gap-6">
          {links.map((l) => (
            <a
              key={l.href}
              href={l.href}
              className="text-sm font-medium text-[#F3E5D8] hover:text-[#E87024] transition-colors"
            >
              {l.label}
            </a>
          ))}
          {/* Desktop Instagram */}
          <a
            href="https://instagram.com/halfwaycoffeestop"
            aria-label="Instagram"
            className="inline-flex items-center justify-center rounded-full p-2 transition hover:scale-105"
            style={{ background: "#E87024", color: "white" }}
          >
            <Instagram className="h-4 w-4" />
          </a>
        </div>

        {/* Mobile: Instagram + Hamburger */}
        <div className="md:hidden flex items-center gap-2">
          <a
            href="https://instagram.com/halfwaycoffeestop"
            aria-label="Instagram"
            className="rounded-full p-2 text-[#F3E5D8] hover:text-white transition"
            title="Instagram"
          >
            <Instagram className="h-5 w-5" />
          </a>
          <button
            aria-label="Open menu"
            onClick={() => setOpen(true)}
            className="rounded-full p-2 border border-[#F3E5D8]/30 text-[#F3E5D8] hover:text-white hover:border-white/50 transition"
          >
            <MenuIcon className="h-5 w-5" />
          </button>
        </div>
      </Container>

      {/* Overlay + Drawer */}
      <AnimatePresence>
        {open && (
          <>
            {/* Dim overlay (click anywhere to close) */}
            <motion.div
              onClick={() => setOpen(false)}
              className="fixed inset-0 z-[150]"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              style={{ background: "rgba(0,0,0,0.42)" }}
            />

            {/* Drawer panel */}
            <motion.aside
              role="dialog"
              aria-modal="true"
              initial={{ x: "100%" }}
              animate={{ x: 0 }}
              exit={{ x: "100%" }}
              transition={{ duration: 0.28, ease: "easeInOut" }}
              className="fixed right-0 top-0 z-[200] h-screen w-[85vw] max-w-[360px] rounded-l-2xl shadow-2xl border-l"
              style={{
                background: "rgba(255,255,255,0.92)",
                backdropFilter: "blur(14px)",
                WebkitBackdropFilter: "blur(14px)",
                borderColor: brand.peach,
                color: "#3b2a24",
              }}
              // prevent clicks inside from closing
              onClick={(e) => e.stopPropagation()}
            >
              {/* Drawer header */}
              <div className="flex items-center justify-between px-5 pt-4 pb-2">
                <div className="flex items-center gap-3">
                  <div
                    className="grid h-9 w-9 place-items-center rounded-lg"
                    style={{ background: brand.peach, color: brand.coffee }}
                  >
                    {/* tiny coffee glyph */}
                    <span className="text-sm">☕</span>
                  </div>
                  <div className="leading-tight">
                    <div className="text-sm font-semibold" style={{ color: brand.coffee }}>
                      Halfway Coffee Stop
                    </div>
                    <div className="text-[11px] text-neutral-600">Waterford • Drive-Thru</div>
                  </div>
                </div>
                <button
                  aria-label="Close menu"
                  onClick={() => setOpen(false)}
                  className="rounded-full p-2 text-neutral-700 hover:text-black hover:bg-black/5 transition"
                >
                  <X className="h-5 w-5" />
                </button>
              </div>

              {/* Divider */}
              <div className="mx-5 my-2 h-px bg-black/5" />

              {/* Links list (stagger + subtle hover slide) */}
              <motion.ul
                className="px-2 py-1"
                initial="hidden"
                animate="show"
                variants={{
                  hidden: { transition: { staggerChildren: 0.04, staggerDirection: -1 } },
                  show: { transition: { staggerChildren: 0.06 } },
                }}
              >
                {links.map((l) => (
                  <motion.li
                    key={l.href}
                    variants={{ hidden: { opacity: 0, x: 10 }, show: { opacity: 1, x: 0 } }}
                  >
                    <a
                      href={l.href}
                      onClick={() => setOpen(false)}
                      className="group flex items-center justify-between rounded-xl px-4 py-3 text-[15px] font-medium"
                      style={{ color: brand.coffee }}
                    >
                      <span>{l.label}</span>
                      <ChevronRight
                        className="h-4 w-4 text-neutral-400 transition group-hover:translate-x-0.5"
                        aria-hidden
                      />
                    </a>
                  </motion.li>
                ))}
              </motion.ul>

              {/* Call to action / contact chips */}
              <div className="mt-2 px-5">
                <div
                  className="rounded-2xl border p-3"
                  style={{ borderColor: brand.peach, background: "rgba(255,255,255,0.75)" }}
                >
                  <div className="text-xs uppercase tracking-wider text-neutral-500">Contact</div>
                  <div className="mt-2 space-y-1.5 text-sm">
                    <a href="tel:+353 830788439" className="block hover:underline" style={{ color: brand.coffee }}>
                      Phone — <span className="font-semibold">+353 830788439</span>
                    </a>
                    <a
                      href="mailto:contact@halfwaycoffeestop.ie"
                      className="block hover:underline"
                      style={{ color: brand.coffee }}
                    >
                      Email — <span className="font-semibold">contact@halfwaycoffeestop.ie</span>
                    </a>
                  </div>
                  {/* <div className="mt-3">
                    <a
                      href="https://instagram.com/halfwaycoffeestop"
                      className="inline-flex items-center gap-2 rounded-full px-3 py-1.5 text-sm font-semibold transition hover:scale-[1.02]"
                      style={{ background: brand.pumpkin, color: "white" }}
                    >
                      <Instagram className="h-4 w-4" />
                      Follow us
                    </a>
                  </div> */}
                </div>
              </div>

              {/* Drawer footer */}
              <div className="mt-auto px-5 pb-5 pt-3 text-[11px] text-neutral-500">
                Open Mon–Fri 6–18 • Sat–Sun 9–15
              </div>
            </motion.aside>
          </>
        )}
      </AnimatePresence>
    </nav>
  );
};



// ===== Drive-thru open/close with next boundary time =====
const DriveThruStatus: React.FC = () => {
  const [label, setLabel] = useState("…");

  // 24h format: turn minutes since midnight into "HH:MM"
  const toHHMM = (mins: number) => {
    const h = Math.floor(mins / 60);
    const m = mins % 60;
    const hh = String(h).padStart(2, "0");
    const mm = String(m).padStart(2, "0");
    return `${hh}:${mm}`;
  };

  // Get schedule for a given weekday (0=Sun..6=Sat)
  const getSchedule = (dayIdx: number) => {
    // Mon–Fri: 06:00–18:00; Sat–Sun: 09:00–15:00
    if (dayIdx >= 1 && dayIdx <= 5) return { open: 6 * 60, close: 18 * 60 };
    return { open: 9 * 60, close: 15 * 60 };
  };

  const compute = () => {
    const now = new Date();
    const day = now.getDay(); // 0=Sun..6=Sat
    const minsNow = now.getHours() * 60 + now.getMinutes();

    const today = getSchedule(day);
    const isOpen = minsNow >= today.open && minsNow < today.close;

    if (isOpen) {
      setLabel(`Open now — closes ${toHHMM(today.close)}`);
      return;
    }

    // If we haven't opened yet today
    if (minsNow < today.open) {
      setLabel(`Closed — opens ${toHHMM(today.open)}`);
      return;
    }

    // We’re past close today → find the next day’s open time
    const nextDay = (day + 1) % 7;
    const next = getSchedule(nextDay);
    const tomorrowText = " (tomorrow)";
    setLabel(`Closed — opens ${toHHMM(next.open)}${tomorrowText}`);
  };

  useEffect(() => {
    compute();
    const id = setInterval(compute, 60 * 1000);
    return () => clearInterval(id);
  }, []);

  const isOpen = label.startsWith("Open");

  return (
    <div className="sticky top-16 z-40 w-full border-b bg-white/80 backdrop-blur">
      <Container className="flex items-center gap-3 py-2 text-sm">
        <span className="relative inline-flex h-2.5 w-2.5">
          <span
            className={`absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping ${
              isOpen ? "bg-green-500" : "bg-neutral-400"
            }`}
          />
          <span
            className={`relative inline-flex h-2.5 w-2.5 rounded-full ${
              isOpen ? "bg-green-600" : "bg-neutral-500"
            }`}
          />
        </span>
        <span className="font-medium text-neutral-800">Drive-thru: {label}</span>
        <span className="ml-auto hidden sm:block text-neutral-600">
          Queue friendly • Fresh cakes daily
        </span>
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
        <section id="menu" className="relative py-16">
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


/* ================= About (poster + matching-height receipt) ================= */
const About: React.FC = () => (
  <section id="about" className="relative py-20">
    {/* subtle ribs */}
    <div className="absolute inset-0 -z-10 opacity-[0.08] [background:repeating-linear-gradient(90deg,rgba(0,0,0,0.6)_0_6px,transparent_6px_22px)]" />

    <Container>
      {/* SECTION HEADING — matches other sections */}
      <Reveal>
        <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: brand.coffee }}>
          Our Journey — 7 Days. 2 People. 1 Dream
        </h2>
      </Reveal>

      <Reveal delay={0.05}>
        <div className="mt-6 grid items-start gap-10 lg:grid-cols-2">
          {/* LEFT: Poster */}
          <div className="aspect-[4/5] w-full">
            <div
              className="h-full w-full overflow-hidden rounded-[28px] border shadow-xl"
              style={{ borderColor: brand.peach, background: brand.cream }}
            >
              <img
                src={AboutPhoto}
                alt="Halfway Coffee — inside the container"
                className="h-full w-full object-cover"
              />
              <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,rgba(232,112,36,0.15),transparent_60%)] mix-blend-multiply" />
            </div>
          </div>

  {/* Story receipt — THERMAL RECEIPT LOOK */}
<div
  className="relative mt-6 rounded-[28px] border shadow-xl overflow-hidden"
  style={{ borderColor: brand.pumpkin, background: "#FFF9F1" }}
>
  {/* subtle paper gradient */}
  <div className="absolute inset-0 pointer-events-none"
       style={{ background: "linear-gradient(180deg, rgba(0,0,0,0.02), transparent 120px)" }} />

  {/* perforated left edge */}
  {/* <div
    className="absolute left-0 top-0 h-full w-6"
    style={{
      background:
        "repeating-radial-gradient(circle at 6px 8px, rgba(0,0,0,0.12) 0 2px, transparent 2px 22px)",
    }}
  /> */}

  {/* inner paper */}
<div
  className="relative mx-6 my-6 rounded-[16px] bg-white px-4 py-5 sm:px-7 sm:py-8"
  style={{
    // removed inset shadows to kill the faint lines
    boxShadow: "none",
    color: brand.coffee,
    fontFamily:
      "ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, monospace",
  }}
>

    {/* header */}
    <div className="text-[13px] sm:text-[15px] font-extrabold uppercase tracking-[0.25em] text-center"
     style={{ color: "#111" }}>
  HALFWAY COFFEE STOP
</div>
<div className="mt-1 text-[11px] sm:text-[12px] font-semibold text-center"
     style={{ color: "#222", letterSpacing: "0.12em" }}>
  Waterford • Drive-Thru • Since 2023
</div>


    {/* dashed rule */}
    <div className="my-4 h-px bg-[repeating-linear-gradient(90deg,rgba(0,0,0,0.18)_0_8px,transparent_8px_16px)]" />

    {/* story lines with “dot leader” to the value bits */}
    <div className="space-y-3 text-[13px] leading-relaxed">
      {/* line */}
{/* ORIGIN */}
<div className="flex items-baseline justify-between gap-3 text-[12px] sm:text-[13px] leading-relaxed py-[2px] border-b border-dotted border-neutral-300/60">
  <span className="w-[36%] sm:w-[30%] shrink-0 font-semibold text-black uppercase tracking-wide">Origin</span>
  <span className="w-[64%] sm:w-[70%] text-neutral-700 text-right break-words">Barista course → Start as employee</span>
</div>

{/* TURNAROUND */}
<div className="flex items-baseline justify-between gap-3 text-[12px] sm:text-[13px] leading-relaxed py-[2px] border-b border-dotted border-neutral-300/60">
  <span className="w-[36%] sm:w-[30%] shrink-0 font-semibold text-black uppercase tracking-wide">Turnaround</span>
  <span className="w-[64%] sm:w-[70%] text-neutral-700 text-right break-words">7 days → Rename, Rebrand, Reopen</span>
</div>

{/* EARLY DAYS */}
<div className="flex items-baseline justify-between gap-3 text-[12px] sm:text-[13px] leading-relaxed py-[2px] border-b border-dotted border-neutral-300/60">
  <span className="w-[36%] sm:w-[30%] shrink-0 font-semibold text-black uppercase tracking-wide">Early Days</span>
  <span className="w-[64%] sm:w-[70%] text-neutral-700 text-right break-words">6am–4pm shifts → Just Tulia & Rhys</span>
</div>

{/* TODAY */}
<div className="flex items-baseline justify-between gap-3 text-[12px] sm:text-[13px] leading-relaxed py-[2px] border-b border-dotted border-neutral-300/60">
  <span className="w-[36%] sm:w-[30%] shrink-0 font-semibold text-black uppercase tracking-wide">Today</span>
  <span className="w-[64%] sm:w-[70%] text-neutral-700 text-right break-words">4–5 crew → Waterford’s cozy ritual</span>
</div>

{/* THANK YOU */}
<div className="flex items-baseline justify-between gap-3 text-[12px] sm:text-[13px] leading-relaxed py-[2px] last:border-none">
  <span className="w-[36%] sm:w-[30%] shrink-0 font-semibold text-black uppercase tracking-wide">Note</span>
  <span className="w-[64%] sm:w-[70%] text-neutral-700 text-right break-words">Thank you, Waterford</span>
</div>
</div>

    {/* dashed rule */}
    <div className="my-4 h-px bg-[repeating-linear-gradient(90deg,rgba(0,0,0,0.18)_0_8px,transparent_8px_16px)]" />

    {/* “total” style kicker */}
    <div className="flex items-baseline text-[13px] font-semibold">
      <span className="whitespace-nowrap font-semibold">Total</span>
      <span className="mx-2 flex-1 border-b border-dotted border-neutral-400" />
      <span className="whitespace-nowrap" style={{ color: brand.pumpkin }}>
        Community, served daily
      </span>
    </div>

    {/* tiny thank-you */}
    <div className="mt-2 text-[11px] uppercase tracking-[0.12em] text-neutral-500 text-center">
      Thank you, Waterford
    </div>

    {/* barcode */}
    <div className="mt-6 grid place-items-center">
      <svg width="220" height="44" viewBox="0 0 220 44" xmlns="http://www.w3.org/2000/svg">
        <rect width="220" height="44" fill="#ffffff" />
        {Array.from({ length: 32 }).map((_, i) => {
          const x = 6 + i * 6;
          const w = i % 3 === 0 ? 3 : i % 3 === 1 ? 2 : 1;
          const h = i % 5 === 0 ? 34 : 28;
          return <rect key={i} x={x} y={6} width={w} height={h} fill="#222222" />;
        })}
      </svg>
      <div className="mt-1 text-[10px] tracking-[0.3em] text-neutral-500">H A L F W A Y</div>
    </div>
  </div>
</div>

        </div>
      </Reveal>
    </Container>
  </section>
);



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
<section
  id="gallery"
  className="relative py-20"
>
  {/* Subtle ribbed gradient background — matching “Our Journey” */}
  <div className="absolute inset-0 -z-10 opacity-[0.08] [background:repeating-linear-gradient(90deg,rgba(0,0,0,0.6)_0_6px,transparent_6px_22px)]" />
  <div className="absolute inset-0 -z-10 bg-[radial-gradient(ellipse_at_top,rgba(232,112,36,0.12),transparent_70%)]" />
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
/* ================= Visit (enhanced) ================= */
const Visit: React.FC = () => {
  // —— EDIT THIS ADDRESS ONCE ——
  const address = "Tramore Road, Coolwager, Co. Waterford, X91 NNP0, Ireland";
  // const phone = "+353-830788439";
  // const email = "contact@halfwaycoffeestop.ie";

  // Build links (no API key needed)
  // const mapsQuery = encodeURIComponent(address);
  // const mapsEmbedSrc = `https://www.google.com/maps?q=${mapsQuery}&output=embed`;
  // const mapsOpenLink = `https://maps.app.goo.gl/z2sq4srP9V1wgYts5`;
  // const telLink = `tel:${phone.replace(/\s+/g, "")}`;
  // const mailLink = `mailto:${email}`;

  // Light “open/closed” indicator (same hours logic you use elsewhere)
  const [isOpen, setIsOpen] = React.useState(false);
  React.useEffect(() => {
    const update = () => {
      const now = new Date();
      const day = now.getDay(); // 0 Sun - 6 Sat
      const mins = now.getHours() * 60 + now.getMinutes();
      let openNow = false;
      if (day >= 1 && day <= 5) openNow = mins >= 6 * 60 && mins < 18 * 60; // Mon–Fri 6–18
      else openNow = mins >= 9 * 60 && mins < 15 * 60;                      // Sat–Sun 9–15
      setIsOpen(openNow);
    };
    update();
    const id = setInterval(update, 60_000);
    return () => clearInterval(id);
  }, []);

  return (
    <section
      id="visit"
      className="relative py-20 overflow-hidden"
      style={{
        // Subtle pumpkin glow; no lines
        backgroundImage:
          "radial-gradient(1000px 460px at 50% -8%, rgba(232,112,36,0.22) 0%, rgba(232,112,36,0.12) 36%, rgba(255,255,255,1) 72%)",
        backgroundColor: "#ffffff",
        backgroundRepeat: "no-repeat",
        backgroundSize: "100% 100%",
      }}
    >
      <Container>
        <Reveal><h2 className="text-3xl sm:text-4xl font-bold" style={{ color: brand.coffee }}>Visit Us</h2></Reveal>

        <Reveal delay={0.05}>
          <div className="mt-6 grid gap-6 lg:grid-cols-2">
            {/* LEFT: Premium info card */}
            <div
              className="relative rounded-3xl border bg-white/90 p-6 shadow-xl backdrop-blur-sm"
              style={{ borderColor: brand.peach }}
            >
              {/* corner status */}
              <div className="absolute right-4 top-4">
                <span
                  className={`inline-flex items-center rounded-full px-3 py-1 text-xs font-semibold shadow-sm ${
                    isOpen ? "bg-green-600 text-white" : "bg-neutral-300 text-neutral-800"
                  }`}
                >
                  {isOpen ? "Open now" : "Closed"}
                </span>
              </div>

              {/* heading */}
              <div className="flex items-start gap-3">
                <div className="grid h-10 w-10 place-items-center rounded-xl"
                     style={{ background: brand.peach, color: brand.coffee }}>
                  <MapPin className="h-5 w-5" />
                </div>
                <div>
                  <p className="font-semibold" style={{ color: brand.coffee }}>Halfway Coffee Stop</p>
                  <p className="text-neutral-700">{address}</p>
                </div>
              </div>

              {/* hours */}
              <div className="mt-5 rounded-2xl border p-4"
                   style={{ borderColor: brand.peach, background: "#FFFBF7" }}>
                <div className="flex items-center gap-2 text-sm font-semibold" style={{ color: brand.coffee }}>
                  <Clock className="h-4 w-4" />
                  Opening Hours
                </div>
                <div className="mt-3 grid grid-cols-2 gap-y-2 text-sm">
                  <span className="text-neutral-600">Mon–Fri</span>
                  <span className="justify-self-end font-medium" style={{ color: brand.coffee }}>6:00 – 18:00</span>
                  <span className="text-neutral-600">Sat</span>
                  <span className="justify-self-end font-medium" style={{ color: brand.coffee }}>9:00 – 15:00</span>
                  <span className="text-neutral-600">Sun</span>
                  <span className="justify-self-end font-medium" style={{ color: brand.coffee }}>9:00 – 15:00</span>
                </div>
              </div>

              {/* actions */}
              {/* Contact rows: show real info, still tappable */}
{/* Contact info — minimal, elegant */}
<div className="mt-5 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 text-sm">
  <div className="space-y-1 text-neutral-700">
    <p>
      <span className="font-semibold" style={{ color: brand.coffee }}>Phone:</span>{" "}
      <a href="tel:+353830788439" className="hover:underline">
        +353 830788439
      </a>
    </p>
    <p>
      <span className="font-semibold" style={{ color: brand.coffee }}>Email:</span>{" "}
      <a href="mailto:contact@halfwaycoffeestop.ie" className="hover:underline">
        contact@halfwaycoffeestop.ie
      </a>
    </p>
  </div>

  {/* <a
    href="https://instagram.com/halfwaycoffeestop"
    target="_blank"
    rel="noopener noreferrer"
    className="inline-flex items-center justify-center rounded-full p-2 hover:bg-neutral-100 transition"
    aria-label="Visit our Instagram"
  >
    <Instagram className="h-5 w-5" style={{ color: brand.pumpkin }} />
  </a> */}
</div>


            </div>

            {/* RIGHT: Map embed (Google place) */}
<div className="rounded-3xl overflow-hidden border shadow-xl" style={{ borderColor: brand.peach }}>
  <iframe
    title="Map: Halfway Coffee Stop (Drive Thru)"
    className="h-[420px] w-full"
    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d2445.0599152162263!2d-7.119237322925865!3d52.20595867198056!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x4842c300207360bf%3A0x36b75addcaaa2bda!2sHalfway%20Coffee%20Stop%20(Drive%20Thru)!5e0!3m2!1sen!2sin!4v1760841836009!5m2!1sen!2sin"
    allowFullScreen
    loading="lazy"
    referrerPolicy="no-referrer-when-downgrade"
  />
</div>

          </div>
        </Reveal>
      </Container>
    </section>
  );
};


/* ================= Loyalty ================= */


/* ================= Footer & QuickDock ================= */
/* ================= Footer ================= */
const Footer: React.FC = () => (
  <footer className="border-t py-10" style={{ background: brand.cream }}>
    <Container className="flex flex-col items-center text-center gap-2">
      <p className="text-sm text-neutral-700">
        © {new Date().getFullYear()} Halfway Coffee Stop
      </p>
      <p className="text-sm text-neutral-600">
        Made with ❤️  by{" "}
        <a
          href="https://glitterztech.com"
          target="_blank"
          rel="noopener noreferrer"
          className="font-semibold hover:text-[#E87024] transition-colors"
          style={{ color: brand.coffee }}
        >
          GlitterzTech
        </a>
      </p>
    </Container>
  </footer>
);


// const QuickDock: React.FC = () => (
//   <div className="quickdock fixed bottom-4 left-1/2 z-[60] -translate-x-1/2 md:hidden">
//     <div className="flex items-center gap-2 rounded-full border bg-white/90 px-3 py-2 shadow-xl backdrop-blur">
//       <a href="#menu" className="rounded-full border px-3 py-1 text-sm">Menu</a>
//       <a href="tel:+3530000000" className="rounded-full border px-3 py-1 text-sm">Call</a>
//       <a href="#visit" className="rounded-full border px-3 py-1 text-sm">Directions</a>
//     </div>
//   </div>
// );

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
    <Gallery />
    <Visit />
    <Footer />
    {/* <QuickDock /> */}
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
