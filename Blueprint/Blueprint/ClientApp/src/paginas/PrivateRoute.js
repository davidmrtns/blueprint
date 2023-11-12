import React, { Children, Component, useEffect, useState } from 'react';
import ReactDOM, { render } from 'react-dom';
import { createRoot, hydrateRoot } from 'react-dom/client';
import { Navigate, Route, Outlet } from 'react-router-dom';
import LoginPage from '../components/LoginPage';
import Backend from '../classes/Backend';

function PrivateRoute() {
    var backend = new Backend();
    const [logado, setLogado] = useState(null);

    useEffect(() => {
        const buscarDados = async () => {
            try {
                const logado = await backend.checarLogin();
                setLogado(logado);
            } catch (error) {
                console.error('Error fetching data:', error);
            }
        }

        buscarDados();
    }, []);

    function renderizar() {
        if (logado) {
            return (
                <Outlet />
            );
        } else {
            return (
                <LoginPage />
            );
        }
    }

    return (
        <div id="conteudogeral">
            {renderizar()}
        </div>
    );
}

export default PrivateRoute;