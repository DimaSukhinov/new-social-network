import React, {ChangeEvent, useCallback, useState} from 'react';
import s from './Dialogs.module.scss';
import avatar from '../../assets/images/avatar.jpg'
import {useAppSelector} from '../../store/store';
import {TextField} from '@material-ui/core';
import SendIcon from '@material-ui/icons/Send';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import {sendMessageAC} from '../../store/dialogs-reducer';
import {useDispatch} from 'react-redux';

export const Dialogs = React.memo(() => {

    const dispatch = useDispatch()
    const dialogs = useAppSelector((store) => store.dialogs)

    const [currentUser, setCurrentUser] = useState<string>('')
    const [messageText, setMessageText] = useState<string>('')
    const [searchUser, setSearchUser] = useState<string>('')

    const openMessages = useCallback((userId: string) => () => setCurrentUser(userId), [])
    const closeMessages = useCallback(() => setCurrentUser(''), [])

    const onPostTextHandler = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setMessageText(e.currentTarget.value)
    }, [])

    const changeSearchUserHandler = useCallback((e: ChangeEvent<HTMLInputElement>) => setSearchUser(e.currentTarget.value), [])

    const sendMessage = useCallback(() => {
        if (messageText.trim() !== '') {
            dispatch(sendMessageAC(currentUser, messageText))
        }
        setMessageText('')
    }, [dispatch, currentUser, messageText])

    let filteredUsers = dialogs.dialogs
    if (searchUser) {
        filteredUsers = dialogs.dialogs.filter(d => d.name.toLowerCase().includes(searchUser.toLowerCase()))
    }

    return (
        <div className={s.dialogs}>
            <div className={s.dialogs__users}>
                <div className={s.messages__close}>
                    <TextField id="outlined-basic" label="Search" variant="standard" value={searchUser}
                               style={{margin: '5px 0 5px 10px'}} onChange={changeSearchUserHandler}/>
                    {currentUser !== '' && <div className={s.close} onClick={closeMessages}>
                        <ArrowBackIosIcon fontSize={'small'}/>
                        <span>Close</span>
                    </div>}
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
            {currentUser !== '' && <div className={s.dialogs__messages}>
                <div className={s.messages}>
                    {dialogs.messages.map(m => m.userId === currentUser && <div>{m.message}</div>)}
                </div>
                <div className={s.profile__newMessage}>
                    <TextField id="outlined-basic" label="Write a message" variant="outlined"
                               style={{width: '400px'}} value={messageText} onChange={onPostTextHandler}/>
                    <SendIcon onClick={sendMessage} fontSize={'large'} style={{marginLeft: '10px'}}/>
                </div>
            </div>}
        </div>
    );
})
