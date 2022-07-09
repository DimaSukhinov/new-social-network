import {combineReducers, createStore} from 'redux'
import {TypedUseSelectorHook, useSelector} from 'react-redux'
import {postsReducer} from './posts-reducer';
import {dialogsReducer} from './dialogs-reducer';

const rootReducer = combineReducers({
    posts: postsReducer,
    dialogs: dialogsReducer,
})

export const store = createStore(rootReducer)

export type AppRootStateType = ReturnType<typeof rootReducer>

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

// @ts-ignore
window.store = store
