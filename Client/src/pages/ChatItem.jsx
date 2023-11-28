import '../index.css'
import styles from "./ChatItem.module.css"




const ChatItem = ( {item, key} ) => {
  return (
    <div className={styles.chat} key={key}>
        <div className={styles.chatLable}>
            <p className={styles.chatnick}>{item.user_nick}</p>
            <p className={styles.chattime}>{item.time.slice(0,10)}</p>
        </div>
        <div className={styles.chatCont}>{item.content}</div>
    </div>
  )
}

export default ChatItem