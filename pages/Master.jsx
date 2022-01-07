import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { useEffect } from 'react'
import { Container, Menu } from 'semantic-ui-react'
import theme from '../styles/theme'
import qrmAxios from './qrmAxios'

export default function Master({ children, title }) {
    const router = useRouter()
    return (
        <>
            <Head>
                <title>{title} - QR Mangala</title>
            </Head>
            <Menu>
                <Menu.Item header style={{ backgroundColor: theme.primary, color: 'white ' }}>QR Mangala</Menu.Item>
                <Menu.Item header style={{ color: theme.primary }}
                    name='BIALAdmin' icon="plane"
                />
                <Menu.Menu position='right'>
                    <Menu.Item
                        name='Location Hits'
                        onClick={() => router.push('/')}
                    />
                    <Menu.Item
                        name='Add QR Code'
                        onClick={() => router.push('/addqr')}
                    />
                    <Menu.Item
                        name='Locations'
                        onClick={() => router.push('/locations')}
                    />
                </Menu.Menu>
            </Menu>
            <Container>
                <h2>{title}</h2>
                {children}
            </Container>
        </>
    )
}
