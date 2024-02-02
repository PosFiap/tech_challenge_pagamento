import { EStatusPagamento } from '../model/value-objects/EStatusPagamento'
import { Fatura } from '../model'

export interface IPagamentoRepositoryGateway {
  obtemFaturaPorCodigo(fatura_id: string): Promise<Fatura | null>
  atualizarStatusFatura(fatura_id: string, statusPagamento: EStatusPagamento): Promise<Fatura>
  criaFatura(codigo_fatura: string, codigo_pedido: number, valor: number, cpf_cliente: string | null): Promise<Fatura>
}
