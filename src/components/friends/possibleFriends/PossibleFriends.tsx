import React from 'react';
import s from './PossibleFriends.module.scss';
import {useDispatch} from 'react-redux';
import {useAppSelector} from '../../../store/store';
import {addAsFriendAC} from '../../../store/friends-reducer';
import {disableDialogAC} from '../../../store/dialogs-reducer';

export const PossibleFriends = React.memo(() => {

    const dispatch = useDispatch()
    const friends = useAppSelector((store) => store.friends)

    const addAsFriend = (id: string) => () => {
        dispatch(addAsFriendAC(id))
        dispatch(disableDialogAC(id))
    }

    return (
        <div className={s.possible__friends}>
            <h3 className={s.possibleFriends__title}>Possible friends</h3>
            {friends.map(f => !f.isFriend && <div className={s.possible__friend}>
                <div className={s.possibleFriend__about}>
                    <img src={f.img} alt="avatar"/>
                    <div className={s.about__possibleFriend}>
                        <h3>{f.name}</h3>
                        <span>{f.location}</span>
                    </div>
                </div>
                <div className={s.add} onClick={addAsFriend(f.id)}>
                    + Add as friend
                </div>
            </div>)}
        </div>
    );
})
