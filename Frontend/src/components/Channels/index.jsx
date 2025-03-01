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

  // const chatData = [
  //   {
  //     name: 'Matlabi Duniya',
  //     dp: (
  //       <img
  //         src="https://pps.whatsapp.net/v/t61.24694-24/378041669_643376800929196_2650649287054504503_n.jpg?stp=dst-jpg_s192x192_tt6&amp;ccb=11-4&amp;oh=01_Q5AaICpIOfbFgNUM98KLQ5Xecu4vlP2HiNNDu90QTYsRSUKd&amp;oe=67BA3FC4&amp;_nc_sid=5e03e0&amp;_nc_cat=104"
  //         alt="Matlabi Duniya"
  //       />
  //     ),
  //     messages: [{ sender: 'Matlabi Duniya', text: 'Send this to her 😂❤️ ', time: '21:41 PM' }],
  //   },
  // ];

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
        {/* <ShowContact chatData={chatData[0]} /> */}
        <span className={styles.channelDp}>
          <img height="49px" width="49px"
            src="https://pps.whatsapp.net/v/t61.24694-24/378041669_643376800929196_2650649287054504503_n.jpg?stp=dst-jpg_s192x192_tt6&amp;ccb=11-4&amp;oh=01_Q5AaICpIOfbFgNUM98KLQ5Xecu4vlP2HiNNDu90QTYsRSUKd&amp;oe=67BA3FC4&amp;_nc_sid=5e03e0&amp;_nc_cat=104"
            alt="Matlabi Duniya" className={styles.channelImage}
          />
          {/* <img alt="" height="49px" width="49px" draggable="false" className="x1n2onr6 x1lliihq xh8yej3 x5yr21d x6ikm8r x10wlt62 x14yjl9h xudhj91 x18nykt9 xww2gxu xl1xv1r x115dhu7 x17vty23 x1hc1fzr _ao3e" tabIndex="-1" src="https://pps.whatsapp.net/m1/v/t24/An8a3a5j5g3SCx_XoBmNuB6rjT6thGRINnXKjN8iSU-J-ekjXftabjORxsaVPrZq53sju_B-azndJYkuvCxNO0acczIkP7I_U-RWTO9CmJlp6FJn-vSZz_C2Go_j6COombz_JCeAt0YF1bj65r4?stp=dst-jpg_s192x192_tt6&amp;ccb=10-5&amp;oh=01_Q5AaIHY_F4MGAj3gG4PWWBOVxSNwMpciK25H_HZtiau04Hu7&amp;oe=67BA7BED&amp;_nc_sid=5e03e0&amp;_nc_cat=102" /> */}
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