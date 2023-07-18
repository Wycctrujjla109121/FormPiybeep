'use client'

import { useState } from 'react';

import { Controller, useForm } from 'react-hook-form'
import MDEditor from '@uiw/react-md-editor';
import axios from 'axios';

import { Input } from '@/components';

import s from './Services.module.scss'

export function Services() {

    const [isVisibile, setIsVisibile] = useState()

    const { control, handleSubmit } = useForm()

    const onSubmit = (async (data: any) => {
        console.log(data)
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_HOST}services`, data)
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
                render={({ field: { onChange } }) => (
                    <div className={s.form__info}>
                        <Input
                            placeholder='Название услуги'
                            onChange={onChange}
                        />
                    </div>
                )}
            />
            <Controller
                control={control}
                name="description"
                render={({ field: { value, onChange } }) => (
                    <div className={s.form__info}>
                        <div className={s.form__editor}>
                            <MDEditor
                                height='100%'
                                value={value}
                                onChange={onChange}
                            />
                        </div>
                    </div>
                )}
            />
            <Controller
                control={control}
                name="price"
                render={({ field: { onChange } }) => (
                    <div className={s.form__info}>
                        <Input
                            placeholder='цена'
                            onChange={onChange}
                        />
                    </div>
                )}
            />
            <Controller
                control={control}
                name="discount"
                render={({ field: { onChange } }) => (
                    <div className={s.form__info}>
                        <Input
                            placeholder='цена со скидкой'
                            onChange={onChange}
                        />
                    </div>
                )}
            />
            <Controller
                control={control}
                name="typeId"
                render={({ field: { onChange } }) => (
                    <div className={s.form__info}>
                        <Input
                            placeholder='id типа'
                            onChange={onChange}
                        />
                    </div>
                )}
            />
            <Controller
                control={control}
                name="isHide"
                render={({ field: { value, onChange } }) => (
                    <div className={s.form__info}>
                        <h1>Скрыто из списка</h1>
                        <input type='checkbox' onChange={onChange} />
                        <p>{String(value)}</p>
                    </div>
                )}
            />
            <Controller
                control={control}
                name="isAvailable"
                render={({ field: { value, onChange } }) => (
                    <div className={s.form__info}>
                        <h1>доступна для заказа</h1>
                        <input type='checkbox' onChange={onChange} />
                        <p>{String(value)}</p>
                    </div>
                )}
            />
            <button className={s.form__button} type='submit'>Сохранить</button>
            <h1 className={s.title}>{isVisibile}</h1>
        </form>
    );
};