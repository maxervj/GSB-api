import { Motif } from './Motif.js';
/**
 * Service pour gérer la logique métier des motifs
 */
export class MotifService {
    /**
     * Récupère tous les motifs triés par libellé
     */
    async getAllMotifs() {
        return await Motif.find().sort({ libelle: 1 });
    }
    /**
     * Récupère un motif par son ID
     */
    async getMotifById(id) {
        return await Motif.findById(id);
    }
    /**
     * Vérifie si un motif existe déjà avec le même libellé
     */
    async motifExistsByLibelle(libelle, excludeId) {
        const query = { libelle };
        if (excludeId) {
            query._id = { $ne: excludeId };
        }
        const existingMotif = await Motif.findOne(query);
        return existingMotif !== null;
    }
    /**
     * Crée un nouveau motif
     */
    async createMotif(libelle) {
        return await Motif.create({ libelle });
    }
    /**
     * Met à jour un motif
     */
    async updateMotif(id, libelle) {
        return await Motif.findByIdAndUpdate(id, { libelle }, { new: true, runValidators: true });
    }
    /**
     * Supprime un motif
     */
    async deleteMotif(id) {
        return await Motif.findByIdAndDelete(id);
    }
    /**
     * Recherche des motifs par libellé
     */
    async searchMotifs(query) {
        return await Motif.find({
            libelle: { $regex: query, $options: 'i' }
        }).sort({ libelle: 1 });
    }
}
