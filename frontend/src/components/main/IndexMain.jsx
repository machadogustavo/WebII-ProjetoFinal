import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'

import { ImageConfig } from '../../config/ImageConfig'


// form validation
function useFormik({initialValues}) {
  const [values, setValues] = useState(initialValues)

  function handleChange(e) {
    const fieldName = e.target.getAttribute('name')
    setValues({
      ...values,
      [fieldName]: e.target.value
    })
  }

  return {
    values,
    handleChange
  }
}

const IndexMain = props => {
  // useRef
  const wrapperRef = useRef(null)
  // add and remove css styles on drag files
  const onDragEnter = () => wrapperRef.current.classList.add('dragover')
  const onDragLeave = () => wrapperRef.current.classList.remove('dragover')
  const onDrop = () => wrapperRef.current.classList.remove('dragover')
  // useState
  const [fileList, setFileList] = useState([])
  // onFileDrop
  const onFileDrop = (e) => {
    const newFile = e.target.files[0]
    if (newFile) {
      const updatedList = [...fileList, newFile]
      setFileList(updatedList)
      props.onFileChange(updatedList)
    }
  }
  // onFileChange
  const onFileChange = (files) => {
    console.log(files)
  }
  // removefile
  const fileRemove = (file) => {
    const updatedList = [...fileList]
    updatedList.splice(fileList.indexOf(file), 1)
    setFileList(updatedList)
    props.onFileChange(updatedList)
  }

  // formik
  const formik = useFormik({
    initialValues: {
      clientName: 'morandi',
      clientTel: '123456',
      clientEmail: 'email@email.com'
    }
  })

  // pageView
  return (
    <main id='main'>
      <div className="container-flex">
        <div>
          <h1>Envie seus arquivos!</h1>
          <p>Não se preocupe com o tipo de arquivo que você deseja imprimir, suportamos diversos formatos, como PDF, DOC, XLS, JPG, PNG e muito mais.</p>
        </div>
        <form action="#" id='form'>
          <h2>Dados de contato :)</h2>
          <label>
            <p>Nome *</p>
            <input type="text" name='clientName' placeholder='Seu nome' onChange={formik.handleChange} value={formik.values.clientName} />
          </label>
          <label>
            <p>Email *</p>
            <input type="email" name='clientEmail' placeholder='email@email.com' onChange={formik.handleChange} value={formik.values.clientEmail} />
          </label>
          <label>
            <p>Telefone *</p>
            <input type="text" name='clientTel' placeholder='(XX) X XXXX-XXXX' onChange={formik.handleChange} value={formik.values.clientTel} />
          </label>
          <div ref={wrapperRef} onDragEnter={onDragEnter} onDragLeave={onDragLeave} onDrop={onDrop}>
            <i className="fa-sharp fa-solid fa-file-arrow-up"></i>
            <h2>Arraste & Solte seus arquivos aqui!</h2>
            <input type="file" name="file" id="file" onChange={onFileDrop} onFileChange={(files) => onFileChange(files)} />
          </div>
          <div>
            <p>ou</p>
            <label htmlFor="file">
              <div className="btn-primary btn-color-blue">
                <p>Selecione seus arquivos</p>
              </div>
            </label>
          </div>
        </form>
        {
          fileList.length > 0 ? (
            <div className="preview">
              {
                fileList.map((item, index) => (
                  <div key={index} className="preview-item">
                    <div className="preview-item__info">
                      {ImageConfig[item.type.split('/')[1]] || ImageConfig['default']}
                      <p>{item.name}</p>
                    </div>
                    <span className="preview-item__del" onClick={() => fileRemove(item)}><i className="fa-solid fa-trash-can"></i></span>
                  </div>
                ))
              }
            </div>
          ) : null
        }
        {
          fileList.length > 0 ? (
            <div>
              <button className='btn-secundary btn-border-blue' form='form'><p>Finalizar Envio!</p></button>
            </div>
          ) : null
        }
      </div>
    </main>
  )
}

// proptype main
IndexMain.propTypes = {
  onFileChange: PropTypes.func
}

export default IndexMain