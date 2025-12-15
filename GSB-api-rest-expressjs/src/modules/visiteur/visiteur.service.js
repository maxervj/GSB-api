import { Visiteur } from './Visiteur.js';
/**
 * Service pour gérer la logique métier des visiteurs
 */
export class VisiteurService {
    /**
     * Récupère tous les visiteurs triés par nom et prénom
     */
    async getAllVisiteurs() {
        return await Visiteur.find()
            .populate('visites')
            .sort({ nom: 1, prenom: 1 });
    }
    /**
     * Récupère un visiteur par son ID
     */
    async getVisiteurById(id) {
        return await Visiteur.findById(id).populate('visites');
    }
    /**
     * Vérifie si un visiteur existe déjà avec le même email
     */
    async visiteurExistsByEmail(email, excludeId) {
        const query = { email };
        if (excludeId) {
            query._id = { $ne: excludeId };
        }
        const existingVisiteur = await Visiteur.findOne(query);
        return existingVisiteur !== null;
    }
    /**
     * Crée un nouveau visiteur
     */
    async createVisiteur(data) {
        return await Visiteur.create(data);
    }
    /**
     * Met à jour un visiteur
     */
    async updateVisiteur(id, data) {
        return await Visiteur.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    }
    /**
     * Supprime un visiteur
     */
    async deleteVisiteur(id) {
        return await Visiteur.findByIdAndDelete(id);
    }
    /**
     * Recherche des visiteurs par nom, prénom ou email
     */
    async searchVisiteurs(query) {
        return await Visiteur.find({
            $or: [
                { nom: { $regex: query, $options: 'i' } },
                { prenom: { $regex: query, $options: 'i' } },
                { email: { $regex: query, $options: 'i' } }
            ]
        }).sort({ nom: 1, prenom: 1 });
    }
    /**
     * Récupère les visiteurs par nom
     */
    async getVisiteursByName(nom) {
        return await Visiteur.find({
            nom: { $regex: nom, $options: 'i' }
        })
            .populate('visites')
            .sort({ prenom: 1 });
    }
    /**
     * Récupère un visiteur par email
     */
    async getVisiteurByEmail(email) {
        return await Visiteur.findOne({ email }).populate('visites');
    }
    /**
     * Récupère les visiteurs par téléphone
     */
    async getVisiteursByTel(tel) {
        return await Visiteur.find({
            tel: { $regex: tel, $options: 'i' }
        }).populate('visites');
    }
    /**
     * Récupère les visiteurs par année d'embauche
     */
    async getVisiteursByDateEmbauche(year) {
        const startDate = new Date(`${year}-01-01`);
        const endDate = new Date(`${year}-12-31`);
        return await Visiteur.find({
            date_embauche: {
                $gte: startDate,
                $lte: endDate
            }
        })
            .populate('visites')
            .sort({ date_embauche: -1 });
    }
}
