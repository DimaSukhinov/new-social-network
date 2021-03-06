import {v1} from 'uuid';
import avatar from '../assets/images/avatar.jpg'

export let currentUserId = v1()

const initialState: ProfileType = {
    currentUser: {id: currentUserId, name: 'Dmitriy Sukhinov', img: avatar, status: 'Hi', location: 'Minsk'},
    posts: [
        {id: v1(), text: 'My third post', likesCount: 9, likedByMe: false,},
        {id: v1(), text: 'My second post', likesCount: 7, likedByMe: false,},
        {id: v1(), text: 'My first post', likesCount: 5, likedByMe: false,},
    ]
}

export const profileReducer = (state: ProfileType = initialState, action: ActionsType): ProfileType => {
    switch (action.type) {
        case 'CHANGE-AVATAR':
            return {...state, currentUser: {...state.currentUser, img: action.img}}
        case 'ADD-POST':
            return {...state, posts: [{id: v1(), text: action.text, likesCount: 0, likedByMe: false,}, ...state.posts]}
        case 'LIKE-A-POST':
            return {
                ...state,
                posts: state.posts.map(p => p.id === action.id ? {
                    ...p,
                    likesCount: p.likesCount + 1,
                    likedByMe: true
                } : p)
            }
        case 'DISLIKE-A-POST':
            return {
                ...state,
                posts: state.posts.map(p => p.id === action.id ? {
                    ...p,
                    likesCount: p.likesCount - 1,
                    likedByMe: false
                } : p)
            }
        case 'DELETE-POST':
            return {...state, posts: state.posts.filter(p => p.id !== action.id)}
        default:
            return state
    }
}

// user
export const changeAvatarAC = (img: any) => {
    return {type: 'CHANGE-AVATAR', img} as const
}

// post
export const addPostAC = (text: string) => {
    return {type: 'ADD-POST', text} as const
}
export const deletePostAC = (id: string) => {
    return {type: 'DELETE-POST', id} as const
}
export const likeAPostAC = (id: string) => {
    return {type: 'LIKE-A-POST', id} as const
}
export const dislikeAPostAC = (id: string) => {
    return {type: 'DISLIKE-A-POST', id} as const
}

type ActionsType =
    ReturnType<typeof changeAvatarAC>
    | ReturnType<typeof addPostAC>
    | ReturnType<typeof likeAPostAC>
    | ReturnType<typeof dislikeAPostAC>
    | ReturnType<typeof deletePostAC>

export type ProfileType = {
    currentUser: user
    posts: PostsType[]
}

type PostsType = {
    id: string
    text: string
    likesCount: number
    likedByMe: boolean
}

type user = {
    id: string
    name: string
    location: string
    img: any //!!!!
    status: string
}
