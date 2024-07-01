'use client';

import Link from "next/link";
import {useState} from "react";
import Image from 'next/image';
import {useAppDispatch, useAppSelector} from "@/redux/hooks";
import {logout as setLogout} from "@/redux/services/authSlice";
import {useLogoutMutation} from "@/redux/features/authApiSlice";
import {useRouter, usePathname} from "next/navigation";
import {NavLink} from "@/components/common/index";
import Search from "@/components/common/Search";

export default function Navbar() {
    const dispatch = useAppDispatch()
    const router = useRouter()
    const pathname = usePathname()
    const {isAuthenticated} = useAppSelector(state => state.auth)
    const [logout] = useLogoutMutation()
    const [navbar, setNavbar] = useState(false);
    const [isHovered, setIsHovered] = useState(false);
    const isSelected = (path: string) => pathname === path
    const handleLogout = () => {
        logout(undefined).unwrap().then(() => {
            dispatch(setLogout())
        })
    }


    const authLinks = (isMobile: boolean) => (
        <>
            <li className="pb-6 text-xl text-black py-2 px-6 text-center  border-b-2  md:border-b-0  hover:bg-gray-400  border-grey-500  md:hover:text-gray-700 md:hover:bg-transparent">
                <NavLink isSelected={isSelected('/dashboard')} isMobile={isMobile} href={'/dashboard'}>
                    Dashboard
                </NavLink>
            </li>
            <li className="pb-6 text-xl text-black py-2 px-6 text-center  border-b-2  md:border-b-0  hover:bg-gray-400  border-grey-500  md:hover:text-gray-700 md:hover:bg-transparent">
                <NavLink isSelected={isSelected('/cart')} isMobile={isMobile} href={'/cart'}>
                    Cart
                </NavLink>
            </li>
            <li className="pb-6 text-xl text-black py-2 px-6 text-center  border-b-2  md:border-b-0  hover:bg-gray-400  border-grey-500  md:hover:text-gray-700 md:hover:bg-transparent">
                <NavLink isMobile={isMobile} onClick={handleLogout}>
                    Logout
                </NavLink>
            </li>
        </>

    )
    const guessLinks = (isMobile: boolean) => (
        <>
            <li className="pb-6 text-xl text-black py-2 px-6 text-center  border-b-2  md:border-b-0  hover:bg-gray-400  border-grey-500  md:hover:text-gray-700 md:hover:bg-transparent">
                <NavLink isSelected={isSelected('/auth/login')}
                         isMobile={isMobile}
                         href={'/auth/login'}
                >
                    Login
                </NavLink>
            </li>
            <li className="pb-6 text-xl text-black py-2 px-6 text-center  border-b-2  md:border-b-0  hover:bg-gray-400  border-grey-500  md:hover:text-gray-700 md:hover:bg-transparent">

                <NavLink isSelected={isSelected('/auth/register')}
                         isMobile={isMobile}
                         href={'/auth/register'}

                >
                    register
                </NavLink>
            </li>
        </>
    )
    return (
        <div>
            <nav className="select-none w-full top-0 left-0 right-0 z-10" style={{ backgroundColor: '#FBFAEF' }}>
                <div className="justify-between px-4 mx-auto lg:max-w-7xl md:items-center md:flex md:px-8">
                    <div>
                        <div className="flex items-center">
                            <div className="flex alight-items-center">
                                <div className="flex-1">
                                    <Link href="/">
                                        <h2 className="text-2xl font-bold" style={{ color: '#AFAAB9' }}>LOGO</h2>
                                    </Link>
                                </div>
                                <div className="flex-2" style={{ marginLeft: '50px' }}> {/* Adjust the margin-left here */}
                                    <Search placeholder="Search invoices..." />
                                </div>
                            </div>
                            {/* HAMBURGER BUTTON FOR MOBILE */}
                            <div className="md:hidden">
                                <button
                                    className="p-2 text-gray-700 rounded-md outline-none focus:border-gray-400 focus:border"
                                    onClick={() => setNavbar(!navbar)}
                                >
                                    {navbar ? (
                                        <Image src="/close.svg" width={30} height={30} alt="logo"/>
                                    ) : (
                                        <Image
                                            src="/hamburger-menu.svg"
                                            width={30}
                                            height={30}
                                            alt="logo"
                                            className="focus:border-none active:border-none"
                                        />
                                    )}
                                </button>
                            </div>
                        </div>
                    </div>
                    <div>
                        <div
                            className={`flex-1 justify-self-center pb-3 mt-8 md:block md:pb-0 md:mt-0 ${
                                navbar ? 'p-12 md:p-0 block' : 'hidden'
                            }`}
                        >
                            <ul className="h-screen md:h-auto items-center justify-center md:flex"
                                onClick={() => setNavbar(!navbar)}>
                                {isAuthenticated ? authLinks(false) : guessLinks(false)}
                            </ul>
                        </div>
                    </div>
                </div>
            </nav>
        </div>
    )
}