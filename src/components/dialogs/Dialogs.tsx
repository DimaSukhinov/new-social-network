import React, {ChangeEvent, useCallback, useState} from 'react';
import s from './Dialogs.module.scss';
import avatar from '../../assets/images/avatar.jpg'
import {useDispatch} from 'react-redux';
import {useAppSelector} from '../../store/store';
import {TextField} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import {
    selectMessageToDeleteAC,
    sendMessageAC, unselectMessageToDeleteAC,
} from '../../store/dialogs-reducer';
import {Menu} from './menu/Menu';
import BlockIcon from '@material-ui/icons/Block';

export const Dialogs = React.memo(() => {

    const dispatch = useDispatch()
    const dialogs = useAppSelector((store) => store.dialogs)

    const [currentUser, setCurrentUser] = useState<string>('')
    const [messageText, setMessageText] = useState<string>('')
    const [searchUser, setSearchUser] = useState<string>('')
    const [searchMessage, setSearchMessage] = useState<string>('')
    const [selectedMessages, setSelectedMessages] = useState<number>(0)
    const [openMore, setOpenMore] = useState<boolean>(false)
    const [searchMessageMode, setSearchMessageMode] = useState<boolean>(false)

    const openMessages = useCallback((userId: string) => () => {
        setCurrentUser(userId)
        setSelectedMessages(0)
        setOpenMore(false)
        setSearchMessageMode(false)
        setSearchMessage('')
    }, [])

    const onMessageTextHandler = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setMessageText(e.currentTarget.value)
        setOpenMore(false)
    }, [])

    const changeSearchUserHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => setSearchUser(e.currentTarget.value), [])
    const changeSearchMessageHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => setSearchMessage(e.currentTarget.value), [])

    const sendMessage = useCallback(() => {
        if (messageText.trim() !== '') {
            dispatch(sendMessageAC(currentUser, messageText))
        }
        setMessageText('')
    }, [dispatch, currentUser, messageText])

    const selectMessageForDelete = useCallback((messageId: string) => () => {
        dispatch(selectMessageToDeleteAC(messageId))
        setSelectedMessages(selectedMessages + 1)
        setOpenMore(false)
    }, [dispatch, selectedMessages])

    const unselectMessageForDelete = useCallback((messageId: string) => () => {
        dispatch(unselectMessageToDeleteAC(messageId))
        setSelectedMessages(selectedMessages - 1)
    }, [dispatch, selectedMessages])

    let filteredUsers = dialogs.dialogs
    if (searchUser) {
        filteredUsers = dialogs.dialogs.filter(d => d.name.toLowerCase().includes(searchUser.toLowerCase()))
    }

    let filteredMessages = dialogs.messages
    if (searchMessage) {
        filteredMessages = dialogs.messages.filter(m => m.message.toLowerCase().includes(searchMessage.toLowerCase()))
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogs__users}>
                <div>
                    <TextField id="outlined-basic" label="Search" variant="standard" value={searchUser}
                               style={{margin: '5px 0 5px 10px'}} onChange={changeSearchUserHandler}/>
                </div>
                {
                    filteredUsers.map(d => <div className={s.users__container} onClick={openMessages(d.userId)}>
                        <div className={s.user}>
                            <img src={avatar} alt="avatar"/>
                            <div>
                                <h3 className={s.user__name}>{d.name}</h3>
                            </div>
                        </div>
                    </div>)
                }
            </div>
            {
                currentUser !== '' && <div className={s.dialogs__messages}>
                    <Menu selectedMessages={selectedMessages} setCurrentUser={setCurrentUser} setOpenMore={setOpenMore}
                          currentUser={currentUser} openMore={openMore} setSelectedMessages={setSelectedMessages}
                          searchMessageMode={searchMessageMode} setSearchMessageMode={setSearchMessageMode}
                          changeSearchMessageHandler={changeSearchMessageHandler} searchMessage={searchMessage}
                          setSearchMessage={setSearchMessage}
                    />
                    <div className={s.messages__container}>
                        <div className={s.messages}>
                            {
                                filteredMessages.map(m => m.userId === currentUser &&
                                    <div className={m.isSelected ? s.message__selected : s.message}
                                         onClick={m.isSelected ? unselectMessageForDelete(m.messageId) : selectMessageForDelete(m.messageId)}>
                                        {m.message}
                                    </div>)
                            }
                        </div>
                        <div className={s.profile__newMessage}>
                            {dialogs.dialogs.map(d => d.userId === currentUser && d.isDisabled &&
                                <div className={s.blocked}>
                                    <BlockIcon fontSize={'large'} style={{color: 'red'}}/>
                                    <span>You have added this user to the blacklist. To write to him, you need to remove
                                        him from your black list.</span>
                                </div>)}
                            {dialogs.dialogs.map(d => d.userId === currentUser && !d.isDisabled &&
                                <div className={s.newMessage}>
                                    <TextField id="outlined-basic" label="Write a message" variant="outlined"
                                               style={{width: '400px'}} value={messageText}
                                               onChange={onMessageTextHandler}/>
                                    <SendIcon onClick={sendMessage} fontSize={'large'} style={{marginLeft: '10px'}}/>
                                </div>)}
                        </div>
                    </div>
                </div>
            }
        </div>
    );
})
