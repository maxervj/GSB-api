import { Router } from 'express';
import { VisiteController } from '../controllers/visite.controller.js';

const router = Router();
const visiteController = new VisiteController();

/**
 * Routes pour les visites
 */

// GET /api/visites - Récupère toutes les visites
router.get('/', (req, res) => visiteController.getAllVisites(req, res));

// GET /api/visites/stats - Récupère les statistiques des visites
router.get('/stats', (req, res) => visiteController.getVisitesStats(req, res));

// GET /api/visites/date-range - Récupère les visites par période
router.get('/date-range', (req, res) => visiteController.getVisitesByDateRange(req, res));

// GET /api/visites/visiteur/:visiteurId - Récupère les visites d'un visiteur
router.get('/visiteur/:visiteurId', (req, res) => visiteController.getVisitesByVisiteur(req, res));

// GET /api/visites/praticien/:praticienId - Récupère les visites d'un praticien
router.get('/praticien/:praticienId', (req, res) => visiteController.getVisitesByPraticien(req, res));

// GET /api/visites/motif/:motifId - Récupère les visites par motif
router.get('/motif/:motifId', (req, res) => visiteController.getVisitesByMotif(req, res));

// GET /api/visites/:id - Récupère une visite par ID
router.get('/:id', (req, res) => visiteController.getVisiteById(req, res));

// POST /api/visites - Crée une nouvelle visite
router.post('/', (req, res) => visiteController.createVisite(req, res));

// PUT /api/visites/:id - Met à jour une visite
router.put('/:id', (req, res) => visiteController.updateVisite(req, res));

// DELETE /api/visites/:id - Supprime une visite
router.delete('/:id', (req, res) => visiteController.deleteVisite(req, res));

export default router;
