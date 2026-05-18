# Ajuste do Hero — EQUATEC Platform Pro

Arquivo alterado neste pacote:

- app/globals.css

Objetivo:

- Reduzir o zoom visual da Home.
- Diminuir o tamanho do título principal.
- Melhorar a proporção entre texto e imagem.
- Evitar corte/distorção da foto de Carlos Machado.
- Preservar todos os botões, páginas, rotas, menu, conteúdo e backend.

## Como aplicar

Copie a pasta `app` deste pacote para dentro do projeto local:

D:\Carlos Machado\Carlos Particular\Agente de IA\EQUATEC_PLATFORM_PRO

Substitua o arquivo:

app/globals.css

Depois rode:

```powershell
npm run build
npm run dev
```

Valide em:

http://localhost:3000

Se aprovado:

```powershell
git status
git add app/globals.css
git commit -m "Refina hero da Home institucional"
git push origin main
```

Na VPS:

```bash
cd /opt/equatec-platform-pro
git pull origin main
docker compose up -d --build
```
