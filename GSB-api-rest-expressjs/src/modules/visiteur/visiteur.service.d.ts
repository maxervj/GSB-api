import type { IVisiteur } from './Visiteur.js';
/**
 * Service pour gérer la logique métier des visiteurs
 */
export declare class VisiteurService {
    /**
     * Récupère tous les visiteurs triés par nom et prénom
     */
    getAllVisiteurs(): Promise<IVisiteur[]>;
    /**
     * Récupère un visiteur par son ID
     */
    getVisiteurById(id: string): Promise<IVisiteur | null>;
    /**
     * Vérifie si un visiteur existe déjà avec le même email
     */
    visiteurExistsByEmail(email: string, excludeId?: string): Promise<boolean>;
    /**
     * Crée un nouveau visiteur
     */
    createVisiteur(data: {
        nom: string;
        prenom: string;
        tel: string;
        email: string;
        date_embauche: Date;
    }): Promise<IVisiteur>;
    /**
     * Met à jour un visiteur
     */
    updateVisiteur(id: string, data: {
        nom?: string;
        prenom?: string;
        tel?: string;
        email?: string;
        date_embauche?: Date;
    }): Promise<IVisiteur | null>;
    /**
     * Supprime un visiteur
     */
    deleteVisiteur(id: string): Promise<IVisiteur | null>;
    /**
     * Recherche des visiteurs par nom, prénom ou email
     */
    searchVisiteurs(query: string): Promise<IVisiteur[]>;
    /**
     * Récupère les visiteurs par nom
     */
    getVisiteursByName(nom: string): Promise<IVisiteur[]>;
    /**
     * Récupère un visiteur par email
     */
    getVisiteurByEmail(email: string): Promise<IVisiteur | null>;
    /**
     * Récupère les visiteurs par téléphone
     */
    getVisiteursByTel(tel: string): Promise<IVisiteur[]>;
    /**
     * Récupère les visiteurs par année d'embauche
     */
    getVisiteursByDateEmbauche(year: string): Promise<IVisiteur[]>;
}
