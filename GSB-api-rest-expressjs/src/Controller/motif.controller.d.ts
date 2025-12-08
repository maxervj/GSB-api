import { type Request, type Response } from 'express';
/**
 * Controller pour gérer les opérations CRUD sur les motifs
 */
export declare class MotifController {
    private motifService;
    constructor();
    /**
     * Récupère tous les motifs
     */
    getAllMotifs(req: Request, res: Response): Promise<void>;
    /**
     * Récupère un motif par son ID
     */
    getMotifById(req: Request, res: Response): Promise<void>;
    /**
     * Crée un nouveau motif
     */
    createMotif(req: Request, res: Response): Promise<void>;
    /**
     * Met à jour un motif
     */
    updateMotif(req: Request, res: Response): Promise<void>;
    /**
     * Supprime un motif
     */
    deleteMotif(req: Request, res: Response): Promise<void>;
    /**
     * Recherche des motifs
     */
    searchMotifs(req: Request, res: Response): Promise<void>;
}
