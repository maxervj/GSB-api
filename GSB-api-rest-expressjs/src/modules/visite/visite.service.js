import { Visite } from './Visite.js';
import { Visiteur } from '../visiteur/Visiteur.js';
import { Praticien } from '../praticien/Praticien.js';
import { Motif } from '../motif/Motif.js';
/**
 * Service pour gérer la logique métier des visites
 */
export class VisiteService {
    /**
     * Récupère toutes les visites avec les relations
     */
    async getAllVisites() {
        return await Visite.find()
            .populate('visiteur', 'nom prenom email')
            .populate('praticien', 'nom prenom email ville')
            .populate('motif', 'libelle')
            .sort({ date_visite: -1 });
    }
    /**
     * Récupère une visite par son ID
     */
    async getVisiteById(id) {
        return await Visite.findById(id)
            .populate('visiteur', 'nom prenom email tel')
            .populate('praticien', 'nom prenom email tel ville')
            .populate('motif', 'libelle');
    }
    /**
     * Récupère les visites d'un visiteur
     */
    async getVisitesByVisiteur(visiteurId) {
        return await Visite.find({ visiteur: visiteurId })
            .populate('visiteur', 'nom prenom email')
            .populate('praticien', 'nom prenom email ville')
            .populate('motif', 'libelle')
            .sort({ date_visite: -1 });
    }
    /**
     * Récupère les visites d'un praticien
     */
    async getVisitesByPraticien(praticienId) {
        return await Visite.find({ praticien: praticienId })
            .populate('visiteur', 'nom prenom email')
            .populate('praticien', 'nom prenom email ville')
            .populate('motif', 'libelle')
            .sort({ date_visite: -1 });
    }
    /**
     * Récupère les visites par motif
     */
    async getVisitesByMotif(motifId) {
        return await Visite.find({ motif: motifId })
            .populate('visiteur', 'nom prenom email')
            .populate('praticien', 'nom prenom email ville')
            .populate('motif', 'libelle')
            .sort({ date_visite: -1 });
    }
    /**
     * Récupère les visites dans une période donnée
     */
    async getVisitesByDateRange(startDate, endDate) {
        return await Visite.find({
            date_visite: {
                $gte: new Date(startDate),
                $lte: new Date(endDate)
            }
        })
            .populate('visiteur', 'nom prenom email')
            .populate('praticien', 'nom prenom email ville')
            .populate('motif', 'libelle')
            .sort({ date_visite: -1 });
    }
    /**
     * Récupère les statistiques des visites
     */
    async getVisitesStats() {
        const totalVisites = await Visite.countDocuments();
        const visitesParMotif = await Visite.aggregate([
            {
                $group: {
                    _id: '$motif',
                    count: { $sum: 1 }
                }
            },
            {
                $lookup: {
                    from: 'motifs',
                    localField: '_id',
                    foreignField: '_id',
                    as: 'motif'
                }
            },
            {
                $unwind: '$motif'
            },
            {
                $project: {
                    motif: '$motif.libelle',
                    count: 1
                }
            },
            {
                $sort: { count: -1 }
            }
        ]);
        const visitesParMois = await Visite.aggregate([
            {
                $group: {
                    _id: {
                        year: { $year: '$date_visite' },
                        month: { $month: '$date_visite' }
                    },
                    count: { $sum: 1 }
                }
            },
            {
                $sort: { '_id.year': -1, '_id.month': -1 }
            },
            {
                $limit: 12
            }
        ]);
        return {
            totalVisites,
            visitesParMotif,
            visitesParMois
        };
    }
    /**
     * Vérifie que le visiteur existe
     */
    async visiteurExists(visiteurId) {
        const visiteur = await Visiteur.findById(visiteurId);
        return visiteur !== null;
    }
    /**
     * Vérifie que le praticien existe
     */
    async praticienExists(praticienId) {
        const praticien = await Praticien.findById(praticienId);
        return praticien !== null;
    }
    /**
     * Vérifie que le motif existe
     */
    async motifExists(motifId) {
        const motif = await Motif.findById(motifId);
        return motif !== null;
    }
    /**
     * Crée une nouvelle visite
     */
    async createVisite(data) {
        const visite = await Visite.create(data);
        // Populate avant de retourner
        await visite.populate([
            { path: 'visiteur', select: 'nom prenom email' },
            { path: 'praticien', select: 'nom prenom email ville' },
            { path: 'motif', select: 'libelle' }
        ]);
        return visite;
    }
    /**
     * Met à jour une visite
     */
    async updateVisite(id, data) {
        return await Visite.findByIdAndUpdate(id, data, { new: true, runValidators: true })
            .populate('visiteur', 'nom prenom email')
            .populate('praticien', 'nom prenom email ville')
            .populate('motif', 'libelle');
    }
    /**
     * Supprime une visite
     */
    async deleteVisite(id) {
        return await Visite.findByIdAndDelete(id);
    }
}
