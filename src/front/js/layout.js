import React from "react";
import { BrowserRouter, Route, Routes, useNavigate, Navigate } from "react-router-dom";
import ScrollToTop from "./component/scrollToTop";
import { BackendURL } from "./component/backendURL";

import { Home } from "./pages/home";
import { Demo } from "./pages/demo";
import { Single } from "./pages/single";
import injectContext from "./store/appContext";

import { Navbar } from "./component/navbar";
import { Footer } from "./component/footer";

// Nuevas importaciones
import Signup from "./component/Signup.jsx"; // Ruta del archivo Signup.jsx
import Login from "./component/Login.jsx";   // Ruta del archivo Login.jsx
import ProtectedRoute from "./component/ProtectedRoute.jsx"; // Ruta del archivo ProtectedRoute.jsx

//create your first component
const Layout = () => {
    //the basename is used when your project is published in a subdirectory and not in the root of the domain
    // you can set the basename on the .env file located at the root of this project, E.g: BASENAME=/react-hello-webapp/
    const basename = process.env.BASENAME || "";

    if (!process.env.BACKEND_URL || process.env.BACKEND_URL == "") return <BackendURL />;

    const PrivatePage = () => {
        const navigate = useNavigate();

        return (
            <div className="text-center mt-5">
                <h1>Bienvenido a la página privada</h1>
                <button
                    onClick={() => navigate("/")}
                    className="btn btn-warning btn-lg mt-3"
                >
                    Si eres Arnaldo o Cristian, ¡Click aquí para dirigirse al Home!
                </button>
            </div>
        );
    };

    return (
        <div>
            <BrowserRouter basename={basename}>
                <ScrollToTop>
                    <Navbar />
                    <Routes>
                        <Route
                            path="/"
                            element={
                                <ProtectedRoute>
                                    <Home />
                                </ProtectedRoute>
                            }
                        />
                        <Route element={<Demo />} path="/demo" />
                        <Route element={<Single />} path="/single/:theid" />

                        <Route element={<Signup />} path="/signup" />
                        <Route element={<Login />} path="/login" />
                        <Route
                            path="/private"
                            element={
                                <ProtectedRoute>
                                    <PrivatePage />
                                </ProtectedRoute>
                            }
                        />
                        <Route element={<h1>Not found!</h1>} path="*" />
                    </Routes>
                    <Footer />
                </ScrollToTop>
            </BrowserRouter>
        </div>
    );
};

export default injectContext(Layout);
