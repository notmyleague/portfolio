import React, { useMemo, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

// --- Quick Notes ---
// 1) Replace YT/Vimeo links and thumbnails with your real projects.
// 2) Swap the logo text in <Logo /> and your contact links below.
// 3) This single-file React component is portfolio-ready: responsive, clean, and fast.
// 4) Uses Tailwind classes for styling. Add Tailwind to your project for best results.

// --- Minimal inline icon set (to avoid external deps) ---
const PlayIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" {...props}>
    <path d="M8 5v14l11-7-11-7z" />
  </svg>
);

const SparkleIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
    <path d="M12 2l1.8 4.2L18 8l-4.2 1.8L12 14l-1.8-4.2L6 8l4.2-1.8L12 2z" />
    <path d="M5 16l.9 2.1L8 19l-2.1.9L5 22l-.9-2.1L2 19l2.1-.9L5 16z" />
    <path d="M18 15l.9 2.1L21 18l-2.1.9L18 21l-.9-2.1L15 18l2.1-.9L18 15z" />
  </svg>
);

const FilmIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
    <rect x="3" y="4" width="18" height="16" rx="2"/>
    <path d="M8 4v16M16 4v16M3 8h18M3 16h18" />
  </svg>
);

const ArrowRight = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
    <path d="M5 12h14M13 5l7 7-7 7" />
  </svg>
);

const MailIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
    <path d="M4 6h16v12H4z" />
    <path d="M22 6l-10 7L2 6" />
  </svg>
);

const PhoneIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
    <path d="M4 4h4l2 5-2 1a12 12 0 006 6l1.1-2H20l0 4a2 2 0 01-2 2A16 16 0 014 6a2 2 0 012-2z" />
  </svg>
);

const LinkIcon = (props) => (
  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" {...props}>
    <path d="M10 13a5 5 0 007.07 0l2.83-2.83a5 5 0 10-7.07-7.07L11 4" />
    <path d="M14 11a5 5 0 01-7.07 0L4.1 8.17a5 5 0 117.07-7.07L13 3" />
  </svg>
);

// --- Data ---
const PROJECTS = [
  // Short-form examples
  {
    id: "s1",
    kind: "short",
    title: "Fashion Reel – 30s Promo",
    thumb: "https://images.unsplash.com/photo-1515378791036-0648a3ef77b2?q=80&w=1600&auto=format&fit=crop",
    video: "https://www.youtube.com/embed/dQw4w9WgXcQ",
    tags: ["Reels", "Trendy captions", "Fast cuts"],
  },
  {
    id: "s2",
    kind: "short",
    title: "Food Brand – UGC Ad (15s)",
    thumb: "https://images.unsplash.com/photo-1504754524776-8f4f37790ca0?q=80&w=1600&auto=format&fit=crop",
    video: "https://player.vimeo.com/video/76979871?h=7e0d1f",
    tags: ["UGC", "Hook-first", "Conversions"],
  },
  {
    id: "s3",
    kind: "short",
    title: "Fitness – TikTok Edit",
    thumb: "https://images.unsplash.com/photo-1517836357463-d25dfeac3438?q=80&w=1600&auto=format&fit=crop",
    video: "https://www.youtube.com/embed/ysz5S6PUM-U",
    tags: ["Subtitles", "Transitions", "Beat sync"],
  },
  // Long-form examples
  {
    id: "l1",
    kind: "long",
    title: "Travel Vlog – 11 min",
    thumb: "https://images.unsplash.com/photo-1512453979798-5ea266f8880c?q=80&w=1600&auto=format&fit=crop",
    video: "https://player.vimeo.com/video/137857207",
    tags: ["YouTube", "Story arc", "Color grade"],
  },
  {
    id: "l2",
    kind: "long",
    title: "Podcast – Multi-cam Episode",
    thumb: "https://images.unsplash.com/photo-1516321318423-f06f85e504b3?q=80&w=1600&auto=format&fit=crop",
    video: "https://www.youtube.com/embed/J---aiyznGQ",
    tags: ["Multi-cam", "Audio sweetening", "Lower thirds"],
  },
  {
    id: "l3",
    kind: "long",
    title: "Corporate Case Study – 6 min",
    thumb: "https://images.unsplash.com/photo-1529336953121-ad5a0d43d0d2?q=80&w=1600&auto=format&fit=crop",
    video: "https://player.vimeo.com/video/1084537",
    tags: ["Interviews", "B-roll", "Graphics"],
  },
];

const FILTERS = [
  { key: "all", label: "All" },
  { key: "short", label: "Short‑Form" },
  { key: "long", label: "Long‑Form" },
];

function Logo() {
  return (
    <div className="flex items-center gap-2 text-xl font-semibold">
      <div className="h-8 w-8 rounded-2xl bg-black text-white flex items-center justify-center">
        SK
      </div>
      <span className="tracking-tight">Sagar Karnwal</span>
    </div>
  );
}

function Badge({ children }) {
  return (
    <span className="inline-flex items-center rounded-full border px-3 py-1 text-xs text-neutral-600 border-neutral-200 bg-white/70 backdrop-blur">
      {children}
    </span>
  );
}

function Pill({ active, children, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`px-4 py-2 rounded-full text-sm transition shadow-sm border ${
        active
          ? "bg-black text-white border-black"
          : "bg-white text-neutral-700 hover:bg-neutral-50 border-neutral-200"
      }`}
    >
      {children}
    </button>
  );
}

function ProjectCard({ item, onOpen }) {
  return (
    <motion.button
      layout
      whileHover={{ y: -2 }}
      whileTap={{ scale: 0.98 }}
      onClick={() => onOpen(item)}
      className="group text-left w-full overflow-hidden rounded-2xl border border-neutral-200 bg-white shadow-sm"
    >
      <div className="relative">
        <img
          src={item.thumb}
          alt={item.title}
          className="h-48 w-full object-cover"
          loading="lazy"
        />
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition" />
        <div className="absolute bottom-3 left-3 flex items-center gap-2 text-white opacity-0 group-hover:opacity-100 transition">
          <PlayIcon className="h-5 w-5" />
          <span className="text-sm">Preview</span>
        </div>
      </div>
      <div className="p-4">
        <div className="flex items-center gap-2 mb-2">
          <Badge>{item.kind === "short" ? "Short‑Form" : "Long‑Form"}</Badge>
          {item.tags.slice(0, 2).map((t) => (
            <Badge key={t}>{t}</Badge>
          ))}
        </div>
        <h3 className="text-base font-semibold leading-tight">{item.title}</h3>
      </div>
    </motion.button>
  );
}

function Header() {
  const nav = [
    { id: "work", label: "Work" },
    { id: "about", label: "About" },
    { id: "contact", label: "Contact" },
  ];
  return (
    <header className="sticky top-0 z-50 bg-white/80 backdrop-blur border-b border-neutral-200">
      <div className="mx-auto max-w-6xl px-4 py-3 flex items-center justify-between">
        <Logo />
        <nav className="hidden md:flex items-center gap-1">
          {nav.map((n) => (
            <a key={n.id} href={`#${n.id}`} className="px-3 py-2 text-sm rounded-lg hover:bg-neutral-100">
              {n.label}
            </a>
          ))}
        </nav>
        <a
          href="#contact"
          className="inline-flex items-center gap-2 rounded-xl bg-black px-4 py-2 text-white text-sm shadow hover:opacity-90"
        >
          Hire Me <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </header>
  );
}

function Hero() {
  return (
    <section className="relative">
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-neutral-100 via-white to-white" />
      <div className="relative mx-auto max-w-6xl px-4 py-14 md:py-20 grid md:grid-cols-2 gap-10 items-center">
        <div>
          <motion.h1
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="text-3xl md:text-5xl font-bold leading-tight tracking-tight"
          >
            Short‑form energy. Long‑form storytelling.
          </motion.h1>
          <p className="mt-4 text-neutral-700 md:text-lg">
            I’m <span className="font-semibold">Sagar Karnwal</span>, a video editor crafting
            scroll‑stopping <span className="font-semibold">Reels/Shorts</span> and cinematic
            <span className="font-semibold"> YouTube & corporate films</span>.
          </p>
          <div className="mt-6 flex flex-wrap gap-3">
            <a href="#work" className="rounded-xl bg-black text-white px-5 py-3 text-sm shadow">View Work</a>
            <a href="#contact" className="rounded-xl border border-neutral-300 px-5 py-3 text-sm hover:bg-neutral-50">Get a Quote</a>
          </div>
          <div className="mt-6 flex flex-wrap gap-2 text-xs text-neutral-600">
            <Badge>Premiere Pro</Badge>
            <Badge>After Effects</Badge>
            <Badge>DaVinci Resolve</Badge>
            <Badge>Color Grading</Badge>
            <Badge>Motion Graphics</Badge>
          </div>
        </div>
        <motion.div
          initial={{ opacity: 0, scale: 0.98 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.5 }}
          className="relative"
        >
          <div className="aspect-video w-full overflow-hidden rounded-2xl border border-neutral-200 shadow-sm bg-black/5">
            {/* Replace with your showreel embed */}
            <iframe
              className="w-full h-full"
              src="https://player.vimeo.com/video/76979871?h=7e0d1f"
              title="Showreel"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            />
          </div>
          <div className="absolute -top-3 -left-3 hidden md:flex items-center gap-2 rounded-full bg-white px-3 py-1 border border-neutral-200 shadow-sm">
            <SparkleIcon className="h-4 w-4 text-yellow-500" />
            <span className="text-xs">New 2025 Showreel</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function WorkSection() {
  const [filter, setFilter] = useState("all");
  const [active, setActive] = useState(null);

  const filtered = useMemo(() => {
    if (filter === "all") return PROJECTS;
    return PROJECTS.filter((p) => p.kind === filter);
  }, [filter]);

  return (
    <section id="work" className="mx-auto max-w-6xl px-4 py-14 md:py-20">
      <div className="flex items-end justify-between gap-6 flex-wrap">
        <div>
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight">Selected Work</h2>
          <p className="mt-2 text-neutral-600">Short‑form punch + Long‑form narrative.</p>
        </div>
        <div className="flex items-center gap-2 bg-white p-1 rounded-full border border-neutral-200">
          {FILTERS.map((f) => (
            <Pill key={f.key} active={filter === f.key} onClick={() => setFilter(f.key)}>
              {f.label}
            </Pill>
          ))}
        </div>
      </div>

      <div className="mt-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        <AnimatePresence>
          {filtered.map((item) => (
            <ProjectCard key={item.id} item={item} onOpen={setActive} />
          ))}
        </AnimatePresence>
      </div>

      {/* Lightbox */}
      <AnimatePresence>
        {active && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] bg-black/70 backdrop-blur-sm flex items-center justify-center p-4"
            onClick={() => setActive(null)}
          >
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: 10, opacity: 0 }}
              className="w-full max-w-4xl overflow-hidden rounded-2xl bg-white shadow-2xl"
              onClick={(e) => e.stopPropagation()}
            >
              <div className="aspect-video w-full bg-black">
                <iframe
                  className="w-full h-full"
                  src={active.video}
                  title={active.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                />
              </div>
              <div className="p-4 flex items-start justify-between gap-4">
                <div>
                  <h3 className="text-lg font-semibold">{active.title}</h3>
                  <div className="mt-2 flex flex-wrap gap-2">
                    {active.tags.map((t) => (
                      <Badge key={t}>{t}</Badge>
                    ))}
                  </div>
                </div>
                <button
                  onClick={() => setActive(null)}
                  className="rounded-xl border px-4 py-2 text-sm hover:bg-neutral-50"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}

function About() {
  return (
    <section id="about" className="mx-auto max-w-6xl px-4 py-14 md:py-20">
      <div className="grid md:grid-cols-3 gap-8 items-start">
        <div className="md:col-span-2">
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight">About</h2>
          <p className="mt-4 text-neutral-700">
            I craft videos that marry **attention** with **story**. For short‑form, I focus on
            hook‑first edits, kinetic typography, and social‑native pacing. For long‑form, I build
            arcs, smooth transitions, thoughtful sound design, and cohesive color.
          </p>
          <ul className="mt-4 grid sm:grid-cols-2 gap-3 text-sm text-neutral-700">
            <li className="flex items-center gap-2"><FilmIcon className="h-4 w-4" /> Reels, Shorts, TikToks, Ads</li>
            <li className="flex items-center gap-2"><FilmIcon className="h-4 w-4" /> YouTube, Podcasts, Docs, Corporate</li>
            <li className="flex items-center gap-2"><FilmIcon className="h-4 w-4" /> Motion Graphics, Subtitles, Lower Thirds</li>
            <li className="flex items-center gap-2"><FilmIcon className="h-4 w-4" /> Color Grading, SFX, Music Licensing</li>
          </ul>
        </div>
        <div className="rounded-2xl border border-neutral-200 p-5 bg-white shadow-sm">
          <h3 className="font-semibold">Quick Facts</h3>
          <div className="mt-4 grid gap-3 text-sm">
            <div className="flex items-center justify-between"><span>Turnaround</span><Badge>24–72h (short)</Badge></div>
            <div className="flex items-center justify-between"><span>Tools</span><Badge>Premiere / AE / Resolve</Badge></div>
            <div className="flex items-center justify-between"><span>Deliverables</span><Badge>4K / Captions / LUTs</Badge></div>
            <div className="flex items-center justify-between"><span>Location</span><Badge>Remote • IST</Badge></div>
          </div>
        </div>
      </div>
    </section>
  );
}

function CTA() {
  return (
    <section className="mx-auto max-w-6xl px-4 py-10">
      <div className="rounded-3xl border border-neutral-200 bg-gradient-to-br from-white to-neutral-50 p-8 md:p-10 shadow-sm flex flex-col md:flex-row items-center justify-between gap-6">
        <div>
          <h3 className="text-xl md:text-2xl font-semibold">Need edits that perform and persuade?</h3>
          <p className="text-neutral-700 mt-1">Let’s cut something great together.</p>
        </div>
        <a href="#contact" className="inline-flex items-center gap-2 rounded-xl bg-black px-5 py-3 text-white text-sm shadow">
          Start a Project <ArrowRight className="h-4 w-4" />
        </a>
      </div>
    </section>
  );
}

function Contact() {
  return (
    <section id="contact" className="mx-auto max-w-6xl px-4 py-14 md:py-20">
      <div className="grid md:grid-cols-2 gap-10">
        <div>
          <h2 className="text-2xl md:text-4xl font-bold tracking-tight">Contact</h2>
          <p className="mt-3 text-neutral-700">Tell me about your project, timeline, and goals. I’ll reply with options and a quote.</p>
          <div className="mt-6 space-y-3 text-sm">
            <a href="mailto:hello@sagarkarnwal.com" className="flex items-center gap-2">
              <MailIcon className="h-5 w-5" /> hello@sagarkarnwal.com
            </a>
            <a href="tel:+919999999999" className="flex items-center gap-2">
              <PhoneIcon className="h-5 w-5" /> +91 99999 99999
            </a>
            <a href="https://www.linkedin.com/" target="_blank" rel="noreferrer" className="flex items-center gap-2">
              <LinkIcon className="h-5 w-5" /> LinkedIn
            </a>
          </div>
        </div>
        <form
          onSubmit={(e) => e.preventDefault()}
          className="rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm"
        >
          <div className="grid gap-4">
            <div>
              <label className="text-sm">Name</label>
              <input className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" placeholder="Your name" />
            </div>
            <div className="grid sm:grid-cols-2 gap-4">
              <div>
                <label className="text-sm">Email</label>
                <input type="email" className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" placeholder="you@example.com" />
              </div>
              <div>
                <label className="text-sm">Project Type</label>
                <select className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black">
                  <option>Short‑Form</option>
                  <option>Long‑Form</option>
                  <option>Both</option>
                </select>
              </div>
            </div>
            <div>
              <label className="text-sm">Message</label>
              <textarea rows={4} className="mt-1 w-full rounded-xl border border-neutral-300 px-3 py-2 focus:outline-none focus:ring-2 focus:ring-black" placeholder="What are you looking to create?" />
            </div>
            <button className="inline-flex items-center justify-center rounded-xl bg-black px-5 py-3 text-white text-sm shadow">
              Send Message
            </button>
          </div>
        </form>
      </div>
    </section>
  );
}

function Footer() {
  return (
    <footer className="mx-auto max-w-6xl px-4 py-10 text-sm text-neutral-600">
      <div className="flex flex-col md:flex-row items-center justify-between gap-4">
        <div className="flex items-center gap-2"><Logo /><span className="text-neutral-400">© {new Date().getFullYear()}</span></div>
        <div className="flex items-center gap-3">
          <a href="#work" className="hover:underline">Work</a>
          <a href="#about" className="hover:underline">About</a>
          <a href="#contact" className="hover:underline">Contact</a>
        </div>
      </div>
    </footer>
  );
}

export default function Portfolio() {
  return (
    <div className="min-h-screen bg-white text-neutral-900">
      <Header />
      <Hero />
      <WorkSection />
      <About />
      <CTA />
      <Contact />
      <Footer />
    </div>
  );
}
