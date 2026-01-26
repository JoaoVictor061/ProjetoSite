# 🚀 Guia Rápido - CSS Modular

## Estrutura do Projeto

```
ProjetoSite/
├── css/
│   ├── 01-variables.css       ⚙️ Config global
│   ├── 02-reset.css           🔄 Reset
│   ├── 03-utilities.css       🛠️ Utils
│   ├── 04-header.css          📌 Header
│   ├── 05-hero.css            🎬 Hero
│   ├── 06-services.css        🎨 Serviços
│   ├── 07-about.css           ℹ️ Sobre
│   ├── 08-footer.css          📍 Footer
│   ├── 09-floating-buttons.css 🔘 Botões
│   └── 10-responsive.css      📱 Mobile
└── styles.css                 📥 Imports
```

---

## Variáveis Principais (01-variables.css)

### Cores
```css
--color-primary: #ffd93d;        /* Amarelo */
--color-secondary: #A8A9AD;      /* Cinza */
--color-whatsapp: #25D366;       /* Verde */
```

### Espaçamento
```css
--spacing-sm: 10px;
--spacing-md: 15px;
--spacing-lg: 20px;
--spacing-xl: 30px;
--spacing-2xl: 40px;
--spacing-3xl: 60px;
--spacing-4xl: 80px;
```

### Transições
```css
--transition-fast: 0.3s ease;
--transition-normal: 0.5s ease;
--transition-slow: 0.8s ease;
```

---

## Classes Utilitárias (03-utilities.css)

```html
<!-- Botão -->
<button class="btn">Clique aqui</button>

<!-- Container centralizado -->
<div class="container-align">Conteúdo</div>

<!-- Texto com gradiente -->
<h1 class="gradient-text">Título</h1>

<!-- Spacing -->
<div class="mt-3 mb-2">Espaçamento</div>

<!-- Visibilidade -->
<div class="hidden">Escondido em mobile</div>
```

---

## Adicionar Novo Estilo

### Opção 1: Usar Variáveis Existentes
```css
/* Em qualquer arquivo */
.novo-elemento {
  color: var(--color-primary);
  padding: var(--spacing-lg);
  transition: all var(--transition-fast);
}
```

### Opção 2: Criar Nova Variável
```css
/* Em 01-variables.css */
:root {
  --nova-cor: #123456;
  --novo-espaço: 25px;
}

/* Em outro arquivo */
.novo-elemento {
  color: var(--nova-cor);
  padding: var(--novo-espaço);
}
```

### Opção 3: Novo Componente
```css
/* Criar arquivo 11-novo-componente.css */

.novo-componente {
  background: var(--bg-surface);
  padding: var(--spacing-lg);
  border-radius: var(--border-radius-md);
  transition: all var(--transition-fast);
}

.novo-componente:hover {
  background: var(--color-primary);
  transform: scale(1.05);
}
```

Depois adicionar em `styles.css`:
```css
@import url("./css/11-novo-componente.css");
```

---

## Temas (Dark/Light)

### Automático
```html
<html data-theme="light"> <!-- ou "dark" -->
  ...
</html>
```

### Variáveis do Tema
```css
/* 01-variables.css */
[data-theme="light"] {
  --bg-body: #fff;
  --text-main: #1A1A1B;
}

[data-theme="dark"] {
  --bg-body: #0f0f10;
  --text-main: #e0e0e0;
}
```

---

## Responsividade (10-responsive.css)

### Breakpoints
```css
/* Mobile: até 480px */
@media (max-width: 480px) {
  ...
}

/* Tablet: até 768px */
@media (max-width: 768px) {
  ...
}

/* Desktop: até 1024px */
@media (max-width: 1024px) {
  ...
}

/* Grande: 1440px+ */
@media (min-width: 1440px) {
  ...
}
```

### Mobile-First (Recomendado)
```css
/* Base: Mobile */
.elemento {
  font-size: 1rem;
  padding: 10px;
}

/* Tablet em diante */
@media (min-width: 768px) {
  .elemento {
    font-size: 1.2rem;
    padding: 20px;
  }
}
```

---

## Animações

### Disponíveis em 03-utilities.css
```css
@keyframes fadeInUp       /* Fade in para cima */
@keyframes slideInFromRight /* Slide da direita */
@keyframes slideInFromLeft  /* Slide da esquerda */
@keyframes zoomIn          /* Zoom */
@keyframes gradientShift   /* Gradient animado */
```

### Usar em Componente
```css
.elemento {
  animation: fadeInUp 0.6s ease forwards;
}

.elemento {
  animation: slideInFromRight 0.6s cubic-bezier(0.4, 0, 0.2, 1);
}
```

---

## Exemplo Completo: Novo Card

### HTML
```html
<div class="card">
  <img src="imagem.jpg" alt="Descrição">
  <div class="card__content">
    <h3>Título</h3>
    <p>Descrição do card</p>
    <a href="#" class="btn">Saiba mais</a>
  </div>
</div>
```

### CSS (11-card.css)
```css
.card {
  background: var(--bg-surface);
  border-radius: var(--border-radius-md);
  overflow: hidden;
  transition: all var(--transition-fast);
  border: var(--border-width) solid var(--border-color);
  box-shadow: var(--shadow-sm);
}

.card:hover {
  transform: translateY(-5px);
  box-shadow: var(--shadow-md);
}

.card img {
  width: 100%;
  height: 200px;
  object-fit: cover;
  transition: transform var(--transition-fast);
}

.card:hover img {
  transform: scale(1.05);
}

.card__content {
  padding: var(--spacing-lg);
}

.card__content h3 {
  color: var(--text-main);
  margin-bottom: var(--spacing-md);
  font-weight: var(--font-weight-bold);
}

.card__content p {
  color: var(--text-muted);
  margin-bottom: var(--spacing-lg);
}

/* Mobile */
@media (max-width: 768px) {
  .card img {
    height: 150px;
  }
  
  .card__content {
    padding: var(--spacing-md);
  }
}
```

### Importar em styles.css
```css
@import url("./css/11-card.css");
```

---

## Debug & Validação

### Listar Variáveis Usadas
```bash
# No navegador - DevTools
> getComputedStyle(document.documentElement).getPropertyValue('--color-primary')
# Output: #ffd93d
```

### Verificar Responsive
```bash
# Chrome DevTools: F12 → Toggle Device Toolbar (Ctrl+Shift+M)
```

### Validar CSS
```bash
# https://jigsaw.w3.org/css-validator/
```