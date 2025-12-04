import mongoose, { Document } from 'mongoose';
export interface IMotif extends Document {
    libelle: string;
    createdAt: Date;
    updatedAt: Date;
}
export declare const Motif: mongoose.Model<IMotif, {}, {}, {}, mongoose.Document<unknown, {}, IMotif, {}, mongoose.DefaultSchemaOptions> & IMotif & Required<{
    _id: mongoose.Types.ObjectId;
}> & {
    __v: number;
}, any, IMotif>;
