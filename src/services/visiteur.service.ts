import { Types } from 'mongoose';
import { Visiteur, type IVisiteur } from '../models/Visiteur.js';
import { Praticien, type IPraticien } from '../models/Praticien.js';

/**
 * Service pour gérer la logique métier des visiteurs
 */
export class VisiteurService {
  /**
   * Ajoute un praticien au portefeuille d'un visiteur
   * @param visiteurId - L'ID du visiteur
   * @param praticienId - L'ID du praticien à ajouter
   * @returns Le visiteur mis à jour avec son portefeuille
   */
  public async addPraticienToPortefeuille(
    visiteurId: string,
    praticienId: string
  ): Promise<IVisiteur> {
    // Validation des IDs
    if (!Types.ObjectId.isValid(visiteurId) || !Types.ObjectId.isValid(praticienId)) {
      throw new Error('ID visiteur ou praticien invalide');
    }

    // Vérifier que le praticien existe
    const praticien = await Praticien.findById(praticienId).select('_id').lean();
    if (!praticien) {
      throw new Error(`Praticien avec l'ID ${praticienId} introuvable`);
    }

    // Ajouter le praticien au portefeuille (évite les doublons avec $addToSet)
    const visiteurUpdated = await Visiteur.findByIdAndUpdate(
      visiteurId,
      { $addToSet: { portefeuillePraticiens: praticienId } },
      { new: true, runValidators: true }
    ).populate('portefeuillePraticiens');

    if (!visiteurUpdated) {
      throw new Error(`Visiteur avec l'ID ${visiteurId} introuvable`);
    }

    return visiteurUpdated;
  }

  /**
   * Récupère le portefeuille de praticiens d'un visiteur
   * @param visiteurId - L'ID du visiteur
   * @returns Le tableau des praticiens du portefeuille
   */
  public async getPortefeuillePraticiens(visiteurId: string): Promise<IPraticien[]> {
    // Validation de l'ID
    if (!Types.ObjectId.isValid(visiteurId)) {
      throw new Error('ID visiteur invalide');
    }

    // Rechercher le visiteur et populer son portefeuille
    const visiteur = await Visiteur.findById(visiteurId).populate('portefeuillePraticiens');

    if (!visiteur) {
      throw new Error(`Visiteur avec l'ID ${visiteurId} introuvable`);
    }

    // Retourner uniquement le tableau des praticiens
    return visiteur.portefeuillePraticiens as unknown as IPraticien[];
  }
}
