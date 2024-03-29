import { CustomError, CustomErrorType } from '../../../utils/customError'
import { CPFVO } from '../../pagamento/model/value-objects/CPF'
import { EStatusPagamento } from '../../pagamento/model/value-objects/EStatusPagamento'
import { Produto } from './Produto'

export class Pedido {
  private readonly _CPF: CPFVO | null
  constructor (
    CPF: string | null,
    private _status: EStatusPagamento,
    readonly produtosPedido: Produto[],
    readonly codigo: number | null,
    readonly dataPedido: Date | null = null
  ) {
    this._CPF = CPF ? new CPFVO(CPF) : null
  }

  get status (): EStatusPagamento {
    return this._status
  }

  get CPF (): string | null {
    return this._CPF?.valor ?? null
  }

  get valorTotal (): number {
    return this.produtosPedido.reduce((soma, item) => soma + item.valor, 0)
  }

  atualizaStatus (novoStatus: EStatusPagamento): void {
    // o status só pode ser atualizado de forma sequencial
    if (novoStatus !== this._status + 1) {
      throw new CustomError(CustomErrorType.BusinessRuleViolation, 'O status indicado não é válido para esse pedido')
    }
    this._status = novoStatus
  }
}
