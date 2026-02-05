/* =========================================================
   DOM REFERENCES
   ========================================================= */

/* -------------------------
   Carousel (Page)
------------------------- */
const carousel = document.querySelector("[data-carousel]");
const slides = Array.from(carousel.querySelectorAll(".carousel__slide"));
const prevBtn = carousel.querySelector("[data-prev]");
const nextBtn = carousel.querySelector("[data-next]");

/* Thumbnails (Page) */
const thumbs = document.querySelector("[data-thumb-gallery]");
const thumbGallery = document.querySelector("[data-thumb-gallery]");
const thumbPictures = Array.from(thumbs.querySelectorAll(".thumb"));

/* -------------------------
   Amount / Counter
------------------------- */
const minusBtn = document.querySelector("[data-minus]");
const plusBtn = document.querySelector("[data-plus]");
const amountCount = document.querySelector("[data-amount]");

/* -------------------------
   Menu
------------------------- */
const menuBtn = document.querySelector(".nav-toggle");
const menu = document.querySelector(".menu");

/* -------------------------
   Cart
------------------------- */
const cartSum = document.querySelector(".cart__sum");
const itemQuantity = document.querySelector(".cart__item__quantity");
const deleteItem = document.querySelector(".cart__items__delete");
const cartEmpty = document.querySelector(".cart__empty");
const cartItemsUI = document.querySelector(".cart__items");
const cartInfo = document.querySelector("#cart-info");
const cartDisplay = document.querySelector(".cart");
const cartIcon = document.querySelector(".cart-button");
const cartBtn = document.querySelector("[data-cart]");
const cartBadge = document.querySelector(".cart-badge");

/* -------------------------
   Product (Data attributes)
------------------------- */
const productEl = document.querySelector(".product-content");
const productId = productEl.dataset.productId;
const price = Number(productEl.dataset.productPrice);
const title = productEl.dataset.productTitle;

/* -------------------------
   Lightbox
------------------------- */
const lightboxCarousel = document.querySelector("[data-lightbox-carousel]");
const lightboxSlides = Array.from(lightboxCarousel.querySelectorAll(".carousel__slide"));
const lightboxClose = document.querySelectorAll("[data-lightbox-close]");
const lightbox = document.querySelector(".lightbox");
const lightboxOpen = document.querySelectorAll(".lightboxBtnOpen");

/* Thumbnails (Lightbox) */
const lightThumbs = document.querySelector("[data-lightbox-thumb-gallery]");
const lightThumbPictures = Array.from(lightThumbs.querySelectorAll(".thumb"));

/* Lightbox navigation */
const lightPrev = document.querySelector("[data-lightbox-prev]");
const lightNext = document.querySelector("[data-lightbox-next]");


/* =========================================================
   HELPERS
   ========================================================= */

/**
 * Desktop breakpoint helper
 * - Used for: lightbox enable/disable, ESC menu behavior, screenCheck layout mode
 */
function isDesktop() {
  return window.innerWidth >= 1024; // dein Desktop-Breakpoint
}


/* =========================================================
   STATE
   ========================================================= */

/* Carousel index (Page) */
let index = slides.findIndex((s) => s.classList.contains("is-active"));
if (index === -1) index = 0;

/* Amount / Cart state */
let amount = 0;
const cartItems = [];

/* Lightbox index */
let lightboxIndex = 0;


/* =========================================================
   CAROUSEL LOGIC (Page)
   ========================================================= */

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


/* =========================================================
   AMOUNT LOGIC
   ========================================================= */

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


/* =========================================================
   CART LOGIC
   ========================================================= */

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
    cartBadge.hidden = true;
  } else {
    renderItems();
    cartBadge.textContent = cartItems[0].quantity;
    cartBadge.hidden = false;
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
  renderCart();
}


/* =========================================================
   MENU LOGIC
   ========================================================= */

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


/* =========================================================
   RESPONSIVE MODE SYNC
   ========================================================= */

/**
 * Keeps UI consistent when resizing:
 * - Desktop: menu + thumbs visible
 * - Mobile/Tablet: menu + thumbs hidden by default
 */
function screenCheck() {
  const isDesktop = window.innerWidth >= 1024;

  if (isDesktop) {
    // Desktop-Modus
    menu.hidden = false;
    thumbGallery.hidden = false;
    menuBtn.classList.remove("is-open");
    menuBtn.setAttribute("aria-expanded", "false");
  } else {
    // Mobile-Modus (Startzustand: zu)
    menu.hidden = true;
    menuBtn.classList.remove("is-open");
    menuBtn.setAttribute("aria-expanded", "false");
    thumbGallery.hidden = true;
  }
}


/* =========================================================
   LIGHTBOX LOGIC
   ========================================================= */

function closeLightbox() {
  lightbox.hidden = true;
}

function openLightbox() {
  if (!isDesktop()) return;
  lightbox.hidden = false;
  setActiveLightbox(index);
}

function setActiveLightbox(newIndex) {
  lightboxSlides[lightboxIndex].classList.remove("is-active");
  lightboxSlides[lightboxIndex].setAttribute("aria-hidden", "true");
  lightThumbPictures[lightboxIndex].classList.remove("is-active");
  lightThumbPictures[lightboxIndex].setAttribute("aria-current", "false");

  lightboxIndex = newIndex;

  lightboxSlides[lightboxIndex].classList.add("is-active");
  lightboxSlides[lightboxIndex].setAttribute("aria-hidden", "false");
  lightThumbPictures[lightboxIndex].classList.add("is-active");
  lightThumbPictures[lightboxIndex].setAttribute("aria-current", "true");
}

function lightboxPrev() {
  const nextIndex = (lightboxIndex - 1 + lightboxSlides.length) % lightboxSlides.length;
  setActiveLightbox(nextIndex);
}

function lightboxNext() {
  const nextIndex = (lightboxIndex + 1) % lightboxSlides.length;
  setActiveLightbox(nextIndex);
}


/* =========================================================
   EVENTS
   ========================================================= */

/* Carousel navigation (Page) */
prevBtn.addEventListener("click", prev);
nextBtn.addEventListener("click", next);

/* Menu toggle */
menuBtn.addEventListener("click", showMenu);

/* Amount controls */
plusBtn.addEventListener("click", plus);
minusBtn.addEventListener("click", minus);

/* Cart actions */
deleteItem.addEventListener("click", clearCart);

cartBtn.addEventListener("click", () => {
  addToCart();
  renderCart();
});

cartIcon.addEventListener("click", showCart);

/* Responsive sync */
window.addEventListener("resize", screenCheck);

/* ESC behavior:
   - Mobile/Tablet: closes menu if open
   - Always: closes cart + lightbox if open
*/
document.addEventListener("keydown", (event) => {
  if (event.key !== "Escape") return;

  if (!isDesktop()) {
    if (!menu.hidden) {
      menu.hidden = true;
      menuBtn.classList.remove("is-open");
      menuBtn.setAttribute("aria-expanded", "false");
    }
  }

  if (!cartDisplay.hidden) {
    cartDisplay.hidden = true;
    cartIcon.setAttribute("aria-expanded", "false");
  }

  if (!lightbox.hidden) {
    lightbox.hidden = true;
  }
});

/* Lightbox close buttons (X + overlay) */
lightboxClose.forEach((btn) => {
  btn.addEventListener("click", closeLightbox);
});

/* Lightbox open (click on main image buttons) */
lightboxOpen.forEach((btn) => {
  btn.addEventListener("click", openLightbox);
});

/* Lightbox arrows */
lightPrev.addEventListener("click", lightboxPrev);
lightNext.addEventListener("click", lightboxNext);


/* =========================================================
   INIT
   ========================================================= */

showAmount();   // initial UI sync (amount + minus disabled)
screenCheck();  // initial responsive sync

/* Page thumbnails -> page carousel */
thumbPictures.forEach((btn) => {
  btn.addEventListener("click", () => {
    const i = Number(btn.dataset.index);
    setActive(i);

    thumbPictures.forEach((b) => b.classList.remove("is-active"));
    btn.classList.add("is-active");
  });
});

/* Lightbox thumbnails -> lightbox carousel */
lightThumbPictures.forEach((btn) => {
  btn.addEventListener("click", () => {
    const i = Number(btn.dataset.index);
    setActiveLightbox(i);

    lightThumbPictures.forEach((b) => b.classList.remove("is-active"));
    btn.classList.add("is-active");
  });
});
