import mongoose, { Document } from 'mongoose';
export interface IVisite extends Document {
    date_visite: Date;
    commentaire: string;
    visiteur: mongoose.Types.ObjectId;
    praticien: mongoose.Types.ObjectId;
    motif: mongoose.Types.ObjectId;
    createdAt: Date;
    updatedAt: Date;
}
export declare const Visite: mongoose.Model<IVisite, {}, {}, {}, mongoose.Document<unknown, {}, IVisite, {}, mongoose.DefaultSchemaOptions> & IVisite & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any, IVisite>;
