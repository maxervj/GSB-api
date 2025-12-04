import mongoose, { Document, Schema } from 'mongoose';
const visiteurSchema = new Schema({
    nom: {
        type: String,
        required: [true, 'Le nom est requis'],
        trim: true
    },
    prenom: {
        type: String,
        required: [true, 'Le prénom est requis'],
        trim: true
    },
    tel: {
        type: String,
        required: [true, 'Le téléphone est requis'],
        trim: true
    },
    email: {
        type: String,
        required: [true, 'L\'email est requis'],
        unique: true,
        lowercase: true,
        trim: true,
        match: [/^\S+@\S+\.\S+$/, 'Email invalide']
    },
    date_embauche: {
        type: Date,
        required: [true, 'La date d\'embauche est requise']
    }
}, {
    timestamps: true,
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});
// Virtual pour les visites
visiteurSchema.virtual('visites', {
    ref: 'Visite',
    localField: '_id',
    foreignField: 'visiteur'
});
// Index
visiteurSchema.index({ email: 1 });
visiteurSchema.index({ nom: 1, prenom: 1 });
export const Visiteur = mongoose.model('Visiteur', visiteurSchema);
