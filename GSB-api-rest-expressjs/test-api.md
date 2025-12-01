# Tests API Visiteurs

## 1. Créer des visiteurs

### Visiteur 1 - Jean Dupont
```bash
curl -X POST http://localhost:3005/api/visiteurs \
  -H "Content-Type: application/json" \
  -d "{\"nom\":\"Dupont\",\"prenom\":\"Jean\",\"tel\":\"0612345678\",\"email\":\"jean.dupont@gsb.fr\",\"date_embauche\":\"2020-01-15\"}"
```

### Visiteur 2 - Sophie Martin
```bash
curl -X POST http://localhost:3005/api/visiteurs \
  -H "Content-Type: application/json" \
  -d "{\"nom\":\"Martin\",\"prenom\":\"Sophie\",\"tel\":\"0623456789\",\"email\":\"sophie.martin@gsb.fr\",\"date_embauche\":\"2019-03-20\"}"
```

### Visiteur 3 - Pierre Bernard
```bash
curl -X POST http://localhost:3005/api/visiteurs \
  -H "Content-Type: application/json" \
  -d "{\"nom\":\"Bernard\",\"prenom\":\"Pierre\",\"tel\":\"0634567890\",\"email\":\"pierre.bernard@gsb.fr\",\"date_embauche\":\"2021-06-10\"}"
```

### Visiteur 4 - Marie Dubois
```bash
curl -X POST http://localhost:3005/api/visiteurs \
  -H "Content-Type: application/json" \
  -d "{\"nom\":\"Dubois\",\"prenom\":\"Marie\",\"tel\":\"0645678901\",\"email\":\"marie.dubois@gsb.fr\",\"date_embauche\":\"2018-11-05\"}"
```

### Visiteur 5 - Lucas Thomas
```bash
curl -X POST http://localhost:3005/api/visiteurs \
  -H "Content-Type: application/json" \
  -d "{\"nom\":\"Thomas\",\"prenom\":\"Lucas\",\"tel\":\"0656789012\",\"email\":\"lucas.thomas@gsb.fr\",\"date_embauche\":\"2022-02-28\"}"
```

## 2. Récupérer tous les visiteurs
```bash
curl http://localhost:3005/api/visiteurs
```

## 3. Rechercher des visiteurs
```bash
# Rechercher "dupont"
curl "http://localhost:3005/api/visiteurs/search?q=dupont"

# Rechercher "marie"
curl "http://localhost:3005/api/visiteurs/search?q=marie"
```

## 4. Récupérer un visiteur par ID
```bash
# Remplacer {id} par l'ID MongoDB réel
curl http://localhost:3005/api/visiteurs/{id}
```

## 5. Mettre à jour un visiteur
```bash
# Remplacer {id} par l'ID MongoDB réel
curl -X PUT http://localhost:3005/api/visiteurs/{id} \
  -H "Content-Type: application/json" \
  -d "{\"nom\":\"Dupont\",\"prenom\":\"Jean-Claude\",\"tel\":\"0612345678\",\"email\":\"jean.dupont@gsb.fr\",\"date_embauche\":\"2020-01-15\"}"
```

## 6. Supprimer un visiteur
```bash
# Remplacer {id} par l'ID MongoDB réel
curl -X DELETE http://localhost:3005/api/visiteurs/{id}
```

---

## Tests avec PowerShell (Windows)

### Créer un visiteur
```powershell
Invoke-RestMethod -Uri "http://localhost:3005/api/visiteurs" -Method POST -Headers @{"Content-Type"="application/json"} -Body '{"nom":"Dupont","prenom":"Jean","tel":"0612345678","email":"jean.dupont@gsb.fr","date_embauche":"2020-01-15"}'
```

### Récupérer tous les visiteurs
```powershell
Invoke-RestMethod -Uri "http://localhost:3005/api/visiteurs" -Method GET
```

### Rechercher des visiteurs
```powershell
Invoke-RestMethod -Uri "http://localhost:3005/api/visiteurs/search?q=dupont" -Method GET
```

---

## Utilisation avec Postman ou Insomnia

### Configuration de base
- **Base URL**: `http://localhost:3005/api`
- **Headers**: `Content-Type: application/json`

### Endpoints disponibles
1. **GET** `/visiteurs` - Liste tous les visiteurs
2. **GET** `/visiteurs/search?q=terme` - Recherche
3. **GET** `/visiteurs/:id` - Détails d'un visiteur
4. **POST** `/visiteurs` - Créer un visiteur
5. **PUT** `/visiteurs/:id` - Modifier un visiteur
6. **DELETE** `/visiteurs/:id` - Supprimer un visiteur

### Exemple de body pour POST/PUT
```json
{
  "nom": "Dupont",
  "prenom": "Jean",
  "tel": "0612345678",
  "email": "jean.dupont@gsb.fr",
  "date_embauche": "2020-01-15"
}
```
