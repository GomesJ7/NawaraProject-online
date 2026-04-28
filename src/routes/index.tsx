import { createFileRoute } from '@tanstack/react-router'
import { useState, useEffect, useRef } from 'react'
import type { ReactNode } from 'react'
import {
  ArrowRight, ArrowLeft, MapPin, Building2, Handshake, ClipboardList,
  Search, Users, HardHat, CheckCircle2, Menu, X, ChevronRight, Globe,
  Sparkles, Wrench, Scale, Landmark, Hammer, Ruler, Calculator, Network,
  Send, Paperclip, FileText, AlertCircle,
} from 'lucide-react'

export const Route = createFileRoute('/')({
  component: Home,
})

const NAV_LINKS = [
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
  if (numericValue !== undefined) {
    const { ref, display } = useCountUp(numericValue, 1800, suffix)
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
  useEffect(() => {
    const handler = () => setScrolled(window.scrollY > 40)
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
          <a href="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '36px', height: '36px', background: 'var(--gold)', clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)', flexShrink: 0 }} />
            <span className="font-display" style={{ fontSize: '1.25rem', fontWeight: 600, color: 'white', letterSpacing: '0.02em' }}>
              Nawara <span style={{ color: 'var(--gold)' }}>Projects</span>
            </span>
          </a>
          <nav style={{ display: 'flex', alignItems: 'center', gap: '2.5rem' }}>
            <div className="hidden-mobile" style={{ display: 'flex', gap: '2rem' }}>
              {NAV_LINKS.map(({ label, href }) => (
                <a key={label} href={href} className="nav-link" style={{ color: 'rgba(255,255,255,0.82)', fontSize: '0.875rem', fontWeight: 500, textDecoration: 'none', letterSpacing: '0.02em' }}>{label}</a>
              ))}
            </div>
            <a href="#contact" className="btn-gold" style={{ padding: '0.6rem 1.4rem', borderRadius: '4px', fontSize: '0.82rem', textDecoration: 'none', display: 'inline-block' }}>
              <span>Demander un devis</span>
            </a>
            <button onClick={() => setMenuOpen(!menuOpen)} className="mobile-only" style={{ background: 'none', border: 'none', cursor: 'pointer', color: 'var(--cream)', padding: '4px' }}>
              {menuOpen ? <X size={22} /> : <Menu size={22} />}
            </button>
          </nav>
        </div>
        {menuOpen && (
          <div style={{ background: 'var(--charcoal)', borderTop: '1px solid var(--border-dark)', padding: '1.5rem 2rem' }}>
            {NAV_LINKS.map(({ label, href }) => (
              <a key={label} href={href} onClick={() => setMenuOpen(false)} style={{ display: 'block', color: 'var(--cream)', textDecoration: 'none', padding: '0.75rem 0', borderBottom: '1px solid rgba(255,255,255,0.07)', fontSize: '0.95rem', fontWeight: 500 }}>{label}</a>
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
            <div className="tag animate-fade-up" style={{ marginBottom: '2rem' }}>Cabinet de Conseil & Ingénierie — Afrique de l'Ouest</div>
            <h1 className="font-display animate-fade-up animate-fade-up-d1" style={{ fontSize: 'clamp(3rem, 7vw, 5.5rem)', fontWeight: 600, color: 'var(--cream)', lineHeight: 1.08, letterSpacing: '-0.02em', marginBottom: '2rem' }}>
              Votre partenaire<br />
              <span style={{ color: 'var(--gold)' }}>stratégique</span><br />
              en Afrique de l'Ouest
            </h1>
            <p className="animate-fade-up animate-fade-up-d2" style={{ fontSize: '1.1rem', color: 'rgba(255,255,255,0.72)', lineHeight: 1.75, maxWidth: '580px', marginBottom: '3rem', fontWeight: 300 }}>
              Conseil & déploiement de franchises depuis Paris ; maîtrise d'œuvre et réalisation de projets directement sur le continent africain — deux expertises complémentaires, un seul interlocuteur.
            </p>
            <div className="animate-fade-up animate-fade-up-d3" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
              <a href="#consulting" className="btn-gold" style={{ padding: '0.9rem 2rem', borderRadius: '4px', textDecoration: 'none', fontSize: '0.9rem', display: 'inline-flex', alignItems: 'center', gap: '8px' }}>
                <span>Découvrir nos expertises</span><ArrowRight size={16} />
              </a>
              <a href="#contact" className="btn-outline-gold" style={{ padding: '0.9rem 2rem', borderRadius: '4px', textDecoration: 'none', fontSize: '0.9rem' }}>Demander un devis</a>
            </div>
          </div>
          {/* Animated stats */}
          <div className="animate-fade-up animate-fade-up-d4" style={{ marginTop: '6rem', display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(160px, 1fr))', gap: '2rem', maxWidth: '680px', paddingTop: '3rem', borderTop: '1px solid rgba(196,152,58,0.2)' }}>
            <StatItem numericValue={15} suffix="+" label="Pays couverts en Afrique" />
            <StatItem numericValue={2} label="Pôles d'expertise complémentaires" />
            <StatItem value="100%" label="Accompagnement sur mesure" />
          </div>
        </div>
        <div style={{ position: 'absolute', bottom: '2.5rem', left: '50%', transform: 'translateX(-50%)', display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '8px', animation: 'shimmer 2s ease infinite' }}>
          <div style={{ width: '1px', height: '40px', background: 'linear-gradient(to bottom, transparent, var(--gold))' }} />
          <div style={{ width: '5px', height: '5px', borderRadius: '50%', background: 'var(--gold)' }} />
        </div>
      </section>

      {/* TWO PILLARS */}
      <section style={{ background: 'var(--cream-light)', padding: '6rem 2rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: '4rem' }}>
              <div className="tag" style={{ justifyContent: 'center', marginBottom: '1.25rem', color: 'var(--gold)' }}>Nos deux pôles d'activité</div>
              <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 600, color: 'var(--charcoal)', letterSpacing: '-0.02em', lineHeight: 1.2 }}>
                Deux expertises indépendantes,<br /><span style={{ color: 'var(--gold)' }}>un seul cabinet</span>
              </h2>
            </div>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))', gap: '2rem' }}>
            <Reveal delay={0} direction="left">
              <a href="#consulting" className="pillar-card service-card" style={{ background: 'var(--charcoal)', borderRadius: '8px', textDecoration: 'none', display: 'block', border: '1px solid rgba(196,152,58,0.12)', overflow: 'hidden' }}>
                <div style={{ height: '180px', backgroundImage: 'url(https://images.unsplash.com/photo-1560472354-b33ff0c44a43?w=800&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 30%, rgba(0,0,0,0.85))' }} />
                </div>
                <div style={{ padding: '2.5rem 3rem 3rem' }}>
                <div style={{ width: '56px', height: '56px', background: 'rgba(196,152,58,0.12)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem', color: 'var(--gold)' }}><Handshake size={26} /></div>
                <div className="tag" style={{ marginBottom: '1rem', color: 'var(--gold)' }}>Conseil & Conception — depuis Paris</div>
                <h3 className="font-display" style={{ fontSize: '1.8rem', fontWeight: 600, color: 'var(--cream)', marginBottom: '1rem', lineHeight: 1.2, letterSpacing: '-0.01em' }}>Développement<br />de Franchises</h3>
                <p style={{ color: 'var(--slate-light)', lineHeight: 1.7, fontSize: '0.92rem', marginBottom: '2rem' }}>
                  Accompagnement des franchiseurs internationaux dans leur déploiement en Afrique de l'Ouest — de l'analyse stratégique jusqu'à la signature du contrat. Activité pilotée depuis Paris.
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--gold)', fontSize: '0.85rem', fontWeight: 500 }}>En savoir plus <ChevronRight size={16} /></div>
                </div>
              </a>
            </Reveal>
            <Reveal delay={100} direction="right">
              <a href="#projets" className="pillar-card service-card" style={{ background: 'var(--cream-light)', borderRadius: '8px', textDecoration: 'none', display: 'block', border: '1px solid var(--border-light)', overflow: 'hidden' }}>
                <div style={{ height: '180px', backgroundImage: 'url(https://images.unsplash.com/photo-1504307651254-35680f356dfd?w=800&q=80)', backgroundSize: 'cover', backgroundPosition: 'center', position: 'relative' }}>
                  <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(to bottom, transparent 30%, rgba(255,255,255,0.85))' }} />
                </div>
                <div style={{ padding: '2.5rem 3rem 3rem' }}>
                <div style={{ width: '56px', height: '56px', background: 'rgba(0,0,0,0.06)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: '2rem', color: 'var(--charcoal)' }}><Building2 size={26} /></div>
                <div className="tag" style={{ marginBottom: '1rem', color: 'var(--charcoal)' }}>Réalisation opérationnelle — sur le continent africain</div>
                <h3 className="font-display" style={{ fontSize: '1.8rem', fontWeight: 600, color: 'var(--charcoal)', marginBottom: '1rem', lineHeight: 1.2, letterSpacing: '-0.01em' }}>Maîtrise d'Ouvrage<br />& d'Œuvre</h3>
                <p style={{ color: 'var(--slate)', lineHeight: 1.7, fontSize: '0.92rem', marginBottom: '2rem' }}>
                  MOE, AMO, MOD, contractant général, due diligence — nos équipes interviennent directement sur le terrain africain pour la réalisation de vos projets, avec des partenaires locaux qualifiés.
                </p>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', color: 'var(--charcoal)', fontSize: '0.85rem', fontWeight: 500 }}>En savoir plus <ChevronRight size={16} /></div>
                </div>
              </a>
            </Reveal>
          </div>
        </div>
      </section>

      {/* NOTRE APPROCHE — moved up, logically before expertise detail */}
      <section id="approche" style={{ background: 'var(--charcoal)', padding: '7rem 2rem', position: 'relative', overflow: 'hidden' }}>
        <div className="geo-pattern" style={{ position: 'absolute', inset: 0, opacity: 0.35 }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1280px', margin: '0 auto' }}>
          <Reveal>
            <div style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
              <div className="tag" style={{ justifyContent: 'center', marginBottom: '1.25rem', color: 'var(--gold)' }}>Notre Approche</div>
              <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 600, color: 'var(--cream)', letterSpacing: '-0.02em', lineHeight: 1.15, maxWidth: '640px', margin: '0 auto' }}>
                Pourquoi choisir<br /><span style={{ color: 'var(--gold)' }}>Nawara Projects ?</span>
              </h2>
            </div>
          </Reveal>
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: '2rem' }}>
            {[
              { number: '01', title: 'Expertise locale et internationale', description: "Une équipe alliant standards européens et connaissance profonde des marchés africains — pour des décisions éclairées à chaque étape du projet." },
              { number: '02', title: 'Approche bi-culturelle', description: "Nous parlons le langage des franchiseurs internationaux comme celui des opérateurs locaux africains. Ce positionnement unique est notre valeur différenciante." },
              { number: '03', title: 'Réseau qualifié sur le continent', description: "Investisseurs, développeurs, promoteurs, architectes locaux : un écosystème de partenaires africains de confiance, activable rapidement sur le terrain." },
              { number: '04', title: 'Accompagnement de bout en bout', description: "De l'analyse stratégique parisienne jusqu'à la livraison sur site africain, nous restons à vos côtés à chaque étape critique du projet." },
              { number: '05', title: 'Indépendance et neutralité', description: "Nos deux pôles opèrent de manière autonome. Aucun conflit d'intérêts — nous défendons uniquement vos objectifs et intérêts." },
              { number: '06', title: 'Rigueur et transparence', description: "Reporting régulier, jalons contractuels et communication proactive — des engagements concrets, pas seulement des promesses." },
            ].map(({ number, title, description }, i) => (
              <Reveal key={number} delay={i * 60}>
                <div className="service-card" style={{ padding: '2.5rem', border: '1px solid rgba(196,152,58,0.18)', borderRadius: '8px', background: 'rgba(255,255,255,0.03)', height: '100%' }}>
                  <div className="font-display" style={{ fontSize: '3rem', fontWeight: 700, color: 'rgba(196,152,58,0.22)', lineHeight: 1, marginBottom: '1.5rem', letterSpacing: '-0.02em' }}>{number}</div>
                  <h3 style={{ color: 'var(--cream)', fontSize: '1rem', fontWeight: 600, marginBottom: '0.75rem', lineHeight: 1.3 }}>{title}</h3>
                  <p style={{ color: 'var(--slate-light)', fontSize: '0.875rem', lineHeight: 1.7, margin: 0 }}>{description}</p>
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
                <div className="tag" style={{ marginBottom: '1.5rem' }}>Conseil, Conception & Déploiement — depuis Paris</div>
                <h2 className="font-display" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', fontWeight: 600, color: 'var(--charcoal)', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '1.5rem' }}>
                  Développement de<br /><span style={{ color: 'var(--gold)' }}>Franchises en Afrique</span>
                </h2>
              </div>
            </Reveal>
            <Reveal direction="right">
              <div style={{ paddingTop: '1rem' }}>
                <p style={{ color: 'var(--slate)', lineHeight: 1.8, fontSize: '1rem', fontWeight: 300 }}>
                  Nawara Projects accompagne les franchiseurs internationaux souhaitant se déployer sur les marchés d'Afrique de l'Ouest. Cette activité de conseil et de conception est pilotée depuis notre siège parisien, en lien étroit avec nos bureaux régionaux présents sur le continent.
                </p>
                <div style={{ marginTop: '1.5rem', padding: '1rem 1.5rem', background: 'rgba(196,152,58,0.08)', borderLeft: '3px solid var(--gold)', borderRadius: '0 4px 4px 0' }}>
                  <p style={{ color: 'var(--slate)', fontSize: '0.875rem', lineHeight: 1.6, margin: 0 }}>
                    <strong>Indépendance des activités :</strong> notre pôle Conseil peut intervenir de manière entièrement autonome, sans lien avec nos activités de réalisation terrain en Afrique.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
          <HorizontalScroll>
            {[
              { icon: <Search size={22} />, title: 'Recherche & Qualification de Franchisés', description: "Identification et sélection rigoureuse de candidats franchisés correspondant aux critères financiers, opérationnels et culturels de votre enseigne." },
              { icon: <Users size={22} />, title: 'Mise en Relation avec les Enseignes', description: "Facilitation du dialogue entre franchiseurs et candidats locaux, avec une compréhension fine des attentes des deux parties." },
              { icon: <ClipboardList size={22} />, title: 'Analyse Stratégique de Déploiement', description: "Étude de marché, analyse concurrentielle, choix des territoires prioritaires et définition de la feuille de route d'expansion." },
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
      <section id="projets" style={{ background: 'var(--charcoal)', padding: '7rem 2rem', position: 'relative', overflow: 'hidden' }}>
        <div className="geo-pattern" style={{ position: 'absolute', inset: 0, opacity: 0.4 }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1280px', margin: '0 auto' }}>
          <div className="grid-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '4rem', alignItems: 'start', marginBottom: '4rem' }}>
            <Reveal direction="left">
              <div>
                <div className="tag" style={{ marginBottom: '1.5rem', color: 'var(--gold)' }}>Réalisation opérationnelle — sur le continent africain</div>
                <h2 className="font-display" style={{ fontSize: 'clamp(2.2rem, 4vw, 3.5rem)', fontWeight: 600, color: 'var(--cream)', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '1.5rem' }}>
                  Réalisation de Projets<br /><span style={{ color: 'var(--gold)' }}>en Afrique de l'Ouest</span>
                </h2>
              </div>
            </Reveal>
            <Reveal direction="right">
              <div style={{ paddingTop: '1rem' }}>
                <p style={{ color: 'rgba(255,255,255,0.72)', lineHeight: 1.8, fontSize: '1rem', fontWeight: 300 }}>
                  De la conception à la livraison, nos équipes interviennent directement sur le terrain africain pour la réalisation de vos projets immobiliers et commerciaux. Aucun projet en France : notre réalisation opérationnelle est exclusivement dédiée au continent africain.
                </p>
                <div style={{ marginTop: '1.5rem', padding: '1rem 1.5rem', background: 'rgba(196,152,58,0.08)', borderLeft: '3px solid var(--gold)', borderRadius: '0 4px 4px 0' }}>
                  <p style={{ color: 'var(--gold-pale)', fontSize: '0.875rem', lineHeight: 1.6, margin: 0 }}>
                    <strong style={{ color: 'var(--cream)' }}>Périmètre exclusivement africain :</strong> MOE, AMO, MOD et travaux sont menés uniquement sur le continent, avec des équipes et partenaires locaux qualifiés.
                  </p>
                </div>
              </div>
            </Reveal>
          </div>
          <HorizontalScroll dark>
            {[
              { icon: <HardHat size={24} />, acronym: 'MOE', title: "Maîtrise d'Œuvre", description: "Pilotage technique de la conception et de la réalisation de vos projets : coordination des bureaux d'études, suivi de chantier, contrôle qualité et respect des normes." },
              { icon: <ClipboardList size={24} />, acronym: 'AMO', title: "Assistance à Maîtrise d'Ouvrage", description: "Conseil et assistance technique au maître d'ouvrage tout au long du projet. Nous défendons vos intérêts et optimisons chaque décision stratégique." },
              { icon: <Building2 size={24} />, acronym: 'MOD', title: "Maîtrise d'Ouvrage Déléguée", description: "Délégation complète de la fonction maître d'ouvrage. Nawara Projects représente et engage vos intérêts dans toutes les dimensions du projet." },
              { icon: <CheckCircle2 size={24} />, acronym: 'CG', title: 'Contractant Général', description: "Solution clé en main : conception, construction, coordination des lots et livraison finale sous un contrat unique, pour une gestion simplifiée et sécurisée." },
              { icon: <Search size={24} />, acronym: 'DD', title: 'Due Diligence', description: "Audit technique, juridique et financier de vos actifs immobiliers. Identification des risques, évaluation de la conformité et recommandations d'arbitrage." },
            ].map(({ icon, acronym, title, description }) => (
              <div key={acronym} className="h-scroll-card service-card" style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(196,152,58,0.18)', borderRadius: '8px', padding: '2rem', position: 'relative', overflow: 'hidden', display: 'flex', flexDirection: 'column' }}>
                <div style={{ position: 'absolute', top: '-14px', right: '1.5rem', fontFamily: "'Cormorant Garamond', serif", fontSize: '4.5rem', fontWeight: 700, color: 'rgba(196,152,58,0.08)', letterSpacing: '-0.02em', lineHeight: 1, userSelect: 'none' }}>{acronym}</div>
                <div style={{ width: '48px', height: '48px', background: 'rgba(196,152,58,0.12)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)', marginBottom: '1.5rem' }}>{icon}</div>
                <div style={{ fontSize: '0.7rem', fontWeight: 700, letterSpacing: '0.12em', color: 'var(--gold)', textTransform: 'uppercase', marginBottom: '0.4rem' }}>{acronym}</div>
                <h3 style={{ color: 'var(--cream)', fontSize: '1.05rem', fontWeight: 600, marginBottom: '0.75rem', lineHeight: 1.3 }}>{title}</h3>
                <p style={{ color: 'var(--slate-light)', fontSize: '0.88rem', lineHeight: 1.7, margin: 0 }}>{description}</p>
              </div>
            ))}
          </HorizontalScroll>
        </div>
      </section>

      {/* LIVRAISON */}
      <DeliverySection />

      {/* ZONE GEO */}
      <section style={{ background: 'var(--charcoal-mid)', padding: '6rem 2rem', position: 'relative', overflow: 'hidden' }}>
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '1280px', margin: '0 auto' }}>
          <div className="grid-2col" style={{ display: 'grid', gridTemplateColumns: '1fr 1.4fr', gap: '5rem', alignItems: 'center' }}>
            <Reveal direction="left">
              <div>
                <div className="tag" style={{ marginBottom: '1.5rem', color: 'var(--gold)' }}>Zone d'intervention</div>
                <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 3.5vw, 3rem)', fontWeight: 600, color: 'var(--cream)', lineHeight: 1.15, letterSpacing: '-0.02em', marginBottom: '1.5rem' }}>
                  Un ancrage profond en<br /><span style={{ color: 'var(--gold)' }}>Afrique de l'Ouest</span>
                </h2>
                <p style={{ color: 'rgba(255,255,255,0.68)', lineHeight: 1.8, fontSize: '0.95rem', marginBottom: '2.5rem', fontWeight: 300 }}>
                  Nos équipes de réalisation interviennent directement sur le terrain africain. Notre connaissance des dynamiques économiques, réglementaires et culturelles locales garantit une exécution efficace et sécurisée de chaque projet.
                </p>
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.75rem' }}>
                  {["Côte d'Ivoire", 'Sénégal', 'Mali', 'Burkina Faso', 'Ghana', 'Bénin', 'Togo', 'Guinée', 'Niger', 'Mauritanie'].map((country) => (
                    <span key={country} style={{ padding: '0.35rem 0.9rem', border: '1px solid rgba(196,152,58,0.3)', borderRadius: '100px', fontSize: '0.78rem', color: 'var(--cream)', fontWeight: 400 }}>{country}</span>
                  ))}
                </div>
              </div>
            </Reveal>
            <Reveal direction="right">
              <div style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(196,152,58,0.15)', borderRadius: '12px', padding: '3rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '2rem' }}>
                  <Globe size={20} style={{ color: 'var(--gold)' }} />
                  <span style={{ color: 'var(--cream)', fontWeight: 600, fontSize: '0.95rem' }}>Présence opérationnelle</span>
                </div>
                {[
                  { city: 'Paris, France', role: 'Siège — Pôle Conseil & Conception', detail: 'Développement de franchises, conseil stratégique, relation enseignes internationales' },
                  { city: "Abidjan, Côte d'Ivoire", role: 'Bureau régional — Réalisation terrain', detail: 'Coordination des projets africains, réseau franchisés, suivi chantiers sur site' },
                  { city: 'Dakar, Sénégal', role: 'Antenne locale — Réalisation terrain', detail: 'Prospection et développement marché Sénégal & Mauritanie, suivi opérationnel' },
                ].map(({ city, role, detail }) => (
                  <div key={city} style={{ display: 'flex', gap: '1rem', paddingBottom: '1.5rem', marginBottom: '1.5rem', borderBottom: '1px solid rgba(196,152,58,0.1)' }}>
                    <MapPin size={16} style={{ color: 'var(--gold)', flexShrink: 0, marginTop: '3px' }} />
                    <div>
                      <div style={{ color: 'var(--cream)', fontWeight: 600, fontSize: '0.9rem', marginBottom: '2px' }}>{city}</div>
                      <div style={{ color: 'var(--gold-pale)', fontSize: '0.78rem', fontWeight: 500, marginBottom: '4px' }}>{role}</div>
                      <div style={{ color: 'var(--slate-light)', fontSize: '0.78rem', lineHeight: 1.5 }}>{detail}</div>
                    </div>
                  </div>
                ))}
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* PARTENARIAT */}
      <PartnershipSection />

      {/* CONTACT */}
      <section id="contact" style={{ background: 'var(--charcoal)', padding: '7rem 2rem', position: 'relative', overflow: 'hidden' }}>
        <div className="geo-pattern" style={{ position: 'absolute', inset: 0, opacity: 0.5 }} />
        <div style={{ position: 'relative', zIndex: 1, maxWidth: '880px', margin: '0 auto', textAlign: 'center' }}>
          <Reveal>
            <div className="tag" style={{ justifyContent: 'center', marginBottom: '1.5rem', color: 'var(--gold)' }}>Demande de devis</div>
            <h2 className="font-display" style={{ fontSize: 'clamp(2.2rem, 5vw, 4rem)', fontWeight: 600, color: 'var(--cream)', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '1.5rem' }}>
              Porteurs de projet,<br /><span style={{ color: 'var(--gold)' }}>parlons-en.</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.68)', lineHeight: 1.8, fontSize: '1rem', maxWidth: '640px', margin: '0 auto 2rem', fontWeight: 300 }}>
              Ce formulaire s'adresse en particulier aux <strong style={{ color: 'var(--gold-pale)' }}>franchiseurs, franchisés, promoteurs, fonds d'investissement</strong> et autres porteurs de projet souhaitant obtenir un <strong style={{ color: 'var(--gold-pale)' }}>devis</strong>. Joignez vos pièces (cahier des charges, plans, brief…) — nous revenons vers vous sous 48 heures.
            </p>
          </Reveal>
          <div style={{ background: 'rgba(255,255,255,0.04)', border: '1px solid rgba(196,152,58,0.2)', borderRadius: '12px', padding: 'clamp(1.75rem, 4vw, 3rem)', maxWidth: '680px', margin: '0 auto', textAlign: 'left' }}>
            <ContactForm />
            <div style={{ marginTop: '2rem', paddingTop: '2rem', borderTop: '1px solid rgba(196,152,58,0.12)', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
              <div>
                <div style={{ fontSize: '0.72rem', letterSpacing: '0.1em', color: 'var(--slate-light)', textTransform: 'uppercase', marginBottom: '4px' }}>Email</div>
                <a href="mailto:contact@nawaraprojects.com" style={{ color: 'var(--gold-pale)', fontSize: '0.875rem', textDecoration: 'none' }}>contact@nawaraprojects.com</a>
              </div>
              <div>
                <div style={{ fontSize: '0.72rem', letterSpacing: '0.1em', color: 'var(--slate-light)', textTransform: 'uppercase', marginBottom: '4px' }}>Siège</div>
                <div style={{ color: 'var(--gold-pale)', fontSize: '0.875rem' }}>Paris, France</div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* FOOTER */}
      <footer style={{ background: '#000000', borderTop: '1px solid rgba(196,152,58,0.1)', padding: '3rem 2rem' }}>
        <div style={{ maxWidth: '1280px', margin: '0 auto', display: 'flex', alignItems: 'center', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            <div style={{ width: '28px', height: '28px', background: 'var(--gold)', clipPath: 'polygon(50% 0%, 100% 25%, 100% 75%, 50% 100%, 0% 75%, 0% 25%)', flexShrink: 0 }} />
            <span className="font-display" style={{ color: 'var(--cream)', fontSize: '1rem', fontWeight: 600 }}>Nawara <span style={{ color: 'var(--gold)' }}>Projects</span></span>
          </div>
          <div style={{ display: 'flex', gap: '2rem', flexWrap: 'wrap' }}>
            {NAV_LINKS.map(({ label, href }) => (
              <a key={label} href={href} style={{ color: 'var(--slate-light)', fontSize: '0.8rem', textDecoration: 'none', transition: 'color 0.2s' }}
                onMouseEnter={(e) => { (e.target as HTMLElement).style.color = 'var(--gold)' }}
                onMouseLeave={(e) => { (e.target as HTMLElement).style.color = 'var(--slate-light)' }}>{label}</a>
            ))}
          </div>
          <div style={{ color: 'var(--slate-light)', fontSize: '0.78rem' }}>© 2026 Nawara Projects. Tous droits réservés.</div>
        </div>
      </footer>

      <style>{`
        @media (max-width: 768px) { .hidden-mobile { display: none !important; } }
        @media (min-width: 769px) { .mobile-only { display: none !important; } }
        @media (max-width: 900px) { .grid-2col { grid-template-columns: 1fr !important; gap: 2rem !important; } }
      `}</style>
    </div>
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
              <div className="tag" style={{ marginBottom: '1.5rem' }}>Étape finale — sur site africain</div>
              <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 600, color: 'var(--charcoal)', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '1.5rem' }}>
                Livraison &<br /><span style={{ color: 'var(--gold)' }}>Mise en exploitation</span>
              </h2>
              <p style={{ color: 'var(--slate)', lineHeight: 1.8, fontSize: '1rem', marginBottom: '1.5rem', fontWeight: 300 }}>
                Nos équipes livrent votre cellule commerciale entièrement aménagée directement sur le continent africain — mobilier, signalétique, éclairage scénographique, parcours client et finitions premium. Tout est prêt pour accueillir vos premiers clients locaux.
              </p>
              <p style={{ color: 'var(--slate)', lineHeight: 1.8, fontSize: '1rem', marginBottom: '2rem', fontWeight: 300 }}>
                L'ouverture est un moment clé : nous coordonnons la <strong style={{ color: 'var(--charcoal)' }}>cérémonie d'inauguration</strong> — coupe du ruban, presse locale africaine, équipes formées, animations d'ouverture — pour un lancement à la hauteur de votre marque sur le marché local.
              </p>
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.5rem' }}>
                {['Concept store', 'Scénographie', 'Mobilier', 'Signalétique', 'Cérémonie', 'Presse locale'].map((t) => (
                  <span key={t} style={{ padding: '0.35rem 0.8rem', border: '1px solid rgba(196,152,58,0.3)', borderRadius: '100px', fontSize: '0.75rem', color: 'var(--gold)', background: 'rgba(196,152,58,0.06)' }}>{t}</span>
                ))}
              </div>
            </div>
          </Reveal>
          <Reveal direction="right">
            <div style={{ position: 'relative', aspectRatio: '4 / 3', borderRadius: '12px', overflow: 'hidden', border: '1px solid rgba(196,152,58,0.2)', background: 'linear-gradient(180deg, #0B0B0B 0%, #161616 100%)', boxShadow: '0 30px 80px rgba(0,0,0,0.18)' }}>
              {/* Soft halo */}
              <div style={{ position: 'absolute', inset: 0, background: 'radial-gradient(ellipse 60% 45% at 50% 35%, rgba(196,152,58,0.22), transparent 70%)' }} />
              {/* Diagonal gold light beam */}
              <div style={{ position: 'absolute', inset: 0, background: 'linear-gradient(115deg, transparent 40%, rgba(196,152,58,0.06) 50%, transparent 60%)' }} />

              <svg viewBox="0 0 400 300" style={{ position: 'absolute', inset: 0, width: '100%', height: '100%' }} aria-hidden>
                <defs>
                  <linearGradient id="floor" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1A1A1A"/>
                    <stop offset="100%" stopColor="#050505"/>
                  </linearGradient>
                  <linearGradient id="wall" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1F1F1F"/>
                    <stop offset="100%" stopColor="#101010"/>
                  </linearGradient>
                  <linearGradient id="goldBox" x1="0" y1="0" x2="1" y2="1">
                    <stop offset="0%" stopColor="#D4AE5A"/>
                    <stop offset="100%" stopColor="#C4983A"/>
                  </linearGradient>
                  <radialGradient id="spot" cx="50%" cy="0%" r="65%">
                    <stop offset="0%" stopColor="rgba(232,213,168,0.55)"/>
                    <stop offset="60%" stopColor="rgba(196,152,58,0.12)"/>
                    <stop offset="100%" stopColor="rgba(0,0,0,0)"/>
                  </radialGradient>
                  <linearGradient id="window" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="0%" stopColor="#1B1B1B"/>
                    <stop offset="100%" stopColor="#080808"/>
                  </linearGradient>
                </defs>

                {/* Background wall + ceiling */}
                <rect x="0" y="0" width="400" height="240" fill="url(#wall)"/>
                {/* Floor with perspective */}
                <polygon points="0,240 400,240 360,300 40,300" fill="url(#floor)"/>
                <line x1="40" y1="300" x2="60" y2="240" stroke="rgba(196,152,58,0.08)" strokeWidth="0.8"/>
                <line x1="100" y1="300" x2="110" y2="240" stroke="rgba(196,152,58,0.08)" strokeWidth="0.8"/>
                <line x1="200" y1="300" x2="200" y2="240" stroke="rgba(196,152,58,0.1)" strokeWidth="0.8"/>
                <line x1="300" y1="300" x2="290" y2="240" stroke="rgba(196,152,58,0.08)" strokeWidth="0.8"/>
                <line x1="360" y1="300" x2="340" y2="240" stroke="rgba(196,152,58,0.08)" strokeWidth="0.8"/>

                {/* Ceiling track + 3 spots casting light cones */}
                <line x1="60" y1="22" x2="340" y2="22" stroke="#C4983A" strokeOpacity="0.45" strokeWidth="1.5"/>
                {[110, 200, 290].map((cx, i) => (
                  <g key={`spot-${i}`}>
                    <rect x={cx-7} y="18" width="14" height="9" rx="2" fill="#0A0A0A" stroke="#C4983A" strokeOpacity="0.7"/>
                    <polygon points={`${cx-32},27 ${cx+32},27 ${cx+95},230 ${cx-95},230`} fill="url(#spot)" opacity="0.55"/>
                  </g>
                ))}

                {/* Brand sign — top frame */}
                <rect x="60" y="40" width="280" height="30" fill="#000" stroke="url(#goldBox)" strokeWidth="1.4"/>
                <line x1="68" y1="62" x2="80" y2="62" stroke="#C4983A" strokeOpacity="0.5"/>
                <line x1="320" y1="62" x2="332" y2="62" stroke="#C4983A" strokeOpacity="0.5"/>
                <text x="200" y="60" fontFamily="'Cormorant Garamond',serif" fontSize="17" fill="#E8D5A8" textAnchor="middle" fontWeight="600" letterSpacing="4">VOTRE CONCEPT</text>

                {/* Architectural arch behind central podium */}
                <path d="M170 230 L170 130 Q200 100 230 130 L230 230 Z" fill="#0A0A0A" stroke="#C4983A" strokeOpacity="0.5" strokeWidth="1"/>
                <path d="M178 228 L178 134 Q200 110 222 134 L222 228" fill="none" stroke="#C4983A" strokeOpacity="0.18" strokeWidth="0.6"/>

                {/* Central podium with hero product */}
                <rect x="184" y="200" width="32" height="30" fill="#1A1A1A" stroke="#C4983A" strokeOpacity="0.55"/>
                <rect x="184" y="200" width="32" height="2" fill="#C4983A" opacity="0.5"/>
                <ellipse cx="200" cy="195" rx="11" ry="3" fill="#C4983A" opacity="0.18"/>
                <rect x="194" y="170" width="12" height="28" fill="url(#goldBox)" rx="1.5"/>
                <circle cx="200" cy="168" r="4" fill="#E8D5A8"/>

                {/* Left wall — backlit display niches with products */}
                <rect x="68" y="88" width="92" height="142" fill="#0A0A0A" stroke="#C4983A" strokeOpacity="0.35"/>
                {[0,1,2].map(row => (
                  <g key={`L-${row}`}>
                    <rect x="74" y={96 + row*46} width="80" height="38" fill="url(#window)" stroke="#C4983A" strokeOpacity="0.3"/>
                    <rect x="74" y={96 + row*46} width="80" height="2" fill="#C4983A" opacity="0.5"/>
                    {/* products on shelf */}
                    {[0,1,2,3].map(c => (
                      <rect key={`Lp-${row}-${c}`} x={80 + c*18} y={108 + row*46} width="11" height="22" rx="1.5"
                        fill={(row + c) % 2 === 0 ? '#C4983A' : '#E8D5A8'} opacity="0.85"/>
                    ))}
                  </g>
                ))}

                {/* Right wall — folded/draped textile display */}
                <rect x="240" y="88" width="92" height="142" fill="#0A0A0A" stroke="#C4983A" strokeOpacity="0.35"/>
                <rect x="246" y="96" width="80" height="56" fill="url(#window)" stroke="#C4983A" strokeOpacity="0.3"/>
                <rect x="246" y="96" width="80" height="2" fill="#C4983A" opacity="0.5"/>
                {/* hanging items */}
                {[0,1,2,3].map(i => (
                  <g key={`hang-${i}`}>
                    <rect x={252 + i*18} y="102" width="12" height="3" fill="#E8D5A8" opacity="0.7"/>
                    <polygon points={`${252+i*18},105 ${264+i*18},105 ${262+i*18},148 ${254+i*18},148`}
                      fill={i % 2 === 0 ? '#C4983A' : '#1A1A1A'}
                      stroke="#C4983A" strokeOpacity="0.5" strokeWidth="0.6"/>
                  </g>
                ))}
                {/* lower bench/folded display */}
                <rect x="246" y="160" width="80" height="68" fill="#0E0E0E" stroke="#C4983A" strokeOpacity="0.3"/>
                {[0,1,2].map(r => (
                  <g key={`fold-${r}`}>
                    {[0,1,2,3].map(c => (
                      <rect key={`f-${r}-${c}`} x={252 + c*18} y={170 + r*20} width="13" height="11"
                        fill={(r+c) % 3 === 0 ? '#C4983A' : '#E8D5A8'} opacity="0.7" rx="1"/>
                    ))}
                  </g>
                ))}

                {/* Floating accent — gold line / brand mark */}
                <line x1="100" y1="78" x2="140" y2="78" stroke="#C4983A" strokeWidth="0.8" opacity="0.7"/>
                <line x1="260" y1="78" x2="300" y2="78" stroke="#C4983A" strokeWidth="0.8" opacity="0.7"/>
                <circle cx="200" cy="86" r="2" fill="#C4983A"/>

                {/* Subtle floor reflection of central podium */}
                <ellipse cx="200" cy="248" rx="22" ry="3" fill="#C4983A" opacity="0.15"/>

                {/* Two minimalist silhouettes (visitors) — sense of scale */}
                <g opacity="0.6">
                  <circle cx="120" cy="232" r="3" fill="#2A2A2A"/>
                  <rect x="116" y="234" width="8" height="22" rx="2" fill="#1F1F1F"/>
                  <circle cx="288" cy="232" r="3" fill="#2A2A2A"/>
                  <rect x="284" y="234" width="8" height="22" rx="2" fill="#1F1F1F"/>
                </g>

                {/* OPEN status pill — animated */}
                <rect x="62" y="248" width="68" height="20" rx="10" fill="rgba(196,152,58,0.12)" stroke="#C4983A" strokeWidth="1">
                  <animate attributeName="stroke-opacity" values="0.4;1;0.4" dur="2.4s" repeatCount="indefinite"/>
                </rect>
                <circle cx="74" cy="258" r="3" fill="#C4983A">
                  <animate attributeName="opacity" values="0.4;1;0.4" dur="1.6s" repeatCount="indefinite"/>
                </circle>
                <text x="84" y="262" fontFamily="'DM Sans',sans-serif" fontSize="9" fill="#E8D5A8" fontWeight="700" letterSpacing="2">CONCEPT LIVE</text>

                {/* Concept name plate bottom right */}
                <rect x="270" y="248" width="68" height="20" rx="2" fill="none" stroke="#C4983A" strokeOpacity="0.55"/>
                <text x="304" y="262" fontFamily="'Cormorant Garamond',serif" fontStyle="italic" fontSize="11" fill="#E8D5A8" textAnchor="middle" letterSpacing="1.5">collection</text>
              </svg>

              <div style={{ position: 'absolute', left: 0, right: 0, bottom: 0, padding: '1.25rem 1.5rem', background: 'linear-gradient(180deg, transparent, rgba(0,0,0,0.85))', display: 'flex', alignItems: 'center', gap: '10px' }}>
                <Sparkles size={16} style={{ color: 'var(--gold)' }} />
                <span style={{ color: 'var(--cream)', fontSize: '0.85rem', fontWeight: 500, letterSpacing: '0.02em' }}>Cellule commerciale aménagée — concept clé en main</span>
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
  // Groupe 1 — Partenaires Conseil, Conception & Études techniques
  const conseilGroup = [
    { tag: 'Conception', icon: <Ruler size={22}/>, title: 'Architectes', description: "Partenaires de conception, permis de construire et plans d'exécution adaptés aux contextes locaux.", items: ['Concept & esquisse','APS / APD','Permis de construire','Plans d\'exécution'] },
    { tag: 'Pilotage chantier', icon: <HardHat size={22}/>, title: 'Conducteurs de Travaux', description: "Pilotage opérationnel des chantiers, coordination des corps d'état et tenue rigoureuse des plannings.", items: ['Planning & OPC','Coordination lots','Suivi budget','Réception travaux'] },
    { tag: 'Ingénierie', icon: <Wrench size={22}/>, title: 'Ingénieurs', description: "Ingénieurs maîtrisant les contraintes techniques, structurelles et climatiques de chaque projet.", items: ['Structure','Fluides','Électricité','Sécurité incendie'] },
    { tag: 'Coûts & métrés', icon: <Calculator size={22}/>, title: 'Économistes de la Construction', description: "Analyse des coûts, métrés et optimisation budgétaire au plus juste de la réalité du marché.", items: ['Métrés','Estimations','DCE','Optimisation budget'] },
    { tag: 'Études techniques', icon: <ClipboardList size={22}/>, title: "Bureaux d'Études (BET)", description: "Expertise technique multidisciplinaire pour des projets fiables, performants et conformes aux normes.", items: ['Structure','Thermique & CVC','Acoustique','Géotechnique'] },
    { tag: 'Développement', icon: <Landmark size={22}/>, title: 'Promoteurs', description: "Partenaires de développement immobilier pour des projets mixtes, résidentiels et commerciaux.", items: ['Commerces','Tertiaire','Résidentiel','Mixte'] },
    { tag: 'Experts sectoriels', icon: <Scale size={22}/>, title: 'Juridique, Banque & Assurance', description: "Avocats d'affaires, banques, assureurs et fiscalistes — pour sécuriser chaque dimension du projet.", items: ['Juridique','Banque','Assurance','Fiscalité'] },
  ]

  // Groupe 2 — Entreprises de Travaux & Aménagement (cellule commerciale)
  const travauxGroup = [
    { tag: 'Tous corps d\'état', icon: <Hammer size={22}/>, title: 'TCE — Entreprise Générale', description: "Entreprises générales tous corps d'état pour la livraison complète d'une cellule commerciale clé en main.", items: ['Gros œuvre','Second œuvre','Coordination','Livraison clés en main'] },
    { tag: 'Génie climatique', icon: <Wrench size={22}/>, title: 'CVC & Climatisation', description: "Chauffage, ventilation et climatisation : confort thermique optimisé pour clients et collaborateurs.", items: ['Climatisation','Ventilation','Chauffage','Désenfumage'] },
    { tag: 'Agencement', icon: <Hammer size={22}/>, title: 'Menuiserie & Agencement', description: "Mobilier sur mesure, vitrines, comptoirs, banques d'accueil et agencements spécifiques au concept.", items: ['Mobilier sur mesure','Vitrines','Comptoirs','Présentoirs'] },
    { tag: 'Finitions', icon: <Hammer size={22}/>, title: 'Peinture & Revêtements', description: "Peintures décoratives, papiers peints, revêtements muraux et finitions premium pour une atmosphère soignée.", items: ['Peinture','Revêtements muraux','Stucs','Finitions décoratives'] },
    { tag: 'Sols', icon: <Hammer size={22}/>, title: 'Sols & Carrelage', description: "Pose de carrelage, parquet, vinyle, résine et sols techniques adaptés à chaque univers commercial.", items: ['Carrelage','Parquet','Vinyle / LVT','Résine'] },
    { tag: 'Énergie & lumière', icon: <Wrench size={22}/>, title: 'Électricité & Éclairage scénographique', description: "Installation électrique, courants faibles et mise en lumière scénographique de la cellule commerciale.", items: ['Courants forts','Courants faibles','Éclairage LED','Mise en lumière'] },
    { tag: 'Sanitaires', icon: <Wrench size={22}/>, title: 'Plomberie & Sanitaires', description: "Plomberie, sanitaires, points d'eau et raccordements pour espaces accueil clientèle et back-office.", items: ['Plomberie','Sanitaires','Évacuations','Raccordements'] },
    { tag: 'Vitrages & façade', icon: <Hammer size={22}/>, title: 'Vitrerie & Façade', description: "Façades vitrées, vitrines, miroirs, cloisons verre et habillages de devanture pour une identité forte.", items: ['Façade vitrée','Vitrines','Miroirs','Cloisons verre'] },
    { tag: 'Métallerie', icon: <Hammer size={22}/>, title: 'Serrurerie & Métallerie', description: "Rideaux métalliques, grilles, serrurerie de sécurité et éléments métalliques décoratifs sur mesure.", items: ['Rideaux métalliques','Serrurerie','Grilles','Métallerie déco'] },
    { tag: 'Identité visuelle', icon: <Ruler size={22}/>, title: 'Signalétique & Enseignes', description: "Enseignes lumineuses, signalétique intérieure et extérieure, lettrage relief — incarnation de votre marque.", items: ['Enseigne lumineuse','Lettrage relief','Signalétique','Marquage vitrines'] },
  ]

  const renderCard = ({ tag, icon, title, description, items }: typeof conseilGroup[number], i: number) => (
    <Reveal key={title} delay={i * 50}>
      <div className="service-card" style={{ background: 'rgba(255,255,255,0.03)', border: '1px solid rgba(196,152,58,0.18)', borderRadius: '10px', padding: '2rem', display: 'flex', flexDirection: 'column', height: '100%' }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.25rem' }}>
          <div style={{ width: '44px', height: '44px', background: 'rgba(196,152,58,0.12)', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'var(--gold)' }}>{icon}</div>
          <div style={{ fontSize: '0.68rem', fontWeight: 700, letterSpacing: '0.14em', color: 'var(--gold)', textTransform: 'uppercase' }}>{tag}</div>
        </div>
        <h3 style={{ color: 'var(--cream)', fontSize: '1.1rem', fontWeight: 600, marginBottom: '0.75rem', lineHeight: 1.3 }}>{title}</h3>
        <p style={{ color: 'var(--slate-light)', fontSize: '0.88rem', lineHeight: 1.7, marginBottom: '1.25rem' }}>{description}</p>
        <ul style={{ listStyle: 'none', padding: 0, margin: 'auto 0 0', display: 'flex', flexWrap: 'wrap', gap: '0.4rem' }}>
          {items.map((it) => (
            <li key={it} style={{ fontSize: '0.72rem', padding: '0.25rem 0.7rem', borderRadius: '100px', background: 'rgba(196,152,58,0.08)', border: '1px solid rgba(196,152,58,0.2)', color: 'var(--gold-pale)', fontWeight: 500 }}>{it}</li>
          ))}
        </ul>
      </div>
    </Reveal>
  )

  const groupHeader = (eyebrow: string, title: string, subtitle: string) => (
    <Reveal>
      <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between', flexWrap: 'wrap', gap: '1.5rem', marginBottom: '2rem', paddingBottom: '1.25rem', borderBottom: '1px solid rgba(196,152,58,0.18)' }}>
        <div>
          <div className="tag" style={{ marginBottom: '0.85rem', color: 'var(--gold)' }}>{eyebrow}</div>
          <h3 className="font-display" style={{ fontSize: 'clamp(1.5rem, 2.6vw, 2.1rem)', fontWeight: 600, color: 'var(--cream)', lineHeight: 1.2, letterSpacing: '-0.01em', margin: 0 }}>
            {title}
          </h3>
        </div>
        <p style={{ color: 'rgba(255,255,255,0.6)', fontSize: '0.88rem', lineHeight: 1.7, maxWidth: '440px', margin: 0, fontWeight: 300 }}>
          {subtitle}
        </p>
      </div>
    </Reveal>
  )

  return (
    <section id="partenariat" style={{ background: 'var(--charcoal-mid)', padding: '7rem 2rem', position: 'relative', overflow: 'hidden' }}>
      <div className="geo-pattern" style={{ position: 'absolute', inset: 0, opacity: 0.35 }} />
      <div style={{ position: 'relative', zIndex: 1, maxWidth: '1280px', margin: '0 auto' }}>
        <Reveal>
          <div style={{ textAlign: 'center', marginBottom: '4.5rem' }}>
            <div className="tag" style={{ justifyContent: 'center', marginBottom: '1.25rem', color: 'var(--gold)' }}>Partenariat</div>
            <h2 className="font-display" style={{ fontSize: 'clamp(2rem, 4vw, 3.2rem)', fontWeight: 600, color: 'var(--cream)', letterSpacing: '-0.02em', lineHeight: 1.15, maxWidth: '780px', margin: '0 auto 1.25rem' }}>
              Un écosystème complet de<br /><span style={{ color: 'var(--gold)' }}>partenaires qualifiés</span>
            </h2>
            <p style={{ color: 'rgba(255,255,255,0.68)', maxWidth: '660px', margin: '0 auto', lineHeight: 1.7, fontSize: '0.95rem', fontWeight: 300 }}>
              Nawara Projects orchestre deux familles complémentaires de partenaires : d'un côté les <strong style={{ color: 'var(--gold-pale)' }}>experts conseil &amp; études</strong>, de l'autre les <strong style={{ color: 'var(--gold-pale)' }}>entreprises de travaux et d'aménagement</strong> — pour livrer chaque projet de A à Z.
            </p>
          </div>
        </Reveal>

        {/* GROUPE 1 — CONSEIL & ÉTUDES */}
        {groupHeader(
          'Groupe 1 — Conseil, conception & études',
          'Partenaires Conseil & Études',
          "Architectes, ingénieurs, bureaux d'études, économistes, conducteurs de travaux, promoteurs et experts sectoriels — la matière grise qui sécurise chaque décision."
        )}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem', marginBottom: '5rem' }}>
          {conseilGroup.map(renderCard)}
        </div>

        {/* GROUPE 2 — ENTREPRISES TRAVAUX */}
        {groupHeader(
          'Groupe 2 — Réalisation & aménagement',
          'Entreprises de Travaux & Aménagement',
          "Tous les corps d'état nécessaires à l'aménagement complet d'une cellule commerciale : du gros œuvre à la signalétique, en passant par CVC, agencement, peinture et éclairage scénographique."
        )}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))', gap: '1.5rem' }}>
          {travauxGroup.map(renderCard)}
        </div>

        <Reveal>
          <div style={{ marginTop: '3.5rem', padding: '1.5rem 2rem', background: 'rgba(196,152,58,0.06)', borderLeft: '3px solid var(--gold)', borderRadius: '0 8px 8px 0', display: 'flex', alignItems: 'center', gap: '16px', flexWrap: 'wrap' }}>
            <Network size={22} style={{ color: 'var(--gold)', flexShrink: 0 }} />
            <div style={{ color: 'var(--gold-pale)', fontSize: '0.9rem', lineHeight: 1.6 }}>
              <strong style={{ color: 'var(--cream)' }}>Vous êtes un partenaire ?</strong>{' '}
              Nous ouvrons régulièrement notre réseau à de nouveaux prestataires qualifiés — études techniques comme entreprises de travaux.{' '}
              <a href="#contact" style={{ color: 'var(--gold)', textDecoration: 'underline' }}>Nous contacter</a>
            </div>
          </div>
        </Reveal>
      </div>
    </section>
  )
}

/* ── ContactForm (EmailJS — compatible Hostinger) ── */
// CONFIGURATION EMAILJS
// 1. Créez un compte gratuit sur emailjs.com
// 2. Ajoutez un "Email Service" (Gmail, Outlook, etc.)
// 3. Créez un "Email Template" avec les variables :
//    {{from_name}}, {{from_email}}, {{phone}}, {{company}}, {{profile}},
//    {{subject}}, {{message}}, {{attachments_summary}}
//    + dans l'onglet "Attachments" du template, ajoutez les variables
//      {{attachment1}}, {{attachment2}}, {{attachment3}} (type "Variable Attachment")
// 4. Remplacez les 3 constantes ci-dessous par vos identifiants EmailJS
const EMAILJS_SERVICE_ID  = 'VOTRE_SERVICE_ID'   // ex: 'service_abc123'
const EMAILJS_TEMPLATE_ID = 'VOTRE_TEMPLATE_ID'  // ex: 'template_xyz456'
const EMAILJS_PUBLIC_KEY  = 'VOTRE_PUBLIC_KEY'   // ex: 'aBcDeFgHiJkLmNoP'

// Limites de pièces jointes (compatibles plan EmailJS gratuit / payant)
const MAX_FILES = 3
const MAX_FILE_SIZE = 2 * 1024 * 1024  // 2 Mo par fichier
const MAX_TOTAL_SIZE = 5 * 1024 * 1024 // 5 Mo total
const ACCEPTED_TYPES = '.pdf,.doc,.docx,.jpg,.jpeg,.png,.zip,.xls,.xlsx,.ppt,.pptx'

type FormState = { name: string; email: string; phone: string; company: string; profile: string; subject: string; message: string }

function formatBytes(bytes: number) {
  if (bytes < 1024) return `${bytes} o`
  if (bytes < 1024 * 1024) return `${(bytes / 1024).toFixed(1)} Ko`
  return `${(bytes / (1024 * 1024)).toFixed(2)} Mo`
}

function fileToBase64(file: File): Promise<string> {
  return new Promise((resolve, reject) => {
    const reader = new FileReader()
    reader.onload = () => resolve(reader.result as string)
    reader.onerror = () => reject(reader.error)
    reader.readAsDataURL(file)
  })
}

function ContactForm() {
  const [formData, setFormData] = useState<FormState>({ name: '', email: '', phone: '', company: '', profile: 'franchiseur', subject: 'consulting', message: '' })
  const [status, setStatus] = useState<'idle'|'submitting'|'success'|'error'>('idle')
  const [files, setFiles] = useState<File[]>([])
  const [fileError, setFileError] = useState<string | null>(null)
  const [dragActive, setDragActive] = useState(false)
  const fileInputRef = useRef<HTMLInputElement>(null)

  const inputStyle = { width: '100%', padding: '0.75rem 1rem', background: 'rgba(255,255,255,0.05)', border: '1px solid rgba(196,152,58,0.22)', borderRadius: '4px', color: 'var(--cream)', fontSize: '0.875rem', outline: 'none', transition: 'border-color 0.2s', boxSizing: 'border-box' as const, fontFamily: "'DM Sans', sans-serif" }
  const labelStyle = { display: 'block', fontSize: '0.72rem', letterSpacing: '0.08em', textTransform: 'uppercase' as const, color: 'var(--gold-pale)', marginBottom: '0.4rem', fontWeight: 600 }

  const addFiles = (incoming: FileList | File[]) => {
    setFileError(null)
    const incomingArr = Array.from(incoming)
    const merged = [...files]
    for (const f of incomingArr) {
      if (merged.length >= MAX_FILES) {
        setFileError(`Maximum ${MAX_FILES} fichiers autorisés.`)
        break
      }
      if (f.size > MAX_FILE_SIZE) {
        setFileError(`"${f.name}" dépasse ${formatBytes(MAX_FILE_SIZE)}.`)
        continue
      }
      // évite les doublons (nom + taille)
      if (merged.some(m => m.name === f.name && m.size === f.size)) continue
      merged.push(f)
    }
    const total = merged.reduce((s, f) => s + f.size, 0)
    if (total > MAX_TOTAL_SIZE) {
      setFileError(`Le total des pièces jointes dépasse ${formatBytes(MAX_TOTAL_SIZE)}.`)
      return
    }
    setFiles(merged)
  }

  const removeFile = (idx: number) => {
    setFiles(files.filter((_, i) => i !== idx))
    setFileError(null)
  }

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault(); e.stopPropagation()
    setDragActive(false)
    if (e.dataTransfer.files && e.dataTransfer.files.length) addFiles(e.dataTransfer.files)
  }

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    setStatus('submitting')
    try {
      // Chargement dynamique d'EmailJS (pas besoin de npm install)
      const emailjs = await import('@emailjs/browser')

      // Préparation des pièces jointes en base64 (data URLs)
      const attachmentVars: Record<string, string> = {}
      for (let i = 0; i < files.length && i < MAX_FILES; i++) {
        const dataUrl = await fileToBase64(files[i])
        attachmentVars[`attachment${i + 1}`] = dataUrl
        attachmentVars[`attachment${i + 1}_name`] = files[i].name
      }
      // Slots vides pour éviter les erreurs de template
      for (let i = files.length; i < MAX_FILES; i++) {
        attachmentVars[`attachment${i + 1}`] = ''
        attachmentVars[`attachment${i + 1}_name`] = ''
      }

      const attachmentsSummary = files.length
        ? files.map(f => `• ${f.name} (${formatBytes(f.size)})`).join('\n')
        : 'Aucune pièce jointe'

      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: formData.name,
          from_email: formData.email,
          phone: formData.phone || 'Non renseigné',
          company: formData.company || 'Non renseigné',
          profile: formData.profile,
          subject: formData.subject,
          message: formData.message,
          attachments_summary: attachmentsSummary,
          attachments_count: String(files.length),
          ...attachmentVars,
        },
        EMAILJS_PUBLIC_KEY
      )
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
      <p style={{ color: 'var(--slate-light)', fontSize: '0.875rem', lineHeight: 1.6, margin: 0 }}>
        Notre équipe revient vers vous sous 48 heures{files.length ? ` (${files.length} pièce${files.length > 1 ? 's' : ''} jointe${files.length > 1 ? 's' : ''} reçue${files.length > 1 ? 's' : ''})` : ''}.
      </p>
    </div>
  )

  const totalSize = files.reduce((s, f) => s + f.size, 0)

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
            <option value="franchiseur">Franchiseur</option>
            <option value="franchise">Franchisé</option>
            <option value="promoteur">Promoteur immobilier</option>
            <option value="fonds">Fonds d'investissement</option>
            <option value="enseigne">Enseigne / Retailer</option>
            <option value="autre">Autre</option>
          </select></div>
        <div><label style={labelStyle} htmlFor="subject">Nature du projet*</label>
          <select id="subject" name="subject" value={formData.subject} onChange={(e)=>setFormData({...formData,subject:e.target.value})} style={{...inputStyle,cursor:'pointer'}} onFocus={e=>{e.target.style.borderColor='var(--gold)'}} onBlur={e=>{e.target.style.borderColor='rgba(196,152,58,0.22)'}}>
            <option value="consulting">Développement de franchises</option>
            <option value="travaux">Travaux d'aménagement / maîtrise d'œuvre</option>
            <option value="mixte">Projet global (conseil + réalisation)</option>
            <option value="autre">Autre demande</option>
          </select></div>
      </div>
      <div><label style={labelStyle} htmlFor="message">Décrivez votre projet*</label>
        <textarea id="message" name="message" required rows={4} placeholder="Pays ciblés, calendrier, budget estimé, type de cellule, spécificités…" value={formData.message} onChange={(e)=>setFormData({...formData,message:e.target.value})} style={{...inputStyle,resize:'vertical'}} onFocus={e=>{e.target.style.borderColor='var(--gold)'}} onBlur={e=>{e.target.style.borderColor='rgba(196,152,58,0.22)'}}/>
      </div>

      {/* ── Pièces jointes ── */}
      <div>
        <label style={labelStyle}>
          Pièces jointes <span style={{ color: 'var(--slate-light)', fontWeight: 400, textTransform: 'none', letterSpacing: 0 }}>(optionnel — {MAX_FILES} max, {formatBytes(MAX_TOTAL_SIZE)} au total)</span>
        </label>
        <div
          className={`file-drop ${dragActive ? 'drag' : ''}`}
          onClick={() => fileInputRef.current?.click()}
          onDragOver={(e) => { e.preventDefault(); setDragActive(true) }}
          onDragLeave={() => setDragActive(false)}
          onDrop={handleDrop}
          role="button"
          tabIndex={0}
          onKeyDown={(e) => { if (e.key === 'Enter' || e.key === ' ') fileInputRef.current?.click() }}
        >
          <input
            ref={fileInputRef}
            type="file"
            multiple
            accept={ACCEPTED_TYPES}
            onChange={(e) => { if (e.target.files) addFiles(e.target.files); e.target.value = '' }}
            style={{ display: 'none' }}
          />
          <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', gap: '6px' }}>
            <Paperclip size={20} style={{ color: 'var(--gold)' }} />
            <div style={{ color: 'var(--cream)', fontSize: '0.88rem', fontWeight: 500 }}>
              Cliquez ou glissez vos fichiers ici
            </div>
            <div style={{ color: 'var(--slate-light)', fontSize: '0.75rem' }}>
              PDF, DOC, XLS, PPT, JPG, PNG, ZIP — {formatBytes(MAX_FILE_SIZE)} par fichier
            </div>
          </div>
        </div>

        {files.length > 0 && (
          <div style={{ marginTop: '0.75rem' }}>
            {files.map((f, i) => (
              <span key={`${f.name}-${i}`} className="file-chip">
                <FileText size={12} />
                <span style={{ maxWidth: '180px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>{f.name}</span>
                <span style={{ color: 'var(--slate-light)', fontSize: '0.7rem' }}>{formatBytes(f.size)}</span>
                <button type="button" onClick={() => removeFile(i)} aria-label={`Retirer ${f.name}`}>
                  <X size={12} />
                </button>
              </span>
            ))}
            <div style={{ marginTop: '0.5rem', fontSize: '0.72rem', color: 'var(--slate-light)' }}>
              Total : {formatBytes(totalSize)} / {formatBytes(MAX_TOTAL_SIZE)}
            </div>
          </div>
        )}

        {fileError && (
          <div style={{ marginTop: '0.6rem', display: 'flex', alignItems: 'center', gap: '6px', color: '#E57373', fontSize: '0.8rem' }}>
            <AlertCircle size={14} />
            <span>{fileError}</span>
          </div>
        )}
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
