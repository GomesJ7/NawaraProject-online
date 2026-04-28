# Nexora Partners

Site internet professionnel pour **Nexora Partners**, cabinet spécialisé dans le développement de franchises et la réalisation de projets immobiliers en Afrique de l'Ouest.

## À propos

Nexora Partners opère sur deux pôles d'activité complémentaires et indépendants :

- **Consulting (France)** — Développement de franchises en Afrique : qualification de franchisés, mise en relation avec les enseignes, accompagnement jusqu'à la signature.
- **Projets & Travaux (Afrique)** — Maîtrise d'œuvre, AMO, MOD, Contractant Général, Due diligence.

## Stack technologique

| Couche | Technologie |
|--------|-------------|
| Framework | TanStack Start |
| Frontend | React 19, TanStack Router v1 |
| Build | Vite 7 |
| Styling | Tailwind CSS 4 + CSS custom properties |
| Langage | TypeScript 5.7 (strict mode) |
| Déploiement | Netlify |

## Structure du projet

```
src/
├── routes/
│   ├── __root.tsx     # Layout racine (HTML, meta SEO)
│   ├── index.tsx      # Page d'accueil complète
│   └── faq.tsx        # Page FAQ par catégorie de service
└── styles.css         # Design system (fonts, CSS variables, animations)
```

## Lancement local

```bash
npm install
npm run dev
```

Le serveur démarre sur `http://localhost:3000`.

Avec le CLI Netlify (pour émuler les fonctionnalités Netlify) :

```bash
netlify dev
```

Le serveur démarre sur `http://localhost:8888`.

## Build production

```bash
npm run build
```

Les fichiers sont générés dans `dist/client/`.
