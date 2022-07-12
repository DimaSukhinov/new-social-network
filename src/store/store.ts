import {combineReducers, createStore} from 'redux'
import {TypedUseSelectorHook, useSelector} from 'react-redux'
import {profileReducer} from './profile-reducer';
import {dialogsReducer} from './dialogs-reducer';
import {friendsReducer} from './friends-reducer';

const rootReducer = combineReducers({
    profile: profileReducer,
    dialogs: dialogsReducer,
    friends: friendsReducer,
})

export const store = createStore(rootReducer)

export type AppRootStateType = ReturnType<typeof rootReducer>

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

// @ts-ignore
window.store = store
