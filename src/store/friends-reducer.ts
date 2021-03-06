import {v1} from 'uuid';
import avatar from '../assets/images/avatar.jpg';
import avatar2 from '../assets/images/avatar2.jpg';
import avatar3 from '../assets/images/avatar3.jpg';

export let firstUserId = v1()
export let secondUserId = v1()
export let thirdUserId = v1()
export let fourthUserId = v1()
export let fifthUserId = v1()
export let sixthUserId = v1()
export let eightsUserId = v1()

const initialState: UsersType[] = [
    {id: firstUserId, name: 'Andrew Sherbin', img: avatar3, status: 'Streamer', location: 'Moscow', isFriend: true},
    {id: secondUserId, name: 'Aleksandr Kostyliev', img: avatar2, status: 'CS:GO', location: 'Kiev', isFriend: true},
    {id: thirdUserId, name: 'Maksim Ishchanka', img: avatar, status: 'Minion', location: 'Minsk', isFriend: true},
    {id: fourthUserId, name: 'Alena Sergeevna', img: avatar3, status: 'Minion', location: 'Warshaw', isFriend: false},
    {id: fifthUserId, name: 'Dmitriy Grigoriev', img: avatar, status: 'Minion', location: 'Kiev', isFriend: true},
    {id: sixthUserId, name: 'Vadim Eliseev', img: avatar2, status: 'Minion', location: 'Minsk', isFriend: false},
    // {id: eightsUserId, name: 'Dmitriy Sukhinov', img: avatar, status: 'Hi', location: 'Minsk', isFriend: false},
]

export const friendsReducer = (state: UsersType[] = initialState, action: ActionsType): UsersType[] => {
    switch (action.type) {
        case 'ADD-AS-FRIEND':
            return state.map(f => f.id === action.id ? {...f, isFriend: true} : f)
        case 'REMOVE-FROM-FRIENDS':
            return state.map(f => f.id === action.id ? {...f, isFriend: false} : f)
        default:
            return state
    }
}

export const addAsFriendAC = (id: string) => {
    return {type: 'ADD-AS-FRIEND', id} as const
}
export const removeFromFriendsAC = (id: string) => {
    return {type: 'REMOVE-FROM-FRIENDS', id} as const
}

type ActionsType = ReturnType<typeof addAsFriendAC> | ReturnType<typeof removeFromFriendsAC>

export type UsersType = {
    id: string
    name: string
    img: any //!!!!
    status: string
    location: string
    isFriend: boolean
}
