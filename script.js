const WHATSAPP_URL =
  "https://wa.me/5516994017360?text=Ol%C3%A1%2C%20gostaria%20de%20reservar%20uma%20mesa%20na%20King%20Club%20Lounge.";

const menu = [
  {
    id: "bebidas",
    title: "Bebidas",
    wide: true,
    items: [
      { name: "Água sem gás", description: "510ml", price: "R$ 5,00" },
      { name: "Água com gás", description: "510ml", price: "R$ 5,00" },
      { name: "Água de coco", price: "R$ 7,00" },
      { name: "Refrigerante lata", description: "350ml", price: "R$ 7,00" },
      { name: "Citrus", description: "350ml", price: "R$ 7,00" },
      { name: "Água Tônica", price: "R$ 5,00" },
      { name: "Água Tônica Zero", price: "R$ 5,00" },
      { name: "Suco Del Valle", price: "R$ 6,00" },
      { group: "Energéticos", name: "Red Bull Sabores", description: "250ml", price: "R$ 18,00" },
      { name: "Monster Sabores", description: "473ml", price: "R$ 18,00" },
    ],
  },
  {
    id: "cervejas",
    title: "Cervejas",
    items: [
      { name: "Heineken Long Neck", price: "R$ 15,00" },
      { name: "Budweiser Long Neck", price: "R$ 13,00" },
      { name: "Skol Beats", price: "R$ 15,00" },
      { name: "Smirnoff Ice", price: "R$ 15,00" },
    ],
  },
  {
    id: "baldes",
    title: "Baldes",
    items: [
      { name: "Balde Heineken", description: "6 unidades de 330ml", price: "R$ 80,00" },
      { name: "Balde Budweiser", description: "6 unidades de 330ml", price: "R$ 65,00" },
      { name: "Balde Misto", description: "3 Heineken 330ml + 3 Budweiser 330ml", price: "R$ 75,00" },
    ],
  },
  {
    id: "caipirinhas",
    title: "Caipirinhas",
    items: [
      {
        name: "Caipirinha",
        description: "Base: Cachaça, Vodka ou Sakê. Sabores: Limão, Morango ou Maracujá",
        price: "R$ 30,00",
        featured: true,
      },
    ],
  },
  {
    id: "copoes",
    title: "Copões",
    items: [
      { name: "Vodka Smirnoff", price: "R$ 30,00" },
      { name: "White Horse", price: "R$ 25,00" },
      { name: "Red Label", price: "R$ 30,00" },
      { name: "Jack Daniel's", price: "R$ 45,00" },
      { name: "Gin Eternity", price: "R$ 20,00" },
      { name: "Catuaba", price: "R$ 20,00" },
    ],
  },
  {
    id: "doses",
    title: "Doses",
    items: [
      { name: "Campari", description: "50ml", price: "R$ 15,00" },
      { name: "Tequila", description: "50ml", price: "R$ 18,00" },
    ],
  },
  {
    id: "combos",
    title: "Combos",
    note: "Todos os combos acompanham 4 energéticos, gelo e copos.",
    wide: true,
    items: [
      { name: "Combo Catuaba", description: "900ml", price: "R$ 110,00" },
      { name: "Combo Smirnoff", description: "998ml", price: "R$ 190,00" },
      { name: "Combo Gin Eternity", description: "1L", price: "R$ 90,00" },
      { name: "Combo Absolut", description: "1L", price: "R$ 230,00" },
      { name: "Combo White Horse", description: "1L", price: "R$ 230,00" },
      { name: "Combo Red Label", description: "1L", price: "R$ 280,00" },
      { name: "Combo Black Label", description: "1L", price: "R$ 320,00" },
      { name: "Combo Jack Daniel's", description: "1L", price: "R$ 320,00" },
    ],
  },
  {
    id: "petiscos",
    title: "Petiscos",
    items: [
      { name: "Amendoim", price: "R$ 5,00" },
      { name: "Gelo de Sabor", price: "R$ 5,00" },
      { name: "Sessão Completa", price: "R$ 40,00" },
      { name: "Palheiro solto", price: "R$ 3,00" },
      { name: "Maço de Palheiro", description: "Consultar sabores", price: "R$ 20,00" },
    ],
  },
];

const tabs = document.querySelector("#categoryTabs");
const root = document.querySelector("#menuRoot");
const searchInput = document.querySelector("#searchInput");
const reserveButton = document.querySelector("#reserveButton");
const emptyState = document.querySelector("#emptyState");

reserveButton.href = WHATSAPP_URL;

function normalize(text) {
  return text
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "");
}

function renderTabs() {
  tabs.innerHTML = menu
    .map(
      (section) => `
        <button class="tab" type="button" data-target="${section.id}">
          ${section.title}
        </button>
      `,
    )
    .join("");
}

function itemMatches(item, query) {
  if (!query) return true;
  const searchable = normalize(`${item.name} ${item.description || ""} ${item.group || ""}`);
  return searchable.includes(query);
}

function renderMenu(filter = "") {
  const query = normalize(filter.trim());
  let visibleCount = 0;

  root.innerHTML = menu
    .map((section) => {
      const items = section.items.filter((item) => itemMatches(item, query));
      if (!items.length) return "";

      visibleCount += items.length;
      let currentGroup = "";
      const cards = items
        .map((item) => {
          const group =
            item.group && item.group !== currentGroup
              ? `<div class="group-label">${item.group}</div>`
              : "";
          if (item.group) currentGroup = item.group;

          return `
            ${group}
            <article class="item ${item.featured ? "featured" : ""}">
              <div>
                <h3>${item.name}</h3>
                ${item.description ? `<p>${item.description}</p>` : ""}
              </div>
              <strong class="price">${item.price}</strong>
            </article>
          `;
        })
        .join("");

      return `
        <section class="section ${section.wide ? "wide" : ""}" id="${section.id}">
          <div class="section-head">
            <h2 class="section-title">${section.title}</h2>
            <span class="section-meta">${items.length} itens</span>
          </div>
          ${section.note ? `<p class="section-note">${section.note}</p>` : ""}
          <div class="item-list">${cards}</div>
        </section>
      `;
    })
    .join("");

  emptyState.hidden = visibleCount > 0;
}

function setActive(targetId) {
  document.querySelectorAll(".tab").forEach((button) => {
    button.classList.toggle("is-active", button.dataset.target === targetId);
  });
}

renderTabs();
renderMenu();
setActive(menu[0].id);

tabs.addEventListener("click", (event) => {
  const button = event.target.closest(".tab");
  if (!button) return;
  const section = document.getElementById(button.dataset.target);
  if (!section) return;
  searchInput.value = "";
  renderMenu();
  requestAnimationFrame(() => {
    document.getElementById(button.dataset.target)?.scrollIntoView({ behavior: "smooth", block: "start" });
    setActive(button.dataset.target);
  });
});

searchInput.addEventListener("input", (event) => {
  renderMenu(event.target.value);
});

const observer = new IntersectionObserver(
  (entries) => {
    const visible = entries
      .filter((entry) => entry.isIntersecting)
      .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
    if (visible) setActive(visible.target.id);
  },
  { rootMargin: "-42% 0px -48% 0px", threshold: [0.1, 0.25, 0.5] },
);

menu.forEach((section) => {
  const target = document.getElementById(section.id);
  if (target) observer.observe(target);
});
