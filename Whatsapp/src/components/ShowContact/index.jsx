import styles from "./styles.module.css";

function index(props) {
    const {dp ,name, time, children} = props
  return (
    <div className={styles.container}>
        <div className={styles.contact}>
          <div className={styles.dp}>
            {dp}
          </div>
          <div className={styles.info}>
            <div className={styles.nameDetails}>
              <div className={styles.name}>{name}</div>
              <div className={styles.time}>{time}</div>
            </div>
            <div className={styles.msg}>
              {children}
            </div>
          </div>
        </div>
    </div>
  )
}

export default index