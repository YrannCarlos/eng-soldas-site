"use strict";

const company = {
  whatsapp: "5542999802414",
  whatsappMessage:
    "Olá, vim pelo site da Eng Soldas e gostaria de solicitar um orçamento.",
};

function getWhatsappUrl(message = company.whatsappMessage) {
  const number = String(company.whatsapp || "").replace(/\D/g, "");
  return `https://wa.me/${number}?text=${encodeURIComponent(message)}`;
}

function setupWhatsappLinks() {
  document.querySelectorAll(".whatsapp-link").forEach((link) => {
    link.href = getWhatsappUrl();
  });
}

function setupMenu() {
  const button = document.querySelector(".menu-toggle");
  const links = document.querySelectorAll(".nav-links a");
  if (!button) return;

  button.addEventListener("click", () => {
    const isOpen = document.body.classList.toggle("menu-open");
    button.setAttribute("aria-expanded", String(isOpen));
  });

  links.forEach((link) => {
    link.addEventListener("click", () => {
      document.body.classList.remove("menu-open");
      button.setAttribute("aria-expanded", "false");
    });
  });
}

function productIcon(category = "") {
  const text = String(category).toLowerCase();
  if (text.includes("solda")) return "🔥";
  if (text.includes("gerador")) return "⚙️";
  if (text.includes("elétr") || text.includes("eletr")) return "⚡";
  if (text.includes("ferrament")) return "🛠️";
  return "🏭";
}

function createEmptyProductsMessage() {
  const div = document.createElement("div");
  div.className = "empty-products";
  div.innerHTML = `
    <strong>Catálogo em preparação.</strong>
    <p>Em breve, a Eng Soldas poderá anunciar aqui máquinas de solda, geradores, ferramentas elétricas e equipamentos disponíveis para venda ou locação.</p>
  `;
  return div;
}

function createProductCard(product) {
  const card = document.createElement("article");
  card.className = "product-card";

  const name = product.nome || "Produto";
  const category = product.categoria || "Equipamento";
  const description = product.descricao || "Consulte disponibilidade e condições pelo WhatsApp.";
  const buttonMessage = `Olá, vim pelo site da Eng Soldas e gostaria de saber mais sobre: ${name}.`;

  card.innerHTML = `
    <div class="product-image" aria-hidden="true">${productIcon(category)}</div>
    <div class="product-card-content">
      <span class="product-tag">${category}</span>
      <h3>${name}</h3>
      <p>${description}</p>
      <a class="inline-link" href="${getWhatsappUrl(buttonMessage)}" target="_blank" rel="noopener">Consultar disponibilidade →</a>
    </div>
  `;

  return card;
}

async function loadProducts() {
  const grid = document.getElementById("productGrid");
  if (!grid) return;

  try {
    const response = await fetch("produtos.json", { cache: "no-store" });
    const products = await response.json();
    grid.innerHTML = "";

    if (!Array.isArray(products) || products.length === 0) {
      grid.appendChild(createEmptyProductsMessage());
      return;
    }

    products.forEach((product) => grid.appendChild(createProductCard(product)));
  } catch (_error) {
    grid.innerHTML = "";
    grid.appendChild(createEmptyProductsMessage());
  }
}

function setupYear() {
  const year = document.getElementById("currentYear");
  if (year) year.textContent = String(new Date().getFullYear());
}

setupWhatsappLinks();
setupMenu();
setupYear();
loadProducts();
