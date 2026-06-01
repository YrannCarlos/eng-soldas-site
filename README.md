# Eng Soldas Site

Site institucional estático da Eng Soldas, preparado para publicação como Static Site no Render.

## Estrutura

- `index.html`: página principal
- `style.css`: estilos responsivos
- `script.js`: menu mobile, WhatsApp e carregamento do catálogo
- `produtos.json`: catálogo futuro de produtos

## Deploy no Render

Tipo de serviço: Static Site

- Build Command: deixar vazio
- Publish Directory: `.`

## Como adicionar produtos futuramente

Edite o arquivo `produtos.json`:

```json
[
  {
    "nome": "Máquina MIG 250A",
    "categoria": "Máquinas de solda",
    "descricao": "Equipamento disponível para venda. Consulte disponibilidade pelo WhatsApp."
  }
]
```

Se o arquivo estiver vazio (`[]`), o site mostra uma mensagem informando que o catálogo está em preparação.
