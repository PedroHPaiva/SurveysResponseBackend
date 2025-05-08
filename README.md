# **Surveys Response Backend**

Este é um backend para gerenciamento de respostas de pesquisas, construído com **TypeScript** e utilizando as tecnologias mais modernas para garantir escalabilidade e robustez. O sistema é modular, organizado e segue as melhores práticas de desenvolvimento. Ele possui autenticação baseada em **JWT**, gerenciamento de usuários, e oferece endpoints para interagir com as respostas de pesquisas.

## **Tecnologias Utilizadas**

- **Node.js** com **Express** para construção da API.
- **TypeScript** para garantir tipagem estática e aumentar a qualidade do código.
- **Sequelize** como ORM para interação com o banco de dados.
- **bcryptjs** para hash de senhas.
- **jsonwebtoken (JWT)** para autenticação segura.
- **Yup** para validação de dados.
- **dotenv** para configuração de variáveis de ambiente.
- **Jest** e **Supertest** para testes automatizados.

## **Arquitetura do Projeto**

O projeto segue uma arquitetura modular dividida nas seguintes camadas:

- **Constants**: Constantes da aplicação.
- **Controllers**: Responsáveis por tratar as requisições HTTP e coordenar a lógica de execução, chamando serviços e repositórios.
- **Services**: Contêm a lógica de negócio do sistema, como manipulação de dados e execução de regras específicas.
- **Repositories**: Realizam a interação direta com o banco de dados. O projeto usa **Sequelize** para facilitar a manipulação de dados relacionais.
- **Models**: Representam as entidades do banco de dados, como `User` e `Survey`.
- **Middlewares**: Gerenciam comportamentos de requisições, como autenticação e validação de dados.
- **Helpers**: Funções que auxiliam as regras de negócio.
- **Routes**: Definem os endpoints da API e vinculam as rotas aos controladores.
- **Types**: Interfaces usadas na aplicação.
- **Validators**: validações de inputs feitos pelos usuários.
- **Errors**: Manipulação e tratamento de erros personalizados para garantir mensagens claras para os usuários.
- **Tests**: Testes unitários para garantir que o código esteja funcionando corretamente.

## **Instalação e Configuração**

1. Clone o repositório:

    ```bash
    git clone https://github.com/PedroHPaiva/SurveysResponseBackend.git
    ```

2. Navegue até a pasta do projeto:

    ```bash
    cd SurveysResponseBackend
    ```

3. Instale as dependências:

    ```bash
    npm install
    ```

4. Crie um arquivo `.env` com as variáveis de ambiente necessárias. Exemplo de configuração:

    ```bash
    DB_HOST=0.0.0.0
    DB_PORT=0000
    DB_USER=user
    DB_PASS=password
    DB_NAME=database
    
    REDIS_URL=redis_url
    REDIS_TOKEN=redis_token
    
    JWT_SECRET=jwt_secret

    ```

5. Para rodar o projeto em ambiente de desenvolvimento:

    ```bash
    npm run dev
    ```

## **Endpoints**

Aqui estão as principais rotas da API:

### **Autenticação**

#### `POST /sessions`
- **Descrição**: Realiza a autenticação de um usuário.
- **Corpo da Requisição**:
    ```json
    {
      "email": "exemplo@dominio.com",
      "password": "senha123"
    }
    ```
- **Resposta de Sucesso**:
    ```json
    {
      "email": "exemplo@dominio.com",
	    "created_at": "2021-01-27T22:12:32.514Z",
      "token": "jwt_token"
    }
    ```
- **Resposta de Erro**:
    - `400 Bad Request`: Dados inválidos ou faltando.
    - `401 Unauthorized`: Credenciais inválidas.

---

### **Usuários**

#### `POST /users`
- **Descrição**: Cria um novo usuário no sistema.
- **Autenticação**: Requer um token JWT no cabeçalho de autorização.
- **Corpo da Requisição**:
    ```json
    {
      "email": "novo@dominio.com",
      "password": "senha123"
    }
    ```
- **Resposta de Sucesso**:
    ```json
    {
      "message": "Usuário criado com sucesso!"
    }
    ```
- **Resposta de Erro**:
    - `400 Bad Request`: Email já registrado ou dados inválidos.

---

### **Pesquisas**

#### `POST /surveys`
- **Descrição**: Cria uma nova pesquisa.
- **Autenticação**: Requer um token JWT no cabeçalho de autorização.
- **Resposta de Sucesso**:
    ```json
    {
      "message": "Dados inseridos com sucesso no redis"
    }
    ```
- **Resposta de Erro**:
    - `400 Bad Request`: Dados inválidos ou incompletos.

#### `GET /surveys`
- **Descrição**: Obtém todas as pesquisas.
- **Autenticação**: Requer um token JWT no cabeçalho de autorização.
- **Query**: obrigatório passar uma data de incio, final e como quer formatar os dados (startDate=2021-02-20&endDate=2021-02-22&groupBy=hour)
- **Resposta de Sucesso**:
    ```json
    [
      {
    		"origin": "email",
    		"period": "2021-02-20 20:00",
    		"total": 10,
    		"converted": 5,
    		"conversionRate": 50
    	},
    ]
    ```

---

## **Testes**

Os testes são feitos utilizando **Jest** para garantir que a API esteja funcionando corretamente. Para rodar os testes:

1. Para rodar todos os testes:
    ```bash
    npm run test
    ```
---

## **Conclusão**

Este backend foi desenvolvido com o objetivo de fornecer uma API eficiente e fácil de manter para um sistema de respostas de pesquisa. Ele foi estruturado para ser modular, escalável e fácil de testar, usando **TypeScript** e boas práticas de desenvolvimento.

Se você deseja contribuir, por favor, abra uma *issue* ou envie um *pull request* com suas sugestões!
