import { IPagamentoRepositoryGateway } from "./ports";
import { PagamentoUseCases } from "./PagamentoUseCases";
import { CriaFaturaPagamentoDTO } from "./dto/CriaFaturaPagamentoDTO";

describe("PagamentoUseCase", () => {
    const pagamentoUseCases = new PagamentoUseCases();
    let pagamentoRepositoryGateway: IPagamentoRepositoryGateway;

    beforeAll(() => {
        pagamentoRepositoryGateway = {
            criaFatura: jest.fn(),
            atualizarStatusFatura: jest.fn(),
            atualizarStatusPedidoPago: jest.fn(),
            obtemFaturaPorCodigo: jest.fn(),
            obterPedidoPeloCodigo: jest.fn()
        }
    });

    it("deveCriarFatura", () => {
        const input: CriaFaturaPagamentoDTO = {
            codigo_fatura: "ABCD",
            codigo_pedido: 1,
            valor: 15,
            CPF_cliente: "08389960001"
        };

        pagamentoUseCases.criaFaturaPagamento(input, pagamentoRepositoryGateway);
    });
});