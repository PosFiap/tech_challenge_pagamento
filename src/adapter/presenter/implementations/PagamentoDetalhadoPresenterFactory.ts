import { EStatusPagamento } from '../../../modules/pagamento/model/value-objects/EStatusPagamento'
import { IPagamentoDetalhadoPresenter } from '../interfaces/IPagamentoDetalhadoPresenter'
import { IPagamentoDetalhadoPresenterFactory } from '../interfaces/IPagamentoDetalhadoPresenterFactory'
import { PagamentoDetalhadoPresenterJSON } from './PagamentoDetalhadoPresenterJSON'

export abstract class PagamentoDetalhadoPresenterFactory implements IPagamentoDetalhadoPresenterFactory {
  // Criada apenas por limitação da linguagem que não reconhece classes estáticas e pede implementação
  create (
    _codigoPedido: number,
    _codigoFatura: string,
    _situacao: EStatusPagamento,
    _dataCriacao: Date,
    _dataAtualizacao: Date,
    _CPFCliente: string | null
  ): IPagamentoDetalhadoPresenter {
    throw new Error('Method not implemented.')
  }

  static create (
    codigoPedido: number,
    codigoFatura: string,
    situacao: EStatusPagamento,
    dataCriacao: Date,
    dataAtualizacao: Date,
    CPFCliente: string | null
  ): IPagamentoDetalhadoPresenter {
    return new PagamentoDetalhadoPresenterJSON(
      codigoPedido,
      codigoFatura,
      situacao,
      dataCriacao,
      dataAtualizacao,
      CPFCliente
    )
  }
}
