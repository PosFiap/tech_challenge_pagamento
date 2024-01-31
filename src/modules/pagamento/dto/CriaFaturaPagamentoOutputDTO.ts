export class CriaFaturaPagamentoOutputDTO {
    constructor(
        readonly codigo_fatura: string,
        readonly data_criacao: Date,
        readonly data_atualizacao: Date,
        readonly situacao: string,
        readonly codigo_pedido: number,
        readonly cpf_cliente: string | null,
        readonly valor: number,
    ){}
}