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
    
    
    
                if (!response.ok) {
                    setIsAuthenticated(false);
                    return;
                }
    
                const data = await response.json();
    
                if (data.message === "Authenticated") {
                    setIsAuthenticated(true);
                } else {
                    setIsAuthenticated(false);
                }
            } catch (error) {
                console.error("Fetch error:", error);
                setIsAuthenticated(false);
            }
        }
    
        checkAuth();
    }, []);
    

    if (isAuthenticated === null) {
        return <h2>Loading...</h2>;  
    }

    return isAuthenticated ? <App /> : <Navigate to="/login" />;
};

export default Whatsapp;
