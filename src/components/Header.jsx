import React from 'react'
import { Link, useRoutes } from 'react-router-dom'
import SvgIcon from './SvgIcon'

export default function Header() {
    return (
        <div className='header'>
            <Link to="/">
                <SvgIcon className='home_logo' icon="home" width={32} height={32} fill='#fff' />
            </Link>
        </div>
    )
}
