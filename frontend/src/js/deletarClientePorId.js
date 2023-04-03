export async function deletarClientePorId(clienteId) {
    try {
      const response = await fetch(
        `http://localhost:3001/form/deleteCliente/${clienteId}`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      alert(data.message);
    } catch (error) {
      console.error(error);
    }
  }


export default deletarClientePorId