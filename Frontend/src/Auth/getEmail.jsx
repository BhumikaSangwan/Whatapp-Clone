import {useState} from "react";
import styles from './styles.module.css'

function Email() {

      const [email, setEmail] = useState('');
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            
            const response = await fetch("http://localhost:9000/users/getEmail", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({email }),
            });
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
    
            const data = await response.json();
            setEmail("");
            sessionStorage.clear();
            alert("Check the email");
            window.location.href = "/otp";
        } 
        catch (error) {
            console.error("Error logging in:", error);
        }
    };
    
    
    return (
        <div className={styles.container}>
            <div className={styles.head}>
                <h1>Forgot Password</h1>
                <form id="form" >
                    <div className = {styles.info}>
                        <label htmlFor="email" className={styles.label}>Email:</label>
                        <input type="email" id="email" name="email" className={styles.box} placeholder="Enter your email" onChange={(e) => {setEmail(e.target.value)}} required/>
                    </div>
                    <button type="submit" className={styles.submitBtn} onClick={handleSubmit}>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Email;