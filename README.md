# InfraBairro (web, formato mobile)

Versão em HTML/CSS/JavaScript puro das telas do app InfraBairro. Sem framework e sem build.

## Como abrir

- Dê dois cliques em `index.html`, ou
- rode um servidor local na pasta: `python -m http.server 8000` e acesse `http://localhost:8000`.

Para ver no formato de celular, abra as ferramentas do navegador (F12) e ative o modo dispositivo (Ctrl+Shift+M).

## Telas

| Arquivo | Tela |
| --- | --- |
| `index.html` | Login (tema escuro) |
| `map.html` | Início: mapa com pinos por status, busca e filtros por categoria |
| `reports.html` | Minhas ocorrências (abas Todas / Em andamento / Solucionadas) |
| `new-report-location.html` | Registrar ocorrência, etapa 1: localização e categoria |
| `new-report-details.html` | Registrar ocorrência, etapa 2: foto e descrição |

## Estrutura

```
css/tokens.css      cores, espaçamentos, raios (o "design system")
css/base.css        reset e a coluna "mobile" (.app)
css/components.css  botão, top bar, chip, stepper, bottom nav, campos, toast
css/pages.css       layout específico de cada tela
js/icons.js         ícones SVG
js/data.js          categorias, status, dados de exemplo e localStorage
js/app.js           utilidades compartilhadas (toast, escapeHtml, ícones)
js/*.js             um script por tela
```

## O que ainda é simulado

- Login: não há autenticação, o botão só abre o mapa.
- Mapa: é uma imagem ilustrativa, não um mapa real.
- Localização: o endereço é fixo e o botão de localizar ainda não funciona.
- Dados: ocorrências novas ficam só no `localStorage` do navegador. A foto não é salva.
- "Mapa" e "Perfil" na barra inferior mostram "Em breve!".
