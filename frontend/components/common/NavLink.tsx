import React from "react";
import Link from "next/link";
import cn from "classnames";


interface Props {
    isSelected?: boolean
    isMobile?: boolean
    isBanner?: boolean
    href?: string
    children: React.ReactNode
    [rest: string]: any
}
export default function NavLink({
    isSelected,
    isMobile,
    isBanner,
    href,
    children,
    ...rest}: Props) {
    const className = cn(
        rest.className,
        'text-2xl text-cyan-600 font-bold',
    {
        'text-rose-400': isSelected,
        'text-gray-900 hover: text-gray-900': !isSelected && !isBanner,
        'block text-base': isMobile,
        'text-sm': !isMobile,
        'text-gray-300': isBanner
        }
    )
    if (!href) {
        return (
            <span className={className} role='button' onClick={rest.onClick}>
                {children}
            </span>
        )
    }
    return (
        <Link className={className} href={href}>
            {children}
        </Link>
    )
                                }