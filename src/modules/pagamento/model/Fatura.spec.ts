import { CustomError, CustomErrorType } from "../../../utils";
import { Fatura } from "./Fatura";
import { EStatusPagamento } from "./value-objects/EStatusPagamento";

describe("Fatura", () => {
    let fatura;

    afterEach(() => {
        fatura = null;
    });

    it("deveCriarFatura", () => {
        const dateNow = new Date();
        fatura = new Fatura(
            "AABC",
            EStatusPagamento["Aguardando Pagamento"],
            dateNow,
            dateNow,
            1,
            15.0,
            "08389960001"
        )

        expect(fatura.codigo).toBe("AABC");
        expect(fatura.situacao).toBe(0);
        expect(fatura.dataCriacao).toBe(dateNow);
        expect(fatura.dataAtualizacao).toBe(dateNow);
        expect(fatura.pedidoCodigo).toBe(1);
        expect(fatura.valor).toBe(15);
        expect(fatura.CPFCliente).toBe("08389960001");
    });

    it("deveCriarFatura_valorIgualZero", () => {
        const dateNow = new Date();
        fatura = new Fatura(
            "AABC",
            EStatusPagamento["Aguardando Pagamento"],
            dateNow,
            dateNow,
            1,
            0,
            "08389960001"
        )

        expect(fatura.codigo).toBe("AABC");
        expect(fatura.situacao).toBe(0);
        expect(fatura.dataCriacao).toBe(dateNow);
        expect(fatura.dataAtualizacao).toBe(dateNow);
        expect(fatura.pedidoCodigo).toBe(1);
        expect(fatura.valor).toBe(0);
        expect(fatura.CPFCliente).toBe("08389960001");
    });

    it("deveCriarFatura_semCPF", () => {
        const dateNow = new Date();
        fatura = new Fatura(
            "AABC",
            EStatusPagamento["Aguardando Pagamento"],
            dateNow,
            dateNow,
            1,
            15.0,
            null
        )

        expect(fatura.codigo).toBe("AABC");
        expect(fatura.situacao).toBe(0);
        expect(fatura.dataCriacao).toBe(dateNow);
        expect(fatura.dataAtualizacao).toBe(dateNow);
        expect(fatura.pedidoCodigo).toBe(1);
        expect(fatura.valor).toBe(15);
        expect(fatura.CPFCliente).toBe(null);
    });

    it("deveCriarFatura_CPFVazio", () => {
        const dateNow = new Date();
        fatura = new Fatura(
            "AABC",
            EStatusPagamento["Aguardando Pagamento"],
            dateNow,
            dateNow,
            1,
            15.0,
            ""
        )

        expect(fatura.codigo).toBe("AABC");
        expect(fatura.situacao).toBe(0);
        expect(fatura.dataCriacao).toBe(dateNow);
        expect(fatura.dataAtualizacao).toBe(dateNow);
        expect(fatura.pedidoCodigo).toBe(1);
        expect(fatura.valor).toBe(15);
        expect(fatura.CPFCliente).toBe(null);
    });
    
    it("deveFalharCriarFatura_CPFInvalido", () => {
        const dateNow = new Date();
        expect(() => {
            fatura = new Fatura(
                "AABC",
                EStatusPagamento["Aguardando Pagamento"],
                dateNow,
                dateNow,
                1,
                15.0,
                "12345678910"
            )
        }).toThrow(new CustomError(CustomErrorType.InvalidInput, 'CPF inválido'));
    });

    it("deveFalharCriarFatura_CPF10Digitos", () => {
        const dateNow = new Date();
        expect(() => {
            fatura = new Fatura(
                "AABC",
                EStatusPagamento["Aguardando Pagamento"],
                dateNow,
                dateNow,
                1,
                15.0,
                "1234567891"
            )
        }).toThrow(new CustomError(CustomErrorType.InvalidInput, 'CPF inválido'));
    });

    it("deveFalharCriarFatura_codigoInvalido", () => {
        const dateNow = new Date();
        
        expect(() => {
            fatura = new Fatura(
                "",
                EStatusPagamento["Aguardando Pagamento"],
                dateNow,
                dateNow,
                1,
                15.0,
                null
            )
        }).toThrow(new CustomError(CustomErrorType.EntityViolation, 'Identificador de fatura inválido'))
    });

    it("deveFalharCriarFatura_codigoNaoString", () => {
        const dateNow = new Date();
        
        expect(() => {
            fatura = new Fatura(
                //@ts-ignore
                0,
                EStatusPagamento["Aguardando Pagamento"],
                dateNow,
                dateNow,
                1,
                15.0,
                null
            )
        }).toThrow(new CustomError(CustomErrorType.EntityViolation, 'Identificador de fatura inválido'))
    });

    it("deveFalharCriarFatura_valorMenorQueZero", () => {
        const dateNow = new Date();
        
        expect(() => {
            fatura = new Fatura(
                "AABC",
                EStatusPagamento["Aguardando Pagamento"],
                dateNow,
                dateNow,
                1,
                -1,
                "08389960001"
            )
        }).toThrow(new CustomError(CustomErrorType.EntityViolation, 'Valor menor que zero'))
    });
})