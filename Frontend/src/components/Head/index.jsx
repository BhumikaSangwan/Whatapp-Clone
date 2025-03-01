import styles from './styles.module.css'
import Archieved from '../Archieved/index.jsx'
import Add from '../Add/index.jsx'
import Menu from '../Menu/index.jsx'

function index({text, iconType}) {
  return (
    <>
        <div className={`${styles.head} ${styles.chats}`}>
        <div className={styles.heading}>
          {text}
        </div>
        <div className={styles.heading}>
          <div className={styles.icon}>
          {iconType === "Archieved" && <Archieved />} 
          {iconType === "Add" && <Add />} 
          </div>
          <div className={styles.icon}>
            <Menu />
          </div>
        </div>
      </div>
    </>
  )
}

export default index