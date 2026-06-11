
import fs from "node:fs";

const required = [
  "index.html",
  "style.css",
  "script.js",
  "produtos.json",
  "server.js",
  "assets/bambina-tig-300.jpg",
  "assets/painel-eletrico.jpg",
  "assets/mig-esab.jpg",
  "assets/gerador-elite8000.jpg",
  "assets/maquina-plasma.jpg",
  "assets/ferramentas-eletricas.jpg",
  "assets/gerador-de-solda.jpg",
  "assets/tochas-mig-plasma.jpg",
  "assets/garra-terra.jpg",
  "assets/maquina-inversora.jpg",
  "assets/maquina-tig.jpg",
  "assets/tig-acdc.jpg"
];

for (const file of required) {
  if (!fs.existsSync(file)) throw new Error(`Arquivo ausente: ${file}`);
}

const products = JSON.parse(fs.readFileSync("produtos.json", "utf8"));
if (!Array.isArray(products) || products.length !== 12) {
  throw new Error("Esperado catálogo com 12 produtos.");
}

for (const product of products) {
  if (!product.imagem || !fs.existsSync(product.imagem)) {
    throw new Error(`Imagem ausente para ${product.nome}`);
  }
  const size = fs.statSync(product.imagem).size;
  if (size < 8000) {
    throw new Error(`Imagem pequena demais para ${product.nome}: ${size} bytes`);
  }
}

const allText = ["index.html", "style.css", "script.js", "produtos.json"]
  .map((file) => fs.readFileSync(file, "utf8"))
  .join("\n");

if (allText.includes("source.unsplash") || allText.includes("commons.wikimedia.org")) {
  throw new Error("Ainda existem imagens externas antigas.");
}

if (allText.toLowerCase().includes("reorganizado")) {
  throw new Error("Texto proibido encontrado.");
}

if (fs.existsSync("node_modules")) {
  throw new Error("node_modules nao deve ir no pacote.");
}

console.log("Validação OK: imagens locais ampliadas e catálogo com 12 produtos.");
