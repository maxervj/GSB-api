import type { IPraticien } from './Praticien.js';
/**
 * Service pour gérer la logique métier des praticiens
 */
export declare class PraticienService {
    /**
     * Récupère tous les praticiens triés par nom et prénom
     */
    getAllPraticiens(): Promise<IPraticien[]>;
    /**
     * Récupère un praticien par son ID
     */
    getPraticienById(id: string): Promise<IPraticien | null>;
    /**
     * Récupère les praticiens par ville
     */
    getPraticiensByVille(ville: string): Promise<IPraticien[]>;
    /**
     * Vérifie si un praticien existe déjà avec le même email
     */
    praticienExistsByEmail(email: string, excludeId?: string): Promise<boolean>;
    /**
     * Crée un nouveau praticien
     */
    createPraticien(data: {
        nom: string;
        prenom: string;
        tel: string;
        email: string;
        rue: string;
        code_postal: string;
        ville: string;
    }): Promise<IPraticien>;
    /**
     * Met à jour un praticien
     */
    updatePraticien(id: string, data: {
        nom?: string;
        prenom?: string;
        tel?: string;
        email?: string;
        rue?: string;
        code_postal?: string;
        ville?: string;
    }): Promise<IPraticien | null>;
    /**
     * Supprime un praticien
     */
    deletePraticien(id: string): Promise<IPraticien | null>;
    /**
     * Recherche des praticiens par nom, prénom, email ou ville
     */
    searchPraticiens(query: string): Promise<IPraticien[]>;
}
