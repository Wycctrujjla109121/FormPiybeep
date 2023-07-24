'use client'

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { Input } from "@/components";

import s from './Reviews.module.scss'
import axios from "axios";

import { ReviewProps } from "./Review.types";

export function Reviews({ review }: { review?: ReviewProps }) {

    const [error, setError] = useState<string>()
    const [res, setRes] = useState<object>()

    const { control, handleSubmit, reset, formState: { dirtyFields } } = useForm()

    const onSubmit = (async (data: any) => {
        if (!review) {
            let newData: any = {}
            for (let i in data) if (i in dirtyFields) newData[i] = data[i]
            try {
                const response = await axios.post(`${process.env.NEXT_PUBLIC_HOST}reviews`, { ...newData })
                setRes(response.data)
                setError(undefined)
                reset()
            } catch (error: any) {
                setError(error.message)
                setRes(undefined)
            }
        }
        else {
            let newData: any = {}
            for (let i in data) if (i in dirtyFields) newData[i] = data[i]
            try {
                const response = await axios.patch(`${process.env.NEXT_PUBLIC_HOST}reviews/${review?.id}`, { ...newData })
                setRes(response.data)
                setError(undefined)
                window.location.reload()
            } catch (error: any) {
                setError(error.message)
                setRes(undefined)
            }
        }
    })

    return (
        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
            <Controller
                control={control}
                name="author"
                defaultValue={review?.author ?? ''}
                render={({ field: { onChange, value } }) => (
                    <div className={s.form__info}>
                        <Input
                            value={value}
                            placeholder='Автор'
                            onChange={onChange}
                        />
                    </div>
                )}
            />
            <Controller
                control={control}
                name="text"
                defaultValue={review?.text ?? ''}
                render={({ field: { onChange, value } }) => (
                    <div className={s.form__info}>
                        <Input
                            value={value}
                            placeholder='Комментарий'
                            onChange={onChange}
                        />
                    </div>
                )}
            />
            <Controller
                control={control}
                name="projectId"
                defaultValue={review?.projectId ?? ''}
                render={({ field: { onChange, value } }) => (
                    <div className={s.form__info}>
                        <Input
                            value={value}
                            placeholder='id проекта'
                            onChange={onChange}
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