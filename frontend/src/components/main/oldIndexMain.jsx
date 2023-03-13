import React, { useRef, useState } from 'react'
import PropTypes from 'prop-types'

import { ImageConfig } from '../../config/ImageConfig'

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
    
    // pageView
    return (
        <>
            <main>
                <div className="container-grid" ref={wrapperRef} onDragEnter={onDragEnter} onDragLeave={onDragLeave} onDrop={onDrop}>
                    <form action="">
                        <div className="form-header">
                            <i className="fa-sharp fa-solid fa-file-arrow-up"></i>
                            <h2>Drag & Drop your files here</h2>
                        </div>
                        <input type="file" name="files" onChange={onFileDrop} onFileChange={(files) => onFileChange(files)} />
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
                </div>
            </main>
        </>
    )
}

// proptype main
IndexMain.propTypes = {
    onFileChange: PropTypes.func
}

export default IndexMain