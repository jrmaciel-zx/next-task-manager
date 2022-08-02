import React from 'react';

export const Login = () => {
    return (
        <div className='container-login'>
            <img src="/logo.svg" alt="Logo Fiap" className="logo"/>
            <form>
                <div className='input'>
                    <img src="/mail.svg" alt="Informe seu login"/>
                    <input type="text" placeholder="Login"/>
                </div>
                <div className='input'>
                    <img src="/lock.svg" alt="Infore seu login"/>
                    <input type="password" placeholder="Senha"/>                    
                </div>
                <button>Login</button>
            </form>
        </div>
    );
}