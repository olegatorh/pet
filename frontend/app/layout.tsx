
import '@/styles/globals.css';
import {Inter} from 'next/font/google';
import Provider from '@/redux/provider';
import {Footer, Navbar} from '@/components/common';
import {Setup} from '@/components/utils';
import React from "react";
import CustomProvider from "@/redux/provider";

const inter = Inter({subsets: ['latin']});


export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode;
}) {
    return (
        <html lang='en'>
        <body className={inter.className}>
        <div style={{minHeight: "100vh", display: "flex", flexDirection: "column"}}>
            <CustomProvider>
                <Setup/>
                <Navbar/>
                <div style={{flex: 1, padding: "0 2rem"}}>{children}</div>
                <Footer/>
            </CustomProvider>
        </div>
        </body>
        </html>
);
}