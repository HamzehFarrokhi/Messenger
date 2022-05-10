import './SidePanel.css'

var brightNow = true;
const SidePanel = () => {

    const changeListView = () => {

    }

    const changeTheme = (bright) => {
        if (brightNow !== bright) {
            var r = document.querySelector(':root');
            var chatArea = document.querySelector('#chat-area');
            if (bright) {
                r.style.setProperty('--background', '#fff');
                r.style.setProperty('--sideBackground', '#fff');
                r.style.setProperty('--color1', '#000');
                r.style.setProperty('--color2', '#333');
                r.style.setProperty('--color3', '#999');
                r.style.setProperty('--color4', '#f5f5f5');
                r.style.setProperty('--border', '#ddd');
                r.style.setProperty('--textBox', 'rgb(243, 243, 243)');
                r.style.setProperty('--textBoxColor', '#ccc');
                r.style.setProperty('--icon', '#aaa');
                r.style.setProperty('--iconActive', 'rgb(104, 104, 252)');
                r.style.setProperty('--contactScroll', 'rgb(239, 239, 255)');
                r.style.setProperty('--contactScrollHover', 'rgb(225, 225, 225)');
                r.style.setProperty('--chatScroll', 'rgb(200, 200, 200)');
                r.style.setProperty('--chatScrollHover', 'rgb(180, 180, 180)');
                r.style.setProperty('--sendMessage', 'rgb(104, 104, 252)');
                r.style.setProperty('--sendColor', '#f5f5f5');
                r.style.setProperty('--recieveMessage', '#fff');
                r.style.setProperty('--recieveColor', '#333');
                r.style.setProperty('--messageSelect', 'rgba(255, 255, 255, 0.4)');
                r.style.setProperty('--boxShadow', '0 1px 5px rgba(0, 0, 0, 0.10)');
                r.style.setProperty('--maskedArea', 'rgb(238, 238, 238)');
                r.style.setProperty('--contextMenuBack', 'rgba(255, 255, 255, 0.6)');
                r.style.setProperty('--redNotice', 'rgb(233, 22, 22)');
                chatArea.style.setProperty('background', `url(${process.env.PUBLIC_URL}backgrounds/5.jpg)`);
                document.querySelector('.fa-sun-bright').classList.add('active-icon');
                document.querySelector('.fa-moon').classList.remove('active-icon');
            }
            else {
                r.style.setProperty('--background', '#1d1d29');
                r.style.setProperty('--sideBackground', '#242834');
                r.style.setProperty('--color1', '#fff');
                r.style.setProperty('--color2', '#ddd');
                r.style.setProperty('--color3', '#888');
                r.style.setProperty('--color4', '#242834');
                r.style.setProperty('--border', '#333');
                r.style.setProperty('--textBox', '#242834');
                r.style.setProperty('--textBoxColor', '#888');
                r.style.setProperty('--icon', '#aaa'); //noChanges
                r.style.setProperty('--iconActive', 'rgb(104, 104, 252)'); //noChanges
                r.style.setProperty('--contactScroll', '#242834');
                r.style.setProperty('--contactScrollHover', '#343844');
                r.style.setProperty('--chatScroll', '#242834');
                r.style.setProperty('--chatScrollHover', '#343844');
                r.style.setProperty('--sendMessage', 'rgb(104, 104, 252)'); //noChanges
                r.style.setProperty('--sendColor', '#f5f5f5'); //noChanges
                r.style.setProperty('--recieveMessage', '#242834');
                r.style.setProperty('--recieveColor', '#ccc');
                r.style.setProperty('--messageSelect', 'rgba(0, 0, 0, 0.3)');
                r.style.setProperty('--boxShadow', '0 1px 3px rgba(0, 0, 0, 0.6)');
                r.style.setProperty('--maskedArea', '#242834');
                r.style.setProperty('--contextMenuBack', '#24283490');
                r.style.setProperty('--redNotice', 'rgb(255, 137, 137)');
                chatArea.style.setProperty('background', `url(${process.env.PUBLIC_URL}backgrounds/6.jpg)`);
                document.querySelector('.fa-sun-bright').classList.remove('active-icon');
                document.querySelector('.fa-moon').classList.add('active-icon');
            }
            brightNow = bright;
        }
    }

    return (
        <div className='side-panel'>
            <div className='main-options'>
                <i onClick={changeListView} className="fa-solid fa-comment-dots active-icon"></i>
                <i onClick={changeListView} className="fa-light fa-user"></i>
            </div>
            <div className='accessories'>
                <i className="fa-light fa-star"></i>
                <i className="fa-light fa-bookmark"></i>
                <i className="fa-light fa-gear"></i>
            </div>
            <div className='theme'>
                <i onClick={() => changeTheme(true)} className="fa-light fa-sun-bright active-icon"></i>
                <i onClick={() => changeTheme(false)} className="fa-light fa-moon"></i>
            </div>
        </div>
    )
}

export default SidePanel