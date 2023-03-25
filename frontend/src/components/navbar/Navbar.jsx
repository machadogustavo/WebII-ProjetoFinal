import React, { useState } from 'react'
import { Link } from 'react-router-dom'

import Logo from '../../assets/Logo.png'

import { RiMenu3Line, RiCloseLine } from 'react-icons/ri'

const Navbar = () => {
	const [showMenu, setShowMenu] = useState(false)

	const toggleMenu = () => {
		setShowMenu(!showMenu)
	}

	const closeMenu = () => {
		setShowMenu(false)
	}

	return (
		<nav>
			<div>
				<div>
					<img src={Logo} alt="Logo" />
					<Link to={'/home'} onClick={closeMenu}>Print Storage</Link>
				</div>
				{showMenu ? (
					<RiCloseLine onClick={toggleMenu} size={32} color={"#6246ea"} />
				) : (
					<RiMenu3Line onClick={toggleMenu} size={32} color={"#6246ea"} className="open-menu" />
				)}
				<ul className={showMenu ? 'menu-active' : 'menu-hidden'}>
					<li><Link to={'/home'} onClick={closeMenu}>Home</Link></li>
					<li><Link to={'/'} onClick={closeMenu}>Cliente</Link></li>
					<li><Link to={'/admin'} onClick={closeMenu}>Admin</Link></li>
					<li><Link to={'/ajuda'} onClick={closeMenu}>Ajuda</Link></li>
				</ul>
			</div>
			<Link to={'/'} className='btn-secundary btn-border-blue'>
				<p>Envie seu arquivo!</p>
			</Link>
		</nav>
	)
}

export default Navbar