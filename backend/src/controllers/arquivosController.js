import arquivos from "../models/Arquivo.js";

class arquivosController {
  // CRUD

  // CREATE - POST
  static criarArquivo = (req, res) => {
    if (req.fileValidationError) {
      return res.status(400).send({ message: req.fileValidationError });
    }
    const arquivo = new arquivos({
      nomeArquivo: req.file.originalname + Date.now(),
      arquivo: req.file.buffer,
      tipoArquivo: req.file.mimetype,
    });

    arquivo.save((error) => {
      if (!error) {
        res.status(201).send({ message: `Arquivo cadastrado com sucesso!` });
      } else {
        res
          .status(500)
          .send({ message: `${error.message} - Erro ao cadastrar o cliente.` });
      }
    });
  };

  // READ - GET GERAL
  static lerArquivos = (req, res) => {
    arquivos.find((error, arquivos) => {
      if (error) {
        res.status(404).send({ message: "Erro ao buscar arquivos." });
      } else {
        res.status(200).json(arquivos);
      }
    });
  };

  //  READ² - GET POR NOME
  static lerArquivoNome = (req, res) => {
    let nomeArquivo = req.params.nomeArquivo;
    arquivos.find({ nomeArquivo }, (error, arquivo) => {
      if (!error) {
        res.status(200).json(arquivo);
      } else {
        res
          .status(500)
          .send({
            message: `${error.message} - Erro ao buscar arquivo por nome`,
          });
      }
    });
  };

  // READ³ - GET POR ID
  static lerArquivoId = (req, res) => {
    let idArquivo = req.params.id;
    arquivos.findById(idArquivo, (error, arquivo) => {
      if (error) {
        res
          .status(400)
          .send({ message: `${error.message} - Erro ao buscar arquivo.` });
      } else {
        const buffer = Buffer.from(arquivo.arquivo, "binary");
        const blob = new Blob([buffer], { type: arquivo.tipoArquivo });
        const url = window.URL.createObjectURL(blob);
        res.status(200).json({ url });
      }
    });
  };

  // UPDATE - PUT
  static editarArquivo = (req, res) => {
    let idArquivo = req.params.id;
    arquivos.findByIdAndUpdate(
      idArquivo,
      {
        nomeArquivo: req.file.originalname,
        arquivo: req.file.buffer,
        tipoArquivo: req.file.mimetype,
      },
      (error) => {
        if (error) {
          res
            .status(500)
            .send({ message: `${error.message} - Erro ao editar arquivo.` });
        } else {
          res.status(200).send({ message: "Arquivo editado com sucesso." });
        }
      }
    );
  };

  // DELETE - DELETE
  static deletarArquivo = (req, res) => {
    let idArquivo = req.params.id;
    arquivos.findByIdAndDelete(idArquivo, (error) => {
      if (!error) {
        res
          .status(200)
          .send({
            message: `O arquivo com id ${idArquivo} foi removido com sucesso.`,
          });
      } else {
        res
          .status(500)
          .send({ message: `${error.message} - Erro ao deletar arquivo.` });
      }
    });
  };
}

export default arquivosController;
