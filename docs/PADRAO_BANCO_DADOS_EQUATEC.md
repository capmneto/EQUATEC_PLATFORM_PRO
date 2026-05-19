\# PADRÃO OFICIAL DE BANCO DE DADOS E AUTENTICAÇÃO

\## EQUATEC Platform Pro



\*\*Versão:\*\* 1.0  

\*\*Data:\*\* 18/05/2026  

\*\*Responsável Técnico:\*\* Carlos Machado  

\*\*Projeto:\*\* EQUATEC Platform Pro  

\*\*Status:\*\* Documento Oficial de Arquitetura  



\---



\# 1. Objetivo do Documento



Este documento estabelece o padrão oficial de arquitetura de banco de dados, autenticação, controle de acesso e armazenamento de informações do projeto \*\*EQUATEC Platform Pro\*\*.



Sua finalidade é garantir que todas as implementações futuras, bem como agentes de IA (ChatGPT, Claude, Gemini e outros), sigam rigorosamente as diretrizes técnicas aprovadas para o ecossistema.



\---



\# 2. Decisão Arquitetural Oficial



> O EQUATEC Platform Pro utilizará \*\*MySQL 8.x\*\* executando em container Docker na VPS Hostinger, com acesso via Prisma ORM e autenticação implementada com Auth.js (NextAuth), mantendo total aderência à arquitetura proprietária do projeto e independência de serviços externos como Supabase.



\---



\# 3. Regra Obrigatória para Agentes de IA



\## ❌ Tecnologias Proibidas



Os agentes de IA \*\*NÃO DEVEM\*\* sugerir:



\- Supabase

\- Firebase Authentication

\- PocketBase

\- Appwrite

\- MongoDB Atlas

\- Serviços externos que armazenem dados críticos do sistema



\## ✅ Tecnologias Aprovadas



\- MySQL 8.x

\- Prisma ORM

\- Auth.js (NextAuth)

\- bcrypt

\- Redis

\- Docker Compose

\- Traefik

\- Next.js 16



\---



\# 4. Arquitetura Oficial



| Camada | Tecnologia Oficial |

|------|------|

| Frontend | Next.js 16 |

| Backend | Next.js App Router |

| ORM | Prisma |

| Banco de Dados | MySQL 8.x |

| Autenticação | Auth.js (NextAuth) |

| Hash de Senha | bcrypt |

| Cache e Filas | Redis |

| Automação | n8n |

| Reverse Proxy | Traefik |

| Infraestrutura | Docker Compose |

| Hospedagem | Hostinger VPS |



\---



\# 5. Justificativas Técnicas



A adoção do MySQL em container próprio foi definida pelos seguintes motivos:



1\. Total controle sobre os dados.

2\. Independência de terceiros.

3\. Menor custo recorrente.

4\. Facilidade de backup e restore.

5\. Compatibilidade com Prisma.

6\. Integração nativa com n8n.

7\. Escalabilidade.

8\. Segurança.

9\. Governança centralizada.

10\. Padronização da infraestrutura.



\---



\# 6. Estrutura de Usuários



\## Perfis Oficiais



\- `master\_admin`

\- `admin`

\- `internal\_user`

\- `client`

\- `student`

\- `franchise\_partner`

\- `guest`



\## Status de Usuário



\- `pending`

\- `active`

\- `blocked`

\- `rejected`

\- `inactive`



\---



\# 7. Controle de Permissões



O acesso será controlado por módulo.



\## Módulos do Sistema



\- dashboard

\- admin

\- hub\_bonus

\- obras

\- franquias

\- ia

\- cursos

\- automacoes



\---



\# 8. Fluxo de Cadastro



1\. Usuário realiza cadastro.

2\. Conta criada com status `pending`.

3\. Administrador analisa.

4\. Aprova ou rejeita.

5\. Em caso de aprovação:

&#x20;  - status = `active`

&#x20;  - módulos liberados.

6\. Usuário passa a acessar somente os módulos autorizados.



\---



\# 9. Modelagem Inicial



\## Tabela `users`



\- id

\- name

\- email

\- password\_hash

\- role

\- status

\- created\_at

\- updated\_at



\## Tabela `module\_permissions`



\- id

\- user\_id

\- module\_key

\- enabled



\## Tabela `access\_requests`



\- id

\- user\_id

\- request\_status

\- reviewed\_by

\- reviewed\_at

\- notes



\## Tabela `audit\_logs`



\- id

\- user\_id

\- action

\- metadata\_json

\- created\_at



\---



\# 10. Segurança



\- Hash de senhas com bcrypt.

\- Sessões seguras.

\- Tokens com expiração.

\- RBAC.

\- Auditoria.

\- Rate limiting.

\- Proteção CSRF.

\- HTTPS obrigatório.



\---



\# 11. Política de Backup



\- Backup diário automático.

\- Retenção mínima de 30 dias.

\- Possibilidade de backup externo.

\- Testes periódicos de restauração.



\---



\# 12. Estrutura Docker Prevista



\## Containers



\- equatec-platform-pro

\- equatec-mysql

\- equatec-redis

\- traefik

\- n8n



\---



\# 13. ORM Oficial



O Prisma será o ORM padrão para:



\- Schema versionado.

\- Migrations.

\- Type safety.

\- Queries padronizadas.



\---



\# 14. Autenticação Oficial



O Auth.js será utilizado para:



\- Login com credenciais.

\- Gestão de sessão.

\- Middleware de proteção.

\- Recuperação de senha.

\- Controle por perfil.



\---



\# 15. Roadmap da Fase 3



1\. Prisma schema.

2\. Container MySQL.

3\. Container Redis.

4\. Auth.js.

5\. Cadastro.

6\. Aprovação.

7\. Permissões.

8\. Middleware.

9\. Auditoria.

10\. Deploy.



\---



\# 16. Diretriz Estratégica



Todos os dados estratégicos do EQUATEC Platform Pro deverão permanecer sob controle direto do proprietário do sistema, hospedados na infraestrutura oficial da Hostinger, sem dependência de provedores externos para autenticação e persistência de dados críticos.



\---



\# 17. Compatibilidade com Agentes de IA



Este documento deve ser utilizado como referência por:



\- ChatGPT

\- Claude

\- Gemini

\- GitHub Copilot

\- Codex

\- Agentes internos do sistema



\---



\# 18. Status da Decisão



\*\*APROVADO E OFICIALIZADO\*\*



\---



\# 19. Responsável pela Aprovação



\*\*Carlos Machado\*\*  

Engenharia Especializada • Gestão da Manutenção Industrial • Soluções com IA aplicada à Gestão

