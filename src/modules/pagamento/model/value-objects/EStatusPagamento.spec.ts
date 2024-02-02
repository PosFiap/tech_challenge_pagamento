import { EStatusPagamento } from './EStatusPagamento'

describe('EStatusPagamento', () => {
  let statusPagamento

  afterEach(() => {
    statusPagamento = null
  })

  it('deveRetornarAguardandoPagamento_se0', () => {
    statusPagamento = EStatusPagamento[0]
    expect(statusPagamento).toBe('Aguardando Pagamento')
  })

  it('deveRetornarPago_se1', () => {
    statusPagamento = EStatusPagamento[1]
    expect(statusPagamento).toBe('Pago')
  })

  it('deveRetornarRejeitado_se2', () => {
    statusPagamento = EStatusPagamento[2]
    expect(statusPagamento).toBe('Rejeitado')
  })
})
