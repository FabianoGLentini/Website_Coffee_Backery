
/******************************************
/* Interactive styling
/*******************************************/

// Underline show up when hoevering over interactible links



// document.querySelector(".hoverGlow").addEventListener("mouseover", hoverGlow)

// function hoverGlow(){
//     document.querySelector(".hoverGlow li").style.text-decoration: "underline";
// }


/******************************************
/* Parallax
/*******************************************/

const parallax = document.getElementById("parallax") 
const parallax02 = document.getElementById("parallax02") 


window.addEventListener("scroll", paralaxScroll)

function paralaxScroll(){
    let offset = window.pageYOffset;
    parallax.style.backgroundPositionY = offset * 0.7 +"px"
    parallax02.style.backgroundPositionY = offset * 0.7 +"px"
}

/******************************************
/* Nav Bar Toggle
/*******************************************/

const primaryNav = document.querySelector(".nav-body")
const navToggle = document.querySelector(".mobile-nav-toggle")

navToggle.addEventListener("click", () => {
    const visibility = primaryNav.getAttribute("data-visible")

    if(visibility === "false"){
        primaryNav.setAttribute("data-visible" , true)  
        navToggle.setAttribute("aria-expanded", true)
      }else{
        primaryNav.setAttribute("data-visible" , false)  
        navToggle.setAttribute("aria-expanded", false)
      }
})

/******************************************
/* Carousel Product Display
/*******************************************/

const track = document.querySelector(".carousel__track")
const slides = Array.from(track.children)
const nextButton = document.querySelector(".carousel__button--right")
const prevButton = document.querySelector(".carousel__button--left")
const dotsNav = document.querySelector(".carousel__nav--bottom")
const dots = Array.from(dotsNav.children)

const slideWidth = slides[0].getBoundingClientRect().width

// console.log(slideWidth)

// Arrange the slides next to one another

slides.forEach(setSlidePosition)

function setSlidePosition(slides, i) {
  slides.style.left = slideWidth * i + "px"
}

function moveToSlide(track, currentSlide, targetSlide){
  track.style.transform = "translateX( -" + targetSlide.style.left + ")"
  currentSlide.classList.remove("current-slide")
  targetSlide.classList.add("current-slide")
}

// When I click left, move slides to the left
prevButton.addEventListener("click", e => {
  const currentSlide = track.querySelector(".current-slide")
  const prevSlide = currentSlide.previousElementSibling

  moveToSlide(track, currentSlide, prevSlide)
})


// When I click right, move slides to the right
nextButton.addEventListener("click", e => {
  const currentSlide = track.querySelector(".current-slide")
  const nextSlide = currentSlide.nextElementSibling

  moveToSlide(track, currentSlide, nextSlide)
})

// When I click the nav indicators, move to that slide

dotsNav.addEventListener("click", e => {
  // what indicator was clicked om?

  const targetDot = e.target.closest("button")

  if(!targetDot) return;


  const currentSlide = track.querySelector(".current-slide")
  const currentDot = dotsNav.querySelector(".current-slide")
  const targetIndex = dots.findIndex(dot => dot === targetDot)
  const targetSlide = slides[targetIndex]

  moveToSlide(track, currentSlide, targetSlide)

  currentDot.classList.remove("current-slide")
  currentDot.classList.add("current-slide")
})

