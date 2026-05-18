# DOCUMENTO-MÃE — EQUATEC PLATFORM PRO

## 1. Nome do Projeto

EQUATEC — Ecossistema de Tecnologia e Gestão Integrada

## 2. Objetivo Principal

Desenvolver uma plataforma web profissional, modular, segura e escalável para integrar gestão de obras, gestão empresarial, inteligência artificial corporativa, cursos EAD, ferramentas de engenharia, automações via n8n e dashboards executivos.

## 3. Princípio Central

O projeto deve ser desenvolvido com governança técnica rígida, evitando alterações destrutivas, perda de funcionalidades, quebra de autenticação, alteração indevida de banco de dados, Prisma, Docker, rotas internas ou infraestrutura.

## 4. Lições Aprendidas da Tentativa Anterior

A tentativa anterior falhou porque:
- alterações foram feitas diretamente na VPS;
- arquivos críticos foram alterados sem controle;
- o Prisma foi quebrado;
- o Dockerfile foi removido/recriado manualmente;
- a Home funcional foi substituída por uma página estática;
- botões, login, navegação e estrutura original foram removidos;
- houve mistura entre layout, backend, banco, Docker e deploy;
- não havia uma linha de base protegida;
- não havia revisão de diff antes do deploy.

## 5. Regra Absoluta

A VPS não é ambiente de desenvolvimento.

Toda alteração deve ser feita localmente, versionada no GitHub, revisada e somente depois implantada na Hostinger.

## 6. Fonte Oficial da Verdade

O GitHub será a fonte oficial do projeto.

Repositório oficial:
https://github.com/capmneto/EQUATEC_PLATFORM_PRO.git

## 7. Arquivos Protegidos

Nenhum agente, IA ou desenvolvedor pode alterar os arquivos abaixo sem autorização explícita:

- prisma/schema.prisma
- prisma/seed.ts
- Dockerfile
- docker-compose.yml
- package.json
- package-lock.json
- .env
- middleware.ts
- app/api/*
- arquivos de autenticação
- arquivos de banco de dados
- arquivos de deploy

## 8. Arquivos Permitidos para Alterações Visuais

Alterações de layout, Home, textos, identidade visual e páginas institucionais só podem alterar:

- app/page.tsx
- app/sobre/page.tsx
- app/contato/page.tsx
- components/home/*
- components/layout/*
- components/ui/*
- app/globals.css
- public/home/*
- docs/*

## 9. Módulos do Ecossistema

A plataforma deverá contemplar os seguintes módulos:

1. Gestão de Obras
2. FACILMART
3. IA Corporativa
4. Cursos EAD
5. Ferramentas de Engenharia
6. Automação via n8n
7. Dashboards Executivos

## 10. Páginas Obrigatórias do MVP

A primeira versão limpa deverá conter:

- Home institucional premium
- Página Sobre Carlos Machado
- Página Contato
- Página Login
- Página Cadastro / Solicitar acesso
- Página de Módulos
- Estrutura futura de Admin

## 11. Home Institucional

A Home deve apresentar o sistema como:

EQUATEC — Ecossistema de Tecnologia e Gestão Integrada

Com foco em:
- gestão de obras;
- gestão empresarial;
- engenharia aplicada;
- IA corporativa;
- treinamentos;
- automações;
- dashboards;
- tarefas;
- documentos;
- decisões executivas.

## 12. Identidade Visual

A identidade visual deve seguir:

- dark mode premium;
- azul/ciano como cor principal;
- visual tecnológico;
- cards modernos;
- boa hierarquia;
- responsividade;
- aparência executiva;
- sem aparência genérica;
- sem excesso visual.

## 13. Carlos Machado — Autoridade Técnica

O projeto deve destacar Carlos Machado como idealizador do ecossistema.

Resumo:
Carlos Machado é Engenheiro Mecânico, Engenheiro de Segurança do Trabalho e executivo técnico com experiência em manutenção industrial, facilities, HVAC, PMOC, gestão de ativos, segurança, qualidade, indicadores, BI e inteligência artificial aplicada à gestão.

Links oficiais:
LinkedIn: https://www.linkedin.com/in/carlos-machado-95917433/
WhatsApp: https://wa.me/5522998578981

## 14. Empresas e Autoridade

A Home poderá exibir empresas e organizações com as quais Carlos Machado já atuou, desde que isso seja apresentado como trajetória profissional, histórico de atuação ou experiência acumulada.

Não criar depoimentos falsos.
Não inventar recomendações.
Não criar claims não comprovados.

## 15. Regras para Botões

Todos os botões devem ter destino real.

Se o módulo ainda não existir, o botão deve:
- rolar para uma seção;
- abrir WhatsApp;
- direcionar para solicitação de acesso;
- ou informar que o módulo está em desenvolvimento.

Nunca deixar botão quebrado.

## 16. Regras de Deploy

Antes de qualquer deploy, executar:

git status
git diff --name-only
npm run build

Se aparecer alteração em arquivo protegido sem autorização, parar imediatamente.

## 17. Estratégia de Deploy na Hostinger

A Hostinger VPS será usada apenas para produção.

Comandos permitidos na VPS:
- git pull
- docker compose up -d --build
- docker compose ps
- docker logs

Não editar arquivos manualmente na VPS.

## 18. Critério de Sucesso

O projeto será considerado bem-sucedido quando:

- a Home estiver institucional, premium e funcional;
- login e cadastro estiverem preservados;
- rotas principais funcionarem;
- botões tiverem destino real;
- build passar sem erro;
- deploy for feito sem alterar arquivos protegidos;
- GitHub estiver sincronizado com produção;
- documentação estiver atualizada.

## 19. Regra Final

Nenhuma alteração deve destruir trabalho anterior.

Toda evolução deve preservar a base funcional, melhorar incrementalmente e ser validada antes de produção.
