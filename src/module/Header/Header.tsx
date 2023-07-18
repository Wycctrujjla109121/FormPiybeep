'use client'

import { HEADER_LINK } from '@/constants/Link';
import s from './Header.module.scss'
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import classNames from 'classnames';

export function Header() {

    const route = usePathname()

    return (
        <div className={s.wrapper}>
            {HEADER_LINK.map(current => (
                <Link className={classNames(s.wrapper__link, {
                    [s.wrapper__link_active]:route === current.link
                })} key={current.text} href={current.link}>{current.text}</Link>
            ))}
        </div>
    );
};