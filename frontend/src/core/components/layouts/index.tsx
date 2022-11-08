import Link from 'next/link';
import React from 'react';
import Navbar from '../navbar';

interface Props {
    children: JSX.Element;
}
export default function Layouts({ children }: Props) {
    return (
        <div className="w-full h-screen">
            <header className="z-50 flex flex-wrap w-full py-4 text-sm bg-white sm:justify-start sm:flex-nowrap dark:bg-gray-800">
                <Navbar />
            </header>

            <main>{children}</main>
        </div>
    );
}
