'use client'

import { useState } from 'react';

import axios from 'axios';
import { Controller, useForm } from 'react-hook-form'
import MDEditor from '@uiw/react-md-editor';

import { Input } from '@/components';

import s from './LoadFile.module.scss'

export function LoadFile() {

    const [isVisibile, setIsVisibile] = useState()

    const { control, handleSubmit } = useForm()

    const onSubmit = (async (data: any) => {
        console.log(data)
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_HOST}files`, {file: data.file})
            setIsVisibile(response.data)
        } catch (error: any) {
            setIsVisibile(error.message)
        }
    })

    return (
        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
            <Controller
                control={control}
                name="file"
                render={({ field: { value, onChange } }) => (
                    <div className={s.form__info}>
                        <div className={s.form__editor}>
                            <MDEditor
                                value={value}
                                onChange={onChange}
                            />
                        </div>
                        <Input
                        textarea={false}
                            type='file'
                            value={value && value}
                            placeholder='поле выбора файла'
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