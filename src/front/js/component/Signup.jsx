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
        <div className="container card shadow-lg border-0 mt-5" style={{ width: 'fit-content' }}>
            <h2 className="card-title text-center">Registro</h2>
            <form className="w-100 mx-auto text-end" onSubmit={handleSubmit}>
                <div className="mb-3">
                    <label className="form-label me-3 ">Email</label>
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
                <button type="submit" className="btn btn-primary text-center" style={{ width: "100%" }}>Registrar</button>
            </form>
        </div>
    );
};

export default Signup;
