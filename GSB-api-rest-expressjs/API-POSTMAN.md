# API GSB - Documentation Postman

Documentation complète des endpoints de l'API GSB pour tester avec Postman.

**Base URL:** `http://localhost:3000`

## Table des matières
- [Routes de base](#routes-de-base)
- [Visiteurs](#visiteurs)
- [Visites](#visites)
- [Praticiens](#praticiens)
- [Motifs](#motifs)

---

## Routes de base

### Informations API
```
GET http://localhost:3000/
```

### Health Check
```
GET http://localhost:3000/health
```

---

## Visiteurs

### 1. Récupérer tous les visiteurs
```
GET http://localhost:3000/api/visiteurs
```

**Réponse:**
```json
{
  "success": true,
  "count": 2,
  "data": [...]
}
```

---

### 2. Récupérer un visiteur par ID
```
GET http://localhost:3000/api/visiteurs/:id
```

**Exemple:**
```
GET http://localhost:3000/api/visiteurs/507f1f77bcf86cd799439011
```

---

### 3. Rechercher des visiteurs
Recherche par nom, prénom ou email.

```
GET http://localhost:3000/api/visiteurs/search?q=dupont
```

**Paramètres:**
- `q` (query string) : terme de recherche

**Exemples:**
```
GET http://localhost:3000/api/visiteurs/search?q=jean
GET http://localhost:3000/api/visiteurs/search?q=dupont@example.com
```

---

### 4. Récupérer les visiteurs par nom
Recherche tous les visiteurs avec un nom spécifique (recherche insensible à la casse).

```
GET http://localhost:3000/api/visiteurs/nom/:nom
```

**Exemples:**
```
GET http://localhost:3000/api/visiteurs/nom/Dupont
GET http://localhost:3000/api/visiteurs/nom/martin
```

---

### 5. Récupérer un visiteur par email
Recherche un visiteur unique par son email.

```
GET http://localhost:3000/api/visiteurs/email/:email
```

**Exemples:**
```
GET http://localhost:3000/api/visiteurs/email/jean.dupont@example.com
GET http://localhost:3000/api/visiteurs/email/marie.martin@gsb.fr
```

---

### 6. Récupérer les visiteurs par téléphone
Recherche les visiteurs par numéro de téléphone (recherche partielle).

```
GET http://localhost:3000/api/visiteurs/tel/:tel
```

**Exemples:**
```
GET http://localhost:3000/api/visiteurs/tel/0612345678
GET http://localhost:3000/api/visiteurs/tel/06123
```

---

### 7. Récupérer les visiteurs par année d'embauche
Récupère tous les visiteurs embauchés une année donnée.

```
GET http://localhost:3000/api/visiteurs/annee/:year
```

**Exemples:**
```
GET http://localhost:3000/api/visiteurs/annee/2024
GET http://localhost:3000/api/visiteurs/annee/2023
GET http://localhost:3000/api/visiteurs/annee/2022
```

---

### 8. Créer un nouveau visiteur
```
POST http://localhost:3000/api/visiteurs
Content-Type: application/json

{
  "nom": "Dupont",
  "prenom": "Jean",
  "tel": "0612345678",
  "email": "jean.dupont@example.com",
  "date_embauche": "2024-01-15"
}
```

**Champs requis:**
- `nom` (string)
- `prenom` (string)
- `tel` (string)
- `email` (string, unique)
- `date_embauche` (date ISO 8601)

---

### 9. Mettre à jour un visiteur
```
PUT http://localhost:3000/api/visiteurs/:id
Content-Type: application/json

{
  "nom": "Dupont",
  "prenom": "Jean",
  "tel": "0612345678",
  "email": "jean.dupont@example.com",
  "date_embauche": "2024-01-15"
}
```

**Exemple:**
```
PUT http://localhost:3000/api/visiteurs/507f1f77bcf86cd799439011
```

---

### 10. Supprimer un visiteur
```
DELETE http://localhost:3000/api/visiteurs/:id
```

**Exemple:**
```
DELETE http://localhost:3000/api/visiteurs/507f1f77bcf86cd799439011
```

---

## Visites

### 1. Récupérer toutes les visites
```
GET http://localhost:3000/api/visites
```

**Réponse:**
Les visites sont triées par date décroissante et incluent les informations du visiteur, praticien et motif.

---

### 2. Récupérer une visite par ID
```
GET http://localhost:3000/api/visites/:id
```

**Exemple:**
```
GET http://localhost:3000/api/visites/507f1f77bcf86cd799439011
```

---

### 3. Récupérer les visites d'un visiteur
```
GET http://localhost:3000/api/visites/visiteur/:visiteurId
```

**Exemple:**
```
GET http://localhost:3000/api/visites/visiteur/507f1f77bcf86cd799439011
```

**Réponse:**
Toutes les visites effectuées par un visiteur spécifique.

---

### 4. Récupérer les visites d'un praticien
```
GET http://localhost:3000/api/visites/praticien/:praticienId
```

**Exemple:**
```
GET http://localhost:3000/api/visites/praticien/507f1f77bcf86cd799439011
```

**Réponse:**
Toutes les visites reçues par un praticien spécifique.

---

### 5. Récupérer les visites par motif
```
GET http://localhost:3000/api/visites/motif/:motifId
```

**Exemple:**
```
GET http://localhost:3000/api/visites/motif/507f1f77bcf86cd799439011
```

**Réponse:**
Toutes les visites avec un motif spécifique.

---

### 6. Récupérer les visites par période
```
GET http://localhost:3000/api/visites/date-range?startDate=2024-01-01&endDate=2024-12-31
```

**Paramètres (query string):**
- `startDate` (date ISO 8601) : date de début
- `endDate` (date ISO 8601) : date de fin

**Exemples:**
```
GET http://localhost:3000/api/visites/date-range?startDate=2024-01-01&endDate=2024-01-31
GET http://localhost:3000/api/visites/date-range?startDate=2024-06-01&endDate=2024-06-30
```

---

### 7. Récupérer les statistiques des visites
```
GET http://localhost:3000/api/visites/stats
```

**Réponse:**
```json
{
  "success": true,
  "data": {
    "totalVisites": 150,
    "visitesParMotif": [...],
    "visitesParMois": [...]
  }
}
```

---

### 8. Créer une nouvelle visite
```
POST http://localhost:3000/api/visites
Content-Type: application/json

{
  "date_visite": "2024-03-15T14:30:00.000Z",
  "commentaire": "Présentation des nouveaux produits",
  "visiteur": "507f1f77bcf86cd799439011",
  "praticien": "507f1f77bcf86cd799439012",
  "motif": "507f1f77bcf86cd799439013"
}
```

**Champs requis:**
- `date_visite` (date ISO 8601)
- `visiteur` (ObjectId du visiteur)
- `praticien` (ObjectId du praticien)
- `motif` (ObjectId du motif)

**Champs optionnels:**
- `commentaire` (string)

---

### 9. Mettre à jour une visite
```
PUT http://localhost:3000/api/visites/:id
Content-Type: application/json

{
  "date_visite": "2024-03-15T14:30:00.000Z",
  "commentaire": "Présentation mise à jour",
  "visiteur": "507f1f77bcf86cd799439011",
  "praticien": "507f1f77bcf86cd799439012",
  "motif": "507f1f77bcf86cd799439013"
}
```

**Exemple:**
```
PUT http://localhost:3000/api/visites/507f1f77bcf86cd799439011
```

---

### 10. Supprimer une visite
```
DELETE http://localhost:3000/api/visites/:id
```

**Exemple:**
```
DELETE http://localhost:3000/api/visites/507f1f77bcf86cd799439011
```

---

## Praticiens

### 1. Récupérer tous les praticiens
```
GET http://localhost:3000/api/praticiens
```

---

### 2. Récupérer un praticien par ID
```
GET http://localhost:3000/api/praticiens/:id
```

**Exemple:**
```
GET http://localhost:3000/api/praticiens/507f1f77bcf86cd799439011
```

---

### 3. Rechercher des praticiens
Recherche par nom, prénom, email ou ville.

```
GET http://localhost:3000/api/praticiens/search?q=martin
```

**Paramètres:**
- `q` (query string) : terme de recherche

**Exemples:**
```
GET http://localhost:3000/api/praticiens/search?q=paris
GET http://localhost:3000/api/praticiens/search?q=martin
```

---

### 4. Récupérer les praticiens par ville
```
GET http://localhost:3000/api/praticiens/ville/:ville
```

**Exemples:**
```
GET http://localhost:3000/api/praticiens/ville/Paris
GET http://localhost:3000/api/praticiens/ville/Lyon
GET http://localhost:3000/api/praticiens/ville/Marseille
```

---

### 5. Créer un nouveau praticien
```
POST http://localhost:3000/api/praticiens
Content-Type: application/json

{
  "nom": "Martin",
  "prenom": "Sophie",
  "tel": "0145678901",
  "email": "sophie.martin@example.com",
  "rue": "12 Rue de la Santé",
  "code_postal": "75014",
  "ville": "Paris"
}
```

**Champs requis:**
- `nom` (string)
- `prenom` (string)
- `tel` (string)
- `email` (string, unique)
- `rue` (string)
- `code_postal` (string)
- `ville` (string)

---

### 6. Mettre à jour un praticien
```
PUT http://localhost:3000/api/praticiens/:id
Content-Type: application/json

{
  "nom": "Martin",
  "prenom": "Sophie",
  "tel": "0145678901",
  "email": "sophie.martin@example.com",
  "rue": "12 Rue de la Santé",
  "code_postal": "75014",
  "ville": "Paris"
}
```

**Exemple:**
```
PUT http://localhost:3000/api/praticiens/507f1f77bcf86cd799439011
```

---

### 7. Supprimer un praticien
```
DELETE http://localhost:3000/api/praticiens/:id
```

**Exemple:**
```
DELETE http://localhost:3000/api/praticiens/507f1f77bcf86cd799439011
```

---

## Motifs

### 1. Récupérer tous les motifs
```
GET http://localhost:3000/api/motifs
```

---

### 2. Récupérer un motif par ID
```
GET http://localhost:3000/api/motifs/:id
```

**Exemple:**
```
GET http://localhost:3000/api/motifs/507f1f77bcf86cd799439011
```

---

### 3. Rechercher des motifs
Recherche par libellé.

```
GET http://localhost:3000/api/motifs/search?q=presentation
```

**Paramètres:**
- `q` (query string) : terme de recherche

**Exemples:**
```
GET http://localhost:3000/api/motifs/search?q=presentation
GET http://localhost:3000/api/motifs/search?q=formation
```

---

### 4. Créer un nouveau motif
```
POST http://localhost:3000/api/motifs
Content-Type: application/json

{
  "libelle": "Présentation de nouveaux produits"
}
```

**Champs requis:**
- `libelle` (string, unique)

**Exemples de motifs:**
```json
{"libelle": "Présentation de produits"}
{"libelle": "Formation"}
{"libelle": "Suivi client"}
{"libelle": "Démonstration"}
```

---

### 5. Mettre à jour un motif
```
PUT http://localhost:3000/api/motifs/:id
Content-Type: application/json

{
  "libelle": "Nouveau libellé du motif"
}
```

**Exemple:**
```
PUT http://localhost:3000/api/motifs/507f1f77bcf86cd799439011
```

---

### 6. Supprimer un motif
```
DELETE http://localhost:3000/api/motifs/:id
```

**Exemple:**
```
DELETE http://localhost:3000/api/motifs/507f1f77bcf86cd799439011
```

---

## Format des réponses

### Réponse de succès
```json
{
  "success": true,
  "data": {...},
  "message": "Opération réussie"
}
```

### Réponse d'erreur
```json
{
  "success": false,
  "message": "Description de l'erreur",
  "error": "Détails techniques"
}
```

---

## Codes HTTP

- `200` : Succès (GET, PUT, DELETE)
- `201` : Créé avec succès (POST)
- `400` : Requête invalide
- `404` : Ressource non trouvée
- `500` : Erreur serveur

---

## Notes importantes

1. **Tous les IDs** sont des ObjectIds MongoDB (24 caractères hexadécimaux)
2. **Les dates** doivent être au format ISO 8601 (ex: `2024-03-15T14:30:00.000Z`)
3. **Les emails** doivent être uniques dans la base de données
4. **Les visites** nécessitent que le visiteur, praticien et motif existent déjà
5. **La recherche** est insensible à la casse (case-insensitive)

---

## Workflow de test recommandé dans Postman

### 1. Créer les données de base
```
1. POST /api/motifs - Créer des motifs
2. POST /api/visiteurs - Créer des visiteurs
3. POST /api/praticiens - Créer des praticiens
```

### 2. Créer des visites
```
4. POST /api/visites - Créer des visites en utilisant les IDs créés
```

### 3. Tester les requêtes de recherche
```
5. GET /api/visites/visiteur/:visiteurId - Visites par visiteur
6. GET /api/visites/praticien/:praticienId - Visites par praticien
7. GET /api/visites/motif/:motifId - Visites par motif
8. GET /api/visites/date-range?startDate=...&endDate=... - Visites par période
9. GET /api/visites/stats - Statistiques
```

### 4. Tester les mises à jour
```
10. PUT /api/visiteurs/:id - Mettre à jour un visiteur
11. PUT /api/praticiens/:id - Mettre à jour un praticien
12. PUT /api/visites/:id - Mettre à jour une visite
```

### 5. Tester les suppressions
```
13. DELETE /api/visites/:id - Supprimer une visite
14. DELETE /api/visiteurs/:id - Supprimer un visiteur
15. DELETE /api/praticiens/:id - Supprimer un praticien
16. DELETE /api/motifs/:id - Supprimer un motif
```

---

## Exemples de scénarios complets

### Scénario 1 : Créer une visite complète

#### Étape 1 : Créer un motif
```
POST http://localhost:3000/api/motifs
Content-Type: application/json

{
  "libelle": "Présentation de produits"
}
```
Réponse : `{"success": true, "data": {"_id": "60d5ec9af682fbd39e4c1234", ...}}`

#### Étape 2 : Créer un visiteur
```
POST http://localhost:3000/api/visiteurs
Content-Type: application/json

{
  "nom": "Dupont",
  "prenom": "Jean",
  "tel": "0612345678",
  "email": "jean.dupont@example.com",
  "date_embauche": "2024-01-15"
}
```
Réponse : `{"success": true, "data": {"_id": "60d5ec9af682fbd39e4c5678", ...}}`

#### Étape 3 : Créer un praticien
```
POST http://localhost:3000/api/praticiens
Content-Type: application/json

{
  "nom": "Martin",
  "prenom": "Sophie",
  "tel": "0145678901",
  "email": "sophie.martin@example.com",
  "rue": "12 Rue de la Santé",
  "code_postal": "75014",
  "ville": "Paris"
}
```
Réponse : `{"success": true, "data": {"_id": "60d5ec9af682fbd39e4c9012", ...}}`

#### Étape 4 : Créer la visite
```
POST http://localhost:3000/api/visites
Content-Type: application/json

{
  "date_visite": "2024-03-15T14:30:00.000Z",
  "commentaire": "Présentation des nouveaux produits pharmaceutiques",
  "visiteur": "60d5ec9af682fbd39e4c5678",
  "praticien": "60d5ec9af682fbd39e4c9012",
  "motif": "60d5ec9af682fbd39e4c1234"
}
```

### Scénario 2 : Rechercher toutes les visites d'un visiteur

#### Étape 1 : Récupérer l'ID du visiteur
```
GET http://localhost:3000/api/visiteurs/search?q=dupont
```

#### Étape 2 : Récupérer ses visites
```
GET http://localhost:3000/api/visites/visiteur/60d5ec9af682fbd39e4c5678
```

### Scénario 3 : Statistiques mensuelles

```
GET http://localhost:3000/api/visites/stats
```

Retourne :
- Le nombre total de visites
- Les visites par motif
- Les visites par mois (12 derniers mois)

---

## Configuration de Postman

### Variables d'environnement recommandées

Créez un environnement Postman avec ces variables :

- `base_url` : `http://localhost:3000`
- `visiteur_id` : (à remplir après création)
- `praticien_id` : (à remplir après création)
- `motif_id` : (à remplir après création)
- `visite_id` : (à remplir après création)

Utilisez-les dans vos requêtes :
```
GET {{base_url}}/api/visiteurs/{{visiteur_id}}
```
