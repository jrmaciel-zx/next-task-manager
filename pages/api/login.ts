import type { NextApiRequest, NextApiResponse } from 'next';
import { DefaultMessageResponse } from '../../types/DefaultMessageResponse';

export default (req: NextApiRequest, res: NextApiResponse<DefaultMessageResponse>) => {
    if (req.method === 'POST') {
        const {login, password} = req.body;

        if (login === 'jrrodriguesmaciel@gmail.com' && password === 'qqrsenha') {
            return res.status(200).json({msg: 'Login autenticado'})
        }

        return res.status(200).json({error: 'Credenciais inválidas'})
    }
    return res.status(405).json({error: 'O método informado não é permitido'})
}
