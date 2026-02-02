const carousel = document.querySelector("[data-carousel]");
const slides = Array.from(carousel.querySelectorAll(".carousel__slide"));
const prevBtn = carousel.querySelector("[data-prev]");
const nextBtn = carousel.querySelector("[data-next]");

const minusBtn = document.querySelector("[data-minus]");
const plusBtn = document.querySelector("[data-plus]");
const amountCount = document.querySelector("[data-amount]");

const cartDisplay = document.querySelector(".cart");
const cartIcon = document.querySelector(".cart-button");
const cartBtn = document.querySelector("[data-cart]");
const productEl = document.querySelector(".product-content");

const productId = productEl.dataset.productId;
const price = Number(productEl.dataset.productPrice);
const title = productEl.dataset.productTitle;

let index = slides.findIndex((s) => s.classList.contains("is-active"));
if (index === -1) index = 0;

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

prevBtn.addEventListener("click", prev);
nextBtn.addEventListener("click", next);



// Ammount
let amount = 0;
const cartItems = [];

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


function renderCart() {
    const existingItem = cartItems.find(
    (item) => item.id === productId
    );

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
    console.log(cartItems);
}

function showCart() {
  cartDisplay.hidden = !cartDisplay.hidden;
  cartIcon.setAttribute("aria-expanded", String(!cartDisplay.hidden));
}



plusBtn.addEventListener("click", plus);
minusBtn.addEventListener("click", minus);

cartBtn.addEventListener("click", renderCart);
cartIcon.addEventListener("click", showCart)

showAmount(); // initial UI sync

