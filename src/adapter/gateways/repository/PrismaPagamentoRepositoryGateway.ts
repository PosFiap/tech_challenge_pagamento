import { PrismaClient } from '@prisma/client'
import { IPagamentoRepositoryGateway } from '../../../modules/pagamento/ports/IPagamentoRegistryGateway'
import { CustomError, CustomErrorType } from '../../../utils'
import { EStatusPagamento } from '../../../modules/pagamento/model/value-objects/EStatusPagamento'
import { Fatura } from '../../../modules/pagamento/model'

export class PrismaPagamentoRepositoryGateway implements IPagamentoRepositoryGateway {
  private readonly prisma: PrismaClient

  constructor () {
    this.prisma = new PrismaClient()
  }

  async criaFatura (codigo_fatura: string, codigo_pedido: number, valor: number, cpf_cliente: string | null): Promise<Fatura> {
    const faturaInserida = await this.prisma.fatura.create({
      data: {
        codigo: codigo_fatura,
        situacao: EStatusPagamento['Aguardando Pagamento'],
        pedido_codigo: codigo_pedido,
        valor,
        cpf_cliente
      },
      select: {
        codigo: true,
        data_atualizacao: true,
        data_criacao: true,
        situacao: true,
        valor: true,
        cpf_cliente: true,
        pedido_codigo: true
      }
    })

    return new Fatura(
      faturaInserida.codigo,
      faturaInserida.situacao,
      faturaInserida.data_criacao,
      faturaInserida.data_atualizacao,
      faturaInserida.pedido_codigo,
      faturaInserida.valor,
      faturaInserida.cpf_cliente
    )
  }

  async obtemFaturaPorCodigo (fatura_id: string): Promise<Fatura | null> {
    const fatura = await this.prisma.fatura.findUnique({
      where: {
        codigo: fatura_id
      }
    })

    if (fatura === null) return null

    return new Fatura(
      fatura.codigo,
      fatura.situacao,
      fatura.data_criacao,
      fatura.data_atualizacao,
      fatura.pedido_codigo,
      fatura.valor,
      fatura.cpf_cliente
    )
  }

  async atualizarStatusFatura (fatura_id: string, statusPagamento: EStatusPagamento): Promise<Fatura> {
    try {
      const situacao = statusPagamento
      await this.prisma.fatura.update({
        data: {
          situacao
        },
        where: {
          codigo: fatura_id
        }
      })

      const result = await this.obtemFaturaPorCodigo(fatura_id)

      if (!result) { throw new CustomError(CustomErrorType.RepositoryDataNotFound, 'Fatura não encontrada!') }

      return result
    } catch (error) {
      console.error('Erro no atualizar status', error)
      throw error
    }
  }
}
