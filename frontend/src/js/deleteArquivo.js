async function deletarArquivoPorId(arquivoId) {
  try {
    const response = await fetch(
      `http://localhost:3001/form/delete/${arquivoId}`,
      {
        method: "DELETE",
      }
    );
    const data = await response.json();
    window.location.reload()
    alert(data.message);
  } catch (error) {
    console.error(error);
  }
}

module.exports = {
  deletarArquivoPorId,
};
