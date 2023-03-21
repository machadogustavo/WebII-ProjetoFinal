async function renderArquivo(arquivoClienteId) {
    try {
      const response = await fetch(
        `http://localhost:3001/form/clienteArquivo/${arquivoClienteId}`,
        {
          method: "GET",
        }
      );
      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error(error);
    }
  }
  
  module.exports = {
    renderArquivo,
  };
  