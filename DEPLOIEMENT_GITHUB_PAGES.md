# Déployer sur GitHub Pages — guide pas à pas

Le projet est configuré pour se déployer automatiquement sur GitHub Pages
à chaque push sur la branche `main`, grâce au workflow GitHub Actions
situé dans `.github/workflows/deploy.yml`.

## 1. Créer le dépôt sur GitHub

1. Va sur https://github.com/new
2. **Repository name** : ce que tu veux (ex. `nawara-projects`)
3. Choisis **Private** ou **Public** (Public requis pour GitHub Pages avec un compte gratuit ;
   Private possible avec un compte GitHub Pro/Team)
4. **Ne coche rien** (pas de README, pas de .gitignore, pas de licence)
5. Clique **Create repository**

## 2. Pousser le code

Ouvre un terminal dans le dossier `project_hostinger` :

```bash
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/TON-USERNAME/NOM-DU-REPO.git
git push -u origin main
```

## 3. Activer GitHub Pages

1. Sur GitHub, va dans **Settings** → **Pages** (menu de gauche)
2. Dans **Source**, choisis **GitHub Actions** (pas "Deploy from a branch")
3. C'est tout — pas besoin de configurer une branche

## 4. Première publication

Dès que tu as poussé sur `main`, va dans l'onglet **Actions** du dépôt :
- Tu verras le workflow **"Deploy site to GitHub Pages"** en cours
- Il prend ~1 à 2 minutes
- Une fois terminé, ton site est accessible sur :
  **`https://TON-USERNAME.github.io/NOM-DU-REPO/`**

L'URL exacte est aussi affichée dans Settings → Pages une fois publié.

## 5. Mettre à jour le site

Modifie ton code, puis :
```bash
git add .
git commit -m "Description du changement"
git push
```
Le workflow se relance automatiquement et le site est mis à jour 1 à 2 min plus tard.

---

## Particularités du déploiement GitHub Pages

### Routage en hash (`#/faq` au lieu de `/faq`)

GitHub Pages ne gère pas le routage côté serveur, donc le projet utilise du
**hash routing** (`createHashHistory()` dans `src/main.tsx`).
Concrètement les URLs ressemblent à :

- `https://ton-user.github.io/nom-du-repo/#/`
- `https://ton-user.github.io/nom-du-repo/#/faq`

C'est moche mais robuste — aucune redirection serveur nécessaire,
les deep-links fonctionnent toujours.

> Si tu déploies un jour sur **Vercel / Netlify / Hostinger / Cloudflare Pages**,
> remplace dans `src/main.tsx` :
> ```ts
> history: createHashHistory()
> ```
> par
> ```ts
> history: createBrowserHistory()
> ```
> et tu auras des URLs propres sans `#`.

### Configuration du formulaire EmailJS

Le formulaire de contact utilise EmailJS. Tu **dois** renseigner tes 3 clés
dans `src/routes/index.tsx` (~ligne 780) :

```ts
const EMAILJS_SERVICE_ID  = 'service_xxxxxx'
const EMAILJS_TEMPLATE_ID = 'template_xxxxxx'
const EMAILJS_PUBLIC_KEY  = 'xxxxxxxxxxxxxxxx'
```

⚠️ Comme ces clés seront visibles dans le code source du site (et dans le dépôt
si Public), va sur https://dashboard.emailjs.com/admin/account → onglet **Security**
et **active "Allowed Origins"** pour limiter l'usage à ton domaine GitHub Pages
uniquement (`https://ton-user.github.io`).

Voir `DEPLOIEMENT_HOSTINGER.md` pour la configuration détaillée du template EmailJS
(elle est identique sur GitHub Pages).

### Domaine personnalisé (optionnel)

Si tu as un domaine (ex. `nawara-projects.com`) :

1. Crée un fichier `public/CNAME` contenant juste ton domaine :
   ```
   nawara-projects.com
   ```
2. Dans la config DNS de ton domaine, ajoute un enregistrement pointant vers
   `ton-user.github.io.` (CNAME) ou les IPs de GitHub Pages (A records)
3. Settings → Pages → renseigne **Custom domain**
4. Une fois validé, tu peux **passer en `createBrowserHistory()`** dans `main.tsx`
   et **enlever le `BASE_PATH`** dans `vite.config.ts` (`base: '/'`),
   car le site est désormais à la racine du domaine.

---

## Test local du build de production

Pour tester localement comme si tu étais sur GitHub Pages :

```bash
BASE_PATH=/nom-du-repo/ npm run build
npm run preview
```
