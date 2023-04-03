import axios from "axios";

export async function deletarClientePorId(clienteId, setCliente) {
  try {
    const response = await axios.delete(
      `http://localhost:3001/form/deleteCliente/${clienteId}`
    );

    alert(response.data.message);
    setCliente((clientesAntigos) =>
      clientesAntigos.filter((cliente) => cliente._id !== clienteId)
    );
  } catch (error) {
    console.error(error);
  }
}

export default deletarClientePorId;
