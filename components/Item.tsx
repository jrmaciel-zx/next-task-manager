import { NextPage } from 'next';
import { Task } from '../types/Task';
import React from 'react';
import moment from 'moment';

type ItemProps = {
    task: Task,
    selectTaskToEdit(t: Task): void
}

export const Item : NextPage<ItemProps> = ({task, selectTaskToEdit}) => {
    
    const getDataText = (finishDate: string | undefined, previsionDate: string) => {
        if (finishDate) {
            return `Concluído em: ${moment(finishDate).format('DD/MM/yyyy')}`;
        }
        return `Previsão de conclusão em: ${moment(previsionDate).format('DD/MM/yyyy')}`;
    }
    
    return (
        <div className={"container-item" + (task.finishDate ? "" : " ativo")}
            onClick={e => task.finishDate ? null : selectTaskToEdit(task)}>
            <img src={task?.finishDate ? '/checked.svg' : 'not-checked.svg'} alt={task?.finishDate ? "Tarefa concluída" : "Tarefa não concluída"}/>                  
            <div>                
                <p className={task.finishDate ? "concluido" : ""}>{task.name}</p>
                <span>{getDataText(task.finishDate, task.previsionDate)}</span>
            </div>
        </div>
    );
}