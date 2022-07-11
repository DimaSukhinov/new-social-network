import React from 'react';
import s from './Users.module.scss';

export const Users = React.memo(() => {
    return (
        <div className={s.users}>
            Users
        </div>
    );
})
