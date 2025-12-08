import { Router } from 'express';
import { PortefeuilleController } from '../../Controller/portefeuilleController/portefeuille.controller.js';

const router = Router();
const portefeuilleController = new PortefeuilleController();

/**
 * Routes pour les portefeuilles de praticiens
 */

// GET /api/portefeuilles/visiteur/:visiteurId/stats - Récupère les statistiques du portefeuille
router.get(
  '/visiteur/:visiteurId/stats',
  (req, res) => portefeuilleController.getPortefeuilleStats(req, res)
);

// GET /api/portefeuilles/visiteur/:visiteurId/priorite/:priorite - Récupère les praticiens par priorité
router.get(
  '/visiteur/:visiteurId/priorite/:priorite',
  (req, res) => portefeuilleController.getPortefeuilleByPriorite(req, res)
);

// GET /api/portefeuilles/visiteur/:visiteurId - Récupère le portefeuille d'un visiteur
router.get(
  '/visiteur/:visiteurId',
  (req, res) => portefeuilleController.getPortefeuilleByVisiteur(req, res)
);

// GET /api/portefeuilles/:id - Récupère un élément spécifique du portefeuille
router.get(
  '/:id',
  (req, res) => portefeuilleController.getPortefeuilleById(req, res)
);

// POST /api/portefeuilles - Ajoute un praticien au portefeuille d'un visiteur
router.post(
  '/',
  (req, res) => portefeuilleController.addPraticienToPortefeuille(req, res)
);

// PUT /api/portefeuilles/:id - Met à jour un élément du portefeuille
router.put(
  '/:id',
  (req, res) => portefeuilleController.updatePortefeuille(req, res)
);

// PATCH /api/portefeuilles/:id/toggle-statut - Change le statut (actif/inactif)
router.patch(
  '/:id/toggle-statut',
  (req, res) => portefeuilleController.toggleStatutPortefeuille(req, res)
);

// DELETE /api/portefeuilles/:id - Retire un praticien du portefeuille
router.delete(
  '/:id',
  (req, res) => portefeuilleController.removePraticienFromPortefeuille(req, res)
);

export default router;
