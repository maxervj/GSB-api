import rateLimit from 'express-rate-limit';

/**
 * Limiter strict pour les routes d'authentification (signup / login)
 * Anti brute-force : 5 tentatives par IP toutes les 15 minutes
 */
export const authLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 50,
  message: { success: false, message: 'Trop de tentatives de connexion. Réessayez dans 15 minutes.' },
  standardHeaders: true,
  legacyHeaders: false,
});

/**
 * Limiter standard pour les routes API protégées
 * 100 requêtes par IP toutes les 15 minutes
 */
export const apiLimiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
  message: { success: false, message: 'Trop de requêtes depuis cette IP, veuillez réessayer plus tard.' },
  standardHeaders: true,
  legacyHeaders: false,
});

// Alias conservé pour compatibilité
export const rateLimiter = apiLimiter;
