'use client'

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { Input } from "@/components";

import s from './Reviews.module.scss'
import axios from "axios";

import { ReviewProps } from "./Review.types";

export function Reviews({ review }: { review?: ReviewProps }) {

    const [isVisibile, setIsVisibile] = useState<string>()

    const { control, handleSubmit, reset, formState: { dirtyFields } } = useForm()

    const onSubmit = (async (data: any) => {
        if (!review) {
            let newData: any = {}
            for (let i in data) if (i in dirtyFields) newData[i] = data[i]
            console.log(newData)
            try {
                const response = await axios.post(`${process.env.NEXT_PUBLIC_HOST}reviews`, { ...newData })
                setIsVisibile(JSON.stringify(response.data))
                reset()
            } catch (error: any) {
                setIsVisibile(error.message)
            }
        }
        let newData: any = {}
        for (let i in data) if (i in dirtyFields) newData[i] = data[i]
        try {
            const response = await axios.patch(`${process.env.NEXT_PUBLIC_HOST}reviews`, { ...newData })
            setIsVisibile(JSON.stringify(response.data))
            window.location.reload()
        } catch (error: any) {
            console.error(error.message)
        }
    })

    return (
        <form className={s.form} onSubmit={handleSubmit(onSubmit)}>
            <Controller
                control={control}
                name="author"
                defaultValue={''}
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
                defaultValue={''}
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
                defaultValue={''}
                render={({ field: { onChange, value } }) => (
                    <div className={s.form__info}>
                        <Input
                            value={value}
                            placeholder='id'
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