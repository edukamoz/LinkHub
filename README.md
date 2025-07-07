# LinkHub - Agregador de Links Pessoal 🔗

<div align="center">
  <em>Um agregador de links de código aberto, construído com as tecnologias mais modernas, permitindo que usuários criem uma página pública e personalizada para todos os seus links importantes.</em>
</div>

<br/>

<div align="center">
  <img src="./docs/images/linkhub-demo.gif" alt="Demonstração do LinkHub" width="800px">
</div>

<br/>

## ✨ Visão Geral do Projeto

LinkHub é uma aplicação Full Stack completa que funciona como um "Linktree" pessoal. Ela permite que usuários se cadastrem, gerenciem uma lista de links através de um dashboard privado e seguro, e definam um nome de usuário único para gerar uma página de perfil pública e elegante para compartilhar com o mundo.

Este projeto foi construído do zero como uma peça de portfólio para demonstrar habilidades em todo o ciclo de vida do desenvolvimento de software, desde o backend e banco de dados até o frontend reativo e a experiência do usuário.

<br/>

## 🚀 Links do Projeto

- **Aplicação ao Vivo:** `https://link-hub-psi.vercel.app/`

<br/>

## 🛠️ Tecnologias Utilizadas

Este projeto utiliza um monorepo com uma stack moderna e robusta baseada em TypeScript.

| Área               | Tecnologia                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |
| :----------------- | :----------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------- |
| **Frontend**       | ![React](https://img.shields.io/badge/react-%2320232a.svg?style=for-the-badge&logo=react&logoColor=%2361DAFB) ![TypeScript](https://img.shields.io/badge/typescript-%23007ACC.svg?style=for-the-badge&logo=typescript&logoColor=white) ![Vite](https://img.shields.io/badge/vite-%23646CFF.svg?style=for-the-badge&logo=vite&logoColor=white) ![React Router](https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white) ![Axios](https://img.shields.io/badge/axios-233447?style=for-the-badge&logo=axios&logoColor=white) |
| **Backend**        | ![NodeJS](https://img.shields.io/badge/node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white) ![Express.js](https://img.shields.io/badge/express.js-%23404d59.svg?style=for-the-badge&logo=express&logoColor=%2361DAFB) ![JWT](https://img.shields.io/badge/JWT-black?style=for-the-badge&logo=JSON%20web%20tokens)                                                                                                                                                                                                                                          |
| **Banco de Dados** | ![MongoDB](https://img.shields.io/badge/MongoDB-%234ea94b.svg?style=for-the-badge&logo=mongodb&logoColor=white) ![Mongoose](https://img.shields.io/badge/Mongoose-880000?style=for-the-badge&logo=mongoose&logoColor=white)                                                                                                                                                                                                                                                                                                                                              |
| **Validação**      | ![Zod](https://img.shields.io/badge/Zod-3E67B1?style=for-the-badge&logo=zod&logoColor=white) ![React Hook Form](https://img.shields.io/badge/React_Hook_Form-EC5990?style=for-the-badge&logo=reacthookform&logoColor=white)                                                                                                                                                                                                                                                                                                                                              |
| **Deploy**         | **Backend:** Render.com <br/> **Frontend:** Vercel <br/> **Banco de Dados:** MongoDB Atlas                                                                                                                                                                                                                                                                                                                                                                                                                                                                               |

<br/>

## 🌟 Funcionalidades Principais

- **Autenticação Segura:** Cadastro e Login de usuários com senhas hasheadas (bcrypt) e sessões gerenciadas por JSON Web Tokens (JWT).
- **Dashboard Privado:** Uma vez logado, o usuário tem acesso a um dashboard onde pode gerenciar seus links.
- **CRUD Completo de Links:** Usuários podem Criar, Ler, Atualizar e Deletar seus links de forma intuitiva.
- **Gerenciamento de Perfil:** Uma página de configurações permite ao usuário atualizar seu nome e definir um nome de usuário (`username`) público e único.
- **Página de Perfil Pública:** Qualquer pessoa pode acessar `url-da-app/username` para ver a lista de links daquele usuário.
- **Validação de Formulários:** Validação robusta no frontend com `react-hook-form` e `zod` para feedback instantâneo.
- **Notificações (Toasts):** Feedback de sucesso e erro com notificações elegantes, sem o uso de `alert()`.
- **Design Responsivo:** A interface se adapta para uma experiência de uso agradável tanto em desktops quanto em dispositivos móveis.
- **API RESTful:** Backend bem estruturado com rotas públicas e privadas.

<br/>

## ⚙️ Como Rodar o Projeto Localmente

Siga os passos abaixo para executar o LinkHub na sua máquina.

**Pré-requisitos:**

- [Node.js](https://nodejs.org/en/) (versão 18.x ou superior)
- [Git](https://git-scm.com/)
- Uma conta gratuita no [MongoDB Atlas](https://www.mongodb.com/cloud/atlas) para o banco de dados.

**1. Clone o repositório:**

```bash
git clone https://github.com/edukamoz/LinkHub.git
cd linkhub
```

**2. Configure o Backend:**

```bash
# Navegue para a pasta do backend
cd backend

# Instale as dependências
npm install

# Crie um arquivo .env na pasta 'backend' e adicione as seguintes variáveis:
# MONGO_URI=[Sua string de conexão do MongoDB Atlas]
# PORT=3001
# JWT_SECRET=[Seu segredo longo e aleatório para o JWT]
# JWT_EXPIRES_IN=90d
```

**3. Configure o Frontend:**

```bash
# Navegue para a pasta do frontend (a partir da raiz)
cd frontend

# Instale as dependências
npm install

# Crie um arquivo .env.local na pasta 'frontend' e adicione a variável:
# VITE_API_BASE_URL=http://localhost:3001/api
```

**4. Execute a Aplicação:**

- **Terminal 1 (Backend):**
  ```bash
  cd backend
  npm start
  ```
- **Terminal 2 (Frontend):**
  ```bash
  cd frontend
  npm run dev
  ```

Acesse `http://localhost:5173` no seu navegador para ver a aplicação rodando!

<br/>

## 👨‍💻 Autor

Feito com muito carinho e código por **Eduardo Kamo**.

- **GitHub:** [`@edukamoz`](https://github.com/edukamoz)
- **LinkedIn:** [`Eduardo Kamo`](https://www.linkedin.com/in/eduardo-kamo/)
