import { defineFeature, loadFeature } from 'jest-cucumber'
import { HTTPRequest, HTTPResponse, IHTTP } from '../../common/IHTTP'
import { MercadoPagoService } from '../MercadoPagoService'
import { IMeioDePagamentoService } from '../../../../modules/meio-pagamento/ports/IMeioDePagamento.service'
import { HTTPClient } from '../../../infra/HTTPClient'
import { MeioPagamentoDTO } from '../../../../modules/meio-pagamento/dto/meioPagamento.dto'

const feature = loadFeature('./MeioDePagamentoService.feature', {
  loadRelativePath: true,
  scenarioNameTemplate (vars) {
    return `${vars.scenarioTitle} - Mercado Pago`
  }
})

defineFeature(feature, test => {
  const httpClient = new HTTPClient()
  const httpClientRequestSpy = jest.spyOn(httpClient, 'request').mockImplementation(
    async (config: HTTPRequest): Promise<HTTPResponse<{ qr_data: string, in_store_order_id: string }>> => {
      return Promise.resolve({
        statusCode: 200,
        body: {
          qr_data: 'ABCD',
          in_store_order_id: `PAG-${config.body.external_reference as number}`
        }
      })
    }
  )
  let meioDePagamentoMercadoPago: IMeioDePagamentoService | null = null
  let meioDePagamentoInput: {
    httpClient: IHTTP | null
    idUsuarioMercadoPago: string | null
    idExternoPontoDeVenda: string | null
    accessToken: string | null
    webhookURL: string | null
  } = {
    accessToken: null,
    httpClient: null,
    idExternoPontoDeVenda: null,
    idUsuarioMercadoPago: null,
    webhookURL: null
  }
  let meioDePagamentoQrCodeDTO: MeioPagamentoDTO | null

  beforeEach(() => {
    httpClientRequestSpy.mockClear()
    meioDePagamentoMercadoPago = null
    meioDePagamentoInput = {
      accessToken: 'token',
      idExternoPontoDeVenda: 'userId',
      idUsuarioMercadoPago: 'userMP',
      webhookURL: 'https://localhost:8080/',
      httpClient
    }
    meioDePagamentoQrCodeDTO = null
  })
  test('Deve Validar Instancia', ({
    given,
    when,
    then
  }) => {
    given('parâmetros válidos', () => {
      expect(meioDePagamentoInput.accessToken).toBe('token')
      expect(meioDePagamentoInput.idExternoPontoDeVenda).toBe('userId')
      expect(meioDePagamentoInput.idUsuarioMercadoPago).toBe('userMP')
      expect(meioDePagamentoInput.webhookURL).toBe('https://localhost:8080/')
      expect(meioDePagamentoInput.httpClient).toBeInstanceOf(HTTPClient)
    })

    when('instanciar um MeioDePagamentoService', () => {
      meioDePagamentoMercadoPago = new MercadoPagoService(
        meioDePagamentoInput.httpClient!,
        meioDePagamentoInput.idUsuarioMercadoPago!,
        meioDePagamentoInput.idExternoPontoDeVenda!,
        meioDePagamentoInput.accessToken!,
        meioDePagamentoInput.webhookURL!
      )
    })

    then('deve retornar um objeto MeioDePagamentoService válido', () => {
      expect(meioDePagamentoMercadoPago).not.toBeNull()
    })
  })

  test('Deve Gerar Fatura QR Code', ({
    given,
    when,
    then
  }) => {
    given('um meio de pagamento válido instanciado', () => {
      meioDePagamentoMercadoPago = new MercadoPagoService(
        meioDePagamentoInput.httpClient!,
        meioDePagamentoInput.idUsuarioMercadoPago!,
        meioDePagamentoInput.idExternoPontoDeVenda!,
        meioDePagamentoInput.accessToken!,
        meioDePagamentoInput.webhookURL!
      )
    })

    when('informações de um pedido são repassadas', () => {
      meioDePagamentoQrCodeDTO = {
        codigo_pedido: 1,
        descricao: 'Descricao Pedido',
        titulo: 'Título',
        valor: 15
      }
    })

    then('uma invoice com código de fatura e QRCode é gerada', async () => {
      const result = await meioDePagamentoMercadoPago?.checkoutQRCode(meioDePagamentoQrCodeDTO!)
      const httpClientRequestSpyMockResult = await httpClientRequestSpy.mock.results[0].value
      expect(result?.codigo_fatura).toBe(`PAG-${meioDePagamentoQrCodeDTO!.codigo_pedido}`)
      expect(result?.QRCode).toBe('ABCD')
      expect(httpClientRequestSpyMockResult.body.in_store_order_id).toBe(result?.codigo_fatura)
      expect(httpClientRequestSpyMockResult.body.qr_data).toBe(result?.QRCode)
    })
  })

  test('Deve Falhar ao Gerar Fatura QR Code', ({
    given,
    when,
    then
  }) => {
    given('um meio de pagamento válido instanciado', () => {
      meioDePagamentoMercadoPago = new MercadoPagoService(
        meioDePagamentoInput.httpClient!,
        meioDePagamentoInput.idUsuarioMercadoPago!,
        meioDePagamentoInput.idExternoPontoDeVenda!,
        meioDePagamentoInput.accessToken!,
        meioDePagamentoInput.webhookURL!
      )
    })

    when('ocorre uma erro na chama ao serviço externo', () => {
      httpClientRequestSpy.mockRejectedValueOnce(new Error())
      meioDePagamentoQrCodeDTO = {
        codigo_pedido: 1,
        descricao: 'Descricao Pedido',
        titulo: 'Título',
        valor: 15
      }
    })

    then('uma exceção é gerada', async () => {
      await expect(
        meioDePagamentoMercadoPago?.checkoutQRCode(meioDePagamentoQrCodeDTO!)
      ).rejects.toThrow('Ocorreu um erro externo')
    })
  })

  test('Deve Falhar ao Gerar Fatura QR Code Por Erro HTTP', ({
    given,
    when,
    then
  }) => {
    given('um meio de pagamento válido instanciado', () => {
      meioDePagamentoMercadoPago = new MercadoPagoService(
        meioDePagamentoInput.httpClient!,
        meioDePagamentoInput.idUsuarioMercadoPago!,
        meioDePagamentoInput.idExternoPontoDeVenda!,
        meioDePagamentoInput.accessToken!,
        meioDePagamentoInput.webhookURL!
      )
    })

    when('a chamada ao serviço externo não retorna um corpo com resultado', () => {
      httpClientRequestSpy.mockResolvedValueOnce({ statusCode: 200, body: undefined })
      meioDePagamentoQrCodeDTO = {
        codigo_pedido: 1,
        descricao: 'Descricao Pedido',
        titulo: 'Título',
        valor: 15
      }
    })

    then('uma exceção é gerada', async () => {
      await expect(
        meioDePagamentoMercadoPago?.checkoutQRCode(meioDePagamentoQrCodeDTO!)
      ).rejects.toThrow('Resposta da request sem conteúdo de dados')
    })
  })

  test('Deve Falhar ao Validar Instancia Sem Webhook', ({
    given,
    when,
    then
  }) => {
    let instanciaMercadoPagoFn: () => Promise<any> = async () => Promise.resolve()
    given('parâmetros com webhook inválido', () => {
      meioDePagamentoInput.webhookURL = ''
      expect(meioDePagamentoInput.accessToken).toBe('token')
      expect(meioDePagamentoInput.idExternoPontoDeVenda).toBe('userId')
      expect(meioDePagamentoInput.idUsuarioMercadoPago).toBe('userMP')
      expect(meioDePagamentoInput.webhookURL).toBe('')
      expect(meioDePagamentoInput.httpClient).toBeInstanceOf(HTTPClient)
    })

    when('instanciar um MeioDePagamentoService', () => {
      instanciaMercadoPagoFn = async () => new MercadoPagoService(
        meioDePagamentoInput.httpClient!,
        meioDePagamentoInput.idUsuarioMercadoPago!,
        meioDePagamentoInput.idExternoPontoDeVenda!,
        meioDePagamentoInput.accessToken!,
        meioDePagamentoInput.webhookURL!
      )
    })

    then('deve lançar uma exceção', async () => {
      await expect(
        instanciaMercadoPagoFn()
      ).rejects.toThrow('A URL de retorno do meio de pagamento deve ser válida')
    })

    test('Deve Falhar ao Validar Instancia sem Id De Ponto Externo', ({
      given,
      when,
      then
    }) => {
      given('parâmetros com id de ponto externo inválido', () => {
        meioDePagamentoInput.idExternoPontoDeVenda = ''
        expect(meioDePagamentoInput.accessToken).toBe('token')
        expect(meioDePagamentoInput.idExternoPontoDeVenda).toBe('')
        expect(meioDePagamentoInput.idUsuarioMercadoPago).toBe('userMP')
        expect(meioDePagamentoInput.webhookURL).toBe('https://localhost:8080/')
        expect(meioDePagamentoInput.httpClient).toBeInstanceOf(HTTPClient)
      })

      when('instanciar um MeioDePagamentoService', () => {
        instanciaMercadoPagoFn = async () => new MercadoPagoService(
          meioDePagamentoInput.httpClient!,
          meioDePagamentoInput.idUsuarioMercadoPago!,
          meioDePagamentoInput.idExternoPontoDeVenda!,
          meioDePagamentoInput.accessToken!,
          meioDePagamentoInput.webhookURL!
        )
      })

      then('deve lançar uma exceção', async () => {
        await expect(
          instanciaMercadoPagoFn()
        ).rejects.toThrow('O id externo de ponto de venda deve ser válido')
      })
    })

    test('Deve Falhar ao Validar Instancia sem Id De Usuário Mercado Pago', ({
      given,
      when,
      then
    }) => {
      given('parâmetros com id usuário mercado pago inválido', () => {
        meioDePagamentoInput.idUsuarioMercadoPago = ''
        expect(meioDePagamentoInput.accessToken).toBe('token')
        expect(meioDePagamentoInput.idExternoPontoDeVenda).toBe('userId')
        expect(meioDePagamentoInput.idUsuarioMercadoPago).toBe('')
        expect(meioDePagamentoInput.webhookURL).toBe('https://localhost:8080/')
        expect(meioDePagamentoInput.httpClient).toBeInstanceOf(HTTPClient)
      })

      when('instanciar um MeioDePagamentoService', () => {
        instanciaMercadoPagoFn = async () => new MercadoPagoService(
          meioDePagamentoInput.httpClient!,
          meioDePagamentoInput.idUsuarioMercadoPago!,
          meioDePagamentoInput.idExternoPontoDeVenda!,
          meioDePagamentoInput.accessToken!,
          meioDePagamentoInput.webhookURL!
        )
      })

      then('deve lançar uma exceção', async () => {
        await expect(
          instanciaMercadoPagoFn()
        ).rejects.toThrow('O id de usuário deve ser válido')
      })
    })

    test('Deve Falhar ao Validar Instancia sem Token de Acesso', ({
      given,
      when,
      then
    }) => {
      given('parâmetros com token de acesso inválido', () => {
        meioDePagamentoInput.accessToken = ''
        expect(meioDePagamentoInput.accessToken).toBe('')
        expect(meioDePagamentoInput.idExternoPontoDeVenda).toBe('userId')
        expect(meioDePagamentoInput.idUsuarioMercadoPago).toBe('userMP')
        expect(meioDePagamentoInput.webhookURL).toBe('https://localhost:8080/')
        expect(meioDePagamentoInput.httpClient).toBeInstanceOf(HTTPClient)
      })

      when('instanciar um MeioDePagamentoService', () => {
        instanciaMercadoPagoFn = async () => new MercadoPagoService(
          meioDePagamentoInput.httpClient!,
          meioDePagamentoInput.idUsuarioMercadoPago!,
          meioDePagamentoInput.idExternoPontoDeVenda!,
          meioDePagamentoInput.accessToken!,
          meioDePagamentoInput.webhookURL!
        )
      })

      then('deve lançar uma exceção', async () => {
        await expect(
          instanciaMercadoPagoFn()
        ).rejects.toThrow('O token de acesso deve ser válido')
      })
    })

    test('Deve Falhar ao Validar Instancia sem módulo HTTP', ({
      given,
      when,
      then
    }) => {
      given('parâmetros com módulo HTTP inválido', () => {
        meioDePagamentoInput.httpClient = null
        expect(meioDePagamentoInput.accessToken).toBe('token')
        expect(meioDePagamentoInput.idExternoPontoDeVenda).toBe('userId')
        expect(meioDePagamentoInput.idUsuarioMercadoPago).toBe('userMP')
        expect(meioDePagamentoInput.webhookURL).toBe('https://localhost:8080/')
        expect(meioDePagamentoInput.httpClient).toBeNull()
      })

      when('instanciar um MeioDePagamentoService', () => {
        instanciaMercadoPagoFn = async () => new MercadoPagoService(
          meioDePagamentoInput.httpClient!,
          meioDePagamentoInput.idUsuarioMercadoPago!,
          meioDePagamentoInput.idExternoPontoDeVenda!,
          meioDePagamentoInput.accessToken!,
          meioDePagamentoInput.webhookURL!
        )
      })

      then('deve lançar uma exceção', async () => {
        await expect(
          instanciaMercadoPagoFn()
        ).rejects.toThrow('Falha ao utilizar módulo http')
      })
    })
  })
})
