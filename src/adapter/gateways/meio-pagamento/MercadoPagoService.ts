import { NonEmptyString } from '../../../modules/common/value-object/NonEmptyString'
import { checkoutQRCodeOutputTO } from '../../../modules/meio-pagamento/dto/checkoutQRCode.output.dto'
import { MeioPagamentoDTO } from '../../../modules/meio-pagamento/dto/meioPagamento.dto'
import { IMeioDePagamentoService } from '../../../modules/meio-pagamento/ports/IMeioDePagamento.service'
import { CustomError, CustomErrorType } from '../../../utils'
import { IHTTP } from '../common/IHTTP'

interface MercadoPagoFatura {
  external_reference: string
  title: string
  total_amount: number
  description: string
  notification_url: string
}

export class MercadoPagoService implements IMeioDePagamentoService {
  constructor (
    private readonly httpClient: IHTTP,
    private readonly idUsuarioMercadoPago: string,
    private readonly idExternoPontoDeVenda: string,
    private readonly accessToken: string,
    private readonly webhookURL: string
  ) {
    if (this.httpClient === null || this.httpClient === undefined) {
      throw new CustomError(CustomErrorType.InvalidInput, 'Falha ao utilizar módulo http')
    }

    if (!NonEmptyString.validate(this.idUsuarioMercadoPago)) {
      throw new CustomError(CustomErrorType.InvalidInput, 'O id de usuário deve ser válido')
    }

    if (!NonEmptyString.validate(this.accessToken)) {
      throw new CustomError(CustomErrorType.InvalidInput, 'O token de acesso deve ser válido')
    }

    if (!NonEmptyString.validate(this.idExternoPontoDeVenda)) {
      throw new CustomError(CustomErrorType.InvalidInput, 'O id externo de ponto de venda deve ser válido')
    }

    if (!NonEmptyString.validate(this.webhookURL)) {
      throw new CustomError(CustomErrorType.InvalidInput, 'A URL de retorno do meio de pagamento deve ser válida')
    }
  }

  private mapMeioPagamentoDTOParaMeioPagamentoFatura (inputData: MeioPagamentoDTO): MercadoPagoFatura {
    return {
      external_reference: `${inputData.codigo_pedido}`,
      total_amount: inputData.valor,
      description: inputData.descricao,
      title: inputData.titulo,
      notification_url: this.webhookURL
    }
  }

  // https://www.mercadopago.com.br/developers/en/reference/qr-dynamic/_instore_orders_qr_seller_collectors_user_id_pos_external_pos_id_qrs/post
  async checkoutQRCode (inputData: MeioPagamentoDTO): Promise<checkoutQRCodeOutputTO> {
    try {
      const fatura = this.mapMeioPagamentoDTOParaMeioPagamentoFatura(inputData)
      const response = await this.httpClient.request<{ qr_data: string, in_store_order_id: string }>({
        host: 'https://api.mercadopago.com',
        path: `/instore/orders/qr/seller/collectors/${this.idUsuarioMercadoPago}/pos/${this.idExternoPontoDeVenda}/qrs`,
        method: 'POST',
        headers: {
          Authorization: `Bearer ${this.accessToken}`
        },
        body: fatura
      })

      if (response.body) {
        return {
          codigo_fatura: response.body.in_store_order_id,
          QRCode: response.body.qr_data
        }
      } else {
        throw new CustomError(CustomErrorType.BusinessRuleViolation, 'Resposta da request sem conteúdo de dados')
      }
    } catch (error) {
      console.error(error)
      if (error instanceof CustomError) throw error
      throw new CustomError(CustomErrorType.ExternalUnknownError, 'Ocorreu um erro externo')
    }
  }
}
