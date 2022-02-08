import React, { useEffect } from 'react';
import '../style-components/inicio.css';


const Inicio = () => {
    return (
        <div className="welcomeContainer">
            <p className="tittle">Burguer Queen</p>
            <button className="nextButton" type="button" onClick={() => { window.location.href = '/login'; }}>Iniciar Sesión</button>
        </div>
    )
}

export default Inicio

