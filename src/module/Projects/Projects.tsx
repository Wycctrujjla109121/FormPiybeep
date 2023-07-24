'use client'

import { useState } from 'react';

import { Controller, useForm } from 'react-hook-form'
import MDEditor from '@uiw/react-md-editor';
import axios from 'axios';

import { Input } from '@/components';

import s from './Projects.module.scss'

import { ProjectProps } from './Project.types';

export function Projects({ project }: { project?: ProjectProps }) {

    const [error, setError] = useState<string>()
    const [res, setRes] = useState<object>()

    const { control, handleSubmit, reset, formState: { dirtyFields } } = useForm()

    const onSubmit = (async (data: any) => {
        if (!project) {
            let newData: any = {}
            for (let i in data) if (i in dirtyFields) newData[i] = data[i]
            try {
                const response = await axios.post(`${process.env.NEXT_PUBLIC_HOST}projects`, { ...newData, preview_image: 'preview_image' in newData ? `${process.env.NEXT_PUBLIC_HOST}static/${data.preview_image}` : undefined })
                setRes(response.data)
                reset()
            } catch (error: any) {
                setError(error.message)
            }
        } else {
            try {
                let newData: any = {}
                for (let i in data) if (i in dirtyFields) newData[i] = data[i]
                const response = await axios.patch(`${process.env.NEXT_PUBLIC_HOST}projects/${project.id}`, { ...newData, preview_image: 'preview_image' in newData ? `${process.env.NEXT_PUBLIC_HOST}static/${data.preview_image}` : project.preview_image })
                setRes(response.data)
                window.location.reload()
            } catch (error: any) {
                setError(error.message)
            }
        }
    })

    return (
        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
            <Controller
                control={control}
                name="title"
                defaultValue={project?.title ?? ''}
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
                defaultValue={project?.subtitle ?? ''}
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
                defaultValue={project?.preview_image ?? ''}
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
                defaultValue={project?.customer ?? ''}
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
                defaultValue={project?.access ?? 'Не выбрано'}
                render={({ field: { onChange, value } }) => (
                    <div className={s.form__info}>
                        <div className={s.form__selectors}>
                            <h2>доступ (селектор: work, not_work, beta, closed)</h2>
                            <select className={s.form__select} value={value} onChange={onChange}>
                                <option disabled value="Не выбрано">Не выбрано</option>
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
                defaultValue={project?.link ?? ''}
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
                defaultValue={project?.task ?? ''}
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
                defaultValue={project?.about_company ?? ''}
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
                defaultValue={project?.about_service ?? ''}
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
                defaultValue={project?.text ?? ''}
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