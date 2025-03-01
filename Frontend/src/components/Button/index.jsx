import React from 'react'
import styles from "./styles.module.css";

function Button(props) {
    const { children } = props;
    return (
        <button className={styles.container}>
            {children}
        </button>
    );
}

export default Button