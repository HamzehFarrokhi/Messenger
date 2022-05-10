import './EmojiArea.css'

const EmojiArea = () => {

    const emojis = [
        '😀',
        '😁',
        '😂',
        '😃',
        '😄',
        '😅',
        '😆',
        '😇',
        '😈',
        '😉',
        '😊',
        '😋',
        '😌',
        '😍',
        '😎',
        '😏',
        '😐',
        '😑',
        '😒',
        '😓',
        '😔',
        '😕',
        '😖',
        '😗',
        '😘',
        '😙',
        '😚',
        '😛',
        '😜',
        '😝',
        '😞',
        '😟',
        '😠',
        '😡',
        '😢',
        '😣',
        '😤',
    ]
    const emojiHex = [];
    emojis.forEach((element, index) => {
        emojiHex[index] = element.codePointAt(0).toString(16);
    });

    const backSpaces = () => {
        var input = document.getElementById('textBox');
        if (input.value !== 0) {
            if (emojiHex.includes(input.value.slice(-2, input.value.lentgh).codePointAt(0).toString(16)))
                input.value = input.value.slice(0, -2);
            else
                input.value = input.value.slice(0, -1)
        }
        input.focus();
    }
    
    const addIcon = (value) => {
        var inputBox = document.getElementById('textBox');
        inputBox.value += value;
        inputBox.focus();
    }

    return (
        <div className='emojies'>
            <i className="fa-light fa-face-smile"></i>
            <div className='emoji-panel'>
                <div className='emoji-main'>
                    <div className='emoji-category'>
                        <i className="fa-light fa-clock"></i>
                        <i className="fa-light fa-face-smile"></i>
                        <i className="fa-light fa-apple-whole"></i>
                        <i className="fa-light fa-futbol"></i>
                    </div>
                    {emojis.map((item, index) => {
                        return (
                            <p key={index} onClick={(e) => addIcon(e.target.innerHTML)}>{item}</p>
                        )
                    })}
                    <div className='back-emoji'>
                        <i className="fa-light fa-delete-left" onClick={backSpaces}></i>
                    </div>
                </div>
            </div>
        </div>
        
    )
}

export default EmojiArea