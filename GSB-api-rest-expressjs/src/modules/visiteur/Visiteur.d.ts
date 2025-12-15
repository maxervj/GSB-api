import mongoose, { Document } from 'mongoose';
export interface IVisiteur extends Document {
    nom: string;
    prenom: string;
    tel: string;
    email: string;
    date_embauche: Date;
    createdAt: Date;
    updatedAt: Date;
}
export declare const Visiteur: mongoose.Model<IVisiteur, {}, {}, {}, mongoose.Document<unknown, {}, IVisiteur, {}, mongoose.DefaultSchemaOptions> & IVisiteur & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any, IVisiteur>;
