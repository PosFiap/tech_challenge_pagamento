import { Router } from 'express'
import { PagamentoHttp } from '../../adapter/http/PagamentoHTTP'
import { PagamentoQrCodeController } from '../../adapter/controller/PagamentoQrCodeController'
import { PrismaPagamentoRepositoryGateway } from '../../adapter/gateways/repository/PrismaPagamentoRepositoryGateway'

const router: Router = Router()

const pagamentoHttp = new PagamentoHttp(
  PagamentoQrCodeController.create(),
  new PrismaPagamentoRepositoryGateway()
)

router.use('/health', (_req, res) => res.sendStatus(200))
router.use('/pagamento', pagamentoHttp.getRouter())

export { router }
