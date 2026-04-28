import { createFileRoute, Link } from '@tanstack/react-router'
import { useState, useMemo } from 'react'
import { ChevronDown, ArrowLeft, Search } from 'lucide-react'

export const Route = createFileRoute('/faq')({
  component: FAQ,
})

const faqs = [
  {
    category: 'Général',
    emoji: '🏢',
    items: [
      {
        question: 'Comment se passe le premier contact avec Nawara Projects ?',
        answer: "La démarche est simple : vous nous présentez votre projet via notre formulaire de contact ou directement par email. L'un de nos consultants vous recontacte sous 48 heures ouvrées pour un premier échange de qualification. Si votre projet correspond à notre champ d'intervention, nous vous proposons un rendez-vous approfondi pour construire ensemble une proposition d'accompagnement sur mesure.",
      },
      {
        question: 'Nawara Projects travaille-t-il avec des entreprises basées hors de France ?',
        answer: "Absolument. Bien que notre siège soit à Paris, nous accompagnons des franchiseurs et investisseurs du monde entier souhaitant se développer en Afrique de l'Ouest. Notre équipe bilingue français/anglais facilite la communication et la gestion de projets internationaux.",
      },
      {
        question: 'Vos deux pôles d\'activité sont-ils indépendants ?',
        answer: "Oui, totalement. Notre pôle Conseil (développement de franchises, basé à Paris) et notre pôle Réalisation (travaux terrain en Afrique) opèrent de manière autonome. Un client peut faire appel à l'un sans l'autre. Cette indépendance garantit l'absence de conflit d'intérêts.",
      },
    ],
  },
  {
    category: 'Conseil — Développement de Franchises',
    emoji: '🤝',
    items: [
      {
        question: 'Comment Nawara Projects accompagne-t-il les franchiseurs internationaux ?',
        answer: "Nous couvrons l'intégralité du cycle de développement depuis Paris : analyse de marché africain, identification et qualification de franchisés potentiels, mise en relation avec les enseignes, coordination juridique et accompagnement jusqu'à la signature du contrat de franchise. Notre ancrage sur le continent nous permet de vous apporter des candidats réellement qualifiés et bancables.",
      },
      {
        question: 'Cette activité de conseil est-elle menée depuis la France ou depuis l\'Afrique ?',
        answer: "Le conseil, la conception stratégique et le développement de franchises sont pilotés depuis notre siège parisien. C'est l'unique activité que nous menons depuis la France. Nos bureaux régionaux en Afrique (Abidjan, Dakar) assurent le lien terrain pour les phases de prospection et de sélection de franchisés.",
      },
      {
        question: 'Quels marchés africains ciblez-vous ?',
        answer: "Nos équipes sont actives sur l'ensemble des marchés de l'Afrique de l'Ouest, avec une présence opérationnelle renforcée en Côte d'Ivoire, au Sénégal, au Mali et au Ghana. Nous adaptons notre approche aux spécificités de chaque marché — cadre réglementaire, pouvoir d'achat local, dynamiques concurrentielles.",
      },
      {
        question: 'Quels secteurs de franchise couvrez-vous ?',
        answer: "Nous travaillons avec des franchiseurs de tous secteurs : restauration, retail, services aux entreprises, enseignement, santé et bien-être, immobilier. Notre réseau de franchisés africains couvre un large spectre de profils investisseurs capables de répondre aux critères financiers et opérationnels des enseignes internationales.",
      },
    ],
  },
  {
    category: 'Réalisations — Projets en Afrique',
    emoji: '🏗️',
    items: [
      {
        question: 'Intervenez-vous sur des projets en France ?',
        answer: "Non. Notre activité de réalisation opérationnelle — MOE, AMO, MOD, travaux d'aménagement — est exclusivement menée sur le continent africain. Seule notre activité de conseil et conception est pilotée depuis Paris. Aucun chantier ni projet de construction n'est réalisé sur le territoire français.",
      },
      {
        question: 'Quelle est la différence entre MOE, AMO et MOD ?',
        answer: "La Maîtrise d'Œuvre (MOE) désigne la direction technique de la conception et de la réalisation sur site africain — nous coordonnons architectes locaux, bureaux d'études et entreprises. L'Assistance à Maîtrise d'Ouvrage (AMO) place Nawara Projects en conseil indépendant à vos côtés, sans substitution à votre autorité de décision. La Maîtrise d'Ouvrage Déléguée (MOD) implique une délégation formelle de votre pouvoir de maître d'ouvrage : nous agissons en votre nom directement sur le continent.",
      },
      {
        question: 'En quoi consiste la solution Contractant Général ?',
        answer: "Le contrat Contractant Général (clé en main) vous offre un interlocuteur unique pour l'ensemble du projet africain — de la conception à la livraison sur site. Nawara Projects assume la responsabilité globale avec nos partenaires locaux : coordination de tous les corps de métier, gestion des interfaces, respect des délais et du budget. La solution idéale pour les maîtres d'ouvrage souhaitant simplifier leur gestion de projet à distance.",
      },
      {
        question: 'Qu\'est-ce que la due diligence immobilière en Afrique ?',
        answer: "La due diligence est un audit approfondi réalisé avant l'acquisition ou la valorisation d'un actif immobilier en Afrique. Elle couvre les dimensions techniques (état du bâti, conformité aux normes locales), juridiques (titres de propriété, permis selon la législation locale) et financières (valorisation, potentiel de rentabilité). Une étape indispensable pour sécuriser tout investissement immobilier sur le continent.",
      },
      {
        question: 'Intervenez-vous sur des projets commerciaux et résidentiels ?',
        answer: "Oui, exclusivement sur le continent africain. Nawara Projects accompagne des projets tertiaires (bureaux, commerces, hôtellerie) et des projets résidentiels (logements, résidences) en Afrique de l'Ouest. Nous gérons également des projets d'infrastructures légères (entrepôts, plateformes logistiques) pour des opérateurs souhaitant s'implanter sur le continent.",
      },
    ],
  },
]

function FAQ() {
  const [search, setSearch] = useState('')
  const [activeCategory, setActiveCategory] = useState<string | null>(null)

  const filtered = useMemo(() => {
    const q = search.toLowerCase().trim()
    return faqs.map(section => ({
      ...section,
      items: section.items.filter(item =>
        !q || item.question.toLowerCase().includes(q) || item.answer.toLowerCase().includes(q)
      ),
    })).filter(section =>
      (!activeCategory || section.category === activeCategory) && section.items.length > 0
    )
  }, [search, activeCategory])

  const totalResults = filtered.reduce((acc, s) => acc + s.items.length, 0)

  return (
    <div style={{ background: 'var(--cream-light)', minHeight: '100vh' }}>
      {/* Header */}
      <div style={{ background: 'var(--charcoal)', padding: '5rem 2rem 4rem' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <Link to="/" style={{ display: 'inline-flex', alignItems: 'center', gap: '6px', color: 'var(--slate-light)', fontSize: '0.82rem', textDecoration: 'none', marginBottom: '2rem', transition: 'color 0.2s' }}
            onMouseEnter={e => { (e.currentTarget as HTMLElement).style.color = 'var(--gold)' }}
            onMouseLeave={e => { (e.currentTarget as HTMLElement).style.color = 'var(--slate-light)' }}>
            <ArrowLeft size={14} /> Retour à l'accueil
          </Link>
          <div className="tag" style={{ marginBottom: '1.25rem', color: 'var(--gold)' }}>Questions fréquentes</div>
          <h1 className="font-display" style={{ fontSize: 'clamp(2.2rem, 5vw, 3.5rem)', fontWeight: 600, color: 'var(--cream)', lineHeight: 1.1, letterSpacing: '-0.02em', marginBottom: '1rem' }}>
            Tout savoir sur<br /><span style={{ color: 'var(--gold)' }}>Nawara Projects</span>
          </h1>
          <p style={{ color: 'rgba(244,237,224,0.6)', fontSize: '0.95rem', lineHeight: 1.7, fontWeight: 300 }}>
            Retrouvez les réponses à vos questions sur nos deux pôles d'activité. Pour toute demande spécifique, n'hésitez pas à nous contacter directement.
          </p>

          {/* Search */}
          <div style={{ position: 'relative', marginTop: '2rem' }}>
            <Search size={16} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--gold)', pointerEvents: 'none' }} />
            <input
              type="text"
              placeholder="Rechercher une question..."
              value={search}
              onChange={e => setSearch(e.target.value)}
              style={{ width: '100%', padding: '0.85rem 1rem 0.85rem 2.75rem', background: 'rgba(255,255,255,0.06)', border: '1px solid rgba(196,152,58,0.25)', borderRadius: '6px', color: 'var(--cream)', fontSize: '0.9rem', outline: 'none', boxSizing: 'border-box', fontFamily: "'DM Sans', sans-serif", transition: 'border-color 0.2s' }}
              onFocus={e => { e.target.style.borderColor = 'var(--gold)' }}
              onBlur={e => { e.target.style.borderColor = 'rgba(196,152,58,0.25)' }}
            />
          </div>

          {/* Category filters */}
          <div style={{ display: 'flex', gap: '0.6rem', flexWrap: 'wrap', marginTop: '1.25rem' }}>
            <button
              onClick={() => setActiveCategory(null)}
              style={{ padding: '0.35rem 0.9rem', borderRadius: '100px', border: `1px solid ${!activeCategory ? 'var(--gold)' : 'rgba(196,152,58,0.3)'}`, background: !activeCategory ? 'var(--gold)' : 'transparent', color: !activeCategory ? 'var(--charcoal)' : 'var(--cream)', fontSize: '0.78rem', fontWeight: 600, cursor: 'pointer', transition: 'all 0.2s', fontFamily: "'DM Sans', sans-serif" }}
            >
              Toutes
            </button>
            {faqs.map(s => (
              <button key={s.category}
                onClick={() => setActiveCategory(activeCategory === s.category ? null : s.category)}
                style={{ padding: '0.35rem 0.9rem', borderRadius: '100px', border: `1px solid ${activeCategory === s.category ? 'var(--gold)' : 'rgba(196,152,58,0.3)'}`, background: activeCategory === s.category ? 'var(--gold)' : 'transparent', color: activeCategory === s.category ? 'var(--charcoal)' : 'var(--cream)', fontSize: '0.78rem', fontWeight: 500, cursor: 'pointer', transition: 'all 0.2s', fontFamily: "'DM Sans', sans-serif" }}
              >
                {s.emoji} {s.category}
              </button>
            ))}
          </div>
        </div>
      </div>

      {/* Content */}
      <div style={{ maxWidth: '800px', margin: '0 auto', padding: '4rem 2rem' }}>
        {search && (
          <p style={{ color: 'var(--slate)', fontSize: '0.875rem', marginBottom: '2rem' }}>
            {totalResults} résultat{totalResults !== 1 ? 's' : ''} pour « {search} »
          </p>
        )}

        {filtered.length === 0 && (
          <div style={{ textAlign: 'center', padding: '4rem 0', color: 'var(--slate)' }}>
            <div style={{ fontSize: '2.5rem', marginBottom: '1rem' }}>🔍</div>
            <p style={{ fontSize: '1rem' }}>Aucune question ne correspond à votre recherche.</p>
            <button onClick={() => { setSearch(''); setActiveCategory(null) }} style={{ marginTop: '1rem', padding: '0.6rem 1.4rem', background: 'var(--gold)', border: 'none', borderRadius: '4px', color: 'var(--charcoal)', fontWeight: 600, cursor: 'pointer', fontFamily: "'DM Sans', sans-serif" }}>Réinitialiser</button>
          </div>
        )}

        {filtered.map((section) => (
          <div key={section.category} style={{ marginBottom: '3.5rem' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '1.5rem', paddingBottom: '1rem', borderBottom: '1px solid rgba(17,19,24,0.1)' }}>
              <span style={{ fontSize: '1.1rem' }}>{section.emoji}</span>
              <div style={{ width: '3px', height: '20px', background: 'var(--gold)', borderRadius: '2px' }} />
              <h2 style={{ fontSize: '0.85rem', fontWeight: 600, letterSpacing: '0.08em', textTransform: 'uppercase', color: 'var(--charcoal)', margin: 0 }}>{section.category}</h2>
              <span style={{ marginLeft: 'auto', fontSize: '0.72rem', color: 'var(--slate)', background: 'rgba(0,0,0,0.06)', padding: '0.2rem 0.6rem', borderRadius: '100px' }}>{section.items.length}</span>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {section.items.map((faq, i) => (
                <Accordion key={i} question={faq.question} answer={faq.answer} highlight={search} />
              ))}
            </div>
          </div>
        ))}

        {/* CTA */}
        <div style={{ background: 'var(--charcoal)', borderRadius: '8px', padding: '3rem', textAlign: 'center', marginTop: '4rem' }}>
          <h3 className="font-display" style={{ color: 'var(--cream)', fontSize: '1.8rem', fontWeight: 600, marginBottom: '0.75rem' }}>Vous n'avez pas trouvé votre réponse ?</h3>
          <p style={{ color: 'var(--slate-light)', fontSize: '0.9rem', lineHeight: 1.6, marginBottom: '2rem' }}>Notre équipe est disponible pour répondre à toutes vos questions.</p>
          <Link to="/" style={{ display: 'inline-block', padding: '0.85rem 2rem', background: 'var(--gold)', color: 'var(--charcoal)', borderRadius: '4px', fontWeight: 600, fontSize: '0.875rem', textDecoration: 'none' }}>Nous contacter</Link>
        </div>
      </div>
    </div>
  )
}

function Accordion({ question, answer, highlight }: { question: string; answer: string; highlight?: string }) {
  const [open, setOpen] = useState(false)

  const highlightText = (text: string, query: string) => {
    if (!query.trim()) return text
    const regex = new RegExp(`(${query.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})`, 'gi')
    return text.replace(regex, '<mark style="background:rgba(196,152,58,0.3);color:inherit;border-radius:2px;padding:0 2px">$1</mark>')
  }

  return (
    <div style={{ border: `1px solid ${open ? 'rgba(196,152,58,0.3)' : 'rgba(17,19,24,0.08)'}`, borderRadius: '6px', overflow: 'hidden', background: 'white', transition: 'border-color 0.25s ease, box-shadow 0.25s ease', boxShadow: open ? '0 4px 20px rgba(196,152,58,0.08)' : 'none' }}>
      <button onClick={() => setOpen(!open)} style={{ width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '1.25rem 1.5rem', textAlign: 'left', background: 'none', border: 'none', cursor: 'pointer', gap: '1rem' }}>
        <span style={{ fontWeight: 500, fontSize: '0.95rem', color: 'var(--charcoal)', lineHeight: 1.4 }}
          dangerouslySetInnerHTML={{ __html: highlightText(question, highlight || '') }} />
        <ChevronDown size={18} style={{ flexShrink: 0, color: 'var(--gold)', transition: 'transform 0.3s ease', transform: open ? 'rotate(180deg)' : 'none' }} />
      </button>
      {open && (
        <div style={{ padding: '0 1.5rem 1.5rem', color: 'var(--slate)', fontSize: '0.9rem', lineHeight: 1.75, borderTop: '1px solid rgba(17,19,24,0.06)', paddingTop: '1.25rem' }}
          dangerouslySetInnerHTML={{ __html: highlightText(answer, highlight || '') }} />
      )}
    </div>
  )
}
