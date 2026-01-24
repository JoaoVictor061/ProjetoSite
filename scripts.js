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
  if (itemOld) {
    itemOld.classList.remove("active");
    // Remove animation classes after a delay
    setTimeout(() => {
      itemOld.classList.remove("slide-left", "slide-right");
    }, 600);
  }

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

  // Add directional class and active class
  items[active].classList.add("slide-right");
  items[active].classList.add("active");
};

// Botão anterior
prevButton.onclick = () => {
  list.style.setProperty("--calculation", -1); // Define direção (para esquerda)

  // Volta ao fim
  active = active - 1 < firstPosition ? lastPosition : active - 1;
  setSlider();

  // Add directional class and active class
  items[active].classList.add("slide-left");
  items[active].classList.add("active");
};

/* --- THEME SWITCHER LOGIC --- */
const toggleButton = document.getElementById("theme-toggle");
const toggleIcon = toggleButton.querySelector("i");
const htmlElement = document.documentElement;

// Function to set theme
function setTheme(theme) {
  htmlElement.setAttribute("data-theme", theme);
  localStorage.setItem("theme", theme);

  // Update icon
  if (theme === "light") {
    toggleIcon.classList.remove("fa-sun");
    toggleIcon.classList.add("fa-moon");
  } else {
    toggleIcon.classList.remove("fa-moon");
    toggleIcon.classList.add("fa-sun");
  }
}

// Check local storage on load
const savedTheme = localStorage.getItem("theme");
if (savedTheme) {
  setTheme(savedTheme);
} else {
  setTheme("dark");
}

// Toggle event
toggleButton.addEventListener("click", () => {
  const currentTheme = htmlElement.getAttribute("data-theme");
  const newTheme = currentTheme === "light" ? "dark" : "light";
  setTheme(newTheme);
});

/* --- MOBILE MENU TOGGLE --- */
const menuToggle = document.getElementById("menu-toggle");
const mobileNav = document.getElementById("mobile-nav");

menuToggle.addEventListener("click", () => {
  mobileNav.classList.toggle("active");
});

// Fechar menu ao clicar em um item
mobileNav.addEventListener("click", (e) => {
  if (e.target.tagName === "LI") {
    mobileNav.classList.remove("active");
  }
});

/* --- TOUCH SUPPORT FOR CAROUSEL --- */
let startX = 0;
let endX = 0;

container.addEventListener("touchstart", (e) => {
  startX = e.touches[0].clientX;
});

container.addEventListener("touchend", (e) => {
  endX = e.changedTouches[0].clientX;
  handleSwipe();
});

function handleSwipe() {
  const diffX = startX - endX;
  const threshold = 50; // Minimum swipe distance

  if (Math.abs(diffX) > threshold) {
    if (diffX > 0) {
      // Swipe left - next
      nextButton.click();
    } else {
      // Swipe right - prev
      prevButton.click();
    }
  }
}
