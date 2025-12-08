import express, {} from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import { Database } from './config/database.js';
import visiteurRoutes from './modules/visiteur/visiteur.routes.js';
import visiteRoutes from './modules/visite/visite.routes.js';
import praticienRoutes from './modules/praticien/praticien.routes.js';
import motifRoutes from './modules/motif/motif.routes.js';
// Chargement des variables d'environnement
dotenv.config();
/**
 * Gère la configuration et le démarrage du serveur Express
 */
class App {
    app;
    port;
    database;
    constructor() {
        this.app = express();
        this.port = parseInt(process.env.PORT || '3000', 10);
        this.database = Database.getInstance();
        this.initializeMiddlewares();
        this.initializeRoutes();
        this.initializeDatabase();
    }
    /**
     * Configure les middlewares Express
     */
    initializeMiddlewares() {
        // Parse le JSON dans les requêtes
        this.app.use(express.json());
        // Parse les données URL-encoded
        this.app.use(express.urlencoded({ extended: true }));
        // Active CORS pour toutes les origines
        this.app.use(cors());
    }
    /**
     * Configure les routes de l'application
     */
    initializeRoutes() {
        // Route de test
        this.app.get('/', (req, res) => {
            res.json({
                message: 'API REST Express.js + TypeScript + MongoDB',
                version: '1.0.0',
                endpoints: {
                    health: '/health',
                    visiteurs: '/api/visiteurs',
                    visites: '/api/visites',
                    praticiens: '/api/praticiens',
                    motifs: '/api/motifs'
                }
            });
        });
        // Route de santé pour vérifier que l'API fonctionne
        this.app.get('/health', (req, res) => {
            res.json({
                status: 'OK',
                timestamp: new Date().toISOString(),
                uptime: process.uptime()
            });
        });
        // Routes API
        this.app.use('/api/visiteurs', visiteurRoutes);
        this.app.use('/api/visites', visiteRoutes);
        this.app.use('/api/praticiens', praticienRoutes);
        this.app.use('/api/motifs', motifRoutes);
    }
    /**
     * Initialise la connexion à la base de données
     */
    async initializeDatabase() {
        await this.database.connect();
    }
    /**
     * Démarre le serveur Express
     */
    listen() {
        this.app.listen(this.port, () => {
            console.log('================================');
            console.log(`Serveur démarré sur le port ${this.port}`);
            console.log(`Environnement: ${process.env.NODE_ENV}`);
            console.log('================================');
        });
    }
}
// Création et démarrage de l'application
const app = new App();
app.listen();
process.on('SIGINT', async () => {
    console.log('\n Arrêt du serveur...');
    await Database.getInstance().disconnect();
    process.exit(0);
});
