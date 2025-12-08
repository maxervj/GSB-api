import mongoose, { Document } from 'mongoose';
export interface IPraticien extends Document {
    nom: string;
    prenom: string;
    tel: string;
    email: string;
    rue: string;
    code_postal: string;
    ville: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare const Praticien: mongoose.Model<IPraticien, {}, {}, {}, mongoose.Document<unknown, {}, IPraticien, {}, mongoose.DefaultSchemaOptions> & IPraticien & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any, IPraticien>;
