import React from 'react'

import LogoWhite from '../../assets/LogoWhite.svg'

const Footer = () => {
  return (
    <footer>
      <div className="container-flex">
        <img src={LogoWhite} alt="Logo" />
        <div className="div"></div>
        <p>Coded by <a href="https://github.com/gabrielmorandi" target="_blank">Gabriel Morandi</a> & <a href="http://github.com/machadogustavo" target="_blank">Gustavo Machado</a>.</p>
      </div>
    </footer>
  )
}

export default Footer