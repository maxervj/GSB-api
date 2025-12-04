# Guide Collection Postman avec Données Aléatoires

## 📋 Description

Cette collection Postman génère **automatiquement des données aléatoires** pour toutes les requêtes POST. Chaque fois que vous cliquez sur "Send" pour créer un visiteur, praticien, motif ou visite, de nouvelles données uniques sont générées.

## 🚀 Installation

1. Ouvrez Postman
2. Cliquez sur **"Import"**
3. Sélectionnez le fichier **`GSB-API-Random.postman_collection.json`**
4. Importez également l'environnement **`GSB-Local.postman_environment.json`**
5. Sélectionnez l'environnement "GSB Local Environment" dans le menu déroulant

## ✨ Fonctionnalités Automatiques

### 🎲 Génération Aléatoire

Chaque requête POST génère automatiquement :

#### Visiteurs
- **Nom** : Choisi parmi 20 noms français
- **Prénom** : Choisi parmi 20 prénoms français
- **Téléphone** : Numéro mobile aléatoire (06XXXXXXXX)
- **Email** : Format `prenom.nom[nombre]@gsb.fr` (unique)
- **Date d'embauche** : Entre 2020 et 2024

**Exemple généré :**
```json
{
  "nom": "Dupont",
  "prenom": "Jean",
  "tel": "0612345678",
  "email": "jean.dupont3847@gsb.fr",
  "date_embauche": "2022-07-15"
}
```

#### Praticiens
- **Nom** : Choisi parmi 20 noms français
- **Prénom** : Choisi parmi 20 prénoms français
- **Téléphone** : Numéro fixe aléatoire (01XXXXXXXX)
- **Email** : Format `dr.prenom.nom[nombre]@medecin.fr` (unique)
- **Rue** : Numéro + nom de rue aléatoire
- **Code postal** : Correspondant à la ville
- **Ville** : Parmi 10 grandes villes françaises (Paris, Lyon, Marseille, etc.)

**Exemple généré :**
```json
{
  "nom": "Martin",
  "prenom": "Sophie",
  "tel": "0145678901",
  "email": "dr.sophie.martin2156@medecin.fr",
  "rue": "42 Avenue Victor Hugo",
  "code_postal": "75001",
  "ville": "Paris"
}
```

#### Motifs
- **Libellé** : Choisi parmi 20 motifs professionnels + numéro unique

**Exemples générés :**
```json
{"libelle": "Présentation de nouveaux produits #3847"}
{"libelle": "Formation professionnelle #9201"}
{"libelle": "Démonstration technique #5672"}
```

#### Visites
- **Date** : Aléatoire dans les 6 derniers mois
- **Heure** : Entre 9h et 18h
- **Commentaire** : Choisi parmi 15 commentaires professionnels
- **Visiteur/Praticien/Motif** : Utilise les IDs sauvegardés

**Exemple généré :**
```json
{
  "date_visite": "2024-09-15T14:30:00.000Z",
  "commentaire": "Présentation des nouveaux produits pharmaceutiques",
  "visiteur": "507f1f77bcf86cd799439011",
  "praticien": "507f1f77bcf86cd799439012",
  "motif": "507f1f77bcf86cd799439013"
}
```

### 💾 Sauvegarde Automatique des IDs

Après chaque création réussie, l'ID de l'entité créée est **automatiquement sauvegardé** dans les variables d'environnement :

- Créer un visiteur → `visiteur_id` sauvegardé automatiquement
- Créer un praticien → `praticien_id` sauvegardé automatiquement
- Créer un motif → `motif_id` sauvegardé automatiquement
- Créer une visite → `visite_id` sauvegardé automatiquement

Vous pouvez voir les messages de confirmation dans la **Console Postman** (View → Show Postman Console).

## 📝 Workflow de Test Recommandé

### Option 1 : Workflow Simple

```
1. Créer un motif (Aléatoire)           → motif_id sauvegardé
2. Créer un visiteur (Aléatoire)        → visiteur_id sauvegardé
3. Créer un praticien (Aléatoire)       → praticien_id sauvegardé
4. Créer une visite (Aléatoire)         → visite_id sauvegardé
5. Tester toutes les requêtes GET       → Utilise les IDs sauvegardés
```

### Option 2 : Créer Plusieurs Entités

Vous pouvez exécuter plusieurs fois la même requête POST pour créer plusieurs entités avec des données différentes :

```
1. Créer un motif (Aléatoire) × 5 fois     → 5 motifs créés
2. Créer un visiteur (Aléatoire) × 10 fois → 10 visiteurs créés
3. Créer un praticien (Aléatoire) × 8 fois → 8 praticiens créés
4. Créer une visite (Aléatoire) × 20 fois  → 20 visites créées
```

**Note :** À chaque exécution, seul le dernier ID créé est sauvegardé dans les variables d'environnement.

## 🔍 Console Postman - Messages de Log

Ouvrez la console Postman (**View → Show Postman Console**) pour voir les logs détaillés :

### Logs lors de la création

**Visiteur :**
```
Visiteur généré: Jean Dupont - jean.dupont3847@gsb.fr
✅ Visiteur créé avec ID: 507f1f77bcf86cd799439011
```

**Praticien :**
```
Praticien généré: Dr Sophie Martin - Paris - dr.sophie.martin2156@medecin.fr
✅ Praticien créé avec ID: 507f1f77bcf86cd799439012
```

**Motif :**
```
Motif généré: Présentation de nouveaux produits #3847
✅ Motif créé avec ID: 507f1f77bcf86cd799439013
```

**Visite :**
```
Visite générée: 2024-09-15T14:30:00.000Z - Présentation des nouveaux produits pharmaceutiques
✅ Visite créée avec ID: 507f1f77bcf86cd799439014
```

## 📊 Données Générées - Détails

### Visiteurs - Données Sources

**20 Noms :** Dupont, Martin, Bernard, Thomas, Robert, Petit, Durand, Leroy, Moreau, Simon, Laurent, Lefebvre, Michel, Garcia, David, Bertrand, Roux, Vincent, Fournier, Morel

**20 Prénoms :** Jean, Marie, Pierre, Sophie, Luc, Anne, Michel, Claire, François, Isabelle, Jacques, Nathalie, Philippe, Sylvie, Alain, Catherine, Christophe, Martine, Thierry, Monique

**Format Email :** `prenom.nom[1-9999]@gsb.fr`

**Téléphone :** `06[00000000-99999999]`

**Date d'embauche :** Date aléatoire entre le 01/01/2020 et le 31/12/2024

### Praticiens - Données Sources

**20 Noms :** Martin, Dubois, Lefevre, Mercier, Rousseau, Blanc, Guerin, Muller, Henry, Girard, Andre, Roux, Lambert, Bonnet, Faure, Perrin, Clement, Gauthier, Dufour, Robin

**20 Prénoms :** Sophie, Marc, Julie, Antoine, Camille, Nicolas, Laura, Thomas, Emma, Alexandre, Léa, Julien, Chloé, Maxime, Sarah, David, Marion, Benjamin, Lucie, Romain

**10 Villes avec codes postaux :**
- Paris (75001)
- Lyon (69001)
- Marseille (13001)
- Toulouse (31000)
- Nice (06000)
- Nantes (44000)
- Strasbourg (67000)
- Montpellier (34000)
- Bordeaux (33000)
- Lille (59000)

**10 Noms de rues :** Rue de la Santé, Avenue Victor Hugo, Boulevard Haussmann, Rue de la République, Place de la Mairie, Rue Pasteur, Avenue Jean Jaurès, Rue Voltaire, Boulevard Gambetta, Rue des Écoles

**Format Rue :** `[1-150] [nom de rue]`

**Format Email :** `dr.prenom.nom[1-9999]@medecin.fr`

**Téléphone :** `01[00000000-99999999]`

### Motifs - Données Sources

**20 Motifs disponibles :**
1. Présentation de nouveaux produits
2. Formation professionnelle
3. Suivi client régulier
4. Démonstration technique
5. Conférence médicale
6. Visite de courtoisie
7. Présentation de résultats d'études
8. Information sur nouvelles thérapies
9. Visite de prospection
10. Remise d'échantillons
11. Discussion protocole thérapeutique
12. Réunion de service
13. Présentation de documentation
14. Enquête de satisfaction
15. Présentation campagne publicitaire
16. Mise à jour catalogue produits
17. Présentation nouveaux traitements
18. Visite post-formation
19. Suivi commercial
20. Présentation matériel médical

**Format :** `[motif] #[1-9999]`

### Visites - Données Sources

**15 Commentaires disponibles :**
1. Présentation des nouveaux produits pharmaceutiques
2. Discussion sur les traitements innovants
3. Remise de documentation technique
4. Suivi du protocole thérapeutique
5. Formation sur les nouveaux dispositifs médicaux
6. Visite de routine et point commercial
7. Présentation des résultats cliniques
8. Discussion sur les effets secondaires
9. Mise à jour sur les nouvelles molécules
10. Démonstration du matériel médical
11. Échange sur les besoins du cabinet
12. Présentation de la gamme complète
13. Visite de suivi post-formation
14. Discussion des cas cliniques
15. Remise d'échantillons gratuits

**Date :** Date et heure aléatoires dans les 6 derniers mois, entre 9h et 18h

## 🎯 Cas d'Usage

### 1. Tests de Charge

Créez rapidement de nombreuses entités pour tester les performances :

```
1. Exécuter "Créer un visiteur (Aléatoire)" 50 fois
2. Exécuter "Créer un praticien (Aléatoire)" 50 fois
3. Exécuter "Créer un motif (Aléatoire)" 10 fois
4. Exécuter "Créer une visite (Aléatoire)" 200 fois
```

### 2. Tests de Recherche

Créez des données variées et testez les fonctions de recherche :

```
1. Créer 20 visiteurs aléatoires
2. Rechercher par nom, prénom ou email
3. Vérifier les résultats
```

### 3. Tests de Filtres

Créez des visites avec différentes dates et testez les filtres :

```
1. Créer 50 visites aléatoires (dates dans les 6 derniers mois)
2. Tester le filtre par période
3. Tester les statistiques
```

### 4. Démonstrations

Créez rapidement un jeu de données réaliste pour une démo :

```
1. Créer 5 motifs
2. Créer 10 visiteurs
3. Créer 15 praticiens dans différentes villes
4. Créer 50 visites
5. Afficher les statistiques
```

## 🔧 Personnalisation

### Modifier les Données Sources

Vous pouvez éditer les scripts Pre-request pour ajouter vos propres données :

1. Dans Postman, sélectionnez une requête POST (ex: "Créer un visiteur (Aléatoire)")
2. Allez dans l'onglet **"Pre-request Script"**
3. Modifiez les tableaux `noms`, `prenoms`, etc.
4. Sauvegardez

**Exemple : Ajouter des noms**
```javascript
const noms = ['Dupont', 'Martin', 'VotreNom1', 'VotreNom2', ...];
```

### Désactiver la Génération Aléatoire

Si vous voulez utiliser des valeurs fixes :

1. Allez dans **Environments** → **GSB Local Environment**
2. Définissez manuellement les valeurs
3. Dans les requêtes POST, décochez l'onglet **"Pre-request Script"**

## 📈 Statistiques de Génération

Avec cette collection, vous pouvez générer :

- **Visiteurs uniques** : ~400 combinaisons nom/prénom × 10000 variations email = 4 millions possibles
- **Praticiens uniques** : ~400 combinaisons × 10 villes × 10000 variations = 40 millions possibles
- **Motifs uniques** : 20 motifs × 10000 numéros = 200,000 possibles
- **Visites uniques** : 15 commentaires × dates infinies = illimité

## ⚠️ Notes Importantes

1. **Emails uniques** : Les emails sont rendus uniques grâce au numéro aléatoire. Si par malchance vous tombez sur le même numéro (1 chance sur 10000), la création échouera avec "Email already exists".

2. **IDs requis pour les visites** : Avant de créer une visite, vous devez avoir au moins un visiteur, un praticien et un motif créés (avec leurs IDs sauvegardés).

3. **Console Postman** : Gardez la console ouverte pour voir les données générées et les IDs sauvegardés.

4. **Variables d'environnement** : Assurez-vous que l'environnement "GSB Local Environment" est bien sélectionné.

## 🎉 Avantages de cette Collection

✅ **Gain de temps** : Plus besoin d'inventer des données manuellement

✅ **Données réalistes** : Noms français, adresses cohérentes, dates pertinentes

✅ **Tests rapides** : Créez des dizaines d'entités en quelques clics

✅ **Automatisation complète** : Génération + sauvegarde des IDs automatique

✅ **Reproductible** : Chaque test génère de nouvelles données uniques

✅ **Console claire** : Logs détaillés de toutes les opérations

## 🚦 Quick Start

```
1. Importer la collection GSB-API-Random.postman_collection.json
2. Importer l'environnement GSB-Local.postman_environment.json
3. Sélectionner l'environnement "GSB Local Environment"
4. Ouvrir la Console Postman (View → Show Postman Console)
5. Exécuter "Créer un motif (Aléatoire)"
6. Exécuter "Créer un visiteur (Aléatoire)"
7. Exécuter "Créer un praticien (Aléatoire)"
8. Exécuter "Créer une visite (Aléatoire)"
9. Profiter ! 🎉
```

## 📞 Dépannage

### Problème : "Email already exists"
**Solution :** Réexécutez simplement la requête, un nouvel email sera généré.

### Problème : "Visiteur non trouvé" lors de création de visite
**Solution :** Créez d'abord un visiteur, un praticien et un motif.

### Problème : Variables non remplacées
**Solution :** Vérifiez que l'environnement "GSB Local Environment" est sélectionné.

### Problème : IDs non sauvegardés automatiquement
**Solution :** Vérifiez la console Postman pour voir les erreurs. Assurez-vous que les scripts "Tests" sont activés.

---

**Bon test avec des données aléatoires ! 🎲🚀**
