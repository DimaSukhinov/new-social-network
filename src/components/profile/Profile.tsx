import React, {ChangeEvent, useCallback, useState} from 'react';
import s from './Profile.module.scss';
import avatar from '../../assets/images/avatar.jpg'
import {Button, TextField} from '@material-ui/core';
import {useAppSelector} from '../../store/store';
import FavoriteIcon from '@material-ui/icons/Favorite';
import {useDispatch} from 'react-redux';
import {addPostAC, dislikeAPostAC, likeAPostAC} from '../../store/posts-reducer';

export const Profile = React.memo(() => {

    const dispatch = useDispatch()
    const posts = useAppSelector((store) => store.posts)
    const [postText, setPostText] = useState<string>('')

    const onPostTextHandler = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setPostText(e.currentTarget.value)
    }, [])

    const addPost = useCallback(() => {
        if (postText.trim() !== '') {
            dispatch(addPostAC(postText))
        }
        setPostText('')
    }, [dispatch, postText])

    const likeAPost = useCallback((id: string) => () => dispatch(likeAPostAC(id)), [dispatch])
    const dislikeAPost = useCallback((id: string) => () => dispatch(dislikeAPostAC(id)), [dispatch])

    return (
        <div className={s.profile}>
            <div className={s.profile__avatar}>
                <img src={avatar} alt="avatar"/>
            </div>
            <div>
                <div className={s.profile__description}>
                    <h1 className={s.description__name}>Dmitriy Sukhinov</h1>
                    <h3 className={s.description__info}>City: Minsk</h3>
                </div>
                <div className={s.profile__newPost}>
                    <TextField id="outlined-basic" label="New post" variant="outlined" style={{width: '315px'}}
                               value={postText} onChange={onPostTextHandler}/>
                    <Button onClick={addPost} style={{width: '115px', marginLeft: '5px', color: '#000'}}>Add</Button>
                </div>
                <div className={s.profile__posts}>
                    {
                        posts.map(p => <div className={s.posts__post}>
                            <div className={s.post__avatar}>
                                <img src={avatar} alt="avatar"/>
                            </div>
                            <div className={s.post__post}>
                                <h1 className={s.post__text}>{p.text}</h1>
                                <div className={s.post__likes}>
                                    {
                                        p.likedByMe ? <FavoriteIcon onClick={dislikeAPost(p.id)} style={{color: '#ff3347', marginRight: '4px'}}/> :
                                            <FavoriteIcon onClick={likeAPost(p.id)} style={{color: '#909091', marginRight: '4px'}}/>
                                    }
                                    {p.likesCount}
                                </div>
                            </div>
                        </div>)
                    }
                </div>
            </div>
        </div>
    );
})
