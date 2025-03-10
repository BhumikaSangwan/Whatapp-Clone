import { useState } from "react";
import styles from './styles.module.css'

function signUp() {

    const [formData, setFormData] = useState({
        username: "",
        email: "",
        password: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await fetch("http://localhost:9000/users/signUp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData),
            });
            const data = await response.json();
            console.log("Sign up request sent");
            if (response.ok) {
                alert("Signup successful! directing to Whatsapp...");
                window.location.href = "/login";
            } else {
                alert(data.message);
            }
        } catch (error) {
            console.error("Error signing up:......", error);
        }
    };
    return (
        <div className={styles.container}>
            <div className={styles.head}>
                <h1>Sign Up</h1>
                <form id="form" >
                    <div className={styles.info}>
                        <label htmlFor="username" className={styles.label}>Username:</label>
                        <input type="text" id="username" name="username" className={styles.box} placeholder="Enter your name" onChange={handleChange} required />
                    </div>
                    <div className={styles.info}>
                        <label htmlFor="email" className={styles.label}>Email:</label>
                        <input type="email" id="email" name="email" className={styles.box} placeholder="Enter your email" onChange={handleChange} required />
                    </div>
                    <div className={styles.info}>
                        <label htmlFor="password" className={styles.label}>Password:</label>
                        <input type="password" id="password" name="password" className={styles.box} placeholder="Enter your password" onChange={handleChange} required />
                    </div>
                    <button type="submit" className={styles.submitBtn} onClick = {handleSubmit}>Sign Up</button>
                </form>
                <a href="./login" className={styles.change}>Login</a>
            </div>
        </div>
    )
}

export default signUp;