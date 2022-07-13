import React, {ChangeEvent, useCallback} from 'react';
import s from './Menu.module.scss';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import ArrowBackIosIcon from '@material-ui/icons/ArrowBackIos';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import SearchIcon from '@material-ui/icons/Search';
import DeleteOutlineIcon from '@material-ui/icons/DeleteOutline';
import BlockIcon from '@material-ui/icons/Block';
import {useAppSelector} from '../../../store/store';
import {deleteDialogAC, deleteMessageAC, disableDialogAC} from '../../../store/dialogs-reducer';
import {useDispatch} from 'react-redux';
import {Button, TextField} from '@material-ui/core';
import {removeFromFriendsAC} from '../../../store/friends-reducer';

type MenuPropsType = {
    openMore: boolean
    currentUser: string
    searchMessage: string
    selectedMessages: number
    searchMessageMode: boolean
    setOpenMore: (openMore: boolean) => void
    setCurrentUser: (currentUser: string) => void
    setSearchMessage: (searchMessage: string) => void
    setSelectedMessages: (selectedMessages: number) => void
    setSearchMessageMode: (searchMessageMode: boolean) => void
    changeSearchMessageHandler: (e: ChangeEvent<HTMLInputElement>) => void
}

export const Menu = React.memo((props: MenuPropsType) => {

    const dispatch = useDispatch()
    const dialogs = useAppSelector((store) => store.dialogs)
    const friends = useAppSelector((store) => store.friends)

    const closeMessages = useCallback(() => props.setCurrentUser(''), [props])
    const openMoreModal = useCallback(() => props.setOpenMore(!props.openMore), [props])

    const deleteMessage = useCallback(() => {
        dispatch(deleteMessageAC())
        props.setSelectedMessages(0)
    }, [dispatch, props])

    const openMessageSearch = useCallback(() => {
        props.setOpenMore(false)
        props.setSearchMessageMode(true)
    }, [props])

    const closeMessageSearch = useCallback(() => {
        props.setSearchMessageMode(false)
        props.setSearchMessage('')
    }, [props])

    const deleteDialog = useCallback(() => {
        dispatch(deleteDialogAC(props.currentUser))
        props.setOpenMore(false)
        props.setCurrentUser('')
    }, [dispatch, props])

    const disableDialog = useCallback(() => {
        dispatch(disableDialogAC(props.currentUser))
        dispatch(removeFromFriendsAC(props.currentUser))
        props.setOpenMore(false)
    }, [dispatch, props])

    return (
        <div className={s.messages__menu}>
            {
                props.selectedMessages > 0 ? <div className={s.messages__delete}>
                        <DeleteForeverIcon onClick={deleteMessage}/>
                    </div>
                    : !props.searchMessageMode ? dialogs.dialogs.map(d => d.userId === props.currentUser && <>
                        <div className={s.close} onClick={closeMessages}>
                            <ArrowBackIosIcon fontSize={'small'}/>
                            <span>Close</span>
                        </div>
                        {friends.map(f => f.id === props.currentUser && <h3>{f.name}</h3>)}
                        <MoreHorizIcon onClick={openMoreModal} style={{cursor: 'pointer'}}/>
                        {
                            props.openMore && <div className={s.menu__openMore}>
                                <div className={s.openMore__item} onClick={openMessageSearch}>
                                    <SearchIcon/>
                                    <span>Search message</span>
                                </div>
                                <div className={s.openMore__item} onClick={deleteDialog}>
                                    <DeleteOutlineIcon/>
                                    <span>Delete dialog</span>
                                </div>
                                <div className={s.openMore__item} onClick={disableDialog}>
                                    <BlockIcon/>
                                    {dialogs.dialogs.map(d => d.userId === props.currentUser && d.isDisabled &&
                                        <span>Unlock dialog</span>)}
                                    {dialogs.dialogs.map(d => d.userId === props.currentUser && !d.isDisabled &&
                                        <span>Disable dialog</span>)}
                                </div>
                            </div>
                        }
                    </>) : <div className={s.messages__search}>
                        <TextField id="outlined-basic" label="Search" variant="standard" value={props.searchMessage}
                                   onChange={props.changeSearchMessageHandler} className={s.search__input}/>
                        <Button variant="contained" onClick={closeMessageSearch}>Cancel</Button>
                    </div>
            }
        </div>
    );
})
