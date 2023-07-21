import { ComponentProps } from "react";

export interface InputProps extends ComponentProps<'input'> {
    placeholder: string,
    type?: 'file' | 'text' | 'number',
    textarea?: boolean
}