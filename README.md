# GSB API REST – Express.js / TypeScript / MongoDB

API REST pour l'application mobile GSB (Galaxy Swiss Bourdin), développée en **TypeScript** avec **Express.js** et **MongoDB Atlas**.

## Stack technique

| Couche | Technologie |
|---|---|
| Runtime | Node.js 24 |
| Langage | TypeScript 5 |
| Framework | Express.js 5 |
| Base de données | MongoDB Atlas (Mongoose 9) |
| Authentification | JWT (jsonwebtoken) + bcrypt |
| Sécurité | Helmet, express-rate-limit, CORS |
| Validation | express-validator |
| Tests | Jest + ts-jest |
| CI/CD | GitHub Actions → AWS Elastic Beanstalk |

---

## Architecture du projet

```
src/
├── config/
│   └── database.ts          # Connexion MongoDB (pattern Singleton)
├── controllers/             # Gestion des requêtes HTTP et réponses
│   ├── visiteur.controller.ts
│   ├── praticien.controller.ts
│   ├── visite.controller.ts
│   ├── motif.controller.ts
│   └── portefeuille.controller.ts
├── middleware/
│   ├── auth.ts              # Vérification du token JWT
│   ├── helmet.middleware.ts # En-têtes de sécurité HTTP
│   ├── rateLimiter.middleware.ts
│   └── validate.middleware.ts
├── models/                  # Schémas Mongoose
│   ├── Visiteur.ts
│   ├── Praticien.ts
│   ├── Visite.ts
│   ├── Motif.ts
│   └── Portefeuille.ts
├── routes/                  # Déclaration des routes Express
│   ├── auth.routes.ts
│   ├── visiteur.routes.ts
│   ├── praticien.routes.ts
│   ├── visite.routes.ts
│   ├── motif.routes.ts
│   └── portefeuille.routes.ts
├── services/                # Logique métier
│   ├── visiteur.service.ts
│   ├── praticien.service.ts
│   ├── visite.service.ts
│   ├── motif.service.ts
│   └── portefeuille.service.ts
├── types/
│   └── authenticatedRequest.ts
├── validators/              # Règles de validation des entrées
│   ├── visiteur.validator.ts
│   ├── praticien.validator.ts
│   ├── visite.validator.ts
│   ├── motif.validator.ts
│   └── portefeuille.validator.ts
├── __tests__/               # Tests unitaires Jest
│   ├── visiteur.service.test.ts
│   ├── praticien.service.test.ts
│   ├── visite.service.test.ts
│   ├── motif.service.test.ts
│   └── portefeuille.service.test.ts
└── server.ts                # Point d'entrée – classe App
```

---

## Schéma des modèles de données

```
Visiteur
├── nom, prenom, tel, email (unique)
├── password (hashé bcrypt)
├── date_embauche
└── portefeuillePraticiens → [ref: Praticien]

Praticien
├── nom, prenom, tel, email (unique)
├── rue, code_postal, ville
└── virtual: visites → [ref: Visite]

Visite
├── date_visite
├── commentaire
├── visiteur  → ref: Visiteur
├── praticien → ref: Praticien
└── motif     → ref: Motif

Motif
└── libelle (unique)

Portefeuille
├── visiteur  → ref: Visiteur
├── praticien → ref: Praticien
├── date_ajout
├── actif (boolean)
└── notes
```

---

## Endpoints de l'API

Toutes les routes (sauf auth) requièrent un token JWT dans le header :
```
Authorization: Bearer <token>
```

### Authentification – `/api/auth`

| Méthode | Route | Description | Auth |
|---|---|---|---|
| POST | `/api/auth/signup` | Inscription d'un visiteur | Non |
| POST | `/api/auth/login` | Connexion et récupération du token | Non |

**Exemple signup :**
```json
POST /api/auth/signup
{
  "nom": "Dupont",
  "prenom": "Jean",
  "tel": "0601020304",
  "email": "jean.dupont@gsb.fr",
  "password": "motdepasse123",
  "date_embauche": "2020-01-15"
}
```

**Réponse (201) :**
```json
{
  "message": "Compte créé avec succès",
  "token": "<jwt>",
  "visiteur": { "id": "...", "nom": "Dupont", "prenom": "Jean", "email": "jean.dupont@gsb.fr" }
}
```

---

### Visiteurs – `/api/visiteurs`

| Méthode | Route | Description |
|---|---|---|
| GET | `/api/visiteurs` | Liste tous les visiteurs |
| GET | `/api/visiteurs/search?q=` | Recherche par nom/prénom/email |
| GET | `/api/visiteurs/:id` | Récupère un visiteur par ID |
| POST | `/api/visiteurs` | Crée un visiteur |
| PUT | `/api/visiteurs/:id` | Met à jour un visiteur |
| DELETE | `/api/visiteurs/:id` | Supprime un visiteur |
| GET | `/api/visiteurs/:id/portefeuille` | Portefeuille de praticiens du visiteur |

---

### Praticiens – `/api/praticiens`

| Méthode | Route | Description |
|---|---|---|
| GET | `/api/praticiens` | Liste tous les praticiens |
| GET | `/api/praticiens/:id` | Récupère un praticien par ID |
| POST | `/api/praticiens` | Crée un praticien |
| PUT | `/api/praticiens/:id` | Met à jour un praticien |
| DELETE | `/api/praticiens/:id` | Supprime un praticien |

---

### Visites – `/api/visites`

| Méthode | Route | Description |
|---|---|---|
| GET | `/api/visites` | Liste toutes les visites |
| GET | `/api/visites/stats` | Statistiques des visites |
| GET | `/api/visites/date-range` | Visites sur une période |
| GET | `/api/visites/visiteur/:id` | Visites d'un visiteur |
| GET | `/api/visites/praticien/:id` | Visites chez un praticien |
| GET | `/api/visites/motif/:id` | Visites par motif |
| GET | `/api/visites/:id` | Récupère une visite par ID |
| POST | `/api/visites` | Crée une visite |
| PUT | `/api/visites/:id` | Met à jour une visite |
| DELETE | `/api/visites/:id` | Supprime une visite |

---

### Motifs – `/api/motifs`

| Méthode | Route | Description |
|---|---|---|
| GET | `/api/motifs` | Liste tous les motifs |
| GET | `/api/motifs/:id` | Récupère un motif par ID |
| POST | `/api/motifs` | Crée un motif |
| PUT | `/api/motifs/:id` | Met à jour un motif |
| DELETE | `/api/motifs/:id` | Supprime un motif |

---

### Portefeuille – `/api/portefeuille`

| Méthode | Route | Description |
|---|---|---|
| GET | `/api/portefeuille` | Liste toutes les entrées |
| GET | `/api/portefeuille/:id` | Récupère une entrée par ID |
| POST | `/api/portefeuille` | Associe un praticien à un visiteur |
| PUT | `/api/portefeuille/:id` | Met à jour une entrée |
| DELETE | `/api/portefeuille/:id` | Supprime une entrée |

---

### Santé – utilitaires

| Route | Description |
|---|---|
| `GET /` | Infos API (version, endpoints) |
| `GET /health` | Statut du serveur et uptime |

---

## Sécurité

### Authentification JWT
- Token signé avec l'algorithme **HS256**, durée de vie **24h**
- Payload : `{ userId, role: 'visiteur' }`
- Middleware `authMiddleware` appliqué sur toutes les routes protégées

### Hachage des mots de passe
- bcrypt avec un coût de **10 rounds**
- Déclenché automatiquement par un hook Mongoose `pre('save')`

### En-têtes HTTP – Helmet
- Content-Security-Policy, X-Frame-Options, HSTS, X-Content-Type-Options, Referrer-Policy, etc.

### Rate Limiting
| Limiter | Routes | Limite |
|---|---|---|
| `authLimiter` | `/api/auth/*` | 50 req / 15 min / IP |
| `apiLimiter` | Toutes les routes protégées | 100 req / 15 min / IP |

### Validation des entrées
- `express-validator` sur chaque route (body + params)
- Exemples : format email, regex téléphone français, format date ISO8601, longueurs min/max, ObjectId MongoDB valide

---

## Installation et démarrage

### Prérequis
- Node.js ≥ 22
- Un cluster MongoDB Atlas

### Configuration
Créez un fichier `.env` à la racine :

```env
PORT=3000
NODE_ENV=development
DB_USERNAME=<votre_utilisateur_mongo>
DB_PASSWORD=<votre_mot_de_passe_mongo>
DB_NAME=GSB-API-Rest-ExpressJS
JWT_SECRET=<votre_secret_jwt>
```

### Commandes

```bash
# Installer les dépendances
npm install

# Démarrer en développement (hot-reload via tsx)
npm run dev

# Compiler le TypeScript
npm run build

# Démarrer en production (depuis dist/)
npm start

# Lancer les tests
npm test
```

---

## Tests unitaires

Les tests couvrent la couche **Service** (logique métier) avec des mocks Jest sur les modèles Mongoose.

```bash
npm test
```

Fichiers de tests :

| Fichier | Ce qui est testé |
|---|---|
| `visiteur.service.test.ts` | create, isJunior, addPraticienToPortefeuille, getPortefeuillePraticiens |
| `praticien.service.test.ts` | create, getAll, getById, update, delete |
| `visite.service.test.ts` | create, getAll, getById, getByVisiteur, getByPeriod, update, delete |
| `motif.service.test.ts` | create, getAll, getById, update, delete |
| `portefeuille.service.test.ts` | create, getByVisiteur, update, delete |

---

## CI/CD – GitHub Actions → AWS Elastic Beanstalk

Le pipeline `.github/workflows/deploy.yml` se déclenche sur chaque push sur `main` :

```
push main
    │
    ▼
[Job 1] Tests unitaires (npm test)
    │  succès requis
    ▼
[Job 2] Build & Deploy
    ├── npm run build  (compile TypeScript → dist/)
    ├── npm ci --omit=dev
    ├── Création du zip (dist/ + node_modules/ + Procfile + .ebextensions/)
    └── Déploiement via einaregilsson/beanstalk-deploy@v22
```

**Secrets GitHub requis :**
- `AWS_ACCESS_KEY_ID`
- `AWS_SECRET_ACCESS_KEY`
- `AWS_REGION`
- `EB_APPLICATION_NAME`
- `EB_ENVIRONMENT_NAME`

**Variables d'environnement AWS EB** (à définir dans la console AWS) :
- `MONGODB_URI`
- `JWT_SECRET`
- `JWT_EXPIRES_IN`

---

## Données d'exemple

Le dossier `data-examples/` contient des jeux de données prêts à l'emploi :

- `motifs.json` – 8 motifs de visite
- `praticiens.json` – 10 praticiens répartis en France
- `visiteurs.json` – 10 visiteurs GSB
- `visites.json` – 10 exemples de visites
- `portefeuille.json` – Exemples d'associations

Ordre d'insertion recommandé : **motifs → praticiens → visiteurs → portefeuille → visites**

---

## Auteur

**Merveille MAKOSI**
