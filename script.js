const carousel = document.querySelector("[data-carousel]");
const slides = Array.from(carousel.querySelectorAll(".carousel__slide"));
const prevBtn =carousel.querySelector("[data-prev]");
const nextBtn =carousel.querySelector("[data-next]");

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