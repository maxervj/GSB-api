import mongoose, { Document, Schema, Types } from 'mongoose';

/**
 * Interface pour le modèle Portefeuille
 */
export interface IPortefeuille extends Document {
  visiteur: Types.ObjectId;
  praticien: Types.ObjectId;
  date_ajout: Date;
  notes?: string;
  priorite: 'basse' | 'normale' | 'haute';
  statut: 'actif' | 'inactif';
  createdAt: Date;
  updatedAt: Date;
}

const portefeuilleSchema = new Schema<IPortefeuille>(
  {
    visiteur: {
      type: Schema.Types.ObjectId,
      ref: 'Visiteur',
      required: [true, 'Le visiteur est requis'],
      index: true
    },
    praticien: {
      type: Schema.Types.ObjectId,
      ref: 'Praticien',
      required: [true, 'Le praticien est requis'],
      index: true
    },
    date_ajout: {
      type: Date,
      default: Date.now,
      required: true
    },
    notes: {
      type: String,
      trim: true,
      maxlength: [500, 'Les notes ne peuvent pas dépasser 500 caractères']
    },
    priorite: {
      type: String,
      enum: {
        values: ['basse', 'normale', 'haute'],
        message: 'La priorité doit être : basse, normale ou haute'
      },
      default: 'normale'
    },
    statut: {
      type: String,
      enum: {
        values: ['actif', 'inactif'],
        message: 'Le statut doit être : actif ou inactif'
      },
      default: 'actif'
    }
  },
  {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
  }
);

// Index composé pour éviter les doublons (un visiteur ne peut pas ajouter deux fois le même praticien)
portefeuilleSchema.index({ visiteur: 1, praticien: 1 }, { unique: true });

// Index pour les requêtes fréquentes
portefeuilleSchema.index({ visiteur: 1, statut: 1 });
portefeuilleSchema.index({ visiteur: 1, priorite: 1 });
portefeuilleSchema.index({ date_ajout: -1 });

// Méthode statique pour vérifier si un praticien est déjà dans le portefeuille
portefeuilleSchema.statics.praticienExistsInPortefeuille = async function(
  visiteurId: Types.ObjectId,
  praticienId: Types.ObjectId
): Promise<boolean> {
  const exists = await this.findOne({
    visiteur: visiteurId,
    praticien: praticienId
  });
  return exists !== null;
};

export const Portefeuille = mongoose.model<IPortefeuille>('Portefeuille', portefeuilleSchema);
