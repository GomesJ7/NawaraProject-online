# Déploiement sur Hostinger — Guide pas à pas

## Prérequis
- Un compte Hostinger avec un plan **Business** ou **Cloud** (support Node.js requis)
- Node.js 20+ installé sur votre machine
- Votre domaine acheté chez Hostinger

---

## Étape 1 — Configurer EmailJS (formulaire de contact)

1. Créez un compte gratuit sur **emailjs.com**
2. Dans "Email Services" → ajoutez votre boîte mail Hostinger (SMTP)
   - Host SMTP Hostinger : `smtp.hostinger.com`
   - Port : `465` (SSL)
   - User : votre email (ex: contact@nexorapartners.com)
   - Password : mot de passe de votre boîte mail
3. Dans "Email Templates" → créez un template avec ce contenu :
   ```
   De : {{from_name}} ({{from_email}})
   Téléphone : {{phone}}
   Société : {{company}}
   Profil : {{profile}}
   Nature du projet : {{subject}}

   Message :
   {{message}}

   ─────────────────────────
   Pièces jointes ({{attachments_count}}) :
   {{attachments_summary}}
   ```
   **Pour activer les pièces jointes** : dans l'onglet "Attachments" du template, ajoutez 3 attachments
   de type **"Variable Attachment"** avec les paramètres :
   - `{{attachment1}}` (nom : `{{attachment1_name}}`)
   - `{{attachment2}}` (nom : `{{attachment2_name}}`)
   - `{{attachment3}}` (nom : `{{attachment3_name}}`)
4. Ouvrez `src/routes/index.tsx` et remplacez les 3 lignes en haut de ContactForm :
   ```
   const EMAILJS_SERVICE_ID  = 'VOTRE_SERVICE_ID'
   const EMAILJS_TEMPLATE_ID = 'VOTRE_TEMPLATE_ID'
   const EMAILJS_PUBLIC_KEY  = 'VOTRE_PUBLIC_KEY'
   ```

> ℹ️ **Note pièces jointes** : EmailJS plan gratuit permet **jusqu'à 50 Ko / email** au total.
> Pour des fichiers plus lourds (max 2 Mo/fichier configuré dans le code), passez sur le plan EmailJS payant
> ou ajustez `MAX_FILE_SIZE` / `MAX_TOTAL_SIZE` dans `src/routes/index.tsx`.

---

## Étape 2 — Builder le projet

```bash
npm install
npm run build
```

Le dossier `.output/` est généré — c'est ce que vous allez uploader.

---

## Étape 3 — Déployer sur Hostinger

### Option A — Via le panneau Hostinger (recommandée)

1. Connectez-vous à hPanel (panel.hostinger.com)
2. Allez dans **Hébergement → Gérer → Node.js**
3. Cliquez **Create Application** :
   - Node.js version : **20**
   - Application startup file : `.output/server/index.mjs`
4. Dans **File Manager** ou via FTP, uploadez tous les fichiers du dossier `.output/`
5. Cliquez **Restart** dans Node.js

### Option B — Via SSH (avancé)

```bash
# Connexion SSH (identifiants dans hPanel → SSH Access)
ssh u123456789@votre-domaine.com

# Uploadez le .output via SFTP, puis :
cd public_html
node .output/server/index.mjs
```

---

## Étape 4 — Configurer le domaine

Dans hPanel → **Domaines → Gérer** :
- Pointez votre domaine vers le dossier racine de votre hébergement
- Le SSL est activé automatiquement par Hostinger (Let's Encrypt)

---

## Étape 5 — Créer vos boîtes email

Dans hPanel → **Email → Gérer les comptes** :
- `contact@nexorapartners.com`
- `devis@nexorapartners.com`

Accessible via Webmail Hostinger ou configurez IMAP sur Outlook/Gmail.

---

## Coût total estimé

| Service | Prix |
|---------|------|
| Hostinger Business (domaine + hébergement Node.js + email) | ~3–8€/mois |
| EmailJS (plan gratuit, 200 emails/mois) | 0€ |
| **Total** | **~3–8€/mois** |

