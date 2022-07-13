import React from 'react';
import s from './Friends.module.scss';
import {useDispatch} from 'react-redux';
import {useAppSelector} from '../../store/store';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import {PossibleFriends} from './possibleFriends/PossibleFriends';

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
                <PossibleFriends/>
            </div>
        </div>
    );
})
