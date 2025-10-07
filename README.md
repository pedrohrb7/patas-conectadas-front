# Patas Conectadas - Front-end

Sistema de gestão para ONGs de proteção animal desenvolvido com Next.js e Tailwind CSS.

## 🚀 Tecnologias

- **Next.js 15.5.4** - Framework React para produção
- **React 19.1.0** - Biblioteca JavaScript para interfaces de usuário
- **TypeScript** - Superset JavaScript com tipagem estática
- **Tailwind CSS 4** - Framework CSS utilitário
- **Axios** - Cliente HTTP para requisições à API

## 📋 Funcionalidades Implementadas

### 1. Gestão de Animais
- ✅ Cadastro de animais com informações completas
- ✅ Listagem de animais com filtros por status
- ✅ Atualização de status (disponível, adotado, tratamento, acolhimento)
- ✅ Página de detalhes com histórico médico completo
- ✅ Registro de consultas, vacinas, cirurgias e exames

### 2. Gestão de Voluntários
- ✅ Cadastro de voluntários
- ✅ Gerenciamento de preferências de atuação
- ✅ Sistema de gamificação com pontos e badges
- ✅ Perfil do voluntário com tarefas atribuídas

### 3. Gestão de Tarefas
- ✅ Criação de tarefas com prioridade
- ✅ Atribuição de tarefas a voluntários
- ✅ Acompanhamento de status e conclusão
- ✅ Sistema de pontuação por tarefa concluída

### 4. Gestão de Doações
- ✅ Registro de doações financeiras
- ✅ Registro de doações de itens
- ✅ Relatórios de impacto das doações
- ✅ Visualização de doações por período

### 5. Gestão de Eventos
- ✅ Cadastro de eventos (adoção, arrecadação, campanhas)
- ✅ Registro de participantes em eventos
- ✅ Controle de capacidade de eventos

### 6. Gestão de Adoções
- ✅ Formulário completo de adoção
- ✅ Dados do adotante e termo de responsabilidade
- ✅ Aprovação/rejeição de adoções
- ✅ Relatórios anuais de adoção com estatísticas

## 🛠️ Configuração do Projeto

### Pré-requisitos

- Node.js 22 lts (jod) instalado
- API backend rodando em `http://localhost:3001`
    - Veja o repositório da API: [patas-conectadas-api]('https://github.com/pedrohrb7/patas-conectadas-api')
- Git instalado


### Instalação

1. Clone o repositório:
```bash
git clone https://github.com/pedrohrb7/patas-conectadas-front.git
cd patas-conectadas-front
```

2. Instale as dependências:
```bash
npm install
```

3. Configure as variáveis de ambiente:
```bash
cp .env.example .env.local
```

Edite o arquivo `.env.local` e configure a URL da API:
```
NEXT_PUBLIC_API_URL=http://localhost:3001
```

### Executando o Projeto

Desenvolvimento:
```bash
npm run dev
```

Build para produção:
```bash
npm run build
```

Iniciar em produção:
```bash
npm start
```

Executar linter:
```bash
npm run lint
```

Acesse [http://localhost:3000](http://localhost:3000) no navegador.

## 📁 Estrutura do Projeto

```
src/
├── app/                    # Páginas e rotas (App Router)
│   ├── animais/           # Módulo de animais
│   ├── voluntarios/       # Módulo de voluntários
│   ├── tarefas/           # Módulo de tarefas
│   ├── doacoes/           # Módulo de doações
│   ├── eventos/           # Módulo de eventos
│   └── adocoes/           # Módulo de adoções
├── components/            # Componentes reutilizáveis
│   ├── animais/
│   ├── voluntarios/
│   └── layout/
└── services/              # Serviços de API
    ├── api.ts             # Configuração base do Axios
    ├── animalService.ts
    ├── voluntarioService.ts
    ├── doacaoService.ts
    └── eventoService.ts
```

## 🎨 Interface

O sistema possui uma interface responsiva e intuitiva com:
- Navegação principal com todas as funcionalidades
- Cards informativos na página inicial
- Formulários completos e validados
- Feedback visual de ações
- Mensagens de erro amigáveis

## 🔌 Integração com API

O front-end está preparado para se comunicar com a API backend através do Axios. Todas as requisições são centralizadas no arquivo `src/services/api.ts` que inclui:
- Interceptors para tratamento de erros
- Configuração de headers
- Suporte para autenticação (preparado para tokens)

## 📝 Licença

Este projeto foi desenvolvido como parte do sistema Patas Conectadas para gestão de ONGs de proteção animal.
