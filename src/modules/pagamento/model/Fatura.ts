import { CPFVO } from "./value-objects/CPF";
import { EStatusPagamento } from "./value-objects/EStatusPagamento";
import { FaturaIdentificadorVO } from "./value-objects/FaturaIdentificador";

export class Fatura {
    private _codigo: FaturaIdentificadorVO;
    private _cpf: CPFVO | null;

    constructor(
        codigo: string,
        readonly situacao: EStatusPagamento,
        readonly dataCriacao: Date,
        readonly dataAtualizacao: Date,
        readonly pedidoCodigo: number,
        readonly valor: number,
        cpfCliente: string | null
    ) {
        this._codigo = new FaturaIdentificadorVO(codigo);
        this._cpf = cpfCliente ? new CPFVO(cpfCliente) : null;
    }

    get codigo() {
        return this._codigo.fatura_identificador;
    }

    get CPFCliente() {
        return this._cpf?.valor ||  null;
    }
}