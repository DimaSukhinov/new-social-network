import React, {ChangeEvent, useCallback, useState} from 'react';
import s from './Profile.module.scss';
import {Button, TextField} from '@material-ui/core';
import {useAppSelector} from '../../store/store';
import FavoriteIcon from '@material-ui/icons/Favorite';
import MoreHorizIcon from '@material-ui/icons/MoreHoriz';
import DeleteForeverIcon from '@material-ui/icons/DeleteForever';
import {useDispatch} from 'react-redux';
import {addPostAC, changeAvatarAC, deletePostAC, dislikeAPostAC, likeAPostAC} from '../../store/profile-reducer';

export const Profile = React.memo(() => {

    const dispatch = useDispatch()
    const profile = useAppSelector((store) => store.profile)
    const [postText, setPostText] = useState<string>('')
    const [openPhotoLoader, setOpenPhotoLoader] = useState<boolean>(false)
    const [openMore, setOpenMore] = useState<boolean>(false)

    const onPostTextHandler = useCallback((e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setPostText(e.currentTarget.value)
    }, [])

    const addPost = useCallback(() => {
        if (postText.trim() !== '') {
            dispatch(addPostAC(postText))
        }
        setPostText('')
    }, [dispatch, postText])

    const deletePost = useCallback((id: string) => () => {
        dispatch(deletePostAC(id))
        setOpenMore(false)
    }, [dispatch])

    const likeAPost = useCallback((id: string) => () => dispatch(likeAPostAC(id)), [dispatch])
    const dislikeAPost = useCallback((id: string) => () => dispatch(dislikeAPostAC(id)), [dispatch])

    const openPhotoLoaderModal = useCallback(() => setOpenPhotoLoader(true), [])
    const closePhotoLoaderModal = useCallback(() => setOpenPhotoLoader(false), [])

    const openMoreModal = useCallback(() => setOpenMore(true), [])
    const closeMoreModal = useCallback(() => setOpenMore(false), [])

    const savePhoto = useCallback((file: any) => {
        let reader = new FileReader()
        reader.readAsDataURL(file)
        reader.onload = (() => {
            dispatch(changeAvatarAC(reader.result))
        })
        setOpenPhotoLoader(false)
    }, [dispatch])

    const onAvatarChange = useCallback((e: any) => savePhoto(e.target.files[0]), [savePhoto])

    return (
        <div className={s.profile}>
            <div className={s.profile__avatar}>
                <img src={profile.currentUser.img} alt="avatar"/>
                <span onClick={openPhotoLoader ? closePhotoLoaderModal : openPhotoLoaderModal}>Upload a photo</span>
                {
                    openPhotoLoader && <div className={s.avatar__loader}>
                        <input type="file" onChange={onAvatarChange}/>
                    </div>
                }
            </div>
            <div>
                <div className={s.profile__description}>
                    <h1 className={s.description__name}>{profile.currentUser.name}</h1>
                    <h3 className={s.description__info}>City: {profile.currentUser.location}</h3>
                </div>
                <div className={s.profile__newPost}>
                    <TextField id="outlined-basic" label="New post" variant="outlined" style={{width: '315px'}}
                               value={postText} onChange={onPostTextHandler}/>
                    <Button onClick={addPost} style={{width: '115px', marginLeft: '5px', color: '#000'}}>Add</Button>
                </div>
                <div className={s.profile__posts}>
                    {
                        profile.posts.map(p => <div className={s.posts__post}>
                            <div className={s.post__container}>
                                <div className={s.post__avatar}>
                                    <img src={profile.currentUser.img} alt="avatar"/>
                                </div>
                                <div className={s.post}>
                                    <h1 className={s.post__text}>{p.text}</h1>
                                    <div className={s.post__likes}>
                                        {p.likedByMe ? <FavoriteIcon onClick={dislikeAPost(p.id)}
                                                                     style={{color: '#ff3347', marginRight: '4px'}}/>
                                            : <FavoriteIcon onClick={likeAPost(p.id)}
                                                            style={{color: '#909091', marginRight: '4px'}}/>}
                                        {p.likesCount}
                                    </div>
                                </div>
                            </div>
                            <MoreHorizIcon onClick={openMore ? closeMoreModal : openMoreModal}/>
                            {openMore && <div className={s.openMore}>
                                <div className={s.openMore__item} onClick={deletePost(p.id)}>
                                    <DeleteForeverIcon/>
                                    <span>Delete post</span>
                                </div>
                            </div>}
                        </div>)
                    }
                </div>
            </div>
        </div>
    );
})
