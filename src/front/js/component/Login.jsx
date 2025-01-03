import React, { useState, useContext, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { Context } from "../store/appContext";

const BackendURL = 'https://urban-robot-pqrw54r4jjrc6576-3001.app.github.dev/api'
const Login = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();
    const { store, actions } = useContext(Context)

    useEffect(() => {
        if (store.token) {
            navigate("/private");
        }
    }, [store.token]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${BackendURL}/login`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();

            if (response.ok) {
                sessionStorage.setItem("token", data.token);
                alert("Inicio de sesión exitoso.");
                navigate("/private"); // Redirige a la página privada
                window.location.reload();
            } else {
                alert(data.error || "Hubo un error al iniciar sesión.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Error al comunicarse con el servidor.");
        }
    };

    return (
        <div className="p-3 ms-3 ">
            <h2>Inicio de Sesión</h2>
            <form onSubmit={handleSubmit}>
                <input
                    type="email"
                    placeholder="Email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                />
                <input
                    type="password"
                    placeholder="Contraseña"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    required
                />
                <button type="submit">Iniciar Sesión</button>
            </form>
        </div>
    );
};

export default Login;
