\# ROADMAP FASE 2 — EQUATEC Platform Pro



\## Status da Fase 1



A homepage institucional foi aprovada e publicada em produção.



Ambiente oficial:

\- Produção: https://novo.equatec-eng.com.br

\- Deploy: Hostinger VPS

\- Proxy: Traefik

\- Container: equatec-platform-pro

\- Repositório: GitHub EQUATEC\_PLATFORM\_PRO



\## Regra principal



A Fase 2 não deve alterar, remover ou reconstruir a homepage institucional aprovada.



Arquivos protegidos nesta etapa:

\- app/page.tsx

\- app/sobre/page.tsx

\- app/contato/page.tsx

\- app/modulos/page.tsx

\- app/globals.css

\- public/home/carlos-machado.jpg



Alterações nesses arquivos só podem ocorrer com autorização explícita.



\## Objetivo da Fase 2



Construir a fundação funcional da plataforma EQUATEC Platform Pro.



\## Módulos iniciais



1\. Autenticação

2\. Cadastro de usuários

3\. Painel administrativo

4\. Aprovação de acessos

5\. Dashboard principal

6\. HUB BONUS

7\. Gestão de Obras

8\. Gestão de Franquias e Sociedades

9\. IA Corporativa

10\. Cursos e Treinamentos

11\. Automações e n8n



\## Critérios de aceite



\- O projeto deve continuar compilando com npm run build.

\- A homepage institucional não pode ser quebrada.

\- O deploy Docker deve continuar funcional.

\- O domínio novo.equatec-eng.com.br deve continuar respondendo HTTP/2 200.

\- Toda nova funcionalidade deve ser criada de forma modular.

\- Nenhuma mudança destrutiva deve ser feita sem backup e commit anterior.



\## Sequência recomendada



\### Etapa 2.1 — Estrutura inicial interna



Criar rotas:

\- /dashboard

\- /admin

\- /admin/usuarios

\- /admin/aprovacoes

\- /hub-bonus

\- /obras

\- /franquias

\- /ia

\- /cursos

\- /automacoes



\### Etapa 2.2 — Layout interno



Criar:

\- menu lateral

\- topo interno

\- cards de módulos

\- tela dashboard inicial



\### Etapa 2.3 — Autenticação



Implementar:

\- login real

\- cadastro

\- sessão

\- proteção de rotas



\### Etapa 2.4 — Banco de dados



Implementar:

\- usuários

\- perfis

\- permissões

\- módulos

\- logs



\### Etapa 2.5 — Administração



Implementar:

\- aprovação de usuários

\- liberação de módulos

\- controle de permissões



\## Observação



Esta fase deve ser feita em pequenos commits, com build validado a cada etapa.

