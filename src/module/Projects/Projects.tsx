'use client'

import { useState } from 'react';

import { Controller, useForm } from 'react-hook-form'
import MDEditor from '@uiw/react-md-editor';
import axios from 'axios';

import { Input } from '@/components';

import s from './Projects.module.scss'

export function Projects() {

    const [isVisibile, setIsVisibile] = useState()

    const { control, handleSubmit } = useForm()

    const onSubmit = (async (data: any) => {
        console.log(data)
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_HOST}projects`, { ...data })
            setIsVisibile(response.data)
        } catch (error: any) {
            setIsVisibile(error.message)
        }
    })

    return (
        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
            <Controller
                control={control}
                name="title"
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
                            placeholder='заголовок'
                            onChange={onChange}
                        />
                    </div>
                )}
            />
            <Controller
                control={control}
                name="subtitle"
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
                            placeholder='подзаголовк'
                            onChange={onChange}
                        />
                    </div>
                )}
            />
            <Controller
                control={control}
                name="preview_image"
                render={({ field: { onChange, value } }) => (
                    <div className={s.form__info}>
                        <div className={s.form__editor}>
                            <MDEditor
                                value={value}
                                onChange={onChange}
                            />
                        </div>
                            <Input
                                textarea={false}
                                value={value && value}
                                type='file'
                                placeholder='обложка'
                                onChange={onChange}
                            />
                    </div>
                )}
            />
            <Controller
                control={control}
                name="customer"
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
                            placeholder='заказчик'
                            onChange={onChange}
                        />
                    </div>
                )}
            />
            <Controller
                control={control}
                name="access"
                render={({ field: { value, onChange } }) => (
                    <div className={s.form__info}>
                        <div className={s.form__editor}>
                            <MDEditor
                                value={value}
                                onChange={onChange}
                            />
                        </div>
                        <div className={s.form__selectors}>
                            <h2>доступ (селектор: work, not_work, beta, closed)</h2>
                            <select className={s.form__select} onChange={onChange}>
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
                            placeholder='ссылка на проект'
                            onChange={onChange}
                        />
                    </div>
                )}
            />
            <Controller
                control={control}
                name="task"
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
                            placeholder='задача проекта'
                            onChange={onChange}
                        />
                    </div>
                )}
            />
            <Controller
                control={control}
                name="about_company"
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
                            placeholder=' о компании'
                            onChange={onChange}
                        />
                    </div>
                )}
            />
            <Controller
                control={control}
                name="about_service"
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
                            placeholder='о сервисе'
                            onChange={onChange}
                        />
                    </div>
                )}
            />
            <Controller
                control={control}
                name="text"
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
                            placeholder='полное описание проекта'
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