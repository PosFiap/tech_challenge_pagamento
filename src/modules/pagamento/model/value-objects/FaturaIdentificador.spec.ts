import { afterEach } from "node:test";
import { FaturaIdentificadorVO } from "./FaturaIdentificador";
import { CustomError, CustomErrorType } from "../../../../utils";

describe("FaturaIdentificador", () => {
    let faturaIdentificador;

    afterEach(() => {
        faturaIdentificador = null;
    })

    it("deveCriarFaturaIdentificador", () =>{
        faturaIdentificador = new FaturaIdentificadorVO("key");
        expect(faturaIdentificador).not.toBeNull();
        expect(faturaIdentificador.fatura_identificador).toBe("key");
    });

    it("deveFalharCriarFaturaIdentificador_identificadorVazio", () =>{
        expect(() => {
            faturaIdentificador = new FaturaIdentificadorVO("");
        }).toThrow(new CustomError(CustomErrorType.EntityViolation, 'Identificador de fatura inválido'))
    });

    it("deveFalharCriarFaturaIdentificador_identificadorNumeral", () =>{
        expect(() => {
            //@ts-ignore
            faturaIdentificador = new FaturaIdentificadorVO(0);
        }).toThrow(new CustomError(CustomErrorType.EntityViolation, 'Identificador de fatura inválido'))
    });

    it("deveFalharCriarFaturaIdentificador_identificadorBooleano", () =>{
        expect(() => {
            //@ts-ignore
            faturaIdentificador = new FaturaIdentificadorVO(true);
        }).toThrow(new CustomError(CustomErrorType.EntityViolation, 'Identificador de fatura inválido'))
    });
});