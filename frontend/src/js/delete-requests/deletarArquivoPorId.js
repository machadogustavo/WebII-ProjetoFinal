import axios from "axios";

async function deletarArquivoPorId(arquivoId, setArquivos) {
  try {
    const response = await axios.delete(
      `http://localhost:3001/form/deleteArquivo/${arquivoId}`
    );
    alert(response.data.message);
    setArquivos((arquivosAntigos) =>
      arquivosAntigos.filter((arquivo) => arquivo.arquivo._id !== arquivoId)
    );
  } catch (error) {
    console.error(error);
  }
}

export default deletarArquivoPorId;
