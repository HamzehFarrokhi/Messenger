import './MessageArea.css'
import $ from 'jquery'
import CurrentContact from './CurrentContact/CurrentContact';
import SendArea from './SendArea/SendArea';

const MessageArea = ( {chatData, SendMessage, MessageRenderer, currentContact} ) => {
    return (
        <div className='message-area'>
            <CurrentContact currentContact={currentContact} />
            <div
                id='chat-area'
                className='chat-area'
                style={{backgroundImage: `url(${process.env.PUBLIC_URL}backgrounds/5.jpg)`}}
                onScroll={() => $('#context-menu').removeClass('visible')}
            >
                {chatData.slice(0).reverse().map((item, index) => MessageRenderer(item, index))}
            </div>
            <SendArea SendMessage={SendMessage}/>
        </div>
    )
}

export default MessageArea