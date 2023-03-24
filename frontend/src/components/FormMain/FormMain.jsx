import React, { useState } from 'react'
import { useDropzone } from 'react-dropzone'

import { ImageConfig } from '../../config/ImageConfig'

const FormMain = () => {
	const [files, setFiles] = useState([]);

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

		const fileRemove = (file) => {
			setFiles(currentFiles => currentFiles.filter(f => f !== file))
		}		

    const Items = files.map(file => (
			<div className='preview-item' key={file.path}>
				<div className="preview-item__info">
					{ImageConfig[file.type.split("/")[1]] || ImageConfig["default"]}
					<p>{file.path} - {file.size} bytes</p>
				</div>
				<span
					className="preview-item__del"
					onClick={() => fileRemove(file)}
				>
					<i className="fa-solid fa-trash-can"></i>
				</span>
			</div>
    ))
		
    return (
      <div className="container-flex">
				<div>
					<h1>Envie seus arquivos!</h1>
					<p>
						Não se preocupe com o tipo de arquivo que você deseja imprimir, suportamos diversos formatos, como PDF, DOC, XLS, JPG, PNG e muito mais.
					</p>
				</div>
				<form method="post" enctype="multipart/form-data" action="http://localhost:3001/form" id="form">
					<h2>Dados de contato :)</h2>
					<label>
						<p>Nome *</p>
						<input type="text" name="nomeCliente" placeholder="Seu nome" required />
					</label>
					<div>
						<label>
							<p>Email *</p>
							<input type="email" name="emailCliente" placeholder="email@email.com" required />
						</label>
						<label>
							<p>Telefone *</p>
							<input type="text" name="telefoneCliente" placeholder="(00) 0 0000-0000" required />
						</label>
					</div>
					<div>
						<div 
							{...getRootProps()}
							isDragActive={isDragActive}
							className={isDragActive === true ? "dragover" : ""}
						>
							<input {...getInputProps()} />
							<i className="fa-sharp fa-solid fa-file-arrow-up"></i>
							<h2>Arraste & Solte seus arquivos aqui!</h2>
						</div>
					</div>
				</form>
				{Items.length > 0 ? (
					<div className="preview">
						{Items}
						{console.log(files)}
					</div>
				) : null}
				{Items.length > 0 ? (
          <div>
            <button className="btn-secundary btn-border-blue" form="form">
              <p>Finalizar Envio!</p>
            </button>
          </div>
        ) : null}
			</div>
    )
  }

  return (
    <Dropzone />
  )
}

export default FormMain
