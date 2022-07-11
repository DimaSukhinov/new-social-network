import React from 'react';
import s from './App.module.scss';
import {Routes, Navigate, Route} from 'react-router-dom'
import {Header} from './components/header/Header';
import {Profile} from './components/profile/Profile';
import {Dialogs} from './components/dialogs/Dialogs';
import {Users} from './components/users/Users';
import {Settings} from './components/settings/Settings';

export const App = () => {
    return (
        <div className={s.app}>
            <Header/>
            <Routes>
                <Route path={'/'} element={<Navigate to={'/profile'}/>}/>
                <Route path={'/profile'} element={<Profile/>}/>
                <Route path={'/dialogs'} element={<Dialogs/>}/>
                <Route path={'/users'} element={<Users/>}/>
                <Route path={'/settings'} element={<Settings/>}/>
                <Route path={'/*'} element={<div>404</div>}/>
            </Routes>
        </div>
    );
}
