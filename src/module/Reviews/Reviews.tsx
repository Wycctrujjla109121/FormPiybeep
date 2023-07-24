'use client'

import { useState } from "react";
import { Controller, useForm } from "react-hook-form";

import { Input } from "@/components";

import s from './Reviews.module.scss'
import axios from "axios";

export function Reviews() {

    const [isVisibile, setIsVisibile] = useState<string>()

    const { control, handleSubmit, reset, getValues, formState: { dirtyFields } } = useForm()

    const onSubmit = (async (data: any) => {
        let newDirtyFields = Object.entries(dirtyFields)
        newDirtyFields.map(current => {
            current[1] = getValues(current[0])
        })
        let dirtyFialdsObject = Object.fromEntries(newDirtyFields);
        try {
            const response = await axios.post(`${process.env.NEXT_PUBLIC_HOST}reviews`, { ...dirtyFialdsObject })
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