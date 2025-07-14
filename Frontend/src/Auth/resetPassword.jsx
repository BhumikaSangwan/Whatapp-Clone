import { useState } from "react";
import styles from './styles.module.css'

function security() {

    const [formData, setFormData] = useState({
        password: "",
        confirmPwd: "",
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value.trim() });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if(formData.password === "" || formData.confirmPwd === ""){
                alert("Please fill in all the fields");
                return;
            }
            else if(formData.password !== formData.confirmPwd){
                alert("The passwords do not match");
                return;
            }
            else{
            const response = await fetch("http://localhost:9000/users/resetPwd", {
                method: "POST",
                credentials : "include",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({newPassword : formData.password}),
            });
            const data = await response.json();
            if (response.ok) {
                window.location.href = "/login";
            } else {
                alert(data.message);
            }
        }
        } catch (error) {
            console.error("Error resetting pwd :......", error);
        }
    };
    return (
        <div className={styles.container}>
            <div className={styles.head}>
                <h1>Reset password</h1>
                <form id="form" >
                    <div className={styles.info}>
                        <label htmlFor="pwd" className={styles.label}>Password:</label>
                        <input type="password" id="password" name="password" className={styles.box} placeholder="Enter new password" onChange={handleChange} required />
                    </div>
                    <div className={styles.info}>
                        <label htmlFor="confirmPwd" className={styles.label}>Confirm Password:</label>
                        <input type="password" id="confirmPwd" name="confirmPwd" className={styles.box} placeholder="Confirm password" onChange={handleChange} required />
                    </div>
                    <button type="submit" className={styles.submitBtn} onClick = {handleSubmit}>Reset password</button>
                </form>
            </div>
        </div>
    )
}

export default security;