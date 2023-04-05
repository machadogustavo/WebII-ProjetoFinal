import React from 'react'

const Alert = () => {
	const closeAlert = (e) => {
		const alert = document.querySelector('.modal')
		alert.classList.add('none')
		window.location.reload(true)
	}
	return (
		<div className="modal">
			<div className="modal-content">
				<p>Alerta</p>
				<button className="close-button" onClick={closeAlert}>Fechar</button>
			</div>
		</div>
	)
}

export default Alert