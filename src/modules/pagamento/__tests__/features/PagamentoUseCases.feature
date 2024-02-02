Feature: CriarFatura

    Scenario: Deve Criar Fatura
        Given dados de fatura
        """
        {
            "codigo_fatura": "ABCD",
            "codigo_pedido": 1,
            "valor": 15,
            "cpf_cliente": "08389960001"
        }
        """
        When eles são validos e completos
        Then uma fatura é registrada e retornada com status 'Aguardando Pagamento'
        """
        {
            "codigo_fatura": "ABCD",
            "codigo_pedido": 1,
            "valor": 15,
            "cpf_cliente": "08389960001",
            "situacao": "Aguardando Pagamento",
            "data_criacao": "2024-01-20T12:00:00.000Z",
            "data_atualizacao": "2024-01-20T12:00:00.000Z"
        }
        """

    Scenario: Deve Criar Fatura Sem CPF
        Given dados de fatura
        """
        {
            "codigo_fatura": "ABCD",
            "codigo_pedido": 1,
            "valor": 15
        }
        """
        When eles são validos e não contém CPF
        Then uma fatura é registrada e retornada com status 'Aguardando Pagamento' e sem CPF
        """
        {
            "codigo_fatura": "ABCD",
            "codigo_pedido": 1,
            "valor": 15,
            "cpf_cliente": null,
            "situacao": "Aguardando Pagamento",
            "data_criacao": "2024-01-20T12:00:00.000Z",
            "data_atualizacao": "2024-01-20T12:00:00.000Z"
        }
        """
    
    Scenario: Deve Criar Fatura Com CPF Vazio
        Given dados de fatura
        """
        {
            "codigo_fatura": "ABCD",
            "codigo_pedido": 1,
            "valor": 15,
            "cpf_cliente": ""
        }
        """
        When eles são validos e o CPF é vazio
        Then uma fatura é registrada e retornada com status 'Aguardando Pagamento' e sem CPF
        """
        {
            "codigo_fatura": "ABCD",
            "codigo_pedido": 1,
            "valor": 15,
            "cpf_cliente": null,
            "situacao": "Aguardando Pagamento",
            "data_criacao": "2024-01-20T12:00:00.000Z",
            "data_atualizacao": "2024-01-20T12:00:00.000Z"
        }
        """

    Scenario: Deve Criar Fatura Com CPF Null
        Given dados de fatura
        """
        {
            "codigo_fatura": "ABCD",
            "codigo_pedido": 1,
            "valor": 15,
            "cpf_cliente": null
        }
        """
        When eles são validos e o CPF é null
        Then uma fatura é registrada e retornada com status 'Aguardando Pagamento' e sem CPF
        """
        {
            "codigo_fatura": "ABCD",
            "codigo_pedido": 1,
            "valor": 15,
            "cpf_cliente": null,
            "situacao": "Aguardando Pagamento",
            "data_criacao": "2024-01-20T12:00:00.000Z",
            "data_atualizacao": "2024-01-20T12:00:00.000Z"
        }
        """

    Scenario: Deve Falhar Criar Fatura Sem Codigo Fatura
        Given dados de fatura
        """
        {
            "codigo_pedido": 1,
            "valor": 15,
            "cpf_cliente": "08389960001"
        }
        """
        When não há codigo de fatura
        Then uma exceção de violação de parâmetro é retornada

    Scenario: Deve Falhar Criar Fatura Com Codigo Fatura Vazio
        Given dados de fatura
        """
        {
            "codigo_fatura": "",
            "codigo_pedido": 1,
            "valor": 15,
            "cpf_cliente": "08389960001"
        }
        """
        When código de fatura é vazio
        Then uma exceção de violação de parâmetro é retornada

    Scenario: Deve Falhar Criar Fatura Com Codigo Fatura Null
        Given dados de fatura
        """
        {
            "codigo_fatura": null,
            "codigo_pedido": 1,
            "valor": 15,
            "cpf_cliente": "08389960001"
        }
        """
        When código de fatura é null
        Then uma exceção de violação de parâmetro é retornada

    Scenario: Deve Falhar Criar Fatura Com Codigo Fatura Numérico
        Given dados de fatura
        """
        {
            "codigo_fatura": 0,
            "codigo_pedido": 1,
            "valor": 15,
            "cpf_cliente": "08389960001"
        }
        """
        When código de fatura é inválido
        Then uma exceção de violação de parâmetro é retornada

    Scenario: Deve Falhar Criar Fatura Com Codigo Fatura Boleano
        Given dados de fatura
        """
        {
            "codigo_fatura": true,
            "codigo_pedido": 1,
            "valor": 15,
            "cpf_cliente": "08389960001"
        }
        """
        When código de fatura é inválido
        Then uma exceção de violação de parâmetro é retornada

    Scenario: Deve Falhar Criar Fatura Sem Codigo Pedido
        Given dados de fatura
        """
        {
            "codigo_fatura": "ABCD",
            "valor": 15,
            "cpf_cliente": "08389960001"
        }
        """
        When não há codigo de pedido
        Then uma exceção de violação de parâmetro é retornada

    Scenario: Deve Falhar Criar Fatura Com Codigo Pedido Negativo
        Given dados de fatura
        """
        {
            "codigo_fatura": "ABCD",
            "codigo_pedido": -1,
            "valor": 15,
            "cpf_cliente": "08389960001"
        }
        """
        When código de pedido é inválido
        Then uma exceção de violação de parâmetro é retornada

    Scenario: Deve Falhar Criar Fatura Com Codigo Pedido Zero
        Given dados de fatura
        """
        {
            "codigo_fatura": "ABCD",
            "codigo_pedido": 0,
            "valor": 15,
            "cpf_cliente": "08389960001"
        }
        """
        When código de pedido é inválido
        Then uma exceção de violação de parâmetro é retornada

    Scenario: Deve Falhar Criar Fatura Sem Valor
        Given dados de fatura
        """
        {
            "codigo_fatura": "ABCD",
            "codigo_pedido": 1,
            "cpf_cliente": "08389960001"
        }
        """
        When não há valor
        Then uma exceção de violação de parâmetro é retornada

    Scenario: Deve Falhar Criar Fatura Com Valor Negativo
        Given dados de fatura
        """
        {
            "codigo_fatura": "ABCD",
            "codigo_pedido": 1,
            "valor": -1.0,
            "cpf_cliente": "08389960001"
        }
        """
        When o valor é negativo
        Then uma exceção de violação de parâmetro é retornada

    Scenario: Deve Falhar Criar Fatura Com CPF Inválido
        Given dados de fatura
        """
        {
            "codigo_fatura": "ABCD",
            "codigo_pedido": 1,
            "valor": 15,
            "cpf_cliente": "08389960000"
        }
        """
        When o cpf_cliente é inválido
        Then uma exceção de violação de parâmetro é retornada
