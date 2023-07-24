'use client'

import { useState } from 'react';

import { Controller, useForm } from 'react-hook-form'
import MDEditor from '@uiw/react-md-editor';
import axios from 'axios';

import { Input } from '@/components';

import s from './Services.module.scss'

export function Services() {

    const [isVisibile, setIsVisibile] = useState<string>()

    const { control, handleSubmit, reset, formState: { dirtyFields } } = useForm()

    const onSubmit = (async (data: any) => {
        let newData: any = {}
        for (let i in data) if (i in dirtyFields) newData[i] = data[i]
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_HOST}services`,
                {
                    ...newData,
                    price: 'price' in newData ? Number(data.price) : undefined,
                    discount: 'discount' in newData ? Number(data.discount) : undefined
                })
            setIsVisibile(JSON.stringify(response.data))
            reset()
        } catch (error: any) {
            setIsVisibile(error.message)
        }
    })

    return (
        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
            <Controller
                control={control}
                name="name"
                defaultValue={''}
                render={({ field: { onChange, value } }) => (
                    <div className={s.form__info}>
                        <Input
                            value={value}
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
                        <h2>Описание</h2>
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
                defaultValue={''}
                render={({ field: { onChange, value } }) => (
                    <div className={s.form__info}>
                        <Input
                            textarea={false}
                            type='number'
                            value={value}
                            placeholder='цена'
                            onChange={onChange}
                        />
                    </div>
                )}
            />
            <Controller
                control={control}
                name="discount"
                defaultValue={''}
                render={({ field: { onChange, value } }) => (
                    <div className={s.form__info}>
                        <Input
                            type='number'
                            value={value}
                            placeholder='цена со скидкой'
                            onChange={onChange}
                        />
                    </div>
                )}
            />
            <Controller
                control={control}
                name="type"
                defaultValue={'service'}
                render={({ field: { onChange, value } }) => (
                    <div className={s.form__info}>
                        <h1>Тип</h1>
                        <select value={value} onChange={onChange}>
                            <option value="service">service</option>
                            <option value="suppot">suppot</option>
                            <option value="other">other</option>
                        </select>
                    </div>
                )}
            />
            <Controller
                control={control}
                name="isHide"
                defaultValue={false}
                render={({ field: { value, onChange } }) => (
                    <div className={s.form__info}>
                        <h1>Скрыто из списка</h1>
                        <input type='checkbox' checked={value} onChange={onChange} />
                        <p>{String(value)}</p>
                    </div>
                )}
            />
            <Controller
                control={control}
                defaultValue={false}
                name="isAvailable"
                render={({ field: { value, onChange } }) => (
                    <div className={s.form__info}>
                        <h1>доступна для заказа</h1>
                        <input type='checkbox' checked={value} onChange={onChange} />
                        <p>{String(value)}</p>
                    </div>
                )}
            />
            <button className={s.form__button} type='submit'>Сохранить</button>
            <h1 className={s.title}>{isVisibile}</h1>
        </form>
    );
};