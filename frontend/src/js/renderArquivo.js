import axios from 'axios';

export const renderArquivo = (idArquivo) => {
  axios.get(`http://localhost:3001/arquivos/${idArquivo}`)
    .then((response) => {
      // const arquivo = response.data;
      // const nomeArquivo = arquivo.nomeArquivo;
      // const tipoArquivo = arquivo.tipoArquivo;
      // const extensaoArquivo = arquivo.extensaoArquivo
      // const blob = new Blob([arquivo.arquivo], { type: tipoArquivo });
      // const url = window.URL.createObjectURL(blob);
      // const link = document.createElement('a');
      link.href = response.data;
      link.setAttribute('download', `${nomeArquivo}${extensaoArquivo}`);
      link.click();
    })
    .catch((error) => {
      console.error(error);
    });
};