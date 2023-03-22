import arquivos from "../models/Arquivo.js";
import clientes from "../models/Cliente.js";
import clienteArquivosMD from "../models/clienteArquivo.js";
import path from "path";

class formArquivosClientesController {
  // CRUD

  // CREATE - POST

  static criarArquivoCliente = async (req, res) => {
    try {
      const emailCliente = req.body.emailCliente.toLowerCase();

      // Verificar se existe um cliente com o mesmo email.
      const clienteExistente = await clientes.findOne({ emailCliente });

      let Cliente;
      let ClienteId;

      if (clienteExistente) {
        // Se já existir um cliente com o mesmo email, utilizar o mesmo ID.
        ClienteId = clienteExistente._id;
      } else {
        // Se não existir, criar um novo cliente.
        Cliente = new clientes({
          nomeCliente: req.body.nomeCliente,
          telefoneCliente: req.body.telefoneCliente,
          emailCliente: req.body.emailCliente,
        });

        ClienteId = Cliente._id;

        // Salva o cliente no banco de dados
        await Cliente.save();
      }

      let msgRetorno = {
        clientes: [],
        arquivos: [],
      };

      let arrayArquivos = [];

      for (let i = 0; i < req.files.length; i++) {
        let file = req.files[i];

        let nomeArquivoFormatado = path.parse(file.originalname).name;
        nomeArquivoFormatado.substring(0, 15).replace(/\s+/g, '');;
        let Arquivo = new arquivos({
          nomeArquivo: nomeArquivoFormatado,
          arquivo: file.buffer,
          dataArquivo: Date.now(),
          tipoArquivo: file.mimetype,
          tamanhoArquivo: file.size,
          cliente: ClienteId,
        });

        await Arquivo.save();
        // Salva a relação entre cliente e arquivo no banco de dados
        let clienteArquivo = new clienteArquivosMD({
          cliente: ClienteId,
          arquivo: Arquivo._id,
        });

        await clienteArquivo.save();

        arrayArquivos.push(file.originalname);
        msgRetorno.clientes.push({
          emailCliente: req.body.emailCliente,
        });
        msgRetorno.arquivos.push({
          nomeArquivo: file.originalname,
        });
      }
      console.log("MSG RETORNO =>", msgRetorno);

      return res.status(201).send({
        message: `Arquivo e Cliente cadastrados com sucesso!`,
        emailCliente: req.body.emailCliente,
        nomeArquivo: arrayArquivos,
      });
    } catch (error) {
      // Tratamento de Erro
      return res.status(500).send({
        message: `${error.message} - Erro ao cadastrar o arquivo e o cliente.`,
      });
    }
  };

  static lerArquivoClienteAll = async (req, res) => {
    try {
      const clienteArquivo = await clienteArquivosMD
        .find()
        .populate([{ path: "cliente" }, { path: "arquivo" }])
        .exec();

      res.status(200).json(clienteArquivo);
    } catch (error) {
      res.status(400).send({
        message: `${error.message} - Erro ao ler a tabela clienteArquivo`,
      });
    }
  };

  static lerArquivoClientePorId = async (req, res) => {
    const clienteArquivoId = req.params.arquivoClienteId;
    try {
      const clienteArquivo = await clienteArquivosMD
        .findById(clienteArquivoId)
        .populate("arquivo");

        // res.setHeader('Content-Type', clienteArquivo.arquivo.tipoArquivo);
        // res.setHeader('Content-Disposition', `attachment; filename=${clienteArquivo.arquivo.nomeArquivo}`);
        // res.send(clienteArquivo.arquivo);
        res.status(200).json(clienteArquivo.arquivo);
    } catch (error) {
      res.status(400).send({
        message: `${error.message} - Erro ao buscar arquivo associados ao IdCliente`,
      });
    }
  };

  static lerArquivosPorEmailCliente = async (req, res) => {
    const { email } = req.params;

    try {
      const arquivos = await clienteArquivosMD
        .find({ "cliente.emailCliente": email })
        .populate("arquivo")
        .exec();

      res.status(200).json(arquivos);
    } catch (error) {
      res.status(400).send({
        message: `${error.message} - Erro ao buscar arquivos associados ao email ${email}`,
      });
    }
  };

  static lerArquivosPorIDCliente = async (req, res) => {
    const { id } = req.params;

    try {
      const arquivos = await clienteArquivosMD
        .find({ "cliente._id": id })
        .populate("arquivo")
        .exec();

      res.status(200).json(arquivos);
    } catch (error) {
      res.status(400).send({
        message: `${error.message} - Erro ao buscar arquivos associados ao cliente com ID ${id}`,
      });
    }
  };

  // UPDATE

  // UPDATE STATUS

  static editarStatusclienteArquivo = async (req, res) => {
    const id = req.params.arquivoClienteId;
    try {
      const clienteArquivo = await clienteArquivosMD.findById(id);

      if (!clienteArquivo) {
        return res.status(404).send({
          message: `Cliente arquivo com id [${id}] não encontrado`,
        });
      }

      const impressoStatus = !clienteArquivo.impressoStatus;

      const updatedClienteArquivo = await clienteArquivosMD.findByIdAndUpdate(
        id,
        { impressoStatus },
        { new: true }
      );

      return res.status(200).send({
        message: `Status do arquivo com id [${id}] atualizado com sucesso!`,
        data: updatedClienteArquivo,
      });
    } catch (error) {
      // Tratamento de Erro
      return res.status(500).send({
        message: `${error.message} - Erro ao atualizar status do arquivo do cliente.`,
      });
    }
  };

  static deletarArquivoPorId = async (req, res) => {
    try {
      const arquivoId = req.params.arquivoId;
      // Busca o registro de clienteArquivos com o arquivo a ser excluído
      const registro = await clienteArquivosMD.findOne({ arquivo: arquivoId });

      // Exclui o arquivo do banco de dados
      await arquivos.findByIdAndDelete(arquivoId);

      // Se o arquivo tiver associação com algum cliente, exclui o registro de clienteArquivos correspondente
      if (registro) {
        await clienteArquivosMD.findByIdAndDelete(registro._id);
      }

      return res.status(200).send({
        message: `O arquivo com id [${arquivoId}] e todas as suas associações foram excluídos com sucesso!`,
      });
    } catch (error) {
      // Tratamento de Erro
      return res.status(500).send({
        message: `${error.message} - Erro ao excluir o arquivo e suas associações.`,
      });
    }
  };

  static deletarClientePorId = async(req, res) => {
    try {
      const clienteId = req.params.clienteId;
  
      // Busca os registros de clienteArquivos com os arquivos a serem excluídos
      const registros = await clienteArquivosMD.find({ cliente: clienteId });
  
      // Exclui todos os arquivos associados ao cliente
      const arquivosIds = registros.map(registro => registro.arquivo);
      await arquivos.deleteMany({ _id: { $in: arquivosIds } });
  
      // Exclui todos os registros de clienteArquivos associados ao cliente
      await clienteArquivosMD.deleteMany({ cliente: clienteId });
  
      // Exclui o cliente do banco de dados
      await clientes.findByIdAndDelete(clienteId);
  
      return res.status(200).send({
        message: `O cliente com o id [${clienteId}] e todas as suas associações foram excluídos com sucesso!`,
      });
    } catch (error) {
      // Tratamento de Erro
      return res.status(500).send({
        message: `${error.message} - Erro ao excluir o cliente e suas associações.`,
      });
    }
  };


  static deletarArquivosImpressos = async (req, res) => {
    try {
      // Busca todos os registros de clienteArquivos com impressoStatus = true
      const registrosImpressos = await clienteArquivosMD.find({
        impressoStatus: true,
      });

      // Para cada registro encontrado, exclui o arquivo do banco de dados
      for (const registro of registrosImpressos) {
        await arquivos.findByIdAndDelete(registro.arquivo);
      }

      // Exclui todos os registros de clienteArquivos com impressoStatus = true
      await clienteArquivosMD.deleteMany({ impressoStatus: true });

      return res.status(200).send({
        message: `Arquivos impressos e seus registros foram excluídos com sucesso!`,
      });
    } catch (error) {
      // Tratamento de Erro
      return res.status(500).send({
        message: `${error.message} - Erro ao excluir arquivos impressos.`,
      });
    }
  };

  static deletarAll = async (req, res) => {
    try {
      await clientes.deleteMany();
      await arquivos.deleteMany();
      await clienteArquivosMD.deleteMany();

      return res.status(200).send({
        message: "Registros apagados com sucesso!",
      });
    } catch (error) {
      return res.status(500).send({
        message: `${error.message} - Erro ao apagar registros.`,
      });
    }
  };
}

export default formArquivosClientesController;
