async function deletarArquivosCheck() {
    try {
      const response = await fetch(
        `http://localhost:3001/form/deleteimpressos`,
        {
          method: "DELETE",
        }
      );
      const data = await response.json();
      alert(data.message);
      window.location.reload()
    } catch (error) {
      console.error(error);
    }
  }
  
  module.exports = {
    deletarArquivosCheck,
  };
  