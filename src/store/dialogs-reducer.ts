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
            message: 'My first message',
            isSelected: false,
        },
        {
            userId: firstUserId,
            messageId: v1(),
            message: 'My second message',
            isSelected: false,
        },
        {
            userId: secondUserId,
            messageId: v1(),
            message: 'My first second message',
            isSelected: false,
        },
        {
            userId: secondUserId,
            messageId: v1(),
            message: 'My second second message',
            isSelected: false,
        },
        {
            userId: thirdUserId,
            messageId: v1(),
            message: 'My third message',
            isSelected: false,
        },
    ]
}

export const dialogsReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
    switch (action.type) {
        case 'SEND-MESSAGE':
            return {
                ...state,
                messages: [...state.messages, {
                    userId: action.userId,
                    messageId: v1(),
                    message: action.message,
                    isSelected: false
                }]
            }
        case 'SELECT-MESSAGE':
            return {
                ...state,
                messages: state.messages.map(m => m.messageId === action.messageId ? {
                    ...m,
                    isSelected: true
                } : m)
            }
        case 'UNSELECT-MESSAGE':
            return {
                ...state,
                messages: state.messages.map(m => m.messageId === action.messageId ? {
                    ...m,
                    isSelected: false
                } : m)
            }
        case 'DELETE-MESSAGE':
            return {
                ...state,
                messages: state.messages.filter(m => !m.isSelected)
            }
        default:
            return state
    }
}

export const sendMessageAC = (userId: string, message: string) => {
    return {type: 'SEND-MESSAGE', userId, message} as const
}
export const selectMessageToDeleteAC = (messageId: string) => {
    return {type: 'SELECT-MESSAGE', messageId} as const
}
export const unselectMessageToDeleteAC = (messageId: string) => {
    return {type: 'UNSELECT-MESSAGE', messageId} as const
}
export const deleteMessageAC = () => {
    return {type: 'DELETE-MESSAGE'} as const
}

type ActionsType =
    ReturnType<typeof sendMessageAC>
    | ReturnType<typeof selectMessageToDeleteAC>
    | ReturnType<typeof unselectMessageToDeleteAC>
    | ReturnType<typeof deleteMessageAC>

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
    isSelected: boolean
}
