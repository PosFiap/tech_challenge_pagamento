import { CustomError, CustomErrorType } from '../../../utils'
import { CPFVO } from './value-objects/CPF'
import { EStatusPagamento } from './value-objects/EStatusPagamento'
import { FaturaIdentificadorVO } from './value-objects/FaturaIdentificador'

export class Fatura {
  private readonly _codigo: FaturaIdentificadorVO
  private readonly _cpf: CPFVO | null

  constructor (
    codigo: string,
    readonly situacao: EStatusPagamento,
    readonly dataCriacao: Date,
    readonly dataAtualizacao: Date,
    readonly pedidoCodigo: number,
    readonly valor: number,
    cpfCliente: string | null
  ) {
    this._codigo = new FaturaIdentificadorVO(codigo)
    this._cpf = cpfCliente ? new CPFVO(cpfCliente) : null
    if (!Fatura.validaValor(this.valor)) {
      throw new CustomError(CustomErrorType.EntityViolation, 'Valor inválido')
    };
    if (!Fatura.validaCodigoPedido(pedidoCodigo)) {
      throw new CustomError(CustomErrorType.EntityViolation, 'Código de pedido inválido')
    }
  }

  public static validaCodigoPedido (codigoPedido: number) {
    if (codigoPedido === null || codigoPedido === undefined || codigoPedido <= 0) {
      return false
    }
    return true
  }

  public static validaValor (valor: number) {
    if (valor === null || valor === undefined || valor < 0) {
      return false
    }
    return true
  }

  get codigo () {
    return this._codigo.fatura_identificador
  }

  get CPFCliente () {
    return this._cpf?.valor ?? null
  }
}
