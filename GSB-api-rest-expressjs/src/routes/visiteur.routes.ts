import { Router } from 'express';
import { VisiteurController } from '../controllers/visiteur.controller.js';

const router = Router();
const visiteurController = new VisiteurController();

/**
 * Routes pour les visiteurs
 */

// GET /api/visiteurs - Récupère tous les visiteurs
router.get('/', (req, res) => visiteurController.getAllVisiteurs(req, res));

// GET /api/visiteurs/search - Recherche des visiteurs
router.get('/search', (req, res) => visiteurController.searchVisiteurs(req, res));

// GET /api/visiteurs/:id - Récupère un visiteur par ID
router.get('/:id', (req, res) => visiteurController.getVisiteurById(req, res));

// POST /api/visiteurs - Crée un nouveau visiteur
router.post('/', (req, res) => visiteurController.createVisiteur(req, res));

// PUT /api/visiteurs/:id - Met à jour un visiteur
router.put('/:id', (req, res) => visiteurController.updateVisiteur(req, res));

// DELETE /api/visiteurs/:id - Supprime un visiteur
router.delete('/:id', (req, res) => visiteurController.deleteVisiteur(req, res));

export default router;
