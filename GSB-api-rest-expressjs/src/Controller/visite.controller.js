import {} from 'express';
import { VisiteService } from '../modules/visite/visite.service.js';
/**
 * Controller pour gérer les opérations CRUD sur les visites
 */
export class VisiteController {
    visiteService;
    constructor() {
        this.visiteService = new VisiteService();
    }
    /**
     * Récupère toutes les visites
     */
    async getAllVisites(req, res) {
        try {
            const visites = await this.visiteService.getAllVisites();
            res.status(200).json({
                success: true,
                count: visites.length,
                data: visites
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Erreur lors de la récupération des visites',
                error: error instanceof Error ? error.message : 'Erreur inconnue'
            });
        }
    }
    /**
     * Récupère une visite par son ID
     */
    async getVisiteById(req, res) {
        try {
            const id = req.params.id;
            const visite = await this.visiteService.getVisiteById(id);
            if (!visite) {
                res.status(404).json({
                    success: false,
                    message: 'Visite non trouvée'
                });
                return;
            }
            res.status(200).json({
                success: true,
                data: visite
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Erreur lors de la récupération de la visite',
                error: error instanceof Error ? error.message : 'Erreur inconnue'
            });
        }
    }
    /**
     * Récupère les visites d'un visiteur
     */
    async getVisitesByVisiteur(req, res) {
        try {
            const visiteurId = req.params.visiteurId;
            const visites = await this.visiteService.getVisitesByVisiteur(visiteurId);
            res.status(200).json({
                success: true,
                count: visites.length,
                data: visites
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Erreur lors de la récupération des visites du visiteur',
                error: error instanceof Error ? error.message : 'Erreur inconnue'
            });
        }
    }
    /**
     * Récupère les visites d'un praticien
     */
    async getVisitesByPraticien(req, res) {
        try {
            const praticienId = req.params.praticienId;
            const visites = await this.visiteService.getVisitesByPraticien(praticienId);
            res.status(200).json({
                success: true,
                count: visites.length,
                data: visites
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Erreur lors de la récupération des visites du praticien',
                error: error instanceof Error ? error.message : 'Erreur inconnue'
            });
        }
    }
    /**
     * Récupère les visites par motif
     */
    async getVisitesByMotif(req, res) {
        try {
            const motifId = req.params.motifId;
            const visites = await this.visiteService.getVisitesByMotif(motifId);
            res.status(200).json({
                success: true,
                count: visites.length,
                data: visites
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Erreur lors de la récupération des visites par motif',
                error: error instanceof Error ? error.message : 'Erreur inconnue'
            });
        }
    }
    /**
     * Récupère les visites dans une période
     */
    async getVisitesByDateRange(req, res) {
        try {
            const { startDate, endDate } = req.query;
            if (!startDate || !endDate) {
                res.status(400).json({
                    success: false,
                    message: 'Les dates de début et de fin sont requises'
                });
                return;
            }
            const visites = await this.visiteService.getVisitesByDateRange(startDate, endDate);
            res.status(200).json({
                success: true,
                count: visites.length,
                data: visites
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Erreur lors de la récupération des visites par période',
                error: error instanceof Error ? error.message : 'Erreur inconnue'
            });
        }
    }
    /**
     * Récupère les statistiques des visites
     */
    async getVisitesStats(req, res) {
        try {
            const stats = await this.visiteService.getVisitesStats();
            res.status(200).json({
                success: true,
                data: stats
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Erreur lors de la récupération des statistiques',
                error: error instanceof Error ? error.message : 'Erreur inconnue'
            });
        }
    }
    /**
     * Crée une nouvelle visite
     */
    async createVisite(req, res) {
        try {
            const { date_visite, commentaire, visiteur, praticien, motif } = req.body;
            // Vérifier que les entités liées existent
            const visiteurExists = await this.visiteService.visiteurExists(visiteur);
            if (!visiteurExists) {
                res.status(400).json({
                    success: false,
                    message: 'Le visiteur spécifié n\'existe pas'
                });
                return;
            }
            const praticienExists = await this.visiteService.praticienExists(praticien);
            if (!praticienExists) {
                res.status(400).json({
                    success: false,
                    message: 'Le praticien spécifié n\'existe pas'
                });
                return;
            }
            const motifExists = await this.visiteService.motifExists(motif);
            if (!motifExists) {
                res.status(400).json({
                    success: false,
                    message: 'Le motif spécifié n\'existe pas'
                });
                return;
            }
            const visite = await this.visiteService.createVisite({
                date_visite,
                commentaire,
                visiteur,
                praticien,
                motif
            });
            res.status(201).json({
                success: true,
                message: 'Visite créée avec succès',
                data: visite
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: 'Erreur lors de la création de la visite',
                error: error instanceof Error ? error.message : 'Erreur inconnue'
            });
        }
    }
    /**
     * Met à jour une visite
     */
    async updateVisite(req, res) {
        try {
            const id = req.params.id;
            const { date_visite, commentaire, visiteur, praticien, motif } = req.body;
            // Vérifier que les entités liées existent (si elles sont fournies)
            if (visiteur) {
                const visiteurExists = await this.visiteService.visiteurExists(visiteur);
                if (!visiteurExists) {
                    res.status(400).json({
                        success: false,
                        message: 'Le visiteur spécifié n\'existe pas'
                    });
                    return;
                }
            }
            if (praticien) {
                const praticienExists = await this.visiteService.praticienExists(praticien);
                if (!praticienExists) {
                    res.status(400).json({
                        success: false,
                        message: 'Le praticien spécifié n\'existe pas'
                    });
                    return;
                }
            }
            if (motif) {
                const motifExists = await this.visiteService.motifExists(motif);
                if (!motifExists) {
                    res.status(400).json({
                        success: false,
                        message: 'Le motif spécifié n\'existe pas'
                    });
                    return;
                }
            }
            const visite = await this.visiteService.updateVisite(id, {
                date_visite,
                commentaire,
                visiteur,
                praticien,
                motif
            });
            if (!visite) {
                res.status(404).json({
                    success: false,
                    message: 'Visite non trouvée'
                });
                return;
            }
            res.status(200).json({
                success: true,
                message: 'Visite mise à jour avec succès',
                data: visite
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: 'Erreur lors de la mise à jour de la visite',
                error: error instanceof Error ? error.message : 'Erreur inconnue'
            });
        }
    }
    /**
     * Supprime une visite
     */
    async deleteVisite(req, res) {
        try {
            const id = req.params.id;
            const visite = await this.visiteService.deleteVisite(id);
            if (!visite) {
                res.status(404).json({
                    success: false,
                    message: 'Visite non trouvée'
                });
                return;
            }
            res.status(200).json({
                success: true,
                message: 'Visite supprimée avec succès',
                data: visite
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Erreur lors de la suppression de la visite',
                error: error instanceof Error ? error.message : 'Erreur inconnue'
            });
        }
    }
}
