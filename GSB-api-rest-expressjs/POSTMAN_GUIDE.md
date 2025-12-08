# Guide d'utilisation de la Collection Postman GSB API

## Installation

1. **Importer la collection dans Postman**
   - Ouvrez Postman
   - Cliquez sur "Import" en haut à gauche
   - Sélectionnez le fichier `GSB_API.postman_collection.json`
   - La collection "GSB API - Collection Complète" apparaîtra dans votre sidebar

## Configuration

La collection utilise les variables suivantes (déjà pré-configurées) :
- `base_url` : http://localhost:3005
- `visiteur_id` : (auto-généré lors de la création)
- `praticien_id` : (auto-généré lors de la création)
- `motif_id` : (auto-généré lors de la création)
- `visite_id` : (auto-généré lors de la création)

## Démarrage du serveur

Avant d'utiliser la collection, démarrez le serveur :

```bash
cd GSB-api-rest-expressjs
npm start
```

Le serveur démarrera sur le port 3005.

## Structure de la collection

### 1. API Info (2 requêtes)
- **Get API Info** : Informations sur l'API et liste des endpoints
- **Health Check** : Vérifier que l'API fonctionne

### 2. Visiteurs (10 requêtes)

#### Consultation
- **Get All Visiteurs** : Liste tous les visiteurs
- **Get Visiteur By ID** : Récupère un visiteur par son ID
- **Search Visiteurs** : Recherche par nom/prénom/email (ex: ?q=dupon)
- **Get Visiteurs By Name** : Filtre par nom exact
- **Get Visiteur By Email** : Recherche par email unique
- **Get Visiteurs By Tel** : Recherche par téléphone
- **Get Visiteurs By Year** : Filtre par année d'embauche

#### Modification
- **Create Visiteur** : Crée un nouveau visiteur (auto-save ID)
- **Update Visiteur** : Modifie un visiteur existant
- **Delete Visiteur** : Supprime un visiteur

**Exemple de données pour Create Visiteur :**
```json
{
  "nom": "Dupont",
  "prenom": "Jean",
  "tel": "0612345678",
  "email": "jean.dupont@gsb.fr",
  "date_embauche": "2024-01-15"
}
```

### 3. Praticiens (7 requêtes)

#### Consultation
- **Get All Praticiens** : Liste tous les praticiens
- **Get Praticien By ID** : Récupère un praticien par son ID
- **Search Praticiens** : Recherche par nom/prénom/email/ville
- **Get Praticiens By Ville** : Filtre par ville

#### Modification
- **Create Praticien** : Crée un nouveau praticien (auto-save ID)
- **Update Praticien** : Modifie un praticien existant
- **Delete Praticien** : Supprime un praticien

**Exemple de données pour Create Praticien :**
```json
{
  "nom": "Martin",
  "prenom": "Sophie",
  "tel": "0145678901",
  "email": "sophie.martin@medecin.fr",
  "rue": "15 rue de la Santé",
  "code_postal": "75013",
  "ville": "Paris"
}
```

### 4. Motifs (6 requêtes)

#### Consultation
- **Get All Motifs** : Liste tous les motifs
- **Get Motif By ID** : Récupère un motif par son ID
- **Search Motifs** : Recherche par libellé

#### Modification
- **Create Motif** : Crée un nouveau motif (auto-save ID)
- **Update Motif** : Modifie un motif existant
- **Delete Motif** : Supprime un motif

**Exemple de données pour Create Motif :**
```json
{
  "libelle": "Présentation produit"
}
```

### 5. Visites (10 requêtes)

#### Consultation
- **Get All Visites** : Liste toutes les visites (avec populate)
- **Get Visite By ID** : Récupère une visite par son ID
- **Get Visites By Visiteur** : Liste les visites d'un visiteur
- **Get Visites By Praticien** : Liste les visites d'un praticien
- **Get Visites By Motif** : Liste les visites par motif
- **Get Visites By Date Range** : Filtre par période (startDate et endDate)
- **Get Visites Stats** : Statistiques (total, par motif, par mois)

#### Modification
- **Create Visite** : Crée une nouvelle visite (auto-save ID)
- **Update Visite** : Modifie une visite existante
- **Delete Visite** : Supprime une visite

**Exemple de données pour Create Visite :**
```json
{
  "date_visite": "2024-12-08",
  "commentaire": "Visite de présentation des nouveaux produits. Le praticien est intéressé.",
  "visiteur": "{{visiteur_id}}",
  "praticien": "{{praticien_id}}",
  "motif": "{{motif_id}}"
}
```

## Workflow recommandé pour tester

### Test complet de bout en bout :

1. **Vérifier l'API**
   ```
   GET API Info → Health Check
   ```

2. **Créer les données de base**
   ```
   POST Create Visiteur (enregistre visiteur_id)
   POST Create Praticien (enregistre praticien_id)
   POST Create Motif (enregistre motif_id)
   ```

3. **Créer une visite**
   ```
   POST Create Visite (utilise les IDs automatiquement)
   ```

4. **Consulter les données**
   ```
   GET All Visites (voir la visite avec les relations populate)
   GET Visites By Visiteur
   GET Visites Stats
   ```

5. **Tester les recherches**
   ```
   GET Search Visiteurs?q=dupont
   GET Praticiens By Ville/Paris
   GET Visites By Date Range
   ```

6. **Mettre à jour**
   ```
   PUT Update Visiteur
   PUT Update Visite
   ```

7. **Nettoyer (optionnel)**
   ```
   DELETE Visite
   DELETE Visiteur
   DELETE Praticien
   DELETE Motif
   ```

## Fonctionnalités avancées

### Auto-save des IDs
Les requêtes POST ont des scripts qui enregistrent automatiquement les IDs créés dans les variables d'environnement. Cela permet de :
- Créer un visiteur et utiliser immédiatement son ID
- Chaîner les requêtes sans copier-coller d'IDs
- Tester rapidement le workflow complet

### Variables dynamiques
Vous pouvez utiliser `{{variable_name}}` dans n'importe quelle requête :
- `{{base_url}}` : URL de base
- `{{visiteur_id}}` : ID du dernier visiteur créé
- `{{praticien_id}}` : ID du dernier praticien créé
- `{{motif_id}}` : ID du dernier motif créé
- `{{visite_id}}` : ID de la dernière visite créée

## Format des réponses

Toutes les réponses suivent le même format :

**Succès :**
```json
{
  "success": true,
  "count": 10,
  "data": [...]
}
```

**Erreur :**
```json
{
  "success": false,
  "message": "Description de l'erreur",
  "error": "Détails techniques"
}
```

## Codes HTTP

- `200` : Succès (GET, PUT, DELETE)
- `201` : Création réussie (POST)
- `400` : Erreur de validation (email déjà utilisé, champs manquants)
- `404` : Ressource non trouvée
- `500` : Erreur serveur

## Relations métier

### Visiteur
- Un visiteur peut effectuer plusieurs **visites**
- Champs requis : nom, prenom, tel, email (unique), date_embauche

### Praticien
- Un praticien peut recevoir plusieurs **visites**
- Champs requis : nom, prenom, tel, email (unique), rue, code_postal, ville
- Index sur : email, nom+prenom, ville

### Motif
- Un motif peut être utilisé dans plusieurs **visites**
- Champ requis : libelle (unique)

### Visite
- Relie un **visiteur**, un **praticien** et un **motif**
- Champs requis : date_visite, visiteur (ID), praticien (ID), motif (ID)
- Commentaire optionnel (max 1000 caractères)
- Les requêtes GET incluent automatiquement les données liées (populate)

## Dépannage

### Erreur de connexion
- Vérifiez que le serveur est démarré : `npm start`
- Vérifiez le port dans `.env` : `PORT=3005`
- Testez avec Health Check

### Erreur "email existe déjà"
- Les emails doivent être uniques pour Visiteur et Praticien
- Utilisez un email différent ou supprimez l'existant

### Erreur "ID non trouvé"
- Vérifiez que vous avez créé les ressources d'abord
- Copiez l'ID depuis la réponse de création
- Ou utilisez les variables auto-générées

### Erreur de validation
- Vérifiez que tous les champs requis sont présents
- Vérifiez le format de l'email
- Vérifiez que les IDs référencés existent

## Support

Pour plus d'informations sur l'API :
- Documentation : README.md
- Code source : `/src/modules/`
- Routes : `GET http://localhost:3005/` (liste des endpoints)

## Total des requêtes

- **35 requêtes** au total
- **Toutes les opérations CRUD** pour chaque entité
- **Recherches et filtres** avancés
- **Relations et statistiques**
