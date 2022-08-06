import React from "react"

export const Footer = () => {
    return (
        <div className="container-footer">
            <button><img src='add.svg' alt='Adicionar Tarefa'/>Adicionar Tarefa</button>
            <span>© Copyright {new Date().getFullYear()}. Todos os direitos reservados.</span>            
        </div>
    );
}