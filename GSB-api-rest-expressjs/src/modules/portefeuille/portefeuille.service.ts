import { Types } from 'mongoose';
import { Portefeuille } from './Portefeuille.js';
import { Visiteur } from '../visiteur/Visiteur.js';
import { Praticien } from '../praticien/Praticien.js';

/**
 * Service pour gérer la logique métier des portefeuilles de praticiens
 */
export class PortefeuilleService {
  /**
   * Récupère le portefeuille complet d'un visiteur
   */
  async getPortefeuilleByVisiteur(visiteurId: string, statut?: string) {
    const filter: any = { visiteur: visiteurId };

    if (statut) {
      filter.statut = statut;
    }

    return await Portefeuille.find(filter)
      .populate('praticien')
      .populate('visiteur', 'nom prenom email')
      .sort({ priorite: -1, date_ajout: -1 });
  }

  /**
   * Récupère un élément spécifique du portefeuille
   */
  async getPortefeuilleById(id: string) {
    return await Portefeuille.findById(id)
      .populate('praticien')
      .populate('visiteur', 'nom prenom email');
  }

  /**
   * Vérifie si un visiteur existe
   */
  async visiteurExists(visiteurId: string): Promise<boolean> {
    const visiteur = await Visiteur.findById(visiteurId);
    return visiteur !== null;
  }

  /**
   * Vérifie si un praticien existe
   */
  async praticienExists(praticienId: string): Promise<boolean> {
    const praticien = await Praticien.findById(praticienId);
    return praticien !== null;
  }

  /**
   * Vérifie si un praticien est déjà dans le portefeuille d'un visiteur
   */
  async praticienExistsInPortefeuille(
    visiteurId: string,
    praticienId: string
  ): Promise<boolean> {
    const exists = await Portefeuille.findOne({
      visiteur: visiteurId,
      praticien: praticienId
    });
    return exists !== null;
  }

  /**
   * Ajoute un praticien au portefeuille d'un visiteur
   */
  async addPraticienToPortefeuille(data: {
    visiteur: string;
    praticien: string;
    notes?: string;
    priorite?: 'basse' | 'normale' | 'haute';
  }) {
    return await Portefeuille.create(data);
  }

  /**
   * Met à jour les informations d'un praticien dans le portefeuille
   */
  async updatePortefeuille(
    id: string,
    data: {
      notes?: string;
      priorite?: 'basse' | 'normale' | 'haute';
      statut?: 'actif' | 'inactif';
    }
  ) {
    return await Portefeuille.findByIdAndUpdate(id, data, {
      new: true,
      runValidators: true
    })
      .populate('praticien')
      .populate('visiteur', 'nom prenom email');
  }

  /**
   * Retire un praticien du portefeuille d'un visiteur
   */
  async removePraticienFromPortefeuille(id: string) {
    return await Portefeuille.findByIdAndDelete(id);
  }

  /**
   * Récupère les praticiens par priorité pour un visiteur
   */
  async getPortefeuilleByPriorite(
    visiteurId: string,
    priorite: 'basse' | 'normale' | 'haute'
  ) {
    return await Portefeuille.find({
      visiteur: visiteurId,
      priorite: priorite,
      statut: 'actif'
    })
      .populate('praticien')
      .sort({ date_ajout: -1 });
  }

  /**
   * Récupère les statistiques du portefeuille d'un visiteur
   */
  async getPortefeuilleStats(visiteurId: string) {
    const stats = await Portefeuille.aggregate([
      { $match: { visiteur: new Types.ObjectId(visiteurId) } },
      {
        $group: {
          _id: null,
          total: { $sum: 1 },
          actifs: {
            $sum: { $cond: [{ $eq: ['$statut', 'actif'] }, 1, 0] }
          },
          inactifs: {
            $sum: { $cond: [{ $eq: ['$statut', 'inactif'] }, 1, 0] }
          },
          prioriteHaute: {
            $sum: { $cond: [{ $eq: ['$priorite', 'haute'] }, 1, 0] }
          },
          prioriteNormale: {
            $sum: { $cond: [{ $eq: ['$priorite', 'normale'] }, 1, 0] }
          },
          prioriteBasse: {
            $sum: { $cond: [{ $eq: ['$priorite', 'basse'] }, 1, 0] }
          }
        }
      }
    ]);

    return stats.length > 0 ? stats[0] : {
      total: 0,
      actifs: 0,
      inactifs: 0,
      prioriteHaute: 0,
      prioriteNormale: 0,
      prioriteBasse: 0
    };
  }

  /**
   * Change le statut d'un praticien dans le portefeuille
   */
  async toggleStatutPortefeuille(id: string) {
    const item = await Portefeuille.findById(id);
    if (!item) {
      return null;
    }

    item.statut = item.statut === 'actif' ? 'inactif' : 'actif';
    await item.save();

    return await Portefeuille.findById(id)
      .populate('praticien')
      .populate('visiteur', 'nom prenom email');
  }
}
