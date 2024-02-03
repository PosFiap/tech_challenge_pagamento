import { checkoutQRCodeOutputTO } from '../dto/checkoutQRCode.output.dto'
import { MeioPagamentoDTO } from '../dto/meioPagamento.dto'

export interface IMeioDePagamentoService {
  checkoutQRCode(inputData: MeioPagamentoDTO): Promise<checkoutQRCodeOutputTO>
}
