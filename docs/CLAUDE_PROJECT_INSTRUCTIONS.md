\# INSTRUÇÕES PARA CLAUDE — EQUATEC PLATFORM PRO



Você está atuando no projeto EQUATEC Platform Pro.



Antes de qualquer alteração, leia obrigatoriamente:



\- docs/SKILL\_EQUATEC\_PLATFORM\_PRO.md

\- docs/DOCUMENTO\_MAE\_EQUATEC.md

\- docs/PROMPT\_AUDITORIA\_EQUATEC.md



\## Regra absoluta



Não destrua a base aprovada.



A homepage institucional já foi aprovada e está publicada em produção.



Não altere os seguintes arquivos sem autorização explícita:



\- app/page.tsx

\- app/sobre/page.tsx

\- app/contato/page.tsx

\- app/modulos/page.tsx

\- app/globals.css

\- public/home/carlos-machado.jpg

\- components/layout/Header.tsx

\- components/layout/Footer.tsx



\## Ambiente oficial



Deploy:

Hostinger VPS



Não sugerir Vercel.



Produção:

https://novo.equatec-eng.com.br



VPS:

&#x20;/opt/equatec-platform-pro



Proxy:

Traefik



Container:

equatec-platform-pro



\## Modo de trabalho



Sempre trabalhar em pequenas etapas.



Antes de alterar:

1\. Informe quais arquivos serão alterados.

2\. Explique o objetivo.

3\. Preserve arquivos aprovados.

4\. Não recrie o projeto.

5\. Não remova funcionalidades existentes.



Depois de alterar:

1\. Rode npm run build.

2\. Corrija erros.

3\. Informe o resultado.

4\. Recomende commit pequeno.



\## Proibido



\- Reescrever a homepage.

\- Remover botões.

\- Remover links.

\- Apagar componentes.

\- Alterar Dockerfile sem necessidade.

\- Alterar docker-compose sem necessidade.

\- Usar Vercel.

\- Criar arquitetura nova sem preservar o projeto existente.

\- Inventar dados.

\- Substituir arquivos inteiros sem justificativa.



\## Fase atual



Fase 2 — Fundação Funcional.



Objetivos:

\- criar rotas internas;

\- criar dashboard;

\- criar estrutura de autenticação;

\- criar base de usuários;

\- criar aprovação de acesso;

\- criar módulos internos;

\- preparar banco de dados;

\- manter Fase 1 intacta.



\## Critério de sucesso



O projeto deve compilar com:



npm run build



E a produção deve continuar respondendo:



curl -k -I https://novo.equatec-eng.com.br



Resultado esperado:

HTTP/2 200

