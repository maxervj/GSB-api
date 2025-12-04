import {} from 'express';
import { Visiteur } from '../models/Visiteur.js';
/**
 * Controller pour gérer les opérations CRUD sur les visiteurs
 */
export class VisiteurController {
    /**
     * Récupère tous les visiteurs
     */
    async getAllVisiteurs(req, res) {
        try {
            const visiteurs = await Visiteur.find()
                .populate('visites')
                .sort({ nom: 1, prenom: 1 });
            res.status(200).json({
                success: true,
                count: visiteurs.length,
                data: visiteurs
            });
        }
        catch (error) {
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
    async getVisiteurById(req, res) {
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
        }
        catch (error) {
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
    async createVisiteur(req, res) {
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
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: 'Erreur lors de la création du visiteur',
                error: error instanceof Error ? error.message : 'Erreur inconnue'
            });
        }
    }
    /**
     * Met à jour un visiteur
     */
    async updateVisiteur(req, res) {
        try {
            const { id } = req.params;
            const { nom, prenom, tel, email, date_embauche } = req.body;
            // Si l'email est modifié, vérifier qu'il n'existe pas déjà
            if (email) {
                const existingVisiteur = await Visiteur.findOne({
                    email: email,
                    _id: { $ne: id }
                });
                if (existingVisiteur) {
                    res.status(400).json({
                        success: false,
                        message: 'Un visiteur avec cet email existe déjà'
                    });
                    return;
                }
            }
            const visiteur = await Visiteur.findByIdAndUpdate(id, { nom, prenom, tel, email, date_embauche }, { new: true, runValidators: true });
            if (!visiteur) {
                res.status(404).json({
                    success: false,
                    message: 'Visiteur non trouvé'
                });
                return;
            }
            res.status(200).json({
                success: true,
                message: 'Visiteur mis à jour avec succès',
                data: visiteur
            });
        }
        catch (error) {
            res.status(400).json({
                success: false,
                message: 'Erreur lors de la mise à jour du visiteur',
                error: error instanceof Error ? error.message : 'Erreur inconnue'
            });
        }
    }
    /**
     * Recherche des visiteurs par nom ou prénom
     */
    async searchVisiteurs(req, res) {
        try {
            const q = req.query.q;
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
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Erreur lors de la recherche des visiteurs',
                error: error instanceof Error ? error.message : 'Erreur inconnue'
            });
        }
    }
    /**
     * Récupère les visiteurs par nom
     */
    async getVisiteurByName(req, res) {
        try {
            const nom = req.params.nom;
            const visiteurs = await Visiteur.find({
                nom: { $regex: nom, $options: 'i' }
            })
                .populate('visites')
                .sort({ prenom: 1 });
            if (visiteurs.length === 0) {
                res.status(404).json({
                    success: false,
                    message: 'Aucun visiteur trouvé avec ce nom'
                });
                return;
            }
            res.status(200).json({
                success: true,
                count: visiteurs.length,
                data: visiteurs
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Erreur lors de la récupération des visiteurs par nom',
                error: error instanceof Error ? error.message : 'Erreur inconnue'
            });
        }
    }
    /**
     * Récupère les visiteurs par email
     */
    async getVisiteurByEmail(req, res) {
        try {
            const email = req.params.email;
            const visiteur = await Visiteur.findOne({ email }).populate('visites');
            if (!visiteur) {
                res.status(404).json({
                    success: false,
                    message: 'Aucun visiteur trouvé avec cet email'
                });
                return;
            }
            res.status(200).json({
                success: true,
                data: visiteur
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Erreur lors de la récupération du visiteur par email',
                error: error instanceof Error ? error.message : 'Erreur inconnue'
            });
        }
    }
    /**
     * Récupère les visiteurs par téléphone
     */
    async getVisiteurByTel(req, res) {
        try {
            const tel = req.params.tel;
            const visiteurs = await Visiteur.find({
                tel: { $regex: tel, $options: 'i' }
            }).populate('visites');
            if (visiteurs.length === 0) {
                res.status(404).json({
                    success: false,
                    message: 'Aucun visiteur trouvé avec ce numéro de téléphone'
                });
                return;
            }
            res.status(200).json({
                success: true,
                count: visiteurs.length,
                data: visiteurs
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Erreur lors de la récupération des visiteurs par téléphone',
                error: error instanceof Error ? error.message : 'Erreur inconnue'
            });
        }
    }
    /**
     * Récupère les visiteurs par date d'embauche (année)
     */
    async getVisiteursByDateEmbauche(req, res) {
        try {
            const { year } = req.params;
            const startDate = new Date(`${year}-01-01`);
            const endDate = new Date(`${year}-12-31`);
            const visiteurs = await Visiteur.find({
                date_embauche: {
                    $gte: startDate,
                    $lte: endDate
                }
            })
                .populate('visites')
                .sort({ date_embauche: -1 });
            res.status(200).json({
                success: true,
                count: visiteurs.length,
                data: visiteurs
            });
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Erreur lors de la récupération des visiteurs par date d\'embauche',
                error: error instanceof Error ? error.message : 'Erreur inconnue'
            });
        }
    }
    /**
     * Supprime un visiteur
     */
    async deleteVisiteur(req, res) {
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
        }
        catch (error) {
            res.status(500).json({
                success: false,
                message: 'Erreur lors de la suppression du visiteur',
                error: error instanceof Error ? error.message : 'Erreur inconnue'
            });
        }
    }
}
