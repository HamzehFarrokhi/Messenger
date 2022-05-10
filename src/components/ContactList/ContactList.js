import './ContactList.css'
import $ from 'jquery'

const ContactList = ( {userData, lastChatData, changeChat, setContextMenu, SearchContact} ) => {

    var pinnedCount = 0, allCount = 0;
    const renderPinned = (item) => {
        if (pinnedCount < 2) {
            pinnedCount++;
            return renderList(item, pinnedCount)
        }
    }
    const renderAll = (item) => {
        allCount++;
        if (allCount > 2) {
            return renderList(item, allCount)
        }
    }
    
    var selectedContact = '';
    const renderList = (item, index) => {

        var text = '', time = '', seen;
        lastChatData.forEach(element => {
            if (element.id === item.id) {
                text = element.text;
                time = element.time;
                seen = (element.seen.toString() === '2') ? 
                <img src={process.env.PUBLIC_URL + 'check-recieve.png'} alt='' /> : 
                <i className='fa-regular fa-check'></i>;
            }
        });
        if (text === '')
            text = 'Tap to start messaging';
        if (index === 1)
            text = 'Saved Message';

        selectedContact = '';
        if (index === 2) selectedContact = 'contact-selected';

        return (
            <div
                className={'contact ' + selectedContact}    
                key={index}
                onClick={() => changeChat(index)}
                onContextMenu={(event) => OpenContextMenu(event)}
            >
                <img
                    src={`${process.env.PUBLIC_URL}profiles/${item.id}.jpg`}
                    alt=''
                />
                <div className='section-one'>
                    <p className='m-name'>{item.name}</p>
                    <p className='m-message'>{text}</p>
                </div>
                {(time !== '' && seen !== '') ? <div className='section-two'>
                    <p className='m-time'>{time}</p>
                    <p className='m-status'>
                        {seen}
                    </p>
                </div> : ''}
            </div>
        )
    }

    ////contact event////
    const contextMenuList = [
        { icon: 'comment-check', value: 'Mark as read' },
        { icon: 'thumbtack', value: 'Pin to top' },
        { icon: 'bell-slash', value: 'Mute' },
        { icon: 'box-archive', value: 'Archive' },
        { icon: 'flag', value: 'Report' },
        { icon: 'trash', value: 'Delete chat' }
    ]
    const OpenContextMenu = (event) => {
        event.preventDefault();
        
        setContextMenu(contextMenuList)

        const { clientX: mouseX, clientY: mouseY } = event;
        const { innerWidth: windowX, innerHeight: windowY } = window;

        const contextX = ($('#context-menu').width() > 0) ? $('#context-menu').width() : 152;
        const contextY = ($('#context-menu').height() > 0) ? $('#context-menu').height() : 192;
        
        var diffX = 0, diffY = 0;
        if ((mouseX + contextX + 20) > windowX) {
            diffX = (mouseX + contextX + 20) - windowX;
        }
        if ((mouseY + contextY + 20) > windowY) {
            diffY = (mouseY + contextY + 20) - windowY;
        }
        $('#context-menu').css('top', `${mouseY - diffY}px`)
        $('#context-menu').css('left', `${mouseX - diffX}px`)
        $('#context-menu').removeClass('visible')
        setTimeout(() => {
             $('#context-menu').addClass('visible')
        }, 100);
    }

    return (
        <div className='contact-panel'>
            <div className="textbox">
                <i className="fa-regular fa-magnifying-glass"></i>
                <input
                    className="SearchBox"
                    type="text"
                    placeholder="Search"
                    spellCheck={false}
                    onChange={(e) => SearchContact(e.target.value)}
                />
            </div>
            <div className='contact-list' onScroll={() => $('#context-menu').removeClass('visible')}>
                <div className='pinned'>
                    <p>PINNED</p>
                    {userData.map((item) => renderPinned(item, "pinned"))}
                </div>
                <div className='all'>
                    <p>ALL MESSAGES</p>
                    {userData.map((item) => renderAll(item, "all"))}
                </div>
            </div>
        </div>
    )
}

export default ContactList