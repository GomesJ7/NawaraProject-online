import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import {
  ArrowRight, ArrowLeft, MapPin, Building2, Handshake, ClipboardList,
  Search, Users, HardHat, CheckCircle2, Menu, X,
  Sparkles, Wrench, Scale, Landmark, Hammer, Ruler, Calculator, Network,
  Send, ShieldCheck,
} from 'lucide-react'
import emailjs from '@emailjs/browser'

export const Route = createFileRoute('/')({
  component: Home,
})

const NAV_LINKS = [
  { label: 'Qui nous sommes', href: '#qui-nous-sommes' },
  { label: 'Notre Approche', href: '#approche' },
  { label: 'Conseil', href: '#consulting' },
  { label: 'Réalisations', href: '#projets' },
  { label: 'Partenariat', href: '#partenariat' },
  { label: 'Contact', href: '#contact' },
]

/* ── Animated counter ── */
function useCountUp(target: number, duration = 1800, suffix = '') {
  const [count, setCount] = useState(0)
  const [started, setStarted] = useState(false)
  const ref = useRef<HTMLDivElement>(null)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting && !started) setStarted(true)
    }, { threshold: 0.5 })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [started])
  useEffect(() => {
    if (!started) return
    let startTime: number
    const step = (timestamp: number) => {
      if (!startTime) startTime = timestamp
      const progress = Math.min((timestamp - startTime) / duration, 1)
      const eased = 1 - Math.pow(1 - progress, 3)
      setCount(Math.floor(eased * target))
      if (progress < 1) requestAnimationFrame(step)
    }
    requestAnimationFrame(step)
  }, [started, target, duration])
  return { ref, display: count + suffix }
}

/* ── Scroll reveal ── */
function useScrollReveal(threshold = 0.12) {
  const ref = useRef<HTMLDivElement>(null)
  const [visible, setVisible] = useState(false)
  useEffect(() => {
    const observer = new IntersectionObserver(([entry]) => {
      if (entry.isIntersecting) { setVisible(true); observer.disconnect() }
    }, { threshold })
    if (ref.current) observer.observe(ref.current)
    return () => observer.disconnect()
  }, [threshold])
  return { ref, visible }
}

function Reveal({ children, delay = 0, direction = 'up' }: {
  children: ReactNode; delay?: number; direction?: 'up' | 'left' | 'right' | 'none'
}) {
  const { ref, visible } = useScrollReveal()
  const transforms: Record<string, string> = {
    up: 'translateY(28px)', left: 'translateX(-28px)', right: 'translateX(28px)', none: 'none',
  }
  return (
    <div ref={ref} style={{
      opacity: visible ? 1 : 0,
      transform: visible ? 'none' : transforms[direction],
      transition: `opacity 0.65s cubic-bezier(0.22,1,0.36,1) ${delay}ms, transform 0.65s cubic-bezier(0.22,1,0.36,1) ${delay}ms`,
    }}>
      {children}
    </div>
  )
}

/* ── Animated Stat ── */
function StatItem({ value, numericValue, label, suffix = '' }: {
  value?: string; numericValue?: number; label: string; suffix?: string
}) {
  const { ref, display } = useCountUp(numericValue ?? 0, 1800, suffix)
  if (numericValue !== undefined) {
    return (
      <div ref={ref}>
        <div className="font-display" style={{ fontSize: '2.5rem', fontWeight: 600, color: 'var(--gold)', lineHeight: 1 }}>{display}</div>
        <div style={{ fontSize: '0.78rem', color: 'var(--slate-light)', marginTop: '6px', lineHeight: 1.5 }}>{label}</div>
      </div>
    )
  }
  return (
    <div>
      <div className="font-display" style={{ fontSize: '2.5rem', fontWeight: 600, color: 'var(--gold)', lineHeight: 1 }}>{value}</div>
      <div style={{ fontSize: '0.78rem', color: 'var(--slate-light)', marginTop: '6px', lineHeight: 1.5 }}>{label}</div>
    </div>
  )
}

function Home() {
  const [menuOpen, setMenuOpen] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [showSticky, setShowSticky] = useState(false)
  useEffect(() => {
    const handler = () => {
      setScrolled(window.scrollY > 40)
      setShowSticky(window.scrollY > 500)
    }
    window.addEventListener('scroll', handler)
    return () => window.removeEventListener('scroll', handler)
  }, [])

  return (
    <div style={{ background: 'var(--cream-light)', color: 'var(--charcoal)' }}>
      {/* NAV */}
      <header style={{
        position: 'fixed', top: 0, left: 0, right: 0, zIndex: 100,
        transition: 'all 0.4s ease',
        background: scrolled ? 'rgba(0,0,0,0.96)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid rgba(196,152,58,0.15)' : 'none',
      }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', padding: '0 2rem', height: '72px', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
          <a href={import.meta.env.BASE_URL} style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div>
              <img src={`${import.meta.env.BASE_URL}Logo1.png`} alt="Nawara Projects Logo" style={{ width: '90px', height: '90px', objectFit: 'contain' }} />
            </div>
            <span className="font-display" style={{ fontSize: '1.25rem', fontWeight: 600, color: 'var(--white)', letterSpacing: '0.02em' }}>
              Nawara <span style={{ color: 'var(--gold)' }}>Projects</span>
            </span>
          </a>
          <nav style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
            <div className="hidden-mobile" style={{ display: 'flex', gap: '2rem' }}>
              {NAV_LINKS.map(({ label, href }) => (
                <a key={label} href={href} className="nav-link" style={{ color: 'var(--white)', fontSize: '0.875rem', fontWeight: 500, textDecoration: 'none', letterSpacing: '0.02em' }}>{label}</a>
              ))}
            </div>
            <a href="#contact" className="btn-gold" style={{ padding: '0.6rem 1.4rem', borderRadius: '4px', fontSize: '0.82rem', textDecoration: 'none', display: 'inline-block' }}>
              <span>Demander un devis</span>
            </a>
            <button onClick={() => setMenuOpen(!menuOpen)} className="mobile-only" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--white)', padding: '4px' }}>
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </nav>
        </div>
        {menuOpen && (
          <div style={{ background: '#fff', borderTop: '1px solid rgba(196,152,58,0.15)', padding: '1.5rem 2rem' }}>
            {NAV_LINKS.map(({ label, href }) => (
              <a key={label} href={href} onClick={() => setMenuOpen(false)} style={{ display: 'block', color: 'var(--charcoal)', textDecoration: 'none', padding: '0.75rem 0', borderBottom: '1px solid rgba(0,0,0,0.06)', fontSize: '0.95rem', fontWeight: 500 }}>{label}</a>
            ))}
          </div>
        )}
      </header>

      {/* HERO */}
      <section className="noise-overlay" style={{ position: 'relative', background: 'var(--charcoal)', minHeight: '100vh', display: 'flex', alignItems: 'center', overflow: 'hidden' }}>
        {/* Hero background image */}
        <div style={{ position: 'absolute', inset: 0, backgroundImage: 'url(https://images.unsplash.com/photo-1486325212027-8081e485255e?w=1600&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', opacity: 0.18 }} />
        <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to right, rgba(0,0,0,0.95) 50%, rgba(0,0,0,0.6))', pointerEvents: 'none' }} />
        <div style={{ position: 'absolute', inset: 0, backgroundImage: `repeating-linear-gradient(-60deg, transparent, transparent 80px, rgba(196,152,58,0.04) 80px, rgba(196,152,58,0.04) 81px)`, pointerEvents: 'none' }} />
        <div className="font-display" style={{ position: 'absolute', right: '-2rem', bottom: '10%', fontSize: 'clamp(8rem, 18vw, 20rem)', fontWeight: 700, color: 'transparent', WebkitTextStroke: '1px rgba(196,152,58,0.07)', lineHeight: 1, userSelect: 'none', pointerEvents: 'none', letterSpacing: '-0.04em' }}>
          Nawara
        </div>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1280px', margin: '0 auto', padding: '8rem 2rem 6rem', width: '100%' }}>
          <div style={{ maxWidth: '800px' }}>
            <div className="tag animate-fade-up" style={{ marginBottom: '2rem' }}>Cabinet de Conseil & Ingénierie — Afrique de l'Ouest francophone</div>
            <h1 className="font-display animate-fade-up animate-fade-up-d1" style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)', fontWeight: 600, color: 'var(--white)', lineHeight: 1.08, letterSpacing: '-0.02em', marginBottom: '2rem' }}>
              Votre partenaire stratégique en<br />
              <span style={{ color: 'var(--gold)' }}>implantation commerciale</span><br />
              en Afrique de l'Ouest
            </h1>
            <p className="animate-fade-up animate-fade-up-d2" style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.72)', lineHeight: 1.75, maxWidth: '580px', marginBottom: '3rem', fontWeight: 300 }}>
              De la sélection du franchisé à la remise des clés du local aménagé.
              Vous avez un projet commercial en Afrique de l'Ouest — qu'il vienne d'Abidjan, de Paris ou de New York, nous le faisons aboutir.            </p>
            <div className="animate-fade-up animate-fade-up-d3" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href="#consulting" className="btn-gold" style={{ padding: '0.9rem 2rem', borderRadius: '4px', textDecoration: 'none', fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <span>Découvrir nos expertises</span><ArrowRight size={16} />
              </a>
              <a href="#contact" className="btn-outline-gold" style={{ padding: '0.9rem 2rem', borderRadius: '4px', textDecoration: 'none', fontSize: '0.9rem' }}>Demander un devis</a>
            </div>
          </div>
          {/* Animated stats */}
          <div className="animate-fade-up animate-fade-up-d4" style={{ marginTop: '6rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '2rem', maxWidth: '680px', paddingTop: '3rem', borderTop: '1px solid rgba(196,152,58,0.3)' }}>
            <StatItem suffix="+" numericValue={5}  label="années d'experiences retail" />
            <StatItem numericValue={3} label="Marchés prioritaires" />
            <StatItem value="6" label="Métiers, 1 Interlocuteur" />
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', animation: 'shimmer 2s ease infinite' }}>
          <div style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, transparent, var(--gold))' }} />
          <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--gold)' }} />
        </div>
      </section>

      {/* ── QUI NOUS SOMMES ── */}
      <section id="qui-nous-sommes" style={{ background: 'var(--cream-light)', padding: '7rem 2rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <div className="tag" style={{ justifyContent: 'center', marginBottom: '1.25rem' }}>À propos</div>
              <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 600, color: 'var(--charcoal)', letterSpacing: '-0.02em', lineHeight: 1.15 }}>
                Qui nous sommes
              </h2>
            </div>
          </Reveal>

          {/* Intro rapide */}
          <Reveal>
            <p style={{ textAlign: 'center', maxWidth: '720px', margin: '0 auto 5rem', fontSize: '1rem', color: 'var(--slate)', lineHeight: 1.8, fontWeight: 300 }}>
              Nawara Projects est un cabinet de conseil et d'ingénierie spécialisé dans le déploiement de franchises et la réalisation de projets immobiliers commerciaux en Afrique de l'Ouest francophone. Nous faisons le pont entre les enseignes et les réalités opérationnelles du terrain.
            </p>
          </Reveal>

          {/* Fondateur */}
          <div className="grid-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '5rem', alignItems: 'center' }}>
            <Reveal direction="left">
              <div style={{ position: 'relative' }}>
                <div style={{
                  borderRadius: '12px',
                  overflow: 'hidden',
                  border: '1px solid rgba(196,152,58,0.2)',
                  aspectRatio: '3/4',
                  maxWidth: '360px',
                  margin: '0 auto',
                }}>
                  <img
                    src={`${import.meta.env.BASE_URL}fondateur.png`}
                    alt="Miguel Gomes — Fondateur de Nawara Projects"
                    style={{ width: '100%', height: '100%', objectFit: 'cover', objectPosition: 'center top' }}
                  />
                </div>
                <div style={{
                  position: 'absolute',
                  bottom: '-1.5rem',
                  left: '50%',
                  transform: 'translateX(-50%)',
                  background: 'var(--gold)',
                  padding: '1rem 1.75rem',
                  borderRadius: '8px',
                  textAlign: 'center',
                  whiteSpace: 'nowrap',
                  boxShadow: '0 8px 30px rgba(196,152,58,0.35)',
                }}>
                  <div style={{ fontFamily: "'Cormorant Garamond', serif", fontSize: '1.1rem', fontWeight: 600, color: '#000', letterSpacing: '0.01em' }}>Miguel Gomes</div>
                  <div style={{ fontSize: '0.72rem', fontWeight: 600, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'rgba(0,0,0,0.65)', marginTop: '2px' }}>Fondateur & Directeur</div>
                </div>
              </div>
            </Reveal>

            <Reveal direction="right">
              <div style={{ paddingTop: '1rem' }}>
                <div className="tag" style={{ marginBottom: '1.5rem' }}>Histoire & Vision</div>
                <h3 className="font-display" style={{ fontSize: 'clamp(1.6rem, 3vw, 2.4rem)', fontWeight: 600, color: 'var(--charcoal)', lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: '1.5rem' }}>
                  Une conviction née du terrain
                </h3>

                <p style={{ color: 'var(--slate)', fontSize: '0.95rem', lineHeight: 1.85, marginBottom: '1.25rem', fontWeight: 300 }}>
                  Quatre ans chez <strong style={{ color: 'var(--charcoal)', fontWeight: 600 }}>Artelia (2021–2025)</strong> comme Directeur Commercial des Partenariats Travaux, à accompagner des déploiements d'enseignes — succursales, franchise et mixte — partout en France. C'est là qu'est né le constat : les enseignes souhaitant s'implanter en Afrique de l'Ouest ne trouvaient pas de <strong style={{ color: 'var(--charcoal)', fontWeight: 600 }}>relais local capable de structurer et déployer leur concept</strong> selon leurs standards.
                </p>

                <p style={{ color: 'var(--slate)', fontSize: '0.95rem', lineHeight: 1.85, marginBottom: '2.5rem', fontWeight: 300 }}>
                  Non pas que personne ne s'en occupait — d'autres acteurs existaient. Mais l'accompagnement de bout en bout, de la stratégie commerciale jusqu'à la livraison du local, restait rare. <strong style={{ color: 'var(--charcoal)', fontWeight: 600 }}>Nawara Projects</strong> est né de cette observation.
                </p>

                {/* Timeline */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
                  {[
                    { year: '2021–2025', label: 'Artelia', detail: 'Directeur Commercial Partenariats Travaux — déploiements ERP & enseignes (succursales, franchise, mixte)' },
                    { year: '2025', label: 'Constat', detail: "Absence de relais structuré pour les enseignes ciblant l'Afrique de l'Ouest" },
                    { year: '2026', label: 'Création de Nawara Projects', detail: "Fondation du cabinet à Abidjan, Côte d'Ivoire — siège opérationnel pour l'Afrique de l'Ouest francophone" },
                  ].map(({ year, label, detail }) => (
                    <div key={year} style={{ display: 'flex', gap: '1.25rem', alignItems: 'flex-start' }}>
                      <div style={{ flexShrink: 0, paddingTop: '3px' }}>
                        <div style={{ width: '10px', height: '10px', borderRadius: '50%', background: 'var(--gold)', marginBottom: '4px' }} />
                        <div style={{ width: '1px', height: '32px', background: 'rgba(196,152,58,0.3)', marginLeft: '4px' }} />
                      </div>
                      <div style={{ paddingBottom: '0.5rem' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '3px' }}>
                          <span style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--gold)' }}>{year}</span>
                          <span style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--charcoal)' }}>{label}</span>
                        </div>
                        <p style={{ fontSize: '0.82rem', color: 'var(--slate)', lineHeight: 1.6, margin: 0 }}>{detail}</p>
                      </div>
                    </div>
                  ))}
                </div>

                <a
                  href="https://www.linkedin.com/in/miguel-gomes-32aa3a13a/"
                  target="_blank"
                  rel="noopener noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '8px',
                    marginTop: '2rem',
                    padding: '0.7rem 1.4rem',
                    background: '#0A66C2',
                    color: '#fff',
                    borderRadius: '4px',
                    textDecoration: 'none',
                    fontSize: '0.82rem',
                    fontWeight: 600,
                    letterSpacing: '0.02em',
                  }}
                >
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433c-1.144 0-2.063-.926-2.063-2.065 0-1.138.92-2.063 2.063-2.063 1.14 0 2.064.925 2.064 2.063 0 1.139-.925 2.065-2.064 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z"/></svg>
                  Voir le profil LinkedIn
                </a>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* NOTRE APPROCHE — moved up, logically before expertise detail */}
      <section id="approche" style={{ background: '#F7F4EE', padding: '7rem 2rem', position: 'relative', overflow: 'hidden' }}>
        <div className="geo-pattern" style={{ position: 'absolute', inset: 0, opacity: 0.35 }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1280px', margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
              <div className="tag" style={{ justifyContent: 'center', marginBottom: '1.25rem', color: 'var(--gold)' }}>Notre Approche</div>
              <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 600, color: 'var(--charcoal)', letterSpacing: '-0.02em', lineHeight: 1.15, maxWidth: '640px', margin: '0 auto' }}>
                Pourquoi choisir<br /><span style={{ color: 'var(--gold)' }}>Nawara Projects ?</span>
              </h2>
            </div>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {[
              { number: '01', title: 'Expertise construite sur le terrain', description: "Quatre ans de déploiements d'enseignes en France avant de s'installer à Abidjan. Pas une expertise théorique — une pratique directe des contraintes réelles de l'implantation commerciale." },
              { number: '02', title: 'Approche bi-culturelle', description: "Nous parlons le langage des franchiseurs internationaux comme celui des opérateurs locaux. Ce positionnement est notre vraie valeur différenciante sur des marchés où la confiance se construit dans la durée." },
              { number: '03', title: 'Réseau qualifié sur le continent', description: "Promoteurs, architectes locaux, bureaux d'études, entreprises TCE : un écosystème de partenaires sélectionnés sur trois marchés prioritaires — Côte d'Ivoire, Sénégal, Bénin." },
              { number: '04', title: 'Accompagnement de bout en bout', description: "De l'analyse stratégique jusqu'à la livraison sur site, nous restons à vos côtés à chaque étape. Un seul interlocuteur, du premier rendez-vous à la remise des clés." },
              { number: '05', title: 'Indépendance et neutralité', description: "Nos activités de conseil et de réalisation opèrent de manière autonome. Aucun conflit d'intérêts — nous défendons uniquement vos objectifs et intérêts." },
              { number: '06', title: 'Rigueur et transparence', description: "Reporting régulier, jalons contractuels, communication proactive. Des engagements mesurables, pas des promesses." },
            ].map(({ number, title, description }, i) => (
              <Reveal key={number} delay={i * 60}>
                <div className="service-card" style={{ padding: '2.5rem', border: '1px solid rgba(196,152,58,0.18)', borderRadius: '8px', background: 'rgba(255,255,255,0.03)', height: '100%' }}>
                  <div className="font-display" style={{ fontSize: '3rem', fontWeight: 700, color: 'rgba(196,152,58,0.22)', lineHeight: 1, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>{number}</div>
                  <h3 style={{ color: 'var(--charcoal)', fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem', lineHeight: 1.3 }}>{title}</h3>
                  <p style={{ color: 'var(--slate)', fontSize: '0.875rem', lineHeight: 1.7, margin: 0 }}>{description}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* CONSULTING */}
      <section id="consulting" style={{ background: 'var(--cream-light)', padding: '7rem 2rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <div className="grid-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start', marginBottom: '4rem' }}>
            <Reveal direction="left">
              <div>
                <div className="tag" style={{ marginBottom: '1.5rem' }}>Conseil, Conception & Déploiement</div>
                <h2 className="font-display" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', fontWeight: 600, color: 'var(--charcoal)', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '1.5rem' }}>
                  Développement de<br /><span style={{ color: 'var(--gold)' }}>Franchises en Afrique</span>
                </h2>
              </div>
            </Reveal>
            <Reveal direction="right">
              <div style={{ paddingTop: '1rem' }}>
                <p style={{ color: 'var(--slate)', lineHeight: 1.8, fontSize: '1rem', fontWeight: 300 }}>
                  Nawara Projects accompagne les franchiseurs internationaux souhaitant se déployer sur les marchés d'Afrique de l'Ouest francophone.
                </p>
                <div style={{ marginTop: '1.5rem', padding: '1rem 1.5rem', background: 'rgba(196,152,58,0.08)', borderLeft: '3px solid var(--gold)', borderRadius: '0 4px 4px 0' }}>
                  <p style={{ color: 'var(--slate)', fontSize: '0.875rem', lineHeight: 1.6, margin: 0 }}>
                    <strong>Indépendance des activités :</strong> cette activité de conseil peut intervenir de manière entièrement autonome, sans lien avec nos missions de réalisation terrain.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
          <HorizontalScroll>
            {[
              { icon: <Search size={22} />, title: 'Recherche & Qualification de Franchisés', description: "Identification et sélection rigoureuse de candidats franchisés correspondant aux critères financiers, opérationnels et culturels de votre enseigne. Nous ne présentons que des profils validés." },
              { icon: <Users size={22} />, title: 'Mise en Relation avec les Enseignes', description: "Facilitation du dialogue entre franchiseurs et candidats locaux, avec une compréhension fine des attentes des deux parties. Nous parlons les deux langages." },
              { icon: <ClipboardList size={22} />, title: 'Analyse Stratégique de Déploiement', description: "Étude de marché, analyse concurrentielle, choix des territoires prioritaires et définition de la feuille de route d'expansion sur les marchés d'Afrique de l'Ouest francophone." },
              { icon: <Handshake size={22} />, title: "Accompagnement jusqu'à la Signature", description: "Suivi complet du processus de négociation, coordination juridique et accompagnement opérationnel jusqu'à la finalisation du contrat de franchise." },
            ].map(({ icon, title, description }) => (
              <div key={title} className="h-scroll-card service-card" style={{ background: 'white', border: '1px solid rgba(0,0,0,0.08)', borderRadius: '8px', padding: '2rem', display: 'flex', flexDirection: 'column' }}>
                <div style={{ width: '48px', height: '48px', background: 'rgba(196,152,58,0.1)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)', marginBottom: '1.5rem' }}>{icon}</div>
                <h3 style={{ color: 'var(--charcoal)', fontSize: '1.05rem', fontWeight: 600, marginBottom: '0.75rem', lineHeight: 1.3 }}>{title}</h3>
                <p style={{ color: 'var(--slate)', fontSize: '0.88rem', lineHeight: 1.7, margin: 0 }}>{description}</p>
              </div>
            ))}
          </HorizontalScroll>
        </div>
      </section>

      {/* PROJETS / RÉALISATIONS */}
      <ExpertiseSection />

      {/* LIVRAISON */}
      <DeliverySection />

      {/* ZONE GEO */}
      <section style={{ background: '#fff', padding: '7rem 2rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1280px', margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <div className="tag" style={{ justifyContent: 'center', marginBottom: '1.25rem', color: 'var(--gold)' }}>Zone d'intervention</div>
              <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 600, color: 'var(--charcoal)', letterSpacing: '-0.02em', lineHeight: 1.15, maxWidth: '820px', margin: '0 auto 1.25rem' }}>
                3 marchés prioritaires,<br /><span style={{ color: 'var(--gold)' }}>Afrique de l'Ouest francophone</span>
              </h2>
              <p style={{ color: 'var(--slate)', maxWidth: '680px', margin: '0 auto', lineHeight: 1.8, fontSize: '0.95rem', fontWeight: 300 }}>
                Nawara Projects concentre son activité sur trois pays à fort potentiel commercial, sélectionnés pour leur dynamisme économique, leur stabilité réglementaire et la qualité de leur écosystème local. Toutes les missions sont pilotées depuis notre bureau d'Abidjan.
              </p>
            </div>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
            {[
              { pays: "Côte d'Ivoire", ville: 'Abidjan — Siège principal', statut: 'Marché principal', detail: 'Hub logistique et financier de la sous-région. Siège opérationnel de Nawara Projects — toutes les missions sont pilotées depuis Abidjan.' },
              { pays: 'Sénégal', ville: 'Dakar — Marché secondaire', statut: 'Marché de référence', detail: 'Économie en croissance, forte culture entrepreneuriale et marché de consommation mature. Deuxième marché de référence.' },
              { pays: 'Bénin', ville: 'Cotonou — Marché secondaire', statut: 'Marché en expansion', detail: "Environnement des affaires réformé, croissance du secteur commercial et ouverture croissante aux enseignes internationales." },
            ].map(({ pays, ville, statut, detail }) => (
              <Reveal key={pays}>
                <div className="service-card" style={{ background: '#F7F4EE', border: '1px solid rgba(196,152,58,0.2)', borderRadius: '12px', padding: '2.25rem', height: '100%' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '10px', marginBottom: '1rem' }}>
                    <MapPin size={18} style={{ color: 'var(--gold)', flexShrink: 0 }} />
                    <span style={{ fontSize: '0.72rem', fontWeight: 700, letterSpacing: '0.12em', textTransform: 'uppercase', color: 'var(--gold)' }}>{statut}</span>
                  </div>
                  <h3 className="font-display" style={{ fontSize: '1.6rem', fontWeight: 600, color: 'var(--charcoal)', marginBottom: '4px' }}>{pays}</h3>
                  <div style={{ fontSize: '0.75rem', fontWeight: 600, letterSpacing: '0.06em', textTransform: 'uppercase', color: 'var(--gold-pale)', marginBottom: '1rem' }}>{ville}</div>
                  <p style={{ color: 'var(--slate)', fontSize: '0.88rem', lineHeight: 1.7, margin: 0 }}>{detail}</p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* PARTENARIAT */}
      <PartnershipSection />


      {/* CONTACT */}
      <section id="contact" style={{ background: '#fff', padding: '7rem 2rem', position: 'relative', overflow: 'hidden' }}>
        <div className="geo-pattern" style={{ position: 'absolute', inset: 0, opacity: 0.5 }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '880px', margin: '0 auto', textAlign: 'center' }}>
          <Reveal>
            <div className="tag" style={{ justifyContent: 'center', marginBottom: '1.5rem', color: 'var(--gold)' }}>Demande de devis</div>
            <h2 className="font-display" style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', fontWeight: 600, color: 'var(--charcoal)', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '1.5rem' }}>
              Porteurs de projet,<br /><span style={{ color: 'var(--gold)' }}>parlons-en.</span>
            </h2>
            <p style={{ color: 'var(--slate)', lineHeight: 1.8, fontSize: '1rem', maxWidth: '620px', margin: '0 auto 2rem', fontWeight: 300 }}>
              Ce formulaire s'adresse en particulier aux <strong style={{ color: 'var(--gold-pale)' }}>franchiseurs, franchisés, promoteurs, fonds d'investissement</strong> et autres porteurs de projet. Joignez vos documents — nous vous répondons sous 48 heures.
            </p>
          </Reveal>
          <div style={{ background: '#F7F4EE', border: '1px solid rgba(196,152,58,0.2)', borderRadius: '12px', padding: 'clamp(1.75rem, 4vw, 3rem)', maxWidth: '680px', margin: '0 auto', textAlign: 'left' }}>
            <ContactForm />
            <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid rgba(0,0,0,0.08)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div>
                <div style={{ fontSize: '0.72rem', letterSpacing: '0.1em', color: 'var(--slate)', textTransform: 'uppercase', marginBottom: '4px' }}>Email</div>
                <a href="mailto:contact@nawaraprojects.com" style={{ color: 'var(--gold)', fontSize: '0.875rem', textDecoration: 'none' }}>contact@nawaraprojects.com</a>
              </div>
              <div>
                <div style={{ fontSize: '0.72rem', letterSpacing: '0.1em', color: 'var(--slate)', textTransform: 'uppercase', marginBottom: '4px' }}>Siège</div>
                <div style={{ color: 'var(--charcoal)', fontSize: '0.875rem' }}>Abidjan, Côte d'Ivoire</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#fff', borderTop: '2px solid var(--gold)', padding: '2.5rem 2rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '28px', height: '28px', background: 'var(--gold)', clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)', flexShrink: 0 }} />
            <span className="font-display" style={{ color: 'var(--charcoal)', fontSize: '1rem', fontWeight: 600 }}>Nawara <span style={{ color: 'var(--gold)' }}>Projects</span></span>
          </div>
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            {NAV_LINKS.map(({ label, href }) => (
              <a key={label} href={href} style={{ color: 'var(--slate)', fontSize: '0.8rem', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={(e) => { (e.target as HTMLElement).style.color = 'var(--gold)' }}
                onMouseLeave={(e) => { (e.target as HTMLElement).style.color = 'var(--slate)' }}>{label}</a>
            ))}
          </div>
          <div style={{ color: 'var(--slate)', fontSize: '0.78rem' }}>© 2026 Nawara Projects. Tous droits réservés.</div>
        </div>
      </footer>

      {/* ── STICKY CTA ── */}
      <div style={{
        position: 'fixed',
        bottom: '2rem',
        right: '2rem',
        zIndex: 200,
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'flex-end',
        gap: '0.75rem',
        transition: 'opacity 0.4s ease, transform 0.4s ease',
        opacity: showSticky ? 1 : 0,
        transform: showSticky ? 'translateY(0)' : 'translateY(20px)',
        pointerEvents: showSticky ? 'auto' : 'none',
      }}>
        {/* Calendly — appel découverte */}
        <a
          href="https://calendly.com/gomes-patrao7/15min"
          target="_blank"
          rel="noopener noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '0.75rem 1.4rem',
            background: '#fff',
            color: '#000',
            border: '1.5px solid rgba(196,152,58,0.4)',
            borderRadius: '50px',
            textDecoration: 'none',
            fontSize: '0.8rem',
            fontWeight: 600,
            fontFamily: "'DM Sans', sans-serif",
            boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
            whiteSpace: 'nowrap',
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="#C4983A" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <rect x="3" y="4" width="18" height="18" rx="2"/><line x1="16" y1="2" x2="16" y2="6"/><line x1="8" y1="2" x2="8" y2="6"/><line x1="3" y1="10" x2="21" y2="10"/>
          </svg>
          Réserver un appel gratuit
        </a>

        {/* Devis */}
        <a
          href="#contact"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            padding: '0.85rem 1.6rem',
            background: 'var(--gold)',
            color: '#000',
            borderRadius: '50px',
            textDecoration: 'none',
            fontSize: '0.82rem',
            fontWeight: 600,
            fontFamily: "'DM Sans', sans-serif",
            boxShadow: '0 4px 24px rgba(196,152,58,0.45)',
            whiteSpace: 'nowrap',
          }}
          onClick={(e) => {
            e.preventDefault()
            document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth' })
          }}
        >
          <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"/>
          </svg>
          Demander un devis
        </a>
      </div>

      <style>{`
        @media (max-width: 768px) { .hidden-mobile { display: none !important; } }
        @media (min-width: 769px) { .mobile-only { display: none !important; } }
        @media (max-width: 900px) { .grid-2col { grid-template-columns: 1fr !important; gap: 2rem !important; } }
        @media (max-width: 640px) {
          div[style*="bottom: 2rem"][style*="right: 2rem"] {
            bottom: 1rem !important;
            right: 1rem !important;
          }
        }
      `}</style>
    </div>
  )
}

/* ── ExpertiseSection ── */
function ExpertiseSection() {
  const metiers: Array<{ sigle: string; titre: string; description: string; featured?: boolean }> = [
    {
      sigle: 'DD',
      titre: 'Due Diligence',
      description: "Audit technique, juridique et financier. Identification des risques, évaluation de la conformité aux normes locales et recommandations opérationnelles.",
    },
    {
      sigle: 'AMO',
      titre: "Assistance à Maîtrise d'Ouvrage",
      description: "Conseil et assistance technique au maître d'ouvrage tout au long du projet. Défense de vos intérêts, optimisation des décisions sur place.",
    },
    {
      sigle: 'MOE',
      titre: "Maîtrise d'Œuvre",
      description: "Conception, direction et contrôle des travaux. Coordination des entreprises, respect des délais et de la qualité d'exécution.",
    },
    {
      sigle: 'OPC',
      titre: 'Ordonnancement, Pilotage & Coordination',
      description: "Planification des travaux, gestion des interfaces entre corps d'état, suivi de l'avancement et tenue du planning contractuel.",
    },
    {
      sigle: 'CG',
      titre: 'Contractant Général (clé en main)',
      description: "Prise en charge complète : conception, coordination des entreprises et livraison sous contrat unique. Un seul interlocuteur, une seule responsabilité.",
      featured: true,
    },
    {
      sigle: 'MOD',
      titre: "Maîtrise d'Ouvrage Déléguée",
      description: "Délégation complète de la maîtrise d'ouvrage. Nawara Projects représente et engage vos intérêts dans toutes les dimensions du projet.",
    },
  ]

  return (
    <section id="projets" style={{ position: 'relative', overflow: 'hidden', background: 'var(--charcoal)', padding: 'clamp(3.5rem, 7vw, 6rem) clamp(1.25rem, 5vw, 4.5rem)' }}>
      <div style={{ position: 'absolute', top: '-120px', right: '-120px', width: '420px', height: '320px', background: 'radial-gradient(closest-side, rgba(196,152,58,0.35), rgba(196,152,58,0) 70%)', pointerEvents: 'none' }} />
      <div className="geo-pattern" style={{ position: 'absolute', inset: 0, opacity: 0.2 }} />
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1280px', margin: '0 auto' }}>
        <Reveal>
          <div className="tag" style={{ marginBottom: '1.25rem', color: 'var(--gold)' }}>Réalisation opérationnelle</div>
          <h2 className="font-display" style={{ margin: '0 0 1.5rem', fontSize: 'clamp(2.4rem, 5vw, 3.6rem)', fontWeight: 600, color: 'var(--cream)', lineHeight: 1.05, letterSpacing: '-0.02em' }}>
            Six métiers,<br /><span style={{ color: 'var(--gold)' }}>un seul interlocuteur</span>
          </h2>
          <p style={{ margin: '0 0 clamp(2rem, 4vw, 3.25rem)', maxWidth: '640px', color: 'var(--slate-light)', fontSize: '0.95rem', lineHeight: 1.8, fontWeight: 300 }}>
            Nos équipes interviennent directement sur le terrain en Côte d'Ivoire, au Sénégal et au Bénin. Chaque mission est pilotée depuis Abidjan, siège opérationnel de Nawara Projects.
          </p>
        </Reveal>
        <div className="expertise-grid" style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 'clamp(1rem, 1.6vw, 1.5rem)' }}>
          {metiers.map((m, i) => (
            <Reveal key={m.sigle} delay={i * 70}>
              <div className={`expertise-card service-card${m.featured ? ' expertise-card--featured' : ''}`} style={{ position: 'relative', background: '#fff', border: `1px solid ${m.featured ? 'rgba(196,152,58,0.4)' : '#e7e7e7'}`, borderRadius: '4px', padding: '1.75rem 1.5rem 2rem', boxSizing: 'border-box' as const }}>
                <span className="font-display" style={{ display: 'block', marginBottom: '1rem', fontSize: '2rem', fontWeight: 600, color: 'var(--gold)', letterSpacing: '0.02em' }}>{m.sigle}</span>
                <h3 style={{ margin: '0 0 0.85rem', fontSize: '1rem', fontWeight: 700, lineHeight: 1.3, color: 'var(--charcoal)' }}>{m.titre}</h3>
                <p style={{ margin: 0, fontSize: '0.875rem', lineHeight: 1.65, color: 'var(--slate)' }}>{m.description}</p>
              </div>
            </Reveal>
          ))}
        </div>
        <style>{`
          @media (max-width: 1100px) { .expertise-grid { grid-template-columns: repeat(2, 1fr) !important; } }
          @media (max-width: 560px)  { .expertise-grid { grid-template-columns: 1fr !important; } }
          .expertise-card { transition: transform 0.25s ease, box-shadow 0.25s ease; }
          .expertise-card::before { content: ""; position: absolute; top: 0; left: 0; right: 0; height: 3px; background: var(--gold); border-radius: 4px 4px 0 0; opacity: 0; transition: opacity 0.25s ease; }
          .expertise-card:hover { transform: translateY(-4px); box-shadow: 0 18px 40px -22px rgba(0,0,0,0.55); }
          .expertise-card:hover::before, .expertise-card--featured::before { opacity: 1; }
          @media (prefers-reduced-motion: reduce) { .expertise-card { transition: none; } .expertise-card:hover { transform: none; } }
        `}</style>
      </div>
    </section>
  )
}

/* ── HorizontalScroll ── */
function HorizontalScroll({ children, dark }: { children: ReactNode; dark?: boolean }) {
  const ref = useRef<HTMLDivElement>(null)
  const scrollBy = (direction: 'prev' | 'next') => {
    const el = ref.current; if (!el) return
    el.scrollBy({ left: el.clientWidth * 0.8 * (direction === 'next' ? 1 : -1), behavior: 'smooth' })
  }
  return (
    <div className="h-scroll-wrap">
      <button type="button" aria-label="Précédent" onClick={() => scrollBy('prev')} className="h-scroll-nav prev" style={dark ? {} : undefined}><ArrowLeft size={18} /></button>
      <div ref={ref} className="h-scroll">{children}</div>
      <button type="button" aria-label="Suivant" onClick={() => scrollBy('next')} className="h-scroll-nav next"><ArrowRight size={18} /></button>
    </div>
  )
}

/* ── DeliverySection ── */
function DeliverySection() {
  return (
    <section style={{ background: 'var(--cream-light)', padding: '7rem 2rem', position: 'relative', overflow: 'hidden' }}>
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1280px', margin: '0 auto' }}>
        <div className="grid-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'center' }}>
          <Reveal direction="left">
            <div>
              <div className="tag" style={{ marginBottom: '1.5rem' }}>Étape finale</div>
              <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 600, color: 'var(--charcoal)', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '1.5rem' }}>
                Livraison &<br /><span style={{ color: 'var(--gold)' }}>Mise en exploitation</span>
              </h2>
              <p style={{ color: 'var(--slate)', lineHeight: 1.8, fontSize: '1rem', marginBottom: '1.5rem', fontWeight: 300 }}>
                Nos équipes livrent votre cellule commerciale entièrement aménagée — mobilier, signalétique, éclairage, parcours client et finitions. Tout est prêt pour accueillir vos premiers clients.
              </p>
              <p style={{ color: 'var(--slate)', lineHeight: 1.8, fontSize: '1rem', marginBottom: '2rem', fontWeight: 300 }}>
                La livraison est jalonnée d'étapes clés : contrôle qualité rigoureux, levées de réserves et vérification de la conformité au cahier des charges. Vous récupérez un site opérationnel dès le premier jour.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {['Concept store', 'Scénographie', 'Mobilier', 'Signalétique', 'Levée de réserves', 'Livraison garantie'].map((t) => (
                  <span key={t} style={{ padding: '0.35rem 0.8rem', border: '1px solid rgba(196,152,58,0.3)', borderRadius: '100px', fontSize: '0.75rem', color: 'var(--gold)', background: 'rgba(196,152,58,0.06)' }}>{t}</span>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal direction="right">
            <div style={{ position: 'relative', aspectRatio: '4 / 3', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(196,152,58,0.2)', background: 'linear-gradient(180deg, #0F0F0F 0%, #1A1A1A 100%)', boxShadow: '0 30px 80px rgba(0,0,0,0.12)' }}>
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 70% 55% at 50% 30%, rgba(196,152,58,0.18), transparent 70%)' }} />
              <svg viewBox="0 0 400 300" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} aria-hidden>
                <rect x="0" y="240" width="400" height="60" fill="#0A0A0A" />
                <line x1="0" y1="240" x2="400" y2="240" stroke="#C4983A" strokeOpacity="0.3" strokeWidth="1" />
                <rect x="60" y="60" width="280" height="180" fill="#121212" stroke="#C4983A" strokeOpacity="0.45" strokeWidth="1.5" />
                <rect x="70" y="88" width="120" height="130" fill="url(#w1)" stroke="#C4983A" strokeOpacity="0.22" />
                <rect x="210" y="88" width="120" height="130" fill="url(#w1)" stroke="#C4983A" strokeOpacity="0.22" />
                <circle cx="110" cy="135" r="9" fill="#C4983A" opacity="0.85" /><rect x="102" y="144" width="16" height="55" fill="#C4983A" opacity="0.6" rx="3" />
                <circle cx="150" cy="135" r="9" fill="#E8D5A8" opacity="0.85" /><rect x="142" y="144" width="16" height="55" fill="#E8D5A8" opacity="0.5" rx="3" />
                <rect x="222" y="120" width="96" height="4" fill="#C4983A" opacity="0.55" />
                <rect x="222" y="155" width="96" height="4" fill="#C4983A" opacity="0.55" />
                <rect x="222" y="190" width="96" height="4" fill="#C4983A" opacity="0.55" />
                {[0,1,2,3].map(i=><rect key={`p${i}`} x={230+i*22} y="102" width="12" height="18" fill="#E8D5A8" opacity="0.8" rx="1"/>)}
                {[0,1,2,3].map(i=><rect key={`q${i}`} x={230+i*22} y="137" width="12" height="18" fill="#C4983A" opacity="0.7" rx="1"/>)}
                {[0,1,2,3].map(i=><rect key={`r${i}`} x={230+i*22} y="172" width="12" height="18" fill="#E8D5A8" opacity="0.6" rx="1"/>)}
                <rect x="185" y="150" width="30" height="90" fill="#050505" stroke="#C4983A" strokeOpacity="0.5" />
                <circle cx="192" cy="195" r="1.5" fill="#C4983A" />
                <rect x="60" y="30" width="280" height="30" fill="#000" stroke="#C4983A" strokeOpacity="0.55" />
                <text x="200" y="51" fontFamily="'Cormorant Garamond',serif" fontSize="18" fill="#C4983A" textAnchor="middle" fontWeight="600" letterSpacing="2">VOTRE ENSEIGNE</text>
                <rect x="260" y="210" width="60" height="20" rx="3" fill="none" stroke="#C4983A" strokeWidth="1.2"><animate attributeName="stroke-opacity" values="0.3;1;0.3" dur="2s" repeatCount="indefinite"/></rect>
                <text x="290" y="224" fontFamily="'DM Sans',sans-serif" fontSize="10" fill="#C4983A" textAnchor="middle" fontWeight="700" letterSpacing="2">OPEN</text>
                <line x1="155" y1="165" x2="245" y2="185" stroke="#C4983A" strokeWidth="2.5"/>
                <polygon points="155,165 150,161 158,169" fill="#C4983A"/><polygon points="245,185 250,189 243,181" fill="#C4983A"/>
                <circle cx="200" cy="175" r="4" fill="#C4983A"/>
                {[{x:80,y:75,c:'#C4983A'},{x:120,y:60,c:'#E8D5A8'},{x:160,y:72,c:'#C4983A'},{x:220,y:58,c:'#E8D5A8'},{x:280,y:72,c:'#C4983A'},{x:320,y:62,c:'#E8D5A8'},{x:100,y:95,c:'#E8D5A8'},{x:300,y:100,c:'#C4983A'},{x:50,y:120,c:'#E8D5A8'},{x:350,y:130,c:'#C4983A'}].map((c,i)=>(
                  <rect key={i} x={c.x} y={c.y} width="4" height="8" fill={c.c} opacity="0.85" transform={`rotate(${i*37} ${c.x+2} ${c.y+4})`}>
                    <animate attributeName="opacity" values="0.4;1;0.4" dur="1.8s" begin={`${i*0.15}s`} repeatCount="indefinite"/>
                  </rect>
                ))}
                <defs><linearGradient id="w1" x1="0" y1="0" x2="1" y2="1"><stop offset="0%" stopColor="#1A1A1A"/><stop offset="100%" stopColor="#262626"/></linearGradient></defs>
              </svg>
              <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '1.25rem 1.5rem', background: 'linear-gradient(180deg, transparent, rgba(0,0,0,0.8))', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Sparkles size={16} style={{ color: 'var(--gold)' }} />
                <span style={{ color: 'var(--cream)', fontSize: '0.85rem', fontWeight: 500, letterSpacing: '0.02em' }}>Livraison clé en main</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  )
}

/* ── PartnershipSection ── */
function PartnershipSection() {
  const groups = [
    { tag: 'Développement', icon: <Building2 size={22}/>, title: 'Promoteurs Immobiliers', description: "Partenaires de développement immobilier locaux pour des projets mixtes, résidentiels et commerciaux africains.", items: ['Commerces','Tertiaire','Résidentiel','Mixte'] },
    { tag: 'Conseil juridique', icon: <Scale size={22}/>, title: 'Experts Juridiques', description: "Avocats d'affaires et juristes locaux maîtrisant les réglementations et le droit des affaires du continent africain.", items: ['Droit des affaires','Contrats','Conformité','Fiscalité'] },
    { tag: 'Financement', icon: <Landmark size={22}/>, title: 'Établissements Bancaires', description: "Réseau de banques africaines partenaires pour le financement et l'accompagnement de vos projets d'implantation.", items: ['Financement','Crédit-bail','Garanties','Transferts'] },
    { tag: 'Protection', icon: <ShieldCheck size={22}/>, title: 'Assurances', description: "Assureurs locaux pour la couverture de vos chantiers, biens et activités commerciales en Afrique de l'Ouest.", items: ['Tous risques chantier','Responsabilité civile','Biens','Exploitation'] },
    { tag: 'Conception', icon: <Ruler size={22}/>, title: 'Architectes', description: "Partenaires locaux de conception, permis de construire et plans d'exécution adaptés aux normes africaines.", items: ['Concept & esquisse','APS / APD','Permis de construire','Plans d\'exécution'] },
    { tag: 'Ingénierie', icon: <Wrench size={22}/>, title: 'Ingénieurs Structure', description: "Ingénieurs locaux maîtrisant les contraintes techniques et climatiques du continent africain.", items: ['Structure','Fluides','Électricité','Sécurité incendie'] },
    { tag: 'Coûts & métrés', icon: <Calculator size={22}/>, title: 'Économistes de la Construction', description: "Analyse des coûts, métrés et optimisation budgétaire selon les marchés locaux africains.", items: ['Métrés','Estimations','DCE','Optimisation budget'] },
    { tag: 'Études techniques', icon: <ClipboardList size={22}/>, title: "Bureaux d'Études Techniques", description: "Expertise technique adaptée aux conditions géologiques et climatiques spécifiques au continent africain.", items: ['Structure','Thermique & CVC','Acoustique','Géotechnique'] },
    { tag: 'Pilotage chantier', icon: <HardHat size={22}/>, title: 'Conducteurs de Travaux', description: "Pilotage opérationnel des chantiers africains, coordination des corps d'état locaux et tenue des plannings.", items: ['Planning & OPC','Coordination lots','Suivi budget','Réception travaux'] },
    { tag: 'Entreprises travaux', icon: <Hammer size={22}/>, title: 'Entreprises TCE', description: "Réseau d'entreprises tous corps d'état locaux pour l'aménagement de cellules commerciales en Afrique de l'Ouest.", items: ['TCE — tous corps d\'état','CVC & climatisation','Menuiserie & agencement','Peinture & revêtements'] },
  ]
  return (
    <section id="partenariat" style={{ background: '#F7F4EE', padding: '7rem 2rem', position: 'relative', overflow: 'hidden' }}>
      <div className="geo-pattern" style={{ position: 'absolute', inset: 0, opacity: 0.35 }} />
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1280px', margin: '0 auto' }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
            <div className="tag" style={{ justifyContent: 'center', marginBottom: '1.25rem', color: 'var(--gold)' }}>Partenariat</div>
            <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 600, color: 'var(--charcoal)', letterSpacing: '-0.02em', lineHeight: 1.15, maxWidth: '780px', margin: '0 auto 1.25rem' }}>
              Un écosystème complet de<br /><span style={{ color: 'var(--gold)' }}>partenaires qualifiés</span>
            </h2>
            <p style={{ color: 'var(--slate)', maxWidth: '640px', margin: '0 auto', lineHeight: 1.7, fontSize: '0.95rem', fontWeight: 300 }}>
              Nawara Projects s'appuie sur un réseau de partenaires locaux sélectionnés sur chacun de ses trois marchés prioritaires — de la conception jusqu'à l'exécution terrain.
            </p>
          </div>
        </Reveal>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {groups.map(({ tag, icon, title, description, items }, i) => (
            <Reveal key={title} delay={i * 50}>
              <div className="service-card" style={{ background: '#fff', border: '1px solid rgba(196,152,58,0.15)', borderRadius: '10px', padding: '2rem', display: 'flex', flexDirection: 'column', height: '100%' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.25rem' }}>
                  <div style={{ width: '44px', height: '44px', background: 'rgba(196,152,58,0.12)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)' }}>{icon}</div>
                  <div style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.14em', color: 'var(--gold)', textTransform: 'uppercase' }}>{tag}</div>
                </div>
                <h3 style={{ color: 'var(--charcoal)', fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.75rem', lineHeight: 1.3 }}>{title}</h3>
                <p style={{ color: 'var(--slate)', fontSize: '0.88rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>{description}</p>
                <ul style={{ listStyle: 'none', padding: 0, margin: 'auto 0 0', display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
                  {items.map((it) => (
                    <li key={it} style={{ fontSize: '0.72rem', padding: '0.25rem 0.7rem', borderRadius: '100px', background: 'rgba(196,152,58,0.08)', border: '1px solid rgba(196,152,58,0.2)', color: 'var(--gold)', fontWeight: 500 }}>{it}</li>
                  ))}
                </ul>
              </div>
            </Reveal>
          ))}
        </div>
        <Reveal>
          <div style={{ marginTop: '3.5rem', padding: '1.5rem 2rem', background: 'rgba(196,152,58,0.06)', borderLeft: '3px solid var(--gold)', borderRadius: '0 8px 8px 0', display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Network size={22} style={{ color: 'var(--gold)', flexShrink: 0 }} />
            <div style={{ color: 'var(--charcoal)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              <strong style={{ color: 'var(--charcoal)', fontWeight: 600 }}>Vous êtes un partenaire local ?</strong>{' '}
              Nous ouvrons régulièrement notre réseau à de nouveaux prestataires qualifiés opérant en Côte d'Ivoire, au Sénégal ou au Bénin.{' '}
              <a href="#contact" style={{ color: 'var(--gold)', textDecoration: 'underline' }}>Nous contacter</a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ── ContactForm (EmailJS — compatible Hostinger) ── */
const EMAILJS_SERVICE_ID  = import.meta.env.VITE_EMAILJS_SERVICE_ID  as string
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID as string
const EMAILJS_PUBLIC_KEY  = import.meta.env.VITE_EMAILJS_PUBLIC_KEY  as string

/* Libellés lisibles pour les valeurs des menus déroulants */
const PROFILE_LABELS: Record<string, string> = {
  entrepreneur: 'Entrepreneur local',
  diaspora:     'Membre de la diaspora',
  investisseur: 'Investisseur étranger',
  franchiseur:  'Franchiseur',
  franchise:    'Franchisé',
  promoteur:    'Promoteur immobilier',
  autre:        'Autre',
}
const SUBJECT_LABELS: Record<string, string> = {
  franchises:  'Développement de franchises',
  local:       'Recherche local commercial',
  amo_moe:     'AMO / MOE',
  contractant: 'Contractant Général clé en main',
  autre:       'Autre demande',
}

type FormState = { name: string; email: string; phone: string; company: string; profile: string; subject: string; message: string }

function ContactForm() {
  const [formData, setFormData] = useState<FormState>({ name: '', email: '', phone: '', company: '', profile: 'entrepreneur', subject: 'franchises', message: '' })
  const [status, setStatus] = useState<'idle'|'submitting'|'success'|'error'>('idle')

  const inputStyle = { width: '100%', padding: '0.75rem 1rem', background: '#fff', border: '1px solid rgba(196,152,58,0.25)', borderRadius: '4px', color: 'var(--charcoal)', fontSize: '0.875rem', outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box' as const, fontFamily: "'DM Sans', sans-serif" }
  const labelStyle = { display: 'block', fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'var(--gold)', marginBottom: '0.4rem', fontWeight: 600 }


  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (!EMAILJS_SERVICE_ID || !EMAILJS_TEMPLATE_ID || !EMAILJS_PUBLIC_KEY) {
      console.error('EmailJS: variables d\'environnement manquantes (VITE_EMAILJS_*)')
      setStatus('error')
      return
    }
    setStatus('submitting')

    const profileLabel = PROFILE_LABELS[formData.profile] ?? formData.profile
    const subjectLabel = SUBJECT_LABELS[formData.subject] ?? formData.subject

    // Corps de message complet : tout est replié dans {{message}} pour ne rien perdre,
    // même si le template ne référence que name / message / title.
    const messageComplet = [
      `Profil porteur de projet : ${profileLabel}`,
      `Nature du projet : ${subjectLabel}`,
      `Téléphone : ${formData.phone || 'Non renseigné'}`,
      `Société / Enseigne : ${formData.company || 'Non renseigné'}`,
      '',
      '— Détail du projet —',
      formData.message,
    ].join('\n')

    // Noms de variables alignés EXACTEMENT sur le template EmailJS :
    // {{name}}, {{email}}, {{title}}, {{message}} (+ champs détaillés optionnels).
    const templateParams: Record<string, string> = {
      name:    formData.name,
      email:   formData.email,
      title:   subjectLabel,          // remplit le sujet « Contact Us: {{title}} »
      message: messageComplet,
      phone:   formData.phone   || 'Non renseigné',
      company: formData.company || 'Non renseigné',
      profile: profileLabel,
      subject: subjectLabel,
    }


    try {
      await emailjs.send(EMAILJS_SERVICE_ID, EMAILJS_TEMPLATE_ID, templateParams, { publicKey: EMAILJS_PUBLIC_KEY })
      setStatus('success')
    } catch (err) {
      console.error('EmailJS error:', err)
      setStatus('error')
    }
  }

  if (status === 'success') return (
    <div style={{ textAlign: 'center', padding: '2rem 0' }}>
      <CheckCircle2 size={40} style={{ color: 'var(--gold)', margin: '0 auto 1rem', display: 'block' }} />
      <h4 style={{ color: 'var(--cream)', marginBottom: '0.5rem', fontWeight: 600 }}>Demande envoyée</h4>
      <p style={{ color: 'var(--slate-light)', fontSize: '0.875rem', lineHeight: 1.6, margin: 0 }}>Notre équipe revient vers vous sous 48 heures.</p>
    </div>
  )

  return (
    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="form-row">
        <div><label style={labelStyle} htmlFor="name">Nom complet*</label><input id="name" name="name" required placeholder="Jean Dupont" value={formData.name} onChange={(e)=>setFormData({...formData,name:e.target.value})} style={inputStyle} onFocus={e=>{e.target.style.borderColor='var(--gold)'}} onBlur={e=>{e.target.style.borderColor='rgba(196,152,58,0.22)'}}/></div>
        <div><label style={labelStyle} htmlFor="email">Email*</label><input id="email" name="email" required type="email" placeholder="contact@exemple.com" value={formData.email} onChange={(e)=>setFormData({...formData,email:e.target.value})} style={inputStyle} onFocus={e=>{e.target.style.borderColor='var(--gold)'}} onBlur={e=>{e.target.style.borderColor='rgba(196,152,58,0.22)'}}/></div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="form-row">
        <div><label style={labelStyle} htmlFor="phone">Téléphone</label><input id="phone" name="phone" type="tel" placeholder="+33 6 00 00 00 00" value={formData.phone} onChange={(e)=>setFormData({...formData,phone:e.target.value})} style={inputStyle} onFocus={e=>{e.target.style.borderColor='var(--gold)'}} onBlur={e=>{e.target.style.borderColor='rgba(196,152,58,0.22)'}}/></div>
        <div><label style={labelStyle} htmlFor="company">Société / Enseigne</label><input id="company" name="company" placeholder="Nom de votre organisation" value={formData.company} onChange={(e)=>setFormData({...formData,company:e.target.value})} style={inputStyle} onFocus={e=>{e.target.style.borderColor='var(--gold)'}} onBlur={e=>{e.target.style.borderColor='rgba(196,152,58,0.22)'}}/></div>
      </div>
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }} className="form-row">
        <div><label style={labelStyle} htmlFor="profile">Profil porteur de projet*</label>
          <select id="profile" name="profile" value={formData.profile} onChange={(e)=>setFormData({...formData,profile:e.target.value})} style={{...inputStyle,cursor:'pointer'}} onFocus={e=>{e.target.style.borderColor='var(--gold)'}} onBlur={e=>{e.target.style.borderColor='rgba(196,152,58,0.22)'}}>
            <option value="entrepreneur">Entrepreneur local</option><option value="diaspora">Membre de la diaspora</option><option value="investisseur">Investisseur étranger</option><option value="franchiseur">Franchiseur</option><option value="franchise">Franchisé</option><option value="promoteur">Promoteur immobilier</option><option value="autre">Autre</option>
          </select></div>
        <div><label style={labelStyle} htmlFor="subject">Nature du projet*</label>
          <select id="subject" name="subject" value={formData.subject} onChange={(e)=>setFormData({...formData,subject:e.target.value})} style={{...inputStyle,cursor:'pointer'}} onFocus={e=>{e.target.style.borderColor='var(--gold)'}} onBlur={e=>{e.target.style.borderColor='rgba(196,152,58,0.22)'}}>
            <option value="franchises">Développement de franchises</option><option value="local">Recherche local commercial</option><option value="amo_moe">AMO / MOE</option><option value="contractant">Contractant Général clé en main</option><option value="autre">Autre demande</option>
          </select></div>
      </div>
      <div><label style={labelStyle} htmlFor="message">Votre projet*</label>
        <textarea id="message" name="message" required rows={4} placeholder="Décrivez votre projet : pays ciblés, calendrier, budget estimé, spécificités..." value={formData.message} onChange={(e)=>setFormData({...formData,message:e.target.value})} style={{...inputStyle,resize:'vertical'}} onFocus={e=>{e.target.style.borderColor='var(--gold)'}} onBlur={e=>{e.target.style.borderColor='rgba(196,152,58,0.22)'}}/>
      </div>
      {status==='error'&&<div style={{padding:'0.75rem 1rem',background:'rgba(229,115,115,0.1)',border:'1px solid rgba(229,115,115,0.35)',borderRadius:'4px',color:'#E57373',fontSize:'0.85rem'}}>L'envoi a échoué. Veuillez réessayer ou nous écrire directement.</div>}
      <button type="submit" className="btn-gold" disabled={status==='submitting'} style={{padding:'0.95rem',borderRadius:'4px',border:'none',cursor:status==='submitting'?'not-allowed':'pointer',fontSize:'0.9rem',display:'flex',alignItems:'center',justifyContent:'center',gap:'8px',opacity:status==='submitting'?0.7:1,marginTop:'0.5rem'}}>
        <span>{status==='submitting'?'Envoi en cours…':'Envoyer ma demande de devis'}</span>
        {status!=='submitting'&&<Send size={16}/>}
      </button>
      <style>{`@media (max-width: 640px) { .form-row { grid-template-columns: 1fr !important; } }`}</style>
    </form>
  )
}
