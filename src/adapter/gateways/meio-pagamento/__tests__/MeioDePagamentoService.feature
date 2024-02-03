Feature: MeioDePagamentoService

    Scenario: Deve Validar Instancia
        Given parâmetros válidos
        When instanciar um MeioDePagamentoService
        Then deve retornar um objeto MeioDePagamentoService válido

    Scenario: Deve Gerar Fatura QR Code
        Given um meio de pagamento válido instanciado
        When informações de um pedido são repassadas
        Then uma invoice com código de fatura e QRCode é gerada

    Scenario: Deve Falhar ao Gerar Fatura QR Code
        Given um meio de pagamento válido instanciado
        When ocorre uma erro na chama ao serviço externo
        Then uma exceção é gerada

    Scenario: Deve Falhar ao Gerar Fatura QR Code Por Erro HTTP
        Given um meio de pagamento válido instanciado
        When a chamada ao serviço externo não retorna um corpo com resultado
        Then uma exceção é gerada

    Scenario: Deve Falhar ao Validar Instancia Sem Webhook
        Given parâmetros com webhook inválido
        When instanciar um MeioDePagamentoService
        Then deve lançar uma exceção

    Scenario: Deve Falhar ao Validar Instancia sem Id De Ponto Externo
        Given parâmetros com id de ponto externo inválido
        When instanciar um MeioDePagamentoService
        Then deve lançar uma exceção

    Scenario: Deve Falhar ao Validar Instancia sem Id De Usuário Mercado Pago
        Given parâmetros com id usuário mercado pago inválido
        When instanciar um MeioDePagamentoService
        Then deve lançar uma exceção

    Scenario: Deve Falhar ao Validar Instancia sem Token de Acesso
        Given parâmetros com token de acesso inválido
        When instanciar um MeioDePagamentoService
        Then deve lançar uma exceção

    Scenario: Deve Falhar ao Validar Instancia sem módulo HTTP
        Given parâmetros com módulo HTTP inválido
        When instanciar um MeioDePagamentoService
        Then deve lançar uma exceção