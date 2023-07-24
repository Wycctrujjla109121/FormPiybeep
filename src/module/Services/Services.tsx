'use client'

import { useState } from 'react';

import { Controller, useForm } from 'react-hook-form'
import MDEditor from '@uiw/react-md-editor';
import axios from 'axios';

import { Input } from '@/components';

import s from './Services.module.scss'
import { ServiceProps } from './Services.types';

export function Services({ service }: { service?: ServiceProps }) {

    const [isVisibile, setIsVisibile] = useState<string>()

    const { control, handleSubmit, reset, formState: { dirtyFields } } = useForm()

    const onSubmit = (async (data: any) => {
        if (!service) {
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
                window.location.reload()
            } catch (error: any) {
                setIsVisibile(error.message)
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
                setIsVisibile(JSON.stringify(response.data))
                window.location.reload()
            } catch (error: any) {
                console.error(error.message)
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
                defaultValue={service?.type ?? 'service'}
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
                defaultValue={service?.idAvailable ?? false}
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