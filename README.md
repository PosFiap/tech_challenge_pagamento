# Tech Challenge Pagamento

## Índice
- [Sobre](#-sobre)
- [Pré-requisitos](#-pré-requisitos)
- [Instalação e execução](#-instalação-e-execução)
- [Tecnologias](#-tecnologias)
- [Testes](#-testes)

## 💻 Sobre
Este é um microserviço específico para o módulo de pagamentos de um pedido da lanchonete Neverwinter & Cia.
Este microserviço implementa os seguintes cenários:

### Gerar Fatura
Como sistema externo eu quero informar um pedido para gerar uma fatura em QRCode.

### Verificar Situação de Pagamento de Fatura
Como sistema externo eu quero informar um código de fatura para obter seu estado de pagamento.

### Informar Estado de Pagamento de fatura
Como sistema de pagamento de terceiro eu quero informar o estado de pagamento de uma fatura.

## 🗂 Pré-requisitos
Para rodar o projeto precisa apenas ter instalado os softwares abaixo:
* Docker
* Docker Compose

Para desenvolvimento é necessário:
* Docker
* Docker Compose
* NodeJs 18

## 🔥 Instalação e execução -- DOCKER
Os comandos para instalar e rodar local o projeto, basta utilizar o script disponibilizado no projeto com os comandos abaixo:
```bash
# modo de desenvolvimento com live reload
$ ./run.sh dev

# modo de produção
$ ./run.sh production

# encerrar o projeto
$ ./run.sh stop
```

## 🔥 Instalação e execução -- KUBERNETES
Os comandos para instalar e rodar local o projeto, basta utilizar o script disponibilizado no projeto com os comandos abaixo:
```bash
# inicia o banco de dados
$ ./run-kube.sh db

# inicia a aplicação em modo produção
$ ./run.sh app

# rodar todas as dependências
$ ./run.sh all

# encerrar o projeto
$ ./run.sh clear
```

## Possível erro de permissão

Caso ocorra algum erro basta rodar 

```bash

# Aplica permissões para o comando
$ chmod +x ./run-kube.sh 

Para desenvolvimento, para obter facilidades como autocomplete das ferramentas de código é necessário se utilizar dos comandos abaixo:
```bash
# instalar as dependencias de desenvolvimento e produção localmente
$ npm i

# setup do banco de dados
$ npm run prisma:migrate

# rodar o projeto com o node local e não o do container
$ npm run dev

#rodar modo de produção local
$ npm run build && npm start
```

## 🛠 Tecnologias
As principais ferramentas usadas na construção do projeto:
- [Node.js](https://nodejs.org/en/)
- [Express](https://expressjs.com/)
- [TypeScript](https://www.typescriptlang.org/)
- [PostgreSql](https://www.postgresql.org)

## 🧪 Testes
Testes unitários utilizando o [Jest](https://jestjs.io/pt-BR/). Esses testes podem ser executados com:
```bash
$ npm run test
```

## 🚀 API's
Essas são as requisições exemplificada no POSTMAN

Segue a collection para baixar [Tech Challenge](./Tech%20Challenge.postman_collection.json)

Utilizamos a variável ```{{host_docker}} = http://localhost:8080``` que se refere a porta em que o docker está rodando

segue os exemplos:

(o github não permite colocar gifs acima de 5MB, então coloquei os gifs no meu drive e vou colocar o link deles aqui [Gifs](https://drive.google.com/drive/folders/119A9ZyNVMpX50Ja6MZUExgr8KJIQQTVS?usp=sharing))

# Pagamento

Ao registar um novo pedido é retornado pela API um campo chamado `codigo_fatura` que é referente a fatura na instituição financeira.

## Verificação de Pagamento
A verificação do pagamento de uma fatura ocorre com a indicação desse código na rota `/pagamento/situacao?codigo_fatura=<string>`

## Confirmação de Pagamento 

A simulação de um pagamento ocorre com a indicação desse código na rota `pagamento/webhook/MP/confirmar` indicando o corpo 
```
{
    "codigo_fatura": <string>
}
```

## Rejeição de Pagamento 

A simulação de uma rejeição de pagamento ocorre com a indicação desse código na rota `pagamento/webhook/MP/rejeitar` indicando o corpo 
```
{
    "codigo_fatura": <string>
}
```

# Casos de Uso

## Módulo Pagamento

### Gerar Fatura para Pagamento
Ação: Cria uma nova fatura para ser paga em um fornecedor externo. Toda fatura é associada a um pedido.

Entrada: Código de identificador de pedido.

Saída: Um objeto contendo os dados da fatura e do pedido associado.

### Verificar Situação de Pagamento de Fatura
Ação: Verifica a situação do status de pagamento de uma fatura.

Entrada: Código identificador da fatura.

Saída: Um objeto contendo os dados da fatura e do pedido associado.

### Confirmar Pagamento de Fatura
Ação: Uma fatura que esteja com o status de pagamento como `Aguardando Pagamento` deve ter seu status de pagamento atualizado para `Pago`.

Entrada: Código identificador da fatura.

Saída: Um objeto contendo os dados da fatura e do pedido associado.

### Rejeitar Pagamento de Fatura
Ação: Uma fatura que esteja com o status de pagamento como `Aguardando Pagamento` deve ter seu status de pagamento atualizado para `Rejeitado`.

Entrada: Código identificador da fatura.

Saída: Um objeto contendo os dados da fatura e do pedido associado.