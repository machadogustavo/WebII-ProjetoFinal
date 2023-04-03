import axios from "axios";

async function postForm(files, nomeCliente, emailCliente, telefoneCliente) {
  const formData = new FormData();
  files.forEach((files) => {
    formData.append("files", files);
  });
  formData.append("nomeCliente", nomeCliente);
  formData.append("emailCliente", emailCliente);
  formData.append("telefoneCliente", telefoneCliente);

  try {
    const response = await axios.post("http://localhost:3001/form", formData);
    console.log(response.data);
    alert('Arquivos enviados com sucesso!')
  } catch (error) {
    console.error(error);
  }
}

export default postForm;
