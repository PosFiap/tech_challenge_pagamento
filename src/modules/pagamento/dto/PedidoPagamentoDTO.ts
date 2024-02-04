import { EStatusPagamento } from '../model'

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
