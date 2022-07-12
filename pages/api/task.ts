import type { NextApiRequest, NextApiResponse } from "next";
import { TaskModel } from "../../models/TaskModel";
import { DefaultMessageResponse } from '../../types/DefaultMessageResponse';
import { connect } from '../../middlewares/connectToMongoDB'

const registerEndpoint = async (req: NextApiRequest, res: NextApiResponse<DefaultMessageResponse>) => {
    try {
        if (req.method === 'POST') {
            const {description, conclusion} = req.body;
            var today = new Date();

            if (!description || description.trim().length < 5) {
                return res.status(400).json({error: 'Tarefa inválida'});
            };

            if (!conclusion || conclusion < today) {
                return res.status(400).json({error: 'Data inválida'});
            }

            const task = {
                description,
                conclusion
            };

            await TaskModel.create(task);
            return res.status(200).json({msg: 'Tarefa cadastrada com sucesso'});
        }
    } catch (e) {
        console.log('Error creating the task: ', e);
        return res.status(500).json({error : 'Não foi possível cadastrar a tarefa'});
    }
}

export default connect(registerEndpoint);