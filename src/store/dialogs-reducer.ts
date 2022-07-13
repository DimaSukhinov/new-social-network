import {v1} from 'uuid';
import {firstUserId, secondUserId, thirdUserId} from './friends-reducer';


const initialState: InitialStateType = {
    dialogs: [
        {
            userId: firstUserId,
            isDisabled: false,
        },
        {
            userId: secondUserId,
            isDisabled: false,
        },
        {
            userId: thirdUserId,
            isDisabled: false,
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
        case 'DISABLE-DIALOG':
            return {
                ...state,
                dialogs: state.dialogs.map(d => d.userId === action.userId ? {...d, isDisabled: !d.isDisabled} : d)
            }
        case 'DELETE-DIALOG':
            return {
                dialogs: state.dialogs.filter(d => d.userId !== action.userId),
                messages: state.messages.filter(m => m.userId !== action.userId)
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
export const disableDialogAC = (userId: string) => {
    return {type: 'DISABLE-DIALOG', userId} as const
}
export const deleteDialogAC = (userId: string) => {
    return {type: 'DELETE-DIALOG', userId} as const
}

type ActionsType =
    ReturnType<typeof sendMessageAC>
    | ReturnType<typeof selectMessageToDeleteAC>
    | ReturnType<typeof unselectMessageToDeleteAC>
    | ReturnType<typeof deleteMessageAC>
    | ReturnType<typeof disableDialogAC>
    | ReturnType<typeof deleteDialogAC>

export type InitialStateType = {
    dialogs: DialogsType[]
    messages: MessagesType[]
}

type DialogsType = {
    userId: string
    isDisabled: boolean
}
type MessagesType = {
    userId: string
    messageId: string
    message: string
    isSelected: boolean
}
