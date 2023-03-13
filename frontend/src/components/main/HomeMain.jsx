import React from 'react'

import { Link } from 'react-router-dom'

import Impressao from '../../assets/impressao.svg'


const HomeMain = () => {
  return (
    <main id='home'>
        <div className="container-flex">
            <section>
                <div>
                    <h1>Plataforma de impressão de arquivos!</h1>
                    <h2>Experimente agora e descubra como a nossa plataforma de impressão de arquivos pode simplificar sua vida e melhorar a qualidade das suas impressões.</h2>
                    <div>
                        <Link to={'/'} className='btn-primary btn-color-blue'><p>Envie seu arquivo!</p></Link>
                    </div>
                </div>
                <img src={Impressao} alt="Impressao" className='no-mobile' />
            </section>
        </div>
    </main>
  )
}

export default HomeMain