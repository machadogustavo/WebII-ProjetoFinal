import React from 'react'

const AdminMain = () => {

  fetch('http://localhost:3000/form').then((response) => {
    response.json().then((dados) => {
      dados.map((cliente) => {
        console.log(cliente)
      })
    })
  })

  return (
    <div>AdminMain</div>
  )
}

export default AdminMain