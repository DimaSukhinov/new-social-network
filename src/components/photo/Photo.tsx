import React from 'react';
import s from './Photo.module.scss';

export const Photo = React.memo(() => {
    return (
        <div className={s.photo}>
            Photo
        </div>
    );
})
