let prevButton = document.getElementById("prev");      // Botão anterior
let nextButton = document.getElementById("next");      // Botão próximo
let container = document.querySelector(".container"); // Container principal

if (container) {
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
}

/* --- THEME SWITCHER LOGIC --- */
document.addEventListener("DOMContentLoaded", () => {
  const toggleButton = document.getElementById("theme-toggle");
  const toggleButtonInline = document.getElementById("theme-toggle-inline");
  const htmlElement = document.documentElement;

  // Function to set theme
  function setTheme(theme) {
    htmlElement.setAttribute("data-theme", theme);
    localStorage.setItem("theme", theme);

    // Update all icons
    const allToggles = document.querySelectorAll(".theme-toggle i, .theme-toggle-inline i");
    allToggles.forEach(icon => {
      if (theme === "light") {
        icon.classList.remove("fa-sun");
        icon.classList.add("fa-moon");
      } else {
        icon.classList.remove("fa-moon");
        icon.classList.add("fa-sun");
      }
    });
  }

  // Check local storage on load
  // Comentado para forçar dark mode sempre
  // const savedTheme = localStorage.getItem("theme");
  // if (savedTheme) {
  //   setTheme(savedTheme);
  // } else {
  //   setTheme("dark");
  // }

  // Força sempre dark mode ao carregar
  setTheme("dark");

  // Toggle events for both buttons
  if (toggleButton) {
    toggleButton.addEventListener("click", () => {
      const currentTheme = htmlElement.getAttribute("data-theme");
      const newTheme = currentTheme === "light" ? "dark" : "light";
      setTheme(newTheme);
    });
  }

  if (toggleButtonInline) {
    toggleButtonInline.addEventListener("click", (e) => {
      e.stopPropagation();
      const currentTheme = htmlElement.getAttribute("data-theme");
      const newTheme = currentTheme === "light" ? "dark" : "light";
      setTheme(newTheme);
    });
  }
});

/* --- MOBILE MENU TOGGLE --- */
const menuToggleBtn = document.getElementById("menu-toggle");
const menuToggleText = document.getElementById("menu-toggle-text");
const mobileNav = document.getElementById("mobile-nav");

// Handle both hamburger and text menu buttons
function toggleMenu() {
  mobileNav.classList.toggle("active");
  // Add animation to hamburger icon if it exists
  if (menuToggleBtn && menuToggleBtn.classList.contains("menu-hamburger")) {
    menuToggleBtn.classList.toggle("active");
  }
}

if (menuToggleBtn) {
  menuToggleBtn.addEventListener("click", toggleMenu);
}

if (menuToggleText) {
  menuToggleText.addEventListener("click", toggleMenu);
}

// Fechar menu ao clicar em um item
if (mobileNav) {
  const menuItems = mobileNav.querySelectorAll("a");
  menuItems.forEach(item => {
    item.addEventListener("click", () => {
      mobileNav.classList.remove("active");
      // Remove hamburger animation
      if (menuToggleBtn && menuToggleBtn.classList.contains("menu-hamburger")) {
        menuToggleBtn.classList.remove("active");
      }
      // Remove menu-text animation if it exists
      if (menuToggleText) {
        menuToggleText.classList.remove("active");
      }
    });
  });
}

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
