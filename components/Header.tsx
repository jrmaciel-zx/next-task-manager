import React from "react"
import { NextPage } from 'next'

type HeaderProps = {
    sair(): void
}

export const Header : NextPage<HeaderProps> = ({sair}) => {

    const fullName = localStorage.getItem('userName');
    const userName = fullName?.split('')[0] || '...';

    return (
        <div className="container-header">
            <img src="/logo.svg" alt="Logo FIAP" className="logo"/>
            <button>Adicionar Tarefa</button>
            <div className="mobile">
                <span>Olá {userName}</span>
                <img src="/exit-mobile.svg" alt="Sair" onClick={sair}/>
            </div>
            <div className="desktop">
                <span>Olá...</span>
                <img src="/exit-desktop.svg" alt="Sair" onClick={sair}/>
            </div>
        </div>
    );
}