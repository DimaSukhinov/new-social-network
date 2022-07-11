import React, {ChangeEvent, useCallback, useState} from 'react';
import s from './Dialogs.module.scss';
import avatar from '../../assets/images/avatar.jpg'
import {useDispatch} from 'react-redux';
import {useAppSelector} from '../../store/store';
import {TextField} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import SearchIcon from '@material-ui/icons/Search';
import {
    deleteMessageAC,
    selectMessageToDeleteAC,
    sendMessageAC, unselectMessageToDeleteAC,
} from '../../store/dialogs-reducer';

export const Dialogs = React.memo(() => {

    const dispatch = useDispatch()
    const dialogs = useAppSelector((store) => store.dialogs)

    const [currentUser, setCurrentUser] = useState<string>('')
    const [messageText, setMessageText] = useState<string>('')
    const [searchUser, setSearchUser] = useState<string>('')
    const [selectedMessages, setSelectedMessages] = useState<number>(0)
    const [openMore, setOpenMore] = useState<boolean>(false)

    const openMessages = useCallback((userId: string) => () => {
        setCurrentUser(userId)
        setSelectedMessages(0)
        setOpenMore(false)
    }, [])

    const closeMessages = useCallback(() => setCurrentUser(''), [])

    const onMessageTextHandler = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setMessageText(e.currentTarget.value)
        setOpenMore(false)
    }, [])

    const changeSearchUserHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => setSearchUser(e.currentTarget.value), [])

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

    const deleteMessage = useCallback(() => {
        dispatch(deleteMessageAC())
        setSelectedMessages(0)
    }, [dispatch])

    const openMoreModal = useCallback(() => setOpenMore(!openMore), [openMore])

    let filteredUsers = dialogs.dialogs
    if (searchUser) {
        filteredUsers = dialogs.dialogs.filter(d => d.name.toLowerCase().includes(searchUser.toLowerCase()))
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
                    <div className={s.messages__menu}>
                        {
                            selectedMessages > 0 ? <div className={s.messages__delete}>
                                    <DeleteForeverIcon onClick={deleteMessage}/>
                                </div>
                                : dialogs.dialogs.map(d => d.userId === currentUser && <>
                                    <div className={s.close} onClick={closeMessages}>
                                        <ArrowBackIosIcon fontSize={'small'}/>
                                        <span>Close</span>
                                    </div>
                                    <h3>{d.name}</h3>
                                    <MoreHorizIcon onClick={openMoreModal}/>
                                    {openMore && <div className={s.menu__openMore}>

                                    </div>}
                                </>)
                        }
                    </div>
                    <div className={s.messages__container}>
                        <div className={s.messages}>
                            {
                                dialogs.messages.map(m => m.userId === currentUser &&
                                    <div className={m.isSelected ? s.message__selected : s.message}
                                         onClick={m.isSelected ? unselectMessageForDelete(m.messageId) : selectMessageForDelete(m.messageId)}>
                                        {m.message}
                                    </div>)
                            }
                        </div>
                        <div className={s.profile__newMessage}>
                            <TextField id="outlined-basic" label="Write a message" variant="outlined"
                                       style={{width: '400px'}} value={messageText} onChange={onMessageTextHandler}/>
                            <SendIcon onClick={sendMessage} fontSize={'large'} style={{marginLeft: '10px'}}/>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
})
