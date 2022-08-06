import React from "react"
import { Header } from "../components/Header";
import { Footer } from "../components/Footer";
import { NextPage } from "next";
import { AccessTokenProps } from "../types/AccessTokenProps";

export const Home : NextPage<AccessTokenProps> = ({setAccessToken}) => {

    const sair = () => {
        localStorage.removeItem('accessToken');
        localStorage.removeItem('userName');
        localStorage.removeItem('userMail');
        setAccessToken('');
    }

    return (
        <>
            <Header sair={sair}/>
            <Footer/>
        </>
    );
}