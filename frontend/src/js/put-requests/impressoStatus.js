import axios from "axios";

export async function ImpressoStatus(arquivoClienteId, setArquivos) {
  try {
    const response = await axios.put(
      `http://localhost:3001/form/arquivoStatus/${arquivoClienteId}`
    );
    alert(response.data.message);
  } catch (error) {
    console.error(error);
  }
}

export default ImpressoStatus;
