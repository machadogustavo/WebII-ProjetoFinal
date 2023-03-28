export async function ImpressoStatus(arquivoClienteId) {
  try {
    const response = await fetch(
      `http://localhost:3001/form/arquivoStatus/${arquivoClienteId}`,
      {
        method: "PUT",
      }
    );
    const data = await response.json();
    alert(data.message);
    window.location.reload()
  } catch (error) {
    console.error(error);
  }
}

export default ImpressoStatus