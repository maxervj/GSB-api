/**
 * Utilisation du pattern Singleton pour garantir une seule instance
 */
export declare class Database {
    private static instance;
    private isConnected;
    private constructor();
    /**
     * Récupère l'instance unique de Database (Singleton)
     */
    static getInstance(): Database;
    /**
     * Établit la connexion à MongoDB
     */
    connect(): Promise<void>;
    /**
     * Ferme la connexion à MongoDB
     */
    disconnect(): Promise<void>;
}
