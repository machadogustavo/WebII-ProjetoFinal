export const renderArquivo = (idArquivo) => {
  fetch(`http://localhost:3001/arquivos/${idArquivo}`)
    .then((response) => {
      console.log(response);
      return response.blob();
    })
    .then((data) => {
      console.log(data);
      const url = window.URL.createObjectURL(new Blob([data]));
      const link = document.createElement("a");
      link.href = url;
      link.setAttribute("download", "arquivo.pdf");
      link.click();
    })
    .catch((error) => {
      console.error(error);
    });
};
