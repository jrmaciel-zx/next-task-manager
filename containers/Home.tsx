import React, {useEffect, useState} from 'react';
import { Header } from '../components/Header';
import { Footer } from '../components/Footer';
import { NextPage } from 'next';
import { AccessTokenProps } from '../types/AccessTokenProps';
import { Task } from '../types/Task';
import { executeRequest } from '../services/apiServices';
import { List } from '../components/List';
import { Filter } from '../components/Filter';
import { Modal } from 'react-bootstrap';
import moment from 'moment';

export const Home : NextPage<AccessTokenProps> = ({setAccessToken}) => {

    const [tasks, setTasks] = useState<Task[]>([]);
    const [previsionDateStart, setPrevisionDateStart] = useState('');
    const [previsionDateEnd, setPrevisionDateEnd] = useState('');
    const [status, setStatus] = useState('0');

    // Modal
    const [showModal, setShowModal] = useState(false);    
    const [error, setError] = useState('');
    const [name, setName] = useState('');
    const [modalPrevisionDateStart, setModalPrevisionDateStart] = useState('');

    const getFilteredList = async() =>{
        try {
            let query = '?status=' + status;

            if (previsionDateStart) {
                query += '&previsionDateStart=' + previsionDateStart;
            }

            if (previsionDateEnd) {
                query += '&previsionDateEnd=' + previsionDateEnd;
            }

            const result = await executeRequest('task' + query, 'GET');
            if (result && result.data) {
                setTasks(result.data);
            }
        } catch(e) {
            console.log(e);
        }
    }

    useEffect(() => {
        getFilteredList();
    }, [previsionDateStart, previsionDateEnd, status]);

    const sair = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userName');
        localStorage.removeItem('userMail');
        setAccessToken('');
    }

    const salvar = async() => {
        try {
            if (!name || !name.trim() || !modalPrevisionDateStart || !modalPrevisionDateStart.trim()) {
                setError("Favor preencher o formulário");
                return;                
            }

            const body = {
                name,
                previsionDate : modalPrevisionDateStart
            }

            await executeRequest('task', 'POST', body);
            await getFilteredList();
            closeModal();
        } catch(e: any) {
            console.log(e);

            if (e?.response?.data?.error) {
                setError(e?.response?.data?.error);
            } else {
                setError("Ocorreu um erro ao salvar a tarefa.");
            }
        }
    }

    const closeModal = () => {
        setName('');
        setModalPrevisionDateStart('');
        setError('');
        setShowModal(false);
    }

    return (
        <>
            <Header sair={sair} setShowModal={setShowModal}/>
            <Filter
                periodoDe={previsionDateStart}
                setPeriodoDe={setPrevisionDateStart}
                periodoAte={previsionDateEnd}
                setPeriodoAte={setPrevisionDateEnd}
                status={status}
                setStatus={setStatus}
            />
            <List tasks={tasks} getFilteredList={getFilteredList}/>
            <Footer setShowModal={setShowModal}/>
            <Modal
                show={showModal}
                onHide={closeModal}
                className="container-modal">
                <Modal.Body>
                    <p>Adicionar Tarefa</p>
                    {error && <p className="error">{error}</p>}
                    <input
                        type='text'
                        placeholder="Nome da tarefa"
                        value={name}
                        onChange={e => setName(e.target.value)}/>
                    <input
                        type={modalPrevisionDateStart ? 'date' : 'text'}                        
                        placeholder="Data de previsão"
                        onFocus={e => e.target.type = 'date'}
                        onBlur={e => modalPrevisionDateStart ? e.target.type = 'date' : e.target.type = 'text'}
                        value={modalPrevisionDateStart}
                        onChange={e => setModalPrevisionDateStart(e.target.value)}/>
                </Modal.Body>
                <Modal.Footer>
                    <div className="button col-12">
                        <button onClick={salvar}>Salvar</button>
                        <span onClick={closeModal}>Cancelar</span>
                    </div>
                </Modal.Footer>
            </Modal>
        </>
    );
}