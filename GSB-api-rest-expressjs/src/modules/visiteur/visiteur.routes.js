import { Router } from 'express';
import { VisiteurController } from '../../Controller/visiteur.controller.js';
const router = Router();
const visiteurController = new VisiteurController();
/**
 * Routes pour les visiteurs
 */
// GET /api/visiteurs - Récupère tous les visiteurs
router.get('/', (req, res) => visiteurController.getAllVisiteurs(req, res));
// GET /api/visiteurs/search - Recherche des visiteurs
router.get('/search', (req, res) => visiteurController.searchVisiteurs(req, res));
// GET /api/visiteurs/nom/:nom - Récupère les visiteurs par nom
router.get('/nom/:nom', (req, res) => visiteurController.getVisiteurByName(req, res));
// GET /api/visiteurs/email/:email - Récupère un visiteur par email
router.get('/email/:email', (req, res) => visiteurController.getVisiteurByEmail(req, res));
// GET /api/visiteurs/tel/:tel - Récupère les visiteurs par téléphone
router.get('/tel/:tel', (req, res) => visiteurController.getVisiteurByTel(req, res));
// GET /api/visiteurs/annee/:year - Récupère les visiteurs par année d'embauche
router.get('/annee/:year', (req, res) => visiteurController.getVisiteursByDateEmbauche(req, res));
// GET /api/visiteurs/:id - Récupère un visiteur par ID
router.get('/:id', (req, res) => visiteurController.getVisiteurById(req, res));
// POST /api/visiteurs - Crée un nouveau visiteur
router.post('/', (req, res) => visiteurController.createVisiteur(req, res));
// PUT /api/visiteurs/:id - Met à jour un visiteur
router.put('/:id', (req, res) => visiteurController.updateVisiteur(req, res));
// DELETE /api/visiteurs/:id - Supprime un visiteur
router.delete('/:id', (req, res) => visiteurController.deleteVisiteur(req, res));
export default router;
