import { EStatusPagamento } from '../../../modules/pagamento/model/value-objects/EStatusPagamento'
import { IPagamentoDetalhadoPresenter } from '../interfaces/IPagamentoDetalhadoPresenter'

export abstract class PagamentoDetalhadoPresenter implements IPagamentoDetalhadoPresenter {
  constructor (
    readonly codigoPedido: number,
    readonly codigoFatura: string,
    readonly statusPagamento: EStatusPagamento,
    readonly dataCriacao: Date,
    readonly dataAtualizacao: Date,
    readonly CPFCliente: string | null = null
  ) {}

  abstract format (): Object
}
