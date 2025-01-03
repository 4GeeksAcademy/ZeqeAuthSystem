import React from "react";
import { Link } from "react-router-dom";

export const Navbar = () => {
    return (
        <nav>
            <ul>
                <li><Link to="/">Home</Link></li>
                <li><Link to="/signup">Registro</Link></li>
                <li><Link to="/login">Iniciar sesión</Link></li>
            </ul>
        </nav>
    );
};
