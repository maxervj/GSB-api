import { Router } from 'express';
import { VisiteurController } from '../controllers/visiteur.controller.js';
import { authLimiter } from '../middleware/rateLimiter.middleware.js';

const router = Router();
const visiteurController = new VisiteurController();

// POST /api/auth/signup - Inscription (limiter anti brute-force, pas de token requis)
router.post('/signup', authLimiter, (req, res) => visiteurController.signup(req, res));

// POST /api/auth/login - Connexion (limiter anti brute-force, pas de token requis)
router.post('/login', authLimiter, (req, res) => visiteurController.login(req, res));

export default router;
