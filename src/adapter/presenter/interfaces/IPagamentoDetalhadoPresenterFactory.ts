import { EStatusPagamento } from '../../../modules/pagamento/model/value-objects/EStatusPagamento'
import { IPagamentoDetalhadoPresenter } from './IPagamentoDetalhadoPresenter'

export interface IPagamentoDetalhadoPresenterFactory {
  create(
    codigoPedido: number,
    codigoFatura: string,
    situacao: EStatusPagamento,
    dataCriacao: Date,
    dataAtualizacao: Date,
    CPFCliente: string | null
  ): IPagamentoDetalhadoPresenter
}
