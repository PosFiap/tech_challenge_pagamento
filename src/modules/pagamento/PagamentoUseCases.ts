import { CustomError, CustomErrorType } from '../../utils'
import { ConfirmaPagamentoFaturaDTO, ConfirmaPagamentoFaturaOutputDTO, ObtemSituacaoPagamentoFaturaDTO, ObtemSituacaoPagamentoFaturaOutputDTO, RejeitaPagamentoFaturaOutputDTO } from './dto'
import { CriaFaturaPagamentoDTO } from './dto/CriaFaturaPagamentoDTO'
import { CriaFaturaPagamentoOutputDTO } from './dto/CriaFaturaPagamentoOutputDTO'
import { EStatusPagamento, Fatura, FaturaIdentificadorVO } from './model'
import { CPFVO } from './model/value-objects/CPF'
import { IPagamentoRepositoryGateway, IPagamentoUseCases } from './ports'

export class PagamentoUseCases implements IPagamentoUseCases {
  async confirmaPagamentoFatura (data: ConfirmaPagamentoFaturaDTO, pagamentoRepositoryGateway: IPagamentoRepositoryGateway): Promise<ConfirmaPagamentoFaturaOutputDTO> {
    throw new Error('Method not implemented.')
  }

  async rejeitaPagamentoFatura (data: ConfirmaPagamentoFaturaDTO, pagamentoRepositoryGateway: IPagamentoRepositoryGateway): Promise<RejeitaPagamentoFaturaOutputDTO> {
    throw new Error('Method not implemented.')
  }

  async obtemSituacaoPagamentoFatura (data: ObtemSituacaoPagamentoFaturaDTO, pagamentoRepositoryGateway: IPagamentoRepositoryGateway): Promise<ObtemSituacaoPagamentoFaturaOutputDTO> {
    throw new Error('Method not implemented.')
  }

  async criaFaturaPagamento (data: CriaFaturaPagamentoDTO, pagamentoRepositoryGateway: IPagamentoRepositoryGateway): Promise<CriaFaturaPagamentoOutputDTO> {
    const { codigo_pedido, cpf_cliente, valor, codigo_fatura } = data

    if (!FaturaIdentificadorVO.validaIdentificador(codigo_fatura)) {
      throw new CustomError(CustomErrorType.InvalidInput, 'Código de fatura inválido')
    }

    if (cpf_cliente !== null && cpf_cliente !== undefined && cpf_cliente !== '' && !CPFVO.validaCPF(cpf_cliente)) {
      throw new CustomError(CustomErrorType.InvalidInput, 'CPF de cliente inválido')
    }

    if (!Fatura.validaValor(valor)) {
      throw new CustomError(CustomErrorType.InvalidInput, 'Valor de fatura inválido')
    }

    if (!Fatura.validaCodigoPedido(codigo_pedido)) {
      throw new CustomError(CustomErrorType.InvalidInput, 'Código de pedido inválido')
    }

    const faturaCriada = await pagamentoRepositoryGateway.criaFatura(codigo_fatura, codigo_pedido, valor, cpf_cliente)

    return new CriaFaturaPagamentoOutputDTO(
      faturaCriada.codigo,
      faturaCriada.dataCriacao,
      faturaCriada.dataAtualizacao,
      EStatusPagamento[faturaCriada.situacao],
      faturaCriada.pedidoCodigo,
      faturaCriada.CPFCliente,
      faturaCriada.valor
    )
  }

  /* async obtemSituacaoPagamentoFatura(data: ObtemSituacaoPagamentoFaturaDTO, pagamentoRepositoryGateway: IPagamentoRepositoryGateway): Promise<ObtemSituacaoPagamentoFaturaOutputDTO> {
        const { fatura_id } = data;

        let fatura: Fatura = await pagamentoRepositoryGateway.obtemFaturaPorCodigo(fatura_id);

        if(!fatura) throw new CustomError(CustomErrorType.RepositoryDataNotFound, "Não existe a fatura informada");

        return new ObtemSituacaoPagamentoFaturaOutputDTO(
          fatura.codigo,
          fatura.dataCriacao,
          fatura.dataAtualizacao,
          fatura.status,
          fatura.pedido.codigo,
          fatura.pedido.CPF
        );
      }

      async confirmaPagamentoFatura(data: ConfirmaPagamentoFaturaDTO, pagamentoRepositoryGateway: IPagamentoRepositoryGateway): Promise<ConfirmaPagamentoFaturaOutputDTO> {
        const { fatura_id } = data;

        let fatura: Fatura = await pagamentoRepositoryGateway.obtemFaturaPorCodigo(fatura_id);

        if(!fatura) throw new CustomError(CustomErrorType.RepositoryDataNotFound, "Não existe a fatura informada");

        if(fatura.status !== EStatusPagamento['Aguardando Pagamento'])
          throw new CustomError(CustomErrorType.BusinessRuleViolation, "A fatura não aguarda pagamento");

        fatura = await pagamentoRepositoryGateway.atualizarStatusFatura(
          fatura_id,
          EStatusPagamento.Pago
        );

        return new ConfirmaPagamentoFaturaOutputDTO(
          fatura.codigo,
          fatura.dataCriacao,
          fatura.dataAtualizacao,
          fatura.status,
          fatura.pedido.codigo,
          fatura.pedido.CPF
        );
      }

      async rejeitaPagamentoFatura(data: ConfirmaPagamentoFaturaDTO, pagamentoRepositoryGateway: IPagamentoRepositoryGateway): Promise<ConfirmaPagamentoFaturaOutputDTO> {
        const { fatura_id } = data;

        let fatura: Fatura = await pagamentoRepositoryGateway.obtemFaturaPorCodigo(fatura_id);

        if(!fatura) throw new CustomError(CustomErrorType.RepositoryDataNotFound, "Não existe a fatura informada");

        if(fatura.status !== EStatusPagamento['Aguardando Pagamento'])
          throw new CustomError(CustomErrorType.BusinessRuleViolation, "A fatura não aguarda pagamento");

        fatura = await pagamentoRepositoryGateway.atualizarStatusFatura(
          fatura_id,
          EStatusPagamento.Rejeitado
        );

        return new ConfirmaPagamentoFaturaOutputDTO(
          fatura.codigo,
          fatura.dataCriacao,
          fatura.dataAtualizacao,
          fatura.status,
          fatura.pedido.codigo,
          fatura.pedido.CPF
        );
      } */
}
