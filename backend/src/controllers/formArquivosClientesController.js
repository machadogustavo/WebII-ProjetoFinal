import arquivos from "../models/Arquivo.js";
import clientes from "../models/Cliente.js";
import clienteArquivosMD from "../models/clienteArquivo.js";

class formArquivosClientesController {
  // CRUD

  // CREATE - POST

  static criarArquivoCliente = async (req, res) => {
    try {
      // const nomeCliente = req.body.nomeCliente

      // // Verificar se existe um cliente com o mesmo nome.
      // const clienteExistente = await clientes.findOne({ nomeCliente })

      // if(clienteExistente) {
      //   return res.status(400).send({
      //     message: `Existe um cliente com o nome ${nomeCliente}, tente outro.`
      //   })
      // }

      const Cliente = new clientes({
        nomeCliente: req.body.nomeCliente,
        telefoneCliente: req.body.telefoneCliente,
        emailCliente: req.body.emailCliente,
      });

      // Salva o cliente no banco de dados
      await Cliente.save();

      const Arquivo = new arquivos({
        nomeArquivo: req.file.originalname + Date.now(),
        arquivo: req.file.buffer,
        tipoArquivo: req.file.mimetype,
        cliente: Cliente._id,
      });

      // Salva o arquivo no banco de dados
      await Arquivo.save();

      const clienteArquivo = new clienteArquivosMD({
        cliente: Cliente._id,
        arquivo: Arquivo._id,
      });

      // Salva a relação entre cliente e arquivo no banco de dados
      await clienteArquivo.save();

      return res.status(201).send({
        message: `Arquivo e Cliente cadastrados com sucesso!`,
        nomeCliente: Cliente.nomeCliente,
        nomeArquivo: Arquivo.nomeArquivo,
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
        .populate([
          { path: "cliente" },
          { path: "arquivo", select: "nomeArquivo" },
        ])
        .exec();
  
      res.status(200).json(clienteArquivo);
    } catch (error) {
      res.status(400).send({
        message: `${error.message} - Erro ao ler a tabela clienteArquivo`,
      });
    }
  };

  static lerArquivosPorNomeCliente = async (req, res) => {
    try {
      const nomeCliente = req.params.nomeCliente;

      // Busca o cliente pelo nome
      const cliente = await clientes.findOne({ nomeCliente });

      if (!cliente) {
        return res.status(404).send({
          message: `Não foi encontrado nenhum cliente com o nome "${nomeCliente}".`,
        });
      }

      // Faz uma junção entre as coleções clientes, arquivos e clienteArquivos
      const result = await clienteArquivosMD.aggregate([
        {
          $lookup: {
            from: "clientes",
            localField: "cliente",
            foreignField: "_id",
            as: "cliente",
          },
        },
        {
          $unwind: "$cliente",
        },
        {
          $lookup: {
            from: "arquivos",
            localField: "arquivo",
            foreignField: "_id",
            as: "arquivo",
          },
        },
        {
          $unwind: "$arquivo",
        },
        {
          $match: {
            "cliente.nomeCliente": nomeCliente,
          },
        },
        {
          $project: {
            "cliente.nomeCliente": 1,
            "arquivo.nomeArquivo": 1,
            "arquivo.tipoArquivo": 1,
          },
        },
      ]);

      return res.status(200).send(result);
    } catch (error) {
      // Tratamento de erro
      return res.status(500).send({
        message: `${error.message} - Erro ao buscar os arquivos do cliente.`,
      });
    }
  };


  static deletarArquivosImpressos = async (req, res) => {
    try {
      // Busca todos os registros de clienteArquivos com impressoStatus = true
      const registrosImpressos = await clienteArquivosMD.find({ impressoStatus: true });

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
