# 🚀 API REST de Gerenciamento de E-commerce Simplificado

Este repositório apresenta minha solução para o "Desafio Node.js", que consiste na construção de uma **API RESTful completa** para um sistema de gerenciamento de e-commerce. O foco principal foi na qualidade de código, melhores práticas e na entrega de uma solução funcional e escalável.

---

## ✨ Features Implementadas

A API oferece as seguintes funcionalidades essenciais:

* **Autenticação e Autorização Robusta:**
    * Login seguro com e-mail e senha, com validação de e-mail por confirmação.
    * Rotas protegidas por autenticação (exceto login e criação de conta de cliente).
    * Permissionamento Baseado em Papéis (RBAC) para Clientes e Administradores.
* **Gestão de Clientes (CRUD):**
    * CRUD completo para gerenciamento de clientes.
    * Busca avançada de clientes.
* **Gestão de Produtos (CRUD):**
    * CRUD para produtos (nome, descrição, preço, quantidade).
    * Busca com filtros múltiplos.
    * Controle de estoque dinâmico.
* **Gestão de Pedidos:**
    * Sistema de carrinho de compras.
    * Atualização de status do pedido.
    * Integração simulada com pagamento, acionando débito em estoque e mudança de status.
* **Relatórios Customizados e Analíticos:**
    * Geração de relatórios detalhados de faturamento e vendas por produto em arquivo CSV.
    * Registro do relatório com o caminho do arquivo CSV para download.
    * Consultas SQL avançadas para dados relevantes e performáticos.

---

## 🛠️ Tech Stack

O projeto foi construído utilizando as seguintes tecnologias e ferramentas:

* **Linguagem:** Node.js com TypeScript
* **Banco de Dados:** PostgreSQL
* **ORM:** Prisma
* **Validação:** Yup
* **Autenticação:** JWT (JSON Web Tokens)
* **Gerenciamento de Ambiente:** Docker, Docker Compose
* **Documentação:** Swagger (OpenAPI)
* **Testes:** Jest
* **Boas Práticas de Código:** ESLint

---

## 📁 Estrutura de Pastas

```
C:\USERS\ATILA\WEBSTORMPROJECTS\LOOMITESTE\SRC
|   main.ts
|
+---application                  # Casos de Uso da Aplicação
|   +---clients
|   |   |   create-client.application.ts
|   |   |   delete-client.application.ts
|   |   |   find-by-id-client.application.ts
|   |   |   list-client.application.ts
|   |   |   update-client.application.ts
|   |   |
|   |   \---interfaces
|   |           client-user-http.application.interface.ts
|   |           create-client.application.interface.ts
|   |           delete-client.application.interface.ts
|   |           find-by-id-client.application.interface.ts
|   |           list-client.application.interface.ts
|   |           update-client.application.interface.ts
|   +---file
|   |   |   generate-file.application.ts
|   |   |
|   |   \---interface
|   |           generate-file.application.interface.ts
|   +---interfaces
|   |       base.application.ts
|   +---items
|   |   |   add-item.application.ts
|   |   |   find-by-id-item.application.ts
|   |   |   list-item.application.ts
|   |   |   remove-item.application.ts
|   |   |   update-item.application.ts
|   |   |
|   |   \---interfaces
|   |           add-item.application.interface.ts
|   |           find-by-id-item.application.interface.ts
|   |           list-item.application.interface.ts
|   |           remove-item.application.interface.ts
|   |           update-item.application.interface.ts
|   +---orders
|   |   |   create-order.application.ts
|   |   |   delete-order.application.ts
|   |   |   list-order.application.ts
|   |   |   update-order-status.application.ts
|   |   |
|   |   \---interfaces
|   |           create-order.application.interface.ts
|   |           delete-order.application.interface.ts
|   |           find-by-id-order.application.interface.ts
|   |           list-order.application.interface.ts
|   |           update-order-status.application.interface.ts
|   +---payments
|   |       payment.application.ts
|   +---products
|   |   |   create-product.application.ts
|   |   |   delete-product.application.ts
|   |   |   find-by-id-product.application.ts
|   |   |   list-product.application.ts
|   |   |   update-product.application.ts
|   |   |
|   |   \---interfaces
|   |           create-product.application.interface.ts
|   |           delete-product.application.interface.ts
|   |           find-by-id-product.application.interface.ts
|   |           list-product.application.interface.ts
|   |           update-product.application.interface.ts
|   \---users
|       |   actived-account.application.ts
|       |   create-user.application.ts
|       |   delete-user.application.ts
|       |   find-by-id-user.application.ts
|       |   list-user.application.ts
|       |   login-user.application.ts
|       |   update-user.application.ts
|       |
|       \---interfaces
|               actived-account.application.interface.ts
|               create-user.application.interface.ts
|               delete-user.application.interface.ts
|               find-by-id-user.application.interface.ts
|               list-user.application.interface.ts
|               login-user.application.interface.ts
|               update-user.application.interface.ts
|
+---core                         # Camada de Domínio (Entidades, Repositórios, Casos de Uso de Domínio)
|   +---clients
|   |   +---entity
|   |   |       client.entity.ts
|   |   +---interfaces
|   |   |       create.client.usecase.interface.ts
|   |   |       delete.client.usecase.interface.ts
|   |   |       find-by-id.client.usecase.interface.ts
|   |   |       list.client.usecase.interface.ts
|   |   |       update.client.usecase.interface.ts
|   |   +---repository
|   |   |       client.repository.ts
|   |   +---usecases
|   |   |       create-client.usecase.ts
|   |   |       delete-client.usecase.ts
|   |   |       find-by-id.client.usecase.ts
|   |   |       list-client.usecase.ts
|   |   |       update-client.usecase.ts
|   |   \---__tests__
|   |           create-client.usecase.spec.ts
|   +---interfaces
|   |       IUsecase.ts
|   +---items
|   |   +---entity
|   |   |       item.entity.ts
|   |   +---interfaces
|   |   |       add-item.usecase.interface.ts
|   |   |       find-by-id-item.usecase.interface.ts
|   |   |       list-item.usecase.interface.ts
|   |   |       remove-item.usecase.interface.ts
|   |   |       update-item.usecase.interface.ts
|   |   +---repository
|   |   |       item.repository.ts
|   |   +---usecases
|   |   |       add-item.usecase.ts
|   |   |       find-by-id-item.usecase.ts
|   |   |       list-item.usecase.ts
|   |   |       remove-item.usecase.ts
|   |   |       update-item.usecase.ts
|   |   \---__tests__
|   |           add-item.usecase.spec.ts
|   +---orders
|   |   +---entity
|   |   |       order.entity.ts
|   |   +---interfaces
|   |   |       create-order.usecase.interface.ts
|   |   |       delete-order.usecase.interface.ts
|   |   |       find-by-id.interface.usecase.ts
|   |   |       list-order.usecase.interface.ts
|   |   |       update-order-status.usecase.interface.ts
|   |   |       update-order.usecase.interface.ts
|   |   +---repository
|   |   |       order.repository.ts
|   |   +---usecases
|   |   |       create-order.usecase.ts
|   |   |       delete-order.usecase.ts
|   |   |       find-by-id-order.usecase.ts
|   |   |       list-order.usecase.ts
|   |   |       update-order-status.usecase.ts
|   |   |       update-order.usecase.ts
|   |   \---__tests__
|   |           create-order.usecase.spec.ts
|   +---payments
|   |   +---usecases
|   |   |       payment.usecase.ts
|   |   \---__tests__
|   |           payment.spec.ts
|   +---products
|   |   +---entity
|   |   |       product.entity.ts
|   |   +---interfaces
|   |   |       create-product.usecase.interface.ts
|   |   |       delete-product.usecase.interface.ts
|   |   |       find-by-id-product.usecase.interface.ts
|   |   |       list-product.usecase.interface.ts
|   |   |       product-registered.usecase.interface.ts
|   |   |       update-product.usecase.interface.ts
|   |   +---repository
|   |   |       product.repository.ts
|   |   +---usecases
|   |   |       create-product.usecase.ts
|   |   |       delete-product.usecase.ts
|   |   |       find-by-product.usecase.ts
|   |   |       list-product.usecase.ts
|   |   |       product-registered.usecase.ts
|   |   |       update-product.usecase.ts
|   |   \---__tests__
|   |           create-product.usecase.spec.ts
|   \---users
|       +---entity
|       |       user.entity.ts
|       +---interfaces
|       |       actived.account.usecase.interface.ts
|       |       create.user.usecase.interface.ts
|       |       delete.user.usecase.interface.ts
|       |       find-by-id.user.usecase.interface.ts
|       |       list.user.usecase.interface.ts
|       |       login.user.usecase.interface.ts
|       |       update.user.usecase.interface.ts
|       |       verify.email.usecase.interface.ts
|       +---repository
|       |       user.repository.ts
|       +---usecases
|       |       actived-account.usecase.ts
|       |       create-user.usecase.ts
|       |       delete-user.usecase.ts
|       |       find-by-id-user.usecase.ts
|       |       list-user.usecase.ts
|       |       login-user.usecase.ts
|       |       update-user.usecase.ts
|       |       verify-email.usecase.ts
|       \---__tests__
|               create-user.usecase.spec.ts
|
+---di                           # Injeção de Dependência
|       application.module.ts
|       core.module.ts
|       infra.module.ts
|       presentation.module.ts
|       root.module.ts
|
+---infra                        # Infraestrutura (Adapters)
|   +---database
|   |   \---postgres
|   |       +---prisma
|   |       |   |   prisma.service.ts
|   |       |   |   schema.prisma
|   |       |   |   seed.ts
|   |       |   \---migrations
|   |       |           migration_lock.toml
|   |       |           ...
|   |       \---repositories
|   |               repository.ts
|   \---mail
|       \---service
|               sendgrid-email.service.ts
|
+---presentation                 # Camada de Apresentação (HTTP)
|   |   public.decorator.ts
|   |   roles.decorator.ts
|   +---auth
|   |       auth.module.ts
|   +---enum
|   |       role.enum.ts
|   +---guard
|   |       auth.dto.ts
|   |       auth.service.ts
|   |       bcrypt.ts
|   |       http.context.ts
|   |       jwt-auth.guard.ts
|   |       jwt.stratagy.ts
|   |       public.decorator.ts
|   |       roles.guard.ts
|   \---v1
|       \---http
|           +---clients
|           |   +---controller
|           |   |       client.controller.ts
|           |   \---dto
|           |           create-client.dto.ts
|           |           delete-client.dto.ts
|           |           find-by-id-client.dto.ts
|           |           list-client.dto.ts
|           |           update-client.dto.ts
|           |           user-http-context.dto.ts
|           +---itens
|           |   +---controller
|           |   |       item.controller.ts
|           |   \---dto
|           |           add-item.dto.ts
|           |           find-by-id-item.dto.ts
|           |           list-item.dto.ts
|           |           remove-item.dto.ts
|           |           update-item.dto.ts
|           +---orders
|           |   +---controller
|           |   |       order.controller.ts
|           |   \---dto
|           |           create-order.dto.ts
|           |           delete-order.dto.ts
|           |           find-by-id-order-dto.ts
|           |           list-order.dto.ts
|           |           update-status.dto.ts
|           +---payments
|           |   +---controller
|           |   |       payment.controller.ts
|           |   \---dto
|           |           payment.dto.ts
|           +---products
|           |   +---controller
|           |   |       product.controller.ts
|           |   \---dto
|           |           create-product.dto.ts
|           |           delete-product.dto.ts
|           |           find-by-id-product.dto.ts
|           |           list-product.dto.ts
|           |           update-product.dto.ts
|           \---users
|               +---controller
|               |       user.controller.ts
|               \---dto
|                       actived-account.dto.ts
|                       create.dto.ts
|                       delete.dto.ts
|                       find-by-id-user.dto.ts
|                       list.dto.ts
|                       login.dto.ts
|                       update.dto.ts
|                       wrapper-client.dto.ts
|
\---shared                       # Utilitários e Enums Compartilhados
    |   order-status.enum.ts
    |   user-role.enum.ts
    +---utils
    |   |   create-pipe.ts
    |   \---interface
    |           email-template.ts
    \---validators
            validator-pipe.ts


```


---

## 🚀 Como Rodar o Projeto

Siga os passos para configurar e executar a API localmente:

1.  **Clone o repositório:**
    ```bash
    git clone [https://github.com/seu-usuario/seu-projeto.git](https://github.com/seu-usuario/seu-projeto.git)
    cd seu-projeto
    ```
2.  **Variáveis de Ambiente:**
    ```bash
    cp .env.example .env
    ```
    Edite o arquivo `.env` com suas credenciais de banco de dados, chaves JWT, configurações de serviço de e-mail, etc.
3.  **Suba os containers (Docker Compose):**
    ```bash
    docker-compose up --build -d
    ```
    Este comando irá construir as imagens, iniciar os serviços (incluindo o banco de dados PostgreSQL) e aplicar as migrações e o seed inicial automaticamente, criando um **usuário administrador pré-validado**.
4.  **Acesse a API:**
    A API estará disponível em `http://localhost:3000` (ou a porta configurada no `.env`).
    A documentação Swagger (OpenAPI) pode ser acessada em `http://localhost:3000/api-docs`.

---

## 🔐 Fluxo de Autenticação

O sistema de autenticação usa JWT com:

* **Geração de Tokens:** Access token e refresh token (seguramente armazenados).
* **Refresh de Token:** Renovação automática para minimizar reautenticação.
* **Logout:** Revogação de tokens e invalidação de sessão.
* **Validação de E-mail:** E-mails de confirmação são enviados para verificar a autenticidade dos usuários.

## ↔️ Endpoints Principais Implementados

A API expõe os seguintes endpoints principais, organizados por módulo:

### Autenticação e Usuários (`/api/auth` e `/api/users`)

| Método | Rota                     | Proteção  | Descrição                                 |
| :----- | :----------------------- | :-------- | :---------------------------------------- |
| `POST` | `/api/auth/login`        | Pública   | Autentica o usuário.                      |
| `POST` | `/api/auth/register`     | Pública   | Cria uma nova conta de cliente.           |
| `GET`  | `/api/auth/me`           | Protegida | Retorna dados do usuário autenticado.     |
| `POST` | `/api/auth/logout`       | Protegida | Realiza o logout da sessão.               |
| `POST` | `/api/users/admin`       | Protegida | Cria um novo usuário Administrador.       |
| `POST` | `/api/users/client`      | Pública   | Cria um novo usuário Cliente.             |
| `GET`  | `/api/users/{id}/{token}` | Pública   | Ativa a conta de um usuário.              |
| `GET`  | `/api/users`             | Protegida | Lista todos os usuários com filtros.      |
| `GET`  | `/api/users/{id}`        | Protegida | Busca um usuário por ID.                  |
| `PATCH`| `/api/users/{id}`        | Protegida | Atualiza um usuário por ID.               |
| `DELETE`| `/api/users/{id}`        | Protegida | Deleta um usuário por ID.                 |

---

### Clientes (`/api/clients`)

| Método   | Rota                   | Proteção  | Descrição                         |
| :------- | :--------------------- | :-------- | :-------------------------------- |
| `POST`   | `/api/clients`         | Protegida | Cria um novo perfil de cliente.   |
| `GET`    | `/api/clients`         | Protegida | Lista todos os clientes.          |
| `GET`    | `/api/clients/:id`     | Protegida | Retorna um cliente específico.    |
| `PATCH`  | `/api/clients/:id`     | Protegida | Atualiza os dados de um cliente.  |
| `DELETE` | `/api/clients/:id`     | Protegida | Deleta um cliente por ID.         |

---

### Produtos (`/api/products`)

| Método   | Rota                   | Proteção  | Descrição                         |
| :------- | :--------------------- | :-------- | :-------------------------------- |
| `GET`    | `/api/products`        | Pública   | Lista todos os produtos (com filtros). |
| `POST`   | `/api/products`        | Protegida | Cria um novo produto (Admin).     |
| `GET`    | `/api/products/:id`    | Pública   | Retorna um produto específico.    |
| `PUT`    | `/api/products/:id`    | Protegida | Atualiza um produto (Admin).      |
| `DELETE` | `/api/products/:id`    | Protegida | Deleta um produto (Admin).        |

---

### Pedidos (`/api/orders`)

| Método | Rota                         | Proteção  | Descrição                                 |
| :----- | :--------------------------- | :-------- | :---------------------------------------- |
| `GET`  | `/api/orders`                | Protegida | Lista todos os pedidos.                   |
| `POST` | `/api/orders`                | Protegida | Cria um novo pedido.                      |
| `GET`  | `/api/orders/:id`            | Protegida | Retorna um pedido específico.             |
| `PUT`  | `/api/orders/:id/status`     | Protegida | Atualiza o status de um pedido (Admin).   |
| `POST` | `/api/orders/:id/payment`    | Protegida | Simula confirmação/negação de pagamento. |

---

### Itens de Pedido (`/api/items`)

| Método   | Rota               | Proteção  | Descrição                              |
| :------- | :----------------- | :-------- | :------------------------------------- |
| `POST`   | `/api/items`       | Protegida | Adiciona um item a um pedido (carrinho). |
| `GET`    | `/api/items/:id`   | Protegida | Retorna um item específico.            |
| `PUT`    | `/api/items/:id`   | Protegida | Atualiza a quantidade de um item.      |
| `DELETE` | `/api/items/:id`   | Protegida | Remove um item de um pedido.           |

---


### Pagamento (`/api/payments`)

| Método | Rota                       | Proteção  | Descrição                         |
| :----- | :------------------------- | :-------- | :-------------------------------- |
| `POST` | `/api/payments/process-payment` | Protegida | Processar um pagamento.           |


## 🧪 Testes

Os testes unitários e de integração foram implementados para garantir a confiabilidade das funcionalidades críticas.

Para rodar os testes:

```bash
npx jest