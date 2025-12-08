import { Praticien } from './Praticien.js';
/**
 * Service pour gérer la logique métier des praticiens
 */
export class PraticienService {
    /**
     * Récupère tous les praticiens triés par nom et prénom
     */
    async getAllPraticiens() {
        return await Praticien.find()
            .populate('visites')
            .sort({ nom: 1, prenom: 1 });
    }
    /**
     * Récupère un praticien par son ID
     */
    async getPraticienById(id) {
        return await Praticien.findById(id).populate('visites');
    }
    /**
     * Récupère les praticiens par ville
     */
    async getPraticiensByVille(ville) {
        return await Praticien.find({
            ville: { $regex: ville, $options: 'i' }
        }).sort({ nom: 1, prenom: 1 });
    }
    /**
     * Vérifie si un praticien existe déjà avec le même email
     */
    async praticienExistsByEmail(email, excludeId) {
        const query = { email };
        if (excludeId) {
            query._id = { $ne: excludeId };
        }
        const existingPraticien = await Praticien.findOne(query);
        return existingPraticien !== null;
    }
    /**
     * Crée un nouveau praticien
     */
    async createPraticien(data) {
        return await Praticien.create(data);
    }
    /**
     * Met à jour un praticien
     */
    async updatePraticien(id, data) {
        return await Praticien.findByIdAndUpdate(id, data, { new: true, runValidators: true });
    }
    /**
     * Supprime un praticien
     */
    async deletePraticien(id) {
        return await Praticien.findByIdAndDelete(id);
    }
    /**
     * Recherche des praticiens par nom, prénom, email ou ville
     */
    async searchPraticiens(query) {
        return await Praticien.find({
            $or: [
                { nom: { $regex: query, $options: 'i' } },
                { prenom: { $regex: query, $options: 'i' } },
                { email: { $regex: query, $options: 'i' } },
                { ville: { $regex: query, $options: 'i' } }
            ]
        }).sort({ nom: 1, prenom: 1 });
    }
}
