import React from 'react'

import { Link } from 'react-router-dom'

import Ovini from '../../assets/ovini.svg'



const NotFoundMain = () => {
  return (
    <main id='not-found'>
        <div className="container-flex">
            <section>
                <div>
                    <h1>A página que você procura não foi encontrada :(</h1>
                    <h2>O link que você clicou pode estar quebrado ou pode ter sido removido.</h2>
                    <div>
                        <Link to={'/'} className='btn-primary btn-color-blue'><p>Voltar para a página inicial</p></Link>
                    </div>
                </div>
                <img src={Ovini} alt="Not Found" />
            </section>
        </div>
    </main>
  )
}

export default NotFoundMain