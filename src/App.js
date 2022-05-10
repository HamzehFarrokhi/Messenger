import './App.css';
import { useState, useEffect } from 'react'
import SidePanel from './components/SidePanel/SidePanel';
import MessageArea from './components/MessageArea/MessageArea';
import ContactList from './components/ContactList/ContactList';
import ContextMenu from './components/ContactList/ContextMenu/ContextMenu';
import $ from 'jquery'

function App() {
    
    /////One Time Get_Set
    const [userData, setUserData] = useState([])
    const [chatData, setChatData] = useState([])
    var currentUser = 1;

    const [tempChat, setTempChat] = useState([])
    const [lastChatData, setLastChatData] = useState([])
    const [currentChat, setCurrentChat] = useState(2);
    useEffect(() => {
        const sendRequest = async () => {
            const userDataResponse = await fetch('https://armateam.ir/rest/api/messageUser')
            const chatDataResponse = await fetch(`https://armateam.ir/rest/api/messageChat/1_2`)
            const lastChatDataResponse = await fetch(`https://armateam.ir/rest/api/messageChat/last_1`)
            const Data1 = await userDataResponse.json()
            const Data2 = await chatDataResponse.json()
            const Data3 = await lastChatDataResponse.json()
            setUserData(Data1)
            setChatData(Data2)
            setLastChatData(Data3)
        }
        sendRequest()
    }, [])
  
    function changeChat (UserKey) {
        setCurrentChat(UserKey);
        $('.contact').removeClass('contact-selected');
        $('.contact')[UserKey - 1].classList.add('contact-selected');
        const sendRequest = async () => {
            const chatDataResponse = await fetch(`https://armateam.ir/rest/api/messageChat/${currentUser}_${UserKey}`)
            const Data = await chatDataResponse.json()
            var tempRows = [];
            tempChat.forEach(element => {
                if(element[0] === UserKey)
                    tempRows = [...tempRows, element[1]]
            });
            if (tempRows.length !== 0)
                setChatData([...Data, ...tempRows])
            else
                setChatData(Data)
        }
        sendRequest()
    }

    var currentMessageSender='';
    var changeProfileSteps=[];
    const SendMessage = (event) => {
        if (event !== null) {
            if (event.key === "Enter") {
                event.preventDefault();
                SendMessageFunction();
            }
        }
        else {
            SendMessageFunction();
        }
    }

    var inputBox = document.getElementById('textBox');
    const SendMessageFunction = () => {
        if (inputBox.value !== '') {
            $('.chat-area').scrollTop(0);
            currentMessageSender='';
            changeProfileSteps=[];

            var current = new Date();
            var dd = String(current.getDate()).padStart(2, '0');
            var mm = String(current.getMonth() + 1).padStart(2, '0'); //January is 0!
            var yyyy = current.getFullYear();

            var sendId = (chatData.length !== 0) ? (parseInt(chatData[chatData.length - 1].id) + 1) : 1;

            var payam = {
                id: sendId.toString(),
                sender_id: currentUser.toString(),
                reciever_id: currentChat.toString(),
                text: inputBox.value,
                file: '',
                voice: '',
                date: `${yyyy}/${mm}/${dd}`,
                time: `${current.getHours()}:${current.getMinutes()}` + ((current.getHours() >=12) ? " PM" : " AM"),
                seen: '1'
            }
            setChatData([...chatData, payam])
            setTempChat([...tempChat, [currentChat, payam]])

            //change lastChatData
            var newOredit = null;
            lastChatData.forEach((element, index) => {
                if (element.id === currentChat.toString())
                    newOredit = index;
            });
            var tempArr = null;
            if (newOredit) {
                tempArr = [...lastChatData];
                tempArr[newOredit].text = inputBox.value;
                tempArr[newOredit].time = `${current.getHours()}:${current.getMinutes()}` + ((current.getHours() >=12) ? " PM" : " AM");
                tempArr[newOredit].seen = '1';
                setLastChatData(tempArr);
            }
            else {
                tempArr = {
                    id: currentChat.toString(),
                    text: inputBox.value,
                    time: `${current.getHours()}:${current.getMinutes()}` + ((current.getHours() >=12) ? " PM" : " AM"),
                    seen: '1'
                }
                setLastChatData([...lastChatData, tempArr]);
            }
            
            inputBox.value = '';
        }
    }

    const MessageRenderer = (item, index) => {
        inputBox.focus();

        /////peyda kardan gamhaye namayesh chatProfile
        if (changeProfileSteps.length === 0) {
            const length = chatData.length;
            chatData.forEach((element, index) => {
                if (element.sender_id !== currentMessageSender) {
                    changeProfileSteps = [...changeProfileSteps, length-index-1]
                    currentMessageSender = element.sender_id;
                }
            });
            changeProfileSteps.reverse();
        }

        var ME = "";
        if (userData[currentUser - 1].name === userData[item.sender_id - 1].name)
            ME = "Me";

        var chatProfile = '';
        if (changeProfileSteps.includes(index)) {
            chatProfile = (
                <div className={`chat-profile ${ME}`}>
                    <img
                        src={`${process.env.PUBLIC_URL}profiles/${item.sender_id}.jpg`}
                        alt=''
                    />
                    <p className='profile-name'>{userData[item.sender_id - 1].name}</p>
                </div>
            )
        }

        const provider = (currentUser.toString() === item.sender_id.toString()) ? "send" : "recieve";
        const seen = (item.seen.toString() === '2') ? 
            <img className='seen' src={process.env.PUBLIC_URL + `check-${provider}.png`} alt='' /> : 
            <i className='fa-solid fa-check seen'></i>;
        return (
            <div key={item.id} className='payam'>
                {chatProfile}
                <div id={'message' + item.id} className={provider} onContextMenu={(event) => OpenContextMenu(event, event.target.id)}>
                    <p className='m-simple'>
                        {item.text}
                    </p>
                    <div className='m-info'>
                        <p className='time'>{item.time}</p>
                        {seen}
                    </div>
                </div>
            </div>
        )
    }

    ////contact event////
    var messagesContextMenuList = [
        { icon: 'reply', value: 'Reply', action: 'reply', event: null },
        { icon: 'thumbtack', value: 'Pin', action: 'pin', event: null },
        { icon: 'arrow-down-to-line', value: 'Download', action: 'download', event: null },
        { icon: 'share', value: 'Forward', action: 'forward', event: null },
        { icon: 'circle-check', value: 'Select', action: 'select', event: null },
        { icon: 'trash', value: 'Delete', action: 'delete', event: null }
    ]
    const OpenContextMenu = (event, messageId) => {
        event.preventDefault();

        messagesContextMenuList.forEach(element => {
            element.event = messageId;
        });

        setContextMenu(messagesContextMenuList)

        //$('#' + messageId).css('background-color', 'var(--messageSelect)');

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

    const [contextList, setcontextList] = useState([])
    const setContextMenu = (contextMenuList) => {
        setcontextList(contextMenuList)
    }
    
    const updateState = (stateName, action, messageId) => {
        if (stateName === 'chatData') {
            if (action === 'DEL') {
                const id = (messageId.slice(-1));
                var tempID = null;
                tempChat.forEach((element, index) => {
                    if (element[1].id === id)
                        tempID = index;
                });
                
                if (tempID !== null) {
                    //change chatData & tempData
                    var newTempChat = [...tempChat];
                    newTempChat.splice(tempID, 1)
                    setTempChat(newTempChat)
                    console.log(newTempChat)
                    
                    var newChatData = [...chatData];
                    console.log(newChatData)
                    var mainId = null;
                    chatData.forEach((element, index) => {
                        if (element.id === id)
                            mainId = index;
                    });
                    newChatData.splice(mainId, 1)
                    setChatData(newChatData)

                    //change lastChatData
                    var lastId = null;
                    lastChatData.forEach((element, index) => {
                        if (element.id === currentChat.toString())
                            lastId = index;
                    });
                    if (lastId !== null) {
                        var tempArr = [...lastChatData];
                        tempArr[lastId].text = newChatData[newChatData.length - 1].text;
                        tempArr[lastId].time = newChatData[newChatData.length - 1].time;
                        tempArr[lastId].seen = newChatData[newChatData.length - 1].seen;
                        setLastChatData(tempArr);
                    }
                }
            }
        }
    }

    return (
        <div>
            <ContextMenu contextList={contextList} updateState={updateState}/>
            <SidePanel />
            <ContactList
                userData={userData}
                changeChat={changeChat}
                setContextMenu={setContextMenu}
                lastChatData={lastChatData}
            />
            <MessageArea
                currentContact={userData[currentChat - 1]}
                chatData={chatData}
                SendMessage={SendMessage}
                MessageRenderer={MessageRenderer}
                setContextMenu={setContextMenu}
            />
        </div>
    );
}

export default App;
