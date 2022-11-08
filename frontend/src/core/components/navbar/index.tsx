import React, { useState } from 'react';
import styles from './navbar.module.css';

function Navbar() {
    const [Toggle, setToggle] = useState<boolean>(false);
    const handleOnclick = () => {
        setToggle(!Toggle);
    };
    return (
        <>
            <nav className="max-w-[85rem] w-full mx-auto px-4 sm:flex sm:items-center sm:justify-between">
                <div className="flex items-center justify-between">
                    <a className="flex-none text-xl font-semibold dark:text-white" href="#">
                        Brand
                    </a>
                    <div className="sm:hidden">
                        <button className={styles.btn_toggle} onClick={handleOnclick}>
                            <svg
                                className="w-4 h-4 hs-collapse-open:hidden"
                                width={16}
                                height={16}
                                fill="currentColor"
                                viewBox="0 0 16 16"
                            >
                                <path
                                    fillRule="evenodd"
                                    d="M2.5 12a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5zm0-4a.5.5 0 0 1 .5-.5h10a.5.5 0 0 1 0 1H3a.5.5 0 0 1-.5-.5z"
                                />
                            </svg>
                            <svg
                                className="hidden w-4 h-4 hs-collapse-open:block"
                                width={16}
                                height={16}
                                fill="currentColor"
                                viewBox="0 0 16 16"
                            >
                                <path d="M4.646 4.646a.5.5 0 0 1 .708 0L8 7.293l2.646-2.647a.5.5 0 0 1 .708.708L8.707 8l2.647 2.646a.5.5 0 0 1-.708.708L8 8.707l-2.646 2.647a.5.5 0 0 1-.708-.708L7.293 8 4.646 5.354a.5.5 0 0 1 0-.708z" />
                            </svg>
                        </button>
                    </div>
                </div>
                <div
                    className={`${
                        Toggle ? 'hidden overflow-hidden' : ''
                    } transition-all duration-300 hs-collapse basis-full grow sm:block`}
                >
                    <div className="flex flex-col gap-5 mt-5 sm:flex-row sm:items-center sm:justify-end sm:mt-0 sm:pl-5">
                        <a className="font-medium text-blue-500" href="#" aria-current="page">
                            Landing
                        </a>
                        <a
                            className="font-medium text-gray-600 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500"
                            href="#"
                        >
                            Account
                        </a>
                        <a
                            className="font-medium text-gray-600 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500"
                            href="#"
                        >
                            Work
                        </a>
                        <a
                            className="font-medium text-gray-600 hover:text-gray-400 dark:text-gray-400 dark:hover:text-gray-500"
                            href="#"
                        >
                            Blog
                        </a>
                    </div>
                </div>
            </nav>
        </>
    );
}

export default Navbar;
