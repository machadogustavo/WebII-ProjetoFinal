async function deletarArquivoPorId(arquivoId) {
  try {
    const response = await fetch(
      `http://localhost:3001/form/deleteArquivo/${arquivoId}`,
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
  deletarArquivoPorId,
};
