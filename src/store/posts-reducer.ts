import {v1} from 'uuid';

const initialState: PostsType[] = [
    {id: v1(), text: 'My third post', likesCount: 9, likedByMe: false},
    {id: v1(), text: 'My second post', likesCount: 7, likedByMe: false},
    {id: v1(), text: 'My first post', likesCount: 5, likedByMe: false},
]

export const postsReducer = (state: PostsType[] = initialState, action: ActionsType): PostsType[] => {
    switch (action.type) {
        case 'ADD-POST':
            return [{id: v1(), text: action.text, likesCount: 0, likedByMe: false}, ...state]
        case 'LIKE-A-POST':
            return state.map(p => p.id === action.id ? {...p, likesCount: p.likesCount + 1, likedByMe: true} : p)
        case 'DISLIKE-A-POST':
            return state.map(p => p.id === action.id ? {...p, likesCount: p.likesCount - 1, likedByMe: false} : p)
        default:
            return state
    }
}

export const addPostAC = (text: string) => {
    return {type: 'ADD-POST', text} as const
}
export const likeAPostAC = (id: string) => {
    return {type: 'LIKE-A-POST', id} as const
}
export const dislikeAPostAC = (id: string) => {
    return {type: 'DISLIKE-A-POST', id} as const
}

type ActionsType = ReturnType<typeof addPostAC> | ReturnType<typeof likeAPostAC> | ReturnType<typeof dislikeAPostAC>

export type PostsType = {
    id: string
    text: string
    likesCount: number
    likedByMe: boolean
}
