import {useState} from "react";
import styles from './styles.module.css'

function Otp() {

      const [otp, setOtp] = useState('');
    
      const handleSubmit = async (e) => {
        e.preventDefault();
    
        try {
            
            const response = await fetch("http://localhost:9000/users/otp", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                credentials: "include",
                body: JSON.stringify({otp }),
            });
    
    
            if (!response.ok) {
                throw new Error(`HTTP error! Status: ${response.status}`);
            }
            else{
                const data = await response.json();
                setOtp("");
                window.location.href = "/resetPassword";
            }
        } 
        catch (error) {
            console.error("Error logging in:", error);
        }
    };
    
    
    return (
        <div className={styles.container}>
            <div className={styles.head}>
                <h1>Enter OTP </h1>
                <form id="form" >
                    <div className = {styles.info}>
                        <label htmlFor="otp" className={styles.label}>OTP:</label>
                        <input type="number" id="otp" name="otp" className={styles.box} placeholder="Enter your OTP" onChange={(e) => {setOtp(e.target.value)}} required/>
                    </div>
                    <button type="submit" className={styles.submitBtn} onClick={handleSubmit}>Submit</button>
                </form>
            </div>
        </div>
    )
}

export default Otp;