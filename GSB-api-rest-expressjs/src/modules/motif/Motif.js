import mongoose, { Document, Schema } from 'mongoose';
const motifSchema = new Schema({
    libelle: {
        type: String,
        required: [true, 'Le libellé du motif est requis'],
        trim: true,
        unique: true
    }
}, {
    timestamps: true
});
// Index
motifSchema.index({ libelle: 1 });
export const Motif = mongoose.model('Motif', motifSchema);
