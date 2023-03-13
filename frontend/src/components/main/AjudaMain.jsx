import React from 'react'

import { Link } from 'react-router-dom'

import Prog from '../../assets/prog.svg'
import Sync from '../../assets/sync.svg'

const AjudaMain = () => {
  return (
    <main id='ajuda'>
        <div className="container-flex">
            <h2>Como Funciona</h2>
            <p>Bem-vindo à nossa plataforma de impressão de arquivos! Aqui você pode enviar seus arquivos para impressão diretamente do conforto da sua casa ou escritório. Com a nossa tecnologia de ponta e uma equipe de profissionais altamente qualificados, garantimos que suas impressões serão de alta qualidade e entregues rapidamente.</p>
            <img src={Prog} alt="Escolher Arquivos" />
            <p>Não se preocupe com o tipo de arquivo que você deseja imprimir, suportamos diversos formatos, como PDF, DOC, XLS, JPG, PNG e muito mais.</p>
            <p>Nossa plataforma é fácil de usar e intuitiva, basta arrastar os arquivos que quer fazer o upload. Então, relaxe e deixe o resto conosco! Nosso serviço de entrega rápida garantirá que suas impressões cheguem até você rapidamente.</p>
            <img src={Sync} alt="Fazer Upload" />
            <p>Experimente agora e descubra como a nossa plataforma de impressão de arquivos pode simplificar sua vida e melhorar a qualidade das suas impressões. Estamos ansiosos para atendê-lo!</p>
            <div>
                <Link to={'/'} className='btn-primary btn-color-blue'>
                  <p>Ir para página de envio de arquivos!</p>
                </Link>
            </div>
        </div>
    </main>
  )
}

export default AjudaMain