# Guide d'utilisation Postman - API GSB

## Fichiers disponibles

- `GSB-API.postman_collection.json` : Collection complète des requêtes API
- `GSB-API.postman_environment.json` : Environnement de développement local

## Installation

### 1. Importer la collection dans Postman

1. Ouvrez Postman
2. Cliquez sur **Import** (en haut à gauche)
3. Sélectionnez le fichier `GSB-API.postman_collection.json`
4. La collection "GSB API REST" apparaîtra dans votre sidebar

### 2. Importer l'environnement

1. Cliquez sur **Import**
2. Sélectionnez le fichier `GSB-API.postman_environment.json`
3. Sélectionnez l'environnement "GSB API - Local" dans le menu déroulant (en haut à droite)

## Variables d'environnement

L'environnement contient les variables suivantes :

| Variable | Valeur par défaut | Description |
|----------|-------------------|-------------|
| `base_url` | `http://localhost:3000` | URL de base de l'API |
| `visiteur_id` | (vide) | ID d'un visiteur pour les tests |
| `praticien_id` | (vide) | ID d'un praticien pour les tests |
| `visite_id` | (vide) | ID d'une visite pour les tests |
| `motif_id` | (vide) | ID d'un motif pour les tests |

### Configuration des IDs

Après avoir créé des entités via les requêtes POST, copiez les IDs retournés dans les variables d'environnement correspondantes pour faciliter les tests des autres routes.

**Méthode rapide :**
1. Créez un visiteur avec la requête `POST /api/visiteurs`
2. Copiez l'`_id` retourné dans la réponse
3. Collez-le dans la variable `visiteur_id` de l'environnement
4. Répétez pour les autres entités

## Structure de la collection

### 1. Health Check
- `GET /` - Informations de l'API
- `GET /health` - État de santé de l'API

### 2. Visiteurs
- `GET /api/visiteurs` - Liste tous les visiteurs
- `GET /api/visiteurs/search` - Recherche par nom/prénom
- `GET /api/visiteurs/:id` - Détails d'un visiteur
- `POST /api/visiteurs` - Créer un visiteur
- `PUT /api/visiteurs/:id` - Modifier un visiteur
- `DELETE /api/visiteurs/:id` - Supprimer un visiteur

### 3. Portefeuille
- `POST /api/visiteurs/:visiteurId/portefeuille` - Ajouter un praticien au portefeuille
- `GET /api/visiteurs/:visiteurId/portefeuille` - Récupérer le portefeuille

### 4. Praticiens
- `GET /api/praticiens` - Liste tous les praticiens
- `GET /api/praticiens/search` - Recherche par nom/prénom
- `GET /api/praticiens/ville/:ville` - Praticiens par ville
- `GET /api/praticiens/:id` - Détails d'un praticien
- `POST /api/praticiens` - Créer un praticien
- `PUT /api/praticiens/:id` - Modifier un praticien
- `DELETE /api/praticiens/:id` - Supprimer un praticien

### 5. Visites
- `GET /api/visites` - Liste toutes les visites
- `GET /api/visites/stats` - Statistiques des visites
- `GET /api/visites/date-range` - Visites par période
- `GET /api/visites/visiteur/:visiteurId` - Visites d'un visiteur
- `GET /api/visites/praticien/:praticienId` - Visites d'un praticien
- `GET /api/visites/motif/:motifId` - Visites par motif
- `GET /api/visites/:id` - Détails d'une visite
- `POST /api/visites` - Créer une visite
- `PUT /api/visites/:id` - Modifier une visite
- `DELETE /api/visites/:id` - Supprimer une visite

### 6. Motifs
- `GET /api/motifs` - Liste tous les motifs
- `GET /api/motifs/search` - Recherche par libellé
- `GET /api/motifs/:id` - Détails d'un motif
- `POST /api/motifs` - Créer un motif
- `PUT /api/motifs/:id` - Modifier un motif
- `DELETE /api/motifs/:id` - Supprimer un motif

## Workflow de test recommandé

### 1. Vérifier que l'API fonctionne
```
1. GET / (Racine API)
2. GET /health
```

### 2. Créer les données de base
```
1. POST /api/motifs - Créer quelques motifs (ex: "Présentation produit", "Formation")
2. POST /api/praticiens - Créer des praticiens
3. POST /api/visiteurs - Créer des visiteurs
```

### 3. Tester le portefeuille
```
1. POST /api/visiteurs/:visiteurId/portefeuille - Ajouter un praticien
2. GET /api/visiteurs/:visiteurId/portefeuille - Vérifier le portefeuille
```

### 4. Créer et gérer des visites
```
1. POST /api/visites - Créer une visite
2. GET /api/visites - Vérifier la liste
3. GET /api/visites/visiteur/:visiteurId - Visites d'un visiteur
4. PUT /api/visites/:id - Modifier une visite
```

### 5. Tester les recherches et filtres
```
1. GET /api/visiteurs/search?nom=Dupont
2. GET /api/praticiens/ville/Paris
3. GET /api/visites/date-range?startDate=2024-01-01&endDate=2024-12-31
4. GET /api/visites/stats
```

## Exemples de données

### Visiteur
```json
{
  "nom": "Dupont",
  "prenom": "Jean",
  "tel": "0601020304",
  "email": "jean.dupont@example.com",
  "date_embauche": "2024-01-15"
}
```

### Praticien
```json
{
  "nom": "Martin",
  "prenom": "Sophie",
  "tel": "0612345678",
  "email": "sophie.martin@example.com",
  "rue": "15 avenue des Champs",
  "code_postal": "75008",
  "ville": "Paris"
}
```

### Visite
```json
{
  "date_visite": "2024-12-15T10:00:00.000Z",
  "commentaire": "Présentation des nouveaux produits",
  "visiteur": "ID_DU_VISITEUR",
  "praticien": "ID_DU_PRATICIEN",
  "motif": "ID_DU_MOTIF"
}
```

### Motif
```json
{
  "libelle": "Présentation produit"
}
```

### Ajout au portefeuille
```json
{
  "praticienId": "ID_DU_PRATICIEN"
}
```

## Notes importantes

1. **Routes non configurées** : Certaines routes (praticiens, visites, motifs) ne sont pas encore montées dans `server.ts`. Vous devrez les ajouter avant de pouvoir les tester.

2. **IDs MongoDB** : Tous les IDs sont au format ObjectId MongoDB (24 caractères hexadécimaux).

3. **Dates** : Utilisez le format ISO 8601 pour les dates (ex: `2024-12-15T10:00:00.000Z`).

4. **Validation** : L'API valide les données. Assurez-vous de respecter les formats requis (email valide, champs obligatoires, etc.).

## Dépannage

### Erreur de connexion
- Vérifiez que le serveur est démarré (`npm run dev`)
- Vérifiez que le port 3000 est disponible
- Vérifiez la variable `base_url` dans l'environnement

### Erreur 404 sur certaines routes
- Vérifiez que toutes les routes sont bien configurées dans `server.ts`
- Ajoutez les imports et utilisez les routes manquantes :
```typescript
import praticienRoutes from './routes/praticien.routes.js';
import visiteRoutes from './routes/visite.routes.js';
import motifRoutes from './routes/motif.routes.js';

// Dans initializeRoutes()
this.app.use('/api/praticiens', praticienRoutes);
this.app.use('/api/visites', visiteRoutes);
this.app.use('/api/motifs', motifRoutes);
```

### Erreur de base de données
- Vérifiez que MongoDB est démarré
- Vérifiez la chaîne de connexion dans le fichier `.env`
