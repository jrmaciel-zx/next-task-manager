import React, { ChangeEvent, MouseEvent, useState } from 'react'
import { executeRequest } from '../services/apiServices'
import { NextPage } from 'next'
import { AccessTokenProps } from '../types/AccessTokenProps'

export const Login : NextPage<AccessTokenProps> = ({setAccessToken}) => {

    const [login, setLogin] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const doLogin = async(evento : MouseEvent) => {
        try {
            evento.preventDefault();
            setError('');
            
            if (!login || !password) {
                return setError("Favor informar o usuário e senha");
            }
            
            const body = {login, password};
            const result = await executeRequest('login', 'POST', body);            
            
            if (!result || !result.data) {
                return setError("Ocorreu um erro ao processar login, tente novamente.");
            }

            const {name, email, token} = result.data;
            localStorage.setItem('accessToken', token);
            localStorage.setItem('userName', name);
            localStorage.setItem('userMail', email);
            setAccessToken(token);
        } catch(e: any) {            
            if (e?.response?.data?.error) {
                return setError(e.response.data.error);
            }

            setError("Ocorreu um erro ao processar o login, tente novamente.");
        }
    }

    return (
        <div className="container-login">
            <img src="/logo.svg" alt="Logo Fiap" className="logo"/>
            <form>
                <p className="error">{error}</p>
                <div className="input">
                    <img src="/mail.svg" alt="Informe seu login"/>
                    <input type="text" placeholder="Login"
                        value={login}
                        onChange={e => setLogin(e.target.value)}/>
                </div>
                <div className="input">
                    <img src="/lock.svg" alt="Infore seu login"/>
                    <input type="password" placeholder="Senha"
                        value={password}
                        onChange={e => setPassword(e.target.value)}/>                  
                </div>
                <button onClick={doLogin}>Login</button>
            </form>
        </div>
    );
}