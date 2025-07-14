import styles from './styles.module.css';
import { useState } from 'react';
import Add from '../Add/index.jsx';
import Lens from '../Lens/index.jsx';
import ShowContact from '../ShowContact/index.jsx';

function index() {
  const [isFocused, setIsFocused] = useState(false);
  const back = (
    <svg viewBox="0 0 24 24" height="24" width="24">
      <title>back</title>
      <path fill="currentColor" d="M10 6l-6 6 6 6 1.41-1.41L6.83 12l4.58-4.59z"></path>
    </svg>
  );


  return (
    <>
      <div className={`${styles.head} ${styles.chats}`}>
        <div className={styles.heading}>Channels</div>
        <div className={styles.icon}>
          <Add />
        </div>
      </div>
      <div className={`${styles.head} ${styles.searchBar}`}>
        <div className={styles.lens}>{isFocused ? back : <Lens />}</div>
        <div>
          <input
            type="text"
            placeholder={isFocused ? '' : 'Search'}
            onFocus={() => setIsFocused(true)}
            onBlur={() => setTimeout(() => setIsFocused(false), 100)}
          />
        </div>
      </div>
      <div className={styles.channel}>
        <span className={styles.channelDp}>
          <img height="49px" width="49px"
            src="https://pps.whatsapp.net/v/t61.24694-24/378041669_643376800929196_2650649287054504503_n.jpg?stp=dst-jpg_s192x192_tt6&amp;ccb=11-4&amp;oh=01_Q5AaICpIOfbFgNUM98KLQ5Xecu4vlP2HiNNDu90QTYsRSUKd&amp;oe=67BA3FC4&amp;_nc_sid=5e03e0&amp;_nc_cat=104"
            alt="Matlabi Duniya" className={styles.channelImage}
          />
        </span>
        <div className={styles.info}>
          <div className={styles.showName}>
            <div className={styles.channelName}>
              Matlabi Duniya
            </div>
            <div className={styles.time}>
              22:22
            </div>
          </div>

          <div className={styles.showMsg}>
          😇
          </div>
        </div>
      </div>
    </>
  );
}

export default index;