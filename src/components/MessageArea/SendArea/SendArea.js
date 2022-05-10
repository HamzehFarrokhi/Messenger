import './SendArea.css'
import EmojiArea from './EmojiArea/EmojiArea'

const SendArea = ( {SendMessage} ) => {
    return (
        <div className='mask-area'>
            <div className='send-area'>
                <EmojiArea />
                <input
                    id='textBox'
                    className="textBox"
                    type="text"
                    placeholder="Type a message ..."
                    spellCheck={false}
                    autoComplete='off'
                    onKeyDown={(event) => SendMessage(event)}
                />
                <i className="fa-light fa-paperclip"></i>
                <i className="fa-light fa-microphone"></i>
                <i className="fa-solid fa-paper-plane" onClick={() => SendMessage(null)}></i>
            </div>
        </div>
    )
}

export default SendArea