import { type Request, type Response } from 'express';
/**
 * Controller pour gérer les opérations CRUD sur les praticiens
 */
export declare class PraticienController {
    /**
     * Récupère tous les praticiens
     */
    getAllPraticiens(req: Request, res: Response): Promise<void>;
    /**
     * Récupère un praticien par son ID
     */
    getPraticienById(req: Request, res: Response): Promise<void>;
    /**
     * Récupère les praticiens par ville
     */
    getPraticiensByVille(req: Request, res: Response): Promise<void>;
    /**
     * Crée un nouveau praticien
     */
    createPraticien(req: Request, res: Response): Promise<void>;
    /**
     * Met à jour un praticien
     */
    updatePraticien(req: Request, res: Response): Promise<void>;
    /**
     * Supprime un praticien
     */
    deletePraticien(req: Request, res: Response): Promise<void>;
    /**
     * Recherche des praticiens par nom, prénom, email ou ville
     */
    searchPraticiens(req: Request, res: Response): Promise<void>;
}
