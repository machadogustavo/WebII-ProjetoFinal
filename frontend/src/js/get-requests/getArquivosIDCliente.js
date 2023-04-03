import axios from 'axios';

export const getArquivosIDCliente = async (idCliente, setArquivos, setIsLoading) => {
  try {
    const response = await axios.get(`http://localhost:3001/form/id/${idCliente}`);
    setArquivos(response.data);
  } catch (error) {
    console.error(error);
    // tratamento de erro usando alerta
  } finally {
    setIsLoading(false);
  }
};