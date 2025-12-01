import { type Request, type Response } from 'express';
import { Visiteur } from '../models/Visiteur.js';

/**
 * Controller pour gérer les opérations CRUD sur les visiteurs
 */
export class VisiteurController {
  /**
   * Récupère tous les visiteurs
   */
  async getAllVisiteurs(req: Request, res: Response): Promise<void> {
    try {
      const visiteurs = await Visiteur.find()
        .populate('visites')
        .sort({ nom: 1, prenom: 1 });

      res.status(200).json({
        success: true,
        count: visiteurs.length,
        data: visiteurs
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la récupération des visiteurs',
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      });
    }
  }

  /**
   * Récupère un visiteur par son ID
   */
  async getVisiteurById(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const visiteur = await Visiteur.findById(id).populate('visites');

      if (!visiteur) {
        res.status(404).json({
          success: false,
          message: 'Visiteur non trouvé'
        });
        return;
      }

      res.status(200).json({
        success: true,
        data: visiteur
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la récupération du visiteur',
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      });
    }
  }

  /**
   * Crée un nouveau visiteur
   */
  async createVisiteur(req: Request, res: Response): Promise<void> {
    try {
      const { nom, prenom, tel, email, date_embauche } = req.body;

      // Vérifier si l'email existe déjà
      const existingVisiteur = await Visiteur.findOne({ email });
      if (existingVisiteur) {
        res.status(400).json({
          success: false,
          message: 'Un visiteur avec cet email existe déjà'
        });
        return;
      }

      const visiteur = await Visiteur.create({
        nom,
        prenom,
        tel,
        email,
        date_embauche
      });

      res.status(201).json({
        success: true,
        message: 'Visiteur créé avec succès',
        data: visiteur
      });
    } catch (error) {
      res.status(400).json({
        success: false,
        message: 'Erreur lors de la création du visiteur',
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      });
    }
  }

  

  /**
   * Supprime un visiteur
   */
  async deleteVisiteur(req: Request, res: Response): Promise<void> {
    try {
      const { id } = req.params;
      const visiteur = await Visiteur.findByIdAndDelete(id);

      if (!visiteur) {
        res.status(404).json({
          success: false,
          message: 'Visiteur non trouvé'
        });
        return;
      }

      res.status(200).json({
        success: true,
        message: 'Visiteur supprimé avec succès',
        data: visiteur
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la suppression du visiteur',
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      });
    }
  }

  /**
   * Recherche des visiteurs par nom ou prénom
   */
  async searchVisiteurs(req: Request, res: Response): Promise<void> {
    try {
      const { q } = req.query;

      if (!q || typeof q !== 'string') {
        res.status(400).json({
          success: false,
          message: 'Paramètre de recherche manquant'
        });
        return;
      }

      const visiteurs = await Visiteur.find({
        $or: [
          { nom: { $regex: q, $options: 'i' } },
          { prenom: { $regex: q, $options: 'i' } },
          { email: { $regex: q, $options: 'i' } }
        ]
      }).sort({ nom: 1, prenom: 1 });

      res.status(200).json({
        success: true,
        count: visiteurs.length,
        data: visiteurs
      });
    } catch (error) {
      res.status(500).json({
        success: false,
        message: 'Erreur lors de la recherche des visiteurs',
        error: error instanceof Error ? error.message : 'Erreur inconnue'
      });
    }
  }
}
