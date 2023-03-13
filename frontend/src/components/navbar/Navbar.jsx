import React from 'react'

import { Link } from 'react-router-dom'

import Logo from '../../assets/Logo.png'
import Menu from '../../assets/Menu.svg'

const Navbar = () => {
    return (
        <nav>
            <div>
                <div>
                    <img src={Logo} alt="Logo" />
                    <Link to={'/home'}>Print Storage</Link>
                </div>
                <img src={Menu} alt="Menu" className='open-menu' />
                <ul>
                    <li><Link to={'/home'}>Home</Link></li>
                    <li><Link to={'/'}>Cliente</Link></li>
                    <li><Link to={'/admin'}>Admin</Link></li>
                    <li><Link to={'/ajuda'}>Ajuda</Link></li>
                </ul>
            </div>
            <Link to={'/'} className='btn-secundary btn-border-blue'>
                <p>Envie seu arquivo!</p>
            </Link>
        </nav>
    )
}

export default Navbar