import React, { useState } from 'react';
import styles from './navbar.module.css';
import { useTheme as useNextTheme } from 'next-themes';
import { Container, useTheme, Navbar as Nav, Text, Switch, Input, Dropdown, Avatar } from '@nextui-org/react';
import useToggle from '@/core/hooks/useToggle';

import NextLink from 'next/link';
import { NavItems } from '@/core/constants/data';
import { useRouter } from 'next/router';
import { AcmeLogo, SearchIcon } from '../icons';

function Navbar() {
    const { setTheme } = useNextTheme();
    const { isDark, theme } = useTheme();
    const [Active, setActive] = useState<Number>(0);
    const [User, setUser] = useState<Boolean>(true);
    const router = useRouter();
    const [fields, setFields] = useState({
        search: '',
    });
    const handleOnChange = (event) => {
        const target = event.target;
        const id = target.id;
        const value = target.value;
        setFields((prev) => ({
            ...prev,
            ...{
                [id]: value,
            },
        }));
    };

    return (
        <>
            <Nav variant="sticky">
                <Container display="flex" alignItems="center">
                    <Nav.Brand
                        css={{
                            marginRight: 10,
                            cursor: 'pointer',
                        }}
                        onClick={() => router.push('/')}
                    >
                        <AcmeLogo />
                        <Text b color="inherit" hideIn="xs">
                            ACME
                        </Text>
                    </Nav.Brand>

                    <Nav.Content hideIn="xs">
                        {NavItems?.map((item, index) => (
                            <li className="flex items-center ml-3 list-none" key={index}>
                                <NextLink
                                    href={item.url}
                                    className={`text-lg font-semibold leading-normal ${
                                        Active === index ? 'active' : ''
                                    }`}
                                    style={{ color: theme?.colors.text }}
                                    onClick={() => setActive(index)}
                                >
                                    {item.type}
                                </NextLink>
                            </li>
                        ))}
                        <Nav.Item
                            css={{
                                '@xsMax': {
                                    w: '100%',
                                    jc: 'center',
                                },
                            }}
                        >
                            <Switch checked={isDark} onChange={(e) => setTheme(e.target.checked ? 'dark' : 'light')} />
                        </Nav.Item>
                    </Nav.Content>
                </Container>
                <Nav.Content className="min-w-max">
                    <Input
                        aria-label="Close"
                        clearable
                        contentLeft={<SearchIcon fill="var(--nextui-colors-accents6)" size={16} />}
                        contentLeftStyling={false}
                        css={{
                            w: '100%',
                            '@xsMax': {
                                mw: '300px',
                            },
                            '& .nextui-input-content--left': {
                                h: '100%',
                                ml: '$4',
                                dflex: 'center',
                            },
                        }}
                        placeholder="Search..."
                        id="pass"
                        onChange={handleOnChange}
                    />

                    {User ? (
                        <>
                            <Dropdown placement="bottom-right">
                                <Nav.Item>
                                    <Dropdown.Trigger>
                                        <Avatar text="Joe" size="md" />
                                    </Dropdown.Trigger>
                                </Nav.Item>
                                <Dropdown.Menu
                                    aria-label="User menu actions"
                                    color="secondary"
                                    onAction={(actionKey) => console.log({ actionKey })}
                                >
                                    <Dropdown.Item key="new">New file</Dropdown.Item>
                                    <Dropdown.Item key="copy">Copy link</Dropdown.Item>
                                    <Dropdown.Item key="logout" withDivider color="error">
                                        Log Out
                                    </Dropdown.Item>
                                </Dropdown.Menu>
                            </Dropdown>
                        </>
                    ) : (
                        <>
                            <NextLink href="/login" className="p-3 text-lg font-semibold leading-normal">
                                Login
                            </NextLink>
                            <NextLink href="/signup" className="p-3 text-lg font-semibold leading-normal">
                                Sign up
                            </NextLink>
                        </>
                    )}
                </Nav.Content>
            </Nav>
        </>
    );
}

export default Navbar;
