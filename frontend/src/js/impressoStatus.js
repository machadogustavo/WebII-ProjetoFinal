async function ImpressoStatus(arquivoClienteId) {
  try {
    const response = await fetch(
      `http://localhost:3001/form/arquivoStatus/${arquivoClienteId}`,
      {
        method: "PUT",
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
  ImpressoStatus,
};
