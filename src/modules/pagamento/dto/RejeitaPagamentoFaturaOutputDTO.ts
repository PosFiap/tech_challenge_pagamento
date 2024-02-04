import { EStatusPagamento } from '../../pagamento/model'

export class RejeitaPagamentoFaturaOutputDTO {
  constructor (
    readonly fatura_id: string,
    readonly data_criacao: Date,
    readonly data_atualizacao: Date,
    readonly situacao: EStatusPagamento,
    readonly pedido_codigo: number,
    readonly pedido_cpf: string | null
  ) {}
}
