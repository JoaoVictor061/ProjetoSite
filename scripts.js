let prevButton = document.getElementById("prev");      // Botão anterior
let nextButton = document.getElementById("next");      // Botão próximo
let container = document.querySelector(".container"); // Container principal
let items = container.querySelectorAll(".list .item"); // Todos os itens
let indicator = document.querySelector(".indicators"); // Indicadores
let dots = indicator.querySelectorAll("ul li");       // Bolinhas de progresso
let list = container.querySelector(".list");          // Lista de items

let active = 0;                      // Index do item ativo
let firstPosition = 0;               // Primeira posição (0)
let lastPosition = items.length - 1; // Última posição

// Função para atualizar indicadores
function setSlider() {
  // Remove classe ativa do item anterior
  let itemOld = container.querySelector(".list .item.active");
  itemOld.classList.remove("active");

  // Remove classe ativa da bolinha anterior
  let dotsOld = indicator.querySelector("ul li.active");
  dotsOld.classList.remove("active");
  dots[active].classList.add("active");

  indicator.querySelector(".number").innerHTML = "0" + (active + 1);
}

// Botão próximo
nextButton.onclick = () => {
  list.style.setProperty("--calculation", 1);  // Define direção (para direita)

  // Volta ao início
  active = active + 1 > lastPosition ? 0 : active + 1;
  setSlider();
  items[active].classList.add("active");
};

// Botão anterior
prevButton.onclick = () => {
  list.style.setProperty("--calculation", -1); // Define direção (para esquerda)

  // Volta ao fim
  active = active - 1 < firstPosition ? lastPosition : active - 1;
  setSlider();
  items[active].classList.add("active");
};
