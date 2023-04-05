import axios from "axios";

async function postForm(files, nomeCliente, emailCliente, telefoneCliente, setIsAlertVisible) {
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
    // alert('Arquivos enviados com sucesso!');
    return setIsAlertVisible(true);
  } catch (error) {
    console.error(error);
  }
}

export default postForm;
