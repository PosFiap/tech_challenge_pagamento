export class ConfirmaPagamentoFaturaOutputDTO {
    constructor(
        readonly fatura_id: string,
        readonly data_criacao: Date,
        readonly data_atualizacao: Date,
        readonly situacao: string,
        readonly pedido_codigo: number,
        readonly pedido_cpf: string | null,
    ){}
}