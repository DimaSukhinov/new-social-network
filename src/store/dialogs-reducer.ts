import {v1} from 'uuid';

let firstUserId = v1()
let secondUserId = v1()
let thirdUserId = v1()

const initialState: InitialStateType = {
    dialogs: [
        {
            userId: firstUserId,
            name: 'Andrew Sherbin',
        },
        {
            userId: secondUserId,
            name: 'Aleksandr Kostyliev',
        },
        {
            userId: thirdUserId,
            name: 'Maksim Ishchanka',
        },
    ],
    messages: [
        {
            userId: firstUserId,
            messageId: v1(),
            message: 'My first message'
        },
        {
            userId: firstUserId,
            messageId: v1(),
            message: 'My second message'
        },
        {
            userId: secondUserId,
            messageId: v1(),
            message: 'My first second message'
        },
        {
            userId: secondUserId,
            messageId: v1(),
            message: 'My second second message'
        },
        {
            userId: thirdUserId,
            messageId: v1(),
            message: 'My third message'
        },
    ]
}

export const dialogsReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SEND-MESSAGE':
            return {
                ...state,
                messages: [...state.messages, {userId: action.userId, messageId: v1(), message: action.message}]
            }
        default:
            return state
    }
}

export const sendMessageAC = (userId: string, message: string) => {
    return {type: 'SEND-MESSAGE', userId, message} as const
}

type ActionsType = ReturnType<typeof sendMessageAC>

export type InitialStateType = {
    dialogs: DialogsType[]
    messages: MessagesType[]
}

type DialogsType = {
    userId: string
    name: string
}
type MessagesType = {
    userId: string
    messageId: string
    message: string
}
