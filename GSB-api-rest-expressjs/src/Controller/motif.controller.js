import {} from 'express';
import { MotifService } from '../modules/motif/motif.service.js';
/**
 * Controller pour gérer les opérations CRUD sur les motifs
 */
export class MotifController {
    motifService;
    constructor() {
        this.motifService = new MotifService();
    }
    /**
     * Récupère tous les motifs
     */
    async getAllMotifs(req, res) {
        try {
            const motifs = await this.motifService.getAllMotifs();
            res.status(200).json({
                success: true,
                count: motifs.length,
                data: motifs
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Erreur lors de la récupération des motifs',
                error: error instanceof Error ? error.message : 'Erreur inconnue'
            });
        }
    }
    /**
     * Récupère un motif par son ID
     */
    async getMotifById(req, res) {
        try {
            const id = req.params.id;
            const motif = await this.motifService.getMotifById(id);
            if (!motif) {
                res.status(404).json({
                    success: false,
                    message: 'Motif non trouvé'
                });
                return;
            }
            res.status(200).json({
                success: true,
                data: motif
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Erreur lors de la récupération du motif',
                error: error instanceof Error ? error.message : 'Erreur inconnue'
            });
        }
    }
    /**
     * Crée un nouveau motif
     */
    async createMotif(req, res) {
        try {
            const { libelle } = req.body;
            if (!libelle) {
                res.status(400).json({
                    success: false,
                    message: 'Le libellé est requis'
                });
                return;
            }
            // Vérifier si le motif existe déjà
            const exists = await this.motifService.motifExistsByLibelle(libelle);
            if (exists) {
                res.status(400).json({
                    success: false,
                    message: 'Un motif avec ce libellé existe déjà'
                });
                return;
            }
            const motif = await this.motifService.createMotif(libelle);
            res.status(201).json({
                success: true,
                message: 'Motif créé avec succès',
                data: motif
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: 'Erreur lors de la création du motif',
                error: error instanceof Error ? error.message : 'Erreur inconnue'
            });
        }
    }
    /**
     * Met à jour un motif
     */
    async updateMotif(req, res) {
        try {
            const id = req.params.id;
            const { libelle } = req.body;
            if (!libelle) {
                res.status(400).json({
                    success: false,
                    message: 'Le libellé est requis'
                });
                return;
            }
            // Vérifier si le motif existe déjà
            const exists = await this.motifService.motifExistsByLibelle(libelle, id);
            if (exists) {
                res.status(400).json({
                    success: false,
                    message: 'Un motif avec ce libellé existe déjà'
                });
                return;
            }
            const motif = await this.motifService.updateMotif(id, libelle);
            if (!motif) {
                res.status(404).json({
                    success: false,
                    message: 'Motif non trouvé'
                });
                return;
            }
            res.status(200).json({
                success: true,
                message: 'Motif mis à jour avec succès',
                data: motif
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: 'Erreur lors de la mise à jour du motif',
                error: error instanceof Error ? error.message : 'Erreur inconnue'
            });
        }
    }
    /**
     * Supprime un motif
     */
    async deleteMotif(req, res) {
        try {
            const id = req.params.id;
            const motif = await this.motifService.deleteMotif(id);
            if (!motif) {
                res.status(404).json({
                    success: false,
                    message: 'Motif non trouvé'
                });
                return;
            }
            res.status(200).json({
                success: true,
                message: 'Motif supprimé avec succès',
                data: motif
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Erreur lors de la suppression du motif',
                error: error instanceof Error ? error.message : 'Erreur inconnue'
            });
        }
    }
    /**
     * Recherche des motifs
     */
    async searchMotifs(req, res) {
        try {
            const q = req.query.q;
            if (!q || typeof q !== 'string') {
                res.status(400).json({
                    success: false,
                    message: 'Paramètre de recherche manquant'
                });
                return;
            }
            const motifs = await this.motifService.searchMotifs(q);
            res.status(200).json({
                success: true,
                count: motifs.length,
                data: motifs
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Erreur lors de la recherche des motifs',
                error: error instanceof Error ? error.message : 'Erreur inconnue'
            });
        }
    }
}
