/* =========================
   DOM: Carousel
========================= */
const carousel = document.querySelector("[data-carousel]");
const slides = Array.from(carousel.querySelectorAll(".carousel__slide"));
const prevBtn = carousel.querySelector("[data-prev]");
const nextBtn = carousel.querySelector("[data-next]");

/* =========================
   DOM: Amount / Counter
========================= */
const minusBtn = document.querySelector("[data-minus]");
const plusBtn = document.querySelector("[data-plus]");
const amountCount = document.querySelector("[data-amount]");

/* =========================
   DOM: Menu
========================= */
const menuBtn = document.querySelector(".nav-toggle");
const menu = document.querySelector(".menu");

/* =========================
   DOM: Cart
========================= */
const cartSum = document.querySelector(".cart__sum");
const itemQuantity = document.querySelector(".cart__item__quantity");
const deleteItem = document.querySelector(".cart__items__delete");
const cartEmpty = document.querySelector(".cart__empty");
const cartItemsUI = document.querySelector(".cart__items");
const cartInfo = document.querySelector("#cart-info");
const cartDisplay = document.querySelector(".cart");
const cartIcon = document.querySelector(".cart-button");
const cartBtn = document.querySelector("[data-cart]");

/* =========================
   DOM: Product
========================= */
const productEl = document.querySelector(".product-content");
const productId = productEl.dataset.productId;
const price = Number(productEl.dataset.productPrice);
const title = productEl.dataset.productTitle;

/* =========================
   State
========================= */
let index = slides.findIndex((s) => s.classList.contains("is-active"));
if (index === -1) index = 0;

// Amount
let amount = 0;
const cartItems = [];

/* =========================
   Carousel logic
========================= */
function setActive(newIndex) {
  slides[index].classList.remove("is-active");
  slides[index].setAttribute("aria-hidden", "true");

  index = newIndex;

  slides[index].classList.add("is-active");
  slides[index].setAttribute("aria-hidden", "false");
}

function prev() {
  const nextIndex = (index - 1 + slides.length) % slides.length;
  setActive(nextIndex);
}

function next() {
  const nextIndex = (index + 1) % slides.length;
  setActive(nextIndex);
}

/* =========================
   Amount logic
========================= */
function showAmount() {
  amountCount.textContent = amount;
  minusBtn.disabled = amount === 0;
}

function minus() {
  if (amount === 0) return;
  amount--;
  showAmount();
}

function plus() {
  amount++;
  showAmount();
}

/* =========================
   Cart logic
========================= */
function addToCart() {
  if (amount === 0) return;

  const existingItem = cartItems.find((item) => item.id === productId);

  if (existingItem) {
    existingItem.quantity += amount;
  } else {
    cartItems.push({
      id: productId,
      title,
      price,
      quantity: amount,
    });
  }
}

function renderCart() {
  if (cartItems.length === 0) {
    renderEmptyCart();
  } else {
    renderItems();
  }
}

function showCart() {
  cartDisplay.hidden = !cartDisplay.hidden;
  cartIcon.setAttribute("aria-expanded", String(!cartDisplay.hidden));

  if (cartItems.length === 0) {
    renderEmptyCart();
    return;
  } else {
    renderItems();
  }
}

function renderEmptyCart() {
  cartEmpty.hidden = false;
  cartItemsUI.hidden = true;
  cartInfo.textContent = "Your cart is empty.";
}

function renderItems() {
  cartEmpty.hidden = true;
  cartItemsUI.hidden = false;

  itemQuantity.textContent = cartItems[0].quantity;

  const sum = cartItems[0].quantity * cartItems[0].price;
  cartSum.textContent = `$${sum}`;
}

function clearCart() {
  cartItems.length = 0;
  console.log(cartItems);
  renderCart();
}

/* =========================
   Menu logic
========================= */
function showMenu() {
  menu.hidden = !menu.hidden;

  if (menu.hidden) {
    menuBtn.classList.remove("is-open");
    menuBtn.setAttribute("aria-expanded", "false");
  } else {
    menuBtn.classList.add("is-open");
    menuBtn.setAttribute("aria-expanded", "true");
  }
}

/* =========================
   Events
========================= */
prevBtn.addEventListener("click", prev);
nextBtn.addEventListener("click", next);

menuBtn.addEventListener("click", showMenu);

plusBtn.addEventListener("click", plus);
minusBtn.addEventListener("click", minus);

deleteItem.addEventListener("click", clearCart);

cartBtn.addEventListener("click", () => {
  addToCart();
  renderCart();
});

cartIcon.addEventListener("click", showCart);



function screenCheck() {
  const isDesktop = window.innerWidth >= 1024;

  if (isDesktop) {
    // Desktop-Modus
    menu.hidden = false;
    menuBtn.classList.remove("is-open");
    menuBtn.setAttribute("aria-expanded", "false");
  } else {
    // Mobile-Modus (Startzustand: zu)
    menu.hidden = true;
    menuBtn.classList.remove("is-open");
    menuBtn.setAttribute("aria-expanded", "false");
  }
}

window.addEventListener("resize", screenCheck);

// Escape menu Close
document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;

  // Cart schließen
  if (!cartDisplay.hidden) {
    cartDisplay.hidden = true;
    cartIcon.setAttribute("aria-expanded", "false");
  }

  // Menu schließen
  if (!menu.hidden) {
    menu.hidden = true;
    menuBtn.classList.remove("is-open");
    menuBtn.setAttribute("aria-expanded", "false");
  }
});

/* =========================
   Init
========================= */
showAmount(); // initial UI sync
screenCheck();

