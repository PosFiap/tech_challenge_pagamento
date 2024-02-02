import { FaturaIdentificadorVO } from "../model/value-objects/FaturaIdentificador";

export class ConfirmaPagamentoFaturaDTO {
    private _codigo_fatura: FaturaIdentificadorVO;
    constructor(
        codigo_fatura: string
    ){
        this._codigo_fatura = new FaturaIdentificadorVO(codigo_fatura);
    }

    get codigo_fatura() {
        return this._codigo_fatura.fatura_identificador;
    }
}