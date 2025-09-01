# Projeto To-Do 🚀

## Descrição Detalhada ✨

Este é um projeto full-stack completo para gerenciamento de tarefas (To-Do), projetado para ser robusto, escalável e fácil de usar. Ele é composto por duas partes principais: um backend poderoso construído com NestJS e um frontend moderno e responsivo desenvolvido com Next.js. A aplicação permite que os usuários criem, visualizem, editem e excluam suas tarefas de forma intuitiva, garantindo que nunca percam o controle de seus compromissos. Com um sistema de autenticação seguro e persistência de dados confiável, este projeto é uma solução ideal para quem busca organizar suas atividades diárias.

## Tecnologias Utilizadas 🛠️

### Backend (API) ⚙️

*   **NestJS**: Um framework Node.js progressivo e altamente modular, ideal para construir APIs RESTful eficientes e escaláveis. Ele utiliza TypeScript por padrão, promovendo um código mais robusto e fácil de manter.
*   **TypeScript**: Superconjunto do JavaScript que adiciona tipagem estática, melhorando a detecção de erros em tempo de desenvolvimento e a legibilidade do código.
*   **better-auth**: Uma biblioteca de autenticação que simplifica a implementação de fluxos de login, registro e gerenciamento de sessões, garantindo a segurança dos usuários.
*   **Drizzle ORM**: Um ORM (Object-Relational Mapper) moderno e leve para TypeScript, que oferece uma maneira elegante e segura de interagir com bancos de dados relacionais, como o PostgreSQL, através de código TypeScript.
*   **NeonDB**: Um serviço de banco de dados PostgreSQL serverless e escalável, perfeito para aplicações que precisam de flexibilidade e alta disponibilidade sem a complexidade de gerenciar infraestrutura de banco de dados.
*   **Jest**: Um framework de teste amplamente utilizado no ecossistema JavaScript/TypeScript, garantindo a qualidade e a confiabilidade do código do backend através de testes unitários e de integração.

### Frontend 🖥️

*   **Next.js**: Um framework React poderoso que permite a construção de aplicações web full-stack com recursos avançados como Server-Side Rendering (SSR), Static Site Generation (SSG) e otimização de imagens, proporcionando uma experiência de usuário rápida e fluida.
*   **React**: Uma biblioteca JavaScript declarativa e baseada em componentes para a construção de interfaces de usuário interativas e dinâmicas.
*   **TypeScript**: Utilizado também no frontend para garantir a consistência e a segurança do código, facilitando o desenvolvimento de componentes complexos.
*   **Tailwind CSS**: Um framework CSS utilitário que permite estilizar a aplicação de forma rápida e responsiva, diretamente no HTML, sem a necessidade de escrever CSS tradicional.
*   **shadcn/ui**: Uma coleção de componentes de UI bonitos e acessíveis, construídos com Radix UI e Tailwind CSS, que aceleram o desenvolvimento da interface do usuário e garantem um design consistente.
*   **React Query (TanStack Query)**: Uma biblioteca essencial para gerenciamento de estado do servidor, caching, sincronização e atualização de dados assíncronos, otimizando o desempenho e a experiência do usuário.
*   **Axios**: Um cliente HTTP baseado em Promises para o navegador e Node.js, utilizado para fazer requisições HTTP para a API do backend de forma simples e eficiente.

## Funcionalidades Principais 🌟

*   **Autenticação de Usuário**: Crie sua conta e faça login de forma segura para acessar suas tarefas. 🔐
*   **Gerenciamento Completo de Tarefas (CRUD)**: Adicione novas tarefas, visualize todas as suas tarefas, edite detalhes existentes e exclua tarefas concluídas ou indesejadas. ✅
*   **Persistência de Dados**: Todas as suas tarefas são armazenadas de forma segura em um banco de dados PostgreSQL, garantindo que seus dados estejam sempre disponíveis. 💾
*   **Interface Intuitiva e Responsiva**: Desfrute de uma experiência de usuário agradável em qualquer dispositivo, seja desktop ou mobile. 📱💻

## Estrutura do Projeto 📂

O projeto é cuidadosamente organizado em duas pastas principais, refletindo sua arquitetura full-stack:

*   `api/`: Contém todo o código-fonte do backend, incluindo a lógica de negócios, a API RESTful e a interação com o banco de dados.
*   `front-end/`: Contém todo o código-fonte do frontend, responsável pela interface do usuário e pela comunicação com a API.

### `api/` (Backend)

```
api/
├── src/
│   ├── auth/             # Módulo de autenticação (login, registro, etc.)
│   ├── db/               # Configuração do banco de dados e esquemas Drizzle ORM
│   ├── tasks/            # Módulo para gerenciamento de tarefas (CRUD)
│   ├── user/             # Módulo para gerenciamento de usuários
│   ├── app.module.ts     # Módulo principal da aplicação NestJS
│   ├── main.ts           # Ponto de entrada da aplicação NestJS
├── drizzle/              # Migrações do Drizzle ORM para o banco de dados
├── package.json          # Dependências e scripts do backend
└── ... (outros arquivos de configuração)
```

### `front-end/` (Frontend)

```
front-end/
├── public/               # Ativos estáticos (imagens, ícones, etc.)
├── src/
│   ├── app/              # Páginas e layouts da aplicação Next.js
│   ├── components/       # Componentes React reutilizáveis (incluindo shadcn/ui)
│   ├── context/          # Contextos React (ex: React Query Provider)
│   ├── hooks/            # Hooks personalizados para lógica de UI
│   ├── lib/              # Utilitários e configurações (ex: Axios, auth-client)
│   ├── services/         # Funções para interação com a API do backend
│   ├── types/            # Definições de tipos TypeScript para o frontend
├── package.json          # Dependências e scripts do frontend
└── ... (outros arquivos de configuração)
```

## Como Rodar o Projeto Localmente 🚀

Siga os passos abaixo para configurar e executar o projeto em sua máquina local. É super fácil! 😉

### Pré-requisitos ✅

Certifique-se de ter as seguintes ferramentas instaladas:

*   **Node.js** (versão 18 ou superior): Essencial para rodar tanto o backend quanto o frontend.
*   **npm** ou **Yarn**: Gerenciadores de pacotes para instalar as dependências.
*   **Git**: Para clonar o repositório do projeto.
*   **Um banco de dados PostgreSQL**: Pode ser uma instância local (Docker, PostgreSQL instalado diretamente) ou um serviço em nuvem como o NeonDB (recomendado para simplicidade).

### Configuração do Backend (API) 🛠️

1.  **Navegue até a pasta da API:**

    ```bash
    cd api
    ```

2.  **Instale as dependências:**

    ```bash
    npm install
    # ou yarn install
    ```

3.  **Crie um arquivo `.env`:**

    Copie o conteúdo de `env.example` para um novo arquivo chamado `.env` na raiz da pasta `api/` e preencha as variáveis de ambiente com suas credenciais do banco de dados e outras configurações necessárias. Não se esqueça de preencher o `AUTH_SECRET` com uma string aleatória e segura! 🔑

    ```dotenv
    DATABASE_URL="postgresql://user:password@host:port/database_name"
    AUTH_SECRET="sua_string_secreta_aqui_para_better_auth"
    # Se for usar autenticação Google, preencha também:
    # AUTH_GOOGLE_CLIENT_ID="seu_client_id_google"
    # AUTH_GOOGLE_CLIENT_SECRET="seu_client_secret_google"
    ```

4.  **Execute as migrações do banco de dados:**

    Este comando criará as tabelas necessárias no seu banco de dados. 🔄

    ```bash
    npm run migrate
    # ou yarn migrate
    ```

5.  **Inicie o servidor da API:**

    O backend estará pronto para receber requisições! 🎉

    ```bash
    npm run start:dev
    # ou yarn start:dev
    ```

    A API estará rodando em `http://localhost:3000` (ou na porta configurada no seu `.env`).

### Configuração do Frontend 🖥️

1.  **Navegue até a pasta do frontend:**

    ```bash
    cd ../front-end
    ```

2.  **Instale as dependências:**

    ```bash
    npm install
    # ou yarn install
    ```

3.  **Crie um arquivo `.env.local`:**

    Copie o conteúdo de `env.local.example` para um novo arquivo chamado `.env.local` na raiz da pasta `front-end/` e preencha a URL da sua API. Certifique-se de que a URL corresponde à porta onde seu backend está rodando. 🔗

    ```dotenv
    NEXT_PUBLIC_API_URL="http://localhost:3000/api"
    ```

4.  **Inicie o servidor de desenvolvimento do frontend:**

    Agora você pode acessar a interface da aplicação no seu navegador! 🌐

    ```bash
    npm run dev
    # ou yarn dev
    ```

    O frontend estará acessível em `http://localhost:3001` (ou na porta padrão do Next.js, geralmente 3000 se o backend estiver em outra porta).

## Como Usar o Projeto (Passo a Passo) 🚶‍♀️🚶‍♂️

Depois de configurar e rodar o projeto localmente, siga estes passos para começar a usar a aplicação To-Do:

1.  **Acesse a Aplicação**: Abra seu navegador e vá para `http://localhost:3001` (ou a porta onde seu frontend está rodando). ➡️

2.  **Crie uma Conta**: Se você é um novo usuário, clique no botão de 

registro (ou similar) e preencha as informações necessárias para criar sua conta. 📝

3.  **Faça Login**: Após criar sua conta ou se já tiver uma, insira suas credenciais na tela de login. 🔑

4.  **Gerencie Suas Tarefas**: Uma vez logado, você será direcionado para a página principal onde poderá:
    *   **Adicionar Nova Tarefa**: Use o campo de entrada e o botão para adicionar novas tarefas à sua lista. ➕
    *   **Visualizar Tarefas**: Todas as suas tarefas serão exibidas na tela. 👀
    *   **Editar Tarefa**: Clique em uma tarefa para editar seu título ou descrição. ✏️
    *   **Marcar como Concluída**: Marque a caixa de seleção ao lado de uma tarefa para indicá-la como concluída. ✅
    *   **Excluir Tarefa**: Remova tarefas que não são mais necessárias. 🗑️

5.  **Desconecte-se**: Quando terminar, você pode sair da sua conta. 🚪

## Variáveis de Ambiente 🌍

Para o correto funcionamento do projeto, é necessário configurar algumas variáveis de ambiente. Elas são essenciais para a conexão com o banco de dados, autenticação e comunicação entre o frontend e o backend.

### Backend (`api/.env`)

Crie um arquivo `.env` na raiz da pasta `api/` com as seguintes variáveis:

*   `DATABASE_URL`: A URL de conexão completa para o seu banco de dados PostgreSQL. Ex: `postgresql://user:password@host:port/database_name`
*   `AUTH_SECRET`: Uma string secreta e única utilizada pela biblioteca `better-auth` para assinar tokens de autenticação. **Mantenha esta chave segura e nunca a exponha publicamente!**
*   `AUTH_GOOGLE_CLIENT_ID`: (Opcional) Seu ID de cliente da API do Google, necessário se você planeja implementar autenticação via Google.
*   `AUTH_GOOGLE_CLIENT_SECRET`: (Opcional) Seu segredo de cliente da API do Google, também para autenticação via Google.

### Frontend (`front-end/.env.local`)

Crie um arquivo `.env.local` na raiz da pasta `front-end/` com a seguinte variável:

*   `NEXT_PUBLIC_API_URL`: A URL base da sua API de backend. Certifique-se de que esta URL aponta para onde seu servidor NestJS está rodando. Ex: `http://localhost:3000/api`

## Scripts Disponíveis 📜

### Backend (`api/package.json`)

*   `npm run build`: Compila o projeto NestJS para produção. 📦
*   `npm run format`: Formata o código-fonte usando Prettier. ✨
*   `npm run start`: Inicia a aplicação NestJS em modo de produção. 🚀
*   `npm run start:dev`: Inicia a aplicação NestJS em modo de desenvolvimento com `watch` (recarrega automaticamente ao detectar mudanças no código). 🔄
*   `npm run lint`: Executa o linter (ESLint) para identificar e corrigir problemas de estilo e erros no código. 🧹
*   `npm run test`: Executa todos os testes unitários e de integração do backend. 🧪
*   `npm run migrate`: Executa as migrações do Drizzle ORM, aplicando as alterações no esquema do banco de dados. ⬆️

### Frontend (`front-end/package.json`)

*   `npm run dev`: Inicia o servidor de desenvolvimento do Next.js. 🖥️
*   `npm run build`: Cria a build de produção otimizada do Next.js. 🏗️
*   `npm run start`: Inicia o servidor de produção do Next.js. 🚀
*   `npm run lint`: Executa o linter (ESLint) para o código do frontend. 🧹

## Testes 🧪

Para garantir a qualidade e o bom funcionamento do backend, você pode executar os testes unitários e de integração. Navegue até a pasta `api/` e execute o seguinte comando:

```bash
npm run test
# ou yarn test
```

## Licença 📄

Este projeto está licenciado sob a licença MIT. Para mais detalhes, consulte o arquivo `LICENSE` na raiz do repositório. ⚖️

## Contribuição 🤝

Contribuições são sempre bem-vindas! Se você encontrou um bug, tem uma ideia para uma nova funcionalidade ou quer melhorar o código, sinta-se à vontade para abrir uma issue ou enviar um pull request. Por favor, siga as diretrizes de contribuição (se houver) e mantenha o código limpo e bem documentado. Juntos, podemos tornar este projeto ainda melhor! ❤️



