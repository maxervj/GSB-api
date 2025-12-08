# Fonctionnalité : Gestion des Portefeuilles de Praticiens

## Vue d'ensemble

Cette fonctionnalité permet aux visiteurs médicaux de GSB de constituer et gérer un portefeuille personnalisé de praticiens. Un portefeuille est une sélection de professionnels de santé qu'un visiteur doit suivre et rencontrer régulièrement dans le cadre de son activité.

## Architecture

La fonctionnalité suit l'architecture MVC du projet :

```
src/
├── modules/portefeuille/
│   ├── Portefeuille.ts           # Modèle MongoDB (schema)
│   ├── portefeuille.service.ts   # Logique métier
│   └── portefeuille.routes.ts    # Définition des routes
│
└── Controller/portefeuilleController/
    └── portefeuille.controller.ts # Gestion des requêtes HTTP
```

## Modèle de données

### Schéma Portefeuille

```typescript
{
  visiteur: ObjectId,        // Référence au visiteur (requis)
  praticien: ObjectId,       // Référence au praticien (requis)
  date_ajout: Date,          // Date d'ajout (auto)
  notes: String,             // Notes optionnelles (max 500 caractères)
  priorite: String,          // 'basse' | 'normale' | 'haute' (défaut: 'normale')
  statut: String,            // 'actif' | 'inactif' (défaut: 'actif')
  createdAt: Date,           // Créé automatiquement
  updatedAt: Date            // Mis à jour automatiquement
}
```

### Index et contraintes

- **Index unique composé** : `{visiteur + praticien}` - Un visiteur ne peut pas ajouter deux fois le même praticien
- **Index** : `{visiteur + statut}` - Optimise les requêtes de filtrage par statut
- **Index** : `{visiteur + priorite}` - Optimise les requêtes de filtrage par priorité
- **Index** : `{date_ajout}` - Optimise le tri chronologique

## Fonctionnalités principales

### 1. Ajout d'un praticien au portefeuille

**User Story** : En tant que visiteur médical, je souhaite pouvoir ajouter un praticien à mon portefeuille.

**Endpoint** : `POST /api/portefeuilles`

**Validations** :
- Le visiteur doit exister
- Le praticien doit exister
- Le praticien ne doit pas déjà être dans le portefeuille

### 2. Consultation du portefeuille

**User Stories** :
- En tant que visiteur, je veux voir tous mes praticiens
- En tant que visiteur, je veux filtrer par statut (actif/inactif)
- En tant que visiteur, je veux filtrer par priorité

**Endpoints** :
- `GET /api/portefeuilles/visiteur/:visiteurId`
- `GET /api/portefeuilles/visiteur/:visiteurId?statut=actif`
- `GET /api/portefeuilles/visiteur/:visiteurId/priorite/haute`

### 3. Gestion de la priorité

Les praticiens peuvent avoir 3 niveaux de priorité :
- **Haute** : Praticiens clés à suivre en priorité
- **Normale** : Suivi régulier (défaut)
- **Basse** : Suivi occasionnel

### 4. Gestion du statut

Les praticiens peuvent être :
- **Actif** : Fait partie du portefeuille actif (défaut)
- **Inactif** : Archivé mais conservé dans l'historique

### 5. Statistiques

**Endpoint** : `GET /api/portefeuilles/visiteur/:visiteurId/stats`

Fournit une vue d'ensemble :
- Nombre total de praticiens
- Répartition actifs/inactifs
- Répartition par priorité

### 6. Mise à jour et suppression

- Modification des notes, priorité, statut
- Basculement rapide du statut (actif ↔ inactif)
- Suppression définitive d'un praticien du portefeuille

## Service Layer

Le `PortefeuilleService` fournit les méthodes métier suivantes :

```typescript
- getPortefeuilleByVisiteur(visiteurId, statut?)
- getPortefeuilleById(id)
- visiteurExists(visiteurId)
- praticienExists(praticienId)
- praticienExistsInPortefeuille(visiteurId, praticienId)
- addPraticienToPortefeuille(data)
- updatePortefeuille(id, data)
- removePraticienFromPortefeuille(id)
- getPortefeuilleByPriorite(visiteurId, priorite)
- getPortefeuilleStats(visiteurId)
- toggleStatutPortefeuille(id)
```

## Controller Layer

Le `PortefeuilleController` gère les requêtes HTTP avec :
- Validation des entrées
- Gestion des erreurs
- Réponses JSON standardisées

Format de réponse standard :
```json
{
  "success": true/false,
  "message": "Message descriptif",
  "data": { ... },
  "count": 10  // pour les listes
}
```

## Routes disponibles

| Méthode | Endpoint | Description |
|---------|----------|-------------|
| POST | `/api/portefeuilles` | Ajouter un praticien |
| GET | `/api/portefeuilles/visiteur/:id` | Récupérer le portefeuille |
| GET | `/api/portefeuilles/visiteur/:id/stats` | Statistiques |
| GET | `/api/portefeuilles/visiteur/:id/priorite/:p` | Filtrer par priorité |
| GET | `/api/portefeuilles/:id` | Détails d'un élément |
| PUT | `/api/portefeuilles/:id` | Mettre à jour |
| PATCH | `/api/portefeuilles/:id/toggle-statut` | Basculer statut |
| DELETE | `/api/portefeuilles/:id` | Supprimer |

## Documentation

- **Guide API complet** : Voir `PORTEFEUILLE_API_GUIDE.md`
- **Collection Postman** : Importer `GSB_Portefeuille.postman_collection.json`

## Cas d'usage métier

### Scénario 1 : Constitution initiale du portefeuille

Un nouveau visiteur constitue son portefeuille :
1. Il consulte la liste des praticiens de sa région
2. Il ajoute les praticiens clés avec priorité "haute"
3. Il ajoute d'autres praticiens avec priorité "normale"

### Scénario 2 : Planification des visites

Avant une tournée, le visiteur :
1. Consulte son portefeuille actif (`statut=actif`)
2. Filtre par priorité "haute" pour prioriser
3. Consulte les notes pour chaque praticien

### Scénario 3 : Gestion du temps

Un visiteur surchargé :
1. Met certains praticiens en statut "inactif"
2. Conserve uniquement les priorités "haute" et "normale" actives
3. Consulte ses stats pour équilibrer son portefeuille

### Scénario 4 : Suivi et évolution

Au fil du temps :
1. Le visiteur met à jour les notes après chaque visite
2. Il ajuste les priorités selon l'importance des praticiens
3. Il archive (inactif) les praticiens qui ne sont plus pertinents

## Points techniques importants

### Sécurité et validation

- Toutes les références (visiteur, praticien) sont vérifiées
- Les doublons sont détectés et bloqués
- Les valeurs d'enum (priorité, statut) sont validées
- Longueur maximale des notes : 500 caractères

### Performance

- Index MongoDB optimisés pour les requêtes fréquentes
- Population (populate) des références pour éviter les requêtes multiples
- Tri optimisé par priorité et date

### Intégrité des données

- Contrainte d'unicité au niveau base de données
- Validation Mongoose sur tous les champs
- Timestamps automatiques

## Tests recommandés

Pour tester la fonctionnalité :

1. **Utiliser Postman** : Importer la collection fournie
2. **Définir les variables** :
   - Créer un visiteur et noter son ID
   - Créer des praticiens et noter leurs IDs
   - Utiliser ces IDs dans les requêtes

3. **Scénario de test complet** :
   ```
   1. POST - Ajouter 3 praticiens au portefeuille
   2. GET - Récupérer le portefeuille complet
   3. GET - Statistiques (devrait montrer 3 total)
   4. PUT - Modifier la priorité d'un praticien
   5. PATCH - Basculer le statut d'un praticien
   6. GET - Filtrer par statut actif (devrait montrer 2)
   7. DELETE - Supprimer un praticien
   8. GET - Statistiques (devrait montrer 2 total)
   ```

## Évolutions possibles

### Version future

- Notifications lors de l'ajout d'un praticien
- Historique des modifications du portefeuille
- Rappels automatiques pour les praticiens prioritaires non visités
- Export du portefeuille en PDF/Excel
- Partage de portefeuille entre visiteurs d'une même région
- Suggestion automatique de praticiens à ajouter

## Conclusion

Cette fonctionnalité permet une gestion complète et flexible des portefeuilles de praticiens, répondant aux besoins métier des visiteurs médicaux GSB tout en respectant l'architecture et les bonnes pratiques du projet.
