import { type Request, type Response } from 'express';
/**
 * Controller pour gérer les opérations CRUD sur les visiteurs
 */
export declare class VisiteurController {
    private visiteurService;
    constructor();
    /**
     * Récupère tous les visiteurs
     */
    getAllVisiteurs(req: Request, res: Response): Promise<void>;
    /**
     * Récupère un visiteur par son ID
     */
    getVisiteurById(req: Request, res: Response): Promise<void>;
    /**
     * Crée un nouveau visiteur
     */
    createVisiteur(req: Request, res: Response): Promise<void>;
    /**
     * Met à jour un visiteur
     */
    updateVisiteur(req: Request, res: Response): Promise<void>;
    /**
     * Recherche des visiteurs par nom ou prénom
     */
    searchVisiteurs(req: Request, res: Response): Promise<void>;
    /**
     * Récupère les visiteurs par nom
     */
    getVisiteurByName(req: Request, res: Response): Promise<void>;
    /**
     * Récupère les visiteurs par email
     */
    getVisiteurByEmail(req: Request, res: Response): Promise<void>;
    /**
     * Récupère les visiteurs par téléphone
     */
    getVisiteurByTel(req: Request, res: Response): Promise<void>;
    /**
     * Récupère les visiteurs par date d'embauche (année)
     */
    getVisiteursByDateEmbauche(req: Request, res: Response): Promise<void>;
    /**
     * Supprime un visiteur
     */
    deleteVisiteur(req: Request, res: Response): Promise<void>;
}
