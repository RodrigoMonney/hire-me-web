# Hire.me Web

Frontend da aplicação `Hire.me`, desenvolvida com **Next.js 15** (Pages Router) e **React 19**.  
Este projeto consome a API backend do desafio técnico e oferece uma interface funcional e limpa para o gerenciamento de usuários.

## 🚀 Tecnologias utilizadas

- [Next.js 15 (Pages Router)](https://nextjs.org/)
- [React 19](https://react.dev/)
- [Tailwind CSS 4](https://tailwindcss.com/)
- [React Query (Tanstack)](https://tanstack.com/query/latest)
- [Axios](https://axios-http.com/)
- [Headless UI (modal acessível)](https://headlessui.com/)
- [React Toastify (notificações)](https://fkhadra.github.io/react-toastify)

---

## 🧩 Funcionalidades

- Listagem de usuários com cache inteligente
- Criação de usuários via modal
- Edição de usuários com formulário reutilizável
- Exclusão com confirmação
- Integração com backend via API REST
- Feedback de erro via toasts
- Estilo moderno com Tailwind

---

## 🧰 Pré-requisitos

- Node.js 18+
- Backend NestJS rodando em: `http://localhost:3000/api/v1`

> ⚠️ O backend deve estar rodando localmente.  
> Caso você tenha clonado o projeto completo, acesse a pasta do backend e rode:

```bash
npm install
npm run start:dev
```

---

## 📦 Instalação

1. Clone o repositório:

```bash
git clone https://github.com/seu-usuario/hire-me-web.git
cd hire-me-web
```

2. Instale as dependências:

```bash
npm install
```

---

## 🔧 Configuração

### Variáveis de ambiente

Crie um arquivo `.env.local` com:

```env
NEXT_PUBLIC_API_URL=http://localhost:3000/api/v1
```

> O projeto também funciona com `api.ts` configurado diretamente, mas essa é a forma recomendada.

---

## 💻 Execução local

```bash
npm run dev
```

Acesse em: [http://localhost:3000](http://localhost:3000)

---

## ✅ Rotas da aplicação

| Caminho | Descrição                                    |
| ------- | -------------------------------------------- |
| `/`     | Tabela de usuários com ações CRUD            |
| Modais  | Abertos inline para criar, editar ou excluir |

---

## 🗃️ Estrutura resumida

```
src/
├─ pages/               # Pages Router
│  └─ index.tsx         # Página principal
├─ components/
│  ├─ UserTable.tsx     # Lista de usuários
│  └─ UserFormModal.tsx # Modal de criação/edição/exclusão
├─ lib/
│  ├─ api.ts            # Axios baseURL
│  └─ react-query.ts    # QueryClientProvider
└─ styles/
   └─ globals.css       # Tailwind config
```

---

## 📦 Scripts úteis

| Script          | Ação                                 |
| --------------- | ------------------------------------ |
| `npm run dev`   | Inicia o servidor de desenvolvimento |
| `npm run build` | Compila para produção                |
| `npm run start` | Inicia servidor de produção local    |
| `npm run lint`  | Executa o linter                     |

---

## 💡 Diferenciais implementados

- Modal reutilizável com múltiplos modos (`create`, `update`, `delete`)
- Formulário controlado com reset automático
- Toasts para erro global com `react-toastify`
- `React Query` configurado com cache e `invalidateQueries`
- Design limpo, sem dependência de bibliotecas pesadas de UI

---

## 🧪 Testado com

- Node 18+
- Backend NestJS (API local)
- Navegadores: Chrome, Firefox

---

## 📄 Licença

MIT © Rodrigo Monney
