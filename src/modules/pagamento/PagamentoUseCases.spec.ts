import { IPagamentoRepositoryGateway } from './ports'
import { PagamentoUseCases } from './PagamentoUseCases'
import { CriaFaturaPagamentoDTO } from './dto/CriaFaturaPagamentoDTO'

describe('PagamentoUseCase', () => {
  const pagamentoUseCases = new PagamentoUseCases()
  let pagamentoRepositoryGateway: IPagamentoRepositoryGateway

  beforeAll(() => {
    pagamentoRepositoryGateway = {
      criaFatura: jest.fn(),
      atualizarStatusFatura: jest.fn(),
      obtemFaturaPorCodigo: jest.fn()
    }
  })

  it('deveCriarFatura', async () => {
    const input: CriaFaturaPagamentoDTO = {
      codigo_fatura: 'ABCD',
      codigo_pedido: 1,
      valor: 15,
      cpf_cliente: '08389960001'
    }

    await pagamentoUseCases.criaFaturaPagamento(input, pagamentoRepositoryGateway)
  })
})
