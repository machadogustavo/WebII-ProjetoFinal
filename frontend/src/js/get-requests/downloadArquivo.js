import axios from "axios";

export const downloadArquivo = (idArquivo, method) => {
  // Faz a requisição para obter as informações do arquivo em formato JSON
  axios
    .get(`http://localhost:3001/arquivos/${idArquivo}`)
    .then((response) => {
      const arquivo = response.data;
      const nomeArquivo = arquivo.nomeArquivo;
      const tipoArquivo = arquivo.tipoArquivo;
      const extensaoArquivo = arquivo.extensaoArquivo;

      // Faz a requisição para obter o buffer binário do arquivo
      axios
        .get(`http://localhost:3001/arquivos/buffearquivo/${idArquivo}`, {
          responseType: "arraybuffer",
        })
        .then((response) => {
          const blob = new Blob([response.data], { type: tipoArquivo });
          const url = window.URL.createObjectURL(blob);

          // Cria um elemento <a> para download do arquivo e simula o clique no link
          const link = document.createElement("a");
          link.href = url;

          method === 2
            ? (link.setAttribute(
                "download",
                `${nomeArquivo}${extensaoArquivo}`
              ),
              link.click())
            : (window.open(link, "_blank"),
              window.addEventListener("load", function () {
                window.print();
              }));
        })
        .catch((error) => {
          console.error(error);
        });
    })
    .catch((error) => {
      console.error(error);
    });
};
