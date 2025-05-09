/******************************************
/* Parallax
/*******************************************/

const parallax = document.getElementById("parallax");
const parallax02 = document.getElementById("parallax02");

window.addEventListener("scroll", paralaxScroll);

function paralaxScroll() {
  let offset = window.pageYOffset;
  parallax.style.backgroundPositionY = offset * 0.7 + "px";
  parallax02.style.backgroundPositionY = offset * 0.7 + "px";
}

/******************************************
/* Nav Bar Toggle
/*******************************************/

const primaryNav = document.querySelector(".nav-body");
const navToggle = document.querySelector(".mobile-nav-toggle");

navToggle.addEventListener("click", () => {
  const visibility = primaryNav.getAttribute("data-visible");

  if (visibility === "false") {
    primaryNav.setAttribute("data-visible", true);
    navToggle.setAttribute("aria-expanded", true);
  } else {
    primaryNav.setAttribute("data-visible", false);
    navToggle.setAttribute("aria-expanded", false);
  }
});

// Toggle nav menu bar off when click a link or outside menu bar

document.addEventListener("click", (e) => {
  if (!navToggle.contains(e.target)) {
    primaryNav.setAttribute("data-visible", false);
    navToggle.setAttribute("aria-expanded", false);
  }
});

/******************************************
/* Carousel Product Display
/*******************************************/

const track = document.querySelector(".carousel__track");
const slides = Array.from(track.children);
const nextButton = document.querySelector(".carousel__button--right");
const prevButton = document.querySelector(".carousel__button--left");
const nameDisplayNav = document.querySelector(".carousel__nav-by-name--top");
const nameNav = Array.from(nameDisplayNav.children);
const dotsNav = document.querySelector(".carousel__nav--bottom");
const dots = Array.from(dotsNav.children);

const slideWidth = slides[0].getBoundingClientRect().width;

// Arrange the slides next to one another

slides.forEach(setSlidePosition);

function setSlidePosition(slides, i) {
  slides.style.left = slideWidth * i + "px";
}

function moveToSlide(track, currentSlide, targetSlide) {
  track.style.transform = `translateX( -${targetSlide.style.left})`;
  currentSlide.classList.remove("current-slide");
  targetSlide.classList.add("current-slide");
}

function updateDots(currentDot, targetDot) {
  currentDot.classList.remove("current-slide");
  targetDot.classList.add("current-slide");
}

function hideShowArrows(slides, prevButton, nextButton, targetIndex) {
  if (targetIndex === 0) {
    prevButton.classList.add("is-hidden");
    nextButton.classList.remove("is-hidden");
  } else if (targetIndex === slides.length - 1) {
    prevButton.classList.remove("is-hidden");
    nextButton.classList.add("is-hidden");
  } else {
    prevButton.classList.remove("is-hidden");
    nextButton.classList.remove("is-hidden");
  }
}

// Updates Dots Billow product display specifically when using Nav the nav bar of the product display
function navUpdateDots(currentDot, index) {
  currentDot.classList.remove("current-slide");
  dots[index].classList.add("current-slide");
}

// When I click left, move slides to the left
prevButton.addEventListener("click", (e) => {
  const currentSlide = track.querySelector(".current-slide");
  const prevSlide = currentSlide.previousElementSibling;
  const currentDot = dotsNav.querySelector(".current-slide");
  const prevDot = currentDot.previousElementSibling;
  const prevIndex = slides.findIndex((slide) => slide === prevSlide);

  moveToSlide(track, currentSlide, prevSlide);
  updateDots(currentDot, prevDot);
  hideShowArrows(slides, prevButton, nextButton, prevIndex);
});

// When I click right, move slides to the right
nextButton.addEventListener("click", (e) => {
  const currentSlide = track.querySelector(".current-slide");
  const nextSlide = currentSlide.nextElementSibling;
  const currentDot = dotsNav.querySelector(".current-slide");
  const nextDot = currentDot.nextElementSibling;
  const nextIndex = slides.findIndex((slide) => slide === nextSlide);

  moveToSlide(track, currentSlide, nextSlide);
  updateDots(currentDot, nextDot);
  hideShowArrows(slides, prevButton, nextButton, nextIndex);
});

// When click on nav options type, move display to appropriate slide
nameDisplayNav.addEventListener("click", (e) => {
  // What indicator was clicked on
  const targetName = e.target.closest("li");

  if (!targetName) return;

  const currentSlide = track.querySelector(".current-slide");
  const currentDot = dotsNav.querySelector(".current-slide");
  const targetIndex = nameNav.findIndex((el) => el === targetName);
  const targetSlide = slides[targetIndex];

  moveToSlide(track, currentSlide, targetSlide);
  navUpdateDots(currentDot, targetIndex);
  hideShowArrows(slides, prevButton, nextButton, targetIndex);
});

// When click the nav dots indicators, move to that slide
dotsNav.addEventListener("click", (e) => {
  // What indicator was clicked on?
  const targetDot = e.target.closest("button");

  if (!targetDot) return;

  const currentSlide = track.querySelector(".current-slide");
  const currentDot = dotsNav.querySelector(".current-slide");
  const targetIndex = dots.findIndex((dot) => dot === targetDot);
  const targetSlide = slides[targetIndex];

  moveToSlide(track, currentSlide, targetSlide);
  updateDots(currentDot, targetDot);
  hideShowArrows(slides, prevButton, nextButton, targetIndex);
});
