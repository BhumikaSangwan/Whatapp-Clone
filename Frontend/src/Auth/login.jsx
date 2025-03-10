import {useState} from "react";
import styles from './styles.module.css'

function Login() {

    const [formData, setFormData] = useState({
        email: "",
        password: "",
      });
    
      const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
      };
    
      const handleSubmit = async (e) => {
        e.preventDefault();
        console.log("handleSubmit triggered"); // Debugging log
    
        try {
            console.log("Inside login try block");
            
            const response = await fetch("http://localhost:9000/users/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify(formData),
            });
    
            console.log("Login request sent");
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json();
            console.log("Login response:", data);
    
            setFormData({ email: "", password: "" });
            sessionStorage.clear();
            window.location.href = "/whatsapp";
        } 
        catch (error) {
            console.error("Error logging in:", error);
        }
    };
    
    
    return (
        <div className={styles.container}>
            <div className={styles.head}>
                <h1>Login</h1>
                <form id="form" >
                    
                    <div className = {styles.info}>
                        <label htmlFor="email" className={styles.label}>Email:</label>
                        <input type="email" id="email" name="email" className={styles.box} placeholder="Enter your email" onChange={handleChange} required/>
                    </div>
                    <div className = {styles.info}>
                        <label htmlFor="password" className={styles.label}>Password:</label>
                        <input type="password" id="password" name="password" className={styles.box} placeholder="Enter your password" onChange={handleChange} required/>
                    </div>
                    <button type="submit" className={styles.submitBtn} onClick={handleSubmit}>Login</button>
                </form>
                <a href="./signUp" className={styles.change}>Sign Up</a>
            </div>
        </div>
    )
}

export default Login;