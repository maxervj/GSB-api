import { type Request, type Response } from 'express';
/**
 * Controller pour gérer les opérations CRUD sur les visites
 */
export declare class VisiteController {
    private visiteService;
    constructor();
    /**
     * Récupère toutes les visites
     */
    getAllVisites(req: Request, res: Response): Promise<void>;
    /**
     * Récupère une visite par son ID
     */
    getVisiteById(req: Request, res: Response): Promise<void>;
    /**
     * Récupère les visites d'un visiteur
     */
    getVisitesByVisiteur(req: Request, res: Response): Promise<void>;
    /**
     * Récupère les visites d'un praticien
     */
    getVisitesByPraticien(req: Request, res: Response): Promise<void>;
    /**
     * Récupère les visites par motif
     */
    getVisitesByMotif(req: Request, res: Response): Promise<void>;
    /**
     * Récupère les visites dans une période
     */
    getVisitesByDateRange(req: Request, res: Response): Promise<void>;
    /**
     * Récupère les statistiques des visites
     */
    getVisitesStats(req: Request, res: Response): Promise<void>;
    /**
     * Crée une nouvelle visite
     */
    createVisite(req: Request, res: Response): Promise<void>;
    /**
     * Met à jour une visite
     */
    updateVisite(req: Request, res: Response): Promise<void>;
    /**
     * Supprime une visite
     */
    deleteVisite(req: Request, res: Response): Promise<void>;
}
