# Visualiser les Praticiens de son Portefeuille

## User Story

**En tant que** visiteur médical
**Je souhaite** visualiser uniquement les praticiens de mon portefeuille
**Afin de** consulter facilement la liste de mes praticiens à suivre

---

## Endpoint Principal

### Récupérer les praticiens de mon portefeuille

**GET** `/api/portefeuilles/visiteur/:visiteurId/praticiens`

Cet endpoint retourne une liste simplifiée de praticiens avec les informations de leur portefeuille.

#### Paramètres

**Path Parameters:**
- `visiteurId` (string, required) : L'ID du visiteur

**Query Parameters (optionnels):**
- `statut` (string) : Filtrer par statut
  - `actif` : Uniquement les praticiens actifs
  - `inactif` : Uniquement les praticiens inactifs

---

## Format de Réponse

La réponse retourne les praticiens avec leurs informations complètes + les métadonnées du portefeuille.

### Exemple de réponse

```json
{
  "success": true,
  "count": 3,
  "data": [
    {
      "_id": "675518a1b2c3d4e5f6a7b8d0",
      "nom": "Martin",
      "prenom": "Marie",
      "tel": "0612345678",
      "email": "marie.martin@hopital.fr",
      "rue": "15 Rue de la Santé",
      "code_postal": "75014",
      "ville": "Paris",
      "createdAt": "2025-11-15T10:00:00.000Z",
      "updatedAt": "2025-12-01T14:30:00.000Z",
      "portefeuille_info": {
        "id": "675518a1b2c3d4e5f6a7b8d1",
        "date_ajout": "2025-11-20T09:00:00.000Z",
        "priorite": "haute",
        "statut": "actif",
        "notes": "Spécialiste en cardiologie - Rendez-vous mensuel"
      }
    },
    {
      "_id": "675518a1b2c3d4e5f6a7b8d2",
      "nom": "Dubois",
      "prenom": "Pierre",
      "tel": "0623456789",
      "email": "pierre.dubois@clinique.fr",
      "rue": "8 Avenue des Fleurs",
      "code_postal": "69001",
      "ville": "Lyon",
      "createdAt": "2025-11-10T11:00:00.000Z",
      "updatedAt": "2025-11-25T16:00:00.000Z",
      "portefeuille_info": {
        "id": "675518a1b2c3d4e5f6a7b8d3",
        "date_ajout": "2025-11-22T10:30:00.000Z",
        "priorite": "normale",
        "statut": "actif",
        "notes": "Généraliste - Visite trimestrielle"
      }
    }
  ]
}
```

---

## Cas d'Usage

### 1. Visualiser tous mes praticiens actifs

```bash
GET /api/portefeuilles/visiteur/675518a1b2c3d4e5f6a7b8c9/praticiens?statut=actif
```

**Utilisation :**
- Afficher la liste des praticiens que je dois suivre actuellement
- Planifier mes visites du mois
- Consulter rapidement les contacts

### 2. Visualiser tous mes praticiens (actifs et inactifs)

```bash
GET /api/portefeuilles/visiteur/675518a1b2c3d4e5f6a7b8c9/praticiens
```

**Utilisation :**
- Voir l'historique complet de mon portefeuille
- Réactiver d'anciens praticiens si nécessaire

### 3. Visualiser uniquement les praticiens inactifs

```bash
GET /api/portefeuilles/visiteur/675518a1b2c3d4e5f6a7b8c9/praticiens?statut=inactif
```

**Utilisation :**
- Consulter mes praticiens archivés
- Identifier ceux qui pourraient être réactivés

---

## Différence avec l'endpoint standard

### Endpoint standard (structure complète)
`GET /api/portefeuilles/visiteur/:visiteurId`

```json
{
  "data": [
    {
      "_id": "portefeuille_id",
      "visiteur": { "nom": "...", "prenom": "..." },
      "praticien": { "nom": "...", "prenom": "..." },
      "date_ajout": "...",
      "priorite": "haute",
      "statut": "actif",
      "notes": "..."
    }
  ]
}
```

**Usage :** Gestion administrative du portefeuille

---

### Nouvel endpoint (focus praticiens)
`GET /api/portefeuilles/visiteur/:visiteurId/praticiens`

```json
{
  "data": [
    {
      "_id": "praticien_id",
      "nom": "Martin",
      "prenom": "Marie",
      "email": "...",
      "tel": "...",
      "rue": "...",
      "ville": "...",
      "portefeuille_info": {
        "id": "...",
        "priorite": "haute",
        "statut": "actif",
        "notes": "..."
      }
    }
  ]
}
```

**Usage :** Visualisation et affichage des praticiens

---

## Avantages de ce format

### Pour l'interface utilisateur

1. **Affichage direct** : Les informations du praticien sont au premier niveau
2. **Facilité d'utilisation** : Pas besoin de naviguer dans une structure imbriquée
3. **Contact rapide** : Email, téléphone, adresse directement accessibles

### Pour le développeur frontend

```javascript
// Facile à afficher dans une liste
praticiens.map(praticien => (
  <div>
    <h3>{praticien.nom} {praticien.prenom}</h3>
    <p>{praticien.email} - {praticien.tel}</p>
    <p>{praticien.ville}</p>
    <span>Priorité: {praticien.portefeuille_info.priorite}</span>
    <p>{praticien.portefeuille_info.notes}</p>
  </div>
))
```

---

## Tri des résultats

Les praticiens sont automatiquement triés par :
1. **Priorité** (décroissant) : Haute → Normale → Basse
2. **Date d'ajout** (décroissant) : Plus récents en premier

Cela garantit que les praticiens les plus importants apparaissent en premier.

---

## Exemples avec cURL

### Tous les praticiens actifs
```bash
curl -X GET "http://localhost:3000/api/portefeuilles/visiteur/675518a1b2c3d4e5f6a7b8c9/praticiens?statut=actif"
```

### Tous les praticiens
```bash
curl -X GET "http://localhost:3000/api/portefeuilles/visiteur/675518a1b2c3d4e5f6a7b8c9/praticiens"
```

---

## Intégration avec d'autres endpoints

### Scénario complet : Planifier mes visites de la semaine

```javascript
// 1. Récupérer mes praticiens actifs prioritaires
const response = await fetch(
  '/api/portefeuilles/visiteur/MON_ID/praticiens?statut=actif'
);
const { data: praticiens } = await response.json();

// 2. Filtrer par priorité haute
const prioritaires = praticiens.filter(
  p => p.portefeuille_info.priorite === 'haute'
);

// 3. Afficher les informations de contact
prioritaires.forEach(praticien => {
  console.log(`
    ${praticien.nom} ${praticien.prenom}
    ${praticien.tel}
    ${praticien.rue}, ${praticien.ville}
    Notes: ${praticien.portefeuille_info.notes}
  `);
});
```

---

## Codes de statut HTTP

- `200 OK` : Liste retournée avec succès
- `404 Not Found` : Visiteur inexistant
- `500 Internal Server Error` : Erreur serveur

---

## Notes importantes

1. **Performance** : Utilise l'index MongoDB pour des requêtes rapides
2. **Population** : Les données du praticien sont automatiquement chargées
3. **Filtre** : Le paramètre `statut` est optionnel
4. **Tri** : Toujours par priorité puis date d'ajout
5. **Format** : Optimisé pour l'affichage dans une interface

---

## Endpoint complémentaire : Vue détaillée

Pour obtenir plus de détails sur un praticien spécifique de votre portefeuille :

```
GET /api/portefeuilles/:portefeuilleId
```

Cela retourne la structure complète avec visiteur et praticien populés.

---

## Résumé

| Besoin | Endpoint | Résultat |
|--------|----------|----------|
| Voir mes praticiens | `/praticiens` | Liste simplifiée |
| Voir praticiens actifs | `/praticiens?statut=actif` | Filtrée par statut |
| Détails d'un praticien | `/:id` | Vue complète |
| Gestion portefeuille | `/visiteur/:id` | Structure admin |

---

Cette fonctionnalité répond parfaitement au besoin de visualiser facilement et rapidement les praticiens d'un portefeuille tout en conservant les informations contextuelles importantes (priorité, notes, statut).
