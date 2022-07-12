import React from 'react';
import s from './Friends.module.scss';
import {useDispatch} from 'react-redux';
import {useAppSelector} from '../../store/store';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';

export const Friends = React.memo(() => {

    const dispatch = useDispatch()
    const friends = useAppSelector((store) => store.friends)

    return (
        <div className={s.friends__page}>
            <div className={s.friends}>
                {friends.map(f => f.isFriend && <div className={s.friend}>
                    <div className={s.friend__about}>
                        <img src={f.img} alt="avatar"/>
                        <div className={s.about__friend}>
                            <h3>{f.name}</h3>
                            <span>{f.location}</span>
                        </div>
                    </div>
                    <MoreHorizIcon/>
                </div>)}
            </div>
            <div>
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
                        <div className={s.add}>
                            + Add as friend
                        </div>
                    </div>)}
                </div>
            </div>
        </div>
    );
})
