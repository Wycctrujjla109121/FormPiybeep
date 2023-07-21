'use client'

import { useState } from 'react';

import { Controller, useForm } from 'react-hook-form'
import MDEditor from '@uiw/react-md-editor';
import axios from 'axios';

import { Input } from '@/components';

import s from './Projects.module.scss'

export function Projects() {

    const [isVisibile, setIsVisibile] = useState<string>()

    const { control, handleSubmit, reset } = useForm()

    const onSubmit = (async (data: any) => {
        console.log({ ...data, preview_image: `${process.env.NEXT_PUBLIC_HOST}static/${data.preview_image}` })
        try {
            console.log()
            const response = await axios.post(`${process.env.NEXT_PUBLIC_HOST}projects`, { ...data, preview_image: `${process.env.NEXT_PUBLIC_HOST}static/${data.preview_image}` })
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
                name="title"
                defaultValue={''}
                render={({ field: { onChange, value } }) => (
                    <div className={s.form__info}>
                        <Input
                            value={value}
                            placeholder='заголовок'
                            onChange={onChange}
                        />
                    </div>
                )}
            />
            <Controller
                control={control}
                name="subtitle"
                defaultValue={''}
                render={({ field: { onChange, value } }) => (
                    <div className={s.form__info}>
                        <Input
                            value={value}
                            placeholder='подзаголовк'
                            onChange={onChange}
                        />
                    </div>
                )}
            />
            <Controller
                control={control}
                name="preview_image"
                defaultValue={''}
                render={({ field: { onChange, value } }) => (
                    <div className={s.form__info}>
                        <Input
                            value={value}
                            textarea={false}
                            type='text'
                            placeholder='обложка'
                            onChange={onChange}
                        />
                    </div>
                )}
            />
            <Controller
                control={control}
                name="customer"
                defaultValue={''}
                render={({ field: { onChange, value } }) => (
                    <div className={s.form__info}>
                        <Input
                            value={value}
                            placeholder='заказчик'
                            onChange={onChange}
                        />
                    </div>
                )}
            />
            <Controller
                control={control}
                name="access"
                defaultValue={'work'}
                render={({ field: { onChange, value } }) => (
                    <div className={s.form__info}>
                        <div className={s.form__selectors}>
                            <h2>доступ (селектор: work, not_work, beta, closed)</h2>
                            <select className={s.form__select} value={value} onChange={onChange}>
                                <option value="work">work</option>
                                <option value="not_work">not_work</option>
                                <option value="beta">beta</option>
                                <option value="closed">closed</option>
                            </select>
                        </div>
                    </div>
                )}
            />
            <Controller
                control={control}
                name="link"
                defaultValue={''}
                render={({ field: { onChange, value } }) => (
                    <div className={s.form__info}>
                        <Input
                            value={value}
                            placeholder='ссылка на проект'
                            onChange={onChange}
                        />
                    </div>
                )}
            />
            <Controller
                control={control}
                name="task"
                defaultValue={''}
                render={({ field: { onChange, value } }) => (
                    <div className={s.form__info}>
                        <Input
                            value={value}
                            placeholder='задача проекта'
                            onChange={onChange}
                        />
                    </div>
                )}
            />
            <Controller
                control={control}
                name="about_company"
                defaultValue={''}
                render={({ field: { onChange, value } }) => (
                    <div className={s.form__info}>
                        <Input
                            value={value}
                            placeholder=' о компании'
                            onChange={onChange}
                        />
                    </div>
                )}
            />
            <Controller
                control={control}
                name="about_service"
                defaultValue={''}
                render={({ field: { onChange, value } }) => (
                    <div className={s.form__info}>
                        <Input
                            value={value}
                            placeholder='о сервисе'
                            onChange={onChange}
                        />
                    </div>
                )}
            />
            <Controller
                control={control}
                name="text"
                defaultValue={''}
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
            <button className={s.form__button} type='submit'>Сохранить</button>
            <h1 className={s.title}>{isVisibile}</h1>
        </form>
    );
};