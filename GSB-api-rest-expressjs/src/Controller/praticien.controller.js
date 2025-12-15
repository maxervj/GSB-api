import {} from 'express';
import { PraticienService } from '../modules/praticien/praticien.service.js';
/**
 * Controller pour gérer les opérations CRUD sur les praticiens
 */
export class PraticienController {
    praticienService;
    constructor() {
        this.praticienService = new PraticienService();
    }
    /**
     * Récupère tous les praticiens
     */
    async getAllPraticiens(req, res) {
        try {
            const praticiens = await this.praticienService.getAllPraticiens();
            res.status(200).json({
                success: true,
                count: praticiens.length,
                data: praticiens
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Erreur lors de la récupération des praticiens',
                error: error instanceof Error ? error.message : 'Erreur inconnue'
            });
        }
    }
    /**
     * Récupère un praticien par son ID
     */
    async getPraticienById(req, res) {
        try {
            const id = req.params.id;
            const praticien = await this.praticienService.getPraticienById(id);
            if (!praticien) {
                res.status(404).json({
                    success: false,
                    message: 'Praticien non trouvé'
                });
                return;
            }
            res.status(200).json({
                success: true,
                data: praticien
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Erreur lors de la récupération du praticien',
                error: error instanceof Error ? error.message : 'Erreur inconnue'
            });
        }
    }
    /**
     * Récupère les praticiens par ville
     */
    async getPraticiensByVille(req, res) {
        try {
            const ville = req.params.ville;
            const praticiens = await this.praticienService.getPraticiensByVille(ville);
            res.status(200).json({
                success: true,
                count: praticiens.length,
                data: praticiens
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Erreur lors de la récupération des praticiens par ville',
                error: error instanceof Error ? error.message : 'Erreur inconnue'
            });
        }
    }
    /**
     * Crée un nouveau praticien
     */
    async createPraticien(req, res) {
        try {
            const { nom, prenom, tel, email, rue, code_postal, ville } = req.body;
            // Vérifier si l'email existe déjà
            const exists = await this.praticienService.praticienExistsByEmail(email);
            if (exists) {
                res.status(400).json({
                    success: false,
                    message: 'Un praticien avec cet email existe déjà'
                });
                return;
            }
            const praticien = await this.praticienService.createPraticien({
                nom,
                prenom,
                tel,
                email,
                rue,
                code_postal,
                ville
            });
            res.status(201).json({
                success: true,
                message: 'Praticien créé avec succès',
                data: praticien
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: 'Erreur lors de la création du praticien',
                error: error instanceof Error ? error.message : 'Erreur inconnue'
            });
        }
    }
    /**
     * Met à jour un praticien
     */
    async updatePraticien(req, res) {
        try {
            const id = req.params.id;
            const { nom, prenom, tel, email, rue, code_postal, ville } = req.body;
            // Si l'email est modifié, vérifier qu'il n'existe pas déjà
            if (email) {
                const exists = await this.praticienService.praticienExistsByEmail(email, id);
                if (exists) {
                    res.status(400).json({
                        success: false,
                        message: 'Un praticien avec cet email existe déjà'
                    });
                    return;
                }
            }
            const praticien = await this.praticienService.updatePraticien(id, {
                nom,
                prenom,
                tel,
                email,
                rue,
                code_postal,
                ville
            });
            if (!praticien) {
                res.status(404).json({
                    success: false,
                    message: 'Praticien non trouvé'
                });
                return;
            }
            res.status(200).json({
                success: true,
                message: 'Praticien mis à jour avec succès',
                data: praticien
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: 'Erreur lors de la mise à jour du praticien',
                error: error instanceof Error ? error.message : 'Erreur inconnue'
            });
        }
    }
    /**
     * Supprime un praticien
     */
    async deletePraticien(req, res) {
        try {
            const id = req.params.id;
            const praticien = await this.praticienService.deletePraticien(id);
            if (!praticien) {
                res.status(404).json({
                    success: false,
                    message: 'Praticien non trouvé'
                });
                return;
            }
            res.status(200).json({
                success: true,
                message: 'Praticien supprimé avec succès',
                data: praticien
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Erreur lors de la suppression du praticien',
                error: error instanceof Error ? error.message : 'Erreur inconnue'
            });
        }
    }
    /**
     * Recherche des praticiens
     */
    async searchPraticiens(req, res) {
        try {
            const q = req.query.q;
            if (!q || typeof q !== 'string') {
                res.status(400).json({
                    success: false,
                    message: 'Paramètre de recherche manquant'
                });
                return;
            }
            const praticiens = await this.praticienService.searchPraticiens(q);
            res.status(200).json({
                success: true,
                count: praticiens.length,
                data: praticiens
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Erreur lors de la recherche des praticiens',
                error: error instanceof Error ? error.message : 'Erreur inconnue'
            });
        }
    }
}
