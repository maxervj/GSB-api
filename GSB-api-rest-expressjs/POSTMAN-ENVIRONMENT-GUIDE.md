# Guide des Variables d'Environnement Postman - API GSB

Ce guide explique comment utiliser les variables d'environnement Postman pour simplifier vos tests de l'API GSB.

## Installation

### Méthode 1 : Importer l'environnement (RECOMMANDÉ)

1. Ouvrez Postman
2. Cliquez sur **"Environments"** dans la barre latérale gauche
3. Cliquez sur **"Import"**
4. Sélectionnez le fichier **`GSB-Local.postman_environment.json`**
5. L'environnement "GSB Local Environment" sera créé
6. Sélectionnez-le dans le menu déroulant en haut à droite

### Méthode 2 : Créer manuellement l'environnement

Si vous préférez créer l'environnement manuellement :

1. Ouvrez Postman
2. Cliquez sur **"Environments"** → **"Create Environment"**
3. Nommez-le **"GSB Local"**
4. Ajoutez les variables listées ci-dessous

---

## Variables d'Environnement

### 🌐 Variables de Configuration

| Variable | Valeur par défaut | Description |
|----------|-------------------|-------------|
| `base_url` | `http://localhost:3000` | URL de base de l'API |

**Utilisation :** Cette variable est utilisée dans toutes les requêtes.

---

### 👤 Variables Visiteur

#### Identifiant
| Variable | Valeur initiale | Description |
|----------|-----------------|-------------|
| `visiteur_id` | *(vide)* | ID MongoDB du visiteur (à remplir après création) |

#### Données de création
| Variable | Valeur par défaut | Description |
|----------|-------------------|-------------|
| `visiteur_nom` | `Dupont` | Nom du visiteur |
| `visiteur_prenom` | `Jean` | Prénom du visiteur |
| `visiteur_tel` | `0612345678` | Téléphone du visiteur |
| `visiteur_email` | `jean.dupont@gsb.fr` | Email du visiteur (doit être unique) |
| `visiteur_date_embauche` | `2024-01-15` | Date d'embauche (format: YYYY-MM-DD) |

**Exemple d'utilisation dans une requête POST :**
```json
{
  "nom": "{{visiteur_nom}}",
  "prenom": "{{visiteur_prenom}}",
  "tel": "{{visiteur_tel}}",
  "email": "{{visiteur_email}}",
  "date_embauche": "{{visiteur_date_embauche}}"
}
```

**Requêtes concernées :**
- `POST /api/visiteurs` - Créer un visiteur
- `PUT /api/visiteurs/{{visiteur_id}}` - Mettre à jour un visiteur
- `GET /api/visiteurs/{{visiteur_id}}` - Récupérer un visiteur
- `DELETE /api/visiteurs/{{visiteur_id}}` - Supprimer un visiteur
- `GET /api/visites/visiteur/{{visiteur_id}}` - Récupérer les visites d'un visiteur

---

### 🏥 Variables Praticien

#### Identifiant
| Variable | Valeur initiale | Description |
|----------|-----------------|-------------|
| `praticien_id` | *(vide)* | ID MongoDB du praticien (à remplir après création) |

#### Données de création
| Variable | Valeur par défaut | Description |
|----------|-------------------|-------------|
| `praticien_nom` | `Martin` | Nom du praticien |
| `praticien_prenom` | `Sophie` | Prénom du praticien |
| `praticien_tel` | `0145678901` | Téléphone du praticien |
| `praticien_email` | `sophie.martin@medecin.fr` | Email du praticien (doit être unique) |
| `praticien_rue` | `12 Rue de la Santé` | Adresse du praticien |
| `praticien_code_postal` | `75014` | Code postal |
| `praticien_ville` | `Paris` | Ville du praticien |

**Exemple d'utilisation dans une requête POST :**
```json
{
  "nom": "{{praticien_nom}}",
  "prenom": "{{praticien_prenom}}",
  "tel": "{{praticien_tel}}",
  "email": "{{praticien_email}}",
  "rue": "{{praticien_rue}}",
  "code_postal": "{{praticien_code_postal}}",
  "ville": "{{praticien_ville}}"
}
```

**Requêtes concernées :**
- `POST /api/praticiens` - Créer un praticien
- `PUT /api/praticiens/{{praticien_id}}` - Mettre à jour un praticien
- `GET /api/praticiens/{{praticien_id}}` - Récupérer un praticien
- `DELETE /api/praticiens/{{praticien_id}}` - Supprimer un praticien
- `GET /api/praticiens/ville/{{ville_search}}` - Rechercher par ville
- `GET /api/visites/praticien/{{praticien_id}}` - Récupérer les visites d'un praticien

---

### 🎯 Variables Motif

#### Identifiant
| Variable | Valeur initiale | Description |
|----------|-----------------|-------------|
| `motif_id` | *(vide)* | ID MongoDB du motif (à remplir après création) |

#### Données de création
| Variable | Valeur par défaut | Description |
|----------|-------------------|-------------|
| `motif_libelle` | `Présentation de produits` | Libellé du motif (doit être unique) |

**Exemple d'utilisation dans une requête POST :**
```json
{
  "libelle": "{{motif_libelle}}"
}
```

**Requêtes concernées :**
- `POST /api/motifs` - Créer un motif
- `PUT /api/motifs/{{motif_id}}` - Mettre à jour un motif
- `GET /api/motifs/{{motif_id}}` - Récupérer un motif
- `DELETE /api/motifs/{{motif_id}}` - Supprimer un motif
- `GET /api/visites/motif/{{motif_id}}` - Récupérer les visites par motif

---

### 📅 Variables Visite

#### Identifiant
| Variable | Valeur initiale | Description |
|----------|-----------------|-------------|
| `visite_id` | *(vide)* | ID MongoDB de la visite (à remplir après création) |

#### Données de création
| Variable | Valeur par défaut | Description |
|----------|-------------------|-------------|
| `visite_date` | `2024-03-15T14:30:00.000Z` | Date et heure de la visite (format ISO 8601) |
| `visite_commentaire` | `Présentation des nouveaux produits pharmaceutiques` | Commentaire de la visite |

**Exemple d'utilisation dans une requête POST :**
```json
{
  "date_visite": "{{visite_date}}",
  "commentaire": "{{visite_commentaire}}",
  "visiteur": "{{visiteur_id}}",
  "praticien": "{{praticien_id}}",
  "motif": "{{motif_id}}"
}
```

**Requêtes concernées :**
- `POST /api/visites` - Créer une visite
- `PUT /api/visites/{{visite_id}}` - Mettre à jour une visite
- `GET /api/visites/{{visite_id}}` - Récupérer une visite
- `DELETE /api/visites/{{visite_id}}` - Supprimer une visite

---

### 🔍 Variables de Recherche

| Variable | Valeur par défaut | Description |
|----------|-------------------|-------------|
| `search_term` | `dupont` | Terme de recherche générique |
| `ville_search` | `Paris` | Ville pour rechercher des praticiens |
| `date_start` | `2024-01-01` | Date de début pour filtre par période |
| `date_end` | `2024-12-31` | Date de fin pour filtre par période |

**Requêtes concernées :**
- `GET /api/visiteurs/search?q={{search_term}}` - Rechercher des visiteurs
- `GET /api/praticiens/search?q={{search_term}}` - Rechercher des praticiens
- `GET /api/motifs/search?q={{search_term}}` - Rechercher des motifs
- `GET /api/praticiens/ville/{{ville_search}}` - Praticiens par ville
- `GET /api/visites/date-range?startDate={{date_start}}&endDate={{date_end}}` - Visites par période

---

## Workflow de Test avec Variables

### Étape 1 : Créer les données de base

#### 1.1 Créer un motif
```
POST {{base_url}}/api/motifs
Body: {"libelle": "{{motif_libelle}}"}
```
**→ Copiez l'ID retourné dans la variable `motif_id`**

#### 1.2 Créer un visiteur
```
POST {{base_url}}/api/visiteurs
Body: {
  "nom": "{{visiteur_nom}}",
  "prenom": "{{visiteur_prenom}}",
  "tel": "{{visiteur_tel}}",
  "email": "{{visiteur_email}}",
  "date_embauche": "{{visiteur_date_embauche}}"
}
```
**→ Copiez l'ID retourné dans la variable `visiteur_id`**

#### 1.3 Créer un praticien
```
POST {{base_url}}/api/praticiens
Body: {
  "nom": "{{praticien_nom}}",
  "prenom": "{{praticien_prenom}}",
  "tel": "{{praticien_tel}}",
  "email": "{{praticien_email}}",
  "rue": "{{praticien_rue}}",
  "code_postal": "{{praticien_code_postal}}",
  "ville": "{{praticien_ville}}"
}
```
**→ Copiez l'ID retourné dans la variable `praticien_id`**

### Étape 2 : Créer une visite

```
POST {{base_url}}/api/visites
Body: {
  "date_visite": "{{visite_date}}",
  "commentaire": "{{visite_commentaire}}",
  "visiteur": "{{visiteur_id}}",
  "praticien": "{{praticien_id}}",
  "motif": "{{motif_id}}"
}
```
**→ Copiez l'ID retourné dans la variable `visite_id`**

### Étape 3 : Tester les requêtes de recherche

Maintenant vous pouvez utiliser toutes les requêtes de recherche :

```
GET {{base_url}}/api/visites/visiteur/{{visiteur_id}}
GET {{base_url}}/api/visites/praticien/{{praticien_id}}
GET {{base_url}}/api/visites/motif/{{motif_id}}
GET {{base_url}}/api/visites/date-range?startDate={{date_start}}&endDate={{date_end}}
```

---

## Comment Copier un ID Automatiquement

### Méthode manuelle
1. Exécutez une requête POST (ex: créer un visiteur)
2. Dans la réponse, copiez la valeur de `data._id`
3. Allez dans **Environments** → **GSB Local Environment**
4. Collez la valeur dans la variable correspondante (ex: `visiteur_id`)

### Méthode automatique avec script (avancé)

Ajoutez ce script dans l'onglet **Tests** de votre requête POST :

**Pour Créer un visiteur :**
```javascript
var jsonData = pm.response.json();
if (jsonData.success && jsonData.data._id) {
    pm.environment.set("visiteur_id", jsonData.data._id);
    console.log("visiteur_id saved: " + jsonData.data._id);
}
```

**Pour Créer un praticien :**
```javascript
var jsonData = pm.response.json();
if (jsonData.success && jsonData.data._id) {
    pm.environment.set("praticien_id", jsonData.data._id);
    console.log("praticien_id saved: " + jsonData.data._id);
}
```

**Pour Créer un motif :**
```javascript
var jsonData = pm.response.json();
if (jsonData.success && jsonData.data._id) {
    pm.environment.set("motif_id", jsonData.data._id);
    console.log("motif_id saved: " + jsonData.data._id);
}
```

**Pour Créer une visite :**
```javascript
var jsonData = pm.response.json();
if (jsonData.success && jsonData.data._id) {
    pm.environment.set("visite_id", jsonData.data._id);
    console.log("visite_id saved: " + jsonData.data._id);
}
```

Avec ces scripts, les IDs seront automatiquement sauvegardés dans les variables d'environnement après chaque création !

---

## Récapitulatif des Variables par Classe

### 📦 Classe Visiteur
```
Variables d'ID:
- visiteur_id

Variables de données:
- visiteur_nom
- visiteur_prenom
- visiteur_tel
- visiteur_email
- visiteur_date_embauche
```

### 📦 Classe Praticien
```
Variables d'ID:
- praticien_id

Variables de données:
- praticien_nom
- praticien_prenom
- praticien_tel
- praticien_email
- praticien_rue
- praticien_code_postal
- praticien_ville
```

### 📦 Classe Motif
```
Variables d'ID:
- motif_id

Variables de données:
- motif_libelle
```

### 📦 Classe Visite
```
Variables d'ID:
- visite_id

Variables de données:
- visite_date
- visite_commentaire

Variables de référence (requises):
- visiteur_id
- praticien_id
- motif_id
```

### 📦 Variables de Recherche Globales
```
- search_term (pour recherches textuelles)
- ville_search (pour recherche par ville)
- date_start (pour filtres de date)
- date_end (pour filtres de date)
```

---

## Exemples de Requêtes avec Variables

### Exemple 1 : Créer un visiteur
```http
POST {{base_url}}/api/visiteurs
Content-Type: application/json

{
  "nom": "{{visiteur_nom}}",
  "prenom": "{{visiteur_prenom}}",
  "tel": "{{visiteur_tel}}",
  "email": "{{visiteur_email}}",
  "date_embauche": "{{visiteur_date_embauche}}"
}
```

### Exemple 2 : Rechercher un praticien par ville
```http
GET {{base_url}}/api/praticiens/ville/{{ville_search}}
```

### Exemple 3 : Récupérer les visites d'un visiteur
```http
GET {{base_url}}/api/visites/visiteur/{{visiteur_id}}
```

### Exemple 4 : Créer une visite complète
```http
POST {{base_url}}/api/visites
Content-Type: application/json

{
  "date_visite": "{{visite_date}}",
  "commentaire": "{{visite_commentaire}}",
  "visiteur": "{{visiteur_id}}",
  "praticien": "{{praticien_id}}",
  "motif": "{{motif_id}}"
}
```

### Exemple 5 : Filtrer les visites par période
```http
GET {{base_url}}/api/visites/date-range?startDate={{date_start}}&endDate={{date_end}}
```

---

## Tips & Astuces

### 1. Changer facilement de données de test
Modifiez les valeurs des variables pour créer différents jeux de données :
- Changez `visiteur_email` pour créer plusieurs visiteurs
- Changez `praticien_ville` pour tester différentes villes
- Changez `motif_libelle` pour créer différents motifs

### 2. Variables multiples pour tests avancés
Vous pouvez créer plusieurs variables pour tester plusieurs entités :
- `visiteur_id_1`, `visiteur_id_2`, `visiteur_id_3`
- `praticien_id_paris`, `praticien_id_lyon`

### 3. Dates dynamiques
Pour générer des dates dynamiques, utilisez les scripts Postman :
```javascript
// Date actuelle
pm.environment.set("visite_date", new Date().toISOString());

// Date dans 7 jours
var futureDate = new Date();
futureDate.setDate(futureDate.getDate() + 7);
pm.environment.set("visite_date", futureDate.toISOString());
```

---

## Troubleshooting

### Problème : "visiteur_id is required"
**Solution :** Assurez-vous d'avoir d'abord créé un visiteur et copié son ID dans la variable `visiteur_id`.

### Problème : "Email already exists"
**Solution :** Changez la valeur de `visiteur_email` ou `praticien_email` dans les variables d'environnement.

### Problème : Variables non remplacées (affichage de {{variable}})
**Solution :** Vérifiez que l'environnement "GSB Local Environment" est bien sélectionné dans le menu déroulant en haut à droite de Postman.

### Problème : "Visiteur non trouvé"
**Solution :** L'ID dans la variable `visiteur_id` n'existe plus ou est incorrect. Créez un nouveau visiteur.

---

## Résumé : Ordre de Création Recommandé

1. **Créer des motifs** (indépendants)
2. **Créer des visiteurs** (indépendants)
3. **Créer des praticiens** (indépendants)
4. **Créer des visites** (nécessite visiteur_id, praticien_id, motif_id)

Une fois ces données créées et les IDs sauvegardés, vous pouvez tester toutes les requêtes de recherche et de filtrage !

---

**Bon test avec Postman ! 🚀**
