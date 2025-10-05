import React, { useEffect, useState } from "react";
import {Step} from "./Step"
import { motion, AnimatePresence } from "framer-motion";
import {
  MapPin, Clock, Instagram, Facebook, Download, Coffee,
  Menu as MenuIcon, Phone, Mail, ChevronRight, ChevronLeft
} from "lucide-react";

/** Brand tokens */
const brand = {
  coffee: "#5C4033",
  pumpkin: "#E87024",
  cream: "#F3E5D8",
  sage: "#8CA78B",
  peach: "#F7E1CF",
};

const Container: React.FC<React.PropsWithChildren<{ className?: string }>> = ({ children, className="" }) => (
  <div className={`mx-auto w-full max-w-6xl px-4 sm:px-6 lg:px-8 ${className}`}>{children}</div>
);

/** Microinteraction wrappers */
const FloatOnHover: React.FC<React.PropsWithChildren<{ amount?: number }>> = ({ children, amount=6 }) => (
  <motion.div whileHover={{ y: -amount }} transition={{ type: "spring", stiffness: 250, damping: 16 }}>
    {children}
  </motion.div>
);
const Reveal: React.FC<React.PropsWithChildren<{ delay?: number }>> = ({ children, delay=0 }) => (
  <motion.div
    initial={{ opacity: 0, y: 24 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6, delay }}
  >
    {children}
  </motion.div>
);

/** Sticky nav */
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
    <nav className="fixed top-0 z-50 w-full backdrop-blur supports-[backdrop-filter]:bg-white/50 bg-white/70 border-b border-black/5">
      <Container className="flex h-16 items-center justify-between">
        <a href="#home" className="flex items-center gap-2">
          <Coffee className="h-6 w-6" style={{ color: brand.pumpkin }} />
          <span className="font-bold tracking-wide" style={{ color: brand.coffee }}>Halfway Coffee Stop</span>
        </a>
        <div className="hidden md:flex items-center gap-6">
          {links.map(l => (
            <a key={l.href} href={l.href} className="text-sm font-medium text-neutral-700 hover:text-neutral-900">
              {l.label}
            </a>
          ))}
          <a href="#menu" className="rounded-full px-4 py-2 text-sm font-semibold text-white" style={{ backgroundColor: brand.pumpkin }}>Order Ahead</a>
        </div>
        <button className="md:hidden rounded-full p-2 border border-neutral-200" aria-label="Open Menu" onClick={()=>setOpen(v=>!v)}>
          <MenuIcon className="h-5 w-5" />
        </button>
      </Container>

      <AnimatePresence>
        {open && (
          <motion.div initial={{ height: 0 }} animate={{ height: "auto" }} exit={{ height: 0 }} className="md:hidden overflow-hidden border-t border-neutral-200 bg-white">
            <Container className="flex flex-col py-2">
              {links.map(l => (
                <a key={l.href} href={l.href} onClick={()=>setOpen(false)} className="py-2 text-neutral-800">{l.label}</a>
              ))}
              <a href="#menu" onClick={()=>setOpen(false)} className="mt-2 rounded-full px-4 py-2 text-center font-semibold text-white" style={{ backgroundColor: brand.pumpkin }}>Order Ahead</a>
            </Container>
          </motion.div>
        )}
      </AnimatePresence>
    </nav>
  );
};

/** Drive-thru open/close pulse */
const DriveThruStatus: React.FC = () => {
  const [label, setLabel] = useState("Open now");
  useEffect(() => {
    const update = () => {
      const now = new Date();
      const day = now.getDay(); // 0 Sun - 6 Sat
      const mins = now.getHours()*60 + now.getMinutes();
      let open = false;
     // Mon–Fri: 06:00–18:00  |  Sat–Sun: 09:00–15:00
      if (day >= 1 && day <= 5) {
       open = mins >= 6 * 60 && mins < 18 * 60;
       } else {
       open = mins >= 9 * 60 && mins < 15 * 60;
      }

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
          <span className={`absolute inline-flex h-full w-full rounded-full opacity-75 animate-ping ${open?'bg-green-500':'bg-neutral-400'}`} />
          <span className={`relative inline-flex h-2.5 w-2.5 rounded-full ${open?'bg-green-600':'bg-neutral-500'}`} />
        </span>
        <span className="font-medium text-neutral-800">Drive-thru: {label}</span>
        <span className="ml-auto hidden sm:block text-neutral-600">Queue friendly • Fresh cakes daily</span>
      </Container>
    </div>
  );
};

/** Hero */
const Hero: React.FC = () => (
  <section id="home" className="relative isolate pt-24 sm:pt-28">
    {/* container vibe vertical ribs */}
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
      </Reveal>
      <Reveal delay={0.1}>
        <div className="relative">
          <div className="aspect-[4/3] w-full overflow-hidden rounded-3xl shadow-xl border" style={{ borderColor: brand.peach, background: brand.cream }}>
            <img src="https://images.unsplash.com/photo-1512568400610-62da28bc8a13?q=80&w=1600&auto=format&fit=crop" alt="Cozy coffee" className="h-full w-full object-cover" />
          </div>
          <div className="absolute -bottom-5 -left-5 rounded-2xl bg-white/90 backdrop-blur px-4 py-3 shadow-lg">
            <div className="flex items-center gap-2 text-sm">
              <span className="text-[12px]" role="img" aria-label="sparkle">✨</span>
              <span>Now pouring: Pumpkin Spice Latte 🎃</span>
            </div>
          </div>
        </div>
      </Reveal>
    </Container>
  </section>
);

/** Staff Spotlight */
const StaffSpotlight: React.FC = () => {
  const staff = [
    { name: 'Dylan', role: 'Latte art pro', img: 'https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=900&auto=format&fit=crop' },
    { name: 'Emma', role: 'Morning smiles', img: 'https://images.unsplash.com/photo-1521017457825-6b3f1f2c3b47?q=80&w=900&auto=format&fit=crop' },
    { name: 'Katie', role: 'Playlist curator', img: 'https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=900&auto=format&fit=crop' },
    { name: 'Lorcan', role: 'Shot specialist', img: 'https://images.unsplash.com/photo-1525182008055-f88b95ff7980?q=80&w=900&auto=format&fit=crop' },
    { name: 'Jamie', role: 'Drive-thru champ', img: 'https://images.unsplash.com/photo-1517705008128-361805f42e86?q=80&w=900&auto=format&fit=crop' },
  ];
  return (
    <section className="relative py-16">
      <div className="absolute inset-0 -z-10 opacity-[0.06] [background:repeating-linear-gradient(90deg,rgba(0,0,0,0.6)_0_6px,transparent_6px_22px)]" />
      <Container>
        <Reveal>
          <div className="flex items-end justify-between">
            <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: brand.coffee }}>Your Pit Crew</h2>
            <div className="hidden sm:flex gap-2 text-sm text-neutral-600">Swipe →</div>
          </div>
        </Reveal>
        <div className="mt-6 overflow-x-auto [scroll-snap-type:x_mandatory] [-ms-overflow-style:none] [scrollbar-width:none] [&::-webkit-scrollbar]:hidden">
          <div className="flex gap-6 pr-6">
            {staff.map(s => (
              <motion.div key={s.name} whileHover={{ y: -6 }} className="relative w-[82vw] sm:w-[360px] shrink-0 [scroll-snap-align:center]">
                <div className="relative overflow-hidden rounded-3xl border shadow-sm" style={{ borderColor: brand.peach }}>
                  <img src={s.img} alt={s.name} className="h-[260px] w-full object-cover" />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/35 via-black/10 to-transparent" />
                  <div className="absolute bottom-3 left-3 right-3 flex items-center justify-between rounded-2xl bg-white/80 px-3 py-2 backdrop-blur">
                    <div>
                      <p className="font-semibold" style={{ color: brand.coffee }}>{s.name}</p>
                      <p className="text-xs text-neutral-600">{s.role}</p>
                    </div>
                    <span className="rounded-full border px-3 py-1 text-xs" style={{ borderColor: brand.sage }}>#HalfwayFamily</span>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </Container>
    </section>
  );
};

/** About */
const About: React.FC = () => (
  <section id="about" className="py-20" style={{ background: brand.cream }}>
    <Container>
      <Reveal>
        <h2 className="text-3xl sm:text-4xl font-bold" style={{ color: brand.coffee }}>Our Story</h2>
        <p className="mt-4 max-w-3xl text-neutral-700">
          Halfway Coffee Stop started as Tulia & Rhys’s drive-thru daydream: fast, friendly coffee that never cuts corners.
          Today, our little container is a local ritual—where Dylan’s latte art, Emma’s smiles, and Katie’s playlists fuel your mornings.
        </p>
      </Reveal>
    </Container>
  </section>
);

/** Menu (tabs + horizontal scroller) */
const Menu: React.FC = () => {
  const tabs = [
    {
      name: "Coffee",
      items: [
        { title: "Latte", desc: "Velvety + smooth", price: "€3.50" },
        { title: "Cappuccino", desc: "Foamy classic", price: "€3.40" },
        { title: "Pumpkin Spice Latte", desc: "Seasonal fave 🎃", price: "€4.10" },
        { title: "Flat White", desc: "Silky & strong", price: "€3.60" },
        { title: "Americano", desc: "Clean & classic", price: "€3.00" },
      ],
    },
    {
      name: "Iced",
      items: [
        { title: "Iced Latte", desc: "Chilled comfort", price: "€3.70" },
        { title: "Cold Brew", desc: "Slow & bold", price: "€3.90" },
        { title: "Iced Mocha", desc: "Choco chill", price: "€4.20" },
      ],
    },
    {
      name: "Cakes & Bites",
      items: [
        { title: "Cinnamon Roll", desc: "Sticky swirl", price: "€2.80" },
        { title: "Banana Bread", desc: "Toasty slice", price: "€2.60" },
        { title: "Brownie", desc: "Fudgy square", price: "€2.70" },
      ],
    },
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
                <button key={t.name}
                        onClick={() => setActive(i)}
                        className={`rounded-full border px-4 py-2 text-sm transition ${active===i? "text-white" : "text-neutral-700"}`}
                        style={{ backgroundColor: active===i? brand.pumpkin : "transparent", borderColor: brand.pumpkin }}>
                  {t.name}
                </button>
              ))}
            </div>
            <div className="ml-auto flex items-center gap-2 text-sm">
              <span className="text-neutral-600">Size</span>
              {(["S","M","L"] as const).map(s => (
                <button key={s}
                        onClick={() => setSize(s)}
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
                <motion.li key={it.title} whileHover={{ y: -6 }} className="group w-[260px] shrink-0 [scroll-snap-align:start] rounded-2xl border bg-white p-5 shadow-sm">
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

/** Gallery + lightbox */
const Gallery: React.FC = () => {
  const imgs = [
    "https://images.unsplash.com/photo-1470337458703-46ad1756a187?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1517705008128-361805f42e86?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1453614512568-c4024d13c247?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1541167760496-1628856ab772?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1517701604599-bb29b565090c?q=80&w=1600&auto=format&fit=crop",
    "https://images.unsplash.com/photo-1447933601403-0c6688de566e?q=80&w=1600&auto=format&fit=crop",
  ];
  const [index, setIndex] = useState<number|null>(null);
  return (
    <section id="gallery" className="py-20" style={{ background: brand.cream }}>
      <Container>
        <Reveal><h2 className="text-3xl sm:text-4xl font-bold" style={{ color: brand.coffee }}>Gallery</h2></Reveal>
        <Reveal delay={0.05}>
          <div className="mt-8 grid grid-cols-2 gap-3 sm:grid-cols-3">
            {imgs.map((src, i) => (
              <button key={src} onClick={()=>setIndex(i)} className="group relative overflow-hidden rounded-2xl">
                <img src={src} alt="" className="h-40 w-full object-cover transition group-hover:scale-105" />
                <div className="pointer-events-none absolute inset-0 bg-black/0 group-hover:bg-black/10 transition" />
              </button>
            ))}
          </div>
        </Reveal>

        <AnimatePresence>
          {index !== null && (
            <motion.div className="fixed inset-0 z-50 grid place-items-center bg-black/70 p-6"
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={()=>setIndex(null)}>
              <motion.img key={index} src={imgs[index]} alt="" className="max-h-[80vh] w-auto rounded-xl shadow-2xl"
                initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.95, opacity: 0 }}/>
              <div className="absolute inset-x-0 bottom-6 flex items-center justify-center gap-4">
                <button className="rounded-full bg-white p-2" onClick={(e)=>{e.stopPropagation(); setIndex(i=> (i===0? imgs.length-1 : (i??0)-1));}} aria-label="Prev">
                  <ChevronLeft className="h-5 w-5" />
                </button>
                <button className="rounded-full bg-white p-2" onClick={(e)=>{e.stopPropagation(); setIndex(i=> (i===imgs.length-1? 0 : (i??0)+1));}} aria-label="Next">
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

/** Visit + lane with animated car (A→B→C→restart) */
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
                  <li>Mon–Fri</li><li>06:00 AM – 06:00 PM</li>
                  <li>Sat-Sun</li><li>09:00 AM – 03:00 PM</li>
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

      {/* Lane */}
      <Reveal delay={0.1}>
        <div className="mt-10 space-y-6">
          <h3 className="text-xl font-semibold" style={{ color: brand.coffee }}>How to Halfway — Drive-thru made simple</h3>
          <div className="relative overflow-hidden rounded-3xl border bg-white p-5 shadow-sm">
            <div className="relative h-40 w-full rounded-2xl bg-gradient-to-r from-[#f7e1cf] via-[#fffaf6] to-[#f7e1cf]">
              <div className="absolute left-1/2 top-0 h-full w-[6px] -translate-x-1/2 [background:repeating-linear-gradient(#ffffff_0_10px,transparent_10px_20px)] opacity-70" />
              <div className="absolute inset-0 flex items-center justify-between px-6">
                <LanePoint label="A" title="Pull in" emoji="🏁" />
                <LanePoint label="B" title="Order" emoji="☕" />
                <LanePoint label="C" title="Roll out" emoji="➡️" />
              </div>
              <Car />
            </div>
            <div className="mt-4 grid gap-4 sm:grid-cols-3">
              <Step idx="01" title="Follow arrows" text="Queue into the lane towards the service window." />
              <Step idx="02" title="Say hi & order" text="We’ll confirm your drink and start brewing." />
              <Step idx="03" title="Grab & go" text="We’ll hand you the cup—safe & speedy." />
            </div>
          </div>
        </div>
      </Reveal>
    </Container>
  </section>
);
const LanePoint: React.FC<{label:string; title:string; emoji:string}> = ({label, title, emoji}) => (
  <div className="text-neutral-900">
    <div className="grid h-10 w-10 place-items-center rounded-full bg-black/10 ring-1 ring-black/10">{emoji}</div>
    <div className="mt-1 inline-flex h-5 w-5 items-center justify-center rounded-full bg-black/10 text-[11px] font-semibold">{label}</div>
    <p className="mt-1 text-sm font-medium">{title}</p>
  </div>
);
const Car: React.FC = () => (
  <div className="absolute inset-x-8 bottom-8">
    <div className="relative h-6">
      <motion.div className="absolute left-0 top-1/2 -translate-y-1/2"
        initial={{ x: 0 }} animate={{ x: [0, 'calc(50% - 14px)', 'calc(100% - 28px)'] }}
        transition={{ duration: 6, times: [0, 0.5, 1], repeat: Infinity, ease: 'easeInOut' }}>
        <motion.svg width="28" height="16" viewBox="0 0 28 16" xmlns="http://www.w3.org/2000/svg"
          animate={{ y: [0, -1.5, 0] }} transition={{ duration: 1.8, repeat: Infinity, ease: 'easeInOut' }}>
          <rect x="2" y="7" width="18" height="6" rx="2" fill={brand.pumpkin} />
          <rect x="8" y="4" width="8" height="5" rx="1.5" fill={brand.pumpkin} />
          <motion.g style={{ transformOrigin: '7px 14px' }} animate={{ rotate: 360 }} transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}>
            <circle cx="7" cy="14" r="2" fill="#333" />
          </motion.g>
          <motion.g style={{ transformOrigin: '18px 14px' }} animate={{ rotate: 360 }} transition={{ duration: 1.2, repeat: Infinity, ease: 'linear' }}>
            <circle cx="18" cy="14" r="2" fill="#333" />
          </motion.g>
        </motion.svg>
      </motion.div>
    </div>
  </div>
);

/** Loyalty banner */
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

/** Footer */
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

/** Mobile quick dock */
const QuickDock: React.FC = () => (
  <div className="fixed bottom-4 left-1/2 z-[60] -translate-x-1/2 md:hidden">
    <div className="flex items-center gap-2 rounded-full border bg-white/90 px-3 py-2 shadow-xl backdrop-blur">
      <a href="#menu" className="rounded-full border px-3 py-1 text-sm">Menu</a>
      <a href="tel:+3530000000" className="rounded-full border px-3 py-1 text-sm">Call</a>
      <a href="#visit" className="rounded-full border px-3 py-1 text-sm">Directions</a>
    </div>
  </div>
);

export default function App() {
  // tiny cursor dot microinteraction
  useEffect(() => {
    const dot = document.createElement("div");
    dot.style.cssText = `position:fixed;inset:auto;pointer-events:none;width:6px;height:6px;border-radius:9999px;background:${brand.pumpkin};opacity:.8;transform:translate(-50%,-50%);z-index:9999;`;
    document.body.appendChild(dot);
    const move = (e: PointerEvent) => { dot.style.left = e.clientX + "px"; dot.style.top = e.clientY + "px"; };
    window.addEventListener("pointermove", move);
    return () => { window.removeEventListener("pointermove", move); dot.remove(); };
  }, []);

  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <Nav />
      <DriveThruStatus />
      <Hero />
      <StaffSpotlight />
      <About />
      <Menu />
      <Gallery />
      <Visit />
      <LoyaltyStamp />
      <Footer />
      <QuickDock />
    </div>
  );
}
