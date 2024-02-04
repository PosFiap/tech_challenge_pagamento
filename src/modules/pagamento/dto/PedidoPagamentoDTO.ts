import { EStatusPagamento } from '../model/value-objects/EStatusPagamento'

interface ItemDePedido {
  codigo: number
  nome: string
  descricao: string
  valor: number
  categoria_codigo: number
}

export interface PedidoPagamentoDTO {
  codigo: number
  status: EStatusPagamento
  itensDePedido: ItemDePedido[]
}
