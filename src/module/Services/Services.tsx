'use client'

import { useState } from 'react';

import { Controller, useForm } from 'react-hook-form'
import MDEditor from '@uiw/react-md-editor';
import axios from 'axios';

import { Input } from '@/components';

import s from './Services.module.scss'
import { ServiceProps } from './Services.types';

export function Services({ service }: { service?: ServiceProps }) {

    const [error, setError] = useState<string>()
    const [res, setRes] = useState<object>()

    const { control, handleSubmit, reset, formState: { dirtyFields } } = useForm()

    const onSubmit = (async (data: any) => {
        if (!service) {
            let newData: any = {}
            for (let i in data) if (i in dirtyFields) newData[i] = data[i]
            console.log(newData)
            try {
                const response = await axios.post(`${process.env.NEXT_PUBLIC_HOST}services`,
                    {
                        ...newData,
                        price: 'price' in newData ? Number(data.price) : undefined,
                        discount: 'discount' in newData ? Number(data.discount) : undefined
                    })
                setRes(response.data)
                reset()
            } catch (error: any) {
                setError(error.message)
            }
        } else {
            let newData: any = {}
            for (let i in data) if (i in dirtyFields) newData[i] = data[i]
            try {
                const response = await axios.patch(`${process.env.NEXT_PUBLIC_HOST}services/${service.id}`,
                    {
                        ...newData,
                        price: 'price' in newData ? Number(data.price) : undefined,
                        discount: 'discount' in newData ? Number(data.discount) : undefined
                    })
                setRes(response.data)
                window.location.reload()
            } catch (error: any) {
                setError(error)
            }
        }
    })

    return (
        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
            <Controller
                control={control}
                name="name"
                defaultValue={service?.name ?? ''}
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
                defaultValue={service?.description ?? ''}
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
                defaultValue={service?.price ?? ''}
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
                defaultValue={service?.discount ?? ''}
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
                defaultValue={service?.type ?? 'Не выбрано'}
                render={({ field: { onChange, value } }) => (
                    <div className={s.form__info}>
                        <h1>Тип</h1>
                        <select value={value} onChange={onChange}>
                            <option disabled value="Не выбрано">Не выбрано</option>
                            <option value="service">service</option>
                            <option value="support">support</option>
                            <option value="other">other</option>
                        </select>
                    </div>
                )}
            />
            <Controller
                control={control}
                name="isHide"
                defaultValue={service?.isHide ?? false}
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
                defaultValue={service?.isAvailable ?? false}
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
        </form >
    );
};