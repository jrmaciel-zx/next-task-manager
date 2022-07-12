import mongoose from "mongoose";
import type { NextApiRequest, NextApiResponse, NextApiHandler } from "next";
import { DefaultMessageResponse } from "../types/DefaultMessageResponse";

export const connect = 
    (handler: NextApiHandler) => async (req: NextApiRequest, res: NextApiResponse<DefaultMessageResponse>) => {
        console.log('MongoDB readyState: ', mongoose.connections[0].readyState);
        if (mongoose.connections[0].readyState) {
            return handler(req, res);
        }

        const DB_CONNECTIONSTRING = 'mongodb+srv://jrmaciel_zx:x=9dusAU@cluster-next.rwbyv.mongodb.net/next-task-manager';

        mongoose.connection.on('connected', () => console.log('Conectado ao banco de dados'));
        mongoose.connection.on('error', err => console.log('Erro ao conectar ao banco de dados'));
        await mongoose.connect(DB_CONNECTIONSTRING);

        return handler(req, res);
    }