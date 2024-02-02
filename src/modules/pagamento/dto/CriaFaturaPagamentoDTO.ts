export class CriaFaturaPagamentoDTO {
  constructor (
    readonly codigo_fatura: string,
    readonly cpf_cliente: string | null,
    readonly codigo_pedido: number,
    readonly valor: number
  ) { }
}
