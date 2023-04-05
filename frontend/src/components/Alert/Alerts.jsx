import React from 'react'

import { GoVerified } from 'react-icons/go'
import { IoMdCloseCircle } from 'react-icons/io'

import { BsExclamationCircleFill } from 'react-icons/bs'

const Alerts = ({ type, content, res, reaload, anyFunc, func, time }) => {
	const closeAlert = () => {
		if (reaload) {
			window.location.reload(true)
		} else {
			if (func) {
				func(false)
			}
		}
	}

	if (time) {
		setTimeout(() => {
			func(false)
		}, 4000);
	}

	return (
		<div className='alert'>
			{res ? (
				<div className={`alert-container ${type ? type : null}`}>
					<div className='alert-header'>
						{type === 'Sucesso' ? <GoVerified color='#245302' /> : null}
						{type === 'Alerta' ? <BsExclamationCircleFill color='#7A5D00' /> : null}
						<div className='alert-header__content'>
							<h2>{type}</h2>
							<p>{content}</p>
						</div>
						{type === 'Sucesso' ? <IoMdCloseCircle onClick={closeAlert} color='#245302' /> : null}
						{type === 'Alerta' ? <IoMdCloseCircle onClick={closeAlert} color='#7A5D00' /> : null}
					</div>
					<div className="alert-res">
						<button onClick={() => (anyFunc(), func(false))}>Confirmar</button>
						<button onClick={() => func(false)}>Cancelar</button>
					</div>
				</div>
			) : (
				<div className={`alert-container ${type ? type : null}`}>
					<div className='alert-header'>
						{type === 'Sucesso' ? <GoVerified color='#245302' /> : null}
						<div className='alert-header__content'>
							<h2>{type}</h2>
							<p>{content}</p>
						</div>
						{type === 'Sucesso' ? <IoMdCloseCircle onClick={closeAlert} color='#245302' /> : null}
						{type === 'Alerta' ? <IoMdCloseCircle onClick={closeAlert} color='#7A5D00' /> : null}
					</div>
				</div>
			)}
		</div>
	)
}

export default Alerts