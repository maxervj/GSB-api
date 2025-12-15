import type { IVisite } from './Visite.js';
/**
 * Service pour gérer la logique métier des visites
 */
export declare class VisiteService {
    /**
     * Récupère toutes les visites avec les relations
     */
    getAllVisites(): Promise<IVisite[]>;
    /**
     * Récupère une visite par son ID
     */
    getVisiteById(id: string): Promise<IVisite | null>;
    /**
     * Récupère les visites d'un visiteur
     */
    getVisitesByVisiteur(visiteurId: string): Promise<IVisite[]>;
    /**
     * Récupère les visites d'un praticien
     */
    getVisitesByPraticien(praticienId: string): Promise<IVisite[]>;
    /**
     * Récupère les visites par motif
     */
    getVisitesByMotif(motifId: string): Promise<IVisite[]>;
    /**
     * Récupère les visites dans une période donnée
     */
    getVisitesByDateRange(startDate: string, endDate: string): Promise<IVisite[]>;
    /**
     * Récupère les statistiques des visites
     */
    getVisitesStats(): Promise<{
        totalVisites: number;
        visitesParMotif: any[];
        visitesParMois: any[];
    }>;
    /**
     * Vérifie que le visiteur existe
     */
    visiteurExists(visiteurId: string): Promise<boolean>;
    /**
     * Vérifie que le praticien existe
     */
    praticienExists(praticienId: string): Promise<boolean>;
    /**
     * Vérifie que le motif existe
     */
    motifExists(motifId: string): Promise<boolean>;
    /**
     * Crée une nouvelle visite
     */
    createVisite(data: {
        date_visite: Date;
        commentaire: string;
        visiteur: string;
        praticien: string;
        motif: string;
    }): Promise<IVisite>;
    /**
     * Met à jour une visite
     */
    updateVisite(id: string, data: {
        date_visite?: Date;
        commentaire?: string;
        visiteur?: string;
        praticien?: string;
        motif?: string;
    }): Promise<IVisite | null>;
    /**
     * Supprime une visite
     */
    deleteVisite(id: string): Promise<IVisite | null>;
}
