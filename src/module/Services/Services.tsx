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
            const response = await axios.post(`${process.env.NEXT_PUBLIC_HOST}services`, { ...data })
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
                                value={value}
                                onChange={onChange}
                            />
                        </div>
                        <Input
                            value={value && value}
                            placeholder='описание'
                            onChange={onChange}
                        />
                    </div>
                )}
            />
            <Controller
                control={control}
                name="price"
                render={({ field: { onChange, value } }) => (
                    <div className={s.form__info}>
                        <div className={s.form__editor}>
                            <MDEditor
                                value={value}
                                onChange={onChange}
                            />
                        </div>
                        <Input
                            value={value && value}
                            placeholder='цена'
                            onChange={onChange}
                        />
                    </div>
                )}
            />
            <Controller
                control={control}
                name="discount"
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
                            placeholder='цена со скидкой'
                            onChange={onChange}
                        />
                    </div>
                )}
            />
            <Controller
                control={control}
                name="typeId"
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
                        <div className={s.form__editor}>
                            <MDEditor
                                value={value}
                                onChange={onChange}
                            />
                        </div>
                        <Input
                            value={value && value}
                            placeholder='скрытая из общего списка'
                            onChange={onChange}
                        />
                    </div>
                )}
            />
            <Controller
                control={control}
                name="isAvailable"
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
                            placeholder='доступна для заказа'
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