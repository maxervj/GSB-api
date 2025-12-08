import { PortefeuilleService } from '../../modules/portefeuille/portefeuille.service.js';

/**
 * Controller pour gérer les opérations sur les portefeuilles de praticiens
 */
export class PortefeuilleController {
  private portefeuilleService: PortefeuilleService;

  constructor() {
    this.portefeuilleService = new PortefeuilleService();
  }

  /**
   * Récupère le portefeuille complet d'un visiteur
   * GET /api/portefeuilles/visiteur/:visiteurId
   */
  async getPortefeuilleByVisiteur(req: any, res: any) {
    try {
      const { visiteurId } = req.params;
      const { statut } = req.query;

      // Vérifier si le visiteur existe
      const visiteurExists = await this.portefeuilleService.visiteurExists(visiteurId);
      if (!visiteurExists) {
        res.status(404).json({
          success: false,
          message: 'Visiteur non trouvé'
        });
        return;
      }

      const portefeuille = await this.portefeuilleService.getPortefeuilleByVisiteur(
        visiteurId,
        statut
      );

      res.status(200).json({
        success: true,
        count: portefeuille.length,
        data: portefeuille
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la récupération du portefeuille',
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      });
    }
  }

  /**
   * Récupère un élément spécifique du portefeuille
   * GET /api/portefeuilles/:id
   */
  async getPortefeuilleById(req: any, res: any) {
    try {
      const { id } = req.params;

      const item = await this.portefeuilleService.getPortefeuilleById(id);

      if (!item) {
        res.status(404).json({
          success: false,
          message: 'Élément du portefeuille non trouvé'
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: item
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la récupération de l\'élément',
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      });
    }
  }

  /**
   * Ajoute un praticien au portefeuille d'un visiteur
   * POST /api/portefeuilles
   */
  async addPraticienToPortefeuille(req: any, res: any) {
    try {
      const { visiteur, praticien, notes, priorite } = req.body;

      // Validation des champs requis
      if (!visiteur || !praticien) {
        res.status(400).json({
          success: false,
          message: 'Le visiteur et le praticien sont requis'
        });
        return;
      }

      // Vérifier si le visiteur existe
      const visiteurExists = await this.portefeuilleService.visiteurExists(visiteur);
      if (!visiteurExists) {
        res.status(404).json({
          success: false,
          message: 'Visiteur non trouvé'
        });
        return;
      }

      // Vérifier si le praticien existe
      const praticienExists = await this.portefeuilleService.praticienExists(praticien);
      if (!praticienExists) {
        res.status(404).json({
          success: false,
          message: 'Praticien non trouvé'
        });
        return;
      }

      // Vérifier si le praticien est déjà dans le portefeuille
      const alreadyExists = await this.portefeuilleService.praticienExistsInPortefeuille(
        visiteur,
        praticien
      );

      if (alreadyExists) {
        res.status(409).json({
          success: false,
          message: 'Ce praticien est déjà dans le portefeuille de ce visiteur'
        });
        return;
      }

      // Ajouter le praticien au portefeuille
      const newItem = await this.portefeuilleService.addPraticienToPortefeuille({
        visiteur,
        praticien,
        notes,
        priorite: priorite || 'normale'
      });

      res.status(201).json({
        success: true,
        message: 'Praticien ajouté au portefeuille avec succès',
        data: newItem
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erreur lors de l\'ajout du praticien au portefeuille',
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      });
    }
  }

  /**
   * Met à jour un élément du portefeuille
   * PUT /api/portefeuilles/:id
   */
  async updatePortefeuille(req: any, res: any) {
    try {
      const { id } = req.params;
      const { notes, priorite, statut } = req.body;

      const updatedItem = await this.portefeuilleService.updatePortefeuille(id, {
        notes,
        priorite,
        statut
      });

      if (!updatedItem) {
        res.status(404).json({
          success: false,
          message: 'Élément du portefeuille non trouvé'
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Portefeuille mis à jour avec succès',
        data: updatedItem
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la mise à jour du portefeuille',
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      });
    }
  }

  /**
   * Retire un praticien du portefeuille
   * DELETE /api/portefeuilles/:id
   */
  async removePraticienFromPortefeuille(req: any, res: any) {
    try {
      const { id } = req.params;

      const deletedItem = await this.portefeuilleService.removePraticienFromPortefeuille(id);

      if (!deletedItem) {
        res.status(404).json({
          success: false,
          message: 'Élément du portefeuille non trouvé'
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Praticien retiré du portefeuille avec succès',
        data: deletedItem
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la suppression du praticien du portefeuille',
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      });
    }
  }

  /**
   * Récupère les praticiens par priorité pour un visiteur
   * GET /api/portefeuilles/visiteur/:visiteurId/priorite/:priorite
   */
  async getPortefeuilleByPriorite(req: any, res: any) {
    try {
      const { visiteurId, priorite } = req.params;

      // Vérifier si le visiteur existe
      const visiteurExists = await this.portefeuilleService.visiteurExists(visiteurId);
      if (!visiteurExists) {
        res.status(404).json({
          success: false,
          message: 'Visiteur non trouvé'
        });
        return;
      }

      // Valider la priorité
      if (!['basse', 'normale', 'haute'].includes(priorite)) {
        res.status(400).json({
          success: false,
          message: 'Priorité invalide. Valeurs acceptées : basse, normale, haute'
        });
        return;
      }

      const portefeuille = await this.portefeuilleService.getPortefeuilleByPriorite(
        visiteurId,
        priorite
      );

      res.status(200).json({
        success: true,
        count: portefeuille.length,
        data: portefeuille
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la récupération du portefeuille par priorité',
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      });
    }
  }

  /**
   * Récupère les statistiques du portefeuille d'un visiteur
   * GET /api/portefeuilles/visiteur/:visiteurId/stats
   */
  async getPortefeuilleStats(req: any, res: any) {
    try {
      const { visiteurId } = req.params;

      // Vérifier si le visiteur existe
      const visiteurExists = await this.portefeuilleService.visiteurExists(visiteurId);
      if (!visiteurExists) {
        res.status(404).json({
          success: false,
          message: 'Visiteur non trouvé'
        });
        return;
      }

      const stats = await this.portefeuilleService.getPortefeuilleStats(visiteurId);

      res.status(200).json({
        success: true,
        data: stats
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la récupération des statistiques',
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      });
    }
  }

  /**
   * Change le statut d'un praticien dans le portefeuille (actif/inactif)
   * PATCH /api/portefeuilles/:id/toggle-statut
   */
  async toggleStatutPortefeuille(req: any, res: any) {
    try {
      const { id } = req.params;

      const updatedItem = await this.portefeuilleService.toggleStatutPortefeuille(id);

      if (!updatedItem) {
        res.status(404).json({
          success: false,
          message: 'Élément du portefeuille non trouvé'
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Statut modifié avec succès',
        data: updatedItem
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erreur lors du changement de statut',
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      });
    }
  }
}
