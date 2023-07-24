'use client'

import { InputHTMLAttributes, useState } from 'react';

import axios from 'axios';
import { Controller, useForm } from 'react-hook-form'

import { Input } from '@/components';

import s from './LoadFile.module.scss'

export function LoadFile() {

    const [error, setError] = useState<string>()
    const [res, setRes] = useState<object>()

    const { control, handleSubmit, reset } = useForm()

    const onSubmit = (async (data: any) => {
        console.log(data)
        let formData = new FormData()
        formData.append('file', data.file)
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_HOST}files`, formData)
            setRes(response.data)
        } catch (error: any) {
            setError(error.message)
        }
        reset()
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
            <div className={s.list}>
                <h2 className={s.list__error} style={{ display: error ? 'flex' : 'none' }}>
                    <span className={s.list__span}>Ошибка:</span>
                    <span className={s.list__span}>{error}</span>
                </h2>
                <div className={s.list__info} style={{ display: res ? 'flex' : 'none' }}>
                    <h1 className={s.list__title}>Данные: </h1>
                    {
                        res &&
                        Object.entries(res).map((current) => (
                            <p key={current[0]} className={s.list__item}>{current[0] + ': ' + current[1]}</p>
                        ))
                    }
                </div>
            </div>
        </form>
    );
};