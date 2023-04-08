import axios from "axios";

export async function deletarArquivosCheck() {
  try {
    const response = await axios.delete(
      `http://localhost:3001/form/deleteimpressos`
    );
    alert(response.data.message);
    window.location.reload();
  } catch (error) {
    console.error(error);
  }
}

export default deletarArquivosCheck;
