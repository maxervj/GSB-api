# API Portefeuille de Praticiens - Guide d'utilisation

## Description

Cette API permet aux visiteurs médicaux de GSB de gérer leur portefeuille de praticiens, c'est-à-dire une sélection personnalisée de professionnels de santé qu'ils doivent suivre et rencontrer régulièrement.

## Base URL

```
http://localhost:3000/api/portefeuilles
```

## Modèle de données Portefeuille

```typescript
{
  _id: ObjectId,
  visiteur: ObjectId,        // Référence au visiteur
  praticien: ObjectId,       // Référence au praticien
  date_ajout: Date,          // Date d'ajout au portefeuille
  notes: string,             // Notes optionnelles (max 500 caractères)
  priorite: string,          // 'basse' | 'normale' | 'haute'
  statut: string,            // 'actif' | 'inactif'
  createdAt: Date,
  updatedAt: Date
}
```

## Endpoints disponibles

### 1. Ajouter un praticien au portefeuille

**POST** `/api/portefeuilles`

Permet à un visiteur d'ajouter un praticien à son portefeuille.

**Body (JSON):**
```json
{
  "visiteur": "675518a1b2c3d4e5f6a7b8c9",
  "praticien": "675518a1b2c3d4e5f6a7b8d0",
  "notes": "Praticien important pour la région Nord",
  "priorite": "haute"
}
```

**Réponse succès (201):**
```json
{
  "success": true,
  "message": "Praticien ajouté au portefeuille avec succès",
  "data": {
    "_id": "675518a1b2c3d4e5f6a7b8d1",
    "visiteur": "675518a1b2c3d4e5f6a7b8c9",
    "praticien": "675518a1b2c3d4e5f6a7b8d0",
    "date_ajout": "2025-12-08T16:00:00.000Z",
    "notes": "Praticien important pour la région Nord",
    "priorite": "haute",
    "statut": "actif"
  }
}
```

**Erreurs possibles:**
- `400`: Champs requis manquants
- `404`: Visiteur ou praticien non trouvé
- `409`: Le praticien est déjà dans le portefeuille

---

### 2. Récupérer le portefeuille d'un visiteur

**GET** `/api/portefeuilles/visiteur/:visiteurId`

Récupère tous les praticiens du portefeuille d'un visiteur.

**Query params (optionnel):**
- `statut`: Filtrer par statut (`actif` ou `inactif`)

**Exemple:**
```
GET /api/portefeuilles/visiteur/675518a1b2c3d4e5f6a7b8c9
GET /api/portefeuilles/visiteur/675518a1b2c3d4e5f6a7b8c9?statut=actif
```

**Réponse succès (200):**
```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "_id": "675518a1b2c3d4e5f6a7b8d1",
      "visiteur": {
        "_id": "675518a1b2c3d4e5f6a7b8c9",
        "nom": "Dupont",
        "prenom": "Jean",
        "email": "jean.dupont@gsb.fr"
      },
      "praticien": {
        "_id": "675518a1b2c3d4e5f6a7b8d0",
        "nom": "Martin",
        "prenom": "Marie",
        "email": "marie.martin@hopital.fr",
        "ville": "Paris"
      },
      "date_ajout": "2025-12-08T16:00:00.000Z",
      "notes": "Praticien important",
      "priorite": "haute",
      "statut": "actif"
    }
  ]
}
```

---

### 3. Récupérer un élément spécifique du portefeuille

**GET** `/api/portefeuilles/:id`

Récupère les détails d'un élément spécifique du portefeuille.

**Réponse succès (200):**
```json
{
  "success": true,
  "data": {
    "_id": "675518a1b2c3d4e5f6a7b8d1",
    "visiteur": { ... },
    "praticien": { ... },
    "date_ajout": "2025-12-08T16:00:00.000Z",
    "notes": "Praticien important",
    "priorite": "haute",
    "statut": "actif"
  }
}
```

**Erreur (404):**
```json
{
  "success": false,
  "message": "Élément du portefeuille non trouvé"
}
```

---

### 4. Mettre à jour un élément du portefeuille

**PUT** `/api/portefeuilles/:id`

Met à jour les notes, la priorité ou le statut d'un praticien dans le portefeuille.

**Body (JSON):**
```json
{
  "notes": "Nouvelle note mise à jour",
  "priorite": "normale",
  "statut": "actif"
}
```

**Réponse succès (200):**
```json
{
  "success": true,
  "message": "Portefeuille mis à jour avec succès",
  "data": { ... }
}
```

---

### 5. Récupérer les praticiens par priorité

**GET** `/api/portefeuilles/visiteur/:visiteurId/priorite/:priorite`

Récupère tous les praticiens actifs d'une priorité spécifique.

**Valeurs de priorité:** `basse`, `normale`, `haute`

**Exemple:**
```
GET /api/portefeuilles/visiteur/675518a1b2c3d4e5f6a7b8c9/priorite/haute
```

**Réponse succès (200):**
```json
{
  "success": true,
  "count": 2,
  "data": [ ... ]
}
```

---

### 6. Récupérer les statistiques du portefeuille

**GET** `/api/portefeuilles/visiteur/:visiteurId/stats`

Récupère les statistiques du portefeuille d'un visiteur.

**Réponse succès (200):**
```json
{
  "success": true,
  "data": {
    "total": 10,
    "actifs": 8,
    "inactifs": 2,
    "prioriteHaute": 3,
    "prioriteNormale": 5,
    "prioriteBasse": 2
  }
}
```

---

### 7. Changer le statut (actif/inactif)

**PATCH** `/api/portefeuilles/:id/toggle-statut`

Bascule le statut d'un praticien entre actif et inactif.

**Réponse succès (200):**
```json
{
  "success": true,
  "message": "Statut modifié avec succès",
  "data": { ... }
}
```

---

### 8. Retirer un praticien du portefeuille

**DELETE** `/api/portefeuilles/:id`

Supprime un praticien du portefeuille.

**Réponse succès (200):**
```json
{
  "success": true,
  "message": "Praticien retiré du portefeuille avec succès",
  "data": { ... }
}
```

---

## Cas d'usage typiques

### Scénario 1: Un visiteur ajoute un praticien à son portefeuille

1. Le visiteur obtient son ID (depuis `/api/visiteurs`)
2. Le visiteur obtient l'ID du praticien à ajouter (depuis `/api/praticiens`)
3. Le visiteur fait un POST vers `/api/portefeuilles` avec les deux IDs

### Scénario 2: Consulter son portefeuille de praticiens actifs

```
GET /api/portefeuilles/visiteur/{visiteurId}?statut=actif
```

### Scénario 3: Voir uniquement les praticiens hautement prioritaires

```
GET /api/portefeuilles/visiteur/{visiteurId}/priorite/haute
```

### Scénario 4: Mettre à jour la priorité d'un praticien

```
PUT /api/portefeuilles/{portefeuilleId}
Body: { "priorite": "haute" }
```

---

## Règles de gestion

1. **Unicité**: Un visiteur ne peut pas ajouter deux fois le même praticien à son portefeuille
2. **Références**: Le visiteur et le praticien doivent exister dans la base de données
3. **Priorité par défaut**: Si aucune priorité n'est spécifiée, elle est définie à "normale"
4. **Statut par défaut**: Les nouveaux ajouts ont le statut "actif"
5. **Notes**: Optionnelles, limitées à 500 caractères

---

## Codes de statut HTTP

- `200 OK`: Requête réussie
- `201 Created`: Ressource créée avec succès
- `400 Bad Request`: Données invalides ou manquantes
- `404 Not Found`: Ressource non trouvée
- `409 Conflict`: Conflit (praticien déjà dans le portefeuille)
- `500 Internal Server Error`: Erreur serveur

---

## Exemples avec cURL

### Ajouter un praticien au portefeuille

```bash
curl -X POST http://localhost:3000/api/portefeuilles \
  -H "Content-Type: application/json" \
  -d '{
    "visiteur": "675518a1b2c3d4e5f6a7b8c9",
    "praticien": "675518a1b2c3d4e5f6a7b8d0",
    "notes": "Important pour la région",
    "priorite": "haute"
  }'
```

### Récupérer le portefeuille d'un visiteur

```bash
curl http://localhost:3000/api/portefeuilles/visiteur/675518a1b2c3d4e5f6a7b8c9
```

### Récupérer les statistiques

```bash
curl http://localhost:3000/api/portefeuilles/visiteur/675518a1b2c3d4e5f6a7b8c9/stats
```
