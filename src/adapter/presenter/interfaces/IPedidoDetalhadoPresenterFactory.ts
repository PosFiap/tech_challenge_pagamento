import { EStatus } from '../../../modules/pagamento/model/value-objects/EStatus';
import { IPedidoDetalhadoPresenter, IProdutoPedidoDetalhadoPresenter } from './IPedidoDetalhadoPresenter';

export interface IPedidoDetalhadoPresenterFactory {
  create(
    status: EStatus,
    codigoPedido: number,
    itensPedido: Array<IProdutoPedidoDetalhadoPresenter>,
    dataPedido: Date,
    CPFCliente?: string,
    codigoFatura?: string,
  ): IPedidoDetalhadoPresenter
}