import mongoose, { Document, Schema } from 'mongoose';

export interface IMotif extends Document {
  libelle: string;
  createdAt: Date;
  updatedAt: Date;
}

const motifSchema = new Schema<IMotif>(
  {
    libelle: {
      type: String,
      required: [true, 'Le libellé du motif est requis'],
      trim: true,
      unique: true
    }
  },
  {
    timestamps: true
  }
);

// Index
motifSchema.index({ libelle: 1 });

export const Motif = mongoose.model<IMotif>('Motif', motifSchema);
