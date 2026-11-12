"use client";

import { useEffect, useState } from "react";
import { ArrowDownRight, ArrowUpRight, Check, ChevronRight, Menu, X } from "lucide-react";
import { motion, useMotionValue, useScroll, useSpring, useTransform } from "framer-motion";
import dynamic from "next/dynamic";

const ConstructionScene = dynamic(() => import("../components/ConstructionScene"), {
  ssr: false,
  loading: () => <div className="scene-loading" />,
});

const services = [
  { number: "01", title: "Transmission lines", detail: "Tower foundations, erection, conductor and OPGW stringing, and substation civil works.", tag: "OHTL" },
  { number: "02", title: "Civil construction", detail: "Commercial and residential structures, concrete, earthworks and the critical path between them.", tag: "CIVIL" },
  { number: "03", title: "MEP systems", detail: "Mechanical, electrical, plumbing, HVAC, fire protection and commissioning.", tag: "MEP" },
  { number: "04", title: "Fit-out & finishing", detail: "Interior and exterior finishing, flooring, ceilings, painting and waterproofing.", tag: "BUILD" },
  { number: "05", title: "Maintenance", detail: "Preventive and corrective civil, electrical and mechanical support for assets that matter.", tag: "CARE" },
  { number: "06", title: "Engineering support", detail: "Drawings, BOQs, specifications, testing coordination and specialist subcontracting.", tag: "PLAN" },
];

const principles = [
  ["01", "Plan with precision", "Every delivery starts with a clear scope, coordinated design and a measurable plan."],
  ["02", "Build with discipline", "Safety briefings, inspection plans and constant site supervision keep quality visible."],
  ["03", "Deliver for the future", "We leave behind infrastructure designed to perform long after handover."],
];

export default function Home() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { scrollYProgress } = useScroll();
  const smoothProgress = useSpring(scrollYProgress, { stiffness: 80, damping: 22, restDelta: 0.001 });
  const sceneOpacity = useTransform(smoothProgress, [0, 0.32, 0.7, 1], [0.86, 0.7, 0.26, 0.18]);
  const sceneScale = useTransform(smoothProgress, [0, 0.4, 1], [1, 1.08, 1.2]);
  const navBackground = useTransform(smoothProgress, [0, 0.1], ["rgba(7, 14, 20, 0.24)", "rgba(7, 14, 20, 0.84)"]);
  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const cursorX = useSpring(0, { stiffness: 500, damping: 35 });
  const cursorY = useSpring(0, { stiffness: 500, damping: 35 });

  useEffect(() => {
    const handlePointerMove = (event: PointerEvent) => {
      pointerX.set((event.clientX / window.innerWidth - 0.5) * 2);
      pointerY.set((event.clientY / window.innerHeight - 0.5) * 2);
      cursorX.set(event.clientX);
      cursorY.set(event.clientY);
    };
    window.addEventListener("pointermove", handlePointerMove, { passive: true });
    return () => window.removeEventListener("pointermove", handlePointerMove);
  }, [pointerX, pointerY]);

  return (
    <main>
      <motion.div className="scene-wrap scene-wrap-global" style={{ opacity: sceneOpacity, scale: sceneScale }}>
        <ConstructionScene progress={smoothProgress} pointerX={pointerX} pointerY={pointerY} />
      </motion.div>
      <motion.div className="site-cursor" style={{ x: cursorX, y: cursorY }} aria-hidden="true">
        <span className="cursor-crosshair" />
        <span className="cursor-label">MOVE SITE</span>
      </motion.div>
      <motion.nav className="nav" style={{ backgroundColor: navBackground }}>
        <a className="wordmark" href="#top" aria-label="SGCC home">
          <span className="wordmark-mark">S</span>
          <span><b>SGCC</b><small>Solid Ground</small></span>
        </a>
        <div className={`nav-links ${menuOpen ? "is-open" : ""}`}>
          <a href="#capabilities" onClick={() => setMenuOpen(false)}>Capabilities</a>
          <a href="#method" onClick={() => setMenuOpen(false)}>Our method</a>
          <a href="#contact" onClick={() => setMenuOpen(false)}>Contact</a>
        </div>
        <a className="nav-cta" href="#contact">Start a conversation <ArrowUpRight size={15} /></a>
        <button className="menu-toggle" onClick={() => setMenuOpen(!menuOpen)} aria-label="Toggle menu">
          {menuOpen ? <X size={21} /> : <Menu size={21} />}
        </button>
      </motion.nav>

      <section id="top" className="hero">
        <div className="hero-vignette" />
        <div className="hero-content shell">
          <motion.div className="eyebrow" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.2 }}>
            <span className="eyebrow-line" /> Saudi Arabia / EST. 2016
          </motion.div>
          <motion.h1 initial={{ opacity: 0, y: 28 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.3, duration: 0.8 }}>
            The ground<br /><em>beneath</em> progress.
          </motion.h1>
          <motion.p className="hero-copy" initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.65 }}>
            Solid Ground Engineering & Contracting delivers the systems, structures and certainty that move the Kingdom forward.
          </motion.p>
          <motion.div className="hero-actions" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.8 }}>
            <a className="button button-primary" href="#capabilities">Explore capabilities <ArrowDownRight size={17} /></a>
            <a className="text-link" href="#contact">Talk to our team <ArrowUpRight size={15} /></a>
          </motion.div>
        </div>
        <div className="hero-footer shell">
          <span>Scroll to build the story</span>
          <div className="scroll-line"><motion.i style={{ scaleX: smoothProgress }} /></div>
          <span>01 — 05</span>
        </div>
      </section>

      <section className="statement section-dark">
        <div className="shell statement-grid">
          <p className="section-kicker">01 / The foundation</p>
          <div>
            <h2>Complex work.<br /><span>Clear ground.</span></h2>
            <p className="large-copy">From high-voltage corridors to the final fit-out, SGCC brings planning, safety and quality into one accountable line of sight.</p>
          </div>
          <div className="metric-row">
            <div><strong>05</strong><span>core disciplines</span></div>
            <div><strong>01</strong><span>integrated partner</span></div>
            <div><strong>∞</strong><span>ways to move forward</span></div>
          </div>
        </div>
      </section>

      <section id="capabilities" className="capabilities section-light">
        <div className="shell">
          <div className="section-heading">
            <div><p className="section-kicker">02 / Capabilities</p><h2>Built to connect<br /><em>the dots.</em></h2></div>
            <p>Specialist delivery, coordinated from first drawing to final handover. Explore the disciplines that keep a project moving.</p>
          </div>
          <div className="service-grid">
            {services.map((service, index) => (
              <motion.article key={service.number} className="service-card" initial={{ opacity: 0, y: 30 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true, margin: "-80px" }} transition={{ delay: index * 0.07 }}>
                <div className="service-top"><span>{service.number}</span><span className="service-tag">{service.tag}</span></div>
                <h3>{service.title}</h3>
                <p>{service.detail}</p>
                <ArrowUpRight className="service-arrow" size={20} />
              </motion.article>
            ))}
          </div>
        </div>
      </section>

      <section id="method" className="method section-dark">
        <div className="shell method-grid">
          <div className="method-intro"><p className="section-kicker">03 / Our method</p><h2>Make the<br /><em>invisible</em><br />visible.</h2><p>Good infrastructure is felt in how confidently everything else can move. Our method keeps decisions clear and delivery accountable.</p></div>
          <div className="principle-list">
            {principles.map(([number, title, copy]) => (
              <motion.div className="principle" key={number} whileInView={{ opacity: 1, x: 0 }} initial={{ opacity: 0, x: 30 }} viewport={{ once: true }}>
                <span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div><ChevronRight size={19} />
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      <section className="safety section-sand">
        <div className="shell safety-grid">
          <div><p className="section-kicker">04 / The standard</p><h2>Safety is not<br />a checklist.</h2></div>
          <div className="safety-note"><p>It is the operating system. SGCC works around mandatory PPE, daily briefings, risk assessments, regular inspections and continuous supervision.</p><div className="check-list"><span><Check size={15} /> Quality management principles</span><span><Check size={15} /> Occupational health & safety</span><span><Check size={15} /> Stage inspections & tracking</span></div></div>
        </div>
      </section>

      <section id="contact" className="contact section-blue">
        <div className="shell contact-grid">
          <div><p className="section-kicker">05 / Begin here</p><h2>Let&apos;s build on<br /><em>solid ground.</em></h2><p className="contact-copy">Reach out for tendering, technical discussions or your next project across the Kingdom.</p></div>
          <form className="contact-form" onSubmit={(event) => event.preventDefault()}>
            <label>Your name<input placeholder="How should we address you?" /></label>
            <label>Work email<input type="email" placeholder="you@company.com" /></label>
            <label>Project scope<textarea placeholder="Tell us what you are building..." rows={3} /></label>
            <button className="button button-light" type="submit">Send an enquiry <ArrowUpRight size={17} /></button>
          </form>
        </div>
      </section>

      <footer className="footer"><div className="shell footer-row"><a className="wordmark" href="#top"><span className="wordmark-mark">S</span><span><b>SGCC</b><small>Solid Ground</small></span></a><span>Engineering & Contracting / Saudi Arabia</span><span>© 2026 SGCC</span></div></footer>
    </main>
  );
}
