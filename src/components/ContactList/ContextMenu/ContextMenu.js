import './ContextMenu.css'
import $ from 'jquery'

const ContextMenu = ( {contextList, updateState} ) => {

    document.body.addEventListener('click', (e) => {
        if(e.target.offsetParent !== $('#context-menu')) {
            $('#context-menu').removeClass('visible');
        }
    });

    const contextClick = (action, messageId) => {
        switch(action)
        {
            case 'delete':
                updateState('chatData', 'DEL', messageId);
                break;
            case 'reply':
                console.log('reply' + messageId);
                break;
            default:
                console.log('error' + messageId);
        }
    }

    return (
        <div id='context-menu'>
            {contextList.map((item, index) => {
                return (
                    <div
                        className='context-item'
                        key={index}
                        onClick={() => contextClick(item.action, item.event)}
                    >
                        <i className={`fa-regular fa-${item.icon} fa-fw`}></i>
                        <p>{item.value}</p>
                    </div>
                )
            })}
        </div>
    )
}

export default ContextMenu