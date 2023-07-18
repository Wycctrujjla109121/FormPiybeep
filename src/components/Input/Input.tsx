'use client'

import s from './Input.module.scss'
import { InputProps } from './Input.types';

export function Input({ type = 'text', textarea = true, placeholder, ...props }: InputProps) {
    return (
        <div className={s.wrapper}>
            <span className={s.wrapper__span}>{placeholder}</span>
            {
                textarea
                    ?
                    //@ts-ignore
                    <textarea className={s.wrapper__input} {...props} placeholder={placeholder}></textarea>
                    :
                    <input {...props} className={s.wrapper__input} type={type} placeholder={placeholder} />
            }
        </div>
    );
};