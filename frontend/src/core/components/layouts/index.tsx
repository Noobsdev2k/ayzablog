import React from 'react';
import Navbar from '../navbar';

interface Props {
    children: JSX.Element;
}
export default function Layouts({ children }: Props) {
    return (
        <>
            <header className="z-50 flex flex-wrap w-full text-sm sm:justify-start sm:flex-nowrap ">
                <Navbar />
            </header>

            <main>{children}</main>
            <footer></footer>
        </>
    );
}
