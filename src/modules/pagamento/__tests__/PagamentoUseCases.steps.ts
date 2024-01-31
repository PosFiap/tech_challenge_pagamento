import { defineFeature, loadFeature } from "jest-cucumber";
import { CriaFaturaPagamentoDTO } from "../dto/CriaFaturaPagamentoDTO";
import { IPagamentoRepositoryGateway, IPagamentoUseCases } from "../ports";
import { PagamentoUseCases } from "../PagamentoUseCases";
import { EStatusPagamento, Fatura } from "../model";
import { CriaFaturaPagamentoOutputDTO } from "../dto/CriaFaturaPagamentoOutputDTO";

const feature = loadFeature('./features/PagamentoUseCases.feature', {
    loadRelativePath: true
  });

defineFeature(feature, test => {
    const pagamentoUseCases: IPagamentoUseCases = new PagamentoUseCases();
    const criaFaturaPagamentoSpy = jest.spyOn(pagamentoUseCases, 'criaFaturaPagamento');
    const pagamentoRepositoryCriaFaturaMock = 
        jest.fn().mockImplementation((codigo_fatura: string, codigo_pedido: number, valor: number, cpf_cliente: string | null): Promise<Fatura> => {
            const data = new Date("2024-01-20T12:00:00.000Z");
            return Promise.resolve<Fatura>(new Fatura(
                codigo_fatura,
                EStatusPagamento["Aguardando Pagamento"],
                data,
                data,
                codigo_pedido,
                valor,
                cpf_cliente
            ));
        });

    const pagamentoRepositoryGateway: IPagamentoRepositoryGateway = {
        criaFatura: pagamentoRepositoryCriaFaturaMock,
        atualizarStatusFatura: jest.fn(),
        atualizarStatusPedidoPago: jest.fn(),
        obtemFaturaPorCodigo: jest.fn(),
        obterPedidoPeloCodigo: jest.fn()
    };

    let inputDTO: CriaFaturaPagamentoDTO | null;

    beforeAll(() => {
        inputDTO = null;
        pagamentoRepositoryCriaFaturaMock.mockClear();
        criaFaturaPagamentoSpy.mockClear();
    });

    test('Deve Criar Fatura', ({
        given,
        when,
        then
      }) => {
        given('dados de fatura', (docString) => {
            inputDTO = JSON.parse(docString) as CriaFaturaPagamentoDTO;
        });
      
        when('eles são validos e completos', async () => {
            await pagamentoUseCases.criaFaturaPagamento(
                inputDTO!,
                pagamentoRepositoryGateway
            );
        });
      
        then('uma fatura é registrada e retornada com status \'Aguardando Pagamento\'', async (docString) => {
            const outputDTO = JSON.parse(docString);
            outputDTO.data_criacao = new Date(outputDTO.data_criacao);
            outputDTO.data_atualizacao = new Date(outputDTO.data_atualizacao);
            const result = await criaFaturaPagamentoSpy.mock.results[0].value as CriaFaturaPagamentoOutputDTO;
            expect(pagamentoRepositoryCriaFaturaMock.mock.calls.length).toBe(1);
            expect(pagamentoRepositoryCriaFaturaMock.mock.lastCall).toStrictEqual(
                [inputDTO?.codigo_fatura, inputDTO?.codigo_pedido, inputDTO?.valor, inputDTO?.cpf_cliente]
            );
            expect(result.situacao).toBe(outputDTO.situacao);
            expect(result).toEqual(outputDTO);
        });
    });
    
    test('Deve Criar Fatura Sem CPF', ({
        given,
        when,
        then
    }) => {
        given('dados de fatura', (docString) => {
            inputDTO = JSON.parse(docString) as CriaFaturaPagamentoDTO;
        });
        
        when('eles são validos e não contém CPF', async () => {
            await pagamentoUseCases.criaFaturaPagamento(
                inputDTO!,
                pagamentoRepositoryGateway
            );
        });
        
        then('uma fatura é registrada e retornada com status \'Aguardando Pagamento\' e sem CPF', async (docString) => {
            const outputDTO = JSON.parse(docString);
            outputDTO.data_criacao = new Date(outputDTO.data_criacao);
            outputDTO.data_atualizacao = new Date(outputDTO.data_atualizacao);
            const result = await criaFaturaPagamentoSpy.mock.results[0].value as CriaFaturaPagamentoOutputDTO;
            expect(pagamentoRepositoryCriaFaturaMock.mock.calls.length).toBe(1);
            expect(pagamentoRepositoryCriaFaturaMock.mock.lastCall).toStrictEqual(
                [inputDTO?.codigo_fatura, inputDTO?.codigo_pedido, inputDTO?.valor, inputDTO?.cpf_cliente]
            );
            expect(result.situacao).toBe(outputDTO.situacao);
            expect(result.cpf_cliente).toBeNull();
            expect(result).toEqual(outputDTO);
        });
    });
    test('Deve Criar Fatura Com CPF Vazio', ({
    given,
    when,
    then
    }) => {
        given('dados de fatura', (docString) => {
            inputDTO = JSON.parse(docString) as CriaFaturaPagamentoDTO;
        });
        
        when('eles são validos e o CPF é vazio', async () => {
            await pagamentoUseCases.criaFaturaPagamento(
                inputDTO!,
                pagamentoRepositoryGateway
            );
        });
        
        then('uma fatura é registrada e retornada com status \'Aguardando Pagamento\' e sem CPF', async (docString) => {
            const outputDTO = JSON.parse(docString);
            outputDTO.data_criacao = new Date(outputDTO.data_criacao);
            outputDTO.data_atualizacao = new Date(outputDTO.data_atualizacao);
            const result = await criaFaturaPagamentoSpy.mock.results[0].value as CriaFaturaPagamentoOutputDTO;
            expect(pagamentoRepositoryCriaFaturaMock.mock.calls.length).toBe(1);
            expect(pagamentoRepositoryCriaFaturaMock.mock.lastCall).toStrictEqual(
                [inputDTO?.codigo_fatura, inputDTO?.codigo_pedido, inputDTO?.valor, inputDTO?.cpf_cliente]
            );
            expect(result.situacao).toBe(outputDTO.situacao);
            expect(result.cpf_cliente).toBeNull();
            expect(result).toEqual(outputDTO);
        });
    });

    test('Deve Criar Fatura Com CPF Null', ({
    given,
    when,
    then
    }) => {
        given('dados de fatura', (docString) => {
            inputDTO = JSON.parse(docString) as CriaFaturaPagamentoDTO;
        });
        
        when('eles são validos e o CPF é null', async () => {
            await pagamentoUseCases.criaFaturaPagamento(
                inputDTO!,
                pagamentoRepositoryGateway
            );
        });
        
        then('uma fatura é registrada e retornada com status \'Aguardando Pagamento\' e sem CPF', async (docString) => {
            const outputDTO = JSON.parse(docString);
            outputDTO.data_criacao = new Date(outputDTO.data_criacao);
            outputDTO.data_atualizacao = new Date(outputDTO.data_atualizacao);
            const result = await criaFaturaPagamentoSpy.mock.results[0].value as CriaFaturaPagamentoOutputDTO;
            expect(pagamentoRepositoryCriaFaturaMock.mock.calls.length).toBe(1);
            expect(pagamentoRepositoryCriaFaturaMock.mock.lastCall).toStrictEqual(
                [inputDTO?.codigo_fatura, inputDTO?.codigo_pedido, inputDTO?.valor, inputDTO?.cpf_cliente]
            );
            expect(result.situacao).toBe(outputDTO.situacao);
            expect(result.cpf_cliente).toBeNull();
            expect(result).toEqual(outputDTO);
        });
    });

    test('Deve Falhar Criar Fatura Sem Codigo Fatura', ({
        given,
        when,
        then
    }) => {
        given('dados de fatura', (docString) => {
            inputDTO = JSON.parse(docString) as CriaFaturaPagamentoDTO;
        });
        
        when('não há codigo de fatura', () => {
            expect(inputDTO?.codigo_fatura).toBeUndefined();
        });
        
        then('uma exceção de violação de parâmetro é retornada', async () => {
            await expect(
                pagamentoUseCases.criaFaturaPagamento(
                    inputDTO!,
                    pagamentoRepositoryGateway
                )
            ).rejects.toThrow("Código de fatura inválido");
        });
    });

    test('Deve Falhar Criar Fatura Com Codigo Fatura Vazio', ({
        given,
        when,
        then
    }) => {
        given('dados de fatura', (docString) => {
            inputDTO = JSON.parse(docString) as CriaFaturaPagamentoDTO;
        });
        
        when('código de fatura é vazio', () => {
            expect(inputDTO?.codigo_fatura).toBe("");
        });
        
        then('uma exceção de violação de parâmetro é retornada', async () => {
            await expect(
                pagamentoUseCases.criaFaturaPagamento(
                    inputDTO!,
                    pagamentoRepositoryGateway
                )
            ).rejects.toThrow("Código de fatura inválido");
        });
    });

    test('Deve Falhar Criar Fatura Com Codigo Fatura Null', ({
        given,
        when,
        then
    }) => {
        given('dados de fatura', (docString) => {
            inputDTO = JSON.parse(docString) as CriaFaturaPagamentoDTO;
        });
        
        when('código de fatura é null', () => {
            expect(inputDTO?.codigo_fatura).toBeNull()
        });
        
        then('uma exceção de violação de parâmetro é retornada', async () => {
            await expect(
                pagamentoUseCases.criaFaturaPagamento(
                    inputDTO!,
                    pagamentoRepositoryGateway
                )
            ).rejects.toThrow("Código de fatura inválido");
        });
    });

    test('Deve Falhar Criar Fatura Com Codigo Fatura Numérico', ({
    given,
    when,
    then
    }) => {
        given('dados de fatura', (docString) => {
            inputDTO = JSON.parse(docString) as CriaFaturaPagamentoDTO;
        });
        
        when('código de fatura é inválido', () => {
            expect(inputDTO?.codigo_fatura).toBe(0);
        });
        
        then('uma exceção de violação de parâmetro é retornada', async () => {
            await expect(
                pagamentoUseCases.criaFaturaPagamento(
                    inputDTO!,
                    pagamentoRepositoryGateway
                )
            ).rejects.toThrow("Código de fatura inválido");
        });
    });

    test('Deve Falhar Criar Fatura Com Codigo Fatura Boleano', ({
    given,
    when,
    then
    }) => {
        given('dados de fatura', (docString) => {
            inputDTO = JSON.parse(docString) as CriaFaturaPagamentoDTO;
        });
        
        when('código de fatura é inválido', () => {
            expect(inputDTO?.codigo_fatura).toBe(true);
        });
        
        then('uma exceção de violação de parâmetro é retornada', async () => {
            await expect(
                pagamentoUseCases.criaFaturaPagamento(
                    inputDTO!,
                    pagamentoRepositoryGateway
                )
            ).rejects.toThrow("Código de fatura inválido");
        });
    });
    test('Deve Falhar Criar Fatura Sem Codigo Pedido', ({
    given,
    when,
    then
    }) => {
        given('dados de fatura', (docString) => {
            inputDTO = JSON.parse(docString) as CriaFaturaPagamentoDTO;
        });
        
        when('não há codigo de pedido', () => {
            expect(inputDTO?.codigo_pedido).toBeUndefined();
        });
        
        then('uma exceção de violação de parâmetro é retornada', async () => {
            await expect(
                pagamentoUseCases.criaFaturaPagamento(
                    inputDTO!,
                    pagamentoRepositoryGateway
                )
            ).rejects.toThrow("Código de pedido inválido");
        });
    });
    test('Deve Falhar Criar Fatura Com Codigo Pedido Negativo', ({
    given,
    when,
    then
    }) => {
        given('dados de fatura', (docString) => {
            inputDTO = JSON.parse(docString) as CriaFaturaPagamentoDTO;
        });
        
        when('código de pedido é inválido', () => {
            expect(inputDTO?.codigo_pedido).toBe(-1);
        });
        
        then('uma exceção de violação de parâmetro é retornada', async () => {
            await expect(
                pagamentoUseCases.criaFaturaPagamento(
                    inputDTO!,
                    pagamentoRepositoryGateway
                )
            ).rejects.toThrow("Código de pedido inválido");
        });
    });
    test('Deve Falhar Criar Fatura Com Codigo Pedido Zero', ({
    given,
    when,
    then
    }) => {
        given('dados de fatura', (docString) => {
            inputDTO = JSON.parse(docString) as CriaFaturaPagamentoDTO;
        });
        
        when('código de pedido é inválido', () => {
            expect(inputDTO?.codigo_pedido).toBe(0);
        });
        
        then('uma exceção de violação de parâmetro é retornada', async () => {
            await expect(
                pagamentoUseCases.criaFaturaPagamento(
                    inputDTO!,
                    pagamentoRepositoryGateway
                )
            ).rejects.toThrow("Código de pedido inválido");
        });
    });

    test('Deve Falhar Criar Fatura Sem Valor', ({
    given,
    when,
    then
    }) => {
        given('dados de fatura', (docString) => {
                    inputDTO = JSON.parse(docString) as CriaFaturaPagamentoDTO;
        });
        
        when('não há valor', () => {
            expect(inputDTO?.valor).toBeUndefined();
        });
        
        then('uma exceção de violação de parâmetro é retornada', async () => {
            await expect(
                pagamentoUseCases.criaFaturaPagamento(
                    inputDTO!,
                    pagamentoRepositoryGateway
                )
            ).rejects.toThrow("Valor de fatura inválido");
        });
    });

    test('Deve Falhar Criar Fatura Com Valor Negativo', ({
    given,
    when,
    then
    }) => {
        given('dados de fatura', (docString) => {
            inputDTO = JSON.parse(docString) as CriaFaturaPagamentoDTO;
        });
        
        when('o valor é negativo', () => {
            expect(inputDTO?.valor).toBe(-1);
        });
        
        then('uma exceção de violação de parâmetro é retornada', async () => {
            await expect(
                pagamentoUseCases.criaFaturaPagamento(
                    inputDTO!,
                    pagamentoRepositoryGateway
                )
            ).rejects.toThrow("Valor de fatura inválido");
        });
    });

    test('Deve Falhar Criar Fatura Com CPF Inválido', ({
    given,
    when,
    then
    }) => {
        given('dados de fatura', (docString) => {
            inputDTO = JSON.parse(docString) as CriaFaturaPagamentoDTO;
        });
        
        when('o cpf_cliente é inválido', () => {
            expect(inputDTO?.cpf_cliente).toBe("08389960000");
        });
        
        then('uma exceção de violação de parâmetro é retornada', async () => {
            await expect(
                pagamentoUseCases.criaFaturaPagamento(
                    inputDTO!,
                    pagamentoRepositoryGateway
                )
            ).rejects.toThrow("CPF de cliente inválido");
        });
    });

});