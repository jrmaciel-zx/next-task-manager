import type { NextApiRequest, NextApiResponse } from "next";
import { UserModel } from "../../models/UserModel";
import { DefaultMessageResponse } from '../../types/DefaultMessageResponse';
import { connect } from '../../middlewares/connectToMongoDB'

const registerEndpoint = async (req: NextApiRequest, res: NextApiResponse<DefaultMessageResponse>) => {
    try {
        if (req.method === 'POST') {
            const {name, email, password} = req.body;

            if (!name || name.trim().length < 2) {
                return res.status(400).json({error: 'O nome não é válido'});
            };

            if (!password || password.trim().length < 6) {
                return res.status(400).json({error: 'A senha deve ter pelo menos 6 caracteres'})
            };

            if (!email || email.trim().length < 5 
                || !email.includes('@') || !email.includes('.')) {
                return res.status(400).json({error: 'A senha não é válida'})
            };

            const user = {
                name,
                email,
                password
            };

            await UserModel.create(user);
            return res.status(200).json({msg: 'Usuário cadastrado com sucesso'});
        }
    } catch (e) {
        console.log('Error on create user: ', e);
        return res.status(500).json({error : 'Não foi possível cadastrar o usuário'});
    }
}

export default connect(registerEndpoint);