# Não remover a Trilha do Concílio

A página https://abnergonzales64.github.io/jp-67oxjzu7/i3aerdsmeztsy69k/trilha-concilio-2026-11-07.html e o PWA dela dependem destes arquivos, no mesmo caminho:

- `trilha-concilio-2026-11-07.html`
- `trilha-concilio.webmanifest`
- `trilha-concilio-sw.js`
- `trilha-concilio-icons/` (favicon SVG e PNG, Apple Touch 180, ícones 192, 512 e maskable)

Não há script nem workflow de publicação neste repositório. Em 9 de novembro de 2026, `main` foi substituído pelo commit órfão `7872c21` (`publish 2026-11-09`, autor `jp`), enviado com force-push. Esse snapshot não tinha pai e não continha a trilha, então a página passou a responder 404.

A automação publica a pasta inteira de uma vez. Nenhum caminho deste repositório sobrevive ao próximo `publish` se esses arquivos não estiverem na pasta de origem dessa automação. Inclua os arquivos acima nessa origem antes de publicar de novo.
