import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone'
import InputMask from 'react-input-mask';

import { ImageConfig } from '../../config/ImageConfig'

const FormMain = () => {
  // files
  const [files, setFiles] = useState([])
  // items
  const Items = files.map(file => (
    <div className='preview-item' key={file.path}>
      <div className="preview-item__info">
        {ImageConfig[file.type.split("/")[1]] || ImageConfig["default"]}
        <p>{file.path} - {(file.size / (1024 * 1024)).toFixed(2)} MB</p>
      </div>
      <span
        className="preview-item__del"
        onClick={() => fileRemove(file)}
      >
        <i className="fa-solid fa-trash-can"></i>
      </span>
    </div>
  ))
  // fileRemove
  const fileRemove = (file) => {
    setFiles(currentFiles => currentFiles.filter(f => f !== file))
  }
  // dropzone
  function Dropzone() {
    const {
      getRootProps,
      getInputProps,
      isDragActive,
      acceptedFiles,
    } = useDropzone({
      onDrop: acceptedFiles => {
        setFiles(currentFiles => [...currentFiles, ...acceptedFiles]);
      }
    }
    )
    // dropzone view
    return (
      <div
        {...getRootProps()}
        isDragActive={isDragActive}
        className={isDragActive === true ? "dragover" : ""}
      >
        <input {...getInputProps()} name="files" />
        <i className="fa-sharp fa-solid fa-file-arrow-up"></i>
        <h2>Arraste & Solte seus arquivos aqui!</h2>
      </div>
    )
  }
  // localstorage 
  const [nomeCliente, setNomeCliente] = useState(localStorage.getItem('nomeCliente') || '')
  const [emailCliente, setEmailCliente] = useState(localStorage.getItem('emailCliente') || '')
  const [telefoneCliente, setTelefoneCliente] = useState(localStorage.getItem('telefoneCliente') || '')
  // handle form submit
  const handleSubmit = (e) => {
    e.preventDefault()
    setNomeCliente(document.getElementsByName('nomeCliente')[0].value)
    setEmailCliente(document.getElementsByName('emailCliente')[0].value)
    setTelefoneCliente(document.getElementsByName('telefoneCliente')[0].value)
    localStorage.setItem('nomeCliente', nomeCliente)
    localStorage.setItem('emailCliente', emailCliente)
    localStorage.setItem('telefoneCliente', telefoneCliente)
    const form = document.querySelector('#form')
    form.submit()
  }
  // pageview
  return (
    <div className="container-flex">
      <div>
        <h1>Envie seus arquivos!</h1>
        <p>
          Não se preocupe com o tipo de arquivo que você deseja imprimir, suportamos diversos formatos, como PDF, DOC, XLS, JPG, PNG e muito mais.
        </p>
      </div>
      <form method="post" encType="multipart/form-data" action="http://localhost:3001/form" id="form">
        <h2>Dados de contato :)</h2>
        <label>
          <p>Nome *</p>
          <input type="text" name="nomeCliente" value={nomeCliente} onChange={(e) => setNomeCliente(e.target.value)} placeholder="Seu nome" required />
        </label>
        <div>
          <label>
            <p>Email *</p>
            <input type="email" name="emailCliente" value={emailCliente} onChange={(e) => setEmailCliente(e.target.value)} placeholder="email@email.com" required />
          </label>
          <label>
            <p>Telefone *</p>
            <InputMask mask="(99) 9 9999-9999" name="telefoneCliente" value={telefoneCliente} onChange={(e) => setTelefoneCliente(e.target.value)} placeholder="(00) 0 0000-0000" required />
          </label>
        </div>
        <div>
          <Dropzone />
        </div>
      </form>
      {Items.length > 0 ? (
        <div className="preview" name="files">
          {Items}
          {console.log(files)}
        </div>
      ) : null}
      {Items.length > 0 ? (
        <div>
          <button className="btn-secundary btn-border-blue" onClick={handleSubmit}>
            <p>Finalizar Envio!</p>
          </button>
        </div>
      ) : null}
    </div>
  )
}

export default FormMain