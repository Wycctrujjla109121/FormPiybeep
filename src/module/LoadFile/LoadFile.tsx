'use client'

import { InputHTMLAttributes, useState } from 'react';

import axios from 'axios';
import { Controller, useForm } from 'react-hook-form'

import { Input } from '@/components';

import s from './LoadFile.module.scss'

export function LoadFile() {

    const [isVisibile, setIsVisibile] = useState()

    const { control, handleSubmit } = useForm()

    const onSubmit = (async (data: any) => {
        console.log(data)
        let formData = new FormData()
        formData.append('file', data.file)
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_HOST}files`, formData)
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
                render={({ field: { onChange } }) => (
                    <div className={s.form__info}>
                        <Input
                            textarea={false}
                            type='file'
                            placeholder='поле выбора файла'
                            onChange={(event: any) => {
                                onChange(event.target.files[0]);
                            }}
                        />
                    </div>
                )}
            />
            <button className={s.form__button} type='submit'>Сохранить</button>
            <h1 className={s.title}>{isVisibile}</h1>
        </form>
    );
};