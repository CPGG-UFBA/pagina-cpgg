# 🎯 Guia de Design Responsivo - Sistema Anti-Sobreposição

Este guia explica como usar o sistema de design responsivo que **previne sobreposição de elementos** em qualquer resolução.

---

## 📋 Índice

1. [Princípios Fundamentais](#princípios-fundamentais)
2. [Z-Index Hierarchy](#z-index-hierarchy)
3. [Classes Utilitárias](#classes-utilitárias)
4. [Exemplos Práticos](#exemplos-práticos)
5. [Anti-Patterns (O que EVITAR)](#anti-patterns)

---

## 🎯 Princípios Fundamentais

### 1. **Use Valores Relativos ao Invés de Fixos**
```css
/* ❌ EVITE */
.box {
  width: 600px;
  padding: 20px;
  font-size: 16px;
}

/* ✅ CORRETO */
.box {
  width: clamp(300px, 90vw, 600px);
  padding: clamp(1rem, 3vw, 2rem);
  font-size: clamp(1rem, 3vw, 1.125rem);
}
```

### 2. **Prefira Flexbox/Grid ao Invés de Position Absolute**
```css
/* ❌ EVITE */
.container {
  position: relative;
}
.box1 {
  position: absolute;
  top: 100px;
  left: 50px;
}
.box2 {
  position: absolute;
  top: 200px; /* Pode sobrepor box1 */
}

/* ✅ CORRETO */
.container {
  display: flex;
  flex-direction: column;
  gap: clamp(1rem, 3vw, 2rem); /* Espaço automático */
}
```

### 3. **Use Z-Index da Hierarchy Definida**
```tsx
/* ❌ EVITE */
<div style={{ zIndex: 999999 }}>

/* ✅ CORRETO */
<div className="z-dropdown"> {/* z-index: 100 */}
<div className="z-modal"> {/* z-index: 9999 */}
```

---

## 🎨 Z-Index Hierarchy

| Nome | Valor | Uso |
|------|-------|-----|
| `z-background` | 0 | Backgrounds e decorações |
| `z-base` | 1 | Conteúdo base |
| `z-content` | 10 | Boxes, cards, conteúdo principal |
| `z-dropdown` | 100 | Dropdowns e selects |
| `z-sticky` | 500 | Headers/footers sticky |
| `z-fixed` | 1000 | Elementos fixos na tela |
| `z-modal-backdrop` | 9000 | Backdrop de modais |
| `z-modal` | 9999 | Conteúdo do modal |
| `z-popover` | 10000 | Popovers e tooltips |
| `z-tooltip` | 10001 | Tooltips específicos |
| `z-notification` | 10002 | Notificações/Toasts |

**Em Tailwind:**
```tsx
<div className="z-dropdown">
<div className="z-modal">
```

---

## 🛠️ Classes Utilitárias

### 📦 Containers

#### `responsive-container`
Container principal com limites responsivos.
```tsx
<div className="responsive-container">
  {/* Conteúdo */}
</div>
```

#### `content-wrapper`
Wrapper com scroll seguro.
```tsx
<div className="content-wrapper">
  {/* Conteúdo scrollável */}
</div>
```

### 🎁 Boxes

#### `responsive-box`
Box com tamanho fluido.
```tsx
<div className="responsive-box glass-box">
  {/* 300px-600px width, padding responsivo */}
</div>
```

#### `glass-box`
Efeito glassmorphism.
```tsx
<div className="glass-box">
  {/* Borda semi-transparente + blur */}
</div>
```

### 📝 Tipografia

```tsx
<h1 className="text-responsive-2xl">Título Principal</h1>
<h2 className="text-responsive-xl">Subtítulo</h2>
<p className="text-responsive-base">Parágrafo</p>
<small className="text-responsive-sm">Texto pequeno</small>
```

| Classe | Tamanho (min → max) |
|--------|---------------------|
| `text-responsive-xs` | 0.75rem → 0.875rem |
| `text-responsive-sm` | 0.875rem → 1rem |
| `text-responsive-base` | 1rem → 1.125rem |
| `text-responsive-lg` | 1.125rem → 1.5rem |
| `text-responsive-xl` | 1.5rem → 2rem |
| `text-responsive-2xl` | 2rem → 3rem |

### 📏 Espaçamentos

```tsx
<div className="spacing-md">
  {/* margin-block responsivo */}
</div>
```

| Classe | Espaçamento (min → max) |
|--------|------------------------|
| `spacing-xs` | 0.25rem → 0.5rem |
| `spacing-sm` | 0.5rem → 1rem |
| `spacing-md` | 1rem → 2rem |
| `spacing-lg` | 2rem → 4rem |
| `spacing-xl` | 3rem → 6rem |

### 🔲 Layout

#### Flex Safe
```tsx
<div className="flex-safe">
  <div>Item 1</div>
  <div>Item 2</div>
  {/* Gaps automáticos, wrap habilitado */}
</div>

<div className="flex-safe-column">
  <div>Item 1</div>
  <div>Item 2</div>
  {/* Coluna com gaps */}
</div>
```

#### Grid Safe
```tsx
<div className="grid-safe">
  <div>Item 1</div>
  <div>Item 2</div>
  <div>Item 3</div>
  {/* Grid auto-fit, min 300px */}
</div>
```

### 🖼️ Imagens

```tsx
{/* Imagem que se adapta ao container */}
<img src="..." className="responsive-image" />

{/* Imagem que preenche com crop */}
<img src="..." className="responsive-image-cover" />
```

### 📸 Galeria

```tsx
<div className="responsive-gallery">
  <img src="image1.jpg" />
  <img src="image2.jpg" />
  <img src="image3.jpg" />
  {/* Grid auto-fit com min 250px */}
</div>
```

---

## 💡 Exemplos Práticos

### Exemplo 1: Box de Conteúdo

**Antes (com sobreposição):**
```tsx
<div className="Professor">
  <div style={{
    position: 'absolute',
    width: '950px',
    height: '500px',
    top: '20%',
    left: '2%',
  }}>
    Conteúdo
  </div>
</div>
```

**Depois (responsivo e seguro):**
```tsx
<div className="Professor responsive-container">
  <div className="responsive-box glass-box custom-scrollbar">
    <h1 className="text-responsive-xl">Título</h1>
    <p className="text-responsive-base">Conteúdo</p>
  </div>
</div>
```

### Exemplo 2: Modal

```tsx
function Modal({ isOpen, children }) {
  if (!isOpen) return null;
  
  return (
    <>
      <div className="modal-backdrop" />
      <div className="modal-content custom-scrollbar">
        {children}
      </div>
    </>
  );
}
```

### Exemplo 3: Dropdown

```tsx
<div className="relative-context">
  <button>Open Menu</button>
  <div className="dropdown-content">
    <a href="#">Item 1</a>
    <a href="#">Item 2</a>
  </div>
</div>
```

### Exemplo 4: Galeria de Fotos

```tsx
<section className="responsive-container">
  <h2 className="text-responsive-xl spacing-md">Galeria</h2>
  <div className="responsive-gallery">
    <img src="foto1.jpg" alt="Foto 1" className="responsive-image" />
    <img src="foto2.jpg" alt="Foto 2" className="responsive-image" />
    <img src="foto3.jpg" alt="Foto 3" className="responsive-image" />
  </div>
</section>
```

---

## ⚠️ Anti-Patterns (O que EVITAR)

### ❌ 1. Position Absolute Desnecessário

**Problema:**
```css
.box {
  position: absolute;
  top: 100px;
  left: 50px;
  /* Pode sobrepor outros elementos */
}
```

**Solução:** Use flexbox/grid com gaps
```css
.container {
  display: flex;
  gap: 2rem;
}
```

### ❌ 2. Larguras Fixas

**Problema:**
```css
.box {
  width: 600px; /* Quebra em mobile */
}
```

**Solução:** Use clamp ou max-width
```css
.box {
  width: clamp(300px, 90vw, 600px);
  /* OU */
  max-width: 600px;
  width: 100%;
}
```

### ❌ 3. Z-Index Aleatórios

**Problema:**
```tsx
<div style={{ zIndex: 99999 }}>
<div style={{ zIndex: 1000000 }}>
```

**Solução:** Use a hierarchy definida
```tsx
<div className="z-modal">
<div className="z-dropdown">
```

### ❌ 4. Overflow Oculto em Containers Pai

**Problema:**
```css
.container {
  overflow: hidden; /* Esconde dropdowns */
}
.dropdown {
  position: absolute;
  /* Será cortado pelo overflow: hidden */
}
```

**Solução:** Use portais ou ajuste hierarchy
```tsx
import { createPortal } from 'react-dom';

function Dropdown() {
  return createPortal(
    <div className="dropdown-content">...</div>,
    document.body
  );
}
```

### ❌ 5. Height: 100vh em Elementos Aninhados

**Problema:**
```css
.container {
  height: 100vh;
}
.child {
  height: 100vh; /* Cria scroll duplo */
}
```

**Solução:** Use flex: 1 ou max-height
```css
.container {
  display: flex;
  flex-direction: column;
  height: 100vh;
}
.child {
  flex: 1;
  overflow-y: auto;
}
```

---

## 📱 Breakpoints

| Nome | Tamanho | Uso Típico |
|------|---------|------------|
| `xs` | 400px | Mobile muito pequeno |
| `sm` | 640px | Mobile |
| `md` | 768px | Tablet portrait |
| `lg` | 1024px | Tablet landscape / Desktop pequeno |
| `xl` | 1280px | Desktop |
| `2xl` | 1400px | Desktop grande |

**Em Tailwind:**
```tsx
<div className="w-full sm:w-1/2 lg:w-1/3">
  {/* Mobile: 100%, Tablet: 50%, Desktop: 33% */}
</div>
```

---

## ✅ Checklist de Revisão

Antes de commitar código, verifique:

- [ ] Nenhum `position: absolute` desnecessário
- [ ] Todos os z-index usam a hierarchy definida
- [ ] Larguras usam clamp() ou max-width
- [ ] Textos usam classes text-responsive-*
- [ ] Espaçamentos usam classes spacing-* ou gap
- [ ] Imagens têm responsive-image ou responsive-image-cover
- [ ] Containers scrolláveis têm custom-scrollbar
- [ ] Modais usam modal-backdrop + modal-content
- [ ] Dropdowns usam dropdown-content com z-index correto
- [ ] Testado em mobile, tablet e desktop

---

## 🎯 Resumo

**3 Regras de Ouro:**

1. **Use valores fluidos (clamp)** ao invés de fixos
2. **Prefira flexbox/grid** ao invés de position absolute
3. **Siga a z-index hierarchy** definida

Seguindo essas regras, **elementos NUNCA se sobreporão** e o site funcionará perfeitamente em qualquer resolução! 🚀
