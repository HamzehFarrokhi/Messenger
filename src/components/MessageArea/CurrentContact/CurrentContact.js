import './CurrentContact.css'

const CurrentContact = ({currentContact}) => {
    if (currentContact !== undefined) {
        return (
            <div className='current-contact'>
                <div className='left-side'>
                    <img
                        src={`${process.env.PUBLIC_URL}profiles/${currentContact.id}.jpg`}
                        alt=''
                    />
                    <div className='chatter-info'>
                        <p className='c-name'>{currentContact.name}</p>
                        <p className='c-status'>{currentContact.status}</p>
                    </div>
                </div>
                <div className='right-side'>
                    <i className="fa-light fa-phone"></i>
                    <i className="fa-light fa-video"></i>
                    <i className="fa-light fa-magnifying-glass"></i>
                    <i className="fa-light fa-ellipsis-vertical"></i>
                </div>
            </div>
        )
    }
}

export default CurrentContact