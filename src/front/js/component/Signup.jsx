import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

const BackendURL = 'https://urban-robot-pqrw54r4jjrc6576-3001.app.github.dev/api'

const Signup = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const navigate = useNavigate();

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch(`${BackendURL}/signup`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email, password }),
            });
            const data = await response.json();

            if (response.ok) {
                alert(data.message);
                navigate("/login"); // Redirige al login
            } else {
                alert(data.error || "Hubo un error al registrarse.");
            }
        } catch (error) {
            console.error("Error:", error);
            alert("Error al comunicarse con el servidor.");
        }
    };

    return (
        <div className="container mt-5">
            <h2 className="text-center">Registro</h2>
            <form className="w-50 mx-auto" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label me-3">Email</label>
                    <input
                        type="email"
                        placeholder="Email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label className="form-label me-3">Contraseña</label>
                    <input
                        type="password"
                        placeholder="Contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                    />
                </div>
                <button type="submit" className="btn btn-primary w-100">Registrar</button>
            </form>
        </div>
    );
};

export default Signup;
