import { useState, useEffect } from "react";
import { Navigate } from "react-router-dom";
import App from "../App.jsx";

const Whatsapp = () => {
    const [isAuthenticated, setIsAuthenticated] = useState(null); 

    useEffect(() => {
        async function checkAuth() {
            try {
                const response = await fetch("http://localhost:9000/whatsapp", {
                    method: "GET",
                    credentials: "include",
                });

                setIsAuthenticated(response.ok); 
            } catch (error) {
                console.error("Error checking authentication:", error);
                setIsAuthenticated(false); 
            }
        }

        checkAuth();
        
    }, []);
    if (isAuthenticated === null) {
        return;
    }

    return isAuthenticated ? <App /> : <Navigate to="/login" />;
};

export default Whatsapp;
