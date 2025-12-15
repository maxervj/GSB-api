import type { IMotif } from './Motif.js';
/**
 * Service pour gérer la logique métier des motifs
 */
export declare class MotifService {
    /**
     * Récupère tous les motifs triés par libellé
     */
    getAllMotifs(): Promise<IMotif[]>;
    /**
     * Récupère un motif par son ID
     */
    getMotifById(id: string): Promise<IMotif | null>;
    /**
     * Vérifie si un motif existe déjà avec le même libellé
     */
    motifExistsByLibelle(libelle: string, excludeId?: string): Promise<boolean>;
    /**
     * Crée un nouveau motif
     */
    createMotif(libelle: string): Promise<IMotif>;
    /**
     * Met à jour un motif
     */
    updateMotif(id: string, libelle: string): Promise<IMotif | null>;
    /**
     * Supprime un motif
     */
    deleteMotif(id: string): Promise<IMotif | null>;
    /**
     * Recherche des motifs par libellé
     */
    searchMotifs(query: string): Promise<IMotif[]>;
}
