'use client'

import { Input } from '@/components';

import { Controller, useForm } from 'react-hook-form'
import MDEditor from '@uiw/react-md-editor';

import s from './TypeServices.module.scss'
import axios from 'axios';
import { useState } from 'react';

export function TypeServices() {

    const [isVisibile, setIsVisibile] = useState()

    const { control, handleSubmit } = useForm()

    const onSubmit = (async (data: any) => {
        console.log(data)
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_HOST}services/types`, {name: data.name})
            setIsVisibile(response.data)
        } catch (error: any) {
            setIsVisibile(error.message)
        }
    })

    return (
        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
            <Controller
                control={control}
                name="name"
                render={({ field: { value, onChange } }) => (
                    <div className={s.form__info}>
                        <div className={s.form__editor}>
                            <MDEditor
                                value={value}
                                onChange={onChange}
                            />
                        </div>
                        <Input
                            value={value && value}
                            placeholder='название типа'
                            onChange={onChange}
                        />
                    </div>
                )}
            />
            <button className={s.form__button} type='submit'>Сохранить</button>
            <h1 className={s.title}>{isVisibile}</h1>
        </form>
    );
};